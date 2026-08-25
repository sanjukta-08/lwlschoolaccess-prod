import {
  TRACKS,
  TYPE_IC,
  TYPE_NAME,
  cohortGrades,
  dualTime,
  feeOf,
  fmtShort,
  isSoon,
  parseISO,
  type Cohort,
  type Programme,
} from "@/lib/programmes";
import type { Entry, MonthGroup, TypeGroup } from "@/lib/finder";

function CohortRow({
  p,
  c,
  others,
  onOpen,
}: {
  p: Programme;
  c: Cohort;
  others?: Cohort[];
  onOpen: (id: string) => void;
}) {
  const track = TRACKS[p.tracks[0]!];
  const [lo, hi] = cohortGrades(p, c);
  const fee = feeOf(p, c);
  const date = parseISO(c.d);

  return (
    <button
      type="button"
      onClick={() => onOpen(p.id)}
      style={{ borderLeftColor: track.color }}
      className="flex w-full items-center gap-4 rounded-2xl border border-line border-l-[4px] bg-paper px-4 py-3.5 text-left transition-all hover:-translate-y-px hover:shadow-lift"
    >
      <span className="w-[54px] shrink-0 text-center">
        <b
          className="block font-serif text-[1.5rem] leading-none font-semibold"
          style={{ color: track.color }}
        >
          {date.getDate()}
        </b>
        <small className="mono-label text-ink-faint">
          {date.toLocaleDateString("en-GB", { month: "short" })}
        </small>
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="mono-label block text-[0.66rem]"
          style={{ color: track.color }}
        >
          {track.ic} {track.label} · {TYPE_IC[p.type]} {TYPE_NAME[p.type]}
        </span>
        <b className="mt-0.5 block text-[0.98rem] font-bold text-ink">{p.name}</b>
        <small className="block text-[0.78rem] text-ink-soft">
          Grades {lo}–{hi} · {p.dur} · {dualTime(p.time)}
        </small>
        {others?.length ? (
          <span className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[0.72rem] text-ink-faint">
            Also starts
            {others.map((o) => (
              <span
                key={o.d}
                className="rounded-md border border-line bg-wash px-1.5 py-0.5 font-mono text-[0.68rem] text-ink-soft"
              >
                {fmtShort(o.d)}
              </span>
            ))}
          </span>
        ) : null}
      </span>

      <span className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="font-serif text-[1.05rem] font-semibold">{fee.e}</span>
        {isSoon(c.d) ? (
          <span className="rounded-md bg-gold/12 px-2 py-0.5 text-[0.62rem] font-bold tracking-[0.06em] uppercase text-gold">
            Starting soon
          </span>
        ) : (
          <span className="hidden rounded-md bg-track-fin/10 px-2 py-0.5 text-[0.62rem] font-bold tracking-[0.06em] uppercase text-track-fin sm:inline">
            Applications open
          </span>
        )}
      </span>
    </button>
  );
}

export function MonthSections({
  groups,
  onOpen,
}: {
  groups: MonthGroup[];
  onOpen: (id: string) => void;
}) {
  return (
    <div>
      {groups.map((g) => (
        <section key={g.key} id={`m-${g.key}`} className="scroll-mt-[190px]">
          <div className="mt-8 mb-3 flex items-baseline gap-3 border-b border-line pb-2">
            <h3 className="font-serif text-[1.3rem] font-semibold">{g.label}</h3>
            <small className="mono-label text-ink-faint">
              {g.rows.length} cohort{g.rows.length === 1 ? "" : "s"}
            </small>
          </div>
          <div className="flex flex-col gap-2">
            {g.rows.map((e: Entry) => (
              <CohortRow key={e.p.id + e.c.d} p={e.p} c={e.c} onOpen={onOpen} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function TypeSections({
  groups,
  onOpen,
}: {
  groups: TypeGroup[];
  onOpen: (id: string) => void;
}) {
  return (
    <div>
      {groups.map((g) => (
        <section key={g.key} id={`t-${g.key}`} className="scroll-mt-[190px]">
          <div className="mt-8 mb-3 border-b border-line pb-2">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-[1.1rem]">{TYPE_IC[g.key]}</span>
              <h3 className="font-serif text-[1.3rem] font-semibold">{g.label}</h3>
              <small className="mono-label text-ink-faint">
                {g.rows.length} programme{g.rows.length === 1 ? "" : "s"}
              </small>
            </div>
            <p className="mt-1 text-[0.82rem] text-ink-soft">{g.sub}</p>
          </div>
          <div className="flex flex-col gap-2">
            {g.rows.map((r) => (
              <CohortRow
                key={r.p.id}
                p={r.p}
                c={r.next}
                others={r.others}
                onOpen={onOpen}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
