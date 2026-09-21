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

/** Hosts we never decorate: social/search/video destinations, not our funnel. */
const SKIP_HOST_PATTERNS = [
  /(^|\.)google\.[a-z.]+$/i,
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
    const enriched: UtmParams = {
      ...fresh,
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
 * Appends the stored attribution to a URL. Existing query values win, so a
 * link that already carries its own utm_* is never rewritten.
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
    for (const [key, value] of Object.entries(forward)) {
      if (!parsed.searchParams.has(key)) parsed.searchParams.set(key, value);
    }
    return url.startsWith("/") ? `${parsed.pathname}${parsed.search}${parsed.hash}` : parsed.toString();
  } catch {
    return url;
  }
}

/** Opens an outbound URL in a new tab with attribution attached. */
export function openWithUtm(url: string) {
  if (typeof window === "undefined") return;
  window.open(withUtm(url), "_blank", "noopener,noreferrer");
}
