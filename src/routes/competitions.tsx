import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, GraduationCap, Trophy } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { useHydratedCatalogue } from "@/lib/catalogue";
import { DEFAULT_SEARCH } from "@/lib/finder";
import {
  PROGRAMMES,
  TRACKS,
  fmtLong,
  upcomingProgrammes,
  type Programme,
} from "@/lib/programmes";

const TITLE = "Competitions - Learn with Leaders";
const DESC =
  "Judged championships and challenges run by the Learn with Leaders family, including Onward and FinLit. See formats, grade bands and dates, and jump straight to each competition's official page.";

export const Route = createFileRoute("/competitions")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://lwlschoolaccess.com/competitions" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://lwlschoolaccess.com/competitions" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Learn with Leaders competitions",
          itemListElement: upcomingProgrammes()
            .filter((p) => p.type === "comp")
            .map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: p.apply,
            })),
        }),
      },
    ],
  }),
  component: CompetitionsPage,
});

/** Human partner label from a competition URL (Onward, FinLit, LWL…). */
const partnerFromUrl = (url: string): string => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("onward")) return "Onward";
    if (host.includes("finlit")) return "FinLit";
    if (host.includes("learnwithleaders")) return "Learn with Leaders";
    return host.split(".")[0]!.replace(/^./, (c) => c.toUpperCase());
  } catch {
    return "Learn with Leaders";
  }
};

const nextCohort = (p: Programme) => p.cohorts[0];

function CompetitionCard({ p }: { p: Programme }) {
  const partner = partnerFromUrl(p.apply);
  const next = nextCohort(p);
  return (
    <li>
      <a
        href={p.apply}
        target="_blank"
        rel="noopener"
        className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-paper p-6 no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold-line hover:shadow-lift"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="mono-label inline-flex items-center gap-1.5 text-gold-deep">
            <Trophy className="h-3.5 w-3.5" aria-hidden />
            {partner}
          </span>
          <span className="mono-label text-ink-faint">{p.dur}</span>
        </div>

        <h3 className="font-serif text-[1.35rem] leading-tight font-medium text-ink transition-colors group-hover:text-crimson">
          {p.name}
        </h3>

        <p className="text-[0.85rem] leading-relaxed text-ink-soft">{p.about}</p>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.78rem] text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
              Grades {p.g[0]}-{p.g[1]}
            </span>
            {next ? (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
                {fmtLong(next.d)}
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {p.tracks.map((t) => (
              <span
                key={t}
                className="rounded-full bg-wash px-2.5 py-0.5 text-[0.7rem] font-semibold text-ink-soft"
              >
                {TRACKS[t].short}
              </span>
            ))}
          </div>

          <span className="mono-label mt-1 inline-flex items-center gap-1.5 text-crimson">
            View competition
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </a>
    </li>
  );
}

function CompetitionsPage() {
  useHydratedCatalogue();
  const competitions = upcomingProgrammes().filter((p) => p.type === "comp");
  const partners = new Set(competitions.map((p) => partnerFromUrl(p.apply)));

  return (
    <div className="min-h-dvh bg-paper">
      <PageHero
        eyebrow="Judged challenges with awards and rankings"
        title={
          <>
            Competitions worth <em className="text-crimson-deep">winning</em>
          </>
        }
        subtitle={`Championships and challenges from the Learn with Leaders family - ${partners.size ? [...partners].join(", ") : "our partner platforms"}. Pick a competition below and you will land directly on its official page to see rules, rounds and registration.`}
        pills={[
          { top: `${competitions.length} competitions`, sub: "Open & upcoming" },
          { top: `${partners.size} platforms`, sub: "LWL family" },
          { top: "Grades 5-12", sub: "Across events" },
          { top: "Awards & rankings", sub: "Verifiable results" },
        ]}
      >
        <a
          href="#all-competitions"
          className="mono-label bg-crimson px-7 py-3.5 text-paper no-underline shadow-soft transition-colors hover:bg-crimson-deep"
        >
          Explore competitions
        </a>
        <a
          href={CALENDLY_BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="mono-label border border-line bg-paper px-7 py-3.5 text-ink no-underline shadow-soft transition-colors hover:border-gold-line hover:text-crimson"
        >
          Book a meeting
        </a>
      </PageHero>

      <section id="all-competitions" className="page-shell py-14">
        <SectionHeading
          eyebrow="All competitions"
          align="left"
          sub="Each card opens the competition's own official page in a new tab."
        >
          Choose your <em className="text-crimson-deep">arena</em>
        </SectionHeading>

        {competitions.length ? (
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {competitions.map((p) => (
              <CompetitionCard key={p.id} p={p} />
            ))}
          </ul>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <a
              href="https://joinonwards.com/competitions"
              target="_blank"
              rel="noopener"
              className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-paper p-6 no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold-line hover:shadow-lift"
            >
              <span className="mono-label inline-flex items-center gap-1.5 text-gold-deep">
                <Trophy className="h-3.5 w-3.5" aria-hidden />
                Onward
              </span>
              <h3 className="font-serif text-[1.35rem] leading-tight font-medium text-ink transition-colors group-hover:text-crimson">
                Onward Competitions
              </h3>
              <p className="text-[0.85rem] leading-relaxed text-ink-soft">
                Debate, public speaking and academic challenges hosted by Onward,
                the communications arm of Learn with Leaders.
              </p>
              <span className="mono-label mt-auto inline-flex items-center gap-1.5 text-crimson">
                View competitions
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </a>
            <a
              href="https://joinfinlit.com/competition"
              target="_blank"
              rel="noopener"
              className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-paper p-6 no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold-line hover:shadow-lift"
            >
              <span className="mono-label inline-flex items-center gap-1.5 text-gold-deep">
                <Trophy className="h-3.5 w-3.5" aria-hidden />
                FinLit
              </span>
              <h3 className="font-serif text-[1.35rem] leading-tight font-medium text-ink transition-colors group-hover:text-crimson">
                FinLit Competition
              </h3>
              <p className="text-[0.85rem] leading-relaxed text-ink-soft">
                Finance and investing challenges hosted by FinLit, the financial
                literacy arm of Learn with Leaders.
              </p>
              <span className="mono-label mt-auto inline-flex items-center gap-1.5 text-crimson">
                View competition
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </a>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-gold-line/50 bg-wash p-6">
          <p className="text-[0.9rem] text-ink-soft">
            Not sure which competition fits? Filter the whole catalogue by
            competitions, or let the quiz match one to your child's interests.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/finder"
              search={{ ...DEFAULT_SEARCH, type: "comp" }}
              className="mono-label bg-crimson px-5 py-2.5 text-paper no-underline transition-colors hover:bg-crimson-deep"
            >
              Browse in the Finder
            </Link>
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mono-label border border-line bg-paper px-5 py-2.5 text-ink no-underline transition-colors hover:border-gold-line hover:text-crimson"
            >
              Talk to an Advisor
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
