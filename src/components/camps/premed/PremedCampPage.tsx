import { useEffect, useRef, useState } from "react";

import {
  Activity,
  AlertTriangle,
  BookOpen,
  Brain,
  BrainCircuit,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Cpu,
  DollarSign,
  Globe,
  GraduationCap,
  HeartPulse,
  Hospital,
  Library,
  Lightbulb,
  Map,
  MapPin,
  Microscope,
  ScrollText,
  Stethoscope,
  Sun,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import heroVideo from "@/assets/camps/horizons/V1.mp4.asset.json";
import visionImg from "@/assets/camps/horizons/vision.jpg";
import capstoneImg from "@/assets/camps/horizons/capstone.jpg.asset.json";
import visionBgImg from "@/assets/camps/horizons/vision-bg.jpg.asset.json";
import logoAsset from "@/assets/camps/horizons/hugem-logo.png.asset.json";
import lwlLogo from "@/assets/camps/horizons/lwl-logo-white.png.asset.json";
import hugemWhiteLogo from "@/assets/camps/horizons/hugem-white-logo.png.asset.json";
import harvardCampusBeautifulImg from "@/assets/camps/horizons/harvard-campus-beautiful.jpg.asset.json";
import outingHarvardImg from "@/assets/camps/horizons/campus-tour.jpg.asset.json";
import outingMfaImg from "@/assets/camps/horizons/mfa-boston.png.asset.json";
import mitDomeImg from "@/assets/camps/horizons/mit-dome.jpg.asset.json";
import hadleyImg from "@/assets/camps/horizons/mentors/hadley.jpg.asset.json";
import zainImg from "@/assets/camps/horizons/mentors/zain.jpg.asset.json";
import suhaniImg from "@/assets/camps/horizons/mentors/suhani.jpg.asset.json";
import leahImg from "@/assets/camps/horizons/mentors/leah.jpg.asset.json";
import allisonImg from "@/assets/camps/horizons/mentors/allison.jpg.asset.json";
import alexanderImg from "@/assets/camps/horizons/mentors/alexander.png.asset.json";
import juheeImg from "@/assets/camps/horizons/mentors/juhee.jpg.asset.json";

const BOOK_MEETING_URL = "https://bit.ly/3TnVIa8";
const APPLY_URL = "https://forms.gle/sMuYVrCD4nWnMraq8";

const mentors = [
  {
    name: "Hadley Brown",
    img: hadleyImg.url,
    role: "Social Studies & Environmental Science and Public Policy",
    bio: "Junior from Nashville studying Social Studies and Environmental Science & Public Policy. Third-year HUGEM Board member focused on curriculum and operations. Passionate about climate policy, civil discourse, and travel.",
  },
  {
    name: "Zain Memon",
    img: zainImg.url,
    role: "Neuroscience & Anthropology · Co-President, HUGEM",
    bio: "Junior from California studying Neuroscience & Anthropology with a secondary in Global Health. Co-President of HUGEM, researching adolescent health and systems innovation. Loves hiking, cities, and good food.",
  },
  {
    name: "Suhani Sharma",
    img: suhaniImg.url,
    role: "Mechanical Engineering",
    bio: "Sophomore studying Mechanical Engineering. Builder, musician, speedcuber, and origami folder. Active in Engineers Without Borders, ExperiMentors, and the Harvard Undergraduate Drummers.",
  },
  {
    name: "Leah Maathey",
    img: leahImg.url,
    role: "Environmental Engineering · Director of Curriculum, HUGEM",
    bio: "Senior studying Environmental Engineering and HUGEM Director of Curriculum. Technical lead for Engineers Without Borders, writer for The Harvard Crimson, and Earth sciences researcher. Enjoys travel, food, and exercise.",
  },
  {
    name: "Allison Barrie",
    img: allisonImg.url,
    role: "Sociology",
    bio: "Sophomore studying Sociology. Member of Harvard College Debating Union, Army ROTC participant, and ESL teacher for citizenship preparation. Loves swimming, climbing, skiing, and travel.",
  },
  {
    name: "Alexander Dudek",
    img: alexanderImg.url,
    role: "Chemistry · Harvard Class of 2029",
    bio: "Harvard Class of 2029 pursuing Chemistry. Science communicator, published author, and Co-Founder of the Canadian Science Bowl. From Edmonton, Canada; enjoys hiking and sharing science.",
  },
  {
    name: "Juhee Kim",
    img: juheeImg.url,
    role: "Integrative Biology & Chinese · Harvard Class of 2028",
    bio: "Harvard Class of 2028 studying Integrative Biology & Chinese. Korean American from LA with experience studying abroad in Taiwan. Works in media production and plays viola in the Harvard Radcliffe Orchestra.",
  },
];




const days = [
  {
    num: "01",
    title: "Understanding Health",
    question: "How do humans thrive?",
    summary:
      "Students explore the biological and developmental foundations of human health and disease.",
    icon: HeartPulse,
    courses: [
      "Human Physiology",
      "Evolutionary Perspectives on Health",
      "Health Throughout the Lifecycle",
    ],
  },
  {
    num: "02",
    title: "Understanding Today's Challenges",
    question: "What are the greatest health challenges of our time?",
    summary:
      "Students examine the social, cultural, and environmental factors shaping health outcomes worldwide.",
    icon: BrainCircuit,
    courses: [
      "The Mental Health Epidemic",
      "Behind the American Mental Health Crisis",
      "No Cure for Health",
    ],
  },
  {
    num: "03",
    title: "Understanding Healthcare",
    question: "How can healthcare systems better serve people?",
    summary:
      "Students learn how healthcare systems function, where they succeed, and where opportunities for innovation exist.",
    icon: Hospital,
    courses: [
      "Patient-Centered History",
      "Quality of Healthcare in America",
      "America's $4 Trillion Challenge",
    ],
  },
  {
    num: "04",
    title: "Building the Future",
    question: "How is innovation transforming healthcare?",
    summary:
      "Students engage with the technologies reshaping medicine — from AI to biotech.",
    icon: Microscope,
    courses: [
      "Data Science & AI for Health",
      "Vaccines and Public Trust",
      "Healthcare Innovation Lab",
    ],
    tags: [
      "Artificial Intelligence",
      "Digital Health",
      "Precision Medicine",
      "Biotechnology",
      "Telehealth",
      "Predictive Analytics",
    ],
  },
  {
    num: "05",
    title: "Leading Global Change",
    question: "How can we improve health at scale?",
    summary:
      "Students investigate how health challenges differ across communities and countries while developing leadership skills for meaningful impact.",
    icon: TrendingUp,
    courses: [
      "Global Health & Development",
      "Social Medicine & Ethics in a Global World",
      "Career Pathways in Health",
    ],
  },
];

const capstoneTopics: { title: string; blurb: string; icon: typeof Brain }[] = [
  {
    title: "Youth Mental Health",
    blurb: "Rising anxiety, access gaps, and the case for prevention.",
    icon: Brain,
  },
  {
    title: "AI-Powered Healthcare Access",
    blurb: "How intelligent systems can widen — or narrow — the gap.",
    icon: Cpu,
  },
  {
    title: "Vaccine Confidence",
    blurb: "Rebuilding public trust in an era of misinformation.",
    icon: Activity,
  },
  {
    title: "Healthy Aging",
    blurb: "Designing longer lives with dignity and independence.",
    icon: HeartPulse,
  },
  {
    title: "Healthcare Affordability",
    blurb: "Making quality care possible for every household.",
    icon: TrendingUp,
  },
  {
    title: "Global Health Equity",
    blurb: "Closing the distance between borders and better outcomes.",
    icon: Globe,
  },
];

const deliverables = [
  "Problem Analysis",
  "Innovation Proposal",
  "Implementation Strategy",
  "Impact Assessment",
  "Final Presentation",
];

const outcomes = [
  {
    title: "Biological & Social Foundations",
    text: "Understand the biological, social, and systemic determinants of health",
    icon: Activity,
    keyword: "Foundations",
  },
  {
    title: "Innovation in Medicine",
    text: "Evaluate emerging innovations in medicine and technology",
    icon: BrainCircuit,
    keyword: "Innovation",
  },
  {
    title: "Leadership & Communication",
    text: "Develop leadership and communication skills",
    icon: Users,
    keyword: "Leadership",
  },
  {
    title: "Healthcare Challenges",
    text: "Analyze major challenges facing modern healthcare",
    icon: AlertTriangle,
    keyword: "Analysis",
  },
  {
    title: "Design & Systems Thinking",
    text: "Apply design thinking and systems thinking to health problems",
    icon: Lightbulb,
    keyword: "Systems",
  },
  {
    title: "Your Future Path",
    text: "Build a vision for your future role in healthcare and health innovation",
    icon: Compass,
    keyword: "Vision",
  },
];


export default function PremedCampPage() {

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 bg-paper border-b border-border">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-10">
          <a href="#top" className="flex items-center">
            <img
              src={logoAsset.url}
              alt="HUGEM — Harvard Undergraduate Global Education Movement"
              className="h-12 w-auto"
              width={250}
              height={50}
            />
          </a>
          <nav className="hidden gap-8 text-base font-medium text-ink md:flex">
            <a href="#program" className="hover:text-crimson transition-colors">Program</a>
            <a href="#schedule" className="hover:text-crimson transition-colors">Schedule</a>
            <a href="#capstone" className="hover:text-crimson transition-colors">Capstone</a>
            <a href="#outcomes" className="hover:text-crimson transition-colors">Outcomes</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={BOOK_MEETING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-ink/30 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              Book a Meeting
            </a>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-crimson px-4 py-2 text-xs font-semibold uppercase tracking-widest text-paper hover:bg-ink transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen w-full overflow-hidden bg-ink">
        <div className="absolute inset-0 overflow-hidden">
          <video
            src={heroVideo.url}
            autoPlay
            muted
            loop
            playsInline
            poster={heroVideo.url}
            className="h-full w-full object-cover"
            aria-label="Pre-Med Academy background video"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-ink/55 via-ink/30 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,oklch(0.18_0.005_260)_100%)] opacity-50" />

        <div className="relative mx-auto flex min-h-screen max-w-[1500px] flex-col items-center justify-center px-5 py-40 lg:px-10 lg:py-48">
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-paper/90">
              <span className="inline-block h-px w-10 bg-crimson" />
              Where curiosity becomes a calling.
              <span className="inline-block h-px w-10 bg-crimson" />
            </div>

            <h1 className="mt-10 font-display text-[13vw] leading-[0.88] text-paper text-shadow-hero sm:text-[14vw] md:text-[11vw] lg:text-[10vw]">
              Pre Med
              <br />
              <span className="text-crimson">Academy.</span>
            </h1>

            <p className="mx-auto mt-10 max-w-[56rem] text-xl leading-snug text-paper/90 md:text-2xl">
              A pre-collegiate program for students ready to explore medicine, innovation, and policy — and their own role in shaping what comes next.
            </p>


            <a
              href="#program"
              className="mx-auto mt-14 inline-flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-paper/80 hover:text-paper transition-colors"
            >
              Explore Program
              <span className="inline-flex h-10 w-6 items-end justify-center rounded-full border border-paper/30 pb-2" aria-hidden>
                <span className="inline-block h-2 w-0.5 animate-bounce rounded-full bg-crimson" />
              </span>
            </a>
          </div>
        </div>

        
      </section>

      {/* STATS — kinetic ticker */}
      <section
        aria-label="Program at a glance"
        className="relative -mt-px overflow-hidden bg-crimson text-paper"
      >
        <div className="flex whitespace-nowrap marquee-track will-change-transform">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {[
                { n: "05", l: "Days of Programming" },
                { n: "01", l: "Capstone Challenge" },
                { n: "∞", l: "Career Pathways" },
                { n: "03", l: "Themes per Day" },
              ].map((s, i) => (
                <div
                  key={`${dup}-${i}`}
                  className="flex items-center gap-8 border-r border-paper/20 px-10 py-8 md:gap-12 md:px-16 md:py-12"
                >
                  <span className="font-display text-7xl leading-none text-paper/90 md:text-[8rem]">
                    {s.n}
                  </span>
                  <span className="max-w-[14ch] text-xs font-semibold uppercase tracking-[0.25em] text-paper/70 whitespace-normal">
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>


      {/* PROGRAM VISION */}
      <VisionSection />


      {/* TIMELINE — five-day journey */}
      <section aria-label="Five-day timeline" className="relative bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-6 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink">
                <span className="inline-block h-px w-12 bg-crimson" />
                The Journey
              </div>
              <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-6xl">
                Five days. <span className="text-crimson">One arc.</span>
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-ink md:text-lg">
              A guided progression from understanding the body to leading
              change across systems.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="relative hidden md:block">
            <div className="absolute left-0 right-0 top-[5px] h-px bg-ink/20" />
            <ol className="relative grid grid-cols-5">
              {[
                { a: "Understanding", b: "Health", icon: Activity },
                { a: "Today's", b: "Challenges", icon: Brain },
                { a: "Understanding", b: "Healthcare", icon: Stethoscope },
                { a: "Building the", b: "Future", icon: Cpu },
                { a: "Leading Global", b: "Change", icon: Globe },
              ].map((s, i) => (
                <li key={`${s.a}-${i}`} className="group relative pr-8">
                  <div className="flex h-3 items-center">
                    <span className="relative z-10 inline-block h-3 w-3 rounded-full bg-crimson ring-[5px] ring-paper transition-transform group-hover:scale-125" />
                  </div>
                  <div className="mt-8">
                    <s.icon className="h-7 w-7 text-crimson" strokeWidth={1.5} />
                    <div className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-crimson">
                      Day {i + 1}
                    </div>
                    <h3 className="mt-2 font-display text-2xl leading-[1.1] lg:text-3xl">
                      {s.a}
                      <br />
                      {s.b}
                    </h3>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Mobile timeline (vertical) */}
          <ol className="relative md:hidden">
            <span className="absolute left-3 top-0 bottom-0 w-px bg-ink/20" aria-hidden />
            {[
              { a: "Understanding", b: "Health", icon: Activity },
              { a: "Today's", b: "Challenges", icon: Brain },
              { a: "Understanding", b: "Healthcare", icon: Stethoscope },
              { a: "Building the", b: "Future", icon: Cpu },
              { a: "Leading Global", b: "Change", icon: Globe },
            ].map((s, i) => (
              <li key={`${s.a}-${i}`} className="relative flex gap-6 pb-12 last:pb-0">
                <span className="inline-flex h-3 w-6 shrink-0 items-center justify-center">
                  <span className="block h-3 w-3 rounded-full bg-crimson ring-[5px] ring-paper" />
                </span>
                <div>
                  <s.icon className="h-7 w-7 text-crimson" strokeWidth={1.5} />
                  <div className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-crimson">
                    Day {i + 1}
                  </div>
                  <h3 className="mt-2 font-display text-2xl leading-[1.1]">
                    {s.a}
                    <br />
                    {s.b}
                  </h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>



      {/* FRAMEWORK — three pillars in their own section */}
      <section id="framework" className="relative bg-ink text-paper">
        <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-5">
              <div className="mb-8 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/60">
                <span className="inline-block h-px w-10 bg-crimson" />
                The Framework
              </div>
              <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-6xl">
                A program built <br />
                <span className="text-crimson italic">around you.</span>
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-paper/70 md:text-lg">
                Three pillars define how the Academy works — who it serves, how
                it unfolds, and what students carry forward.
              </p>
            </div>

            <div className="col-span-12 md:col-span-7">
              <ol className="divide-y divide-paper/15 border-y border-paper/15">
                {[
                  {
                    k: "Who It's For",
                    v: "Students curious about medicine, public health, biotech, or health policy — no prior coursework required.",
                  },
                  {
                    k: "How It Works",
                    v: "A five-day interdisciplinary schedule builds toward a team-based capstone challenge and final presentation.",
                  },
                  {
                    k: "What You'll Gain",
                    v: "A grounded understanding of health systems and a clear vision for your own path in shaping their future.",
                  },
                ].map((c, i) => (
                  <li
                    key={c.k}
                    className="group grid grid-cols-12 gap-6 py-10 transition-colors hover:bg-paper/[0.03]"
                  >
                    <div className="col-span-2 font-display text-4xl text-crimson md:text-5xl">
                      0{i + 1}
                    </div>
                    <div className="col-span-10">
                      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-paper/70">
                        {c.k}
                      </div>
                      <p className="mt-4 text-lg leading-relaxed text-paper/90 md:text-xl">
                        {c.v}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CAMP DETAILS — layout switcher */}
      <CampDetailsSection />

      {/* SCHEDULE */}
      <ScheduleSection />

      {/* OUTINGS & EXCURSIONS */}
      <OutingsSection />

      {/* CAPSTONE — diptych */}
      <section id="capstone" className="relative bg-ink text-paper">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: image + label */}
          <div className="relative min-h-[500px] overflow-hidden lg:min-h-[820px]">
            <img
              src={capstoneImg.url}
              alt="Students collaborating on a healthcare project"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
            <div className="absolute inset-0 bg-linear-to-br from-ink/70 via-ink/40 to-ink/70" />
            <div className="relative flex h-full flex-col justify-between p-8 lg:p-12">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-paper/70">
                <span>Signature Challenge</span>
                <span>Team-Based</span>
              </div>
              <h2 className="font-display text-5xl leading-[0.9] tracking-tight md:text-7xl">
                The Future <br /> of Health <br />
                <span className="text-crimson italic">Challenge.</span>
              </h2>
            </div>
          </div>

          {/* Right: content */}
          <div className="border-t border-paper/15 p-8 lg:border-l lg:border-t-0 lg:p-16">
            <p className="max-w-lg text-lg leading-relaxed text-paper/85 md:text-xl">
              Working in teams, students identify a major healthcare challenge
              and develop an innovative solution — from problem analysis through
              a final pitch.
            </p>

            <div className="mt-14">
              <div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-paper/60">
                <span>Example Topics</span>
                <span className="inline-block h-px flex-1 bg-paper/20" />
              </div>
              <ul className="grid grid-cols-1 gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
                {capstoneTopics.map((t) => {
                  const Icon = t.icon;
                  return (
                    <li
                      key={t.title}
                      className="group flex flex-col gap-4 bg-ink p-6 transition-colors hover:bg-crimson"
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-paper/5 text-crimson transition-colors group-hover:border-paper/60 group-hover:text-paper">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="text-base font-semibold leading-tight text-paper">
                        {t.title}
                      </span>
                      <span className="text-sm leading-snug text-paper/70 group-hover:text-paper/90">
                        {t.blurb}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERABLES — standalone highlight */}
      <section id="deliverables" className="bg-crimson text-paper">
        <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="mb-12 max-w-3xl">
            <div className="mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/80">
              <span className="inline-block h-px w-12 bg-paper/60" />
              Capstone Deliverables
            </div>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              What teams <span className="italic text-paper/90">produce.</span>
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {deliverables.map((d, i) => (
              <li
                key={d}
                className="flex flex-col justify-between rounded-2xl bg-paper p-6 text-ink"
              >
                <span className="font-display text-4xl text-crimson">
                  0{i + 1}
                </span>
                <span className="mt-6 text-xl font-semibold leading-tight">
                  {d}
                </span>
                <span className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-ink/50">
                  Phase {i + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OUTCOMES — auto-scrolling cards */}
      <section id="outcomes" className="bg-cream overflow-hidden">
        <div className="mx-auto max-w-[1500px] px-5 pt-24 lg:px-10 lg:pt-32">
          <div className="mb-8 max-w-3xl">
            <div className="mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/70">
              <span className="inline-block h-px w-12 bg-crimson" />
              Outcomes
            </div>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              What students <span className="text-crimson italic">take away.</span>
            </h2>
          </div>
        </div>

        <div className="group relative overflow-hidden pb-24 lg:pb-32">
          <div className="flex w-max gap-6 px-5 lg:px-10 outcomes-track group-hover:[animation-play-state:paused]">
            {[...outcomes, ...outcomes].map((o, i) => {
              const Icon = o.icon;
              const isAccent = i === 0 || i === outcomes.length;
              return (
                <article
                  key={`${o.title}-${i}`}
                  className={`flex w-[80vw] max-w-[360px] flex-col justify-between rounded-[2rem] p-8 md:w-[380px] md:p-10 ${
                    isAccent
                      ? "bg-ink text-paper"
                      : "bg-paper text-ink border border-ink/10"
                  }`}
                >
                  <div>
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isAccent ? "bg-paper/10 text-paper" : "bg-crimson/10 text-crimson"
                      }`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-8 font-display text-2xl leading-[1.1] md:text-3xl">
                      {o.title}
                    </h3>
                    <p
                      className={`mt-4 text-base leading-relaxed md:text-lg ${
                        isAccent ? "text-paper/75" : "text-ink/70"
                      }`}
                    >
                      {o.text}
                    </p>
                  </div>

                  <span
                    className={`mt-8 inline-block self-start rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-widest ${
                      isAccent
                        ? "border-paper/25 text-paper/85"
                        : "border-ink/10 text-ink/60"
                    }`}
                  >
                    {o.keyword}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MENTORS — horizontal scroll carousel */}
      <section id="mentors" className="relative bg-paper">
        <div className="mx-auto max-w-[1500px] px-5 py-16 md:py-20 lg:px-10 lg:py-28">
          <div className="mb-8 grid grid-cols-12 gap-6 md:mb-10">
            <div className="col-span-12 md:col-span-7">
              <div className="mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink">
                <span className="inline-block h-px w-12 bg-crimson" />
                Harvard Student Mentors
              </div>
              <h2 className="font-display text-3xl leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
                Learn from those <br className="hidden md:block" />
                <span className="text-crimson italic">walking the path.</span>
              </h2>
            </div>
            <p className="col-span-12 self-end text-sm leading-relaxed text-ink/75 md:col-span-5 md:text-base">
              Current Harvard undergraduates from HUGEM guide every session —
              sharing research, campus life, and the questions that shaped
              their own journeys.
            </p>
          </div>

          <MentorCarousel />
        </div>
      </section>




      {/* QUOTE — call to belief */}
      <section className="relative overflow-hidden bg-crimson text-crimson-foreground">
        {/* Pattern: faint dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Large faint quotation mark */}
        <span
          className="pointer-events-none absolute -left-6 top-10 font-display text-[18rem] leading-none opacity-10 md:text-[28rem]"
          aria-hidden
        >
          “
        </span>

        <div className="relative mx-auto max-w-[1500px] px-5 py-28 lg:px-10 lg:py-40">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-10 lg:col-start-2">
              <blockquote className="font-display text-[2.2rem] leading-[1.08] md:text-[3.5rem] lg:text-[4.5rem]">
                Students explore how they can contribute to building a healthier future for all — as innovators, leaders, and changemakers.
              </blockquote>
              <div className="mt-12 flex items-center gap-5">
                <span className="inline-block h-px w-20 bg-paper/40" />
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-paper/80">
                  HUGEM Pre-Med Academy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="closing" className="bg-ink text-paper">
        <div className="mx-auto max-w-[1500px] px-5 py-24 text-center lg:px-10 lg:py-32">
          <img
            src={hugemWhiteLogo.url}
            alt="HUGEM — Harvard Undergraduate Global Education Movement"
            className="mx-auto mb-10 h-16 w-auto md:h-20"
            width={320}
            height={64}
            loading="lazy"
          />
          <h2 className="font-display text-5xl leading-[0.88] md:text-[6vw]">
            Help build the <br className="hidden md:block" />
            <span className="italic text-crimson">future of health.</span>
          </h2>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-paper hover:bg-paper hover:text-ink transition-colors"
            >
              Apply Now
              <span aria-hidden>→</span>
            </a>
            <a
              href={BOOK_MEETING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-paper/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-paper hover:bg-paper hover:text-ink transition-colors"
            >
              Schedule a Conversation
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>


        <footer className="border-t border-paper/15">
          <div className="mx-auto flex max-w-[1500px] flex-col items-center px-5 py-14 text-center lg:px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/60">
              In collaboration with
            </p>
            <img
              src={lwlLogo.url}
              alt="Learn with Leaders"
              className="mt-4 h-12 w-auto"
              width={220}
              height={108}
              loading="lazy"
            />
            <div className="mt-8 flex flex-col gap-2 text-sm text-paper/70 md:flex-row md:gap-8">
              <a
                href="mailto:team@learnwithleaders.com"
                className="hover:text-crimson transition-colors"
              >
                team@learnwithleaders.com
              </a>
              <a
                href="https://www.learnwithleaders.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-crimson transition-colors"
              >
                www.learnwithleaders.com
              </a>
            </div>
            <p className="mt-8 text-xs text-paper/40">
              Harvard Undergraduate Global Education Movement · Pre-Med Academy
            </p>
          </div>
        </footer>

      </section>
    </div>
  );
}

function CampDetailsSection() {
  const details = [
    { label: "Dates", value: "4 – 9 January 2027", Icon: CalendarDays },
    { label: "Format", value: "Day Camp", Icon: Sun },
    { label: "Location", value: "In-person at Harvard University, Cambridge, MA", Icon: MapPin },
    { label: "Eligibility", value: "Grades 8 – 12", Icon: GraduationCap },
    { label: "Camp Hours", value: "9 AM – 4 PM", Icon: Clock },
  ];

  const included = [
    { Icon: BookOpen, title: "Academic Programme", desc: "Full curriculum & instruction" },
    { Icon: UtensilsCrossed, title: "Lunch Included", desc: "Lunch provided on program days" },
    { Icon: Map, title: "Outings", desc: "Camp-related trips & activities" },
    { Icon: Lightbulb, title: "Interactive Workshops", desc: "Hands-on learning sessions" },
    { Icon: ScrollText, title: "Official Certificate", desc: "From Harvard College Union Society" },
    { Icon: Library, title: "All Program Material", desc: "Resources & study materials" },
  ];

  return (
    <section id="camp-details" className="relative bg-cream">
      {/* Full-bleed campus image */}
      <div className="relative w-full">
        <img
          src={harvardCampusBeautifulImg.url}
          alt="Harvard University campus"
          className="h-[42vh] min-h-[300px] w-full object-cover md:h-[56vh]"
          loading="lazy"
          width={1600}
          height={1000}
        />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      {/* Overlapping crimson panel + fee box */}
      <div className="relative mx-auto max-w-[1400px] px-5 pb-20 lg:px-10 lg:pb-28">
        <div className="relative -mt-24 bg-crimson px-6 py-14 text-paper md:-mt-32 md:px-16 md:py-20">
          <div className="text-center">
            <div className="mb-5 inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/70">
              <span className="inline-block h-px w-10 bg-paper/40" />
              Camp Details
              <span className="inline-block h-px w-10 bg-paper/40" />
            </div>
            <h2 className="mx-auto max-w-3xl font-display text-4xl leading-[0.95] tracking-tight md:text-5xl">
              A campus built to shape the future of medicine.
            </h2>
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {details.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col items-center px-4 text-center ${
                  i < details.length - 1 ? "lg:border-r lg:border-paper/20" : ""
                }`}
              >
                <item.Icon className="mb-4 h-6 w-6 text-paper/70" strokeWidth={1.5} />
                <dt className="text-[10px] font-semibold uppercase tracking-[0.3em] text-paper/60">
                  {item.label}
                </dt>
                <dd className="mt-2 font-display text-xl leading-tight md:text-2xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Fee + Everything included */}
        <div className="border border-t-0 border-ink/10 bg-paper p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Fee - left */}
            <div className="flex flex-col justify-center border-b border-ink/10 pb-12 lg:border-b-0 lg:border-r lg:border-ink/10 lg:pr-16 lg:pb-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-crimson">
                Program Fee
              </div>
              <h3 className="mt-4 font-display text-6xl leading-none tracking-tight text-ink md:text-7xl lg:text-8xl">
                1500 USD
              </h3>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink/70">
                per student
              </p>
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-paper hover:bg-ink transition-colors"
              >
                Apply Now
              </a>
            </div>

            {/* Included - right */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {included.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-crimson/20 text-crimson">
                    <item.Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-display text-lg leading-tight text-ink">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MentorCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = 24;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Scroll mentors left"
        className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-2 md:-translate-x-4 inline-flex h-12 w-12 items-center justify-center bg-ink text-paper shadow-lg transition-all hover:bg-crimson hover:scale-105 focus:outline-none focus:ring-2 focus:ring-crimson ${
          canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {mentors.map((m) => (
          <article
            key={m.name}
            className="group flex shrink-0 snap-start w-[min(85vw,340px)] flex-col bg-cream border border-ink/5 p-4 md:p-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
              <img
                src={m.img}
                alt={m.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            <div className="mt-4">
              <h3 className="font-display text-2xl leading-tight">
                {m.name}
              </h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
                {m.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                {m.bio}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll mentors right"
        className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-2 md:translate-x-4 inline-flex h-12 w-12 items-center justify-center bg-ink text-paper shadow-lg transition-all hover:bg-crimson hover:scale-105 focus:outline-none focus:ring-2 focus:ring-crimson ${
          canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

const visionContent = {
  eyebrow: "The Vision",
  headline: (
    <>
      The future of health
      <br />
      will not be shaped
      <br />
      by physicians <span className="text-crimson">alone.</span>
    </>
  ),
  paragraphs: [
    <>
      It will be shaped by innovators, researchers, entrepreneurs, policymakers,
      technologists, and healthcare leaders working together to tackle
      humanity's <span className="text-crimson">greatest challenges.</span>
    </>,
    <>
      The HUGEM Pre-Med Academy introduces students to the biological
      foundations of health, the realities of modern healthcare systems, and
      the innovations transforming medicine.
    </>,
    <>
      Through interdisciplinary learning and collaborative problem-solving,
      students explore how they can contribute to building a healthier future
      for all.
    </>,
  ],
};

// Unified body text size across every layout variant
const bodyClass = "text-lg leading-[1.7] md:text-xl md:leading-[1.65]";

function VisionEyebrow() {
  return (
    <div className="mb-8 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper">
      <span className="inline-block h-px w-12 bg-crimson" />
      {visionContent.eyebrow}
    </div>
  );
}

function LayoutSplit() {
  return (
    <div className="relative mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-32">
      <VisionEyebrow />
      <div className="grid grid-cols-12 gap-10 lg:gap-16">
        <div className="col-span-12 md:col-span-6">
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight text-paper md:text-[5.5vw] lg:text-[5vw]">
            {visionContent.headline}
          </h2>
        </div>
        <div className="col-span-12 space-y-8 md:col-span-6">
          {visionContent.paragraphs.map((p, i) => (
            <p key={i} className={`${bodyClass} text-paper/85`}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}


function VisionSection() {
  return (
    <section id="program" className="relative isolate overflow-hidden bg-ink">
      <img
        src={visionBgImg.url}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/85 via-ink/80 to-ink/90" />
      <div className="relative">
        <LayoutSplit />
      </div>
    </section>
  );
}

function ScheduleSection() {

  return (
    <section
      id="schedule"
      className="relative overflow-hidden bg-linear-to-b from-crimson via-[oklch(0.55_0.15_27)] to-[oklch(0.48_0.13_27)] text-paper"
    >
      <div className="mx-auto max-w-[1500px] px-5 pt-24 lg:px-10 lg:pt-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <div className="mb-6 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/80">
              <span className="inline-block h-px w-12 bg-paper/50" />
              Program Schedule
            </div>
            <h2 className="font-display text-5xl leading-[1.1] tracking-tight md:text-7xl">
              <span className="block mb-4">Five days.</span>
              <span className="block">One trajectory.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-4">
            <p className="text-base leading-relaxed text-paper/80 md:text-lg">
              Each morning opens with a question. Each afternoon builds toward
              the capstone.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 bg-paper px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-ink">
              <span>Scroll to move through the week.</span>
              <span className="inline-block h-px w-8 bg-ink/30" />
              <span>→</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <ScheduleLayoutDossier />
      </div>
    </section>
  );
}

function OutingsSection() {
  const outings = [
    {
      title: "Harvard Campus Tour",
      location: "Harvard University, Cambridge",
      description:
        "Walk through 400 years of history on Harvard's iconic grounds. Visit Harvard Yard, the libraries, and learn about storied traditions.",
      img: outingHarvardImg.url,
    },
    {
      title: "Museum Visit",
      location: "Museum of Fine Arts (MFA), Boston",
      description:
        "Visit one of Boston's premier cultural institutions with a guided tour followed by a reception in the museum's elegant event spaces.",
      img: outingMfaImg.url,
    },
    {
      title: "MIT Tour",
      location: "Massachusetts Institute of Technology, Cambridge",
      description:
        "Discover cutting-edge innovation at MIT. Explore the campus, visit notable landmarks, and learn about groundbreaking research.",
      img: mitDomeImg.url,
    },
  ];

  return (
    <section id="outings" className="bg-paper">
      <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="mb-6 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-crimson">
          <span className="inline-block h-px w-12 bg-crimson/50" />
          Outings and Excursions
        </div>
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
            Step outside the classroom.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-ink/70">
            Visit the institutions and landmarks that shape the Boston area's reputation as a global center of learning and culture.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {outings.map((outing, i) => (
            <article key={outing.title} className="group flex flex-col bg-cream">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={outing.img}
                  alt={outing.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
                <div className="absolute left-4 top-4 bg-paper px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-crimson">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                  {outing.location}
                </div>
                <h3 className="font-display text-2xl leading-tight text-ink md:text-3xl">
                  {outing.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-ink/70">
                  {outing.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleLayoutDossier() {
  return (
    <div className="overflow-x-auto pb-24 [scrollbar-color:var(--paper)_transparent] [scrollbar-width:thin]">
      <ol className="flex min-w-max snap-x snap-mandatory gap-0 px-5 lg:px-10">
        {days.map((d, i) => {
          const Icon = d.icon;
          return (
            <li
              key={d.num}
              className="snap-start w-[85vw] max-w-[560px] shrink-0 border-r border-paper/15 pl-8 pr-8 first:pl-0"
            >
              <div className="flex items-baseline justify-between border-b border-paper/20 pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-paper/70">
                  Day {i + 1} / 05
                </span>
              </div>

              <div className="mt-8">
                <Icon className="h-10 w-10 text-paper/90" strokeWidth={1.5} />
                <h3 className="relative mt-4 font-display text-3xl leading-tight text-paper md:text-4xl">
                  {d.title}
                </h3>
              </div>

              <p className="mt-6 text-lg italic text-paper/90">"{d.question}"</p>
              <p className="mt-4 text-base leading-relaxed text-paper/75">
                {d.summary}
              </p>

              {d.tags && (
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {d.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-paper/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-paper/85"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <ul className="mt-10 space-y-0">
                {d.courses.map((c, ci) => (
                  <li
                    key={c}
                    className="group flex items-baseline gap-4 border-t border-paper/10 px-1 py-3 -mx-1 transition-colors hover:bg-paper/10"
                  >
                    <span className="font-display text-xs text-paper/70">
                      {String(ci + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-snug text-paper/90">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
