import { createFileRoute } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import { campBySlug } from "@/lib/camps";
import { LegacyCampPage } from "@/components/camps/LegacyCampPage";
import { pageHtml } from "@/content/prelaw/content";
import pageCss from "@/content/prelaw/scoped.css?raw";

const SLUG = "prelaw-horizons-harvard";
const TITLE = "Pre-Law Horizons Program at Harvard University | Learn with Leaders";
const DESC =
  "A residential pre-law camp on the Harvard campus with HUGEM, for Grades 9-12: legal reasoning, landmark cases, international law, ethics and a moot court finale. Dates, inclusions and how to apply.";
const APPLY = "https://apply.learnwithleaders.com/apply/pre-law-horizons";

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
    links: [
      { rel: "canonical", href: "https://lwlschoolaccess.com/camps/prelaw-horizons-harvard" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
      },
    ],
  }),
  component: PrelawHorizonsRoute,
});

function PrelawHorizonsRoute() {
  const applyUrl = campBySlug(SLUG)?.applyUrl ?? APPLY;
  return (
    <LegacyCampPage className="prelaw-page" html={pageHtml} css={pageCss} applyUrl={applyUrl} />
  );
}
