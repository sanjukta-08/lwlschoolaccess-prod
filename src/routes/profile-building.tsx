import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { ProfileTypeBlocks } from "@/components/ProfileTypeBlocks";
import { ProfileTrackTable } from "@/components/ProfileTrackTable";
import { CounsellorCard } from "@/components/CounsellorCard";
import { PATHWAY } from "@/lib/programmes";
import { BANDS, PB_FAQS, PROOF_FLOW } from "@/lib/profile-building";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Profile Building Explained | Learn with Leaders";
const DESC =
  "How each Learn with Leaders program builds a university profile: the skills your child gains, the proof you end up holding, and when to do what from Grade 5 to 12.";

export const Route = createFileRoute("/profile-building")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PB_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: ProfileBuildingPage,
});

function ProfileBuildingPage() {
  return (
    <div className="min-h-dvh bg-wash">
      <PageHero
        eyebrow="For parents"
        title={
          <>
            Profile building, <em className="text-crimson-deep">explained</em>
          </>
        }
        subtitle={
          <>
            Universities read a story, not a list of certificates. This page sets out exactly what
            each kind of program contributes to that story, the skills your child practises, and the
            proof you are left holding at the end - the things an admissions officer can actually
            check.
          </>
        }
        pills={[
          { top: "Four steps, in order", sub: "Explore to proof" },
          { top: "Grades 5-12", sub: "Band by band" },
          { top: "Verifiable outcomes", sub: "What universities check" },
        ]}
      >
        <Link
          to="/finder"
          search={DEFAULT_SEARCH}
          className="rounded-full bg-crimson px-6 py-3 text-[0.88rem] font-bold text-paper no-underline hover:bg-crimson-deep"
        >
          Find the right program
        </Link>
        <Link
          to="/calendar"
          search={DEFAULT_SEARCH}
          className="rounded-full border-[1.5px] border-line bg-paper px-6 py-3 text-[0.88rem] font-semibold text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
        >
          See the full calendar →
        </Link>
      </PageHero>

      {/* Four steps, restated */}
      <section className="page-shell py-14">
        <div>
          <header className="mb-7 mx-auto max-w-[46em] text-center">
            <span className="mono-label text-crimson">The shape of it</span>
            <h2 className="mt-2 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
              Four steps, in <em className="text-crimson-deep">this order</em>
            </h2>
          </header>
          <ol className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PATHWAY.map((stage, i) => (
              <li
                key={stage.key}
                className="rounded-2xl border border-line bg-paper p-5 shadow-soft"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="mono-label text-crimson">Step {i + 1}</span>
                  <span className="whitespace-nowrap rounded-full bg-wash px-2.5 py-1 font-mono text-[0.68rem] font-semibold text-ink-soft">
                    {stage.band}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-[1.15rem] font-semibold">{stage.title}</h3>
                <p className="mt-1.5 text-[0.84rem] text-ink-soft">{stage.goal}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProfileTypeBlocks />
      <ProfileTrackTable />

      {/* Program to proof */}
      <section className="page-shell py-14">
        <div>
          <header className="mb-7 mx-auto max-w-[46em] text-center">
            <span className="mono-label text-crimson">The conversion</span>
            <h2 className="mt-2 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
              From one program to <em className="text-crimson-deep">one line</em> on an application
            </h2>
            <p className="mt-2.5 text-[0.93rem] text-ink-soft">
              Most families stop at "completed". These six moves are what turn a completed program
              into something a university can verify.
            </p>
          </header>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROOF_FLOW.map((s, i) => (
              <article
                key={s.title}
                className="flex gap-3 rounded-2xl border border-line bg-paper p-5 shadow-soft"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crimson/10 font-mono text-[0.8rem] font-bold text-crimson">
                  {i + 1}
                </span>
                <div>
                  <b className="block text-[0.94rem] font-semibold">{s.title}</b>
                  <p className="mt-1 text-[0.84rem] text-ink-soft">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Grade bands */}
      <section className="bg-wash-deep/60">
        <div className="page-shell py-14">
          <header className="mb-7 mx-auto max-w-[46em] text-center">
            <span className="mono-label text-crimson">Timing</span>
            <h2 className="mt-2 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
              What to do <em className="text-crimson-deep">when</em>
            </h2>
          </header>
          <div className="grid items-start gap-4 md:grid-cols-3">
            {BANDS.map((b) => (
              <article
                key={b.band}
                className="rounded-3xl border border-line bg-paper p-5 shadow-soft"
              >
                <span className="whitespace-nowrap rounded-full bg-wash px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-ink-soft">
                  {b.band}
                </span>
                <h3 className="mt-3 font-serif text-[1.2rem] font-semibold">{b.head}</h3>
                <p className="mt-1.5 text-[0.86rem] text-ink-soft">{b.body}</p>
                <ul className="mt-3 flex flex-col gap-1.5 border-t border-line pt-3">
                  {b.dos.map((d) => (
                    <li key={d} className="flex gap-2 text-[0.83rem] text-ink-soft">
                      <span className="text-crimson" aria-hidden>
                        →
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="pb-faq" className="page-shell scroll-mt-24 py-14">
        <div className="mx-auto max-w-[860px]">
          <h2 className="mb-6 text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
            Profile building, <em className="text-crimson-deep">honestly answered</em>
          </h2>
          {PB_FAQS.map((f) => (
            <details
              key={f.q}
              className="group mb-2.5 overflow-hidden rounded-xl border border-line bg-paper"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-[0.95rem] font-semibold group-open:border-b group-open:border-line [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  className="shrink-0 text-crimson transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="px-5 py-4 text-[0.88rem] text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CounsellorCard />

      <section className="page-shell pb-16">
        <div className="mx-auto flex max-w-[860px] flex-wrap items-center justify-center gap-3">
          <Link
            to="/finder"
            search={DEFAULT_SEARCH}
            className="rounded-full bg-crimson px-6 py-3 text-[0.88rem] font-bold text-paper no-underline hover:bg-crimson-deep"
          >
            Browse all 38 programs
          </Link>
          <Link
            to="/"
            className="rounded-full border-[1.5px] border-line bg-paper px-6 py-3 text-[0.88rem] font-semibold text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
          >
            Back to home
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
