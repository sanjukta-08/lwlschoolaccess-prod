import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Programme } from "@/lib/programmes";
import { conferenceDateLabel, conferenceGrades, conferenceLocation, conferencePrice } from "@/lib/conferences";
import { Link } from "@tanstack/react-router";
import {
  Users, CalendarDays, Clock, GraduationCap, Wallet, Award,
  ChevronLeft, ChevronRight, Globe, Users2, Network, Mic, Lightbulb, BadgeCheck,
} from "lucide-react";
import "@/hwmun-greece-imported.css";

import acsCampusAsset from "@/assets/conferences/source/hwmun-greece-acs-campus.jpg.asset.json";
import heroLwl3Asset from "@/assets/conferences/source/hwmun-greece-hero.jpg.asset.json";
import flagsAsset from "@/assets/conferences/source/hwmun-greece-flags.jpg.asset.json";
import unityAsset from "@/assets/conferences/source/hwmun-greece-unity-hands.jpg.asset.json";
import harvardLogoAsset from "@/assets/conferences/source/hwmun-greece-harvard-worldmun-logo.png.asset.json";
import acsLogoAsset from "@/assets/conferences/source/hwmun-greece-acs-athens-logo.png.asset.json";
import pillarSubstantiveAsset from "@/assets/conferences/source/hwmun-greece-pillar-substantive.jpg.asset.json";
import pillarCulturalAsset from "@/assets/conferences/source/hwmun-greece-pillar-cultural.jpg.asset.json";
import pillarDelegateAsset from "@/assets/conferences/source/hwmun-greece-pillar-delegate.jpg.asset.json";
import santoriniScheduleAsset from "@/assets/conferences/source/hwmun-greece-santorini-schedule.png.asset.json";
import committeeDisecAsset from "@/assets/conferences/source/hwmun-greece-committee-disec.jpg.asset.json";
import committeeEcofinAsset from "@/assets/conferences/source/hwmun-greece-committee-ecofin.jpg.asset.json";
import committeeSochumAsset from "@/assets/conferences/source/hwmun-greece-committee-sochum.jpg.asset.json";
import committeeSpecpolAsset from "@/assets/conferences/source/hwmun-greece-committee-specpol.jpg.asset.json";
import committeeCsocdAsset from "@/assets/conferences/source/hwmun-greece-committee-csocd.jpg.asset.json";
import committeeLegalAsset from "@/assets/conferences/source/hwmun-greece-committee-legal.jpg.asset.json";
import lwlLogoAsset from "@/assets/conferences/source/hwmun-greece-lwl-logo.webp.asset.json";

const acsCampus = acsCampusAsset.url;
const heroLwl3 = heroLwl3Asset.url;
const flags = flagsAsset.url;
const unity = unityAsset.url;
const harvardLogo = harvardLogoAsset.url;
const acsLogo = acsLogoAsset.url;
const pillarSubstantive = pillarSubstantiveAsset.url;
const pillarCultural = pillarCulturalAsset.url;
const pillarDelegate = pillarDelegateAsset.url;
const santoriniSchedule = santoriniScheduleAsset.url;
const committeeDisec = committeeDisecAsset.url;
const committeeEcofin = committeeEcofinAsset.url;
const committeeSochum = committeeSochumAsset.url;
const committeeSpecpol = committeeSpecpolAsset.url;
const committeeCsocd = committeeCsocdAsset.url;
const committeeLegal = committeeLegalAsset.url;
const lwlLogo = lwlLogoAsset.url;


function Nav({ apply }: { apply: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-background shadow-[var(--shadow-soft)] border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={harvardLogo} alt="Harvard WorldMUN" className="h-16 w-16 md:h-20 md:w-20 object-contain" />
        </div>
        <nav className="hidden md:flex items-center gap-10 text-[15px] text-foreground">
          <a href="#about" className="hover:text-primary transition">About</a>
          <a href="#details" className="hover:text-primary transition">Details</a>
          <a href="#benefits" className="hover:text-primary transition">Benefits</a>
          <a href="#schedule" className="hover:text-primary transition">Schedule</a>
          <a href="#committees" className="hover:text-primary transition">Committees</a>
        </nav>
        <a
          href={apply} target="_blank" rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-7 py-3 text-sm font-medium tracking-wide hover:bg-secondary/90 transition"
        >
          Apply Now
        </a>
      </div>
    </header>
  );
}

function Hero({ apply }: { apply: string }) {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <Nav apply={apply} />
      <div className="absolute inset-0">
        <img
          src={heroLwl3}
          alt="Harvard World Model United Nations Greece"
          className="absolute inset-0 h-full w-full object-contain md:object-cover object-right"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(250,248,245,0.96) 0%, rgba(250,248,245,0.85) 30%, rgba(250,248,245,0.25) 55%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 pl-8 md:pl-16 lg:pl-24 xl:pl-32 pr-6 pt-40 pb-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="font-serif text-secondary text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tight">
            Harvard World
            <br />
            <span className="text-secondary">Model United Nations</span>
          </h1>
          <div className="mt-8 h-[3px] w-20 bg-[hsl(var(--hwmun-gold))]" />
          <p className="mt-8 max-w-lg text-base md:text-lg text-black leading-relaxed font-light">
            A premier international relations simulation gathering over 2,000 delegates from
            more than 110 countries. Hosted in Athens — the birthplace of democracy.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={apply} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-secondary text-secondary-foreground rounded-full px-8 py-4 text-sm font-medium tracking-wide hover:bg-secondary/90 transition"
            >
              Apply Now <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 pl-8 md:pl-16 lg:pl-24 xl:pl-32 pr-6 md:pr-16 lg:pr-24 xl:pr-32 pb-10">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-sm shadow-[var(--shadow-soft)] py-6 px-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Hosted by</div>
          <img src={acsLogo} alt="ACS Athens" className="h-20 md:h-24 object-contain" />
        </div>
      </div>
    </section>
  );
}

function Hosted() {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <dl className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {[
            ["2,000+", "Global delegates"],
            ["110+", "Countries"],
            ["20", "UN committees"],
            ["3", "Days in Athens"],
          ].map(([n, l]) => (
            <div key={l} className="px-6 py-5 text-center md:text-left">
              <dt className="font-serif text-2xl md:text-3xl text-secondary-foreground">{n}</dt>
              <dd className="mt-1 text-[10px] tracking-[0.22em] uppercase text-white/70">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 grid md:grid-cols-12 gap-12 md:gap-20 items-start">
        <div className="md:col-span-5">
          <div className="eyebrow text-base md:text-lg">
            <span className="rule mr-3" /> About the Conference
          </div>
          <h2 className="mt-6 font-serif text-secondary text-4xl md:text-5xl leading-[1.05] tracking-tight">
            It's more than a conference.
            <br />
            <em className="text-primary italic">It's a global movement.</em>
          </h2>
        </div>
        <div className="md:col-span-7 space-y-6 text-[19px] md:text-xl leading-relaxed text-foreground/85 font-light">
          <p>
            <strong className="font-medium text-foreground">Harvard World Model United Nations Greece</strong>{" "}
            is a premier international relations simulation designed to inspire and empower
            students to become global leaders. Organized annually by Harvard University students
            in partnership with a local host team, the conference gathers over 2,000 delegates
            from more than 110 countries.
          </p>
          <p>
            This program offers a unique blend of high-level debate, cultural immersion, and
            social engagement — creating an environment where diverse perspectives are not only
            heard, but celebrated.
          </p>
          <p>
            Recognized for its academic rigor and vibrant international community,{" "}
            <strong className="font-medium text-foreground">WorldMUN</strong> is more than just a
            Model UN — it's a life-changing experience that fosters empathy, understanding, and a
            commitment to global cooperation.
          </p>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    {
      title: "Substantive Excellence",
      body: "Twenty simulated UN committees representing member states, international organizations, and NGOs — led by an engaged dais on the world's most pressing challenges.",
      points: ["20 UN-style committees", "Expert dais leadership"],
      img: pillarSubstantive,
    },
    {
      title: "Cultural Connection",
      body: "The 'WorldMUN Spirit' — a guiding principle that encourages friendship and cooperation across borders, and a deeper understanding of perspectives beyond one's own.",
      points: ["Cross-border friendships", "Global Village experience"],
      img: pillarCultural,
    },
    {
      title: "Delegate Experience",
      body: "From dynamic debates and diplomacy in committee to meaningful connections with peers worldwide, the conference offers an unforgettable and enriching journey.",
      points: ["Diplomacy in action", "Lifelong peer network"],
      img: pillarDelegate,
    },
  ];
  return (
    <section className="bg-secondary text-secondary-foreground py-16 md:py-20">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="flex items-center gap-3 text-white/80 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase whitespace-nowrap">
                <span className="rule" />
                The WorldMUN Experience
              </div>
              <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] text-white tracking-tight">
                The Three <em className="not-italic italic font-light text-white/80">Pillars</em>
              </h2>
              <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-sm font-light">
                An unforgettable diplomatic journey, built on three foundational
                principles that shape every delegate's experience.
              </p>
              <div className="hidden lg:block pt-6">
                <div className="h-[3px] w-20 bg-white/40" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-8 lg:space-y-10">
            {items.map((it, idx) => (
              <article key={it.title} className="group border-t border-white/20 pt-6">
                <div className="grid md:grid-cols-12 gap-4 md:gap-5 items-center">
                  <div className="md:col-span-5 overflow-hidden rounded-sm">
                    <img
                      src={it.img}
                      alt={it.title}
                      className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-7 space-y-3">
                    <span className="font-serif text-2xl text-white/60">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-3xl lg:text-4xl leading-[1.1] text-white">
                      {it.title}
                    </h3>
                    <p className="text-white/85 text-lg leading-relaxed font-light">{it.body}</p>
                    <ul className="space-y-2 pt-1">
                      {it.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 text-white/75 text-sm">
                          <span className="h-1 w-1 bg-white/60 rounded-full" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Details({ conference }: { conference: Programme }) {
  const items = [
    { icon: Users, label: "In-person at", value: conferenceLocation(conference) },
    { icon: Wallet, label: "Conference Fee", value: conferencePrice(conference) },
    { icon: CalendarDays, label: "Conference Dates", value: conferenceDateLabel(conference) },
    { icon: Clock, label: "Duration", value: conference.dur },
    { icon: GraduationCap, label: "Eligibility", value: conferenceGrades(conference) },
    {
      icon: Award,
      label: "Certification",
      value: (
        <>
          Certificate of Participation from{" "}
          <span className="font-semibold text-foreground">Harvard World Model United Nations</span>
        </>
      ),
    },
  ];

  return (
    <section id="details" className="relative py-12 md:py-16 bg-background overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="mb-10 md:mb-12">
          <div className="eyebrow text-sm md:text-base mb-5">
            <span className="rule mr-3" /> Program Details
          </div>
          <h2 className="font-serif text-secondary text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Conference Details.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[420px] overflow-hidden border-8 border-card shadow-[var(--shadow-elegant)]">
              <img src={acsCampus} alt="ACS Athens campus" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-[hsl(var(--hwmun-navy)/0.05)] mix-blend-multiply" />
            </div>
            <p className="mt-4 font-serif italic text-sm text-muted-foreground text-center">
              ACS Athens · Host Campus
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="group bg-card border border-border rounded-md p-6 shadow-[var(--shadow-soft)] hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
              >
                <div className="shrink-0 w-12 h-12 rounded-full border border-primary/20 bg-background flex items-center justify-center transition-colors group-hover:bg-primary/5">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-lg md:text-xl font-medium text-primary pb-1.5 border-b border-primary/30">
                    {label}
                  </div>
                  <p className="font-sans text-base text-foreground/80 mt-3 leading-relaxed">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Objectives() {
  const list: [string, string][] = [
    ["Promote Global Awareness & Diplomacy", "Encourage delegates to explore pressing international issues through the lens of diplomacy and cooperation."],
    ["Foster Cross-Cultural Understanding", "Create an inclusive environment that celebrates cultural diversity and builds friendships across borders."],
    ["Develop Leadership & Communication", "Enhance abilities in negotiation, public speaking, collaboration, and critical thinking through committee sessions."],
    ["Simulate Real-World Decision-Making", "Provide realistic simulations of UN bodies to help students understand the complexity of global governance."],
    ["Inspire Civic Engagement", "Empower young leaders to return to their communities with a deeper sense of civic duty and commitment to change."],
  ];
  const perPage = 3;
  const pages: typeof list[] = [];
  for (let i = 0; i < list.length; i += perPage) {
    const slice = list.slice(i, i + perPage);
    while (slice.length < perPage) {
      const repeated = list[slice.length % list.length];
      if (!repeated) break;
      slice.push(repeated);
    }
    pages.push(slice);
  }

  const [page, setPage] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPage((p) => (p + 1) % pages.length), 5000);
    return () => clearInterval(id);
  }, [pages.length]);

  const prev = () => setPage((p) => (p - 1 + pages.length) % pages.length);
  const next = () => setPage((p) => (p + 1) % pages.length);

  return (
    <section className="relative py-14 md:py-20 bg-muted overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div className="max-w-4xl">
            <div className="eyebrow text-base md:text-lg">
              <span className="rule mr-3" /> Conference Objectives
            </div>
            <h2 className="mt-6 font-serif text-secondary text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Designed with purpose.<br />Delivered with rigor.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={prev} aria-label="Previous"
              className="w-12 h-12 rounded-full border border-primary/30 bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button type="button" onClick={next} aria-label="Next"
              className="w-12 h-12 rounded-full border border-primary/30 bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-16 overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${page * 100}%)` }}>
            {pages.map((group, gIdx) => (
              <div key={gIdx} className="w-full shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6">
                {group.map(([title, body], i) => {
                  const originalIndex = list.findIndex(([t]) => t === title);
                  return (
                    <article key={`${gIdx}-${i}`} className="bg-background border border-border p-8 md:p-10">
                      <div className="font-serif text-3xl text-primary tabular-nums">
                        {String(originalIndex + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-4 font-serif text-2xl text-foreground leading-snug">{title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-foreground/75 font-light">{body}</p>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {pages.map((_, i) => (
            <button key={i} type="button" onClick={() => setPage(i)} aria-label={`Go to page ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === page ? "w-8 bg-primary" : "w-4 bg-primary/25"}`} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 mt-8 md:mt-10">
        <img src={flags} alt="International flags" loading="lazy" className="w-full aspect-[21/9] object-cover" />
      </div>
    </section>
  );
}

function Benefits() {
  const list: [string, string, typeof Globe][] = [
    ["Global Perspective", "A deeper understanding of global challenges and international institutions.", Globe],
    ["Leadership & Teamwork", "Lead, compromise, and collaborate effectively in high-pressure multicultural settings.", Users2],
    ["International Network", "Build lifelong connections with peers from over 100 countries.", Network],
    ["Negotiation & Public Speaking", "Strengthen persuasive communication and diplomacy through resolutions.", Mic],
    ["Confidence & Critical Thinking", "Sharpen creative problem-solving and the ability to think on one's feet.", Lightbulb],
    ["A Harvard Credential", "Earn an official Certificate of Participation from Harvard WorldMUN.", BadgeCheck],
  ];
  return (
    <section id="benefits" className="relative py-14 md:py-20 bg-primary text-primary-foreground overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full border border-primary-foreground/20" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[36rem] h-[36rem] rounded-full border border-primary-foreground/15" />
      <div className="pointer-events-none absolute top-1/3 right-10 w-2 h-2 rounded-full bg-primary-foreground/60" />
      <div className="pointer-events-none absolute bottom-20 left-16 w-2 h-2 rounded-full bg-primary-foreground/60" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="eyebrow text-base md:text-lg !text-white">
            <span className="rule mr-3" /> Key Benefits for Students
          </div>
          <h2 className="mt-6 font-serif text-primary-foreground text-4xl md:text-5xl leading-[1.05] tracking-tight">
            What every delegate takes home from Athens.
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(([title, body, Icon], i) => (
            <div key={title}
              className="relative bg-primary-foreground/[0.04] border border-white/30 backdrop-blur-sm rounded-md p-8 md:p-10 flex flex-col items-center text-center hover:border-white/60 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
              <span className="pointer-events-none absolute -top-6 -right-2 font-serif text-[7rem] leading-none text-primary-foreground/[0.06] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-primary-foreground/40" />
                <span className="absolute inset-2 rounded-full border border-primary-foreground/20" />
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
                <Icon className="w-10 h-10 text-primary-foreground relative" strokeWidth={1.25} />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-primary-foreground">{title}</h3>
              <span className="mt-4 block w-10 h-px bg-primary-foreground/60" />
              <p className="mt-4 text-[15px] leading-relaxed text-primary-foreground/75 font-light">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  const days: { name: string; range: string; rows: { time: string; label: string; Icon: typeof Users }[] }[] = [
    {
      name: "Day 1", range: "8:00 am — 4:00 pm",
      rows: [
        { time: "08:00 am — 09:00 am", label: "Registrations", Icon: Users },
        { time: "09:15 am — 11:00 am", label: "Opening Ceremony", Icon: Award },
        { time: "11:15 am — 11:45 am", label: "Lunch Break", Icon: Wallet },
        { time: "12:00 pm — 01:45 pm", label: "Committee Session", Icon: GraduationCap },
        { time: "02:00 pm", label: "15 minutes break / feedback", Icon: Clock },
        { time: "02:15 pm — 03:45 pm", label: "Committee Session", Icon: GraduationCap },
        { time: "04:00 pm", label: "15 minutes feedback", Icon: Clock },
      ],
    },
    {
      name: "Day 2", range: "9:00 am — 4:00 pm",
      rows: [
        { time: "09:00 am — 10:45 am", label: "Committee Sessions", Icon: GraduationCap },
        { time: "11:00 am", label: "15 minutes feedback", Icon: Clock },
        { time: "11:15 am — 11:45 am", label: "Lunch Break", Icon: Wallet },
        { time: "12:00 pm — 01:45 pm", label: "Committee Session", Icon: GraduationCap },
        { time: "02:00 pm", label: "15 minutes break / feedback", Icon: Clock },
        { time: "02:15 pm — 03:45 pm", label: "Committee Session", Icon: GraduationCap },
        { time: "04:00 pm", label: "15 minutes feedback", Icon: Clock },
      ],
    },
    {
      name: "Day 3", range: "9:00 am — 4:00 pm",
      rows: [
        { time: "09:00 am — 10:45 am", label: "Committee Sessions", Icon: GraduationCap },
        { time: "11:00 am", label: "15 minute feedback", Icon: Clock },
        { time: "11:15 am — 11:45 am", label: "Lunch Break", Icon: Wallet },
        { time: "12:00 pm — 01:45 pm", label: "Committee Session", Icon: GraduationCap },
        { time: "02:00 pm", label: "15 minutes break / feedback", Icon: Clock },
        { time: "02:15 pm — 04:00 pm", label: "Closing Ceremony", Icon: Award },
      ],
    },
  ];

  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % days.length), 6000);
    return () => clearInterval(id);
  }, [days.length]);

  const current = days[active] ?? { name: "", range: "", entries: [] };
  const prev = () => setActive((p) => (p - 1 + days.length) % days.length);
  const next = () => setActive((p) => (p + 1) % days.length);

  return (
    <section id="schedule" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={santoriniSchedule} alt="" className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
        <div className="absolute inset-0 bg-gradient-to-l from-[#f5f1ea] via-[#f5f1ea]/85 to-transparent" />
      </div>

      <div className="relative grid lg:grid-cols-2">
        <div className="hidden lg:block" />
        <div className="relative px-8 md:px-12 lg:px-16 py-14 md:py-16">
          <div className="eyebrow">
            <span className="rule mr-3" /> Tentative Schedule
          </div>
          <h2 className="mt-6 font-serif text-secondary text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Three days.<br />One unforgettable assembly.
          </h2>
          <span className="mt-5 block w-16 h-px bg-accent" />
          <p className="mt-5 text-[15px] text-foreground/85 max-w-md leading-relaxed font-medium">
            A well-structured day that balances academics, activities, and personal growth.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <button onClick={prev} aria-label="Previous day"
              className="w-9 h-9 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {days.map((d, i) => (
              <button key={d.name} onClick={() => setActive(i)}
                className={`px-4 py-2 text-xs tracking-[0.18em] uppercase font-medium transition ${
                  i === active ? "bg-primary text-primary-foreground" : "bg-background text-foreground/60 hover:text-primary"
                }`}>
                {d.name}
              </button>
            ))}
            <button onClick={next} aria-label="Next day"
              className="w-9 h-9 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition">
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="ml-2 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">{current.range}</span>
          </div>

          <div className="mt-5 overflow-hidden">
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${active * 100}%)` }}>
              {days.map((d) => (
                <ul key={d.name} className="w-full shrink-0 space-y-2">
                  {d.rows.map(({ time, label, Icon }) => (
                    <li key={time + label} className="flex items-stretch bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
                      <span className="bg-primary text-primary-foreground text-[12px] tabular-nums font-semibold tracking-wide px-4 py-2.5 flex items-center justify-center w-[180px] shrink-0 text-center">
                        {time}
                      </span>
                      <span className="w-px bg-accent/60 my-2" />
                      <span className="flex items-center gap-3 px-4 py-2.5 flex-1">
                        <Icon className="w-4 h-4 text-accent" strokeWidth={1.75} />
                        <span className="text-[14px] text-foreground font-medium">{label}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between gap-6">
            <span className="block w-20 h-px bg-accent" />
            <p className="font-serif italic text-foreground/70 text-xs md:text-sm text-right">
              "The roots of education are bitter, but the fruit is sweet."{" "}
              <span className="text-accent not-italic">– Aristotle</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Committees() {
  const items = [
    { img: committeeDisec, group: "GA", name: "Disarmament and International Security Committee (DISEC)", topic: "Cobalt Mining in the Congo", body: "DISEC will address the human cost of cobalt mining in the Democratic Republic of the Congo, where children and civilians are exploited under inhumane conditions. While cobalt is essential to the global tech economy, its extraction raises serious ethical and security concerns. Delegates will examine the international community's role in enabling these practices and propose multilateral solutions to regulate supply chains, protect vulnerable communities, and ensure ethical resource governance." },
    { img: committeeEcofin, group: "GA", name: "Economic and Financial Committee (ECOFIN)", topic: "International Monetary Fund Bailouts and their Consequences", body: "ECOFIN will explore the effectiveness of IMF interventions in countries facing repeated financial crises. Through case studies of Pakistan, Egypt, and Côte d'Ivoire, delegates will assess whether IMF policies have fostered sustainable development or entrenched debt cycles. Using diverse economic metrics and methodologies, the committee will evaluate the long-term implications of IMF involvement and propose reforms to promote financial stability, equity, and accountability." },
    { img: committeeSochum, group: "GA", name: "Social, Humanitarian, and Cultural Committee (SOCHUM)", topic: "Healthcare Treatment and Stigmas Surrounding its Provision", body: "SOCHUM will examine how cultural norms, legal restrictions, and economic barriers limit access to sexual and reproductive health and rights (SRHR) worldwide. With particular focus on marginalized populations, the committee will evaluate structural inequalities and propose inclusive policies that expand access to comprehensive SRHR education, services, and protections — especially in low-resource and conservative settings." },
    { img: committeeSpecpol, group: "GA", name: "Special Political and Decolonization Committee (SPECPOL)", topic: "Protecting and Preserving Biodiversity", body: "SPECPOL will address the global biodiversity crisis, with wildlife populations declining by nearly 70% since 1970. Delegates will assess the root causes of ecosystem collapse — such as habitat destruction, climate change, and overexploitation — and debate solutions that reflect their nations' ecological and geopolitical interests. The committee will work to develop cooperative strategies for preserving global biodiversity and securing a sustainable future." },
    { img: committeeCsocd, group: "ECOSOC/RB", name: "Commission for Social Development (CSocD)", topic: "Collectivized and Collaborative Action of Populations for the Sake of National Development", body: "CSocD will explore how local, community-led approaches can drive effective poverty reduction. Drawing on models like the Harlem Children's Zone, delegates will consider how systems-level interventions — coordinated across education, health, and economic support — can be adapted globally. The committee will assess the cultural, financial, and political challenges of implementing place-based strategies in diverse international contexts." },
    { img: committeeLegal, group: "GA", name: "Legal Committee", topic: "Digital Learning and Educational Inequities", body: "The Legal Committee will investigate how disparities in digital access and literacy widen global educational inequalities. Delegates will examine the legal responsibilities of governments and institutions in ensuring digital inclusion, especially for underserved communities. Topics include teacher training, student access, funding, and data privacy. The committee will develop rights-based frameworks to support equitable digital learning worldwide." },
  ];

  return (
    <section id="committees" className="relative bg-secondary text-secondary-foreground pt-20 md:pt-28 pb-12 md:pb-16">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <h2 className="font-serif text-secondary-foreground text-4xl md:text-5xl leading-[1.05] tracking-tight">Committees</h2>
        <p className="mt-4 max-w-2xl text-secondary-foreground/80 text-[15px] leading-relaxed">
          A curated selection of simulated bodies. The full roster of twenty is announced to accepted delegates.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {items.map((c, i) => (
            <article key={c.name} className="bg-background rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <div className={`md:w-2/5 shrink-0 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <img src={c.img} alt={c.topic} loading="lazy" width={1024} height={768} className="w-full h-56 md:h-full object-cover" />
              </div>
              <div className="p-6 md:p-7 flex-1">
                <h3 className="font-serif text-secondary text-[19px] leading-snug">
                  <span className="text-secondary">{c.group}:</span> {c.name}
                </h3>
                <div className="mt-3 text-[14px] font-semibold text-foreground">
                  TOPIC: <span className="font-normal">{c.topic}</span>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/80">{c.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center text-secondary-foreground/80 italic text-sm tracking-wide">and many more…</div>
      </div>
    </section>
  );
}

function CTA({ apply, conference }: { apply: string; conference: Programme }) {
  return (
    <section id="register" className="relative pt-12 pb-8 md:pt-16 md:pb-10 bg-background text-foreground overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <span className="font-serif text-[22vw] md:text-[16vw] leading-none tracking-tighter text-secondary/[0.05]">HMUN</span>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-32 bg-secondary/40" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-secondary">
          <span className="h-px w-8 bg-secondary/60" />
          Applications Open
          <span className="h-px w-8 bg-secondary/60" />
        </div>

        <h2 className="mt-8 font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-secondary">
          Take your seat at the table where the<br />
          <span className="italic text-primary">next generation of leaders</span> is forged.
        </h2>

        <p className="mt-8 mx-auto max-w-2xl text-[15px] md:text-base text-foreground/75 leading-relaxed">
          Seats are allocated by school delegation and reviewed on a rolling basis. Submit
          your interest to receive the official application and country assignment.
        </p>

        <div className="mt-12 flex flex-col items-center gap-6">
          <a href={apply} target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 bg-primary text-primary-foreground px-10 py-5 text-sm font-semibold tracking-[0.25em] uppercase hover:bg-primary/90 transition">
            Apply Now
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>

          <div className="flex items-center gap-6 text-[11px] tracking-[0.3em] uppercase text-foreground/60">
            <span>{conferenceLocation(conference)}</span>
            <span className="h-1 w-1 rounded-full bg-foreground/40" />
            <span>{conferenceDateLabel(conference)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerLogos() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 pb-12 md:pb-16">
        <div className="flex items-center justify-center gap-16 md:gap-28">
          <img src={lwlLogo} alt="" className="h-12 md:h-16 w-auto object-contain" />
          <img src={harvardLogo} alt="" className="h-12 md:h-16 w-auto object-contain" />
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="relative py-32 md:py-44 bg-secondary text-secondary-foreground overflow-hidden">
      <img src={unity} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <div className="font-serif text-accent text-6xl leading-none mb-6">“</div>
        <blockquote className="font-serif text-3xl md:text-5xl leading-[1.15] italic text-white">
          One conference. Countless connections.<br />
          <span className="text-accent not-italic">Infinite impact.</span>
        </blockquote>
        <div className="mt-10 text-[11px] tracking-[0.3em] uppercase text-white/60">The WorldMUN Spirit</div>
      </div>
    </section>
  );
}

export default function HWMUNGreece({ conference }: { conference: Programme }) {
  const APPLY_PATH = conference.apply;
  return (
    <div className="hwmun-greece-theme">
      <main className="bg-background text-foreground animate-fade-in">
        <Hero apply={APPLY_PATH} />
        <Hosted />
        <About />
        <Pillars />
        <Details conference={conference} />
        <Objectives />
        <Benefits />
        <Schedule />
        <Committees />
        <CTA apply={APPLY_PATH} conference={conference} />

        <PartnerLogos />
      </main>
    </div>
  );
}
