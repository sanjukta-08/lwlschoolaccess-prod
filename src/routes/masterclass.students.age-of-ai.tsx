import { canonicalUrl } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { FutureCareersLanding } from "@/components/FutureCareersLanding";

const TITLE = "Future Careers in the Age of AI | Learn with Leaders";
const DESCRIPTION =
  "A free, 60-minute live online masterclass for Transition Year and senior-cycle students, led by Dr Jojo O'Driscoll-Kearney.";

export const Route = createFileRoute("/masterclass/students/age-of-ai")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/masterclass/students/age-of-ai") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/masterclass/students/age-of-ai") }],
  }),
  component: FutureCareersLanding,
});
