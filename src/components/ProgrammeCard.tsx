import {
  TRACKS,
  TYPE_NAME,
  cohortGrades,
  feeOf,
  fmtLong,
  fmtShort,
  isSoon,
} from "@/lib/programmes";
import type { Match } from "@/lib/finder";

type Props = {
  match: Match;
  index?: number;
  label?: string | null;
  onOpen: (id: string) => void;
};

export function ProgrammeCard({ match, index = 0, label, onOpen }: Props) {
  const { p, next, others } = match;
  const track = TRACKS[p.tracks[0]!];
  const [lo, hi] = cohortGrades(p, next);
  const fee = feeOf(p, next);
  const discounted = fee.r && fee.r !== fee.e;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`View ${p.name}`}
      onClick={() => onOpen(p.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(p.id);
        }
      }}
      style={
        {
          "--sp": track.color,
          animationDelay: `${Math.min(index * 40, 320)}ms`,
        } as React.CSSProperties
      }
      className="relative flex animate-in cursor-pointer flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-soft transition-all duration-150 fade-in slide-in-from-bottom-2 hover:-translate-y-[3px] hover:shadow-lift"
    >
      {label ? (
        <span
          className={`absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-[0.66rem] font-bold tracking-wide uppercase ${
            label === "Best match" ? "bg-crimson text-paper" : "bg-ink text-paper"
          }`}
        >
          {label}
        </span>
      ) : null}

      <div className="surface-track flex items-center justify-between gap-3 border-b px-5 py-3">
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
          {TYPE_NAME[p.type]} · G{lo}–{hi}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pt-4 pb-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[1.3rem] leading-tight font-semibold">{p.name}</h3>
          {isSoon(next.d) ? (
            <span className="mt-1 flex-none rounded-md bg-gold px-2 py-[3px] text-[0.66rem] font-bold tracking-wide text-paper uppercase">
              Starting soon
            </span>
          ) : null}
        </div>

        <p className="clamp-3 text-[0.88rem] text-ink-soft">{p.tag}</p>

        <dl className="flex flex-col gap-[7px] rounded-xl bg-wash px-3.5 py-3 text-[0.85rem]">
          {[
            ["Starts", fmtLong(next.d)],
            ["Length", p.dur],
            ["Live on", p.time],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-2.5">
              <dt className="mono-label flex-none basis-[74px] text-ink-faint">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-baseline gap-2.5 pt-0.5">
          <span className="font-serif text-[1.32rem] font-semibold">{fee.e}</span>
          {discounted ? (
            <>
              <span className="text-[0.82rem] text-ink-faint line-through">{fee.r}</span>
              <span className="rounded-[5px] border border-gold px-[7px] py-0.5 text-[0.7rem] font-bold tracking-wide text-gold uppercase">
                Early bird
              </span>
            </>
          ) : null}
        </div>

        {p.badge ? (
          <p className="text-[0.78rem] font-semibold text-track-fin">✓ {p.badge}</p>
        ) : null}

        {others.length ? (
          <p className="flex flex-wrap items-center gap-[7px] text-[0.75rem] text-ink-faint">
            <b className="font-semibold text-ink-soft">Also starts</b>
            {others.map((o) => (
              <span
                key={o.d}
                className="rounded-md border border-line bg-wash px-2 py-0.5 font-mono text-[0.7rem] text-ink-soft"
              >
                {fmtShort(o.d)}
              </span>
            ))}
          </p>
        ) : null}

        <div className="mt-auto flex items-center gap-2.5 pt-1.5">
          <a
            href={p.apply}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 rounded-xl px-4 py-2.5 text-center text-[0.88rem] font-bold text-paper no-underline transition-[filter] hover:brightness-110"
            style={{ background: track.color }}
          >
            Apply now
          </a>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(p.id);
            }}
            className="flex-none rounded-xl border-[1.5px] border-line px-4 py-2.5 text-[0.82rem] font-semibold text-ink-soft transition-colors hover:border-ink-soft hover:text-ink"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
