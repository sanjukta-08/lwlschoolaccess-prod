import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CalendarDays,
  Check,
  Download,
  Menu,
  Presentation,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  kingsFaqs,
  kingsPrograms,
  kingsWwwAssets,
  matchesFilter,
  type KingsProgram,
  type YearFilterValue,
} from "./kings-data";

const filterGroups: { key: YearFilterValue; label: string }[] = [
  { key: "all", label: "All years" },
  { key: "junior", label: "Years 7–9" },
  { key: "senior", label: "Years 10–13" },
];

function CompactYearFilter({
  filter,
  onChange,
}: {
  filter: YearFilterValue;
  onChange: (value: YearFilterValue) => void;
}) {
  return (
    <Select value={String(filter)} onValueChange={(value) => onChange(value as YearFilterValue)}>
      <SelectTrigger className="h-9 w-[150px] rounded-none border-foreground/30 bg-background px-3 text-xs font-bold uppercase tracking-[0.08em] shadow-none">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent align="end" className="rounded-none">
        {filterGroups.map((item) => (
          <SelectItem key={item.key} value={String(item.key)} className="rounded-none text-xs font-semibold uppercase tracking-[0.08em]">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Programs", href: "#programs" },
  { label: "Experience", href: "#experience" },
  { label: "FAQ", href: "#faq" },
];

function KingsNavbar() {
  const [open, setOpen] = useState(false);
  const goTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 md:px-8">
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-left leading-none select-none">
          <img src={kingsWwwAssets.lwlLogo} alt="Learn with Leaders" className="h-9 w-auto object-contain md:h-11" />
          <span className="font-display text-sm font-black uppercase tracking-[0.16em] text-primary sm:text-base md:text-lg">Week Without Walls</span>
        </button>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" size="sm" className="rounded-none px-1 text-xs font-semibold uppercase tracking-[0.12em]" onClick={() => goTo(link.href)}>
              {link.label}
            </Button>
          ))}
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((current) => !current)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" className="w-full justify-start rounded-none" onClick={() => goTo(link.href)}>
              {link.label}
            </Button>
          ))}
        </div>
      )}
    </nav>
  );
}

function ProgrammeCard({ programme }: { programme: KingsProgram }) {
  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden border border-foreground/30 bg-card"
    >
      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative min-h-64 overflow-hidden lg:min-h-full">
          <img src={programme.image} alt={`${programme.title} students collaborating`} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/35" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-background">
            <span className="font-display text-5xl font-bold">{programme.number}</span>
            <span className="border border-background/60 bg-foreground/35 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] backdrop-blur-sm">
              {programme.years}
            </span>
          </div>
        </div>
        <div className="p-6 sm:p-8 lg:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">{programme.partner}</p>
          <h3 className="mb-4 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{programme.title}</h3>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">{programme.summary}</p>
          <div className="mb-6 border-l-2 border-primary bg-muted/60 px-5 py-4">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Student outcome</p>
            <p className="text-sm font-medium leading-relaxed">{programme.outcome}</p>
          </div>
          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value="journey" className="border-y border-border">
              <AccordionTrigger className="font-display text-base font-bold hover:no-underline">Explore the five-day journey</AccordionTrigger>
              <AccordionContent>
                <ol className="space-y-2.5 pt-1">
                  {programme.cardSchedule.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                {programme.detail && <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">{programme.detail}</p>}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Program Fee</p>
              <p className="font-display text-xl font-bold">USD 650 <span className="font-body text-sm font-normal text-muted-foreground">per student</span></p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="outline" className="rounded-none font-bold uppercase tracking-[0.1em]">
                <Link to="/week-without-walls/kings/$programSlug" params={{ programSlug: programme.slug }}>View details</Link>
              </Button>
              <Button asChild className="rounded-none font-bold uppercase tracking-[0.1em]">
                <a href={programme.brochure} target="_blank" rel="noopener noreferrer">
                  View brochure <Download />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function KingsWeekWithoutWalls() {
  const [filter, setFilter] = useState<YearFilterValue>("all");
  const visible = kingsPrograms.filter((programme) => matchesFilter(programme, filter));
  const senior = visible.filter((programme) => programme.years === "Years 10–13");
  const junior = visible.filter((programme) => programme.years === "Years 7–9");

  return (
    <div className="kings-www min-h-screen bg-background text-foreground">
      <KingsNavbar />

      <header className="relative flex min-h-[88svh] items-start overflow-hidden pt-20 text-center">
        <img src={kingsWwwAssets.heroImage} alt="Students taking part in a collaborative Week Without Walls experience" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-[90rem] px-4 pb-12 pt-16 text-background sm:px-6 sm:pb-16 sm:pt-20 md:px-8 lg:pt-24">
          <div className="mb-5 inline-flex items-stretch overflow-hidden rounded-lg border border-border bg-background">
            <div className="flex h-24 w-28 items-center justify-center px-5 sm:h-28 sm:w-32">
              <img src={kingsWwwAssets.kingsLogo} alt="Kings’ School Al Barsha" className="h-16 w-auto object-contain sm:h-20" />
            </div>
            <span className="my-5 w-px bg-border" aria-hidden="true" />
            <div className="flex h-24 items-center justify-center px-5 sm:h-28 sm:px-7">
              <img src={kingsWwwAssets.hpairLogo} alt="HPAIR" className="h-16 w-auto max-w-[230px] object-contain sm:h-20 sm:max-w-[300px]" />
            </div>
          </div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary-on-dark sm:text-sm">Kings’ School Al Barsha · 1–5 February 2027</p>
          <h1 className="mx-auto max-w-[82rem] font-display text-4xl font-extrabold leading-[0.98] sm:text-6xl md:text-7xl xl:text-8xl">
            <span className="block whitespace-nowrap">A Week Without Walls.</span>
            <span className="mt-2 block font-semibold text-background">Five paths into the real world.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-background/80 sm:text-lg">
            Five days of ambitious, hands-on work in enterprise, finance, social impact, leadership and communication, designed for Kings’ students in Years 7–13.
          </p>
        </div>
      </header>

      <main>
        <section id="overview" className="border-b border-border px-4 py-10 sm:px-6 sm:py-14 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">The experience</p>
              <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-5xl">Learning leaves the classroom.</h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Students work in teams on live briefs, make consequential decisions and present something they have created. Each program combines expert guidance, practical tools and a public outcome.
              </p>
              <div className="mt-8 grid grid-cols-2 border-2 border-foreground/35 sm:grid-cols-4">
                {[
                  ["5", "Campus days"],
                  ["5", "Programs"],
                  ["7–13", "Year groups"],
                  ["1:20", "Mentor ratio"],
                ].map(([value, label], index) => (
                  <div key={label} className={`p-5 ${index % 2 === 0 ? "border-r border-foreground/35" : ""} ${index < 2 ? "border-b border-foreground/35 sm:border-b-0" : ""} ${index === 1 ? "sm:border-r sm:border-foreground/35" : ""} ${index === 2 ? "sm:border-r sm:border-foreground/35" : ""}`}>
                    <div className="font-display text-2xl font-bold text-primary sm:text-3xl">{value}</div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="programs" className="bg-muted/40 px-4 py-10 sm:px-6 sm:py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-4xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">Choose a program</p>
              <h2 className="font-display text-3xl font-extrabold sm:text-5xl">Five programs. Two age groups. One extraordinary week.</h2>
            </div>

            {visible.length === 0 && (
              <div>
                <div className="mb-6 flex items-center justify-between gap-4 border-b border-foreground pb-4">
                  <span className="font-display text-2xl font-extrabold sm:text-3xl">Programs</span>
                  <CompactYearFilter filter={filter} onChange={setFilter} />
                </div>
                <p className="border border-border bg-background p-10 text-center text-sm text-muted-foreground">
                  No programs match this selection.
                </p>
              </div>
            )}

            {senior.length > 0 && (
              <div className={junior.length > 0 ? "mb-16" : ""}>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-foreground pb-4">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-2xl font-extrabold sm:text-3xl">Years 10–13</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {senior.length} {senior.length === 1 ? "program" : "programs"}
                    </span>
                  </div>
                  <CompactYearFilter filter={filter} onChange={setFilter} />
                </div>
                <div className="space-y-6">
                  {senior.map((programme) => <ProgrammeCard key={programme.title} programme={programme} />)}
                </div>
              </div>
            )}

            {junior.length > 0 && (
              <div>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-foreground pb-4">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-2xl font-extrabold sm:text-3xl">Years 7–9</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {junior.length} {junior.length === 1 ? "program" : "programs"}
                    </span>
                  </div>
                  {senior.length === 0 && <CompactYearFilter filter={filter} onChange={setFilter} />}
                </div>
                <div className="space-y-6">
                  {junior.map((programme) => <ProgrammeCard key={programme.title} programme={programme} />)}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="experience" className="bg-background px-4 py-10 sm:px-6 sm:py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="border-l-4 border-primary bg-muted/50 p-7 sm:p-9">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">Built for action</p>
                <h2 className="font-display text-3xl font-extrabold sm:text-5xl">A clear rhythm from curiosity to presentation.</h2>
              </div>
              <div className="grid border-2 border-foreground/35 sm:grid-cols-2">
                {[
                  { icon: BookOpen, title: "Investigate", text: "Frame a real problem and examine the evidence behind it." },
                  { icon: Users, title: "Collaborate", text: "Work in teams with structured guidance and purposeful roles." },
                  { icon: Sparkles, title: "Create", text: "Build a prototype, portfolio, proposal or performance." },
                  { icon: Presentation, title: "Present", text: "Defend decisions and communicate the final outcome clearly." },
                ].map(({ icon: Icon, title, text }, index) => (
                  <div key={title} className={`bg-background p-7 sm:p-8 ${index % 2 === 0 ? "border-r border-foreground/35" : ""} ${index < 2 ? "border-b border-foreground/35" : ""}`}>
                    <Icon className="mb-5 h-7 w-7 text-primary" />
                    <h3 className="mb-2 font-display text-xl font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 grid border-2 border-primary bg-primary text-primary-foreground md:grid-cols-3">
              {[
                { icon: CalendarDays, title: "1–5 February 2027", text: "Five intensive days on campus at Kings’ School Al Barsha." },
                { icon: Award, title: "Tangible recognition", text: "Program-specific certificates and outcomes students can continue developing." },
                { icon: Users, title: "Harvard student mentors", text: "A 1:20 mentor ratio supporting focused, small-group work." },
              ].map(({ icon: Icon, title, text }, index) => (
                <div key={title} className={`p-7 sm:p-8 ${index < 2 ? "border-b border-primary-foreground/35 md:border-b-0 md:border-r" : ""}`}>
                  <Icon className="mb-5 h-7 w-7 text-primary-foreground" />
                  <h3 className="mb-2 font-display text-lg font-bold">{title}</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/80">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-foreground px-4 py-10 text-background sm:px-6 sm:py-12 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Program details</p>
              <h2 className="font-display text-3xl font-extrabold sm:text-5xl">One week. Five ways to create something meaningful.</h2>
              <p className="mt-4 text-background/70">Program Fee: USD 650 per student · Kings’ School Al Barsha · 1–5 February 2027</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-20 items-center overflow-hidden rounded-lg bg-background px-5">
                <img src={kingsWwwAssets.hpairLogo} alt="HPAIR" className="h-11 w-auto max-w-[210px] object-contain" />
              </div>
              <div className="flex h-20 items-center justify-center overflow-hidden rounded-lg bg-background px-5">
                <img src={kingsWwwAssets.lwlLogo} alt="Learn with Leaders" className="h-12 w-auto object-contain" />
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-10 sm:px-6 sm:py-14 md:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">FAQ</p>
            <h2 className="mb-10 font-display text-3xl font-extrabold sm:text-5xl">The essential details.</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {kingsFaqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="border border-border px-5 sm:px-6">
                  <AccordionTrigger className="text-left font-display text-base font-bold hover:no-underline sm:text-lg">{faq.q}</AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="border-t border-background/10 bg-foreground px-4 py-10 text-background sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col items-center gap-2 leading-none select-none sm:items-start">
            <img src={kingsWwwAssets.lwlWhite} alt="Learn with Leaders" className="h-9 w-auto object-contain" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-background/60">Week Without Walls</span>
          </div>
          <p className="text-xs text-background/50">© 2027 Learn with Leaders · Week Without Walls at Kings’ School Al Barsha</p>
        </div>
      </footer>
    </div>
  );
}
