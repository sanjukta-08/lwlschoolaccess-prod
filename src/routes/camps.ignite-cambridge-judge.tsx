import { createFileRoute } from "@tanstack/react-router";
import { ensureCatalogue } from "@/lib/catalogue";
import { campBySlug } from "@/lib/camps";
import { IgniteHero } from "@/components/camps/ignite/IgniteHero";
import { IgniteProgrammeDetails } from "@/components/camps/ignite/IgniteProgrammeDetails";
import { IgniteAboutSection } from "@/components/camps/ignite/IgniteAboutSection";
import { IgniteLearningObjectives } from "@/components/camps/ignite/IgniteLearningObjectives";
import { IgniteProgrammeFormatSection } from "@/components/camps/ignite/IgniteProgrammeFormatSection";
import { IgniteScheduleSection } from "@/components/camps/ignite/IgniteScheduleSection";
import { IgniteActivitiesSection } from "@/components/camps/ignite/IgniteActivitiesSection";
import { IgniteAccommodationSection } from "@/components/camps/ignite/IgniteAccommodationSection";
import { IgniteTermsSection } from "@/components/camps/ignite/IgniteTermsSection";
import { IgniteOrganizationsSection } from "@/components/camps/ignite/IgniteOrganizationsSection";
import { IgniteContributorsSection } from "@/components/camps/ignite/IgniteContributorsSection";
import { IgniteGallerySection } from "@/components/camps/ignite/IgniteGallerySection";
import { IgniteAwardsSection } from "@/components/camps/ignite/IgniteAwardsSection";
import { IgniteCTASection } from "@/components/camps/ignite/IgniteCTASection";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CAMP_PAGE_FONT_LINKS } from "@/components/camps/shared/fonts";

const SLUG = "ignite-cambridge-judge";
const TITLE =
  "IGNITE Entrepreneurship Camp at Cambridge Judge Business School | Learn with Leaders";
const DESC =
  "A residential entrepreneurship camp at Cambridge Judge Business School for Grades 8-12: venture sprints, college mentors, city immersion and a final pitch showcase.";

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
    links: CAMP_PAGE_FONT_LINKS,
  }),
  component: IgnitePage,
});

function IgnitePage() {
  /** Applications live on the Application Portal / partner site, never here. */
  const openApply = () => {
    const url =
      campBySlug(SLUG)?.applyUrl ??
      "https://www.learnwithleaders.com/camps/cambridgesummercamp/";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="camp-ignite min-h-dvh bg-background">
      <SiteHeader />
      <IgniteHero onApplyClick={openApply} />
      <IgniteProgrammeDetails />
      <IgniteAboutSection />
      <IgniteLearningObjectives />
      <IgniteProgrammeFormatSection />
      <IgniteScheduleSection />
      <IgniteActivitiesSection />
      <IgniteAccommodationSection />
      <IgniteTermsSection />
      <IgniteOrganizationsSection />
      <IgniteContributorsSection />
      <IgniteGallerySection />
      <IgniteAwardsSection />
      <IgniteCTASection onApplyClick={openApply} />
      <SiteFooter />
    </div>
  );
}
