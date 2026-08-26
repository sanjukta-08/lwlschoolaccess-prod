import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { stripSearchParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { MonthGrid, monthTitle } from "@/components/MonthGrid";
import { DayList } from "@/components/DayList";
import { PROGRAMMES, TRACKS, isPast, isSoon } from "@/lib/programmes";
import { CalendarControls } from "@/components/CalendarControls";
import ZoomBadge from "@/components/ZoomBadge";
import birdAsset from "@/assets/lwl-bird-black.webp.asset.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DEFAULT_SEARCH,
  getCohortEntries,
  groupEntriesByMonth,
  isDefaultSearch,
  validateFinderSearch,
  type FinderSearch,
} from "@/lib/finder";
import { SiteFooter } from "@/components/SiteFooter";

const GRADE_LO = Math.min(...PROGRAMMES.map((p) => p.g[0]));
const GRADE_HI = Math.max(...PROGRAMMES.map((p) => p.g[1]));
const TOTAL_COHORTS = PROGRAMMES.reduce(
  (n, p) => n + p.cohorts.filter((c) => !isPast(c.d)).length,
  0,
);

const TITLE = "Month-by-month cohort calendar | Learn with Leaders";
const DESC =
  "See every Learn with Leaders cohort start laid out on a month grid. Pick a month, tap a date to see what begins, and open the programme page in one click.";

export const Route = createFileRoute("/calendar-month")({
  validateSearch: (search: Record<string, unknown>) => validateFinderSearch(search),
  search: { middlewares: [stripSearchParams(DEFAULT_SEARCH)] },
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
  component: MonthCalendarPage,
});

function MonthCalendarPage() {
  const state = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [day, setDay] = useState<string | null>(null);
  const [monthIdx, setMonthIdx] = useState(0);

  const entries = useMemo(() => {
    const all = getCohortEntries(state);
    return state.status === "soon" ? all.filter((e) => isSoon(e.c.d)) : all;
  }, [state]);

  const months = useMemo(() => groupEntriesByMonth(entries), [entries]);
  const idx = Math.min(monthIdx, Math.max(months.length - 1, 0));
  const active = months[idx];
  const monthDate = active
    ? new Date(active.key + "-01T00:00:00")
    : new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const dayEntries = day ? entries.filter((e) => e.c.d === day) : [];
  const typeVals = ["all", ...TYPE_ORDER];
  const trackVals = ["all", ...Object.keys(TRACKS)];
  const typeN = facetCounts(state, "type", typeVals);
  const trackN = facetCounts(state, "interest", trackVals);

  const update = (patch: Partial<FinderSearch>) => {
    setDay(null);
    setMonthIdx(0);
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  };

  const step = (delta: number) => {
    setDay(null);
    setMonthIdx((i) => Math.min(Math.max(i + delta, 0), Math.max(months.length - 1, 0)));
  };

  return (
    <div className="min-h-screen bg-wash">
      <div className="border-b border-line bg-paper">
        <SiteHeader />
        <section className="mx-auto max-w-[1000px] px-5 pt-4 pb-8 text-center">
          <h1 className="font-serif text-[clamp(1.7rem,4.4vw,2.5rem)] leading-[1.12] font-medium">
            Cohort calendar, <em className="text-crimson-deep">month by month</em>
          </h1>
          <p className="mx-auto mt-2.5 max-w-[42em] text-[0.92rem] text-ink-soft">
            Every start date on a real month grid. Click any cohort to open its programme
            page, or tap a date to see everything that begins that day.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-[0.82rem] font-semibold">
            <Link
              to="/calendar"
              search={DEFAULT_SEARCH}
              className="rounded-full border-[1.5px] border-line bg-paper px-4 py-2 text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
            >
              Switch to list view
            </Link>
            <Link
              to="/finder"
              search={DEFAULT_SEARCH}
              className="rounded-full border-[1.5px] border-line bg-paper px-4 py-2 text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
            >
              Browse all programmes
            </Link>
          </div>
        </section>
      </div>

      {/* filters */}
      <div className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-2 px-5 py-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mono-label mr-1 text-ink-faint">Type</span>
            {typeVals.map((t) => (
              <Pill
                key={t}
                active={state.type === t}
                onClick={() => update({ type: t })}
                count={typeN[t]}
              >
                {t === "all" ? "All" : `${TYPE_IC[t as TypeKey]} ${TYPES[t as TypeKey].label}`}
              </Pill>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mono-label mr-1 text-ink-faint">Interest</span>
            {trackVals.map((k) => (
              <Pill
                key={k}
                active={state.interest === k}
                onClick={() => update({ interest: k })}
                count={trackN[k]}
              >
                {k === "all" ? "All" : `${TRACKS[k as TrackKey].ic} ${TRACKS[k as TrackKey].label}`}
              </Pill>
            ))}
            <button
              type="button"
              onClick={() => update({ ...DEFAULT_SEARCH })}
              className="ml-auto rounded-full px-3 py-1.5 text-[0.78rem] font-semibold text-ink-faint underline decoration-line underline-offset-4 hover:text-crimson"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1100px] px-5 py-8">
        {/* month switcher */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={idx === 0}
              aria-label="Previous month"
              className="h-9 w-9 rounded-full border border-line bg-paper text-ink-soft disabled:opacity-40 hover:text-ink"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={idx >= months.length - 1}
              aria-label="Next month"
              className="h-9 w-9 rounded-full border border-line bg-paper text-ink-soft disabled:opacity-40 hover:text-ink"
            >
              →
            </button>
          </div>
          <h2 className="font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-semibold">
            {monthTitle(monthDate)}
          </h2>
          <span className="font-mono text-[0.74rem] text-ink-faint">
            {active ? `${active.rows.length} cohort${active.rows.length === 1 ? "" : "s"} starting` : "No cohorts"}
          </span>
        </div>

        <div className="mb-5 -mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1">
          {months.map((m, i) => (
            <button
              key={m.key}
              type="button"
              onClick={() => {
                setDay(null);
                setMonthIdx(i);
              }}
              className={`flex-none rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold whitespace-nowrap transition-colors ${
                i === idx
                  ? "bg-ink text-paper"
                  : "border border-line bg-paper text-ink-soft hover:text-ink"
              }`}
            >
              {m.label.replace(" 20", " '")}
              <small className={`ml-1.5 font-mono text-[0.66rem] ${i === idx ? "text-paper/70" : "text-ink-faint"}`}>
                {m.rows.length}
              </small>
            </button>
          ))}
        </div>

        {months.length === 0 ? (
          <p className="py-14 text-center text-[0.92rem] text-ink-faint">
            Nothing matches those filters - try clearing one.
          </p>
        ) : (
          <div className={`grid gap-5 ${day ? "lg:grid-cols-[1.55fr_1fr]" : ""}`}>
            <MonthGrid
              month={monthDate}
              entries={active?.rows ?? []}
              selected={day}
              onSelectDay={(d) => setDay(d === day ? null : d)}
            />
            {day ? (
              <DayList
                day={day}
                entries={dayEntries}
                onClear={() => setDay(null)}
              />
            ) : null}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-line bg-paper p-4">
          {Object.entries(TRACKS).map(([k, t]) => (
            <span key={k} className="flex items-center gap-2 text-[0.78rem] text-ink-soft">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
              {t.label}
            </span>
          ))}
        </div>
      </section>

      <SiteFooter />

    </div>
  );
}
