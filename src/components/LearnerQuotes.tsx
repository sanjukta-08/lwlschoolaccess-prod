import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import birdAsset from "@/assets/lwl-bird-bg.png.asset.json";
import { accentForQuote } from "@/lib/learner-testimonials";
import type { LearnerQuote } from "@/lib/learner-testimonials";

function initialsOf(name: string) {
  return name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const ACCENT_TOKENS: Record<string, { avatar: string; label: string }> = {
  ink: { avatar: "bg-ink text-paper", label: "text-ink" },
  crimson: { avatar: "bg-crimson text-paper", label: "text-crimson" },
  gold: { avatar: "bg-gold-deep text-paper", label: "text-gold-deep" },
  law: { avatar: "bg-track-law text-paper", label: "text-track-law" },
  med: { avatar: "bg-track-med text-paper", label: "text-track-med" },
  res: { avatar: "bg-track-res text-paper", label: "text-track-res" },
  ent: { avatar: "bg-track-ent text-paper", label: "text-track-ent" },
  ai: { avatar: "bg-track-ai text-paper", label: "text-track-ai" },
  fin: { avatar: "bg-track-fin text-paper", label: "text-track-fin" },
  lead: { avatar: "bg-track-lead text-paper", label: "text-track-lead" },
  deb: { avatar: "bg-track-deb text-paper", label: "text-track-deb" },
};

const DEFAULT_ACCENT = ACCENT_TOKENS["ink"]!;

function QuoteCard({
  q,
  onOpen,
  width = "",
  accent = "ink",
}: {
  q: LearnerQuote;
  onOpen: () => void;
  width?: string;
  accent?: string;
}) {
  const a = ACCENT_TOKENS[accent] ?? DEFAULT_ACCENT;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Read the full note from ${q.name}`}
      className={`group relative flex min-h-[20rem] flex-col justify-between self-stretch overflow-visible rounded-[1.25rem] rounded-tr-[3.5rem] bg-paper px-7 py-6 text-left ring-1 ring-ink/10 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-crimson focus-visible:outline-none ${width}`}
    >
      {/* Brand bird watermark */}
      <img
        src={birdAsset.url}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute left-4 bottom-4 z-0 w-24 h-24 object-contain opacity-[0.10] select-none"
      />

      {/* Overlapping initials plate */}
      <span
        className={`absolute -left-7 top-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-sans text-[1rem] font-bold shadow-soft ring-4 ring-paper ${a.avatar}`}
      >
        {initialsOf(q.name)}
      </span>

      <header className="relative z-10 pl-7">
        <span className="block truncate font-serif text-[1.15rem] font-semibold leading-tight text-ink">
          {q.name}
        </span>
        <span className="mono-label mt-1 block text-[0.62rem] text-gold-deep">
          {q.role}
        </span>
      </header>

      <p className="relative z-10 my-4 line-clamp-5 font-serif text-[1.12rem] italic leading-[1.4] text-ink">
        “{q.quote}”
      </p>

      <footer className="relative z-10 flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
        <span className={`min-w-0 truncate font-serif text-[0.95rem] font-semibold ${a.label}`}>
          {q.programme}
        </span>
        <span className="mono-label shrink-0 text-[0.6rem] text-ink-faint transition-colors group-hover:text-crimson">
          Read
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute -top-8 right-0 select-none font-serif text-[4rem] italic leading-none text-ink/[0.06]"
        >
          ”
        </span>
      </footer>
    </button>
  );
}




function QuoteLightbox({
  quote,
  onClose,
}: {
  quote: LearnerQuote | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={quote !== null} onOpenChange={(o) => (o ? null : onClose())}>
      <DialogContent className="max-w-[42rem]">
        {quote ? (
          <>
            <DialogTitle className="font-serif text-[1.15rem] font-medium">
              {quote.name}
            </DialogTitle>
            <DialogDescription className="text-[0.8rem] text-ink-faint">
              {quote.role} · {quote.programme}
            </DialogDescription>
            <div className="mt-3 max-h-[60vh] overflow-y-auto pr-1">
              <p className="font-serif text-[1.02rem] leading-relaxed text-ink">
                “{quote.quote}
                {quote.more ? "" : "”"}
              </p>
              {quote.more ? (
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">
                  {quote.more}”
                </p>
              ) : null}
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function windowOf<T>(items: T[], start: number, count: number) {
  if (items.length === 0) return [] as { item: T; index: number }[];
  return Array.from({ length: Math.min(count, items.length) }, (_, k) => {
    const index = (start + k) % items.length;
    return { item: items[index] as T, index };
  });
}

/** Continuous one-card-at-a-time auto slide with side arrows. */
function QuoteMarquee({
  quotes,
  onOpen,
  duration = 180,
}: {
  quotes: LearnerQuote[];
  onOpen: (q: LearnerQuote) => void;
  duration?: number;
}) {
  const [paused, setPaused] = useState(false);
  const perPage = 3;
  const [start, setStart] = useState(0);
  const canSlide = quotes.length > perPage;

  useEffect(() => {
    if (paused || !canSlide) return;
    const interval = Math.max(4000, (duration * 1000) / Math.max(1, quotes.length));
    const id = window.setInterval(
      () => setStart((s) => (s + 1) % quotes.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [duration, paused, canSlide, quotes.length]);

  const visible = windowOf(quotes, start, perPage);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {canSlide ? (
        <button
          type="button"
          onClick={() => setStart((s) => (s - 1 + quotes.length) % quotes.length)}
          aria-label="Previous learner feedback"
          className="hidden sm:flex absolute left-0 top-1/2 z-20 h-10 w-10 -translate-x-[calc(100%+0.5rem)] -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-gold-soft text-gold-deep shadow-soft ring-2 ring-paper transition hover:bg-gold hover:text-paper"
        >
          <span aria-hidden>←</span>
        </button>
      ) : null}

      <div className="grid gap-x-8 gap-y-6 py-2 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ item, index }) => (
          <QuoteCard
            key={`${item.name}-${index}`}
            q={item}
            onOpen={() => onOpen(item)}
            accent={accentForQuote(item)}
            width="w-full"
          />
        ))}
      </div>

      {canSlide ? (
        <button
          type="button"
          onClick={() => setStart((s) => (s + 1) % quotes.length)}
          aria-label="Next learner feedback"
          className="hidden sm:flex absolute right-0 top-1/2 z-20 h-10 w-10 translate-x-[calc(100%+0.5rem)] -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-gold-soft text-gold-deep shadow-soft ring-2 ring-paper transition hover:bg-gold hover:text-paper"
        >
          <span aria-hidden>→</span>
        </button>
      ) : null}
    </div>
  );
}


export function LearnerQuotes({
  quotes,
  variant = "marquee",
  limit,
  duration,
}: {
  quotes: LearnerQuote[];
  variant?: "marquee" | "grid";
  limit?: number;
  duration?: number;
}) {
  const shown = limit ? quotes.slice(0, limit) : quotes;
  const [open, setOpen] = useState<LearnerQuote | null>(null);

  if (shown.length === 0) return null;

  return (
    <>
      {variant === "marquee" ? (
        <QuoteMarquee quotes={shown} onOpen={setOpen} duration={duration ?? 180} />
      ) : (
        <div className="grid gap-x-8 gap-y-6 pl-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((q, i) => (
            <QuoteCard
              key={`${q.name}-${q.quote.slice(0, 24)}`}
              q={q}
              accent={accentForQuote(q)}
              onOpen={() => setOpen(q)}
            />
          ))}
        </div>

      )}
      <QuoteLightbox quote={open} onClose={() => setOpen(null)} />
    </>
  );
}

export default LearnerQuotes;
