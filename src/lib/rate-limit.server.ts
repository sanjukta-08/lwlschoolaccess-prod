import { createHash } from "node:crypto";

/**
 * IP-based rate limiting for the public AI-backed endpoints (Compass, the
 * "find your fit" quiz). Backed by lwl_site.ai_rate_limit_hits.
 *
 * Fixes: both endpoints previously had no usable limit -- Compass's per-session
 * cap counted against a client-supplied sessionId, so a script could mint a new
 * session on every call and get a fresh budget each time.
 */

/**
 * Prefers Cloudflare's edge-injected header, which the client cannot spoof
 * (this app deploys on Cloudflare via Nitro). Falls back to x-forwarded-for
 * for local/non-Cloudflare environments.
 */
export function clientIpFrom(request: Request | undefined): string {
  try {
    if (!request) return "unknown";
    const cf = request.headers.get("cf-connecting-ip");
    if (cf) return cf;
    const forwarded = request.headers.get("x-forwarded-for");
    const first = forwarded?.split(",")[0]?.trim();
    return first || "unknown";
  } catch {
    return "unknown";
  }
}

function hashIp(ip: string): string {
  const pepper = process.env["LWL_RATE_LIMIT_PEPPER"] ?? "lwl-rate-limit-default-pepper";
  return createHash("sha256").update(`${pepper}:${ip}`).digest("hex");
}

type RouteKey = "compass_session" | "compass_message" | "recommend";

const LIMITS: Record<RouteKey, { windowMs: number; max: number }> = {
  // New Compass conversations started per visitor per 10 minutes.
  compass_session: { windowMs: 10 * 60_000, max: 4 },
  // Compass turns (any session) per visitor per hour -- the real cost cap.
  compass_message: { windowMs: 60 * 60_000, max: 60 },
  // "Find your fit" quiz calls per visitor per hour.
  recommend: { windowMs: 60 * 60_000, max: 20 },
};

/**
 * Returns true if this call is within limit (and records the hit). Returns
 * false if the limit is already reached, OR if we couldn't tell who the
 * visitor is (ip === "unknown") and the DB check itself failed -- but a
 * genuinely unknown IP alone does not fail closed into one shared bucket,
 * since misreading the client IP in production must not be able to lock out
 * every visitor at once. A DB error fails closed (treated as over-limit) so a
 * broken limiter can't silently turn into unmetered access.
 */
export async function withinRateLimit(route: RouteKey, ip: string): Promise<boolean> {
  if (ip === "unknown") return true;
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const db = (supabaseAdmin as unknown as { schema: (s: string) => { from: (t: string) => any } }).schema(
      "lwl_site",
    );
    const { windowMs, max } = LIMITS[route];
    const ipHash = hashIp(ip);
    const since = new Date(Date.now() - windowMs).toISOString();
    const { count, error } = await db
      .from("ai_rate_limit_hits")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .eq("route", route)
      .gte("created_at", since);
    if (error) {
      console.error(`rate limit check failed for ${route}`, error);
      return false;
    }
    if ((count ?? 0) >= max) return false;
    await db.from("ai_rate_limit_hits").insert({ ip_hash: ipHash, route });
    return true;
  } catch (err) {
    console.error(`rate limit check failed for ${route}`, err);
    return false;
  }
}
