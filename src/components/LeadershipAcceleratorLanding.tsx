import { Link } from "@tanstack/react-router";
import { WingMark } from "@/components/WingMark";
import { SiteFooter } from "@/components/SiteFooter";
import { AddToCalendar } from "@/components/AddToCalendar";
import { SaveButton } from "@/components/SaveButton";
import logoAsset from "@/assets/lwl-logo.png.asset.json";
import { DR_JOJO_PROGRAMME } from "@/lib/programmes";
import {
  Calendar,
  Clock,
  Video,
  Award,
  BookOpen,
  Target,
  Sparkles,
  CheckCircle2,
  Users,
  Lightbulb,
  TrendingUp,
  Presentation,
  ShieldCheck,
  ChevronDown,
  GraduationCap,
  Tag,
} from "lucide-react";
import { useState } from "react";

const APPLY_URL = "https://apply.learnwithleaders.com/apply/leadership-entrepreneurship-acceletor-online";

export function LeadershipAcceleratorLanding() {
  const p = DR_JOJO_PROGRAMME;
  const cohort = p.cohorts[0]!;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const sessions = [
    {
      day: "Session 1",
      date: "Friday, April 10, 2027",
      duration: "3 Hours",
      title: "Leadership Foundations & Strategic Vision",
      icon: Users,
      color: "from-blue-600/10 to-indigo-600/5",
      borderColor: "border-blue-500/30",
      badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      topics: [
        "Core leadership styles and self-awareness",
        "Personal branding & vision setting",
        "Strategic decision-making frameworks",
        "Effective team dynamics and communication",
      ],
    },
    {
      day: "Session 2",
      date: "Saturday, April 11, 2027",
      duration: "3 Hours",
      title: "Entrepreneurial Mindset & Opportunity Discovery",
      icon: Lightbulb,
      color: "from-amber-600/10 to-orange-600/5",
      borderColor: "border-amber-500/30",
      badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
      topics: [
        "Spotting real-world market gaps",
        "Problem formulation and customer empathy",
        "Brainstorming high-impact venture ideas",
        "Formulating value proposition statements",
      ],
    },
    {
      day: "Session 3",
      date: "Friday, April 17, 2027",
      duration: "3 Hours",
      title: "Business Models & Financial Strategy",
      icon: TrendingUp,
      color: "from-emerald-600/10 to-teal-600/5",
      borderColor: "border-emerald-500/30",
      badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
      topics: [
        "Designing the Business Model Canvas",
        "Revenue streams & basic unit economics",
        "Go-to-market strategies & acquisition loops",
        "Financial awareness for young founders",
      ],
    },
    {
      day: "Session 4",
      date: "Saturday, April 18, 2027",
      duration: "3 Hours",
      title: "Venture Pitching & Executive Presentation",
      icon: Presentation,
      color: "from-purple-600/10 to-pink-600/5",
      borderColor: "border-purple-500/30",
      badgeColor: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      topics: [
        "Crafting a compelling executive pitch deck",
        "Public speaking and storytelling techniques",
        "Live venture pitch presentations on Zoom",
        "Direct personalized feedback from Dr. Jojo",
      ],
    },
  ];

  const outcomes = [
    {
      icon: Presentation,
      title: "Venture Pitch Deck & Business Canvas",
      description: "Students complete a full pitch deck and Business Model Canvas ready for university portfolio applications.",
    },
    {
      icon: Award,
      title: "Official Certificate of Completion",
      description: "Recognized Certificate awarded for completing the Pre-University Entrepreneurship & Venture Building Program.",
    },
    {
      icon: Users,
      title: "Direct Mentorship from Dr. Jojo",
      description: "Personalized guidance, live feedback on pitches, and leadership assessment throughout the 4 sessions.",
    },
    {
      icon: Target,
      title: "Verifiable Profile Artefact",
      description: "A standout project line for college admissions essays, LinkedIn, and extracurricular resumes.",
    },
  ];

  const skills = [
    "Strategic Leadership",
    "Venture Building",
    "Business Model Canvas",
    "Executive Pitching",
    "Financial Awareness",
    "Problem Discovery",
    "Design Thinking",
    "Public Speaking",
  ];

  const faqs = [
    {
      q: "Who is this program specifically designed for?",
      a: "This program is organized for students of Mas Camarena School, Spain (Grades 8–12 / Ages 13–18) who wish to build strategic leadership, venture building skills, and executive presentation confidence.",
    },
    {
      q: "What is the tuition fee for the program?",
      a: "The tuition fee is EUR 350 per student. This covers the full 4-day intensive live program (12 hours live on Zoom), direct mentorship and live pitch review with Dr. Jojo, Business Model Canvas tools, and an official Certificate of Completion.",
    },
    {
      q: "What are the session dates and schedule?",
      a: "The program spans 4 days: Friday & Saturday, April 10 & 11, and Friday & Saturday, April 17 & 18, 2027. Each session is 3 hours long, delivered live via Zoom.",
    },
    {
      q: "What is the mode of delivery?",
      a: "All sessions are conducted live online via Zoom with interactive discussions, breakout group work, and direct live feedback from Dr. Jojo.",
    },
    {
      q: "What will students build by the end of the program?",
      a: "Students will build a complete Business Model Canvas and an executive Venture Pitch Deck, which they will present live during the final session.",
    },
    {
      q: "Will participants receive a certificate?",
      a: "Yes, all students who complete the 4 sessions and present their final venture project receive an official Certificate of Completion.",
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* --- PAGE SPECIFIC STICKY NAVBAR --- */}
      <header className="sticky top-0 z-50 border-b border-gold-line/60 bg-paper/95 backdrop-blur-md shadow-soft">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6">
          {/* Left: LWL Brand Logo Only */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center no-underline">
              <img src={logoAsset.url} alt="Learn with Leaders" className="h-9 sm:h-10 md:h-11 w-auto object-contain" />
            </Link>
          </div>

          {/* Center: Anchor Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[0.86rem] font-bold text-ink-soft">
            <a href="#about" className="hover:text-crimson-deep transition-colors no-underline">About</a>
            <a href="#details" className="hover:text-crimson-deep transition-colors no-underline">Format</a>
            <a href="#outcomes" className="hover:text-crimson-deep transition-colors no-underline">Outcomes</a>
            <a href="#dr-jojo" className="hover:text-crimson-deep transition-colors no-underline">Faculty</a>
            <a href="#schedule" className="hover:text-crimson-deep transition-colors no-underline">Schedule</a>
            <a href="#pricing" className="hover:text-crimson-deep transition-colors no-underline">Pricing</a>
            <a href="#faq" className="hover:text-crimson-deep transition-colors no-underline">FAQ</a>
          </nav>

          {/* Right: Apply Now CTA */}
          <div className="flex items-center gap-3">
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-crimson px-5 py-2 text-[0.84rem] font-bold text-paper shadow-soft hover:bg-crimson-deep transition-all no-underline shrink-0"
            >
              Apply Now →
            </a>
          </div>
        </div>

        {/* Mobile Anchor Scroll Bar */}
        <div className="flex lg:hidden overflow-x-auto border-t border-line/60 px-4 py-2 gap-4 text-[0.78rem] font-bold text-ink-soft no-scrollbar">
          <a href="#about" className="shrink-0 hover:text-crimson-deep no-underline">About</a>
          <a href="#details" className="shrink-0 hover:text-crimson-deep no-underline">Format</a>
          <a href="#outcomes" className="shrink-0 hover:text-crimson-deep no-underline">Outcomes</a>
          <a href="#dr-jojo" className="shrink-0 hover:text-crimson-deep no-underline">Faculty</a>
          <a href="#schedule" className="shrink-0 hover:text-crimson-deep no-underline">Schedule</a>
          <a href="#pricing" className="shrink-0 hover:text-crimson-deep no-underline">Pricing</a>
          <a href="#faq" className="shrink-0 hover:text-crimson-deep no-underline">FAQ</a>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden border-b border-gold-line/50 bg-gradient-to-b from-wash via-paper to-wash pt-5 pb-16">
        {/* Decorative Grid Pattern Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#c5a059_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-35" />

        {/* Multi-Layered Aurora Lighting Flares & Glowing Spotlights */}
        <div className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 h-[550px] w-[1050px] bg-[radial-gradient(ellipse_at_top,rgba(184,41,47,0.18)_0%,rgba(197,160,89,0.24)_45%,transparent_75%)] blur-3xl" />
        <div className="pointer-events-none absolute top-1/4 -left-28 h-96 w-96 rounded-full bg-gradient-to-tr from-gold/25 to-crimson/15 blur-3xl opacity-80" />
        <div className="pointer-events-none absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-gradient-to-bl from-crimson/20 to-gold/20 blur-3xl opacity-80" />
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-36 w-[650px] rounded-full bg-gold/20 blur-[90px]" />

        <div className="page-shell relative z-10 text-center">
          {/* Top School Logo Lockup */}
          <div className="mb-6 flex justify-center items-center">
            <div className="group rounded-2xl border-2 border-gold-line/70 bg-white/95 px-7 py-3.5 shadow-lift backdrop-blur-md transition-all hover:scale-[1.02] hover:shadow-glow">
              <img
                src="/mas-camarena-logo.png"
                alt="Complejo Educativo Mas Camarena International School - IB World School"
                className="h-12 sm:h-14 md:h-16 w-auto max-w-full object-contain"
              />
            </div>
          </div>

          {/* Top Pill with Glow */}
          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-gold-line/90 bg-paper/95 px-5 py-2 text-gold-deep shadow-soft backdrop-blur-md">
            <WingMark size={14} />
            <span className="mono-label text-[0.76rem] font-extrabold tracking-wider text-ink">
              Mas Camarena School, Spain · Live Online Program
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mx-auto max-w-[1000px] font-display text-[clamp(2.2rem,5.8vw,4.5rem)] font-extrabold leading-[1.03] tracking-tight text-ink">
            Pre-University Entrepreneurship &amp;{" "}
            <span className="bg-gradient-to-r from-crimson via-crimson-deep to-gold-deep bg-clip-text text-transparent">
              Venture Building Program
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-[50em] font-serif text-[clamp(1.2rem,2.8vw,1.6rem)] font-semibold text-crimson-deep">
            Led by Dr. Jojo O&apos;Driscoll-Kearney
          </p>
          <p className="mx-auto mt-1 max-w-[50em] text-[0.92rem] font-extrabold tracking-widest text-gold-deep uppercase">
            Harvard Business Impact Faculty &amp; Hult Professor · Former Meta CLO
          </p>

          <p className="mx-auto mt-5 max-w-[58em] text-[clamp(1.05rem,2.2vw,1.2rem)] leading-relaxed text-ink-soft">
            A transformative 4-day intensive pre-university program for high school students to build strategic leadership,
            venture creation frameworks, business modeling, and executive pitch confidence.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-crimson to-crimson-deep px-9 py-4 text-[1.05rem] font-bold text-paper shadow-[0_4px_24px_rgba(184,41,47,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(184,41,47,0.5)] no-underline"
            >
              Apply Now →
            </a>
            <SaveButton p={p} c={cohort} variant="wide" />
            <AddToCalendar p={p} c={cohort} size="md" />
          </div>

          {/* Feature Highlight Badges (Placed below Apply Buttons) */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5 max-w-[850px] mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[0.8rem] font-bold text-emerald-800 dark:text-emerald-300">
              <Tag size={14} />
              Fee: EUR 350
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-line/60 bg-gold/10 px-3.5 py-1.5 text-[0.8rem] font-bold text-gold-deep">
              <Sparkles size={14} />
              4 Days · 12 Hours Live
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-[0.8rem] font-bold text-blue-700 dark:text-blue-400">
              <Video size={14} />
              Live Interactive Zoom Masterclasses
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-[0.8rem] font-bold text-purple-700 dark:text-purple-400">
              <Award size={14} />
              Verifiable Pitch Deck &amp; Certificate
            </span>
          </div>

          {/* Quick Facts Grid (Hero Level) */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-[1120px] mx-auto text-left">
            <div className="group flex items-start gap-4 rounded-2xl border border-gold-line/70 bg-paper/90 p-5 shadow-soft backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-lift">
              <div className="rounded-xl bg-crimson/10 p-3 text-crimson group-hover:bg-crimson group-hover:text-white transition-colors">
                <Calendar size={24} />
              </div>
              <div>
                <span className="mono-label block text-[0.68rem] text-ink-faint uppercase font-bold tracking-wider">Start Date</span>
                <b className="mt-0.5 block text-[0.95rem] font-extrabold text-ink whitespace-nowrap">10th April 2027</b>
                <small className="text-[0.76rem] text-ink-soft">4 Live Session Days</small>
              </div>
            </div>

            <div className="group flex items-start gap-4 rounded-2xl border border-gold-line/70 bg-paper/90 p-5 shadow-soft backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-lift">
              <div className="rounded-xl bg-gold/15 p-3 text-gold-deep group-hover:bg-gold-deep group-hover:text-white transition-colors">
                <Clock size={24} />
              </div>
              <div>
                <span className="mono-label block text-[0.68rem] text-ink-faint uppercase font-bold tracking-wider">Session Duration</span>
                <b className="mt-0.5 block text-[0.95rem] font-extrabold text-ink">3-Hour Sessions</b>
                <small className="text-[0.76rem] text-ink-soft">Interactive &amp; Live</small>
              </div>
            </div>

            <div className="group flex items-start gap-4 rounded-2xl border border-gold-line/70 bg-paper/90 p-5 shadow-soft backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-lift">
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Video size={24} />
              </div>
              <div>
                <span className="mono-label block text-[0.68rem] text-ink-faint uppercase font-bold tracking-wider">Learning Mode</span>
                <b className="mt-0.5 block text-[0.95rem] font-extrabold text-ink">Online via Zoom</b>
                <small className="text-[0.76rem] text-ink-soft">Live Discussions &amp; Pitching</small>
              </div>
            </div>

            <div className="group flex items-start gap-4 rounded-2xl border border-gold-line/70 bg-paper/90 p-5 shadow-soft backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-lift">
              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <GraduationCap size={24} />
              </div>
              <div>
                <span className="mono-label block text-[0.68rem] text-ink-faint uppercase font-bold tracking-wider">Audience &amp; Grades</span>
                <b className="mt-0.5 block text-[0.95rem] font-extrabold text-ink">Mas Camarena School</b>
                <small className="text-[0.76rem] text-ink-soft">Grades 8–12 (Ages 13–18)</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT THE PROGRAM SECTION (BENTO GRID DESIGN) --- */}
      <section id="about" className="py-20 border-b border-line bg-paper relative">
        <div className="page-shell relative z-10 max-w-[1140px]">
          {/* Section Header */}
          <div className="mx-auto max-w-[860px] text-center mb-12">
            <span className="mono-label mb-2.5 inline-flex items-center gap-2 text-gold-deep font-bold uppercase tracking-wider">
              <WingMark size={14} />
              About the Program
            </span>
            <h2 className="font-display text-[clamp(2.2rem,4.8vw,3.6rem)] font-extrabold leading-[1.05] text-ink">
              Building Real Founders,{" "}
              <span className="text-crimson-deep italic">
                Not Just Learning Concepts
              </span>
            </h2>
          </div>

          {/* Bento Grid Container */}
          <div className="grid gap-6">

            {/* TOP BENTO CARD: Hero Quote & Dr. Jojo Mentorship Statement */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-gold-line/70 bg-wash p-8 sm:p-10 shadow-soft transition-all duration-300 hover:border-gold-line hover:shadow-lift">
              <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_260px] items-center">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/10 px-3.5 py-1 text-[0.76rem] font-extrabold uppercase tracking-widest text-crimson">
                    <Sparkles size={13} />
                    Transformative Entrepreneurship Experience
                  </span>
                  
                  <blockquote className="font-serif text-[clamp(1.15rem,2.5vw,1.45rem)] font-extrabold text-crimson-deep leading-relaxed">
                    &ldquo;It&apos;s a multi-day program where kids don&apos;t just learn about leadership — they build a real startup idea and pitch it live, to real mentors.&rdquo;
                  </blockquote>

                  <p className="text-[0.92rem] leading-relaxed text-ink-soft max-w-[720px]">
                    It&apos;s run by Dr. Jojo. She&apos;s a former CEO, teaches at Harvard Business Impact and Hult, and spent 20+ years training leaders at places like Meta. But in the room, none of that matters — she makes it funny, fast, and safe enough that even the shyest student ends up standing up and pitching out loud.
                  </p>
                </div>

                {/* Right Side: Dr. Jojo Faculty Card */}
                <div className="rounded-2xl border border-gold-line/80 bg-paper p-5 text-center shadow-soft space-y-3">
                  <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-gold-line shadow-soft">
                    <img
                      src="/dr-jojo.jpg"
                      alt="Dr. Jojo O'Driscoll-Kearney"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <b className="block text-[0.95rem] font-bold text-ink">Dr. Jojo O&apos;Driscoll-Kearney</b>
                    <span className="text-[0.74rem] font-extrabold text-gold-deep uppercase tracking-wider block mt-0.5">
                      Program Lead &amp; Mentor
                    </span>
                  </div>
                  <div className="rounded-xl border-l-2 border-crimson bg-wash p-2.5 text-[0.78rem] font-serif italic text-crimson-deep font-semibold">
                    &ldquo;Kids walk out saying: &lsquo;I actually built something.&rsquo;&rdquo;
                  </div>
                </div>
              </div>
            </div>

            {/* MIDDLE BENTO ROW: 3 Core Methodological Pillars */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Pillar 1 Card */}
              <div className="group relative flex flex-col justify-between rounded-3xl border border-gold-line/70 bg-wash p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-line hover:shadow-lift">
                <div>
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-xl bg-crimson/10 px-3.5 py-1.5 text-[0.78rem] font-extrabold text-crimson">
                    <Sparkles size={14} />
                    Strategic Thinking
                  </div>

                  <h3 className="font-display text-[1.25rem] font-extrabold text-ink mb-2">
                    Strengths &amp; Founder Thinking
                  </h3>

                  <p className="text-[0.88rem] leading-relaxed text-ink-soft">
                    Students figure out their unique strengths and values, then learn how founders actually think — using the same Design Thinking process Stanford and IDEO use, with AI as their brainstorming partner.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold-line/40 flex items-center justify-between text-[0.76rem] font-bold text-crimson-deep">
                  <span>Stanford &amp; IDEO Process</span>
                  <span>AI Brainstorming</span>
                </div>
              </div>

              {/* Pillar 2 Card */}
              <div className="group relative flex flex-col justify-between rounded-3xl border border-gold-line/70 bg-wash p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-line hover:shadow-lift">
                <div>
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-xl bg-gold/15 px-3.5 py-1.5 text-[0.78rem] font-extrabold text-gold-deep">
                    <Users size={14} />
                    Leadership &amp; Teamwork
                  </div>

                  <h3 className="font-display text-[1.25rem] font-extrabold text-ink mb-2">
                    Team Leadership &amp; Collaboration
                  </h3>

                  <p className="text-[0.88rem] leading-relaxed text-ink-soft">
                    Students form venture teams, learn how to influence and lead without needing a formal title, and practice presenting ideas with constructive mentor Q&amp;A and peer collaboration.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold-line/40 flex items-center justify-between text-[0.76rem] font-bold text-gold-deep">
                  <span>Lead Without Title</span>
                  <span>Mentor Q&amp;A &amp; Feedback</span>
                </div>
              </div>

              {/* Pillar 3 Card */}
              <div className="group relative flex flex-col justify-between rounded-3xl border border-gold-line/70 bg-wash p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-line hover:shadow-lift">
                <div>
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-xl bg-purple-500/10 px-3.5 py-1.5 text-[0.78rem] font-extrabold text-purple-600">
                    <TrendingUp size={14} />
                    Venture Creation
                  </div>

                  <h3 className="font-display text-[1.25rem] font-extrabold text-ink mb-2">
                    Business Models &amp; Pitching
                  </h3>

                  <p className="text-[0.88rem] leading-relaxed text-ink-soft">
                    Students develop complete Business Model Canvases and executive pitch decks, gaining the confidence to present live startup ideas directly to mentors and faculty.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold-line/40 flex items-center justify-between text-[0.76rem] font-bold text-purple-600">
                  <span>Business Model Canvas</span>
                  <span>Executive Pitch Deck</span>
                </div>
              </div>
            </div>

            {/* BOTTOM BENTO CARD: Full-Width Admissions Impact Card */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-wash p-8 sm:p-10 shadow-soft transition-all duration-300 hover:border-emerald-500/60 hover:shadow-lift">
              <div className="grid gap-6 lg:grid-cols-12 items-center">
                <div className="lg:col-span-4 space-y-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3.5 py-1 text-[0.76rem] font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                    <Award size={14} />
                    University Admissions Differentiator
                  </span>

                  <h3 className="font-display text-[1.45rem] sm:text-[1.65rem] font-extrabold text-ink leading-tight">
                    Key University Admission Enhancers
                  </h3>

                  <p className="text-[0.86rem] text-ink-soft leading-relaxed">
                    Longer programs build in key University admission enhancers designed to create verifiable proof of student impact and initiative.
                  </p>
                </div>

                <div className="lg:col-span-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-500/30 bg-paper p-4 shadow-soft">
                    <b className="block text-[0.9rem] font-bold text-ink mb-1">Portfolio &amp; Deliverables</b>
                    <p className="text-[0.82rem] text-ink-soft leading-relaxed">
                      Website design, commercials development, marketing plans &amp; change leadership models.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/30 bg-paper p-4 shadow-soft">
                    <b className="block text-[0.9rem] font-bold text-ink mb-1">Official Recommendations</b>
                    <p className="text-[0.82rem] text-ink-soft leading-relaxed">
                      References and recommendation letters for top performers signed directly by Dr. Jojo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PROGRAM DETAILS & FORMAT SECTION --- */}
      <section id="details" className="py-12 sm:py-16 border-b border-line bg-wash relative">
        <div className="page-shell">
          <div className="text-center max-w-[850px] mx-auto mb-10">
            <span className="mono-label mb-2 inline-flex items-center gap-2 text-gold font-bold uppercase tracking-wider">
              <WingMark size={14} />
              Program Details &amp; Format
            </span>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight text-ink">
              Live Online <em className="text-crimson-deep italic">Zoom Masterclasses</em>
            </h2>
          </div>

          <div className="mx-auto max-w-[1020px] grid gap-6 md:grid-cols-2 items-center">
            {/* Left Column: Zoom Live Masterclass Image */}
            <div className="w-full">
              <div className="relative mx-auto w-full">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-500/20 via-gold/20 to-crimson/20 blur-xl opacity-70" />
                <div className="relative rounded-2xl border-2 border-gold-line bg-paper shadow-lift overflow-hidden group">
                  <img
                    src="/zoom-live-masterclass.jpg"
                    alt="High school students participating in live interactive Zoom masterclass with Dr. Jojo"
                    className="w-full h-[280px] sm:h-[310px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-xl border border-white/30 bg-black/60 p-3 backdrop-blur-md text-white">
                    <span className="mono-label text-[0.68rem] font-bold text-gold-light uppercase tracking-wider block">
                      Live Interactive Zoom Sessions
                    </span>
                    <p className="text-[0.82rem] font-bold mt-0.5">
                      Direct live mentorship, breakout groups &amp; real-time pitch feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Compact 2x2 Specifications Grid */}
            <div className="w-full">
              <div className="grid gap-3.5 grid-cols-2">
                <div className="rounded-2xl border border-gold-line/70 bg-paper p-4 shadow-soft transition-all hover:shadow-lift flex flex-col justify-between min-h-[135px]">
                  <div className="mb-2 inline-flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-crimson/10 text-crimson shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className="mono-label block text-[0.66rem] text-ink-faint uppercase font-bold tracking-wider">Program Dates</span>
                    <b className="mt-0.5 block text-[0.9rem] font-extrabold text-crimson-deep">10, 11 &amp; 17, 18 April 2027</b>
                    <small className="text-[0.72rem] text-ink-soft">2 Consecutive Weekends</small>
                  </div>
                </div>

                <div className="rounded-2xl border border-gold-line/70 bg-paper p-4 shadow-soft transition-all hover:shadow-lift flex flex-col justify-between min-h-[135px]">
                  <div className="mb-2 inline-flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-gold/15 text-gold-deep shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="mono-label block text-[0.66rem] text-ink-faint uppercase font-bold tracking-wider">Session Time</span>
                    <b className="mt-0.5 block text-[0.9rem] font-extrabold text-ink">3 Hours / Session</b>
                    <small className="text-[0.72rem] text-ink-soft">12 Hours Live Learning</small>
                  </div>
                </div>

                <div className="rounded-2xl border border-gold-line/70 bg-paper p-4 shadow-soft transition-all hover:shadow-lift flex flex-col justify-between min-h-[135px]">
                  <div className="mb-2 inline-flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 shrink-0">
                    <Video size={18} />
                  </div>
                  <div>
                    <span className="mono-label block text-[0.66rem] text-ink-faint uppercase font-bold tracking-wider">Learning Mode</span>
                    <b className="mt-0.5 block text-[0.9rem] font-extrabold text-blue-700 dark:text-blue-400">Live via Zoom</b>
                    <small className="text-[0.72rem] text-ink-soft">Interactive Masterclasses</small>
                  </div>
                </div>

                <div className="rounded-2xl border border-gold-line/70 bg-paper p-4 shadow-soft transition-all hover:shadow-lift flex flex-col justify-between min-h-[135px]">
                  <div className="mb-2 inline-flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <span className="mono-label block text-[0.66rem] text-ink-faint uppercase font-bold tracking-wider">School &amp; Audience</span>
                    <b className="mt-0.5 block text-[0.9rem] font-extrabold text-purple-700 dark:text-purple-400">Mas Camarena School</b>
                    <small className="text-[0.72rem] text-ink-soft">Grades 8–12 (Ages 13–18)</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- KEY OUTCOMES & SKILLS SECTION --- */}
      <section id="outcomes" className="py-16 border-b border-line bg-paper">
        <div className="page-shell">
          <div className="text-center max-w-[800px] mx-auto">
            <span className="mono-label mb-2 inline-flex items-center gap-2 text-gold font-bold uppercase tracking-wider">
              <WingMark size={14} />
              Key Outcomes
            </span>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight">
              What Students <em className="text-crimson-deep">Finish With</em>
            </h2>
            <p className="mt-2 text-[0.94rem] text-ink-soft">
              Tangible deliverables, portfolio artefacts, and skills recognized by top universities.
            </p>
          </div>

          {/* Outcome Cards Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o) => {
              const IconComponent = o.icon;
              return (
                <div key={o.title} className="rounded-2xl border border-line bg-wash p-5 text-left shadow-soft">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-crimson/10 text-crimson">
                    <IconComponent size={20} />
                  </div>
                  <b className="block text-[0.98rem] font-bold text-ink">{o.title}</b>
                  <p className="mt-1.5 text-[0.84rem] text-ink-soft leading-relaxed">{o.description}</p>
                </div>
              );
            })}
          </div>

          {/* Skills Matrix Pill Tags */}
          <div className="mt-12 rounded-2xl border border-gold-line/60 bg-gradient-to-r from-gold/5 via-paper to-crimson/5 p-6 text-center shadow-soft">
            <h3 className="font-display text-[1.1rem] font-bold text-ink">Core Skills Mastered</h3>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold-line/80 bg-paper px-4 py-2 text-[0.84rem] font-bold text-ink shadow-soft"
                >
                  <Sparkles size={14} className="text-gold" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- DEDICATED DR. JOJO SECTION (COMPACT) --- */}
      <section id="dr-jojo" className="py-14 border-b border-line bg-wash">
        <div className="page-shell">
          <div className="mx-auto max-w-[920px] rounded-2xl border border-gold-line/70 bg-paper p-6 sm:p-8 shadow-soft">
            <div className="grid gap-6 sm:grid-cols-[180px_1fr] items-center">
              {/* Doctor Jojo Compact Portrait */}
              <div className="text-center">
                <div className="relative mx-auto overflow-hidden rounded-xl border border-gold-line bg-wash shadow-soft w-[160px] sm:w-[180px] aspect-[3/4]">
                  <img
                    src="/dr-jojo.jpg"
                    alt="Dr. Jojo O'Driscoll-Kearney"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Bio & Key Highlights */}
              <div className="space-y-3">
                <div>
                  <span className="mono-label text-[0.7rem] font-bold text-gold-deep uppercase tracking-wider block mb-1">
                    Program Lead &amp; Dean of Programs
                  </span>
                  <h3 className="font-display text-[1.4rem] font-extrabold text-ink">
                    Dr. Jojo O&apos;Driscoll-Kearney
                  </h3>
                  <p className="text-[0.84rem] font-bold text-crimson-deep uppercase tracking-wide">
                    Harvard Business Impact Faculty &amp; Hult Professor · Former Meta CLO
                  </p>
                </div>

                <p className="text-[0.88rem] leading-relaxed text-ink-soft">
                  Former Chief Learning Officer at Meta with 20+ years of board, government, and C-suite advisory experience across 5 continents. Has trained over 50,000+ leaders worldwide.
                </p>

                {/* Key Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-md border border-gold-line/60 bg-wash px-2.5 py-1 text-[0.75rem] font-bold text-ink">
                    PhD Leadership
                  </span>
                  <span className="rounded-md border border-gold-line/60 bg-wash px-2.5 py-1 text-[0.75rem] font-bold text-ink">
                    Oxford MBA-F
                  </span>
                  <span className="rounded-md border border-gold-line/60 bg-wash px-2.5 py-1 text-[0.75rem] font-bold text-ink">
                    Harvard Org. Psychology
                  </span>
                  <span className="rounded-md border border-gold-line/60 bg-wash px-2.5 py-1 text-[0.75rem] font-bold text-ink">
                    WEF Council Member
                  </span>
                </div>

                {/* Quote */}
                <div className="rounded-xl border-l-2 border-crimson bg-wash p-3 text-[0.84rem] italic text-ink mt-2">
                  &ldquo;Young people don&apos;t need more lectures. They need someone to hand them the tools, name the problem, and step out of the way.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SESSION SCHEDULE BREAKDOWN SECTION --- */}
      <section id="schedule" className="py-16 border-b border-line bg-paper">
        <div className="page-shell">
          <div className="text-center max-w-[700px] mx-auto mb-10">
            <span className="mono-label mb-2 inline-flex items-center gap-2 text-gold font-bold uppercase tracking-wider">
              <WingMark size={14} />
              Session Roadmap
            </span>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight text-ink">
              4-Day Live <em className="text-crimson-deep">Session Schedule</em>
            </h2>
            <p className="text-[0.9rem] text-ink-soft mt-1">
              Detailed topic breakdown for each live masterclass session.
            </p>
          </div>

          {/* Session Breakdown Grid */}
          <div className="grid gap-6 md:grid-cols-2 max-w-[1020px] mx-auto">
            {sessions.map((s) => {
              const IconComp = s.icon;
              return (
                <div
                  key={s.day}
                  className={`rounded-2xl border bg-wash p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift ${s.borderColor}`}
                >
                  <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center rounded-xl p-2.5 ${s.badgeColor}`}>
                        <IconComp size={22} />
                      </span>
                      <div>
                        <span className="mono-label text-[0.7rem] text-gold-deep font-bold uppercase">{s.day} · {s.duration}</span>
                        <h3 className="font-display text-[1.1rem] font-bold text-ink">{s.title}</h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-[0.84rem] font-bold text-crimson-deep">{s.date}</p>

                  <ul className="mt-3 space-y-2 text-[0.86rem] text-ink-soft">
                    {s.topics.map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- PRICING & TUITION SECTION --- */}
      <section id="pricing" className="py-16 border-b border-line bg-gradient-to-b from-paper via-wash to-paper relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-gradient-to-tr from-gold/15 via-crimson/10 to-transparent blur-3xl opacity-70" />

        <div className="page-shell relative z-10 max-w-[1020px]">
          <div className="text-center max-w-[700px] mx-auto mb-10">
            <span className="mono-label mb-2 inline-flex items-center gap-2 text-gold-deep font-bold uppercase tracking-wider">
              <WingMark size={14} />
              Program Fee
            </span>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight text-ink">
              Program <em className="text-crimson-deep">Pricing</em>
            </h2>
          </div>

          {/* Pricing Card */}
          <div className="mx-auto max-w-[720px] rounded-3xl border-2 border-gold-line/80 bg-paper/95 p-8 sm:p-10 shadow-lift backdrop-blur-md relative">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-6 border-b border-line pb-6">
              <div>
                <span className="mono-label block text-[0.74rem] font-extrabold uppercase tracking-wider text-ink-faint">
                  Total Program Fee
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display text-[clamp(2.8rem,5vw,3.8rem)] font-black text-ink leading-none">
                    EUR 350
                  </span>
                  <span className="text-[0.92rem] font-bold text-ink-soft">
                    / student
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-display text-[1.05rem] font-bold text-ink">
                What&apos;s Included in the Fee:
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2 text-[0.88rem] text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>12 Hours Live</strong> interactive Zoom masterclasses across 4 session days</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>Direct Mentorship</strong> &amp; live pitch review by Dr. Jojo O&apos;Driscoll-Kearney</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>Business Model Canvas</strong> &amp; Executive Venture Pitch Deck frameworks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>Official Certificate</strong> of Completion from Learn with Leaders</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>Letter of Recommendation</strong> opportunity for standout venture pitches</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>School Cohort</strong> exclusive to Mas Camarena School (Grades 8–12)</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-line/60">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-crimson to-crimson-deep px-8 py-3.5 text-center text-[0.98rem] font-bold text-paper shadow-[0_4px_20px_rgba(184,41,47,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(184,41,47,0.45)] no-underline"
              >
                Apply Now for EUR 350 →
              </a>
              <div className="flex items-center gap-2 text-[0.78rem] font-semibold text-ink-soft">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>Secure Online Registration via Learn with Leaders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-16 border-b border-line bg-wash">
        <div className="page-shell max-w-[860px]">
          <div className="text-center mb-10">
            <span className="mono-label mb-2 inline-flex items-center gap-2 text-gold font-bold uppercase tracking-wider">
              <WingMark size={14} />
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-[clamp(1.75rem,3.8vw,2.5rem)] font-extrabold">
              Have Questions About <em className="text-crimson-deep">the Accelerator?</em>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-gold-line/70 bg-paper shadow-soft transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-[1rem] font-bold text-ink"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-gold-deep transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-line/60 px-5 pb-5 pt-3 text-[0.88rem] leading-relaxed text-ink-soft">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA BANNER --- */}
      <section className="py-16 bg-gradient-to-r from-wash via-paper to-wash">
        <div className="page-shell text-center max-w-[760px]">
          <span className="mono-label mb-2 inline-flex items-center gap-2 text-gold font-bold">
            <WingMark size={14} />
            Secure Your Spot
          </span>
          <h2 className="font-display text-[clamp(1.8rem,4.2vw,3rem)] font-extrabold leading-tight">
            Ready to Accelerate Your <em className="text-crimson-deep">Leadership Potential?</em>
          </h2>
          <p className="mt-3 text-[0.96rem] text-ink-soft">
            April 10, 11 &amp; 17, 18, 2027 · 3-Hour Sessions · Live on Zoom
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-crimson px-9 py-4 text-[1rem] font-bold text-paper shadow-lift transition-all hover:-translate-y-0.5 hover:bg-crimson-deep no-underline"
            >
              Apply Now →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
