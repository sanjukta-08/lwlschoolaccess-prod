import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { ProgrammeSheet } from "@/components/ProgrammeSheet";
import { CalendarControls } from "@/components/CalendarControls";
import { MonthSections, TypeSections } from "@/components/CohortRows";
import { TRACKS, isSoon } from "@/lib/programmes";
import {
  DEFAULT_SEARCH,
  getCohortEntries,
  groupEntriesByMonth,
  groupProgrammesByType,
  isDefaultSearch,
  validateFinderSearch,
  type FinderSearch,
} from "@/lib/finder";

const TITLE = "Full Calendar 2026–27 | Learn with Leaders";
const DESC =
  "Every Learn with Leaders online programme from July 2026 to April 2027 in one calendar. Filter by interest, type and month, with Dubai and US Eastern session times.";

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

  const entries = useMemo(() => {
    const all = getCohortEntries(state);
    return state.status === "soon" ? all.filter((e) => isSoon(e.c.d)) : all;
  }, [state]);

  const months = useMemo(() => groupEntriesByMonth(entries), [entries]);
  const types = useMemo(() => groupProgrammesByType(entries), [entries]);
  const programmeCount = new Set(entries.map((e) => e.p.id)).size;
  const byMonth = state.calView !== "type";

  const update = (patch: Partial<FinderSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  return (
    <div className="min-h-screen bg-wash">
      <div className="border-b border-line bg-paper">
        <SiteHeader />
        <section className="mx-auto max-w-[1000px] px-5 pt-4 pb-8 text-center">
          <h1 className="font-serif text-[clamp(1.7rem,4.4vw,2.5rem)] leading-[1.12] font-medium">
            The <em className="text-crimson-deep">full calendar</em> — July 2026 to April
            2027
          </h1>
          <p className="mx-auto mt-2.5 max-w-[42em] text-[0.92rem] text-ink-soft">
            Every cohort in one view. Pick a category so you&apos;re not scrolling all of
            them, search by keyword, and tap any row for full details. Times shown in
            Dubai time (GMT+4) with US Eastern alongside.
          </p>
        </section>
      </div>

      <CalendarControls
        state={state}
        onChange={update}
        onReset={() => update({ ...DEFAULT_SEARCH, calView: state.calView })}
        months={months}
        programmeCount={programmeCount}
        cohortCount={entries.length}
        dirty={!isDefaultSearch(state) || state.status === "soon"}
      />

      <section className="mx-auto max-w-[1000px] px-5 pb-14">
        {!entries.length ? (
          <p className="py-14 text-center text-[0.92rem] text-ink-faint">
            Nothing matches those filters — try clearing one, or search for something
            broader.
          </p>
        ) : byMonth ? (
          <MonthSections groups={months} onOpen={setDetailId} />
        ) : (
          <TypeSections groups={types} onOpen={setDetailId} />
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

      <footer className="bg-ink px-5 py-6 text-center text-[0.78rem] text-paper/60">
        © Learn with Leaders. Fees and dates correct at time of publishing; confirm on each
        programme page. All session times are US Eastern, shown with approximate Dubai
        (GMT+4) equivalents.
      </footer>

      <ProgrammeSheet id={detailId} onClose={() => setDetailId(null)} />
    </div>
  );
}
