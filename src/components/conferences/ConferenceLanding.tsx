import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check, Globe2, MapPin, Users } from "lucide-react";
import type { Programme } from "@/lib/programmes";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  conferenceDateLabel,
  conferenceGrades,
  conferenceImage,
  conferenceLocation,
  conferencePrice,
} from "@/lib/conferences";

const pillars = [
  {
    title: "Substantive debate",
    body: "Research international issues, negotiate across perspectives, and draft solutions with fellow delegates.",
    icon: Globe2,
  },
  {
    title: "Delegate experience",
    body: "Practise public speaking, diplomacy, teamwork, and leadership in a formal conference setting.",
    icon: Users,
  },
  {
    title: "Cultural exchange",
    body: "Meet students from different schools and countries while experiencing the host destination together.",
    icon: MapPin,
  },
];

export function ConferenceLanding({ conference }: { conference: Programme }) {
  const hasDates = conference.cohorts.length > 0;
  const facts = [
    { icon: CalendarDays, label: "Conference dates", value: conferenceDateLabel(conference) },
    { icon: MapPin, label: "Destination", value: conferenceLocation(conference) },
    { icon: Users, label: "Eligibility", value: conferenceGrades(conference) },
    { icon: Globe2, label: "Programme fee", value: conferencePrice(conference) },
  ];

  return (
    <div className="min-h-dvh bg-paper">
      <SiteHeader />
      <main>
        <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-ink">
          <img
            src={conferenceImage(conference)}
            alt={`${conference.name} delegates and host destination`}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
          <div className="page-shell relative z-10 w-full pb-14 pt-32 text-paper md:pb-20">
            <nav className="mono-label mb-6 flex items-center gap-2 text-paper/70">
              <Link to="/conferences" className="text-paper/70 no-underline hover:text-paper">
                Conferences
              </Link>
              <span aria-hidden>/</span>
              <span>{conferenceLocation(conference)}</span>
            </nav>
            <p className="mono-label text-gold-line">Harvard World Model United Nations</p>
            <h1 className="mt-4 max-w-[13ch] font-serif text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.95] font-semibold text-paper">
              {conference.name}
            </h1>
            <p className="mt-6 max-w-[46rem] text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-paper/85">
              {conference.tag || conference.about}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-sm bg-crimson px-7 text-paper hover:bg-crimson-deep"
              >
                <a href={conference.apply} target="_blank" rel="noopener">
                  {hasDates ? "Apply now" : "Register interest"}
                  <ArrowRight aria-hidden />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-sm border-paper/50 bg-paper/10 px-7 text-paper hover:bg-paper hover:text-ink"
              >
                <a href="#details">View conference details</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="details" className="border-b border-line bg-wash py-10">
          <div className="page-shell grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-paper p-5 md:p-7">
                <Icon className="h-5 w-5 text-crimson" aria-hidden />
                <p className="mono-label mt-4 text-ink-faint">{label}</p>
                <p className="mt-1 text-[0.95rem] font-semibold text-ink">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="page-shell grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mono-label text-crimson">The conference</p>
            <h2 className="mt-4 max-w-[12ch] font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight font-semibold text-ink">
              Diplomacy becomes something you do
            </h2>
          </div>
          <div>
            <p className="text-[1.05rem] leading-[1.8] text-ink-soft">
              {conference.about || conference.tag}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Committee research and preparation",
                "Formal debate and negotiation",
                "Resolution writing",
                "Cross-cultural collaboration",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-t border-line pt-3 text-[0.9rem] font-semibold text-ink"
                >
                  <Check className="h-4 w-4 flex-none text-gold" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-line bg-wash py-20">
          <div className="page-shell">
            <p className="mono-label text-crimson">What students experience</p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] font-semibold text-ink">
              Three dimensions of WorldMUN
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {pillars.map(({ title, body, icon: Icon }, index) => (
                <article key={title} className="border-t-2 border-gold bg-paper p-7 shadow-soft">
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-crimson" aria-hidden />
                    <span className="font-mono text-[0.72rem] text-ink-faint">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 font-serif text-[1.35rem] font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink py-20 text-paper">
          <div className="page-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mono-label text-gold-line">{conferenceLocation(conference)}</p>
              <h2 className="mt-3 max-w-[15ch] font-serif text-[clamp(2rem,4vw,3.4rem)] leading-tight font-semibold text-paper">
                Take your place at {conference.name}
              </h2>
              <p className="mt-4 text-paper/70">
                {conferenceDateLabel(conference)} · {conferenceGrades(conference)}
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-sm bg-crimson px-8 text-paper hover:bg-crimson-deep"
            >
              <a href={conference.apply} target="_blank" rel="noopener">
                {hasDates ? "Apply now" : "Register interest"}
                <ArrowRight aria-hidden />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
