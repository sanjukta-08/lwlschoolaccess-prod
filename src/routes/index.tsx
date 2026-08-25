import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { FinderPanel } from "@/components/FinderPanel";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { ProgrammeSheet } from "@/components/ProgrammeSheet";
import { TRACKS, TYPE_NAME } from "@/lib/programmes";
import {
  BAND_LABEL,
  DEFAULT_SEARCH,
  getMatches,
  monthLabel,
  validateFinderSearch,
  type FinderSearch,
} from "@/lib/finder";

const TITLE = "Programme Finder | Learn with Leaders";
const DESC =
  "Find the right Harvard and Yale-mentored programme for your child in under 30 seconds. Filter by grade, interest, type and start date.";

export const Route = createFileRoute("/")({
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
  component: FinderPage,
});

function FinderPage() {
  const state = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [detailId, setDetailId] = useState<string | null>(null);

  const update = (patch: Partial<FinderSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const matches = getMatches(state);
  const cohortCount = matches.reduce((n, m) => n + 1 + m.others.length, 0);
  const narrowed = state.interest !== "all" || state.grade !== "all" || !!state.q;

  let fallback = matches.length ? [] : getMatches(state, { ignoreMonth: true });
  let fallbackNote = "in other months";
  if (!matches.length && !fallback.length) {
    fallback = getMatches(state, {
      ignoreMonth: true,
      ignoreInterest: true,
      ignoreQuery: true,
    });
    fallbackNote = "in other subject areas";
  }

  return (
    <div className="min-h-screen bg-wash">
      <div className="relative">
        <div className="hero-wash absolute inset-0" />
        <div className="relative">
          <SiteHeader />
          <section className="mx-auto max-w-[1100px] px-5 pt-14 pb-[190px] text-center">
            <span className="mono-label mb-5 inline-flex items-center gap-2 rounded-full border border-crimson/20 bg-paper px-3.5 py-1.5 text-crimson shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              38 programmes · Grades 5–12
            </span>
            <h1 className="mx-auto max-w-[780px] font-serif text-[clamp(2.2rem,5.6vw,3.6rem)] leading-[1.1] font-medium tracking-tight">
              Find the programme that <em className="text-crimson-deep">fits</em> your
              child
            </h1>
            <p className="mx-auto mt-4 max-w-[36em] text-[clamp(0.98rem,2.4vw,1.1rem)] text-ink-soft">
              Harvard and Yale-mentored fellowships, programmes, competitions and
              internships — filtered by grade, interest and start date in under thirty
              seconds.
            </p>
          </section>
        </div>
      </div>

      <div className="relative z-30 -mt-[140px]">
        <div className="mx-auto max-w-[1100px] px-5">
          <FinderPanel
            state={state}
            onChange={update}
            onReset={() => update(DEFAULT_SEARCH)}
            resultCount={matches.length}
            cohortCount={cohortCount}
          />
        </div>
      </div>

      <section className="bg-wash pt-8 pb-12">
        <div className="mx-auto max-w-[1100px] px-5">
          <header className="mb-6 text-center">
            <h2 className="font-serif text-[clamp(1.25rem,3vw,1.6rem)] font-medium">
              {matches.length ? (
                <>
                  {matches.length}
                  {state.type === "all"
                    ? " programme"
                    : ` ${TYPE_NAME[state.type as keyof typeof TYPE_NAME]?.toLowerCase() ?? "programme"}`}
                  {matches.length === 1 ? "" : "s"} for{" "}
                  <em className="text-crimson-deep">
                    {state.grade === "all"
                      ? "every grade"
                      : (BAND_LABEL[state.grade] ?? `Grade ${state.grade}`)}
                  </em>
                  {state.interest !== "all" ? (
                    <>
                      {" "}
                      curious about{" "}
                      <em className="text-crimson-deep">
                        {TRACKS[state.interest as keyof typeof TRACKS]?.label}
                      </em>
                    </>
                  ) : null}
                  {state.month !== "all" ? (
                    <>
                      , starting{" "}
                      <em className="text-crimson-deep">{monthLabel(state.month)}</em>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  No exact match — here are the{" "}
                  <em className="text-crimson-deep">closest fits</em>
                </>
              )}
            </h2>
          </header>

          {matches.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((m, i) => (
                <ProgrammeCard
                  key={m.p.id}
                  match={m}
                  index={i}
                  label={
                    narrowed && matches.length > 1 && i < 2
                      ? i === 0
                        ? "Best match"
                        : "Great fit"
                      : null
                  }
                  onOpen={setDetailId}
                />
              ))}
            </div>
          ) : (
            <>
              <div className="mb-6 rounded-lg border-[1.5px] border-dashed border-line bg-paper px-6 py-9 text-center">
                <span className="mb-2.5 block text-[1.8rem]">🔍</span>
                <h3 className="mb-2 font-serif text-[1.35rem] font-semibold">
                  Nothing matches that exact combination
                </h3>
                <p className="mx-auto max-w-[34em] text-[0.9rem] text-ink-soft">
                  Your child doesn&apos;t have to wait long — these are the closest fits{" "}
                  {fallbackNote}. Or clear a filter to widen the search.
                </p>
              </div>
              {fallback.length ? (
                <>
                  <p className="mono-label mb-4 text-center text-ink-faint">
                    Closest matches
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {fallback.slice(0, 3).map((m, i) => (
                      <ProgrammeCard
                        key={m.p.id}
                        match={m}
                        index={i}
                        onOpen={setDetailId}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </>
          )}

          <p className="mx-auto mt-7 flex w-fit max-w-full items-center justify-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-center text-[0.82rem] text-ink-soft">
            🕒 All sessions run live on Zoom in US Eastern Time (ET).
          </p>
        </div>
      </section>

      <section className="bg-crimson-deep px-5 py-16 text-center text-paper">
        <h2 className="font-serif text-[clamp(1.5rem,4vw,2.2rem)] font-medium">
          Not sure which one <em>fits</em>?
        </h2>
        <p className="mx-auto mt-3 max-w-[34em] text-[0.95rem] text-paper/80">
          Tell us about your child and an advisor will recommend the right pathway — no
          obligation.
        </p>
        <a
          href="https://www.learnwithleaders.com/"
          target="_blank"
          rel="noopener"
          className="mt-6 inline-block rounded-full bg-paper px-6 py-3 text-[0.9rem] font-bold text-crimson-deep no-underline"
        >
          Talk to an advisor
        </a>
      </section>

      <footer className="bg-ink px-5 py-6 text-center text-[0.78rem] text-paper/60">
        © Learn with Leaders. Programme details and fees correct at time of publishing;
        confirm on each programme page.
      </footer>

      <ProgrammeSheet id={detailId} onClose={() => setDetailId(null)} />
    </div>
  );
}
