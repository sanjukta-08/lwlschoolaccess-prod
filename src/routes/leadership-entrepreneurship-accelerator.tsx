import { createFileRoute } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import { DR_JOJO_PROGRAMME } from "@/lib/programmes";
import { LeadershipAcceleratorLanding } from "@/components/LeadershipAcceleratorLanding";

const TITLE = "Leadership & Entrepreneurship Accelerator Program by Dr. Jojo O'Driscoll-Kearney | Learn with Leaders";
const DESC = "4-day live Zoom leadership and entrepreneurship accelerator by Dr. Jojo O'Driscoll-Kearney for Mas Camarena School, Spain students (April 10, 11 & 17, 18). 3-hour sessions, business modeling, and venture pitching.";

export const Route = createFileRoute(
  "/leadership-entrepreneurship-accelerator"
)({
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
      { property: "og:url", content: "/leadership-entrepreneurship-accelerator" },
    ],
    links: [{ rel: "canonical", href: "/leadership-entrepreneurship-accelerator" }],
  }),
  component: LeadershipAcceleratorPage,
});

function LeadershipAcceleratorPage() {
  return <LeadershipAcceleratorLanding />;
}
