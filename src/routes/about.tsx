import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { AboutLwl } from "@/components/AboutLwl";
import { WhyLwl } from "@/components/HowItWorks";
import { PressStrip } from "@/components/PressStrip";
import { GlobalReach } from "@/components/GlobalReach";
import { LinkedInStories } from "@/components/LinkedInStories";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { REACH } from "@/lib/social-proof";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "About Learn with Leaders - press, schools and student stories";
const DESC =
  "Who we are: Ivy League student mentors, live cohorts for Grades 5–12, press coverage, students from 80+ countries and 30,000+ schools, and stories shared on LinkedIn.";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Learn with Leaders",
          description: DESC,
          url: "https://www.learnwithleaders.com/",
          sameAs: ["https://www.linkedin.com/company/learn-with-leaders/"],
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      <PageHero
        eyebrow="Learn with Leaders · since 2019"
        title={
          <>
            Learn <em className="text-crimson-deep">with</em> leaders - and finish with
            proof.
          </>
        }
        subtitle={
          <>
            Live programmes mentored by students and alumni of the world's most selective
            universities, joined by young people from {REACH.countries} countries and{" "}
            {REACH.schools} schools.
          </>
        }
        pills={[
          { top: "Ivy League student mentors", sub: "Taught by leaders" },
          { top: `${REACH.countries} countries`, sub: `${REACH.schools} schools` },
          { top: "Live on Zoom", sub: "Dubai + US Eastern" },
        ]}
      >
        <Link
          to="/finder"
          search={DEFAULT_SEARCH}
          className="rounded-full bg-crimson px-7 py-3.5 text-[0.95rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
        >
          Open the Programme Finder
        </Link>
        <a
          href="#press"
          className="rounded-full border-[1.5px] border-crimson/35 bg-paper px-7 py-3.5 text-[0.95rem] font-bold text-crimson no-underline transition-colors hover:border-crimson"
        >
          See our press coverage
        </a>
      </PageHero>

      <AboutLwl />
      <WhyLwl />
      <PressStrip />
      <GlobalReach />
      <LinkedInStories />

      <section className="page-shell py-16">
        <div className="flex w-full flex-wrap items-center justify-between gap-5 rounded-[22px] border border-line bg-gradient-to-br from-wash-deep to-paper px-8 py-7">

          <div>
            <h2 className="font-serif text-[clamp(1.25rem,3vw,1.6rem)] font-semibold">
              Bringing this to your school?
            </h2>
            <p className="mt-1.5 max-w-[34em] text-[0.9rem] text-ink-soft">
              From a single cohort to a co-branded, multi-term pathway - we work with
              school leadership and counselling teams across the world.
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
