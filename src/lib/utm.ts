/**
 * UTM / click-id attribution.
 *
 * A visitor can land anywhere on this site from a tagged link. Every outbound
 * link (Application Portal apply + pay pages, partner programme sites, partner
 * apply URLs) must carry that attribution forward so the Portal records the
 * same source on the application and on the payment.
 *
 * Storage model:
 *  - last touch  -> sessionStorage (what this visit came from; forwarded)
 *  - first touch -> localStorage  (kept for the whole browser, never overwritten)
 *
 * Cookies are useless across the site/portal boundary (different registrable
 * domains), so forwarding happens in the URL query string.
 */

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "utm_source_platform",
  "utm_creative_format",
  "utm_marketing_tactic",
  "gclid",
  "wbraid",
  "gbraid",
  "fbclid",
  "msclkid",
  "ttclid",
  "twclid",
  "li_fat_id",
  "igshid",
  "ScCid",
  "ref",
  "referrer_code",
] as const;

export type UtmParams = Record<string, string>;

const LAST_TOUCH_KEY = "lwl_utm_last";
const FIRST_TOUCH_KEY = "lwl_utm_first";
const MAX_VALUE_LENGTH = 200;

/**
 * Naming convention (finalised across all LWL platforms):
 *  - utm_campaign = the initiative            (future-doctors, harvard-horizons)
 *  - utm_source   = the audience / dataset    (paid-schools, india-students) — wide, evolving, not gated
 *  - utm_medium   = platform + person         (npf-akbar, wati-ayush, linkedin-jatin)
 *                   and MUST exist in public.all_utm_mediums before any send
 *
 * Automated system sends (payment reminders, camp drips) always report as the
 * pair below, whoever originally referred the person.
 */
export const AUTOMATION_CAMPAIGN = "auto-reminder";
export const AUTOMATION_SOURCE = "lwl-automation";
export const AUTOMATION_MEDIUM = "lwl-automation";

const DEFAULT_UTM = {
  utm_source: "direct",
  utm_medium: "website",
  utm_campaign: "direct",
} as const;

/**
 * One value per field — never two joined by a separator.
 *
 * Production rows elsewhere ended up as "direct,auto-reminder" /
 * "website,email" because a merge appended the new touch to the old one. Any
 * value that already carries a separator is repaired here by keeping its LAST
 * segment (the newer touch), and nothing in this module ever concatenates.
 */
export function normalizeUtmValue(value: unknown): string {
  if (typeof value !== "string") return "";
  const lastSegment = value
    .split(/[,;|]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .pop();
  if (!lastSegment) return "";
  return lastSegment.trim().slice(0, MAX_VALUE_LENGTH);
}

/** Picks exactly one value: the new touch if it carries one, else what we already hold. */
export function pickUtmValue(incoming: unknown, stored: unknown, fallback = ""): string {
  return normalizeUtmValue(incoming) || normalizeUtmValue(stored) || fallback;
}

/**
 * Reconciles a new touch against the attribution already on file for the same
 * visitor/application. Field-by-field, single value, newest touch wins.
 */
export function resolveUtm(
  incoming: Record<string, unknown> = {},
  stored: Record<string, unknown> = {},
): { utm_source: string; utm_medium: string; utm_campaign: string } {
  const campaign = pickUtmValue(
    incoming["utm_campaign"],
    stored["utm_campaign"],
    DEFAULT_UTM.utm_campaign,
  );
  // An automated send is always the auto-reminder / lwl-automation pair.
  if (campaign === AUTOMATION_CAMPAIGN) {
    return {
      utm_campaign: AUTOMATION_CAMPAIGN,
      utm_source: AUTOMATION_SOURCE,
      utm_medium: pickUtmValue(incoming["utm_medium"], stored["utm_medium"], AUTOMATION_MEDIUM),
    };
  }
  return {
    utm_campaign: campaign,
    utm_source: pickUtmValue(incoming["utm_source"], stored["utm_source"], DEFAULT_UTM.utm_source),
    utm_medium: pickUtmValue(incoming["utm_medium"], stored["utm_medium"], DEFAULT_UTM.utm_medium),
  };
}

/** Hosts we never decorate: social/search/video destinations, not our funnel. */
const SKIP_HOST_PATTERNS = [
  /^(www\.)?google\.[a-z.]+$/i,
  /(^|\.)youtube\.com$/i,
  /(^|\.)youtu\.be$/i,
  /(^|\.)facebook\.com$/i,
  /(^|\.)instagram\.com$/i,
  /(^|\.)linkedin\.com$/i,
  /(^|\.)x\.com$/i,
  /(^|\.)twitter\.com$/i,
  /(^|\.)wa\.me$/i,
  /(^|\.)whatsapp\.com$/i,
  /(^|\.)fonts\.gstatic\.com$/i,
];

function readStore(store: Storage | undefined, key: string): UtmParams {
  if (!store) return {};
  try {
    const raw = store.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const out: UtmParams = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === "string" && v) out[k] = v.slice(0, MAX_VALUE_LENGTH);
    }
    return out;
  } catch {
    return {};
  }
}

function writeStore(store: Storage | undefined, key: string, value: UtmParams) {
  if (!store) return;
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode / quota — attribution still works from the current URL */
  }
}

function safeStorage(kind: "session" | "local"): Storage | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return kind === "session" ? window.sessionStorage : window.localStorage;
  } catch {
    return undefined;
  }
}

/** Pulls the attribution parameters out of a query string. */
export function parseUtmParams(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const found: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, MAX_VALUE_LENGTH);
  }
  return found;
}

/**
 * Records attribution for the current page view. Called on first load and on
 * every client-side navigation, so a tagged link to any page is captured even
 * when the visitor arrives mid-journey.
 */
export function captureUtmFromLocation(
  href?: string,
  documentReferrer?: string,
): UtmParams {
  if (typeof window === "undefined") return {};
  const url = href ?? window.location.href;
  let search = "";
  let pathname = "/";
  try {
    const parsed = new URL(url, window.location.origin);
    search = parsed.search;
    pathname = parsed.pathname;
  } catch {
    return getStoredUtm();
  }

  const fresh = parseUtmParams(search);
  const session = safeStorage("session");
  const local = safeStorage("local");

  if (Object.keys(fresh).length > 0) {
    const referrer = documentReferrer ?? (typeof document === "undefined" ? "" : document.referrer);
    const previous = readStore(session, LAST_TOUCH_KEY);
    // Field-by-field: the new touch wins, otherwise we keep what we already
    // held. Values are never joined — one value per field, always.
    const resolved = resolveUtm(fresh, previous);
    const enriched: UtmParams = {
      ...previous,
      ...fresh,
      ...resolved,
      lwl_landing_path: pathname,
      lwl_landed_at: new Date().toISOString(),
      ...(referrer && !referrer.startsWith(window.location.origin)
        ? { lwl_referrer: referrer.slice(0, MAX_VALUE_LENGTH) }
        : {}),
    };
    writeStore(session, LAST_TOUCH_KEY, enriched);
    if (Object.keys(readStore(local, FIRST_TOUCH_KEY)).length === 0) {
      writeStore(local, FIRST_TOUCH_KEY, enriched);
    }
    return enriched;
  }

  return getStoredUtm();
}

/** Last-touch attribution for this visit, falling back to first touch. */
export function getStoredUtm(): UtmParams {
  const last = readStore(safeStorage("session"), LAST_TOUCH_KEY);
  if (Object.keys(last).length > 0) return last;
  return readStore(safeStorage("local"), FIRST_TOUCH_KEY);
}

export function getFirstTouchUtm(): UtmParams {
  return readStore(safeStorage("local"), FIRST_TOUCH_KEY);
}

/**
 * The three canonical attribution fields the shared tracking endpoint expects,
 * with the platform's standard direct/website/direct fallback.
 */
export function getUtm(): { utm_source: string; utm_medium: string; utm_campaign: string } {
  const stored = getStoredUtm();
  return {
    utm_source: stored["utm_source"] || "direct",
    utm_medium: stored["utm_medium"] || "website",
    utm_campaign: stored["utm_campaign"] || "direct",
  };
}


/** Only the standard tracking keys — what gets forwarded downstream. */
function forwardableParams(stored: UtmParams): UtmParams {
  const out: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = stored[key];
    if (value) out[key] = value;
  }
  if (stored["lwl_landing_path"]) out["lwl_landing_path"] = stored["lwl_landing_path"]!;
  if (stored["lwl_referrer"]) out["lwl_referrer"] = stored["lwl_referrer"]!;
  return out;
}

function shouldDecorateHost(host: string): boolean {
  return !SKIP_HOST_PATTERNS.some((pattern) => pattern.test(host));
}

/**
 * Appends the stored attribution to a URL. Existing query values win, so a link
 * that already carries its own utm_* is never rewritten, and the rest of the URL
 * is left byte-for-byte alone (no re-encoding of existing parameters).
 */
export function withUtm(url: string, stored: UtmParams = getStoredUtm()): string {
  const forward = forwardableParams(stored);
  if (Object.keys(forward).length === 0) return url;
  if (!/^https?:\/\//i.test(url) && !url.startsWith("/")) return url;

  try {
    const base = typeof window === "undefined" ? "https://lwlschoolaccess.com" : window.location.origin;
    const parsed = new URL(url, base);
    if (!/^https?:$/.test(parsed.protocol)) return url;
    if (!shouldDecorateHost(parsed.hostname)) return url;

    const existing = parsed.searchParams;
    const additions = Object.entries(forward)
      .filter(([key]) => !existing.has(key))
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    if (additions.length === 0) return url;

    const [beforeHash, ...hashParts] = url.split("#");
    const hash = hashParts.length > 0 ? `#${hashParts.join("#")}` : "";
    const separator = beforeHash!.includes("?") ? (beforeHash!.endsWith("?") ? "" : "&") : "?";
    return `${beforeHash}${separator}${additions.join("&")}${hash}`;
  } catch {
    return url;
  }
}

/** Opens an outbound URL in a new tab with attribution attached. */
export function openWithUtm(url: string) {
  if (typeof window === "undefined") return;
  window.open(withUtm(url), "_blank", "noopener,noreferrer");
}
