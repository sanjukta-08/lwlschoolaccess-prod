import { canonicalUrl } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import { DR_JOJO_PROGRAMME } from "@/lib/programmes";
import { LeadershipAcceleratorLanding } from "@/components/LeadershipAcceleratorLanding";

const TITLE =
  "Pre-University Entrepreneurship & Venture Building Program by Dr. Jojo O'Driscoll-Kearney | Learn with Leaders";
const DESC =
  "4-day live Zoom Pre-University Entrepreneurship & Venture Building Program by Dr. Jojo O'Driscoll-Kearney for Mas Camarena School, Spain students (April 10, 11 & 17, 18). 3-hour sessions, business modeling, and venture pitching. Fee: EUR 350.";

export const Route = createFileRoute("/entrepreneurship-venturebuilding-program")({
  staticData: { sitemap: true },
  loader: async ({ context }) => {
    await ensureCatalogue(context.queryClient);
    return { name: DR_JOJO_PROGRAMME.name };
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: canonicalUrl("/entrepreneurship-venturebuilding-program") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/entrepreneurship-venturebuilding-program") }],
  }),
  component: LeadershipAcceleratorPage,
});

function LeadershipAcceleratorPage() {
  return <LeadershipAcceleratorLanding />;
}
