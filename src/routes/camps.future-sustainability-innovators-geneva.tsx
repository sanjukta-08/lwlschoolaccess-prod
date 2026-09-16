import { createFileRoute } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import { campBySlug } from "@/lib/camps";
import { LegacyCampPage } from "@/components/camps/LegacyCampPage";
import { pageHtml } from "@/content/geneva/content";
import pageCss from "@/content/geneva/scoped.css?raw";

const SLUG = "future-sustainability-innovators-geneva";
const TITLE = "Future Sustainability Innovators Programme — Geneva";
const DESC = "A seven-day sustainability, innovation and global institutions camp in Geneva for students aged 13–17.";
const APPLY = "https://apply.learnwithleaders.com/apply/geneva-camp";
const CAROUSELS = [
  { selector: "#network", mobile: 1, tablet: 2, desktop: 4, interval: 3500 },
  { selector: "#experiences", mobile: 1, tablet: 2, desktop: 3 },
  { selector: "#activities", mobile: 1, tablet: 2, desktop: 5, interval: 3500 },
  { selector: "#global", mobile: 2, tablet: 4, desktop: 6, interval: 2200 },
  { selector: "#instructors", mobile: 1, tablet: 2, desktop: 3 },
  { selector: "#supports", mobile: 1, tablet: 2, desktop: 4 },
] as const;

export const Route = createFileRoute("/camps/future-sustainability-innovators-geneva")({
  staticData: { sitemap: true },
  loader: async ({ context }) => { await ensureCatalogue(context.queryClient); return null; },
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESC },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
      { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://lwlschoolaccess.com/camps/future-sustainability-innovators-geneva" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" },
    ],
  }),
  component: GenevaCampPage,
});

function GenevaCampPage() {
  const applyUrl = campBySlug(SLUG)?.applyUrl ?? APPLY;
  return <LegacyCampPage className="geneva-page" html={pageHtml} css={pageCss} applyUrl={applyUrl} carousels={[...CAROUSELS]} />;
}
