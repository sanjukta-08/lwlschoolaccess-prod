import {
  TRACKS,
  TYPE_NAME,
  cohortGrades,
  feeOf,
  fmtShort,
  isSoon,
  dualTime,
  shortTime,
} from "@/lib/programmes";
import type { Match } from "@/lib/finder";
import { slugOf } from "@/lib/programme-detail";
import { Link } from "@tanstack/react-router";

type Props = {
  match: Match;
  index?: number;
  label?: string | null;
  compact?: boolean;
  showType?: boolean;
};

export function ProgrammeCard({
  match,
  index = 0,
  label,
  compact = false,
  showType = false,
}: Props) {
  const { p, next, others } = match;
  const track = TRACKS[p.tracks[0]!];
  const [lo, hi] = cohortGrades(p, next);
  const fee = feeOf(p, next);
  const discounted = fee.r && fee.r !== fee.e;

  if (compact) {
    return (
      <div className="group relative flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-xl border border-line bg-paper px-4 py-3 transition-colors hover:border-ink-soft/40 hover:bg-wash">
        <Link
          to="/programmes/$slug"
          params={{ slug: slugOf(p) }}
          aria-label={`View ${p.name}`}
          className="absolute inset-0 rounded-xl"
        />
        <span className="text-base" aria-hidden style={{ color: track.color }}>
          {track.ic}
        </span>
        <span className="min-w-[10rem] flex-1">
          <b className="block text-[0.92rem] font-bold text-ink">{p.name}</b>
          <small className="mt-0.5 block text-[0.74rem] text-ink-faint">
            {TYPE_NAME[p.type]} · G{lo}–{hi} · {p.dur}
          </small>
        </span>
        <span className="font-mono text-[0.74rem] text-ink-soft">{fmtShort(next.d)}</span>
        <span className="hidden font-mono text-[0.74rem] text-ink-faint md:inline">
          {shortTime(p.time)}
        </span>
        <span className="font-serif text-[1rem] font-semibold">{fee.e}</span>
        <a
          href={p.apply}
          target="_blank"
          rel="noopener"
          onClick={(e) => e.stopPropagation()}
          className="relative rounded-lg px-3 py-1.5 text-[0.78rem] font-bold text-paper no-underline transition-[filter] hover:brightness-110"
          style={{ background: track.color }}
        >
          Apply
        </a>
      </div>
    );
  }

  return (
    <article
      style={
        {
          "--sp": track.color,
          animationDelay: `${Math.min(index * 40, 320)}ms`,
        } as React.CSSProperties
      }
      className="relative flex animate-in flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-soft transition-all duration-150 fade-in slide-in-from-bottom-2 hover:-translate-y-[3px] hover:shadow-lift"
    >
      <Link
        to="/programmes/$slug"
        params={{ slug: slugOf(p) }}
        aria-label={`View ${p.name}`}
        className="absolute inset-0 z-[1] rounded-lg"
      />
      {label ? (
        <span
          className={`absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-[0.66rem] font-bold tracking-wide uppercase ${
            label === "Best match" ? "bg-crimson text-paper" : "bg-ink text-paper"
          }`}
        >
          {label}
        </span>
      ) : null}

      <div className="surface-track flex items-center justify-between gap-3 border-b px-5 py-2.5">
        <span
          className="inline-flex items-center gap-2 text-[0.76rem] font-bold"
          style={{ color: track.color }}
        >
          <span className="text-base">{track.ic}</span>
          {track.label}
        </span>
        <span
          className="font-mono text-[0.66rem] font-semibold whitespace-nowrap opacity-85"
          style={{ color: track.color }}
        >
          {showType ? `${TYPE_NAME[p.type]} · ` : ""}G{lo}–{hi}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-5 pt-3.5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[1.2rem] leading-tight font-semibold">{p.name}</h3>
          {isSoon(next.d) ? (
            <span className="mt-1 flex-none rounded-md bg-gold px-2 py-[3px] text-[0.62rem] font-bold tracking-wide text-paper uppercase">
              Soon
            </span>
          ) : null}
        </div>

        <p className="clamp-2 text-[0.85rem] text-ink-soft">{p.tag}</p>

        <p
          className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-wash px-3 py-2 font-mono text-[0.72rem] text-ink-soft"
          title={`Live on ${dualTime(p.time)}`}
        >
          <span className="font-semibold text-ink">{fmtShort(next.d)}</span>
          <span className="text-ink-faint">·</span>
          <span>{p.dur}</span>
          <span className="text-ink-faint">·</span>
          <span>{shortTime(p.time)}</span>
        </p>

        <div className="flex flex-wrap items-baseline gap-2.5">
          <span className="font-serif text-[1.24rem] font-semibold">{fee.e}</span>
          {discounted ? (
            <>
              <span className="text-[0.8rem] text-ink-faint line-through">{fee.r}</span>
              <span className="rounded-[5px] border border-gold px-[6px] py-0.5 text-[0.66rem] font-bold tracking-wide text-gold uppercase">
                Early bird
              </span>
            </>
          ) : null}
        </div>

        {others.length ? (
          <p className="flex flex-wrap items-center gap-[6px] text-[0.72rem] text-ink-faint">
            <b className="font-semibold text-ink-soft">Also</b>
            {others.slice(0, 2).map((o) => (
              <span
                key={o.d}
                className="rounded-md border border-line bg-wash px-1.5 py-0.5 font-mono text-[0.68rem] text-ink-soft"
              >
                {fmtShort(o.d)}
              </span>
            ))}
            {others.length > 2 ? <span>+{others.length - 2} more</span> : null}
          </p>
        ) : null}

        <div className="mt-auto flex items-center gap-3 pt-2">
          <a
            href={p.apply}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            className="relative z-[2] flex-1 rounded-xl px-4 py-2 text-center text-[0.85rem] font-bold text-paper no-underline transition-[filter] hover:brightness-110"
            style={{ background: track.color }}
          >
            Apply now
          </a>
        </div>
      </div>
    </article>
  );
}
