import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ensureCatalogue } from "@/lib/catalogue";
import { PROGRAMMES } from "@/lib/programmes";
import { conferenceLocation } from "@/lib/conferences";
import { ConferenceCard } from "@/components/conferences/ConferenceCard";
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


  return (
    <div className="min-h-dvh bg-[#101010] text-white">
      <section className="relative overflow-hidden pb-4 pt-28 text-center md:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-12 select-none overflow-hidden">
          <p className="text-[120px] font-black uppercase leading-[0.85] text-[#C6A13A]/[0.12] md:text-[150px] xl:text-[180px]">Programs</p>
        </div>
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-6xl">
            Explore Our <span className="text-[#f1b537]">Programs</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/60">World-class experiences at the world's best universities</p>
        </div>
      </section>

      {/* ---------- all conferences ---------- */}
      <section id="conference-catalog" className="mx-auto max-w-[1600px] scroll-mt-20 px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Conferences</h2>
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            <Input
              type="text"
              placeholder="Search conferences..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 rounded-2xl border-white/15 bg-[#1a1a1a] pl-12 pr-10 text-base text-white shadow-sm placeholder:text-white/50 focus:border-[#f1b537]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="mb-6 text-white/60">Showing <span className="font-semibold text-white">{filtered.length}</span> programs</p>
        <div>
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((conference) => (
                <ConferenceCard key={conference.id} conference={conference} />
              ))}
            </div>
          ) : conferences.length === 0 ? (
            <div className="flex justify-center py-12">
              <div className="max-w-lg rounded-2xl border border-[#C6A13A]/30 bg-[#C6A13A]/[0.06] px-8 py-10 text-center">
                <p className="text-base font-medium leading-relaxed text-white/70">
                  No conferences are live on the website at the moment, but exciting updates are on
                  the way. <span className="text-[#C6A13A]">Stay tuned!</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f1b537]/10">
                  <Search className="h-8 w-8 text-[#f1b537]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                No conferences found
              </h3>
              <p className="mb-4 text-white/60">Try adjusting your search terms</p>
              <Button variant="outline" onClick={() => setSearch("")}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ---------- faqs ---------- */}
      <section className="bg-[#101010] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {conferenceFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left text-white">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-white/60">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <SiteFooter />
    </div>
  );

}
