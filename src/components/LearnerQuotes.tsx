import { useEffect, useState } from "react";
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
  { avatar: "bg-ink text-paper", label: "text-ink" },
  { avatar: "bg-crimson text-paper", label: "text-crimson" },
  { avatar: "bg-gold-deep text-paper", label: "text-gold-deep" },
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
      className={`group relative flex min-h-[20rem] flex-col justify-between self-stretch overflow-visible rounded-[1.25rem] rounded-tr-[3.5rem] bg-paper px-7 py-6 text-left ring-1 ring-ink/10 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-crimson focus-visible:outline-none ${width}`}
    >
      {/* Overlapping initials plate */}
      <span
        className={`absolute -left-7 top-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-sans text-[1rem] font-bold shadow-soft ring-4 ring-paper ${a.avatar}`}
      >
        {initialsOf(q.name)}
      </span>

      <header className="pl-7">
        <span className="block truncate font-serif text-[1.15rem] font-semibold leading-tight text-ink">
          {q.name}
        </span>
        <span className="mono-label mt-1 block text-[0.62rem] text-gold-deep">
          {q.role}
        </span>
      </header>

      <p className="my-4 line-clamp-5 font-serif text-[1.12rem] italic leading-[1.4] text-ink">
        “{q.quote}”
      </p>

      <footer className="relative flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
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

/** Page-by-page quote carousel so feedback cards never appear chopped at the edges. */
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
  const pages = Math.max(1, Math.ceil(quotes.length / perPage));
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (paused || pages < 2) return;
    const interval = Math.max(9000, duration * 60);
    const id = window.setInterval(() => setPage((p) => (p + 1) % pages), interval);
    return () => window.clearInterval(id);
  }, [duration, paused, pages]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="grid gap-x-8 gap-y-6 py-2 pl-8 sm:grid-cols-2 lg:grid-cols-3">
        {quotes.slice(page * perPage, page * perPage + perPage).map((q, i) => (
          <QuoteCard
            key={`${q.name}-${i}`}
            q={q}
            onOpen={() => onOpen(q)}
            accent={page * perPage + i}
            width="w-full"
          />
        ))}
      </div>

      {pages > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => (p - 1 + pages) % pages)}
            aria-label="Previous learner feedback"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink-soft transition-colors hover:border-crimson/40 hover:text-crimson"
          >
            <span aria-hidden>←</span>
          </button>
          <span className="mono-label text-ink-faint">
            {page + 1} / {pages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => (p + 1) % pages)}
            aria-label="Next learner feedback"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink-soft transition-colors hover:border-crimson/40 hover:text-crimson"
          >
            <span aria-hidden>→</span>
          </button>
        </div>
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
