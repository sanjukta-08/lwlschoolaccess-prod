import { useEffect, useState } from "react";

import { Play, Quote } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { FORMATS } from "@/lib/testimonials";
import type { Testimonial } from "@/lib/testimonials";
import { TRACKS } from "@/lib/programmes";
import type { TrackKey } from "@/lib/programmes";

import birdAsset from "@/assets/lwl-bird-bg.png.asset.json";

const ACCENT: Record<string, string> = {
  ink: "bg-ink text-paper",
  crimson: "bg-crimson text-paper",
  gold: "bg-gold-deep text-paper",
  law: "bg-track-law text-paper",
  med: "bg-track-med text-paper",
  res: "bg-track-res text-paper",
  ai: "bg-track-ai text-paper",
  fin: "bg-track-fin text-paper",
  lead: "bg-track-lead text-paper",
  sat: "bg-ink text-paper",
};

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

const posterFor = (t: Extract<Testimonial, { format: "video" }>) =>
  t.video.poster ??
  (t.video.fileId
    ? `https://drive.google.com/thumbnail?id=${t.video.fileId}&sz=w800`
    : undefined);

function TrackChips({ tracks }: { tracks: TrackKey[] }) {
  return (
    <span className="mono-label truncate text-[0.6rem] text-ink-faint">
      {tracks
        .map((t) => TRACKS[t]?.short)
        .filter(Boolean)
        .join(" · ")}
    </span>
  );
}

function CardShell({
  t,
  onOpen,
  children,
  footer,
}: {
  t: Testimonial;
  onOpen: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open the testimonial from ${t.name}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper p-5 text-left shadow-soft transition-transform hover:-translate-y-1 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-crimson focus-visible:outline-none"
    >
      <img
        src={birdAsset.url}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -right-3 bottom-2 h-20 w-20 select-none object-contain opacity-[0.08]"
      />

      <header className="relative z-10 flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-sans text-[0.85rem] font-bold shadow-soft ${
            ACCENT[t.accent] ?? ACCENT["ink"]
          }`}
        >
          {initialsOf(t.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-serif text-[1.05rem] font-semibold leading-tight text-ink">
            {t.name}
          </span>
          <span className="mono-label mt-0.5 block text-[0.6rem] text-gold-deep">
            {t.voice === "parent" ? "Parent" : "Student"} ·{" "}
            {FORMATS[t.format].short}
          </span>
        </span>
      </header>

      <div className="relative z-10 mt-4 flex-1">{children}</div>

      <footer className="relative z-10 mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
        <span className="min-w-0 flex-1 truncate font-serif text-[0.9rem] font-semibold text-ink-soft">
          {t.cohort}
        </span>
        {footer ?? (
          <span className="mono-label shrink-0 text-[0.6rem] text-ink-faint transition-colors group-hover:text-crimson">
            Read
          </span>
        )}
      </footer>
    </button>
  );
}

function Card({ t, onOpen }: { t: Testimonial; onOpen: () => void }) {
  if (t.format === "video") {
    const poster = posterFor(t);
    return (
      <CardShell
        t={t}
        onOpen={onOpen}
        footer={
          <span className="mono-label shrink-0 text-[0.6rem] text-crimson">
            Watch
          </span>
        }
      >
        <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink/5">
          {poster ? (
            <img
              src={poster}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/70 bg-ink/45 text-paper backdrop-blur-sm">
              <Play className="h-4 w-4" />
            </span>
          </span>
        </span>
      </CardShell>
    );
  }

  if (t.format === "note") {
    return (
      <CardShell t={t} onOpen={onOpen}>
        <span className="block overflow-hidden rounded-xl border border-line bg-ink/[0.03]">
          <img
            src={t.note.src}
            alt={`Handwritten note from ${t.name}`}
            loading="lazy"
            className="h-40 w-full object-cover"
          />
        </span>
        <span className="mt-3 block line-clamp-2 font-serif text-[0.98rem] italic leading-snug text-ink">
          “{t.note.quote}”
        </span>
      </CardShell>
    );
  }

  if (t.format === "linkedin" || t.format === "instagram") {
    return (
      <CardShell t={t} onOpen={onOpen}>
        {t.story.image ? (
          <img
            src={t.story.image}
            alt={t.story.imageAlt ?? `${FORMATS[t.format].short} post by ${t.name}`}
            loading="lazy"
            className="mb-3 w-full rounded-xl border border-line object-cover"
          />
        ) : null}
        <span className="block line-clamp-5 text-[0.9rem] leading-relaxed text-ink-soft">
          {t.story.text}
        </span>
      </CardShell>
    );
  }

  return (
    <CardShell t={t} onOpen={onOpen}>
      <Quote aria-hidden className="mb-2 h-4 w-4 text-gold-deep" />
      <span className="block line-clamp-6 font-serif text-[1.08rem] italic leading-[1.45] text-ink">
        “{t.quote.quote}”
      </span>
    </CardShell>
  );
}

function Lightbox({
  item,
  onClose,
}: {
  item: Testimonial | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  return (
    <Dialog open={item !== null} onOpenChange={(o) => (o ? null : onClose())}>
      <DialogContent className="max-h-[88vh] max-w-[44rem] overflow-y-auto bg-paper">
        {item ? (
          <>
            <DialogTitle className="font-serif text-[1.2rem] font-semibold text-ink">
              {item.name}
            </DialogTitle>
            <DialogDescription className="mono-label text-[0.62rem] text-ink-faint">
              {item.voice === "parent" ? "Parent" : "Student"} · {item.cohort} ·{" "}
              {FORMATS[item.format].label}
            </DialogDescription>

            <div className="mt-3">
              {item.format === "written" ? (
                <>
                  <p className="font-serif text-[1.15rem] italic leading-[1.5] text-ink">
                    “{item.quote.quote}”
                  </p>
                  {item.quote.more ? (
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                      {item.quote.more}
                    </p>
                  ) : null}
                </>
              ) : null}

              {item.format === "note" ? (
                <>
                  <img
                    src={item.note.src}
                    alt={`Handwritten note from ${item.name}`}
                    className="w-full rounded-xl border border-line"
                  />
                  <p className="mt-4 font-serif text-[1.1rem] italic leading-[1.5] text-ink">
                    “{item.note.quote}”
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                    {item.note.transcript}
                  </p>
                </>
              ) : null}

              {item.format === "linkedin" || item.format === "instagram" ? (
                <>
                  {item.story.image ? (
                    <img
                      src={item.story.image}
                      alt={item.story.imageAlt ?? `Post by ${item.name}`}
                      className="w-full rounded-xl border border-line"
                    />
                  ) : null}
                  <p className="mt-4 text-[0.95rem] leading-relaxed whitespace-pre-line text-ink-soft">
                    {item.story.text}
                  </p>
                </>
              ) : null}

              {item.format === "video" ? (
                <div className="overflow-hidden rounded-xl bg-ink">
                  {item.video.src ? (
                    <video
                      src={item.video.src}
                      poster={item.video.poster}
                      title={`${item.name} testimonial`}
                      controls
                      autoPlay
                      playsInline
                      className="max-h-[62vh] w-full bg-ink object-contain"
                    />
                  ) : item.video.fileId ? (
                    <iframe
                      src={`https://drive.google.com/file/d/${item.video.fileId}/preview`}
                      title={`${item.name} testimonial`}
                      allow="autoplay"
                      className="aspect-[9/13] max-h-[62vh] w-full"
                    />
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
              <TrackChips tracks={item.tracks} />
              <span className="mono-label text-[0.6rem] text-gold-deep">
                {item.programme}
              </span>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export function TestimonialGrid({ items }: { items: Testimonial[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const active = items.find((t) => t.id === open) ?? null;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-paper p-10 text-center">
        <p className="font-serif text-[1.15rem] text-ink">
          No testimonials match those filters yet.
        </p>
        <p className="mt-2 text-[0.9rem] text-ink-soft">
          Try widening the interest or clearing the search.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <Card key={t.id} t={t} onOpen={() => setOpen(t.id)} />
        ))}
      </div>
      <Lightbox item={active} onClose={() => setOpen(null)} />
    </>
  );
}

export default TestimonialGrid;
