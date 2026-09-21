import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

import { startSession, trackEvent } from "@/lib/tracking";

/**
 * Starts one tracking session per visit and records a page view on every
 * client-side navigation. Mounted once in the root route.
 */
export function TrackingProvider() {
  const href = useRouterState({ select: (state) => state.location.href });
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void startSession();
  }, []);

  useEffect(() => {
    trackEvent("page_view");
  }, [href]);

  return null;
}
