import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { ProgrammeLanding } from "@/components/ProgrammeLanding";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { detailFor, programmeBySlug } from "@/lib/programme-detail";
import { TRACKS, TYPE_NAME, feeOf, fmtLong, isPast } from "@/lib/programmes";

export const Route = createFileRoute("/programmes/$slug")({
  loader: ({ params }) => {
    const p = programmeBySlug(params.slug);
    if (!p) throw notFound();
    return { name: p.name };
  },
  head: ({ params }) => {
    const p = programmeBySlug(params.slug);
    if (!p) {
      return {
        meta: [
          { title: "Programme not found — Learn with Leaders" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const d = detailFor(p);
    const kind = TYPE_NAME[p.type];
    const track = TRACKS[p.tracks[0]!].label;
    const next = p.cohorts.find((c) => !isPast(c.d)) ?? p.cohorts[0];
    const fee = feeOf(p, next);
    const title = `${p.name} — ${kind} for Grades ${p.g[0]}–${p.g[1]} | Learn with Leaders`;
    const description = `${p.tag} ${p.dur}. ${
      next ? `Next cohort ${fmtLong(next.d)}. ` : ""
    }From ${fee.e}.`.slice(0, 158);
    const url = `/programmes/${params.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: `${p.name} — ${kind} · ${track}` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: p.name,
            description: p.about,
            provider: {
              "@type": "Organization",
              name: "Learn with Leaders",
              url: "https://www.learnwithleaders.com/",
            },
            educationalLevel: `Grades ${p.g[0]}–${p.g[1]}`,
            teaches: d.skills,
            educationalCredentialAwarded: d.project.title,
            timeRequired: p.dur,
            url: p.site,
            hasCourseInstance: p.cohorts
              .filter((c) => !isPast(c.d))
              .map((c) => ({
                "@type": "CourseInstance",
                courseMode: "online",
                startDate: c.d,
                courseWorkload: p.dur,
              })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: d.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: ProgrammeNotFound,
  component: ProgrammePage,
});

function ProgrammePage() {
  const { slug } = Route.useParams();
  const p = programmeBySlug(slug);
  if (!p) return <ProgrammeNotFound />;
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <ProgrammeLanding programme={p} />
    </div>
  );
}

function ProgrammeNotFound() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[760px] px-5 py-24 text-center">
        <h1 className="font-serif text-[2rem] font-semibold">
          We couldn't find that programme
        </h1>
        <p className="mt-3 text-ink-soft">
          It may have been renamed or retired. Browse the full catalogue instead.
        </p>
        <Link
          to="/finder"
          search={DEFAULT_SEARCH}
          className="mt-7 inline-block rounded-full bg-crimson px-6 py-3 text-[0.9rem] font-bold text-paper no-underline"
        >
          Open the Programme Finder →
        </Link>
      </main>
    </div>
  );
}
