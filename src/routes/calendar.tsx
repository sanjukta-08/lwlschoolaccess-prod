import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { stripSearchParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import ZoomBadge from "@/components/ZoomBadge";
import birdAsset from "@/assets/lwl-bird-black.webp.asset.json";
import { CalendarControls } from "@/components/CalendarControls";
import { MonthSections, TypeSections } from "@/components/CohortRows";
import { SavedStrip } from "@/components/SavedStrip";
import { PROGRAMMES, TRACKS, isSoon } from "@/lib/programmes";
import {
  DEFAULT_SEARCH,
  getCohortEntries,
  groupEntriesByMonth,
  groupProgrammesByType,
  isDefaultSearch,
  validateFinderSearch,
  type FinderSearch,
} from "@/lib/finder";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Full Calendar 2026–27 | Learn with Leaders";
const DESC =
  "Every Learn with Leaders online programme from July 2026 to April 2027 in one calendar. Filter by interest, type and month, with Dubai and US Eastern session times.";

export const Route = createFileRoute("/calendar")({
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
  component: CalendarPage,
});

function CalendarPage() {
  const state = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

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
      <div className="relative isolate overflow-hidden">
        {/* layered background wash, matching the finder hero */}
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
        <div className="pointer-events-none absolute top-[-10%] left-[-5%] -z-10 h-[60%] w-[45%] rounded-full bg-[radial-gradient(circle,rgba(185,138,31,0.10),transparent_70%)] blur-3xl" />

        <div className="relative">
          <SiteHeader />
          <section className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-5 pt-8 pb-10">
            <div>
              <span className="mono-label mb-2 inline-flex items-center gap-2 text-crimson">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                {TOTAL_COHORTS} cohorts · July 2026 - April 2027
              </span>
              <h1 className="font-serif text-[clamp(1.8rem,4.4vw,2.7rem)] leading-[1.1] font-medium tracking-tight">
                Every <em className="text-crimson-deep">start date</em>, in one calendar
              </h1>
              <p className="mt-2.5 max-w-[54em] text-[0.94rem] text-ink-soft">
                Filter by subject, format or month, then tap any row to open the programme
                page. Session times are shown in Dubai time (GMT+4) with US Eastern
                alongside.
              </p>
            </div>

            <ul className="flex flex-wrap gap-2">
              {[
                [`${PROGRAMMES.length} programmes`, `${TOTAL_COHORTS} cohorts`],
                ["Live on Zoom", "Dubai + US Eastern"],
                [`Grades ${GRADE_LO}–${GRADE_HI}`, "Harvard & Yale student mentors"],
              ].map(([top, sub]) => (
                <li
                  key={top}
                  className="rounded-full border border-line bg-paper/90 px-3.5 py-1.5 shadow-soft backdrop-blur-sm"
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
                to="/calendar-month"
                search={DEFAULT_SEARCH}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.82rem] font-semibold text-paper no-underline hover:brightness-110"
              >
                Month grid view
              </Link>
              <Link
                to="/finder"
                search={DEFAULT_SEARCH}
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-paper px-4 py-2 text-[0.82rem] font-semibold text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
              >
                Open the programme finder
              </Link>
            </div>
          </section>
        </div>
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
        <SavedStrip />
        {!entries.length ? (
          <p className="py-14 text-center text-[0.92rem] text-ink-faint">
            Nothing matches those filters - try clearing one, or search for something
            broader.
          </p>
        ) : byMonth ? (
          <MonthSections groups={months} />
        ) : (
          <TypeSections groups={types} />
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
