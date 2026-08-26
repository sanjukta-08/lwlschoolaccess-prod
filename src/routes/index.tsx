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
import { SiteFooter } from "@/components/SiteFooter";
import { PartnerLogos } from "@/components/PartnerLogos";
import { WingMark } from "@/components/WingMark";
import { SectionHeading } from "@/components/SectionHeading";
import birdAsset from "@/assets/lwl-bird-black.png.asset.json";
import worldMapAsset from "@/assets/world-map-gold.png.asset.json";
import pathwayMedicine from "@/assets/pathway-medicine.png";
import pathwayLaw from "@/assets/pathway-law.png";
import pathwayFinance from "@/assets/pathway-finance.png";
import pathwayAi from "@/assets/pathway-ai.png";
import pathwayEntrepreneurship from "@/assets/pathway-entrepreneurship.png";
import pathwayResearch from "@/assets/pathway-research.png";
import pathwayDebate from "@/assets/pathway-debate.png";
import pathwayLeadership from "@/assets/pathway-leadership.png";
import pathwayExams from "@/assets/pathway-exams.png";
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

const FEATURED = ["fdf", "irf", "ail", "finlit"];

const PARTNERS = [
  "Harvard Student Agencies",
  "HPAIR",
  "Harvard Model Congress",
  "Harvard MUN Team",
  "Yale mentors",
  "Greenvan",
];

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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[55%] min-w-[22rem] opacity-[0.12]">
          <img
            src={birdAsset.url}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain object-left"
          />
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 w-[50%] min-w-[20rem] max-w-[34rem] opacity-[0.09]">
          <img
            src={worldMapAsset.url}
            alt=""
            aria-hidden="true"
            className="h-auto w-full object-contain object-right-bottom"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-paper via-paper/85 via-50% to-paper/30" />
        <div className="relative">
          <SiteHeader />
          <section className="mx-auto max-w-[1100px] px-5 pt-10 pb-16 text-center">
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
                className="rounded-full border-[1.5px] border-line bg-paper px-7 py-3.5 text-[0.98rem] font-bold text-ink no-underline transition-colors hover:border-ink-soft"
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

      <section id="pathways" className="scroll-mt-24 border-y border-gold-line/60 bg-wash px-5 py-16">
        <div className="mx-auto max-w-[1180px]">
          <SectionHeading
            eyebrow="Where to begin"
            sub="Every interest has a route - from a first taste to flagship fellowships. Tap one to see what fits your child."
          >
            Pick a <em className="text-crimson-deep">pathway</em>
          </SectionHeading>
          <div className="mt-10 grid overflow-hidden border border-gold-line bg-paper sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(TRACKS) as TrackKey[]).map((k, index) => {
              const t = TRACKS[k];
              const n = upcoming.filter((p) => p.tracks.includes(k)).length;
              return (
                <Link
                  key={k}
                  to="/finder"
                  search={{ ...DEFAULT_SEARCH, interest: k }}
                  style={{ "--tc": t.color } as React.CSSProperties}
                  className="group relative min-h-[248px] overflow-hidden border-r border-b border-gold-line bg-paper p-6 text-ink no-underline transition-colors duration-500 hover:bg-gold-mist"
                >
                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[var(--tc)] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10 flex h-full flex-col">
                    <span className="flex items-start justify-between">
                      <span className="mono-label text-gold-deep">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.4}
                        className="text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-crimson-deep"
                        aria-hidden="true"
                      />
                    </span>
                    <img
                      src={PATHWAY_ART[k]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      width={520}
                      height={520}
                      className="pointer-events-none absolute -right-5 top-5 h-[150px] w-[150px] object-contain opacity-90 mix-blend-multiply transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                    <span className="mt-auto max-w-[68%] pt-28">
                      <b className="block font-serif text-[1.55rem] leading-none font-semibold">
                        {t.label}
                      </b>
                      <small className="mt-2 block text-[0.78rem] text-ink-soft">
                        {PATHWAY_PROMISE[k]}
                      </small>
                      <small className="mono-label mt-3 block text-ink-faint">
                        {n} programme{n === 1 ? "" : "s"}
                      </small>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-gold-line/60 bg-wash px-5 py-14">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading
            eyebrow="Signature cohorts"
            sub="Our deepest experiences - small cohorts, dedicated mentors, capstones and Demo Days."
          >
            The <em className="text-crimson-deep">flagship</em> fellowships
          </SectionHeading>
          <div className="mt-8 grid gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED.map((id) => {
              const p = upcoming.find((x) => x.id === id);
              if (!p) return null;
              const c = p.cohorts[0];
              if (!c) return null;
              const t = TRACKS[p.tracks[0] as TrackKey];
              const [g1, g2] = cohortGrades(p, c);
              return (
                <Link
                  key={p.id}
                  to="/programmes/$slug"
                  params={{ slug: slugOf(p) }}
                  style={{ "--sp": t.color } as React.CSSProperties}
                  className="flex flex-col overflow-hidden rounded-[18px] border border-line bg-paper text-left text-ink no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span
                    className="flex items-center justify-between border-b px-4.5 py-2.5 text-[0.74rem] font-bold"
                    style={{
                      color: "var(--sp)",
                      background: "color-mix(in srgb, var(--sp) 8%, #fff)",
                      borderColor: "color-mix(in srgb, var(--sp) 16%, #fff)",
                    }}
                  >
                    <span>
                      {t.ic} {t.label}
                    </span>
                    <span>
                      G{g1}–{g2}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col gap-2 p-4.5">
                    <span className="font-serif text-[1.2rem] leading-tight font-semibold">
                      {p.name}
                    </span>
                    <span className="line-clamp-3 text-[0.83rem] text-ink-soft">
                      {p.tag}
                    </span>
                    <span className="mono-label mt-auto pt-2 text-ink-faint normal-case">
                      Next: <b className="text-ink">{fmtShort(c.d)}</b> · From{" "}
                      <b className="text-ink">{feeOf(p, c).e}</b>
                    </span>
                    <span
                      className="text-[0.83rem] font-bold"
                      style={{ color: "var(--sp)" }}
                    >
                      View programme →
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

      <section className="px-5 py-14">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow="Trusted collaborations">
            Delivered with <em className="text-crimson-deep">partners</em> students
            recognise
          </SectionHeading>
          <PartnerLogos />
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {PARTNERS.map((n) => (
              <span
                key={n}
                className="font-serif text-[1.02rem] font-semibold text-ink-soft"
              >
                {n}
              </span>
            ))}
          </div>
          <p className="mt-5 text-center text-[0.78rem] text-ink-faint">
            Programme partners and corporate internship hosts across the 2026–27 calendar.
          </p>
          <hr className="section-divider mt-14" />
        </div>
      </section>

      <HowItWorks />

      <section className="bg-wash px-5 py-14">
        <div className="mx-auto max-w-[1100px]">
          <Suspense fallback={<div className="h-[360px]" />}>
            <StoryStrip />
          </Suspense>
        </div>
      </section>

      <section className="px-5 pb-14">
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

      <section className="rounded-t-[28px] bg-ink px-5 py-16 text-center text-paper">
        <h2 className="font-serif text-[clamp(1.7rem,4vw,2.4rem)] font-medium">
          Ready to find <em className="text-gold">their</em> programme?
        </h2>
        <p className="mx-auto mt-3 mb-6 max-w-[34em] text-[0.95rem] text-paper/70">
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
