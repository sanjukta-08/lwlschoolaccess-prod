import { canonicalUrl } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import Navbar from "@/components/camps/hcus-winter/Navbar";
import HeroSection from "@/components/camps/hcus-winter/HeroSection";
import StatsSection from "@/components/camps/hcus-winter/StatsSection";
import DiversitySection from "@/components/camps/hcus-winter/DiversitySection";
import AboutSection from "@/components/camps/hcus-winter/AboutSection";
import ProgramOverview from "@/components/camps/hcus-winter/ProgramOverview";
import ProgramDetails from "@/components/camps/hcus-winter/ProgramDetails";
import FeeInclusionsSection from "@/components/camps/hcus-winter/FeeInclusionsSection";
import ScheduleSection from "@/components/camps/hcus-winter/ScheduleSection";
import OutingsSection from "@/components/camps/hcus-winter/OutingsSection";
import HotelSection from "@/components/camps/hcus-winter/HotelSection";
import HCUSSection from "@/components/camps/hcus-winter/HCUSSection";
import TermsSection from "@/components/camps/hcus-winter/TermsSection";
import PastProfessorsSection from "@/components/camps/hcus-winter/PastProfessorsSection";
import ProgramMentorsSection from "@/components/camps/hcus-winter/ProgramMentorsSection";
import AwardsSection from "@/components/camps/hcus-winter/AwardsSection";
import TestimonialsSection from "@/components/camps/hcus-winter/TestimonialsSection";
import GallerySection from "@/components/camps/hcus-winter/GallerySection";
import ApplicationProcess from "@/components/camps/hcus-winter/ApplicationProcess";
import Footer from "@/components/camps/hcus-winter/Footer";
import { CAMP_PAGE_FONT_LINKS } from "@/components/camps/shared/fonts";

const TITLE = "HCUS Young Global Leaders Winter Camp at Harvard University | Learn with Leaders";
const DESC =
  "A residential winter leadership camp at Harvard University with the Harvard College Union Society, for Grades 8-12. January 2027 cohorts, fees, schedule and how to apply.";

export const Route = createFileRoute("/camps/hcus-young-global-leaders-winter")({
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
      { property: "og:url", content: canonicalUrl("/camps/hcus-young-global-leaders-winter") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/camps/hcus-young-global-leaders-winter") }, ...CAMP_PAGE_FONT_LINKS],
  }),
  component: HcusWinterCampPage,
});

function HcusWinterCampPage() {
  return (
    <div className="camp-hcus min-h-dvh bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <DiversitySection />
      <AboutSection />
      <ProgramOverview />
      <ProgramDetails />
      <FeeInclusionsSection />
      <ScheduleSection />
      <OutingsSection />
      <HotelSection />
      <HCUSSection />
      <TermsSection />
      <PastProfessorsSection />
      <ProgramMentorsSection />
      <AwardsSection />
      <TestimonialsSection />
      <GallerySection />
      <ApplicationProcess />
      <Footer />
    </div>
  );
}
