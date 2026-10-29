import { canonicalUrl } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";

import KingsWeekWithoutWalls from "@/components/week-without-walls/KingsWeekWithoutWalls";
import { kingsFaqs } from "@/components/week-without-walls/kings-data";

const TITLE = "Week Without Walls | Kings’ School Al Barsha · Learn with Leaders";
const DESC =
  "Three immersive programs for Kings’ School Al Barsha students in Years 7–13, delivered on campus from 1–5 February 2027 by Learn with Leaders with HPAIR and FinLit AI.";

export const Route = createFileRoute("/week-without-walls/kings/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/week-without-walls/kings") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/week-without-walls/kings") }],
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
