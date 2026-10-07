import { useEffect, useRef, useCallback } from "react";

export function useVideoAutoplay() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    if (video.paused) video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    tryPlay();

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) tryPlay();
        }),
      { threshold: 0.1 },
    );
    observer.observe(video);

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    const onInteraction = () => tryPlay();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pointerdown", onInteraction, { once: true });
    window.addEventListener("touchstart", onInteraction, { once: true });

    const t1 = setTimeout(tryPlay, 1000);
    const t2 = setTimeout(tryPlay, 3000);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [tryPlay]);

  return { videoRef, tryPlay };
}
