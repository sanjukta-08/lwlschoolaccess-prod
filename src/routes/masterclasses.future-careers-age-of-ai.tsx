import { createFileRoute } from "@tanstack/react-router";
import { FutureCareersLanding } from "@/components/FutureCareersLanding";

const TITLE = "Future Careers in the Age of AI | Learn with Leaders";
const DESCRIPTION =
  "A free, 60-minute live online masterclass for Transition Year and senior-cycle students, led by Dr Jojo O'Driscoll-Kearney.";
const CANONICAL = "https://lwlschoolaccess.com/masterclasses/future-careers-age-of-ai";

export const Route = createFileRoute("/masterclasses/future-careers-age-of-ai")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: FutureCareersLanding,
});