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
import { WingMark, WingRule } from "@/components/WingMark";
import { SectionHeading } from "@/components/SectionHeading";

const TITLE = "Learn with Leaders — Harvard & Yale-mentored programmes, Grades 5–12";
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

function HomePage() {
  const upcoming = upcomingProgrammes();

  return (
    <div className="min-h-screen bg-paper">
      <div className="relative">
        <div className="hero-wash absolute inset-0" />
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
            <WingRule className="mt-5" />

            <p className="mx-auto mt-5 max-w-[60em] text-[clamp(1rem,2.4vw,1.14rem)] text-ink-soft">
              Live fellowships, competitions, corporate internships and MUN conferences,
              mentored by students from Harvard, Yale, MIT, Stanford and Princeton -
              joined by families in the Gulf, India, Southeast Asia and beyond.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
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
            <p className="mt-4 text-[0.88rem] text-ink-soft">
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

            <dl className="mx-auto mt-11 grid max-w-[820px] grid-cols-2 items-stretch divide-gold-line/70 rounded-[20px] border border-gold-line bg-paper/70 px-4 py-5 shadow-soft sm:flex sm:px-6 sm:divide-x">
              {[
                [String(PROGRAMMES.length), "Programmes"],
                [String(TOTAL_COHORTS), "Upcoming cohorts"],
                ["426+", "Students published"],
                ["5–12", "Grades covered"],
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

      <section id="pathways" className="scroll-mt-24 px-5 pt-14 pb-8">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading
            eyebrow="Where to begin"
            sub="Every interest has a route — from a first taste to flagship fellowships. Tap one to see what fits your child."
          >
            Pick a <em className="text-crimson-deep">pathway</em>
          </SectionHeading>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(TRACKS) as TrackKey[]).map((k) => {
              const t = TRACKS[k];
              const n = upcoming.filter((p) => p.tracks.includes(k)).length;
              return (
                <Link
                  key={k}
                  to="/finder"
                  search={{ ...DEFAULT_SEARCH, interest: k }}
                  style={{ "--tc": t.color } as React.CSSProperties}
                  className="flex items-center gap-3 rounded-2xl border-[1.5px] border-transparent bg-wash px-4.5 py-4 no-underline transition-all hover:-translate-y-0.5 hover:border-[var(--tc)] hover:bg-paper hover:shadow-soft"
                >
                  <span
                    className="grid h-11 w-11 flex-none place-items-center rounded-xl text-[1.3rem]"
                    style={{ background: "color-mix(in srgb, var(--tc) 12%, #fff)" }}
                  >
                    {t.ic}
                  </span>
                  <span>
                    <b className="block text-[0.92rem] font-bold">{t.label}</b>
                    <small className="text-[0.74rem] text-ink-faint">
                      {n} programme{n === 1 ? "" : "s"}
                    </small>
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
            sub="Our deepest experiences — small cohorts, dedicated mentors, capstones and Demo Days."
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
              beyond — from single cohorts to co-branded pathways.
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
          Thirty seconds with the finder, or a short conversation with an advisor —
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
