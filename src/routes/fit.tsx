import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { FitQuiz } from "@/components/FitQuiz";
import { validateFitSearch } from "@/lib/fit";

export const Route = createFileRoute("/fit")({
  staticData: { sitemap: true },
  validateSearch: validateFitSearch,
  head: () => ({
    meta: [
      { title: "Find the right programme for your child - Learn with Leaders" },
      {
        name: "description",
        content:
          "Answer five short questions and get three programmes matched to your child's grade, interests, time and timezone - with the outcome each one ends in.",
      },
      { property: "og:title", content: "Find the right programme for your child" },
      {
        property: "og:description",
        content:
          "Five questions, three matched programmes, and the exact outcome each one ends in.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FitPage,
});

function FitPage() {
  const search = Route.useSearch();

  return (
    <div className="min-h-screen bg-wash">
      <PageHero
        eyebrow="Guided by AI · 2 minutes"
        title={
          <>
            Not sure which one fits?{" "}
            <em className="text-crimson-deep">Answer five questions.</em>
          </>
        }
        subtitle={
          <>
            We read every upcoming cohort against your child's grade, interests, weekly
            time and your timezone - then show three honest matches, what each one ends
            in, and what to consider instead.
          </>
        }
      />

      <div className="page-shell pb-16">
        <div className="mx-auto max-w-[900px]">
          <FitQuiz answers={search} />
        </div>
      </div>


      <SiteFooter />
    </div>
  );
}
