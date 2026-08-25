import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { FinderPanel } from "@/components/FinderPanel";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { ResultGroup } from "@/components/ResultGroup";
import { ProgrammeSheet } from "@/components/ProgrammeSheet";
import { HeroStats } from "@/components/HeroStats";
import { CounsellorCard } from "@/components/CounsellorCard";
import { FaqAccordion, FAQS } from "@/components/FaqAccordion";
import { HowItWorks, WhyLwl } from "@/components/HowItWorks";
import { TrendingTop5 } from "@/components/TrendingTop5";
import { ProfilePathway } from "@/components/ProfilePathway";
import { TRACKS, TYPE_NAME } from "@/lib/programmes";
import {
  BAND_LABEL,
  DEFAULT_SEARCH,
  getMatches,
  groupMatches,
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
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
  const groups = groupMatches(matches, state.sort);


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
            <HeroStats />
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

      <TrendingTop5 onOpen={setDetailId} />

      <section id="all-programmes" className="scroll-mt-24 bg-wash pt-12 pb-12">
        <div className="mx-auto max-w-[1100px] px-5">
          <header className="mb-6 text-center">
            <span className="mono-label mb-2 block text-ink-faint">
              All main programmes
            </span>
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
            <>
              <div className="mb-2 flex flex-wrap items-center justify-center gap-3">
                <Segmented
                  legend="Sort"
                  value={state.sort}
                  onChange={(v) => update({ sort: v })}
                  options={[
                    { value: "cat", label: "By category" },
                    { value: "month", label: "By start month" },
                  ]}
                />
                <Segmented
                  legend="View"
                  value={state.density}
                  onChange={(v) => update({ density: v })}
                  options={[
                    { value: "comfy", label: "Cards" },
                    { value: "compact", label: "Compact list" },
                  ]}
                />
              </div>

              {groups.length > 1 ? (
                <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
                  <span className="mono-label text-ink-faint">Jump to</span>
                  {groups.map((g) => (
                    <a
                      key={g.key}
                      href={`#group-${g.key}`}
                      className="rounded-full border border-line bg-paper px-3 py-1 text-[0.76rem] font-semibold text-ink-soft no-underline transition-colors hover:border-crimson/40 hover:text-crimson"
                    >
                      {g.label} · {g.rows.length}
                    </a>
                  ))}
                </div>
              ) : null}

              {groups.map((g, gi) => (
                <ResultGroup
                  key={g.key}
                  group={g}
                  compact={state.density === "compact"}
                  showType={state.sort === "month"}
                  labelTop={narrowed && gi === 0 && g.rows.length > 1}
                  onOpen={setDetailId}
                />
              ))}
            </>
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
            🕒 Live on Zoom · times shown in Dubai time (GMT+4) with US Eastern alongside.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-paper p-6 shadow-soft">
            <div>
              <h3 className="font-serif text-[1.2rem] font-semibold">
                Prefer to plan around dates?
              </h3>
              <p className="mt-1 max-w-[36em] text-[0.86rem] text-ink-soft">
                Open the full calendar for every cohort from July 2026 to April 2027,
                month by month or grouped by type.
              </p>
            </div>
            <Link
              to="/calendar"
              search={state}
              className="rounded-full bg-ink px-5 py-3 text-[0.86rem] font-bold text-paper no-underline hover:bg-crimson-deep"
            >
              Open the full calendar →
            </Link>
          </div>
        </div>
      </section>

      <ProfilePathway onOpen={setDetailId} />
      <CounsellorCard />
      <HowItWorks />
      <WhyLwl />
      <FaqAccordion />

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

function Segmented({
  legend,
  value,
  onChange,
  options,
}: {
  legend: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="mono-label text-ink-faint">{legend}</span>
      <div className="inline-flex gap-0.5 rounded-full border border-line bg-paper p-1">
        {options.map((o) => {
          const on = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.value)}
              className={`rounded-full px-3 py-1 text-[0.76rem] font-semibold transition-colors ${
                on ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
