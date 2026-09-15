import { createFileRoute } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import { campBySlug } from "@/lib/camps";
import PrelawCampPage from "@/components/camps/prelaw/PrelawCampPage";
import { HORIZONS_FONT_LINKS } from "@/components/camps/shared/fonts";

const TITLE =
  "Pre-Law Horizons Program at Harvard University | Learn with Leaders";
const DESC =
  "A residential pre-law camp on the Harvard campus with HUGEM, for Grades 9-12: legal reasoning, landmark cases, international law, ethics and a moot court finale. Dates, inclusions and how to apply.";

export const Route = createFileRoute("/camps/prelaw-horizons-harvard")({
  staticData: { sitemap: true },
  loader: async ({ context }) => {
    await ensureCatalogue(context.queryClient);
    return null;
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: HORIZONS_FONT_LINKS,
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Pre-Law Horizons Program",
          description: DESC,
          provider: {
            "@type": "Organization",
            name: "Learn with Leaders",
            url: "https://www.learnwithleaders.com",
          },
          locationCreated: {
            "@type": "Place",
            name: "Harvard University, Cambridge, USA",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: (campBySlug("prelaw-horizons-harvard")?.faqs ?? []).map(
            (f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            }),
          ),
        }),
      },
    ],
  }),
  component: PrelawHorizonsRoute,
});

function PrelawHorizonsRoute() {
  return (
    <div className="camp-horizons min-h-dvh">
      <PrelawCampPage />
    </div>
  );
}
