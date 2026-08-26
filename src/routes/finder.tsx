import ZoomBadge from "@/components/ZoomBadge";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { stripSearchParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import birdAsset from "@/assets/lwl-bird-black.webp.asset.json";

const GRADE_LO = Math.min(...PROGRAMMES.map((p) => p.g[0]));
const GRADE_HI = Math.max(...PROGRAMMES.map((p) => p.g[1]));
import { FinderPanel } from "@/components/FinderPanel";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { ResultGroup } from "@/components/ResultGroup";
import { CounsellorCard } from "@/components/CounsellorCard";
import { FaqAccordion, FAQS } from "@/components/FaqAccordion";
import { HowItWorks } from "@/components/HowItWorks";
import { TrendingTop5 } from "@/components/TrendingTop5";
import { SavedStrip } from "@/components/SavedStrip";
import { ProfilePathway } from "@/components/ProfilePathway";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PROGRAMMES, TRACKS, TYPE_NAME } from "@/lib/programmes";
import {
  BAND_LABEL,
  DEFAULT_SEARCH,
  getMatches,
  groupMatches,
  monthLabel,
  typeCounts,
  validateFinderSearch,
  type FinderSearch,
} from "@/lib/finder";

import { regionLabel } from "@/lib/regions";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Programme Finder | Learn with Leaders";
const DESC =
  "Find the right Harvard and Yale-mentored programme for your child in under 30 seconds. Filter by grade, interest, type and start date.";

const PAGE = 12;

export const Route = createFileRoute("/finder")({
  validateSearch: (search: Record<string, unknown>) => validateFinderSearch(search),
  search: { middlewares: [stripSearchParams(DEFAULT_SEARCH)] },
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
  const [visible, setVisible] = useState(PAGE);

  const update = (patch: Partial<FinderSearch>) => {
    setVisible(PAGE);
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  };

  const matches = getMatches(state);
  const cohortCount = matches.reduce((n, m) => n + 1 + m.others.length, 0);
  const narrowed =
    state.interest !== "all" ||
    state.grade !== "all" ||
    state.region !== "all" ||
    !!state.q;
  const groups = useMemo(() => groupMatches(matches, state.sort), [matches, state.sort]);

  // Paginate across the whole ordered result set, then show only the groups
  // that fall inside the visible slice. Keeps one calm column, no tab bar.
  const visibleGroups = useMemo(() => {
    let left = visible;
    const out: { key: string; label: string; sub: string; rows: typeof matches }[] = [];
    for (const g of groups) {
      if (left <= 0) break;
      out.push({ ...g, rows: g.rows.slice(0, left) });
      left -= g.rows.length;
    }
    return out;
  }, [groups, visible]);
  const remaining = matches.length - Math.min(visible, matches.length);

  const chips: { label: string; clear: Partial<FinderSearch> }[] = [];
  if (state.q) chips.push({ label: `“${state.q}”`, clear: { q: "" } });
  if (state.grade !== "all")
    chips.push({
      label: BAND_LABEL[state.grade] ?? `Grade ${state.grade}`,
      clear: { grade: "all" },
    });
  if (state.interest !== "all")
    chips.push({
      label: TRACKS[state.interest as keyof typeof TRACKS]?.label ?? state.interest,
      clear: { interest: "all" },
    });
  if (state.type !== "all")
    chips.push({
      label: TYPE_NAME[state.type as keyof typeof TYPE_NAME] ?? state.type,
      clear: { type: "all" },
    });
  if (state.month !== "all")
    chips.push({ label: monthLabel(state.month), clear: { month: "all" } });
  if (state.region !== "all")
    chips.push({ label: regionLabel(state.region), clear: { region: "all" } });


  let fallback = matches.length ? [] : getMatches(state, { ignoreMonth: true });
  let fallbackNote = "in other months";
  if (!matches.length && !fallback.length && state.region !== "all") {
    fallback = getMatches(state, { ignoreMonth: true, ignoreRegion: true });
    fallbackNote = "at other times of day";
  }
  if (!matches.length && !fallback.length) {
    fallback = getMatches(state, {
      ignoreMonth: true,
      ignoreInterest: true,
      ignoreQuery: true,
    });
    fallbackNote = "in other subject areas";
  }

  const headline = matches.length ? (
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
          , starting <em className="text-crimson-deep">{monthLabel(state.month)}</em>
        </>
      ) : null}
      {state.region !== "all" ? (
        <>
          {" "}
          at a workable hour in{" "}
          <em className="text-crimson-deep">{regionLabel(state.region)}</em>
        </>
      ) : null}
    </>
  ) : (
    <>
      No exact match - here are the <em className="text-crimson-deep">closest fits</em>
    </>
  );

  const filters = (
    <FinderPanel
      layout="bar"
      state={state}
      onChange={update}
      onReset={() => update(DEFAULT_SEARCH)}
      resultCount={matches.length}
      cohortCount={cohortCount}
    />
  );

  return (
    <div className="min-h-screen bg-wash">
      <div className="relative isolate overflow-hidden">
        {/* layered background wash */}
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

        {/* right-side bird mark — visible inside the section */}
        <div className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden w-[min(420px,32vw)] -translate-y-1/2 opacity-[0.42] sm:block lg:w-[min(480px,30vw)]">
          <img
            src={birdAsset.url}
            alt=""
            aria-hidden="true"
            className="h-auto w-full object-contain object-right [mask-image:linear-gradient(to_left,black_55%,transparent_95%)]"
          />
        </div>

        {/* decorative gold arc behind headline */}
        <div className="pointer-events-none absolute top-[-10%] left-[-5%] -z-10 h-[60%] w-[45%] rounded-full bg-[radial-gradient(circle,rgba(185,138,31,0.10),transparent_70%)] blur-3xl" />

        <div className="relative">
          <SiteHeader />
          <section className="mx-auto flex w-full max-w-none flex-col gap-4 px-4 pt-8 pb-10 sm:px-5 lg:px-6 xl:px-8">
            <div>
              <span className="mono-label mb-2 inline-flex items-center gap-2 text-crimson">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                {PROGRAMMES.length} programmes · Grades {GRADE_LO}–{GRADE_HI}
              </span>
              <h1 className="font-serif text-[clamp(1.8rem,4.4vw,2.7rem)] leading-[1.1] font-medium tracking-tight">
                Find the programme that{" "}
                <em className="text-crimson-deep">fits</em> your child
              </h1>
            </div>
            <ul className="flex flex-wrap gap-2">
              {[
                ["Harvard & Yale Student Mentors", "Taught by leaders"],
                ["Live on Zoom", "Dubai + US Eastern"],
                [`Grades ${GRADE_LO}–${GRADE_HI}`, `${PROGRAMMES.length} programmes`],
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
          </section>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-none px-4 pb-14 sm:px-5 lg:px-6 xl:px-8">
        <div className="mb-6">{filters}</div>

        <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="min-w-0 space-y-5 lg:sticky lg:top-6">
            <TrendingTop5 state={state} variant="rail" />
            <SavedStrip />
          </aside>

          <main className="min-w-0 space-y-8">
            <div className="space-y-3">
              <h3 className="font-serif text-[1.05rem] font-semibold text-ink">
                Browse by category
              </h3>
              <TypeChips state={state} onChange={update} />
            </div>

            <section id="all-programmes" className="scroll-mt-6">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-line pb-4">

                <div className="min-w-0">
                  <h2 className="font-serif text-[clamp(1.15rem,2.6vw,1.5rem)] leading-snug font-medium">
                    {headline}
                  </h2>
                  <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[0.78rem] text-ink-faint">
                    <ZoomBadge label="All sessions live on Zoom" />
                    <span>·</span>
                    <span>Times shown in Dubai (GMT+4)</span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Segmented
                    value={state.sort}
                    onChange={(v) => update({ sort: v })}
                    options={[
                      { value: "cat", label: "Category" },
                      { value: "month", label: "Month" },
                    ]}
                  />
                  <Segmented
                    value={state.density}
                    onChange={(v) => update({ density: v })}
                    options={[
                      { value: "compact", label: "List" },
                      { value: "comfy", label: "Cards" },
                    ]}
                  />
                </div>
              </div>

              {chips.length ? (
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="mono-label text-ink-faint">Filtered by</span>
                  {chips.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => update(c.clear)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-[0.76rem] font-semibold text-ink-soft transition-colors hover:border-crimson/50 hover:text-crimson"
                    >
                      {c.label}
                      <span aria-hidden className="text-[0.7rem]">
                        ✕
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => update(DEFAULT_SEARCH)}
                    className="text-[0.76rem] font-semibold text-ink-faint underline underline-offset-[3px] hover:text-crimson"
                  >
                    Clear all
                  </button>
                </div>
              ) : null}

              {matches.length ? (
                <>
                  <div className="space-y-8">
                    {visibleGroups.map((g) => (
                      <div key={g.key}>
                        <div className="mb-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="font-serif text-[1.05rem] font-semibold text-ink">
                            {g.label}
                          </h3>
                          <small className="mono-label text-ink-faint">
                            {groups.find((x) => x.key === g.key)?.rows.length} option
                            {groups.find((x) => x.key === g.key)?.rows.length === 1
                              ? ""
                              : "s"}
                          </small>
                        </div>
                        <ResultGroup
                          group={g}
                          rows={g.rows}
                          hideHeader
                          compact={state.density === "compact"}
                          showType={state.sort === "month"}
                          labelTop={narrowed && g.rows.length > 1}
                          region={state.region}
                        />
                      </div>
                    ))}
                  </div>

                  {remaining > 0 ? (
                    <div className="mt-7 text-center">
                      <button
                        type="button"
                        onClick={() => setVisible((v) => v + PAGE)}
                        className="rounded-full border-[1.5px] border-line bg-paper px-6 py-2.5 text-[0.84rem] font-bold text-ink-soft hover:border-ink-soft hover:text-ink"
                      >
                        Show {Math.min(remaining, PAGE)} more
                        <small className="ml-1.5 font-mono text-[0.72rem] text-ink-faint">
                          {remaining} left
                        </small>
                      </button>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="mb-5 rounded-2xl border-[1.5px] border-dashed border-line bg-paper px-6 py-8 text-center">
                    <h3 className="mb-2 font-serif text-[1.25rem] font-semibold">
                      Nothing matches that exact combination
                    </h3>
                    <p className="mx-auto max-w-[34em] text-[0.88rem] text-ink-soft">
                      Your child doesn&apos;t have to wait long - these are the closest
                      fits {fallbackNote}. Or clear a filter to widen the search.
                    </p>
                  </div>
                  {fallback.length ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {fallback.slice(0, 3).map((m, i) => (
                        <ProgrammeCard
                          key={m.p.id}
                          match={m}
                          index={i}
                          region={state.region}
                        />
                      ))}
                    </div>
                  ) : null}
                </>
              )}
            </section>


            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-paper px-5 py-4">
              <p className="max-w-[38em] text-[0.84rem] text-ink-soft">
                Prefer to plan around dates? Every cohort, month by month, with US
                Eastern times alongside Dubai.
              </p>
              <Link
                to="/calendar"
                search={state}
                className="rounded-full bg-ink px-5 py-2.5 text-[0.84rem] font-bold text-paper no-underline hover:bg-crimson-deep"
              >
                Open the full calendar →
              </Link>
            </div>

            <Accordion
              type="single"
              collapsible
              className="rounded-2xl border border-line bg-paper px-4"
            >
              <TailItem value="pathway" title="Plan the profile - step by step">
                <ProfilePathway />
              </TailItem>
              <TailItem value="advisor" title="Not sure? Describe your child instead">
                <CounsellorCard />
              </TailItem>
              <TailItem value="how" title="How it works & why parents choose us">
                <HowItWorks />
              </TailItem>
              <TailItem value="faq" title="Questions parents ask">
                <FaqAccordion />
              </TailItem>
            </Accordion>
          </main>
        </div>
      </div>

      <section className="bg-crimson-deep px-5 py-14 text-center text-paper">
        <h2 className="font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          Not sure which one <em>fits</em>?
        </h2>
        <p className="mx-auto mt-3 max-w-[34em] text-[0.93rem] text-paper/80">
          Tell us about your child and an advisor will recommend the right pathway - no
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

      <SiteFooter />

    </div>
  );
}

function TailItem({
  value,
  title,
  children,
}: {
  value: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-left font-serif text-[1.02rem] font-semibold hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent className="-mx-4 pb-0">{children}</AccordionContent>
    </AccordionItem>
  );
}

function TypeChips({
  state,
  onChange,
}: {
  state: FinderSearch;
  onChange: (patch: Partial<FinderSearch>) => void;
}) {
  const typeKeys = ["all", ...Object.keys(TYPES)] as const;
  const counts = typeCounts(state, typeKeys as unknown as string[]);

  const scrollToResults = () => {
    const el = document.getElementById("all-programmes");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {typeKeys.map((key) => {
          const pressed = state.type === key;
          const label =
            key === "all" ? "All" : TYPES[key as keyof typeof TYPES].label;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={pressed}
              onClick={() => {
                onChange({ type: key });
                scrollToResults();
              }}
              className={`flex-none rounded-full border px-4 py-2 text-[0.82rem] font-semibold whitespace-nowrap transition-all ${
                pressed
                  ? "border-ink bg-ink text-paper shadow-soft"
                  : "border-line bg-paper text-ink-soft hover:border-ink-soft hover:text-ink"
              }`}
            >
              <span>{label}</span>
              <small
                className={`ml-1.5 font-mono text-[0.7rem] font-medium ${
                  pressed ? "text-paper/70" : "text-ink-faint"
                }`}
              >
                {counts[key]}
              </small>
            </button>
          );
        })}
      </div>
      <span
        className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-wash to-transparent sm:hidden"
        aria-hidden="true"
      />
    </div>
  );
}


function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="inline-flex gap-0.5 rounded-full border border-line bg-paper p-1">
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`rounded-full px-3 py-1 text-[0.74rem] font-semibold transition-colors ${
              on ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
