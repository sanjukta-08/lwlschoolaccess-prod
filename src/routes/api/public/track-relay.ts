import { createFileRoute } from "@tanstack/react-router";

/**
 * Same-origin relay to the shared Learn with Leaders `track` endpoint.
 *
 * Keeps the platform API key server-side and avoids per-domain CORS fragility:
 * the browser only ever talks to this relay (open CORS), which then calls the
 * central endpoint server-to-server with our fixed platform Origin.
 *
 * Only visitor-side actions are relayed. Conversions (applications, payments)
 * are written server-side by the Application Portal, never from the browser.
 */
const CENTRAL_TRACK_URL = "https://temdomobmzdkzulweony.supabase.co/functions/v1/track";
const PLATFORM_ORIGIN = "https://www.learnwithleaders.com";
const ALLOWED_ACTIONS = new Set(["session_start", "session_heartbeat", "event", "identify"]);

const cors: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

export const Route = createFileRoute("/api/public/track-relay")({
  server: {
    handlers: {
      OPTIONS: () => new Response(null, { headers: cors }),
      POST: async ({ request }) => {
        const TRACK_API_KEY = process.env["TRACK_API_KEY"] ?? "";
        if (!TRACK_API_KEY) return json({ error: "tracking_not_configured" }, 200);

        let payload: Record<string, unknown>;
        try {
          payload = (await request.json()) as Record<string, unknown>;
        } catch {
          return json({ error: "invalid_json" }, 400);
        }

        const action = typeof payload["action"] === "string" ? (payload["action"] as string) : "";
        if (!ALLOWED_ACTIONS.has(action)) return json({ error: "unsupported_action" }, 400);

        try {
          const res = await fetch(CENTRAL_TRACK_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TRACK_API_KEY}`,
              // Fixed to this platform's registered domain — the central
              // endpoint's allow-list checks against it.
              Origin: PLATFORM_ORIGIN,
            },
            body: JSON.stringify(payload),
          });
          const text = await res.text();
          if (!res.ok) {
            console.error(`[track-relay] central track failed [${res.status}]: ${text}`);
            return json({ error: "track_failed", status: res.status, details: text }, res.status);
          }
          return new Response(text || "{}", {
            status: 200,
            headers: { ...cors, "Content-Type": "application/json" },
          });
        } catch (e) {
          console.error("[track-relay] error", e instanceof Error ? e.message : e);
          return json({ error: "track_unreachable" }, 502);
        }
      },
    },
  },
});
