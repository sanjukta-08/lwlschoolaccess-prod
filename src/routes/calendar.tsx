import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { ProgrammeSheet } from "@/components/ProgrammeSheet";
import { DayList } from "@/components/DayList";
import { MonthGrid, monthKey, monthTitle } from "@/components/MonthGrid";
import { CohortAgenda } from "@/components/CohortAgenda";
import { TRACKS, TYPES, isSoon } from "@/lib/programmes";
import {
  DEFAULT_SEARCH,
  getCohortEntries,
  gradeOptions,
  isDefaultSearch,
  validateFinderSearch,
  type FinderSearch,
} from "@/lib/finder";

const TITLE = "Cohort Calendar | Learn with Leaders";
const DESC =
  "Browse every upcoming Learn with Leaders cohort month by month — fellowships, programmes, competitions and internships with start dates, fees and apply links.";

export const Route = createFileRoute("/calendar")({
  validateSearch: (search: Record<string, unknown>) => validateFinderSearch(search),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const state = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [detailId, setDetailId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const allEntries = useMemo(() => getCohortEntries(state), [state]);
  const entries = useMemo(
    () => (state.status === "soon" ? allEntries.filter((e) => isSoon(e.c.d)) : allEntries),
    [allEntries, state.status],
  );
  const isList = state.view !== "grid";

  const firstMonth = useMemo(() => {
    const base = state.month !== "all" ? state.month : entries[0]?.c.d.slice(0, 7);
    const now = new Date();
    if (!base) return new Date(now.getFullYear(), now.getMonth(), 1);
    return new Date(base + "-01T00:00:00");
  }, [state.month, entries]);

  const [monthOffset, setMonthOffset] = useState(0);
  const month = new Date(
    firstMonth.getFullYear(),
    firstMonth.getMonth() + monthOffset,
    1,
  );

  const update = (patch: Partial<FinderSearch>) => {
    setMonthOffset(0);
    setSelectedDay(null);
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  };

  const monthEntries = entries.filter((e) => e.c.d.startsWith(monthKey(month)));
  const dayEntries = selectedDay ? entries.filter((e) => e.c.d === selectedDay) : [];

  return (
    <div className="min-h-screen bg-wash">
      <div className="hero-wash">
        <SiteHeader />
        <section className="mx-auto max-w-[1100px] px-5 pt-8 pb-10">
          <span className="mono-label mb-4 inline-flex items-center gap-2 rounded-full border border-crimson/20 bg-paper px-3.5 py-1.5 text-crimson shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            {entries.length} upcoming cohorts
          </span>
          <h1 className="font-serif text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.1] font-medium tracking-tight">
            The cohort <em className="text-crimson-deep">calendar</em>
          </h1>
          <p className="mt-3 max-w-[38em] text-[0.98rem] text-ink-soft">
            Every start date, month by month. Filter the calendar the same way you filter
            the finder, then tap a date to see who starts when.
          </p>
        </section>
      </div>

      <section className="mx-auto max-w-[1100px] px-5 pb-14">
        {/* filter bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2.5 rounded-2xl border border-line bg-paper p-3.5 shadow-soft">
          <input
            type="search"
            value={state.q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search programmes"
            aria-label="Search programmes"
            className="min-w-[180px] flex-1 rounded-full border border-line bg-wash px-4 py-2 text-[0.85rem] text-ink placeholder:text-ink-faint focus:border-crimson/40 focus:bg-paper focus:outline-none"
          />
          <FilterSelect
            label="Grade"
            value={state.grade}
            onChange={(v) => update({ grade: v })}
            options={gradeOptions()}
          />
          <FilterSelect
            label="Type"
            value={state.type}
            onChange={(v) => update({ type: v })}
            options={[
              { value: "all", label: "All types" },
              ...Object.entries(TYPES).map(([k, t]) => ({ value: k, label: t.label })),
            ]}
          />
          <FilterSelect
            label="Interest"
            value={state.interest}
            onChange={(v) => update({ interest: v })}
            options={[
              { value: "all", label: "All interests" },
              ...Object.entries(TRACKS).map(([k, t]) => ({ value: k, label: t.label })),
            ]}
          />
          <div
            role="group"
            aria-label="Status"
            className="inline-flex gap-0.5 rounded-full border border-line bg-wash p-1"
          >
            {[
              { v: "all", l: "All upcoming" },
              { v: "soon", l: "Starting soon" },
            ].map((o) => (
              <button
                key={o.v}
                type="button"
                aria-pressed={state.status === o.v}
                onClick={() => update({ status: o.v })}
                className={`rounded-full px-3.5 py-1.5 text-[0.8rem] font-semibold transition-colors ${
                  state.status === o.v ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
          <div
            role="group"
            aria-label="View"
            className="inline-flex gap-0.5 rounded-full border border-line bg-wash p-1"
          >
            {[
              { v: "list", l: "List" },
              { v: "grid", l: "Month grid" },
            ].map((o) => (
              <button
                key={o.v}
                type="button"
                aria-pressed={isList === (o.v === "list")}
                onClick={() => update({ view: o.v })}
                className={`rounded-full px-3.5 py-1.5 text-[0.8rem] font-semibold transition-colors ${
                  isList === (o.v === "list")
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
          {!isDefaultSearch(state) ? (
            <button
              type="button"
              onClick={() => update(DEFAULT_SEARCH)}
              className="text-[0.8rem] font-semibold text-ink-faint underline underline-offset-[3px] hover:text-crimson"
            >
              Clear
            </button>
          ) : null}
        </div>

        {isList ? (
          <>
            <p className="mb-1 font-mono text-[0.76rem] text-ink-faint">
              {entries.length} cohort{entries.length === 1 ? "" : "s"} match
            </p>
            <CohortAgenda entries={entries} onOpen={setDetailId} />
          </>
        ) : (
        <>
        {/* month nav */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-serif text-[1.4rem] font-semibold">{monthTitle(month)}</h2>
          <div className="flex items-center gap-2">
            <NavButton onClick={() => setMonthOffset((o) => o - 1)} label="Previous month">
              ‹
            </NavButton>
            <button
              type="button"
              onClick={() => setMonthOffset(0)}
              className="rounded-full border border-line bg-paper px-3.5 py-2 text-[0.8rem] font-semibold text-ink-soft hover:text-ink"
            >
              Earliest
            </button>
            <NavButton onClick={() => setMonthOffset((o) => o + 1)} label="Next month">
              ›
            </NavButton>
          </div>
        </div>

        <p className="mb-4 font-mono text-[0.75rem] text-ink-soft">
          {monthEntries.length} cohort{monthEntries.length === 1 ? "" : "s"} starting this
          month
        </p>

        <div
          className={`grid gap-5 ${selectedDay ? "lg:grid-cols-[1fr_340px]" : "grid-cols-1"}`}
        >
          <MonthGrid
            month={month}
            entries={entries}
            selected={selectedDay}
            onSelectDay={(d) => setSelectedDay(d)}
          />
          {selectedDay ? (
            <DayList
              day={selectedDay}
              entries={dayEntries}
              onOpen={setDetailId}
              onClear={() => setSelectedDay(null)}
            />
          ) : null}
        </div>

        </>
        )}

        {/* track legend */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-line bg-paper p-4">
          {Object.entries(TRACKS).map(([k, t]) => (
            <span key={k} className="flex items-center gap-2 text-[0.78rem] text-ink-soft">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: t.color }}
              />
              {t.label}
            </span>
          ))}
        </div>
      </section>

      <footer className="bg-ink px-5 py-6 text-center text-[0.78rem] text-paper/60">
        © Learn with Leaders. All sessions run live on Zoom in US Eastern Time (ET).
      </footer>

      <ProgrammeSheet id={detailId} onClose={() => setDetailId(null)} />
    </div>
  );
}

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="h-9 w-9 rounded-full border border-line bg-paper text-lg text-ink-soft hover:border-ink-soft hover:text-ink"
    >
      {children}
    </button>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-line bg-paper px-3.5 py-2 text-[0.82rem] font-semibold text-ink-soft focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
