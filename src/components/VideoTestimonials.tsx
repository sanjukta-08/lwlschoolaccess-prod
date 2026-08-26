import { useState } from "react";

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

export function VideoTestimonials({
  videos,
  limit,
}: {
  videos: VideoTestimonial[];
  limit?: number;
}) {
  const shown = limit ? videos.slice(0, limit) : videos;
  if (shown.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {shown.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}
