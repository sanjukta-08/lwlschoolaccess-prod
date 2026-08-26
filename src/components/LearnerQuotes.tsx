import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LearnerQuote } from "@/lib/learner-testimonials";

function initialsOf(name: string) {
  return name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const ACCENTS = [
  {
    panel: "bg-crimson",
    quote: "text-crimson/35",
    avatar: "bg-crimson-deep text-paper ring-paper",
  },
  {
    panel: "bg-gold-deep",
    quote: "text-gold-deep/35",
    avatar: "bg-gold text-paper ring-paper",
  },
  {
    panel: "bg-ink",
    quote: "text-ink/25",
    avatar: "bg-ink text-paper ring-paper",
  },
] as const;

const DEFAULT_ACCENT = ACCENTS[0];

function QuoteCard({
  q,
  onOpen,
  width = "",
  accent = 0,
}: {
  q: LearnerQuote;
  onOpen: () => void;
  width?: string;
  accent?: number;
}) {
  const a = ACCENTS[accent % ACCENTS.length] ?? DEFAULT_ACCENT;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Read the full note from ${q.name}`}
      className={`group relative flex min-h-[23.5rem] flex-col self-stretch overflow-visible rounded-[2rem] rounded-tl-[3.25rem] p-4 pt-7 text-left shadow-soft transition-transform hover:-translate-y-1 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-crimson focus-visible:outline-none ${a.panel} ${width}`}
    >
      <div className="pointer-events-none absolute inset-x-7 top-4 h-10 rounded-full border border-paper/30" />
      <div className="relative ml-5 flex min-h-[15.25rem] flex-1 flex-col rounded-[1.35rem] rounded-tr-[3rem] bg-paper p-6 shadow-lift ring-1 ring-ink/5">
        <span
          aria-hidden
          className={`font-serif text-[3.4rem] leading-[0.48] ${a.quote}`}
        >
          “
        </span>
        <p className="mt-3 line-clamp-6 flex-1 font-serif text-[1.04rem] leading-[1.55] text-ink">
          {q.quote}
        </p>
        <span
          aria-hidden
          className={`mt-3 self-end font-serif text-[3rem] leading-[0.42] ${a.quote}`}
        >
          ”
        </span>
      </div>

      <footer className="relative flex min-h-[5.4rem] items-end gap-3 px-3 pb-2 pt-5">
        <span
          className={`absolute -top-5 left-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-serif text-[0.9rem] font-bold shadow-soft ring-[5px] ${a.avatar}`}
        >
          {initialsOf(q.name)}
        </span>
        <span className="min-w-0 flex-1 pl-[4.4rem]">
          <span className="block truncate font-serif text-[1.1rem] font-semibold leading-tight text-paper">
            {q.name}
          </span>
          <span className="mt-1 block line-clamp-2 text-[0.74rem] leading-snug text-paper/78">
            {q.role} • {q.programme}
          </span>
        </span>
        <span className="mono-label mb-1 shrink-0 text-[0.62rem] text-paper/70 transition-colors group-hover:text-paper">
          Read
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

/** Continuous marquee of learner quotes. Hover or focus pauses it. */
function QuoteMarquee({
  quotes,
  onOpen,
  duration = 70,
}: {
  quotes: LearnerQuote[];
  onOpen: (q: LearnerQuote) => void;
  duration?: number;
}) {
  const [paused, setPaused] = useState(false);
  const loop =
    quotes.length < 6
      ? [...quotes, ...quotes, ...quotes, ...quotes]
      : [...quotes, ...quotes];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="flex w-max items-stretch gap-6 py-2 will-change-transform"
        style={{
          animation: `learner-quote-scroll ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {loop.map((q, i) => (
          <QuoteCard
            key={`${q.name}-${i}`}
            q={q}
            onOpen={() => onOpen(q)}
            accent={i}
            width="w-[340px] shrink-0 sm:w-[420px]"
          />
        ))}
      </div>

      <style>{`
        @keyframes learner-quote-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="learner-quote-scroll"] { animation: none !important; }
        }
      `}</style>
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
        <QuoteMarquee quotes={shown} onOpen={setOpen} duration={duration ?? 95} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((q, i) => (
            <QuoteCard
              key={`${q.name}-${q.quote.slice(0, 24)}`}
              q={q}
              accent={i}
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
