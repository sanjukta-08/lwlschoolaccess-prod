/** Lightweight UTM capture — mirrors the portal's attribution payload. */
const KEY = "lwl_utm";

export type UtmPayload = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  landing_page?: string | null;
  device_type?: string | null;
};

const FIELDS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function captureUtmParams(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const incoming: UtmPayload = {};
  for (const f of FIELDS) {
    const v = params.get(f);
    if (v) incoming[f] = v;
  }
  const stored = getStoredUtmParams();
  const next: UtmPayload = {
    ...stored,
    ...incoming,
    landing_page: stored.landing_page || window.location.pathname,
    device_type: window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop",
  };
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked — attribution is best effort */
  }
}

export function getStoredUtmParams(): UtmPayload {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as UtmPayload) : {};
  } catch {
    return {};
  }
}
