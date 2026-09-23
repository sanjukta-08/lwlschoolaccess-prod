import { Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Check, Download, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { kingsWwwAssets, sharedFacts, type KingsProgram } from "./kings-data";

function LogoLockup() {
  return (
    <div className="inline-flex items-stretch overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex h-20 w-24 items-center justify-center px-4 sm:h-24 sm:w-28"><img src={kingsWwwAssets.kingsLogo} alt="Kings’ School Al Barsha" className="h-14 w-auto object-contain sm:h-16" /></div>
      <span className="my-4 w-px bg-border" aria-hidden="true" />
      <div className="flex h-20 items-center justify-center px-4 sm:h-24 sm:px-6"><img src={kingsWwwAssets.hpairLogo} alt="HPAIR" className="h-10 w-auto max-w-[190px] object-contain sm:h-12 sm:max-w-[250px]" /></div>
    </div>
  );
}

export default function KingsWWWProgramDetail({ program }: { program: KingsProgram }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 md:px-8">
          <Link to="/week-without-walls/kings" className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em]"><ArrowLeft className="h-4 w-4" /> All programs</Link>
          <Link to="/week-without-walls/kings" className="flex flex-col leading-none text-right select-none">
            <span className="font-display text-lg font-black uppercase tracking-[0.2em] text-primary sm:text-xl md:text-2xl">Onward</span>
            <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-[10px]">Week Without Walls</span>
          </Link>
        </div>
      </nav>

      <header className="relative flex min-h-[82svh] items-center overflow-hidden pt-16 text-center md:pt-20">
        <img src={program.image} alt={`${program.title} learning experience`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/35 to-foreground/30" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 text-background sm:px-6 md:px-8">
          <LogoLockup />
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">{program.eyebrow}</p>
          <h1 className="mx-auto mt-4 max-w-5xl font-display text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">{program.title}</h1>
          <p className="mt-4 font-display text-xl font-bold text-primary sm:text-2xl">{program.tagline}</p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-background/85 sm:text-lg">{program.description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-none font-bold uppercase tracking-[0.08em]"><a href="#curriculum">Explore curriculum</a></Button>
            <Button asChild size="lg" variant="secondary" className="rounded-none font-bold uppercase tracking-[0.08em]"><a href={program.brochure} target="_blank" rel="noopener noreferrer">View brochure <Download /></a></Button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-border px-4 py-10 sm:px-6 sm:py-14 md:px-8">
          <div className="mx-auto grid max-w-7xl border-2 border-foreground/30 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CalendarDays, label: "Dates", value: sharedFacts.dates },
              { icon: MapPin, label: "Location", value: sharedFacts.location },
              { icon: Users, label: "Eligibility", value: program.years },
              { icon: CalendarDays, label: "Duration", value: program.duration },
            ].map(({ icon: Icon, label, value }, index) => (
              <div key={label} className={`p-6 ${index < 3 ? "border-b border-foreground/25 lg:border-b-0 lg:border-r" : ""} ${index === 0 ? "sm:border-r" : ""} ${index === 1 ? "sm:border-r-0 lg:border-r" : ""} ${index === 2 ? "sm:border-r" : ""}`}>
                <Icon className="mb-4 h-6 w-6 text-primary" />
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                <p className="mt-2 font-display text-lg font-bold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 px-4 py-12 sm:px-6 sm:py-16 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">What students create</p>
              <h2 className="font-display text-3xl font-extrabold sm:text-5xl">A week measured by what students can show.</h2>
            </div>
            <div className="grid border-2 border-foreground/30 sm:grid-cols-2">
              {program.outcomes.map((outcome, index) => (
                <div key={outcome} className={`bg-background p-6 ${index % 2 === 0 ? "border-r border-foreground/25" : ""} ${index < 2 ? "border-b border-foreground/25" : ""}`}>
                  <Check className="mb-4 h-5 w-5 text-primary" />
                  <p className="text-sm font-medium leading-relaxed sm:text-base">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="curriculum" className="scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Program structure</p>
              <h2 className="font-display text-3xl font-extrabold sm:text-5xl">The five-day curriculum.</h2>
            </div>
            <div className="border-t-2 border-foreground/30">
              {program.curriculum.map((item) => (
                <article key={item.day} className="grid gap-5 border-b border-foreground/30 py-8 md:grid-cols-[0.3fr_0.7fr_1.45fr_0.9fr] md:gap-8">
                  <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{item.day}</p><p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{item.focus}</p></div>
                  <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">{item.title}</h3>
                  <ul className="space-y-2.5">{item.activities.map((activity) => <li key={activity} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{activity}</span></li>)}</ul>
                  <div className="border-l-2 border-primary bg-muted/50 p-4"><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Leaves with</p><p className="mt-2 text-sm font-medium leading-relaxed">{item.outcome}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {program.extendedTitle && (
          <section className="bg-primary px-4 py-12 text-primary-foreground sm:px-6 sm:py-16 md:px-8">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/75">Beyond the core schedule</p><h2 className="font-display text-3xl font-extrabold sm:text-5xl">{program.extendedTitle}</h2><p className="mt-5 max-w-2xl leading-relaxed text-primary-foreground/85">{program.extendedDescription}</p></div>
              <div className="border border-primary-foreground/45">{program.extendedItems?.map((item, index) => <div key={item} className={`flex gap-4 p-5 ${index ? "border-t border-primary-foreground/35" : ""}`}><span className="font-display text-lg font-bold">{String(index + 1).padStart(2, "0")}</span><p className="text-sm font-medium leading-relaxed">{item}</p></div>)}</div>
            </div>
          </section>
        )}

        <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-8">
          <div className="mx-auto grid max-w-7xl border-2 border-foreground/30 lg:grid-cols-[1fr_0.7fr]">
            <div className="p-7 sm:p-10"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Mentorship</p><h2 className="font-display text-3xl font-extrabold sm:text-4xl">{program.mentorTitle}</h2><p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{program.mentorDescription}</p></div>
            <div className="border-t border-foreground/30 bg-muted/50 p-7 sm:p-10 lg:border-l lg:border-t-0"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Program details</p><p className="mt-3 font-display text-2xl font-bold text-primary">{sharedFacts.fee}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{program.recognition}</p><Button asChild className="mt-6 rounded-none font-bold uppercase tracking-[0.08em]"><a href={program.brochure} target="_blank" rel="noopener noreferrer">View full brochure <Download /></a></Button></div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-foreground px-4 py-10 text-background sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left"><div className="flex flex-col leading-none select-none"><span className="font-display text-2xl font-black uppercase tracking-[0.2em] text-primary md:text-3xl">Onward</span><span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-background/60">Week Without Walls</span></div><Link to="/week-without-walls/kings" className="text-sm font-bold uppercase tracking-[0.1em]">Explore all five programs</Link></div>
      </footer>
    </div>
  );
}
