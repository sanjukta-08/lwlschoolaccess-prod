import { canonicalUrl } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import Navbar from "@/components/camps/hcus-summer/Navbar";
import HeroSection from "@/components/camps/hcus-summer/HeroSection";
import StatsSection from "@/components/camps/hcus-summer/StatsSection";
import DiversitySection from "@/components/camps/hcus-summer/DiversitySection";
import AboutSection from "@/components/camps/hcus-summer/AboutSection";
import ProgramOverview from "@/components/camps/hcus-summer/ProgramOverview";
import ProgramDetails from "@/components/camps/hcus-summer/ProgramDetails";
import FeeInclusionsSection from "@/components/camps/hcus-summer/FeeInclusionsSection";
import ScheduleSection from "@/components/camps/hcus-summer/ScheduleSection";
import OutingsSection from "@/components/camps/hcus-summer/OutingsSection";
import HotelSection from "@/components/camps/hcus-summer/HotelSection";
import HCUSSection from "@/components/camps/hcus-summer/HCUSSection";
import TermsSection from "@/components/camps/hcus-summer/TermsSection";
import PastProfessorsSection from "@/components/camps/hcus-summer/PastProfessorsSection";
import ProgramMentorsSection from "@/components/camps/hcus-summer/ProgramMentorsSection";
import AwardsSection from "@/components/camps/hcus-summer/AwardsSection";
import TestimonialsSection from "@/components/camps/hcus-summer/TestimonialsSection";
import GallerySection from "@/components/camps/hcus-summer/GallerySection";
import ApplicationProcess from "@/components/camps/hcus-summer/ApplicationProcess";
import FAQSection from "@/components/camps/hcus-summer/FAQSection";
import Footer from "@/components/camps/hcus-summer/Footer";
import { CAMP_PAGE_FONT_LINKS } from "@/components/camps/shared/fonts";

const TITLE = "HCUS Young Global Leaders Summer Camp at Harvard University | Learn with Leaders";
const DESC =
  "An immersive leadership summer camp at Harvard University with the Harvard College Union Society, for students in Grades 8-12. Dates, fees, schedule and how to apply.";

export const Route = createFileRoute("/camps/hcus-young-global-leaders-summer")({
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
      { property: "og:url", content: canonicalUrl("/camps/hcus-young-global-leaders-summer") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/camps/hcus-young-global-leaders-summer") }, ...CAMP_PAGE_FONT_LINKS],
  }),
  component: HcusSummerCampPage,
});

function HcusSummerCampPage() {
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
      <FAQSection />
      <Footer />
    </div>
  );
}
