import { Link } from "@tanstack/react-router";
import { slugOf } from "@/lib/programme-slug";
import { SaveButton } from "@/components/SaveButton";
import { AddToCalendar } from "@/components/AddToCalendar";
import {
  TRACKS,
  cohortGrades,
  dualTime,
  feeOf,
  fmtShort,
  isSoon,
  parseISO,
  type Cohort,
  type Programme,
} from "@/lib/programmes";

type Entry = { p: Programme; c: Cohort };

const monthOf = (iso: string) =>
  parseISO(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

export function CohortAgenda({
  entries,
}: {
  entries: Entry[];
}) {
  if (!entries.length) {
    return (
      <p className="py-6 text-center text-[0.9rem] text-ink-faint">
        Nothing matches — try a different search or clear the filter.
      </p>
    );
  }

  const groups: { month: string; rows: Entry[] }[] = [];
  entries.forEach((e) => {
    const m = monthOf(e.c.d);
    const last = groups[groups.length - 1];
    if (last && last.month === m) last.rows.push(e);
    else groups.push({ month: m, rows: [e] });
  });

  return (
    <div>
      {groups.map((g) => (
        <div key={g.month}>
          <div className="mt-6 mb-2.5 flex items-baseline gap-3">
            <h3 className="font-serif text-[1.25rem] font-semibold">{g.month}</h3>
            <small className="font-mono text-[0.7rem] text-ink-faint">
              {g.rows.length} cohort{g.rows.length === 1 ? "" : "s"}
            </small>
          </div>
          <div className="flex flex-col gap-2">
            {g.rows.map(({ p, c }) => {
              const [lo, hi] = cohortGrades(p, c);
              const fee = feeOf(p, c);
              const soon = isSoon(c.d);
              const track = TRACKS[p.tracks[0]!];
              return (
                <Link
                  key={p.id + c.d}
                  to="/programmes/$slug"
                  params={{ slug: slugOf(p) }}
                  className="flex w-full items-center gap-4 rounded-2xl border border-line bg-paper px-4 py-3 text-left text-ink no-underline transition-transform hover:-translate-y-px hover:shadow-soft"
                >
                  <span
                    className="shrink-0 border-r border-line pr-3.5 text-center"
                    style={{ width: 66 }}
                  >
                    <b
                      className="block font-serif text-[1.35rem] leading-none font-semibold"
                      style={{ color: track?.color }}
                    >
                      {parseISO(c.d).getDate()}
                    </b>
                    <small className="mono-label text-ink-faint">
                      {fmtShort(c.d).split(" ")[1]}
                    </small>
                  </span>
                  <span className="min-w-0 flex-1">
                    <b className="block text-[0.95rem] font-bold text-ink">{p.name}</b>
                    <small className="mt-0.5 block text-[0.76rem] text-ink-soft">
                      Grades {lo}–{hi} · {p.dur} · {dualTime(p.time)}
                    </small>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="font-serif text-[1rem] font-semibold">{fee.e}</span>
                    {soon ? (
                      <span className="rounded-md bg-gold/10 px-2 py-0.5 text-[0.62rem] font-bold tracking-[0.06em] uppercase text-gold">
                        Starting soon
                      </span>
                    ) : (
                      <span className="hidden rounded-md bg-track-fin/10 px-2 py-0.5 text-[0.62rem] font-bold tracking-[0.06em] uppercase text-track-fin sm:inline">
                        Applications open
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <AddToCalendar p={p} c={c} />
                      <SaveButton p={p} c={c} />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
