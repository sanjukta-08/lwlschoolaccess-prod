import { Link } from "@tanstack/react-router";
import { slugOf } from "@/lib/programme-slug";
import { TRACKS, type Cohort, type Programme } from "@/lib/programmes";

export type CohortEntry = { p: Programme; c: Cohort };

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function monthTitle(d: Date) {
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

/** Days of the month padded to whole Mon–Sun weeks. */
function buildWeeks(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const lead = (first.getDay() + 6) % 7;
  const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= last.getDate(); day++) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

export function MonthGrid({
  month,
  entries,
  selected,
  onSelectDay,
}: {
  month: Date;
  entries: CohortEntry[];
  selected: string | null;
  onSelectDay: (day: string) => void;
}) {
  const byDay = new Map<string, CohortEntry[]>();
  entries.forEach((e) => {
    const list = byDay.get(e.c.d) ?? [];
    list.push(e);
    byDay.set(e.c.d, list);
  });
  const todayISO = iso(new Date());

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
      <div className="hidden grid-cols-7 border-b border-line bg-[linear-gradient(180deg,var(--paper),var(--wash))] md:grid">
        {WEEKDAYS.map((w) => (
          <div key={w} className="mono-label border-r border-line/70 px-3 py-3 text-center text-ink-faint last:border-r-0">
            {w}
          </div>
        ))}
      </div>

      {/* desktop month grid */}
      <div className="hidden md:block">
        {buildWeeks(month).map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b border-line last:border-b-0">
            {week.map((day, di) => {
              const key = day ? iso(day) : `empty-${di}`;
              const dayISO = day ? iso(day) : "";
              const dayEntries = day ? (byDay.get(dayISO) ?? []) : [];
              const isToday = day && dayISO === todayISO;
              const isSelected = day && dayISO === selected;
              const isWeekend = di > 4;
              return (
                <div
                  key={key}
                  className={`relative min-h-[132px] border-r border-line p-2 transition-colors last:border-r-0 ${
                    day ? (isWeekend ? "bg-wash/40" : "bg-paper") : "bg-wash/60"
                  } ${dayEntries.length ? "hover:bg-gold-soft/40" : ""} ${
                    isSelected ? "bg-gold-soft/60 ring-1 ring-inset ring-gold/50" : ""
                  }`}
                >
                  {day ? (
                    <>
                      <div className="mb-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => onSelectDay(dayISO)}
                          disabled={!dayEntries.length}
                          aria-label={`Cohorts starting ${dayISO}`}
                          className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 font-mono text-[0.78rem] font-semibold transition-colors ${
                            isToday
                              ? "bg-crimson text-paper shadow-soft"
                              : dayEntries.length
                                ? "text-ink hover:bg-ink hover:text-paper"
                                : "text-ink-faint/70"
                          }`}
                        >
                          {day.getDate()}
                        </button>
                        {dayEntries.length ? (
                          <span className="mono-label rounded-full bg-gold-soft px-1.5 py-0.5 text-[0.6rem] text-gold-deep">
                            {dayEntries.length} start{dayEntries.length === 1 ? "" : "s"}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-1">
                        {dayEntries.slice(0, 3).map((e) => {
                          const track = TRACKS[e.p.tracks[0]!];
                          return (
                            <Link
                              key={e.p.id + e.c.d}
                              to="/programmes/$slug"
                              params={{ slug: slugOf(e.p) }}
                              title={`${e.p.name} - open programme page`}
                              className="block truncate rounded-md py-1 pr-1.5 pl-2 text-left text-[0.7rem] leading-tight font-semibold text-ink no-underline transition-colors hover:text-crimson-deep"
                              style={{
                                borderLeft: `3px solid ${track.color}`,
                                background: `color-mix(in oklab, ${track.color} 12%, transparent)`,
                              }}
                            >
                              {e.p.name}
                            </Link>
                          );
                        })}
                        {dayEntries.length > 3 ? (
                          <button
                            type="button"
                            onClick={() => onSelectDay(dayISO)}
                            className="px-1.5 text-left text-[0.66rem] font-semibold text-ink-soft underline underline-offset-2 hover:text-crimson"
                          >
                            +{dayEntries.length - 3} more
                          </button>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* mobile stacked list */}
      <div className="divide-y divide-line md:hidden">
        {Array.from(byDay.keys())
          .filter((d) => d.startsWith(monthKey(month)))
          .sort()
          .map((d) => (
            <div key={d} className="flex w-full items-start gap-3 px-4 py-3 text-left">
              <button
                type="button"
                onClick={() => onSelectDay(d)}
                aria-label={`Show cohorts starting ${d}`}
                className="mt-0.5 flex-none font-mono text-[0.78rem] font-semibold text-crimson">
                {new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              </button>
              <span className="flex flex-col gap-1">
                {(byDay.get(d) ?? []).map((e) => (
                  <Link
                    key={e.p.id}
                    to="/programmes/$slug"
                    params={{ slug: slugOf(e.p) }}
                    className="text-[0.85rem] font-semibold text-ink no-underline"
                    style={{ borderLeft: `3px solid ${TRACKS[e.p.tracks[0]!].color}`, paddingLeft: 8 }}
                  >
                    {e.p.name}
                  </Link>
                ))}
              </span>
            </div>
          ))}
        {Array.from(byDay.keys()).filter((d) => d.startsWith(monthKey(month))).length ===
        0 ? (
          <p className="px-4 py-8 text-center text-[0.88rem] text-ink-soft">
            No cohorts start this month with these filters.
          </p>
        ) : null}
      </div>
    </div>
  );
}
