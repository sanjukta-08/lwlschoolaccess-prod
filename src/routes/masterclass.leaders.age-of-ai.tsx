import { createFileRoute } from "@tanstack/react-router";
import { SchoolLeadersLanding } from "@/components/SchoolLeadersLanding";

const TITLE = "Leading a School in the Age of AI | Learn with Leaders";
const DESCRIPTION =
  "A free, one-hour live online masterclass for principals, deputy principals and senior leaders on the five AI decisions every school faces this year, led by Dr Jojo O'Driscoll-Kearney.";
const CANONICAL = "https://lwlschoolaccess.com/masterclass/leaders/age-of-ai";

export const Route = createFileRoute("/masterclass/leaders/age-of-ai")({
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
  component: SchoolLeadersLanding,
});
