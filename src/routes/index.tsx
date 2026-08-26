import { Link, createFileRoute } from "@tanstack/react-router";
import { DEFAULT_FIT } from "@/lib/fit";
import { SiteHeader } from "@/components/SiteHeader";
import { HowItWorks } from "@/components/HowItWorks";
import { Suspense, lazy } from "react";
import {
  PROGRAMMES,
  TOTAL_COHORTS,
  TRACKS,
  cohortGrades,
  feeOf,
  fmtShort,
  upcomingProgrammes,
  type TrackKey,
} from "@/lib/programmes";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { slugOf } from "@/lib/programme-slug";
import { programmeLogo } from "@/lib/programme-logos";

import { SiteFooter } from "@/components/SiteFooter";
import { WingMark } from "@/components/WingMark";
import { SectionHeading } from "@/components/SectionHeading";
import birdAsset from "@/assets/lwl-bird-black.webp.asset.json";
import worldMapAsset from "@/assets/world-dots-gold.webp.asset.json";
import pathwayMedicine from "@/assets/pathway-medicine.webp";
import pathwayLaw from "@/assets/pathway-law.webp";
import pathwayFinance from "@/assets/pathway-finance.webp";
import pathwayAi from "@/assets/pathway-ai.webp";
import pathwayEntrepreneurship from "@/assets/pathway-entrepreneurship.webp";
import pathwayResearch from "@/assets/pathway-research.webp";
import pathwayDebate from "@/assets/pathway-debate.webp";
import pathwayLeadership from "@/assets/pathway-leadership.webp";
import pathwayExams from "@/assets/pathway-exams.webp";
import { ArrowUpRight } from "lucide-react";

const TITLE = "Learn with Leaders - Harvard & Yale-mentored programmes, Grades 5–12";
const DESC =
  "Live, Ivy League student-mentored fellowships, competitions, internships and conferences for students in Grades 5–12, from anywhere in the world.";

export const Route = createFileRoute("/")({
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
  component: HomePage,
});

const StoryStrip = lazy(() => import("@/components/StoryStrip"));
const HandwrittenNotes = lazy(() => import("@/components/HandwrittenNotes"));


const FEATURED = ["fdf", "irf", "ail", "finlit"];

const PATHWAY_ART: Record<TrackKey, string> = {
  med: pathwayMedicine,
  law: pathwayLaw,
  fin: pathwayFinance,
  ai: pathwayAi,
  ent: pathwayEntrepreneurship,
  res: pathwayResearch,
  deb: pathwayDebate,
  lead: pathwayLeadership,
  sat: pathwayExams,
};

const PATHWAY_PROMISE: Record<TrackKey, string> = {
  med: "Explore clinical thinking",
  law: "Argue with evidence",
  fin: "Read markets and value",
  ai: "Build with emerging technology",
  ent: "Turn ideas into ventures",
  res: "Investigate and publish",
  deb: "Speak with conviction",
  lead: "Lead teams and initiatives",
  sat: "Prepare with a clear strategy",
};

function HomePage() {
  const upcoming = upcomingProgrammes();

  return (
    <div className="min-h-screen bg-paper">
      <div className="relative overflow-hidden">
        <div className="hero-wash absolute inset-0" />
        <div className="pointer-events-none absolute inset-y-0 -left-[4vw] w-[34%] min-w-[15rem] opacity-[0.22]">
          <img
            src={birdAsset.url}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain object-left [mask-image:linear-gradient(to_right,black_35%,transparent_92%)]"
          />
        </div>
        <div className="pointer-events-none absolute -right-[9vw] bottom-0 hidden h-[min(230px,30vh)] w-[min(900px,70vw)] sm:block">
          <img
            src={worldMapAsset.url}
            alt=""
            aria-hidden="true"
            width={1920}
            height={768}
            className="h-full w-full object-cover object-right-bottom opacity-100 [mask-image:linear-gradient(to_top,black_72%,transparent)]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_52%_at_50%_38%,rgba(255,255,255,0.92),rgba(255,255,255,0)_72%)]" />


        <div className="relative">
          <SiteHeader />
          <section className="mx-auto max-w-[1100px] px-5 pt-8 pb-12 text-center">
            <span className="mono-label mb-4 inline-flex items-center gap-2 rounded-full border border-gold-line bg-paper px-3.5 py-1.5 text-gold-deep shadow-soft">
              <WingMark size={13} />
              Online programmes for Grades 5-12 · 2026-27
            </span>
            <h1 className="mx-auto font-serif text-[clamp(2.6rem,7.2vw,4.7rem)] leading-[1.05] font-medium tracking-tight text-balance">
              <span className="block">Where ambitious students</span>
              <em className="mt-1 block text-crimson-deep">learn with leaders</em>
            </h1>

            <p className="mx-auto mt-5 max-w-[60em] text-[clamp(1rem,2.4vw,1.14rem)] text-ink-soft">
              Live fellowships, competitions, corporate internships and MUN conferences,
              mentored by students from Harvard, Yale, MIT, Stanford and Princeton -
              joined by families in the Gulf, India, Southeast Asia and beyond.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3.5">
              <Link
                to="/finder"
                search={DEFAULT_SEARCH}
                className="rounded-full bg-crimson px-7 py-3.5 text-[0.98rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
              >
                Find the right programme →
              </Link>
              <Link
                to="/calendar"
                search={DEFAULT_SEARCH}
                className="rounded-full border-[1.5px] border-ink-soft bg-paper px-7 py-3.5 text-[0.98rem] font-bold text-ink no-underline shadow-soft transition-colors hover:border-ink hover:bg-wash"
              >
                Browse the full calendar
              </Link>
            </div>
            <p className="mt-3.5 text-[0.88rem] text-ink-soft">
              Not sure which one fits?{" "}
              <Link
                to="/fit"
                search={DEFAULT_FIT}
                className="font-bold text-crimson-deep underline decoration-gold decoration-2 underline-offset-4"
              >
                Answer 5 questions and we'll match three
              </Link>
              .
            </p>

            <dl className="mx-auto mt-9 grid max-w-[820px] grid-cols-2 items-stretch divide-gold-line/70 rounded-[20px] border border-gold-line bg-paper/70 px-4 py-4 shadow-soft sm:flex sm:px-6 sm:divide-x">
              {[
                [String(PROGRAMMES.length), "Programmes"],
                [String(TOTAL_COHORTS), "Upcoming cohorts"],
                ["426+", "Students published"],
                ["5-12", "Grades covered"],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="flex flex-1 flex-col items-center px-3 py-2.5 text-center sm:px-5 sm:py-1.5"
                >
                  <dt className="font-serif text-[1.6rem] leading-none font-semibold">
                    {v}
                  </dt>
                  <dd className="mono-label mt-1.5 text-ink-faint sm:whitespace-nowrap">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <section id="pathways" className="scroll-mt-24 border-y border-gold-line/60 bg-wash px-5 py-12">
        <div className="mx-auto max-w-[1180px]">
          <SectionHeading
            eyebrow="Where to begin"
            sub="Every interest has a route - from a first taste to flagship fellowships. Tap one to see what fits your child."
          >
            Pick a <em className="text-crimson-deep">pathway</em>
          </SectionHeading>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(TRACKS) as TrackKey[]).map((k, index) => {
              const t = TRACKS[k];
              const n = upcoming.filter((p) => p.tracks.includes(k)).length;
              return (
                <Link
                  key={k}
                  to="/finder"
                  search={{ ...DEFAULT_SEARCH, interest: k }}
                  style={{ "--tc": t.color } as React.CSSProperties}
                  className="group relative flex flex-col overflow-hidden rounded-[14px] border border-gold-line bg-paper px-4 py-3.5 text-ink no-underline shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:border-gold-deep"
                >
                  <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[var(--tc)] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="absolute top-2.5 right-2.5 z-10 text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-crimson-deep">
                    <ArrowUpRight size={14} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="relative z-10 flex items-start justify-between gap-3">
                    <span className="min-w-0 flex-1 pt-0.5">
                      <b className="block font-serif text-[1.18rem] leading-tight font-semibold">
                        {t.label}
                      </b>
                      <small className="mt-0.5 block text-[0.75rem] leading-snug text-ink-soft">
                        {PATHWAY_PROMISE[k]}
                      </small>
                      <small className="mono-label mt-1.5 block text-[0.7rem] text-ink-faint">
                        {n} programme{n === 1 ? "" : "s"}
                      </small>
                    </span>
                    <img
                      src={PATHWAY_ART[k]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      width={400}
                      height={400}
                      className="pointer-events-none h-[76px] w-[76px] flex-shrink-0 object-contain opacity-90 mix-blend-multiply transition-all duration-300 group-hover:scale-[1.04]"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-gold-line/60 bg-wash px-5 py-11">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading
            eyebrow="Signature cohorts"
            sub="Our deepest experiences - small cohorts, dedicated mentors, capstones and Demo Days."
          >
            The <em className="text-crimson-deep">flagship</em> fellowships
          </SectionHeading>
          <div className="mt-4 grid gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED.map((id) => {
              const p = upcoming.find((x) => x.id === id);
              if (!p) return null;
              const c = p.cohorts[0];
              if (!c) return null;
              const t = TRACKS[p.tracks[0] as TrackKey];
              const [g1, g2] = cohortGrades(p, c);
              const logo = programmeLogo(p.id);
              return (
                <Link
                  key={p.id}
                  to="/programmes/$slug"
                  params={{ slug: slugOf(p) }}
                  style={{ "--sp": t.color } as React.CSSProperties}
                  className="group flex flex-col overflow-hidden rounded-[18px] border border-gold-line bg-paper text-left text-ink no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-lift"
                >
                  <span
                    className="flex items-center justify-between border-b px-4.5 py-2.5 text-[0.7rem] font-bold tracking-[0.12em] uppercase"
                    style={{
                      color: "var(--sp)",
                      background: "color-mix(in srgb, var(--sp) 8%, #fff)",
                      borderColor: "color-mix(in srgb, var(--sp) 16%, #fff)",
                    }}
                  >
                    <span>{t.label}</span>
                    <span className="mono-label text-ink-faint">
                      G{g1}–{g2}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col items-center gap-3 px-4.5 py-5 text-center">
                    {logo ? (
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        loading="lazy"
                        className="h-10 w-full object-contain mix-blend-multiply"
                      />
                    ) : null}
                    <span className="font-serif text-[1.05rem] leading-tight font-semibold">
                      {p.name}
                    </span>
                    <span className="line-clamp-2 text-[0.83rem] text-ink-soft">
                      {p.tag}
                    </span>
                  </span>
                  <span className="flex flex-col gap-3 px-4.5 pb-4.5">
                    <span className="mono-label text-center text-ink-faint normal-case">
                      Next: <b className="text-ink">{fmtShort(c.d)}</b> ·{" "}
                      <b className="text-ink">{feeOf(p, c).e}</b>
                    </span>
                    <span className="block rounded-full border border-ink px-4 py-2.5 text-center text-[0.7rem] font-bold tracking-[0.18em] uppercase text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                      View programme
                    </span>
                  </span>
                </Link>
              );
            })}

          </div>
          <p className="mt-8 text-center">
            <Link
              to="/finder"
              search={DEFAULT_SEARCH}
              className="rounded-full bg-crimson px-7 py-3.5 text-[0.95rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
            >
              See all programmes →
            </Link>
          </p>
        </div>
      </section>

      <HowItWorks />

      <section className="py-14">
        <Suspense fallback={<div className="h-[420px]" />}>
          <HandwrittenNotes />
        </Suspense>
      </section>

      <section className="bg-wash px-5 py-11">
        <div className="mx-auto max-w-[1280px]">
          <Suspense fallback={<div className="h-[360px]" />}>
            <StoryStrip />
          </Suspense>
        </div>
      </section>


      <section className="px-5 py-14">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-5 rounded-[22px] border border-line bg-gradient-to-br from-wash-deep to-paper px-8 py-7">
          <div>
            <h3 className="font-serif text-[clamp(1.25rem,3vw,1.6rem)] font-semibold">
              Bringing this to your school?
            </h3>
            <p className="mt-1.5 max-w-[34em] text-[0.9rem] text-ink-soft">
              We partner with schools across the UAE, India, Thailand, South Korea and
              beyond - from single cohorts to co-branded pathways.
            </p>
          </div>
          <a
            href="https://www.learnwithleaders.com/"
            target="_blank"
            rel="noopener"
            className="rounded-full bg-crimson px-6 py-3.5 text-[0.95rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
          >
            Partner with us →
          </a>
        </div>
      </section>

      <section className="rounded-t-[28px] bg-ink px-5 py-12 text-center text-paper">
        <h2 className="font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          Ready to find <em className="text-gold">their</em> programme?
        </h2>
        <p className="mx-auto mt-3 mb-6 max-w-[52em] text-[0.95rem] text-paper/70">
          Thirty seconds with the finder, or a short conversation with an advisor -
          whichever suits you.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Link
            to="/finder"
            search={DEFAULT_SEARCH}
            className="rounded-full bg-paper px-7 py-3.5 text-[0.95rem] font-bold text-ink no-underline"
          >
            Open the Programme Finder
          </Link>
          <a
            href="https://www.learnwithleaders.com/"
            target="_blank"
            rel="noopener"
            className="rounded-full border-[1.5px] border-paper/40 px-7 py-3.5 text-[0.95rem] font-bold text-paper no-underline transition-colors hover:border-paper"
          >
            Talk to an advisor
          </a>
        </div>
      </section>

      <SiteFooter />

    </div>
  );
}
