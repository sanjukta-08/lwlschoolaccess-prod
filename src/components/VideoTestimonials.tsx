import { useEffect, useState } from "react";

import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import type { VideoTestimonial } from "@/lib/social-proof";

function VideoCard({
  video,
  onPlay,
}: {
  video: VideoTestimonial;
  onPlay: () => void;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Play the testimonial from ${video.name}`}
        className="group relative block aspect-[9/13] w-full overflow-hidden bg-ink/5"
      >
        <img
          src={`https://drive.google.com/thumbnail?id=${video.fileId}&sz=w800`}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,14,20,0.55),rgba(12,14,20,0.05)_55%)]" />
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-paper">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/70 bg-ink/45 pl-0.5 text-[1.1rem] backdrop-blur-sm transition-transform group-hover:scale-105">
            ▶
          </span>
          <span className="mono-label text-paper/85">Watch · 1 min</span>
        </span>
      </button>
      <figcaption className="border-t border-line px-4 py-3.5">
        <div className="text-[0.9rem] font-bold text-ink">{video.name}</div>
        <div className="mono-label mt-1 text-ink-faint">{video.cohort}</div>
      </figcaption>
    </figure>
  );
}

function VideoLightbox({
  video,
  onClose,
}: {
  video: VideoTestimonial | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={video !== null} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="w-auto max-w-[min(94vw,520px)] gap-0 overflow-hidden bg-paper p-0 [&>button]:hidden">
        {video ? (
          <>
            <div className="relative aspect-[9/13] h-[min(68vh,120vw)] w-auto bg-ink">
              <iframe
                src={`https://drive.google.com/file/d/${video.fileId}/preview`}
                title={`${video.name} testimonial`}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="h-full w-full border-0"
              />
              <DialogClose
                aria-label="Close video"
                className="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-paper/40 bg-ink/70 text-paper backdrop-blur-sm transition-colors hover:bg-ink"
              >
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
            <div className="border-t border-line px-5 py-3.5">
              <DialogTitle className="text-[1rem] font-bold text-ink">
                {video.name}
              </DialogTitle>
              <DialogDescription className="mono-label mt-1 text-ink-faint">
                {video.cohort}
              </DialogDescription>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

/** Four clips at a time, auto-advancing page by page. Pauses on hover. */
function VideoCarousel({
  videos,
  onPlay,
}: {
  videos: VideoTestimonial[];
  onPlay: (v: VideoTestimonial) => void;
}) {
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
                <VideoCard key={v.id} video={v} onPlay={() => onPlay(v)} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {pages > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => (p - 1 + pages) % pages)}
            aria-label="Previous clips"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink-soft transition-colors hover:border-crimson/40 hover:text-crimson"
          >
            <span aria-hidden>←</span>
          </button>
          <span className="flex items-center gap-2.5">
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
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => (p + 1) % pages)}
            aria-label="Next clips"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink-soft transition-colors hover:border-crimson/40 hover:text-crimson"
          >
            <span aria-hidden>→</span>
          </button>
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
  const [active, setActive] = useState<VideoTestimonial | null>(null);
  const shown = limit ? videos.slice(0, limit) : videos;
  if (shown.length === 0) return null;

  if (variant === "carousel")
    return (
      <>
        <VideoCarousel videos={shown} onPlay={setActive} />
        <VideoLightbox video={active} onClose={() => setActive(null)} />
      </>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {shown.map((v) => (
        <VideoCard key={v.id} video={v} onPlay={() => setActive(v)} />
      ))}
      <VideoLightbox video={active} onClose={() => setActive(null)} />
    </div>
  );
}
