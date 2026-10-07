import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ensureCatalogue } from "@/lib/catalogue";
import { PROGRAMMES } from "@/lib/programmes";
import { conferenceLocation } from "@/lib/conferences";
import { ConferenceCard } from "@/components/conferences/ConferenceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import birdAsset from "@/assets/lwl-bird-black.webp.asset.json";
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
    <div className="min-h-dvh bg-paper">
      <SiteHeader />
      <section className="relative isolate flex min-h-[19rem] items-center justify-center overflow-hidden border-b border-line bg-paper px-5 pb-10 pt-8 sm:min-h-[21rem] sm:px-8 lg:pb-12 lg:pt-10">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[68%] select-none items-center overflow-hidden pl-8 sm:flex"
          aria-hidden
        >
          <span className="whitespace-nowrap font-display text-[clamp(5.5rem,12vw,11rem)] font-black uppercase leading-none text-crimson/[0.06]">
            Conferences
          </span>
        </div>
        <div
          className="pointer-events-none absolute right-10 top-1/2 z-[1] hidden w-[min(320px,21vw)] -translate-y-1/2 opacity-20 xl:block"
          aria-hidden
        >
          <img
            src={birdAsset.url}
            alt=""
            className="h-auto w-full object-contain object-right [mask-image:linear-gradient(to_left,black_55%,transparent_95%)]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-display text-5xl font-black leading-[0.98] text-ink sm:text-6xl xl:text-7xl">
            Explore Our <span className="text-crimson">Conferences</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Connecting the next generation of global leaders with world-class academic institutions
            and global peers.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#conference-catalog"
              className="mono-label bg-crimson px-8 py-4 text-paper no-underline shadow-soft transition-colors hover:bg-crimson-deep"
            >
              View all conferences
            </a>
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mono-label border border-line bg-paper px-8 py-4 text-ink no-underline shadow-soft transition-colors hover:border-gold-line hover:text-crimson"
            >
              Book a meeting
            </a>
          </div>
        </div>

        <div
          className="pointer-events-none absolute left-8 top-1/2 hidden h-32 w-1 -translate-y-1/2 bg-crimson/20 lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block"
          aria-hidden
        >
          <span className="mono-label text-crimson/35 [writing-mode:vertical-rl]">
            Learn with Leaders
          </span>
        </div>
      </section>

      {/* ---------- all conferences ---------- */}
      <section id="conference-catalog" className="page-shell scroll-mt-20 py-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="All conferences"
            align="left"
            sub="Search by conference name or destination. Every listing and date below comes from the live catalogue."
          >
            Choose your <em className="text-crimson-deep">destination</em>
          </SectionHeading>

          <div className="w-full shrink-0 sm:w-80 md:w-96">
            <p className="mb-2 text-sm text-ink-soft">
              Showing <span className="font-semibold text-ink">{filtered.length}</span> conferences
            </p>
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint"
                aria-hidden
              />
              <Input
                type="text"
                placeholder="Search conferences..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 rounded-2xl border-line bg-paper pl-12 pr-10 text-base text-ink shadow-soft placeholder:text-ink-faint focus:border-gold-line"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint transition-colors hover:text-crimson"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((conference) => (
                <ConferenceCard key={conference.id} conference={conference} />
              ))}
            </div>
          ) : conferences.length === 0 ? (
            <div className="flex justify-center py-12">
              <div className="max-w-lg rounded-2xl border border-gold-line bg-gold-soft px-8 py-10 text-center">
                <p className="text-base font-medium leading-relaxed text-ink-soft">
                  No conferences are live on the website at the moment, but exciting updates are on
                  the way. <span className="text-gold-deep">Stay tuned!</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft">
                <Search className="h-8 w-8 text-gold-deep" aria-hidden />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-ink">No conferences found</h3>
              <p className="mb-4 text-ink-soft">Try adjusting your search terms</p>
              <Button variant="outline" onClick={() => setSearch("")}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ---------- faqs ---------- */}
      <section className="border-t border-line bg-wash py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Good to know"
            sub="Answers to common questions from students and families."
          >
            Frequently asked <em className="text-crimson-deep">questions</em>
          </SectionHeading>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {conferenceFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-line">
                <AccordionTrigger className="text-left text-ink hover:text-crimson">
                  {faq.question}
                </AccordionTrigger>
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
