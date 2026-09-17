import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import { conferenceBySlug } from "@/lib/programme-slug";
import { conferenceDateLabel, conferenceImage, conferenceLocation } from "@/lib/conferences";
import { ImportedConferenceLanding } from "@/components/conferences/ImportedConferenceLanding";
import { GreeceConferenceLanding } from "@/components/conferences/GreeceConferenceLanding";
import { conferenceSlugOf } from "@/lib/programme-slug";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/conferences/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params, context }) => {
    await ensureCatalogue(context.queryClient);
    const conference = conferenceBySlug(params.slug);
    if (!conference) throw notFound();
    return { conference };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Conference not found | Learn with Leaders" }, { name: "robots", content: "noindex" }] };
    const { conference } = loaderData;
    const title = `${conference.name} | Learn with Leaders`;
    const description = `${conference.tag || conference.about} ${conferenceDateLabel(conference)} in ${conferenceLocation(conference)}.`.slice(0, 158);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EducationEvent",
        name: conference.name,
        description,
        ...(conference.cohorts[0] ? { startDate: conference.cohorts[0].d, endDate: conference.cohorts[0].end ?? conference.cohorts[0].d } : {}),
        location: { "@type": "Place", name: conferenceLocation(conference) },
        organizer: { "@type": "Organization", name: "Learn with Leaders" },
        image: conferenceImage(conference),
        url: conference.apply,
      }) }],
    };
  },
  notFoundComponent: ConferenceNotFound,
  component: ConferencePage,
});

function ConferencePage() {
  const { conference } = Route.useLoaderData();
  return conferenceSlugOf(conference) === "hwmun-greece"
    ? <GreeceConferenceLanding conference={conference} />
    : <ImportedConferenceLanding conference={conference} />;
}

function ConferenceNotFound() {
  return (
    <div className="min-h-dvh bg-paper">
      <SiteHeader />
      <main className="page-shell py-24 text-center">
        <h1 className="font-serif text-[2.4rem] font-semibold text-ink">Conference not found</h1>
        <p className="mt-3 text-ink-soft">This destination may have been renamed or removed from the live catalogue.</p>
        <Link to="/conferences" className="mt-7 inline-block bg-crimson px-7 py-3 text-paper no-underline">See all conferences</Link>
      </main>
      <SiteFooter />
    </div>
  );
}