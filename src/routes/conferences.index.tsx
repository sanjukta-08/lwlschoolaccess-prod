import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ensureCatalogue } from "@/lib/catalogue";
import { PROGRAMMES } from "@/lib/programmes";
import { conferenceLocation } from "@/lib/conferences";
import { ConferenceCard } from "@/components/conferences/ConferenceCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const TITLE = "Harvard WorldMUN Conferences | Learn with Leaders";
const DESC =
  "Explore live Harvard WorldMUN conference destinations, dates, eligibility, fees and application links with Learn with Leaders.";

const conferenceFaqs = [
  {
    question: "What types of programs does Learn with Leaders offer?",
    answer:
      "Learn with Leaders offers camps, conferences, certificate programs, competitions, fellowships, and AI-powered tools.",
  },
  {
    question: "Where are Learn with Leaders conferences held?",
    answer:
      "Conferences take place at host schools and venues across the globe, including Abu Dhabi, Bangkok, Cambodia, Dubai, Greece, India, Kazakhstan, and Vietnam, bringing students together for debate, diplomacy, and leadership.",
  },
  {
    question: "What age groups are Learn with Leaders conferences designed for?",
    answer:
      "Conferences are designed for students aged 13-18, covering middle school (grades 6-8) and high school (grades 9-12). Some conferences have specific grade requirements.",
  },
  {
    question: "Are scholarships available for Learn with Leaders conferences?",
    answer:
      "Yes, limited scholarships and early bird discounts are available for many programs. Contact team@learnwithleaders.com to discuss financial assistance options.",
  },
  {
    question: "How do I apply for a Learn with Leaders conference?",
    answer:
      "Browse our conferences, select the destination that matches your interests, and click 'Apply Now' on the conference page. Applications are reviewed on a rolling basis, so early application is encouraged.",
  },
];

export const Route = createFileRoute("/conferences/")({
  staticData: { sitemap: true },
  loader: async ({ context }) => {
    await ensureCatalogue(context.queryClient);
    return { conferences: PROGRAMMES.filter((p) => p.type === "conf") };
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConferencesHub,
});

function ConferencesHub() {
  const { conferences } = Route.useLoaderData();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const sorted = [...conferences].sort((a, b) =>
      (a.cohorts[0]?.d ?? "9999").localeCompare(b.cohorts[0]?.d ?? "9999"),
    );
    const q = search.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q) ||
        c.about.toLowerCase().includes(q) ||
        conferenceLocation(c).toLowerCase().includes(q),
    );
  }, [conferences, search]);

  const cities = new Set(conferences.map((c) => conferenceLocation(c))).size;

  return (
    <div className="min-h-dvh bg-[#fbfbf9]">
      <PageHero
        eyebrow="Harvard WorldMUN · Global conferences"
        title={
          <>
            Global ideas. Global <em className="text-crimson-deep">stages</em>
          </>
        }
        subtitle="Debate, diplomacy and leadership at host schools around the world. Dates, eligibility, fees and applications are always live from our conference calendar."
        pills={[
          { top: `${conferences.length} conferences`, sub: "Live now" },
          { top: `${cities} destinations`, sub: "Worldwide" },
          { top: "Grades 6-12", sub: "Ages 13-18" },
        ]}
      >
        <a
          href="#conference-catalog"
          className="mono-label bg-crimson px-7 py-3.5 text-paper no-underline shadow-soft transition-colors hover:bg-crimson-deep"
        >
          Explore all conferences
        </a>
      </PageHero>

      {/* ---------- all conferences ---------- */}
      <section id="conference-catalog" className="page-shell scroll-mt-20 py-16">
        <SectionHeading
          eyebrow="Every conference"
          align="left"
          sub="Search by destination or theme. Every date and fee below is read live from our catalogue."
        >
          Choose your <em className="text-crimson-deep">destination</em>
        </SectionHeading>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.85rem] text-ink-soft">
            Showing <span className="font-semibold text-ink">{filtered.length}</span> conferences
          </p>
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <Input
              type="text"
              placeholder="Search conferences..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-sm border-line bg-paper pl-11 pr-10 text-[0.9rem] text-ink shadow-soft placeholder:text-ink-faint"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint hover:text-crimson"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-8">
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((conference) => (
                <ConferenceCard key={conference.id} conference={conference} />
              ))}
            </div>
          ) : conferences.length === 0 ? (
            <div className="flex justify-center py-12">
              <div className="max-w-lg rounded-sm border border-gold-line bg-paper px-8 py-10 text-center shadow-soft">
                <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                  No conferences are live on the website at the moment, but exciting updates are on
                  the way. <span className="text-gold-deep">Stay tuned!</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold-line bg-paper">
                <Search className="h-6 w-6 text-gold-deep" />
              </div>
              <h3 className="mb-2 font-serif text-[1.15rem] font-medium text-ink">
                No conferences found
              </h3>
              <p className="mb-4 text-[0.88rem] text-ink-soft">Try adjusting your search terms</p>
              <Button variant="outline" onClick={() => setSearch("")}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ---------- faqs ---------- */}
      <section className="border-t border-line bg-paper py-16">
        <div className="page-shell max-w-3xl">
          <SectionHeading eyebrow="Questions" align="left">
            Frequently asked <em className="text-crimson-deep">questions</em>
          </SectionHeading>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {conferenceFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-line">
                <AccordionTrigger className="text-left text-ink">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-ink-soft">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <SiteFooter />
    </div>
  );

}
