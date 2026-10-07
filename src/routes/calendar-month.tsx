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

const gradeLo = () => Math.min(...PROGRAMMES.map((p) => p.g[0]));
const gradeHi = () => Math.max(...PROGRAMMES.map((p) => p.g[1]));
const totalUpcoming = () =>
  PROGRAMMES.reduce((n, p) => n + p.cohorts.filter((c) => !isPast(c.d)).length, 0);

const TITLE = "Month-by-month cohort calendar | Learn with Leaders";
const DESC =
  "See every Learn with Leaders cohort start laid out on a month grid. Pick a month, tap a date to see what begins, and open the program page in one click.";

export const Route = createFileRoute("/calendar-month")({
  staticData: { sitemap: true },
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
  const programmeCount = new Set(entries.map((e) => e.p.id)).size;

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
      <div className="relative isolate overflow-hidden">
        {/* layered background wash, matching the finder + calendar heroes */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#fbfcfe_0%,#f7f2e8_60%,var(--wash)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_88%_20%,rgba(185,138,31,0.14),transparent_60%),radial-gradient(700px_420px_at_12%_10%,rgba(163,29,51,0.08),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(185,138,31,0.18) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden w-[min(420px,32vw)] -translate-y-1/2 opacity-[0.42] sm:block lg:w-[min(480px,30vw)]">
          <img
            src={birdAsset.url}
            alt=""
            aria-hidden="true"
            className="h-auto w-full object-contain object-right [mask-image:linear-gradient(to_left,black_55%,transparent_95%)]"
          />
        </div>

        <div className="relative">
          <SiteHeader />
          <section className="page-shell flex flex-col items-center gap-4 pt-8 pb-10 text-center">
            <div>
              <span className="mono-label mb-2 inline-flex items-center justify-center gap-2 text-crimson">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                {totalUpcoming()} cohorts · July 2026 - April 2027
              </span>
              <h1 className="font-serif text-[clamp(1.8rem,4.4vw,2.7rem)] leading-[1.1] font-medium tracking-tight">
                Cohort calendar, <em className="text-crimson-deep">month by month</em>
              </h1>
              <p className="mx-auto mt-2.5 max-w-[54em] text-[0.94rem] text-ink-soft">
                Every start date on a real month grid. Move through the months, tap a date to see
                everything that begins that day, and click a cohort to open its program page.
              </p>
            </div>

            <ul className="flex flex-wrap justify-center gap-2">
              {[
                [`${PROGRAMMES.length} programs`, `${totalUpcoming()} cohorts`],
                ["Live on Zoom", "Dubai + US Eastern"],
                [`Grades ${gradeLo()}–${gradeHi()}`, "Harvard & Yale student mentors"],
              ].map(([top, sub]) => (
                <li
                  key={top}
                  className="rounded-full border border-line bg-paper/90 px-3.5 py-1.5 text-left shadow-soft backdrop-blur-sm"
                >
                  <b className="flex items-center gap-1.5 text-[0.78rem] font-bold text-ink">
                    {top === "Live on Zoom" ? <ZoomBadge label="Live on Zoom" /> : top}
                  </b>
                  <small className="mono-label block text-ink-faint">{sub}</small>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/calendar"
                search={DEFAULT_SEARCH}
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-paper px-4 py-2 text-[0.82rem] font-semibold text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
              >
                Switch to list view
              </Link>
              <Link
                to="/finder"
                search={DEFAULT_SEARCH}
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-paper px-4 py-2 text-[0.82rem] font-semibold text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
              >
                Browse all programs
              </Link>
            </div>
          </section>
        </div>
      </div>

      <CalendarControls
        state={state}
        onChange={update}
        onReset={() => update({ ...DEFAULT_SEARCH })}
        months={months}
        programmeCount={programmeCount}
        cohortCount={entries.length}
        dirty={!isDefaultSearch(state)}
        showGrouping={false}
      />

      <section className="page-shell py-6">
        {/* month switcher */}
        <div className="mb-5 overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-[linear-gradient(180deg,var(--gold-soft),var(--paper))] px-5 py-3 sm:px-6">
            <div className="flex min-w-0 items-baseline gap-3">
              <h2 className="font-serif text-[1.45rem] leading-tight font-medium tracking-tight whitespace-nowrap">
                {monthTitle(monthDate)}
              </h2>
              <p className="mono-label text-[0.72rem] text-ink-faint">
                {active
                  ? `${active.rows.length} cohort${active.rows.length === 1 ? "" : "s"} starting this month`
                  : "No cohorts in this window"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={idx === 0}
                aria-label="Previous month"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold-line bg-paper text-gold-deep transition-all hover:scale-105 hover:bg-gold-soft disabled:opacity-35 disabled:hover:scale-100 disabled:hover:bg-paper"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={idx >= months.length - 1}
                aria-label="Next month"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold-line bg-paper text-gold-deep transition-all hover:scale-105 hover:bg-gold-soft disabled:opacity-35 disabled:hover:scale-100 disabled:hover:bg-paper"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto px-5 py-3 sm:px-6">
            {months.map((m, i) => (
              <button
                key={m.key}
                type="button"
                aria-pressed={i === idx}
                onClick={() => {
                  setDay(null);
                  setMonthIdx(i);
                }}
                className={`group flex flex-none items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                  i === idx
                    ? "min-w-[8.5rem] border-ink bg-ink text-paper shadow-soft"
                    : "min-w-[8.5rem] border-line bg-wash text-ink-soft hover:-translate-y-0.5 hover:border-gold-line hover:bg-gold-soft/70 hover:text-ink hover:shadow-soft"
                }`}
              >
                <span className="whitespace-nowrap text-[0.88rem] leading-none font-semibold">
                  {m.label}
                </span>
                <span
                  className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[0.62rem] font-bold leading-none ${
                    i === idx
                      ? "bg-paper/20 text-paper"
                      : "bg-paper text-gold-deep group-hover:bg-white"
                  }`}
                >
                  {m.rows.length}
                </span>
              </button>
            ))}
          </div>
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
            {day ? <DayList day={day} entries={dayEntries} onClear={() => setDay(null)} /> : null}
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
