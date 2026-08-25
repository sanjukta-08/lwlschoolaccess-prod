import { slugOf } from "@/lib/programme-detail";
import { Link } from "@tanstack/react-router";
import {
  TRACKS,
  TYPE_NAME,
  cohortGrades,
  feeOf,
  fmtLong,
  isSoon,
  dualTime,
} from "@/lib/programmes";
import type { CohortEntry } from "./MonthGrid";

export function DayList({
  day,
  entries,
  onClear,
}: {
  day: string;
  entries: CohortEntry[];
  onClear: () => void;
}) {
  return (
    <aside className="rounded-3xl border border-line bg-paper p-5 shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="mono-label text-ink-faint">Starting on</p>
          <h2 className="font-serif text-[1.25rem] font-semibold">{fmtLong(day)}</h2>
        </div>
        <button
          type="button"
          onClick={onClear}
          aria-label="Close day"
          className="h-8 w-8 flex-none rounded-full bg-wash text-ink-soft hover:text-ink"
        >
          ✕
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="text-[0.88rem] text-ink-soft">
          Nothing starts on this date with the current filters.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {entries.map(({ p, c }) => {
            const track = TRACKS[p.tracks[0]!];
            const [lo, hi] = cohortGrades(p, c);
            const fee = feeOf(p, c);
            return (
              <li
                key={p.id + c.d}
                className="rounded-2xl border border-line p-4"
                style={{ borderLeft: `4px solid ${track.color}` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold"
                    style={{ color: track.color }}
                  >
                    <span>{track.ic}</span>
                    {track.label}
                  </span>
                  {isSoon(c.d) ? (
                    <span className="rounded-md bg-gold px-2 py-[2px] text-[0.62rem] font-bold tracking-wide text-paper uppercase">
                      Soon
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-1 font-serif text-[1.1rem] leading-tight font-semibold">
                  {p.name}
                </h3>
                <p className="mt-1 font-mono text-[0.68rem] text-ink-faint">
                  {TYPE_NAME[p.type]} · G{lo}–{hi} · {p.dur}
                </p>
                <p className="mt-1 text-[0.82rem] text-ink-soft">{dualTime(p.time)}</p>
                <p className="mt-1.5 font-serif text-[1.05rem] font-semibold">{fee.e}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={p.apply}
                    target="_blank"
                    rel="noopener"
                    className="rounded-lg px-3.5 py-2 text-[0.8rem] font-bold text-paper no-underline hover:brightness-110"
                    style={{ background: track.color }}
                  >
                    Apply
                  </a>
                  <Link
                    to="/programmes/$slug"
                    params={{ slug: slugOf(p) }}
                    className="rounded-lg border-[1.5px] border-line px-3.5 py-2 text-[0.8rem] font-semibold text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
                  >
                    Full details
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
