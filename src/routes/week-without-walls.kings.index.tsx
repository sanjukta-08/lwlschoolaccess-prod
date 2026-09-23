import { createFileRoute } from "@tanstack/react-router";

import KingsWeekWithoutWalls from "@/components/week-without-walls/KingsWeekWithoutWalls";
import { kingsFaqs } from "@/components/week-without-walls/kings-data";

const TITLE = "Week Without Walls | Kings’ School Al Barsha x Onward";
const DESC = "Five immersive programs for Kings’ School Al Barsha students in Years 7–13, delivered on campus from 1–5 February 2027 with HPAIR, FinLit AI and Onward.";

export const Route = createFileRoute("/week-without-walls/kings/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/week-without-walls/kings" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: kingsFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: KingsWeekWithoutWalls,
});
