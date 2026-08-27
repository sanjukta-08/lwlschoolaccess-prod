import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { InternshipApplyForm } from "@/components/InternshipApplyForm";
import { SiteFooter } from "@/components/SiteFooter";
import { ROLE_BY_ID } from "@/lib/internships";

const TITLE = "Apply for an internship - Learn with Leaders";
const DESC =
  "Apply to join the Learn with Leaders competitions team. Tell us about yourself, pick a role, and send your application.";

export const Route = createFileRoute("/internships/apply")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://lwlschoolaccess.com/internships/apply" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://lwlschoolaccess.com/internships/apply" }],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const search = Route.useSearch() as { role?: string };
  const preselect = search.role && ROLE_BY_ID.has(search.role) ? search.role : undefined;

  return (
    <div className="min-h-screen bg-paper">
      <PageHero
        eyebrow="Apply now"
        title={
          <>
            Join the <em className="text-crimson-deep">competitions team</em>
          </>
        }
        subtitle="Tell us who you are, pick the role that fits you best, and share why you want to join. We read every application and reply within two business days."
      />

      <main className="page-shell pb-20">
        <div className="mx-auto max-w-[720px]">
          <InternshipApplyForm preselectRole={preselect} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
