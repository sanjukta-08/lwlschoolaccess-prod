import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import KingsWWWProgramDetail from "@/components/week-without-walls/KingsWWWProgramDetail";
import { kingsProgramsBySlug, sharedFacts } from "@/components/week-without-walls/kings-data";

export const Route = createFileRoute("/week-without-walls/kings/$programSlug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const program = kingsProgramsBySlug[params.programSlug];
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Program not found | Week Without Walls at Kings’ School Al Barsha" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { program } = loaderData;
    const title = `${program.title} | Week Without Walls at Kings’ School Al Barsha`;
    const description = `${program.description} ${sharedFacts.dates} at Kings’ School Al Barsha.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/week-without-walls/kings/${program.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: program.title,
            description,
            provider: { "@type": "Organization", name: "Learn with Leaders" },
            educationalLevel: program.years,
            locationCreated: sharedFacts.location,
          }),
        },
      ],
    };
  },
  notFoundComponent: ProgramNotFound,
  component: ProgramDetailRoute,
});

function ProgramDetailRoute() {
  const { program } = Route.useLoaderData();
  return <KingsWWWProgramDetail program={program} />;
}

function ProgramNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl font-extrabold">Program not found</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This Kings Week Without Walls program may have moved.
        </p>
        <Link
          to="/week-without-walls/kings"
          className="mt-6 inline-flex border border-border px-5 py-3 text-xs font-bold uppercase tracking-[0.12em]"
        >
          Explore all programs
        </Link>
      </div>
    </div>
  );
}
