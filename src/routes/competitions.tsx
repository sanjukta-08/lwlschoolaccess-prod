import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, GraduationCap, Trophy } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { useHydratedCatalogue } from "@/lib/catalogue";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { withUtm } from "@/lib/utm";
import { slugOf } from "@/lib/programme-slug";
import { TRACKS, fmtLong, upcomingProgrammes, type Programme } from "@/lib/programmes";
import imgFinanceMarkets from "@/assets/competitions/finance-markets.jpg";
import imgFinanceChallenge from "@/assets/competitions/finance-challenge.jpg";
import imgEssay from "@/assets/competitions/essay-writing.jpg";
import imgStem from "@/assets/competitions/stem-innovation.jpg";
import imgAi from "@/assets/competitions/ai-founders.jpg";
import imgAiFounders from "@/assets/competitions/ai-founders-challenge.png.asset.json";
import imgDebate from "@/assets/competitions/debating.jpg";
import imgGeneric from "@/assets/competitions/generic.jpg";
import birdAsset from "@/assets/lwl-bird-black.webp.asset.json";

const isAiFoundersChallenge = (p: Programme): boolean => {
  const n = p.name.toLowerCase();
  return n.includes("ai founder") || n.includes("founders challenge");
};

/** Competitions hidden from this page for now (still in the catalogue). */
const isHiddenCompetition = (p: Programme): boolean => {
  const n = p.name.toLowerCase();
  return (
    n.includes("next generation finance") ||
    n.includes("creating livelihoods") ||
    n.includes("junior venture challenge")
  );
};

const firstDate = (p: Programme): string =>
  [...p.cohorts].map((c) => c.d).sort()[0] ?? "9999-12-31";

/** Earliest upcoming start date first; undated competitions last. */
const sortCompetitions = (a: Programme, b: Programme): number =>
  firstDate(a).localeCompare(firstDate(b));

/** Picks the closest-matching photo for a competition from its name and track. */
const imageFor = (p: Programme): string => {
  const n = p.name.toLowerCase();
  if (isAiFoundersChallenge(p)) return imgAiFounders.url;
  if (n.includes("wolves") || n.includes("wall street")) return imgFinanceMarkets;
  if (n.includes("essay")) return imgEssay;
  if (n.includes("stem")) return imgStem;
  if (n.includes("debat")) return imgDebate;
  if (n.includes("founder") || n.includes("ai ")) return imgAi;
  if (n.includes("finance") || n.includes("finlit")) return imgFinanceChallenge;
  if (p.tracks.includes("fin")) return imgFinanceMarkets;
  if (p.tracks.includes("ai")) return imgAi;
  if (p.tracks.includes("law")) return imgDebate;
  if (p.tracks.includes("res")) return imgEssay;
  return imgGeneric;
};

/** First sentence only, trimmed, so every card reads at the same length. */
const shortAbout = (text: string, limit = 130): string => {
  const clean = text.replace(/\s+/g, " ").trim();
  const firstStop = clean.search(/\.\s|\.$/);
  const sentence = firstStop > 0 ? clean.slice(0, firstStop + 1) : clean;
  if (sentence.length <= limit) return sentence;
  const cut = sentence.slice(0, limit);
  return cut.slice(0, cut.lastIndexOf(" ")) + "...";
};

const TITLE = "Competitions - Learn with Leaders";
const DESC =
  "Judged championships and challenges run by the Learn with Leaders family, including Onward and FinLit. See formats, grade bands and dates, and jump straight to each competition's official page.";

export const Route = createFileRoute("/competitions")({
  staticData: { sitemap: true },
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
    links: [{ rel: "canonical", href: "https://lwlschoolaccess.com/competitions" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Learn with Leaders competitions",
          itemListElement: upcomingProgrammes()
            .filter(
              (p) => p.type === "comp" && !isHiddenCompetition(p),
            )
            .sort(sortCompetitions)
            .map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `https://lwlschoolaccess.com/programmes/${slugOf(p)}`,
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
    if (host.includes("learnwithleaders") || host === "docs.google.com")
      return "Learn with Leaders";
    return host.split(".")[0]!.replace(/^./, (c) => c.toUpperCase());
  } catch {
    return "Learn with Leaders";
  }
};

/** Competitions whose cards open the competition's own site in a new tab. */
const externalCompetitionUrl = (p: Programme): string | null => {
  const n = p.name.toLowerCase();
  if (isAiFoundersChallenge(p)) return "https://joinonwards.com/competitions";
  if (n.includes("pre-med") || n.includes("pre med") || n.includes("premed"))
    return "https://futuredoctorsprogram.com/competition";
  if (n.includes("future career challenge")) return "https://joinfuturedge.com/";
  if (n.includes("wolves")) return "https://joinfinlit.com/competition";
  if (n.includes("moot")) return "https://futurelawyersprogram.com/moot-court";
  if (n.includes("yale") && n.includes("essay"))
    return "https://www.learnwithleaders.com/competitions/the-yale-international-relations-essay-competition/";
  if (n.includes("huso") || n.includes("science olympiad")) {
    if (n.includes("india"))
      return "https://www.learnwithleaders.com/competitions/harvard-undergraduate-science-olympiad-india/";
    if (n.includes("middle east") || n.includes("middleeast"))
      return "https://www.learnwithleaders.com/competitions/harvard-undergraduate-science-olympiad-middleeast/";
  }
  return null;
};

const nextCohort = (p: Programme) => [...p.cohorts].sort((a, b) => a.d.localeCompare(b.d))[0];

function CompetitionCard({ p }: { p: Programme }) {
  const partner = partnerFromUrl(p.apply);
  const next = nextCohort(p);
  const external = externalCompetitionUrl(p);
  const cardClass =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold-line hover:shadow-lift";
  const body = (
    <>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-wash">
          <img
            src={imageFor(p)}
            alt={p.name}
            loading="lazy"
            width={1024}
            height={576}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="mono-label absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-paper/92 px-2.5 py-1 text-[0.66rem] text-gold-deep backdrop-blur-sm">
            <Trophy className="h-3.5 w-3.5" aria-hidden />
            {partner}
          </span>
          <span className="mono-label absolute top-3 right-3 rounded-full bg-ink/75 px-2.5 py-1 text-[0.66rem] text-paper backdrop-blur-sm">
            {p.dur}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap gap-1.5">
            {p.tracks.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-wash px-2.5 py-0.5 text-[0.7rem] font-semibold text-ink-soft"
              >
                {TRACKS[t].short}
              </span>
            ))}
          </div>

          <h3 className="line-clamp-2 font-serif text-[1.2rem] leading-tight font-medium text-ink transition-colors group-hover:text-crimson">
            {p.name}
          </h3>

          <p className="line-clamp-3 text-[0.85rem] leading-relaxed text-ink-soft">
            {shortAbout(p.about)}
          </p>

          <div className="mt-auto flex flex-col gap-3 border-t border-line pt-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] font-semibold text-ink">
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

            <span className="mono-label inline-flex items-center gap-1.5 text-crimson">
              View competition
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
          </div>
        </div>
    </>
  );
  return (
    <li className="h-full">
      {external ? (
        <a
          href={external}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          onClick={(e) => {
            e.currentTarget.href = withUtm(external);
          }}
        >
          {body}
        </a>
      ) : (
        <Link to="/programmes/$slug" params={{ slug: slugOf(p) }} className={cardClass}>
          {body}
        </Link>
      )}
    </li>
  );
}

function CompetitionsPage() {
  useHydratedCatalogue();
  const competitions = upcomingProgrammes()
    .filter((p) => p.type === "comp" && !isHiddenCompetition(p))
    .sort(sortCompetitions);

  return (
    <div className="min-h-dvh bg-paper">
      <SiteHeader />
      <section className="relative isolate flex min-h-[19rem] items-center justify-center overflow-hidden border-b border-line bg-paper px-5 pb-10 pt-8 sm:min-h-[21rem] sm:px-8 lg:pb-12 lg:pt-10">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[68%] select-none items-center overflow-hidden pl-8 sm:flex"
          aria-hidden
        >
          <span className="whitespace-nowrap font-display text-[clamp(4.5rem,11vw,10rem)] font-black uppercase leading-none text-crimson/[0.06]">
            Competitions
          </span>
        </div>
        <div
          className="pointer-events-none absolute right-10 top-1/2 z-[1] hidden w-[min(320px,21vw)] -translate-y-1/2 opacity-20 xl:block"
          aria-hidden
        >
          <img
            src={birdAsset.url}
            alt=""
            className="h-auto w-full object-contain object-right [mask-image:linear-gradient(to_left,black_55%,transparent_95%)]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-display text-5xl font-black leading-[0.98] text-ink sm:text-6xl xl:text-7xl">
            Explore Our <span className="text-crimson">Competitions</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Championships and judged challenges from the Learn with Leaders family. Explore the
            rules, rounds, awards, and registration for every open competition.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#all-competitions"
              className="mono-label bg-crimson px-8 py-4 text-paper no-underline shadow-soft transition-colors hover:bg-crimson-deep"
            >
              View all competitions
            </a>
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mono-label border border-line bg-paper px-8 py-4 text-ink no-underline shadow-soft transition-colors hover:border-gold-line hover:text-crimson"
            >
              Book a meeting
            </a>
          </div>
        </div>

        <div
          className="pointer-events-none absolute left-8 top-1/2 hidden h-32 w-1 -translate-y-1/2 bg-crimson/20 lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block"
          aria-hidden
        >
          <span className="mono-label text-crimson/35 [writing-mode:vertical-rl]">
            Learn with Leaders
          </span>
        </div>
      </section>

      <section id="all-competitions" className="page-shell py-14">
        <SectionHeading
          eyebrow="All competitions"
          align="left"
          sub="Each card opens the competition's own official page in a new tab."
        >
          Choose your <em className="text-crimson-deep">arena</em>
        </SectionHeading>

        {competitions.length ? (
          <ul className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                Debate, public speaking and academic challenges hosted by Onward, the communications
                arm of Learn with Leaders.
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
                Finance and investing challenges hosted by FinLit, the financial literacy arm of
                Learn with Leaders.
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
            Not sure which competition fits? Filter the whole catalogue by competitions, or let the
            quiz match one to your child's interests.
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
