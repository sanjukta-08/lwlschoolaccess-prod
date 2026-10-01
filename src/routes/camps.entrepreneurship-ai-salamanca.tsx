import { createFileRoute } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import { campBySlug } from "@/lib/camps";
import { LegacyCampPage } from "@/components/camps/LegacyCampPage";
import { pageHtml } from "@/content/salamanca/content";
import pageCss from "@/content/salamanca/scoped.css?raw";

const SLUG = "entrepreneurship-ai-salamanca";
const TITLE = "Entrepreneurship Powered by AI — Salamanca Camp";
const DESC = "A seven-day entrepreneurship and AI winter camp at the University of Salamanca, taught by NYU faculty for Grades 8–12.";
const APPLY = "https://apply.learnwithleaders.com/apply/salamanca-entrepreneurship-ai";

export const Route = createFileRoute("/camps/entrepreneurship-ai-salamanca")({
  staticData: { sitemap: true },
  loader: async ({ context }) => { await ensureCatalogue(context.queryClient); return null; },
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESC },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
      { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://lwlschoolaccess.com/camps/entrepreneurship-ai-salamanca" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Ramabhadra&display=swap" },
    ],
  }),
  component: SalamancaCampPage,
});

function SalamancaCampPage() {
  const applyUrl = campBySlug(SLUG)?.applyUrl ?? APPLY;
  return <LegacyCampPage className="salamanca-page" html={pageHtml} css={pageCss} applyUrl={applyUrl} />;
}
