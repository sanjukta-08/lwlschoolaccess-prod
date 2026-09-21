import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import { captureUtmFromLocation, getStoredUtm, withUtm } from "@/lib/utm";

const DECORATED_FLAG = "data-utm-forwarded";

/**
 * Captures attribution from the current URL on every navigation and rewrites
 * outbound links (Application Portal apply/pay pages, partner sites) so the
 * UTM tags a visitor arrived with are never lost on redirect.
 *
 * Every outbound anchor in the document is decorated — including hardcoded
 * <a href> markup in the imported camp/conference pages — so copied links,
 * middle clicks and normal clicks all carry attribution.
 */
export function UtmForwarder() {
  const href = useRouterState({ select: (state) => state.location.href });

  // Capture on first paint and on every client-side navigation.
  useEffect(() => {
    captureUtmFromLocation();
  }, [href]);

  useEffect(() => {
    let frame = 0;

    const decorateAnchor = (anchor: HTMLAnchorElement) => {
      const raw = anchor.getAttribute("href");
      if (!raw || !/^https?:\/\//i.test(raw)) return; // internal links keep attribution in storage
      if (anchor.getAttribute(DECORATED_FLAG) === raw) return;
      if (anchor.hostname === window.location.hostname) return;

      const next = withUtm(raw, getStoredUtm());
      if (next !== raw) {
        anchor.setAttribute("href", next);
        anchor.setAttribute(DECORATED_FLAG, next);
      } else {
        anchor.setAttribute(DECORATED_FLAG, raw);
      }
    };

    const sweep = () => {
      frame = 0;
      document
        .querySelectorAll<HTMLAnchorElement>('a[href^="http"]')
        .forEach(decorateAnchor);
    };

    const scheduleSweep = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sweep);
    };

    // Catch links added by any later render, lightbox, accordion or carousel.
    const observer = new MutationObserver(scheduleSweep);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });

    // Last line of defence for a link about to be followed.
    const onInteract = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (anchor instanceof HTMLAnchorElement) decorateAnchor(anchor);
    };
    const events: (keyof DocumentEventMap)[] = ["pointerdown", "mousedown", "click", "auxclick", "contextmenu", "keydown"];
    for (const name of events) {
      document.addEventListener(name, onInteract, { capture: true, passive: true });
    }

    sweep();

    // Programmatic opens (window.open).
    const nativeOpen = window.open.bind(window);
    window.open = ((url?: string | URL, ...rest: unknown[]) => {
      const target = typeof url === "string" ? withUtm(url) : url;
      return (nativeOpen as unknown as (...args: unknown[]) => Window | null)(target, ...rest);
    }) as typeof window.open;

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      for (const name of events) {
        document.removeEventListener(name, onInteract, { capture: true });
      }
      window.open = nativeOpen;
    };
  }, [href]);

  return null;
}
