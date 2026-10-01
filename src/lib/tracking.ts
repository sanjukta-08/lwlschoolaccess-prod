/**
 * Visitor tracking client for the shared Learn with Leaders attribution stack.
 *
 * Everything goes through our own same-origin relay (/api/public/track-relay),
 * so the platform API key never reaches the browser and there is no per-domain
 * CORS allow-list to keep in sync.
 *
 * Tracking must never break the app: every call swallows its own errors.
 */
import { getUtm } from "./utm";

const ENDPOINT = "/api/public/track-relay";

const VISITOR_ID_KEY = "_vid";
const SESSION_ID_KEY = "_tsid";

const isBrowser = () => typeof window !== "undefined";
const enabled = () => isBrowser();

function getVisitorId(): string {
  if (!isBrowser()) return "";
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

async function call(action: string, payload: Record<string, unknown>) {
  if (!enabled()) return null;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...payload }),
    });
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
}

let sessionId: string | null = null;
let starting: Promise<void> | null = null;
const queue: Array<{ event_type: string; extra: Record<string, unknown> }> = [];

function readSessionId(): string | null {
  if (sessionId) return sessionId;
  try {
    return sessionStorage.getItem(SESSION_ID_KEY);
  } catch {
    return null;
  }
}

export async function startSession() {
  if (!enabled() || starting) return starting ?? undefined;
  starting = (async () => {
    const visitorId = getVisitorId();

    // A full page load inside the same tab continues the existing session
    // instead of opening a second one (which would land as a "direct" visit and
    // inflate session counts).
    const existing = readSessionId();
    if (existing) {
      sessionId = existing;
      void call("session_heartbeat", { session_id: existing });
    } else {
      const result = await call("session_start", {
        visitor_id: visitorId,
        page_url: window.location.href,
        page_path: window.location.pathname,
        referrer_url: document.referrer || null,
        device_type: /Mobi/.test(navigator.userAgent) ? "mobile" : "desktop",
        browser: navigator.userAgent,
        ...getUtm(),
      });
      sessionId = (result as { session_id?: string } | null)?.session_id ?? null;
      if (sessionId) {
        try {
          sessionStorage.setItem(SESSION_ID_KEY, sessionId);
        } catch {
          /* private mode */
        }
      }
    }


    // Real session-duration numbers: heartbeat while the tab lives, final
    // beacon on close.
    window.setInterval(() => {
      const id = readSessionId();
      if (id) void call("session_heartbeat", { session_id: id });
    }, 20_000);
    window.addEventListener("beforeunload", () => {
      const id = readSessionId();
      if (!id) return;
      try {
        navigator.sendBeacon(
          ENDPOINT,
          new Blob([JSON.stringify({ action: "session_heartbeat", session_id: id, ending: true })], {
            type: "application/json",
          }),
        );
      } catch {
        /* ignore */
      }
    });

    while (queue.length) {
      const q = queue.shift()!;
      void send(q.event_type, q.extra);
    }
  })();
  return starting;
}

function send(eventType: string, extra: Record<string, unknown>) {
  const id = readSessionId();
  if (!id) return;
  return call("event", {
    session_id: id,
    visitor_id: getVisitorId(),
    event_type: eventType,
    page_url: window.location.href,
    page_path: window.location.pathname,
    ...getUtm(),
    ...extra,
  });
}

export function trackEvent(eventType: string, extra: Record<string, unknown> = {}) {
  if (!enabled()) return;
  if (!readSessionId()) {
    queue.push({ event_type: eventType, extra });
    return;
  }
  void send(eventType, extra);
}

export function identifyVisitor(email: string) {
  const clean = (email || "").trim().toLowerCase();
  if (!clean) return;
  void call("identify", { visitor_id: getVisitorId(), email: clean });
}
