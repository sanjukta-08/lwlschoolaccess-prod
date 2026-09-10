import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { RoleCard } from "@/components/RoleCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { INTERNSHIP_APPLY_URL } from "@/lib/internship-apply";
import { ROLES } from "@/lib/internships";
import { REACH } from "@/lib/social-proof";
import { ArrowRight, Globe, GraduationCap, Users } from "lucide-react";

const TITLE = "Internships - Learn with Leaders";
const DESC =
  "Join the Learn with Leaders competitions team. Open sponsorship roles for experienced managers and ambitious interns, all remote.";

export const Route = createFileRoute("/internships/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://lwlschoolaccess.com/internships" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://lwlschoolaccess.com/internships" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Learn with Leaders",
          url: "https://www.learnwithleaders.com/",
          sameAs: ["https://www.linkedin.com/company/learn-with-leaders/"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          ROLES.map((role) => ({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: role.title,
            description: role.about,
            datePosted: "2026-08-27",
            employmentType: role.type === "Full Time" ? "FULL_TIME" : "INTERN",
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Remote",
                addressRegion: "",
                addressCountry: "",
              },
            },
            jobLocationType: "TELECOMMUTE",
            hiringOrganization: {
              "@type": "Organization",
              name: "Learn with Leaders",
              url: "https://www.learnwithleaders.com/",
            },
            applicationContact: {
              "@type": "ContactPoint",
              email: "careers@learnwithleaders.com",
              contactType: "recruitment",
            },
          })),
        ),
      },
    ],
  }),
  component: InternshipsPage,
});

function InternshipsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <PageHero
        eyebrow="Join us · Learn with Leaders"
        title={
          <>
            Sponsorship roles{" "}
            <em className="text-crimson-deep">- Competitions</em>
          </>
        }
        subtitle="Help us bring world-class student competitions to life. Work remotely with a global team, build partnerships with leading brands, and grow a career in sponsorships, sales and education."
        pills={[
          { top: "Remote-first", sub: "Work from anywhere" },
          { top: `${REACH.countries}+ countries`, sub: "Global reach" },
          { top: "Harvard & Yale mentors", sub: "Learn with leaders" },
        ]}
      >
        <a
          href="#roles"
          className="rounded-full bg-crimson px-7 py-3.5 text-[0.95rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
        >
          See open roles
        </a>
        <a
          href={INTERNSHIP_APPLY_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border-[1.5px] border-crimson/35 bg-paper px-7 py-3.5 text-[0.95rem] font-bold text-crimson no-underline transition-colors hover:border-crimson"
        >
          Apply now
        </a>
      </PageHero>

      <section id="roles" className="page-shell py-14">
        <SectionHeading
          eyebrow="Open positions"
          sub="Two ways to join right now. Both roles are remote and report into the competitions leadership team."
        >
          Roles open for applications
        </SectionHeading>
        <div className="mx-auto mt-10 max-w-[1100px] space-y-8">
          {ROLES.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </section>

      <section className="page-shell py-14">
        <div className="mx-auto max-w-[1100px] rounded-[26px] border border-line bg-gradient-to-br from-wash-deep to-paper p-8 sm:p-10">
          <SectionHeading
            align="left"
            eyebrow="Why join us"
            sub="We are building the next generation of student-led competitions, mentored by people who have walked the halls of the world's most selective universities."
          >
            Work where ambition meets impact
          </SectionHeading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-soft">
              <Globe className="h-7 w-7 text-crimson" />
              <h3 className="mt-3 font-serif text-[1.05rem] font-semibold">Global, remote team</h3>
              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-soft">
                Collaborate across time zones with colleagues, mentors and students in{" "}
                {REACH.countries} countries.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-soft">
              <GraduationCap className="h-7 w-7 text-crimson" />
              <h3 className="mt-3 font-serif text-[1.05rem] font-semibold">Ivy League network</h3>
              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-soft">
                Our competitions are shaped by mentors from Harvard, Yale and other leading
                institutions.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-soft">
              <Users className="h-7 w-7 text-crimson" />
              <h3 className="mt-3 font-serif text-[1.05rem] font-semibold">Real ownership</h3>
              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-soft">
                From day one you will own sponsor pipelines, craft pitches and see deals close - not
                just shadow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-14">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-6 rounded-[26px] border border-line bg-paper px-8 py-8 shadow-soft sm:px-10">
          <div>
            <h2 className="font-serif text-[clamp(1.25rem,3vw,1.6rem)] font-semibold">
              Not sure which role fits?
            </h2>
            <p className="mt-1.5 max-w-[34em] text-[0.9rem] text-ink-soft">
              Send a general application and we will match your experience to the right opening.
            </p>
          </div>
          <a
            href={INTERNSHIP_APPLY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3.5 text-[0.95rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
          >
            Talk to the team
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="rounded-t-[28px] bg-ink px-5 py-16 text-center text-paper">
        <h2 className="font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          Explore our programmes
        </h2>
        <p className="mx-auto mt-3 mb-6 max-w-[52em] text-[0.95rem] text-paper/70">
          Discover live cohorts for students aged 10-18, mentored by students and alumni of the
          world&apos;s most selective universities.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Link
            to="/finder"
            search={DEFAULT_SEARCH}
            className="rounded-full bg-paper px-7 py-3.5 text-[0.95rem] font-bold text-ink no-underline"
          >
            Open the Programme Finder
          </Link>
          <Link
            to="/about"
            className="rounded-full border-[1.5px] border-paper/40 px-7 py-3.5 text-[0.95rem] font-bold text-paper no-underline transition-colors hover:border-paper"
          >
            About Learn with Leaders
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
