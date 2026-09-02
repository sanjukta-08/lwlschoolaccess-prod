import { createFileRoute } from "@tanstack/react-router";

import { ApplyExperience, type ApplySearch } from "@/components/apply/ApplyExperience";

export const Route = createFileRoute("/apply/")({
  validateSearch: (search: Record<string, unknown>): ApplySearch => ({
    program: typeof search["program"] === "string" ? search["program"] : undefined,
    cohort: typeof search["cohort"] === "string" ? search["cohort"] : undefined,
    ref: typeof search["ref"] === "string" ? search["ref"] : undefined,
    code: typeof search["code"] === "string" ? search["code"] : undefined,
    form: typeof search["form"] === "string" ? search["form"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Apply — Learn with Leaders Programmes & Camps" },
      {
        name: "description",
        content:
          "Apply to Learn with Leaders certificate programmes, fellowships, competitions, conferences and residential camps. A short five-minute application, reviewed personally.",
      },
      { property: "og:title", content: "Apply — Learn with Leaders" },
      {
        property: "og:description",
        content:
          "Start your application to a Learn with Leaders programme, fellowship, competition or camp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplyIndex,
});

function ApplyIndex() {
  const search = Route.useSearch();
  return <ApplyExperience search={search} />;
}
