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

function QuoteCard({
  q,
  onOpen,
  width = "",
}: {
  q: LearnerQuote;
  onOpen: () => void;
  width?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Read the full note from ${q.name}`}
      className={`flex h-full flex-col rounded-2xl border border-line bg-paper p-5 text-left shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-crimson focus-visible:outline-none ${width}`}
    >
      <span
        aria-hidden
        className="font-serif text-[1.6rem] leading-none text-gold"
      >
        “
      </span>
      <p className="mt-1 line-clamp-6 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">
        {q.quote}
      </p>
      <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
        <span className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crimson/10 font-serif text-[0.78rem] font-bold text-crimson-deep">
            {initialsOf(q.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[0.88rem] font-bold leading-tight text-ink">
              {q.name}
            </span>
            <span className="block text-[0.74rem] text-ink-faint">{q.role}</span>
          </span>
        </span>
        <span className="shrink-0 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[0.7rem] font-semibold text-ink-soft">
          {q.programme}
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
        className="flex w-max items-stretch gap-5 will-change-transform"
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
            width="w-[320px] shrink-0 sm:w-[380px]"
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
        <QuoteMarquee quotes={shown} onOpen={setOpen} duration={duration ?? 70} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((q) => (
            <QuoteCard key={`${q.name}-${q.quote.slice(0, 24)}`} q={q} onOpen={() => setOpen(q)} />
          ))}
        </div>
      )}
      <QuoteLightbox quote={open} onClose={() => setOpen(null)} />
    </>
  );
}

export default LearnerQuotes;
