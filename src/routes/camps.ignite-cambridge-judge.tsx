import { createFileRoute } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import { campBySlug } from "@/lib/camps";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import HeroSection from "@/components/camps/ignite-full/HeroSection";
import StatsGallery from "@/components/camps/ignite-full/StatsGallery";
import AboutSection from "@/components/camps/ignite-full/AboutSection";
import ObjectivesSection from "@/components/camps/ignite-full/ObjectivesSection";
import SummerSchoolDetails from "@/components/camps/ignite-full/SummerSchoolDetails";
import ScheduleSection from "@/components/camps/ignite-full/ScheduleSection";
import AccommodationSection from "@/components/camps/ignite-full/AccommodationSection";
import ActivitiesSection from "@/components/camps/ignite-full/ActivitiesSection";
import FacultySection from "@/components/camps/ignite-full/FacultySection";
import GlimpsesSection from "@/components/camps/ignite-full/GlimpsesSection";
import TestimonialsSection from "@/components/camps/ignite-full/TestimonialsSection";
import TermsSection from "@/components/camps/ignite-full/TermsSection";
import FAQSection from "@/components/camps/ignite-full/FAQSection";

const SLUG = "ignite-cambridge-judge";
const APPLY = "https://apply.learnwithleaders.com/apply/cambridge-ignite";
const TITLE = "IGNITE Young Minds at Cambridge Judge | Learn with Leaders";
const DESC =
  "A seven-day residential entrepreneurship program at Cambridge Judge Entrepreneurship Centre for students aged 15–18.";

export const Route = createFileRoute("/camps/ignite-cambridge-judge")({
  staticData: { sitemap: true },
  loader: async ({ context }) => {
    await ensureCatalogue(context.queryClient);
    return null;
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://lwlschoolaccess.com/camps/ignite-cambridge-judge" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Source+Sans+3:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: IgnitePage,
});

function IgnitePage() {
  const applyUrl = campBySlug(SLUG)?.applyUrl ?? APPLY;
  return (
    <div className="ignite-gateway min-h-dvh bg-background [--font-display:'Bricolage_Grotesque_Variable',sans-serif] [--font-body:'Source_Sans_3',sans-serif] [&_.font-display]:[font-family:var(--font-display)] [&_.font-body]:[font-family:var(--font-body)]">
      <SiteHeader />
      <HeroSection applyUrl={applyUrl} />
      <StatsGallery />
      <AboutSection />
      <ObjectivesSection />
      <SummerSchoolDetails applyUrl={applyUrl} />
      <ScheduleSection />
      <AccommodationSection />
      <ActivitiesSection />
      <FacultySection />
      <GlimpsesSection />
      <TestimonialsSection />
      <TermsSection />
      <FAQSection />
      <SiteFooter />
    </div>
  );
}
