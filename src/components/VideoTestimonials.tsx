import { useEffect, useState } from "react";

import type { VideoTestimonial } from "@/lib/social-proof";

function VideoCard({ video }: { video: VideoTestimonial }) {
  const [play, setPlay] = useState(false);

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
      <div className="relative aspect-[9/13] bg-ink">
        {play ? (
          <iframe
            src={`https://drive.google.com/file/d/${video.fileId}/preview`}
            title={`${video.name} testimonial`}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            aria-label={`Play the testimonial from ${video.name}`}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.14),transparent_65%)] text-paper"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-gold/15 text-[1.1rem] transition-transform group-hover:scale-105">
              ▶
            </span>
            <span className="mono-label text-paper/70">Watch · 1 min</span>
          </button>
        )}
      </div>
      <figcaption className="border-t border-line px-4 py-3.5">
        <div className="text-[0.9rem] font-bold text-ink">{video.name}</div>
        <div className="mono-label mt-1 text-ink-faint">{video.cohort}</div>
      </figcaption>
    </figure>
  );
}

/** Four clips at a time, auto-advancing page by page. Pauses on hover. */
function VideoCarousel({ videos }: { videos: VideoTestimonial[] }) {
  const perPage = 4;
  const pages = Math.max(1, Math.ceil(videos.length / perPage));
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || pages < 2) return;
    const id = window.setInterval(() => setPage((p) => (p + 1) % pages), 7000);
    return () => window.clearInterval(id);
  }, [paused, pages]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {Array.from({ length: pages }).map((_, p) => (
            <div
              key={p}
              className="grid w-full shrink-0 gap-4 sm:grid-cols-2 lg:grid-cols-4"
              aria-hidden={p !== page}
            >
              {videos.slice(p * perPage, p * perPage + perPage).map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {pages > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-2.5">
          {Array.from({ length: pages }).map((_, p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-label={`Show clips ${p * perPage + 1}-${Math.min(
                (p + 1) * perPage,
                videos.length,
              )}`}
              aria-current={p === page}
              className={`h-2 rounded-full transition-all ${
                p === page ? "w-7 bg-crimson" : "w-2 bg-ink/20 hover:bg-ink/35"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function VideoTestimonials({
  videos,
  limit,
  variant = "grid",
}: {
  videos: VideoTestimonial[];
  limit?: number;
  /** "carousel" shows four clips at a time and auto-advances. */
  variant?: "grid" | "carousel";
}) {
  const shown = limit ? videos.slice(0, limit) : videos;
  if (shown.length === 0) return null;

  if (variant === "carousel") return <VideoCarousel videos={shown} />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {shown.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}
