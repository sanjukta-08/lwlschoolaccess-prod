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
import { slugOf } from "@/lib/programme-slug";
import { Link } from "@tanstack/react-router";
import { SaveButton } from "@/components/SaveButton";
import { AddToCalendar } from "@/components/AddToCalendar";
import { countdownLabel, decideLabel } from "@/lib/shortlist";
import { outcomeOf, startLabel, weeklyHoursOf } from "@/lib/outcome";
import { regionTimeLabel } from "@/lib/regions";
import ZoomBadge from "@/components/ZoomBadge";
import { TrackIcon } from "@/lib/track-icons";
import { logoFor } from "@/lib/programme-logos";


type Props = {
  match: Match;
  index?: number;
  label?: string | null;
  compact?: boolean;
  showType?: boolean;
  region?: string;
};

export function ProgrammeCard({
  match,
  index = 0,
  label,
  compact = false,
  showType = false,
  region = "all",
}: Props) {
  const { p, next, others } = match;
  const track = TRACKS[p.tracks[0]!];
  const [lo, hi] = cohortGrades(p, next);
  const fee = feeOf(p, next);
  const discounted = fee.r && fee.r !== fee.e;
  const timeLabel = regionTimeLabel(p, region) ?? shortTime(p.time);
  const outcome = outcomeOf(p);
  const hours = weeklyHoursOf(p);
  const logo = logoFor(p.id, p.tracks);


  if (compact) {
    return (
      <div className="group relative flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-wash sm:flex-row sm:items-center sm:gap-6">
        <Link
          to="/programmes/$slug"
          params={{ slug: slugOf(p) }}
          aria-label={`View ${p.name}`}
          className="absolute inset-0"
        />

        {/* Programme */}
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {logo ? (
            <span className="mt-[1px] flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-md border border-line bg-paper p-[3px]">
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </span>
          ) : (
            <span
              className="mt-[3px] flex-none"
              aria-hidden
              style={{ color: track.color }}
            >
              <TrackIcon track={p.tracks[0]!} className="h-[1.05rem] w-[1.05rem]" />
            </span>
          )}

          <span className="min-w-0">
            <b className="block truncate text-[0.95rem] leading-snug font-bold text-ink">
              {p.name}
            </b>
            <small className="mt-0.5 block truncate text-[0.8rem] text-ink-soft">
              {outcome}
            </small>
            <small className="mt-1 block truncate font-mono text-[0.7rem] text-ink-faint">
              {showType ? `${TYPE_NAME[p.type]} · ` : ""}Grades {lo}–{hi} · {p.dur} · ~
              {hours}h/week
            </small>

          </span>
        </div>

        {/* Schedule */}
        <div className="flex flex-col gap-0.5 sm:w-[10.5rem] sm:flex-none sm:items-end sm:text-right">
          <span className="font-mono text-[0.76rem] font-semibold text-ink">
            {startLabel(next.d)}
          </span>
          <span className="font-mono text-[0.7rem] text-ink-faint">{timeLabel}</span>
          {countdownLabel(next.d) ? (
            <span className="mt-0.5 font-mono text-[0.68rem] font-bold text-gold">
              {countdownLabel(next.d)}
            </span>
          ) : null}
        </div>

        {/* Fee */}
        <div className="flex flex-col gap-0.5 sm:w-[6.5rem] sm:flex-none sm:items-end sm:text-right">
          <span className="font-serif text-[1rem] leading-none font-semibold text-ink">
            {fee.e}
          </span>
          {discounted ? (
            <small className="font-mono text-[0.68rem] text-ink-faint line-through">
              {fee.r}
            </small>
          ) : null}
        </div>

        {/* Actions */}
        <div className="relative z-[2] flex flex-none items-center gap-2 sm:w-[7.75rem] sm:justify-end">
          <SaveButton p={p} c={next} />
          <Link
            to="/programmes/$slug"
            params={{ slug: slugOf(p) }}
            className="rounded-full border-[1.5px] border-ink bg-ink px-4 py-1.5 text-[0.78rem] font-bold text-paper no-underline transition-colors hover:border-crimson hover:bg-crimson"
          >
            View
          </Link>
        </div>
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
          <TrackIcon track={p.tracks[0]!} className="h-[1.05rem] w-[1.05rem]" />
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
          <div className="flex min-w-0 items-start gap-2.5">
            {logo ? (
              <span className="mt-[2px] flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-md border border-line bg-paper p-[3px]">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </span>
            ) : null}
            <h3 className="font-serif text-[1.2rem] leading-tight font-semibold">{p.name}</h3>
          </div>

          <span className="mt-0.5 flex flex-none items-center gap-1.5">
            {isSoon(next.d) ? (
              <span className="rounded-md bg-gold px-2 py-[3px] text-[0.62rem] font-bold tracking-wide text-paper uppercase">
                Soon
              </span>
            ) : null}
            <SaveButton p={p} c={next} />
          </span>
        </div>

        <p className="text-[0.88rem] font-semibold text-ink">{outcome}</p>

        {countdownLabel(next.d) || decideLabel(next.d) ? (
          <p className="flex flex-wrap items-center gap-1.5 text-[0.7rem] font-bold">
            {countdownLabel(next.d) ? (
              <span className="rounded-md bg-gold/12 px-2 py-0.5 text-gold">
                {countdownLabel(next.d)}
              </span>
            ) : null}
            {decideLabel(next.d) ? (
              <span className="rounded-md bg-crimson/8 px-2 py-0.5 text-crimson">
                {decideLabel(next.d)}
              </span>
            ) : null}
          </p>
        ) : null}

        <p className="clamp-2 text-[0.85rem] text-ink-soft">{p.tag}</p>

        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.76rem] text-ink-soft">
          <span>{TYPE_NAME[p.type]}</span>
          <span className="text-ink-faint">·</span>
          <span>
            Grades {lo}–{hi}
          </span>
          <span className="text-ink-faint">·</span>
          <span>
            {p.dur} · about {hours}h a week
          </span>
        </p>

        <p
          className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-wash px-3 py-2 font-mono text-[0.72rem] text-ink-soft"
          title={`Live on ${dualTime(p.time)}`}
        >
          <span className="font-semibold text-ink">{startLabel(next.d)}</span>
          <span className="text-ink-faint">·</span>
          <span>{timeLabel}</span>
          <span className="text-ink-faint">·</span>
          <ZoomBadge />
          <span className="text-ink-faint">·</span>
          <span>Fee {fee.e}</span>
        </p>


        {discounted ? (
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="text-[0.8rem] text-ink-faint line-through">{fee.r}</span>
            <span className="rounded-[5px] border border-gold px-[6px] py-0.5 text-[0.66rem] font-bold tracking-wide text-gold uppercase">
              Early bird
            </span>
          </div>
        ) : null}

        {others.length ? (
          <p className="flex flex-wrap items-center gap-[6px] text-[0.72rem] text-ink-faint">
            <b className="font-semibold text-ink-soft">Also starts</b>
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
          <Link
            to="/programmes/$slug"
            params={{ slug: slugOf(p) }}
            className="relative z-[2] flex-1 rounded-xl px-4 py-2 text-center text-[0.85rem] font-bold text-paper no-underline transition-[filter] hover:brightness-110"
            style={{ background: track.color }}
          >
            View programme
          </Link>
          <AddToCalendar p={p} c={next} />
        </div>
      </div>
    </article>
  );
}
