import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { GuidedFinder } from "@/components/GuidedFinder";

export const Route = createFileRoute("/explore")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Explore programmes by type - Learn with Leaders" },
      {
        name: "description",
        content:
          "A guided three-step flow: pick a programme type, a grade and a subject, and see every matching programme with its next start date and fee.",
      },
      { property: "og:title", content: "Explore programmes by type" },
      {
        property: "og:description",
        content:
          "Pick a programme type, a grade and a subject - see every matching programme in three steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  return (
    <div className="min-h-screen bg-wash">
      <PageHero
        eyebrow="Guided explorer · 3 steps"
        title={
          <>
            Start with the type.{" "}
            <em className="text-crimson-deep">We&apos;ll do the narrowing.</em>
          </>
        }
        subtitle={
          <>
            Camps, competitions, masterclasses, conferences and more - choose the kind of
            experience, tell us the grade and subject, and see every matching programme
            with its next start date.
          </>
        }
      />

      <div className="page-shell pb-16">
        <div className="mx-auto max-w-[900px]">
          <GuidedFinder />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
