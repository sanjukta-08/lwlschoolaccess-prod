import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import { captureUtmFromLocation, getStoredUtm, withUtm } from "@/lib/utm";

const DECORATED_FLAG = "data-utm-forwarded";

/**
 * Captures attribution from the current URL on every navigation and rewrites
 * outbound links (Application Portal apply/pay pages, partner sites) at the
 * moment they are used, so the UTM tags a visitor arrived with are never lost
 * on redirect.
 *
 * Decoration happens on interaction rather than as a DOM sweep, so it works on
 * the hardcoded <a href> markup in the imported camp/conference pages without
 * rewriting server-rendered HTML before React hydrates it.
 */
export function UtmForwarder() {
  const href = useRouterState({ select: (state) => state.location.href });

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

      const raw = anchor.getAttribute("href");
      if (!raw || !/^https?:\/\//i.test(raw)) return; // internal links keep attribution in storage
      if (anchor.getAttribute(DECORATED_FLAG) === raw) return;
      if (anchor.hostname === window.location.hostname) return;

      const next = withUtm(raw, getStoredUtm());
      if (next !== raw) {
        anchor.setAttribute("href", next);
        anchor.setAttribute(DECORATED_FLAG, next);
      }
    };

    // Covers left click, middle click, keyboard activation, drag and
    // right-click "copy link address" — every way a link leaves this site.
    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "mousedown",
      "mouseover",
      "touchstart",
      "click",
      "auxclick",
      "contextmenu",
      "keydown",
      "dragstart",
      "focusin",
    ];
    for (const name of events) {
      document.addEventListener(name, decorate, { capture: true, passive: true });
    }

    // Programmatic opens (window.open).
    const nativeOpen = window.open.bind(window);
    window.open = ((url?: string | URL, ...rest: unknown[]) => {
      const target = typeof url === "string" ? withUtm(url) : url;
      return (nativeOpen as unknown as (...args: unknown[]) => Window | null)(target, ...rest);
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
