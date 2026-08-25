import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FitQuiz } from "@/components/FitQuiz";
import { validateFitSearch } from "@/lib/fit";

export const Route = createFileRoute("/fit")({
  validateSearch: validateFitSearch,
  head: () => ({
    meta: [
      { title: "Find the right programme for your child — Learn with Leaders" },
      {
        name: "description",
        content:
          "Answer five short questions and get three programmes matched to your child's grade, interests, time and timezone — with the outcome each one ends in.",
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
      <div className="relative">
        <div className="hero-wash absolute inset-0" />
        <div className="relative">
          <SiteHeader />
          <section className="mx-auto max-w-[860px] px-5 pt-10 pb-6">
            <span className="mono-label mb-2 inline-flex items-center gap-2 text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Guided by AI · 2 minutes
            </span>
            <h1 className="font-serif text-[clamp(1.9rem,4.6vw,2.9rem)] leading-[1.1] font-medium tracking-tight">
              Not sure which one fits?{" "}
              <em className="text-crimson-deep">Answer five questions.</em>
            </h1>
            <p className="mt-3 max-w-[46em] text-[0.98rem] text-ink-soft">
              We read every upcoming cohort against your child's grade, interests, weekly time and
              your timezone — then show three honest matches, what each one ends in, and what to
              consider instead.
            </p>
          </section>
        </div>
      </div>

      <div className="mx-auto max-w-[860px] px-5 pb-16">
        <FitQuiz answers={search} />
      </div>

      <SiteFooter />
    </div>
  );
}
