import { createFileRoute } from "@tanstack/react-router";

import { ApplyExperience, type ApplySearch } from "@/components/apply/ApplyExperience";

export const Route = createFileRoute("/apply/$formSlug")({
  validateSearch: (search: Record<string, unknown>): ApplySearch => ({
    program: typeof search.program === "string" ? search.program : undefined,
    cohort: typeof search.cohort === "string" ? search.cohort : undefined,
    ref: typeof search.ref === "string" ? search.ref : undefined,
    code: typeof search.code === "string" ? search.code : undefined,
  }),
  head: ({ params }) => {
    const label = params.formSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      meta: [
        { title: `Apply — ${label} | Learn with Leaders` },
        {
          name: "description",
          content: `Complete your application for ${label} with Learn with Leaders. Takes about five minutes and is reviewed by our admissions team.`,
        },
        { property: "og:title", content: `Apply — ${label} | Learn with Leaders` },
        {
          property: "og:description",
          content: `Start your ${label} application with Learn with Leaders.`,
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ApplyForm,
});

function ApplyForm() {
  const { formSlug } = Route.useParams();
  const search = Route.useSearch();
  return <ApplyExperience formSlug={formSlug} search={search} />;
}
