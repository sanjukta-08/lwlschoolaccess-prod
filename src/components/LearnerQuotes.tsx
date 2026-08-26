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
  { panel: "bg-crimson", mark: "text-crimson/30" },
  { panel: "bg-gold-deep", mark: "text-gold-deep/30" },
  { panel: "bg-ink", mark: "text-ink/25" },
];

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
  const a = ACCENTS[accent % ACCENTS.length]!;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Read the full note from ${q.name}`}
      className={`group relative flex flex-col self-stretch rounded-[2rem] rounded-tl-[3rem] pt-10 text-left transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-crimson focus-visible:outline-none ${a.panel} ${width}`}
    >
      {/* white quote plate, offset up and to the right like the reference */}
      <div className="relative -mt-8 ml-6 flex min-h-[10.5rem] flex-col rounded-[1.25rem] rounded-tr-[2.5rem] bg-paper p-5 shadow-[0_14px_34px_-18px_rgba(28,34,48,0.45)]">
        <span
          aria-hidden
          className={`font-serif text-[2.1rem] leading-[0.6] ${a.mark}`}
        >
          “
        </span>
        <p className="mt-3 line-clamp-5 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">
          {q.quote}
        </p>
        <span
          aria-hidden
          className={`mt-2 self-end font-serif text-[2.1rem] leading-[0.4] ${a.mark}`}
        >
          ”
        </span>
      </div>

      <footer className="flex items-center gap-3 px-6 py-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper font-serif text-[0.85rem] font-bold text-ink">
          {initialsOf(q.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-serif text-[1rem] font-semibold leading-tight text-paper">
            {q.name}
          </span>
          <span className="block truncate text-[0.72rem] text-paper/75">
            {q.role} · {q.programme}
          </span>
        </span>
        <span className="mono-label shrink-0 text-[0.6rem] text-paper/0 transition-colors group-hover:text-paper/80">
          Read →
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
        <QuoteMarquee quotes={shown} onOpen={setOpen} duration={duration ?? 55} />
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
