import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import { captureUtmFromLocation, getStoredUtm, withUtm } from "@/lib/utm";

const DECORATED_FLAG = "data-utm-forwarded";

/**
 * Captures attribution from the current URL on every navigation and rewrites
 * outbound links (Application Portal apply/pay pages, partner sites) so the
 * UTM tags a visitor arrived with are never lost on redirect.
 *
 * Works on hardcoded <a href> markup too, which is why it listens on the
 * document instead of requiring every link to opt in.
 */
export function UtmForwarder() {
  const href = useRouterState({
    select: (state) => state.location.href,
  });

  // Capture on first paint and on every client-side navigation.
  useEffect(() => {
    captureUtmFromLocation();
  }, [href]);

  useEffect(() => {
    const decorate = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.getAttribute(DECORATED_FLAG) === anchor.getAttribute("href")) return;

      const raw = anchor.getAttribute("href");
      if (!raw || !/^https?:\/\//i.test(raw)) return; // internal links keep attribution in storage
      if (anchor.hostname === window.location.hostname) return;

      const next = withUtm(raw, getStoredUtm());
      if (next !== raw) {
        anchor.setAttribute("href", next);
        anchor.setAttribute(DECORATED_FLAG, next);
      }
    };

    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "pointerenter",
      "mousedown",
      "auxclick",
      "contextmenu",
      "touchstart",
      "focusin",
      "click",
    ];
    for (const name of events) {
      document.addEventListener(name, decorate, { capture: true, passive: true });
    }

    // Programmatic opens (window.open / window.location assignment helpers).
    const nativeOpen = window.open.bind(window);
    window.open = ((url?: string | URL, ...rest: unknown[]) => {
      const target = typeof url === "string" ? withUtm(url) : url;
      return (nativeOpen as unknown as (...args: unknown[]) => Window | null)(
        target,
        ...rest,
      );
    }) as typeof window.open;

    return () => {
      for (const name of events) {
        document.removeEventListener(name, decorate, { capture: true });
      }
      window.open = nativeOpen;
    };
  }, []);

  return null;
}
