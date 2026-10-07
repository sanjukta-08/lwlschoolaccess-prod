import { useEffect, useRef, useState } from "react";

import { campBySlug } from "@/lib/camps";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";

import {
  ArrowDown,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Compass,
  Plus,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock,
  FilePenLine,
  Gavel,
  Globe2,
  GraduationCap,
  HandHeart,
  Landmark,
  Library,
  Lightbulb,
  Map,
  MapPin,
  Megaphone,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import logoAsset from "@/assets/camps/horizons/hugem-logo.png.asset.json";

import lwlLogo from "@/assets/camps/horizons/lwl-logo-white.png.asset.json";
import lawLibrary from "@/assets/camps/horizons/law-library.jpg.asset.json";
import harvardYard from "@/assets/camps/horizons/harvard-yard.jpg.asset.json";
import harvardStudents from "@/assets/camps/horizons/harvard-students.jpg.asset.json";
import harvardCampus from "@/assets/camps/horizons/harvard-campus-beautiful.jpg.asset.json";
import outingHarvardImg from "@/assets/camps/horizons/campus-tour.jpg.asset.json";
import outingMfaImg from "@/assets/camps/horizons/mfa-boston.png.asset.json";
import mitDomeImg from "@/assets/camps/horizons/mit-dome.jpg.asset.json";
import vidHarvard from "@/assets/camps/horizons/Vid_harvard.webm.asset.json";
import behindTheAcademy from "@/assets/camps/horizons/behind-the-academy.jpg.asset.json";
import hadleyImg from "@/assets/camps/horizons/mentors/hadley.jpg.asset.json";
import zainImg from "@/assets/camps/horizons/mentors/zain.jpg.asset.json";
import suhaniImg from "@/assets/camps/horizons/mentors/suhani.jpg.asset.json";
import leahImg from "@/assets/camps/horizons/mentors/leah.jpg.asset.json";
import allisonImg from "@/assets/camps/horizons/mentors/allison.jpg.asset.json";
import alexanderImg from "@/assets/camps/horizons/mentors/alexander.png.asset.json";
import juheeImg from "@/assets/camps/horizons/mentors/juhee.jpg.asset.json";

const BOOK_MEETING_URL = CALENDLY_BOOKING_URL;

/**
 * Applications are owned by the Application Portal / partner site. The live
 * link comes from the shared catalogue; read at render so hydration wins.
 */
const applyUrl = () =>
  campBySlug("prelaw-horizons-harvard")?.applyUrl ??
  "https://apply.learnwithleaders.com/apply/prelaw-academy";

const days = [
  {
    day: "01",
    weekday: "Monday",
    title: "Foundations of the Law",
    icon: BookOpen,
    sessions: [
      {
        name: "Introduction to Legal Terminology & Types of Law",
        question: "What kind of law am I interested in?",
      },
      {
        name: "Introduction to Political Theory & Legal Grounding",
        question: "From ancient Greece to contemporary society — why does law exist?",
      },
      { name: "Guest Lecture" },
    ],
  },
  {
    day: "02",
    weekday: "Tuesday",
    title: "History of the State",
    icon: Landmark,
    sessions: [
      {
        name: "Types of Government",
        question: "What are the differences between democracy, theocracy, and autocracy?",
      },
      {
        name: "History of the United States",
        question: "How and when was the U.S. Constitution written?",
      },
      {
        name: "Political Economy",
        question: "How are governments connected to the economy?",
      },
      {
        name: "Research Methods Workshop",
        question: "How does a lawyer establish facts in a case?",
      },
    ],
  },
  {
    day: "03",
    weekday: "Wednesday",
    title: "Cultural Boundaries & International Law",
    icon: Globe2,
    sessions: [
      {
        name: "Jurisdiction of the United Nations",
        question: "What can the UN do when international law is broken?",
      },
      { name: "Guest Speaker" },
      {
        name: "Media & the Impacts of Globalization",
        question: "How does interconnectedness change the law?",
      },
      {
        name: "Sovereignty",
        question: "Is state independence possible in a globalized world?",
      },
      {
        name: "Legal Writing Workshop",
        question: "How do I write persuasively in an AI-dominated world?",
      },
    ],
  },
  {
    day: "04",
    weekday: "Thursday",
    title: "Revolution & Transformation of Power",
    icon: Megaphone,
    sessions: [
      {
        name: "Legal Ethics",
        question: "When and how are decisions made about changing the law?",
      },
      { name: "Justice", question: "What is justice, and who is justice for?" },
      {
        name: "Law Student Panel",
        question: "What are emerging lawyers thinking about?",
      },
      {
        name: "Capstone Project Briefing",
        question: "You are a policymaker in your home country. Make one change to the law.",
      },
    ],
  },
  {
    day: "05",
    weekday: "Friday",
    title: "Public Service Day",
    icon: HandHeart,
    sessions: [
      {
        name: "Morning — Community Outreach Service Project",
        question:
          "Students partner with a local Cambridge/Boston organization for hands-on volunteer work.",
      },
      {
        name: "Afternoon — Giving Back as an Attorney",
        question: "What does it look like to build a career around service rather than status?",
      },
      {
        name: "Public Interest Law & Government Service Panel",
        question: "Legal aid, public defense, prosecution, and nonprofit advocacy careers.",
      },
      {
        name: "Workshop — Pro Bono & Community Advocacy",
        question: "How do lawyers use their license to serve people who can't afford one?",
      },
    ],
  },
  {
    day: "06",
    weekday: "Saturday · Half Day",
    title: "Argue Your Case",
    icon: Gavel,
    sessions: [
      {
        name: "Capstone Presentations",
        question: "Students argue their proposed legal change before a panel.",
      },
      {
        name: "Awards & Certificate Ceremony",
        question: "Recognition for outstanding capstone arguments and program achievement.",
      },
      { name: "Closing Address" },
      { name: "Farewell Celebration" },
    ],
  },
];

const heroData = {
  eyebrow: "The law is a conversation before it is a verdict.",
  title: "Pre-Law",
  titleAccent: "Academy",
  subtitle: "At Harvard University",
  byline: "by Harvard Undergraduate Global Education Movement",
  brief:
    "A six-day intensive for students ready to explore the law — its history, its contradictions, and the pressing questions that define our world.",
};

const visionParagraphs = [
  "From the courts of ancient Athens to the chambers of the United Nations, the law has always reflected the societies that write it — and the individuals brave enough to challenge it. The HUGEM Pre-Law Academy invites students into that conversation.",
  "Over six intensive days, students engage with legal theory, political history, international law, ethics, and public service. They hear from Harvard Law School professors, practicing lawyers, and law students on the front lines of change.",
  "They spend a full day giving back to the local community and exploring public interest law. And they leave having argued their own case for how the law should be different.",
];

function VisionSection() {
  return (
    <section id="vision" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-crimson">
              Program Vision
            </div>
            <h2 className="mt-6 font-display text-5xl leading-[0.92] md:text-7xl lg:text-[5.5rem]">
              The law is a <span className="text-crimson">living argument.</span>
            </h2>
            <p className="mt-8 max-w-xl border-l-4 border-crimson pl-6 text-xl font-semibold leading-snug text-ink/90 md:text-2xl">
              It is an argument about power, fairness, and human possibility.
            </p>
          </div>
          <div className="space-y-8 border-t border-ink/20 pt-8 text-lg leading-relaxed text-ink/75 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
            {visionParagraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section id="schedule" className="bg-cream">
      <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="border-b border-ink/15 pb-10 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-crimson">
            Program Schedule
          </div>
          <h2 className="mt-5 font-display text-5xl leading-[0.95] md:text-7xl">
            The six-day docket.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink/70">
            Each day adds a new layer of context before students argue their own proposal on
            Saturday.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {days.map((item) => {
            const final = item.day === "06";
            const dayLabel = `Day ${parseInt(item.day)}`;
            return (
              <li
                key={item.day}
                className={`${final ? "border-t-4 border-crimson bg-crimson text-paper" : "border-t-4 border-ink bg-paper text-ink"} p-6 text-center md:p-8`}
              >
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${final ? "text-paper/70" : "text-crimson"}`}
                >
                  {dayLabel} · {item.weekday}
                </span>
                <item.icon
                  className={`mx-auto mt-4 h-6 w-6 ${final ? "text-paper/70" : "text-crimson"}`}
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 font-display text-2xl leading-tight">{item.title}</h3>
                <ul
                  className={`mt-7 divide-y text-sm ${final ? "divide-paper/20" : "divide-ink/10"}`}
                >
                  {item.sessions.map((session) => (
                    <li key={session.name} className="py-3">
                      <span className="font-semibold">{session.name}</span>
                      {session.question ? (
                        <p
                          className={`mt-1 leading-relaxed ${final ? "text-paper/70" : "text-ink/60"}`}
                        >
                          {session.question}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function ProgramDetailsSection() {
  const details = [
    { label: "Dates", value: "11 - 17 January 2027" },
    {
      label: "Format",
      value: (
        <>
          Day Program
          <br />
          <span className="text-paper/60">(Mon - Sat)</span>
        </>
      ),
    },
    { label: "Location", value: "Harvard University, Cambridge, MA" },
    { label: "Eligibility", value: "Grades 8 - 12" },
    {
      label: "Program Hours",
      value: (
        <>
          9 am - 4 pm (Mon - Fri)
          <br />9 am - 12 pm (Sat)
        </>
      ),
    },
  ];

  const included = [
    { text: "Full curriculum & instruction", icon: BookOpen },
    { text: "Lunch provided on program days", icon: UtensilsCrossed },
    { text: "Program-related outings & excursions", icon: MapPin },
    { text: "Interactive workshops & case studies", icon: Users },
    { text: "Certificate of Participation by HUGEM", icon: ScrollText },
    { text: "All program materials & resources", icon: BriefcaseBusiness },
  ];

  return (
    <section id="program-details">
      <div className="relative">
        <img
          src={lawLibrary.url}
          alt="Harvard Law School library reading room"
          className="h-[38vh] min-h-[280px] w-full object-cover md:h-[52vh]"
          loading="lazy"
          width={1600}
          height={912}
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-ink/45 to-ink" />
        <div className="prelaw-grid absolute inset-0 opacity-15" aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/75">
              In-person at Harvard University
            </div>
            <p className="mx-auto mt-5 max-w-3xl font-display text-3xl leading-tight text-paper md:text-5xl">
              Six days inside the rooms where the law is studied.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-ink text-paper">
        <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="flex flex-col gap-8 border-b border-paper/20 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">Program Details</h2>
            <p className="max-w-md text-lg leading-relaxed text-paper/65">
              A focused academic program at Harvard University for students in Grades 8–12.
            </p>
          </div>
          <dl className="grid grid-cols-1 border-paper/20 md:grid-cols-2 lg:grid-cols-5">
            {details.map((item) => (
              <div
                key={item.label}
                className="border-b border-paper/20 py-8 md:px-6 lg:border-r lg:px-7 lg:last:border-r-0"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-crimson">
                  {item.label}
                </dt>
                <dd className="mt-3 font-display text-xl leading-tight text-paper">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-paper">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-crimson p-8 text-paper md:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper/70">
              Tuition & Fees
            </p>
            <div className="mt-5 font-display text-5xl md:text-6xl">1500 USD</div>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-paper/70">per student</p>
            <div className="mt-12 border-t border-paper/30 pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper/70">
                Application Deadline
              </p>
              <p className="mt-3 font-display text-2xl md:text-3xl">31 October 2026</p>
              <a
                href={applyUrl()}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex bg-paper px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-crimson transition-colors hover:bg-ink hover:text-paper"
              >
                Apply Now
              </a>
            </div>
          </div>
          <div className="p-8 md:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-crimson">
              Everything included
            </p>
            <ul className="mt-7 grid gap-px bg-ink/15 md:grid-cols-2">
              {included.map((item) => (
                <li key={item.text} className="flex min-h-24 items-center gap-4 bg-paper p-5">
                  <item.icon className="h-6 w-6 shrink-0 text-crimson" strokeWidth={1.5} />
                  <span className="text-sm font-semibold leading-relaxed text-ink/75">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
        "Walk through Harvard Yard and the historic libraries, tracing the architecture and traditions that have shaped American legal education.",
      img: outingHarvardImg.url,
    },
    {
      title: "Museum Visit",
      location: "Museum of Fine Arts (MFA), Boston",
      description:
        "A guided visit to Boston's premier cultural institution, exploring the intersections of art, ethics, and justice through historical and contemporary collections.",
      img: outingMfaImg.url,
    },
    {
      title: "MIT Tour",
      location: "Massachusetts Institute of Technology, Cambridge",
      description:
        "Discover the innovations coming out of MIT and consider the legal questions surrounding emerging technology, research, and policy.",
      img: mitDomeImg.url,
    },
  ];

  return (
    <section id="outings" className="bg-crimson text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-paper md:text-5xl">
            Outings & Excursions
          </h2>
          <div className="mt-6 h-px w-16 bg-paper/60" />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {outings.map((outing) => (
            <article key={outing.title} className="group flex flex-col">
              <div className="aspect-[3/4] overflow-hidden bg-ink/20">
                <img
                  src={outing.img}
                  alt={outing.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={1067}
                />
              </div>
              <div className="mt-6">
                <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/65">
                  <MapPin className="h-3 w-3" strokeWidth={2} />
                  {outing.location}
                </div>
                <h3 className="border-l-2 border-paper/60 pl-4 font-display text-2xl leading-tight text-paper md:text-3xl">
                  {outing.title}
                </h3>
                <p className="mt-4 border-l-2 border-paper/60 pl-4 text-sm leading-relaxed text-paper/70">
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

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-ink text-paper">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={harvardYard.url}
        className="absolute inset-0 h-full w-full object-cover"
        aria-label="Harvard University campus video"
      >
        <source src={vidHarvard.url} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-linear-to-b from-ink/80 via-ink/60 to-ink/40" />
      <div className="prelaw-grid absolute inset-0 opacity-20" aria-hidden />
      <div className="relative mx-auto grid min-h-screen max-w-[1500px] grid-cols-12 items-center px-5 py-32 lg:px-10">
        <div className="col-span-12 flex flex-col items-center text-center">
          <p className="max-w-3xl text-center text-lg font-medium italic leading-relaxed text-paper/80 md:text-xl lg:text-2xl">
            “{heroData.eyebrow}”
          </p>
          <h1 className="mt-8 font-display text-6xl leading-[0.92] md:text-8xl lg:text-[7.5rem]">
            {heroData.title}
            <span className="block text-crimson">{heroData.titleAccent}</span>
          </h1>
          <span className="mt-5 block font-display text-2xl font-medium text-paper/80 md:text-3xl lg:text-4xl">
            {heroData.subtitle}
          </span>
          <div className="mt-8 flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-3 bg-crimson px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-paper">
              {heroData.byline}
            </span>
            <span className="inline-flex items-center gap-3 bg-paper px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink">
              Dates: <span className="text-crimson">11th - 17th January 2027</span>
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper/75 md:text-lg">
            {heroData.brief}
          </p>
        </div>
      </div>
      <a
        href="#vision"
        aria-label="Continue to program vision"
        className="absolute bottom-20 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-paper/70 transition-colors hover:text-paper"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
          Enter the argument
        </span>
        <ArrowDown className="h-5 w-5 animate-bounce text-crimson" />
      </a>
    </section>
  );
}

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

function MentorsSection() {
  return (
    <section id="mentors" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-crimson">
              Harvard Student Mentors
            </div>
            <h2 className="mt-5 font-display text-5xl leading-[0.95] md:text-7xl">
              Counsel from those <span className="text-crimson">already arguing.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink/70 lg:col-span-5">
            Current Harvard undergraduates from HUGEM lead every session — sharing research, campus
            life, and the questions that shaped their own journeys.
          </p>
        </div>

        <MentorCarousel />
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
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Scroll mentors left"
        className={`absolute -left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-ink text-paper shadow-lg transition-all hover:bg-crimson hover:scale-105 focus:outline-none focus:ring-2 focus:ring-crimson lg:inline-flex ${
          canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {mentors.map((m) => (
          <article
            key={m.name}
            className="group flex shrink-0 snap-start w-[min(85vw,320px)] flex-col border border-ink/10 bg-cream p-5 md:w-[340px] md:p-6"
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
            <div className="mt-5">
              <h3 className="font-display text-2xl leading-tight md:text-3xl">{m.name}</h3>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson">
                {m.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base">{m.bio}</p>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll mentors right"
        className={`absolute -right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-ink text-paper shadow-lg transition-all hover:bg-crimson hover:scale-105 focus:outline-none focus:ring-2 focus:ring-crimson lg:inline-flex ${
          canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

const hugemImpact = [
  { value: "5,000", label: "Youth leaders trained", Icon: Users },
  { value: "12", label: "Countries with HUGEM programs", Icon: Globe2 },
  { value: "1,000s", label: "Locally impactful projects designed", Icon: Lightbulb },
  { value: "∞", label: "Connections and opportunities provided", Icon: Compass },
];

function HugemSection() {
  return (
    <section id="hugem" className="bg-ink text-paper">
      <div className="relative">
        <div className="prelaw-lines absolute inset-0 opacity-10" aria-hidden />
        <div className="relative mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <img
                src={behindTheAcademy.url}
                alt="Harvard University campus — behind the Pre-Law Academy"
                className="w-full object-cover"
                style={{ aspectRatio: "4/5" }}
                loading="lazy"
              />
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-crimson">
                Behind the Academy
              </div>
              <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-6xl lg:text-7xl">
                HUGEM —{" "}
                <span className="text-crimson">
                  teaching youth the responsibility of global citizenship.
                </span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-paper/80">
                Each year, HUGEM develops programs around the central theme of{" "}
                <span className="text-paper">global citizenship</span> — first, by helping students
                see how challenges in their own community intersect with the most pressing
                international issues, and second, by building the skills to act on them.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-paper/70">
                Leadership workshops, entrepreneurial pitch challenges, and pre-professional
                conferences combine learning from Harvard Trainers, hands-on problem-solving, and
                networking with peers — so students embrace their education and future careers with
                empathy, autonomy, and the ability to make an actionable impact locally, nationally,
                and internationally.
              </p>

              <div className="mt-10 grid gap-px bg-paper/15 sm:grid-cols-2">
                {[
                  {
                    title: "HUGEM Innovation Challenge (HIC)",
                    body: "Students research, stress-test, and pitch their own products, with personalized feedback from Harvard Trainers in venture capital and frontier technologies.",
                  },
                  {
                    title: "Workshops & Conferences",
                    body: "Leadership workshops, pitch challenges, and pre-professional conferences designed to build critical thinking and real-world impact.",
                  },
                ].map((p) => (
                  <div key={p.title} className="bg-ink p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-crimson">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-paper/70">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-crimson">
                Our Impact
              </div>
              <h3 className="mt-5 font-display text-4xl leading-[0.95] md:text-5xl">
                Building a global movement of young leaders.
              </h3>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-px bg-paper/15 lg:grid-cols-4">
                {hugemImpact.map(({ value, label, Icon }) => (
                  <div key={label} className="group bg-ink p-6">
                    <Icon
                      className="mb-6 h-7 w-7 text-crimson transition-transform duration-300 group-hover:-translate-y-1"
                      strokeWidth={1.5}
                    />
                    <div className="font-display text-4xl leading-none sm:text-5xl">{value}</div>
                    <div className="mt-3 max-w-[16ch] text-[11px] uppercase leading-relaxed tracking-[0.14em] text-paper/55">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "Who is eligible for the Pre-Law Academy?",
    answer:
      "The program is open to students in grades 8 – 12 who are curious about law, politics, justice, and global affairs. No legal background or prior coursework is required.",
  },
  {
    question: "When and where does the program take place?",
    answer:
      "The Pre-Law Academy runs 11 – 17 January 2027, in person at Harvard University in Cambridge, MA.",
  },
  {
    question: "Is this a residential or day program?",
    answer:
      "This is a day program. Program hours are 9 am – 4 pm Monday through Friday, and 9 am – 12 pm on Saturday. Overnight accommodation is not provided.",
  },
  {
    question: "What is included in the program fee?",
    answer:
      "The fee covers the full curriculum and instruction, lunch on program days, program-related outings and excursions, interactive workshops and case studies, a Certificate of Participation by HUGEM, and all program materials and resources.",
  },
  {
    question: "What will students work on during the week?",
    answer:
      "Students move through legal history, political theory, international law, ethics, public service, and legal advocacy, building toward a final capstone proposal they argue on the last day.",
  },
  {
    question: "Who leads the sessions?",
    answer:
      "Current Harvard undergraduates from HUGEM lead sessions and mentor students throughout the week, alongside workshops, community service, and guest speakers.",
  },
  {
    question: "Are there outings during the program?",
    answer:
      "Yes. The schedule includes a Harvard campus tour, a visit to the Museum of Fine Arts, Boston, and an MIT tour.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream text-ink">
      <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-crimson">
              FAQ
            </div>
            <h2 className="mt-5 font-display text-5xl leading-[0.95] md:text-6xl">
              Questions, <span className="text-crimson">answered.</span>
            </h2>
            <p className="mt-7 max-w-sm text-lg leading-relaxed text-ink/70">
              Everything you need to know before joining the Pre-Law Academy at Harvard University.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-ink/15 border-t border-ink/15">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={faq.question} className="py-6">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-xl leading-tight md:text-2xl">
                        {faq.question}
                      </span>
                      <span
                        className={`mt-1 inline-flex shrink-0 items-center justify-center border p-2 transition-colors duration-300 ${
                          isOpen ? "border-crimson bg-crimson text-paper" : "border-ink/20 text-ink"
                        }`}
                      >
                        <Plus
                          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                          strokeWidth={2}
                        />
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="max-w-3xl pt-4 text-lg leading-relaxed text-ink/70">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PrelawCampPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-10">
          <a href="#top" aria-label="HUGEM Pre-Law Academy home">
            <img
              src={logoAsset.url}
              alt="HUGEM — Harvard Undergraduate Global Education Movement"
              className="h-11 w-auto md:h-12"
              width={250}
              height={50}
            />
          </a>
          <nav className="hidden items-center gap-8 text-base font-semibold md:flex lg:text-lg">
            <a href="#vision" className="transition-colors hover:text-crimson">
              Vision
            </a>
            <a href="#program-details" className="transition-colors hover:text-crimson">
              Details
            </a>
            <a href="#mentors" className="transition-colors hover:text-crimson">
              Mentors
            </a>
            <a href="#faq" className="transition-colors hover:text-crimson">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={BOOK_MEETING_URL}
              target="_blank"
              rel="noreferrer"
              className="border border-ink px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper sm:px-4 sm:text-xs sm:tracking-[0.16em]"
            >
              Book a Meeting
            </a>
            <a
              href={applyUrl()}
              target="_blank"
              rel="noreferrer"
              className="border border-crimson bg-crimson px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:border-ink hover:bg-ink sm:px-4 sm:text-xs sm:tracking-[0.16em]"
            >
              Apply Now
            </a>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />

        <VisionSection />

        <section className="relative overflow-hidden bg-crimson text-paper">
          <div className="prelaw-lines absolute inset-0 opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
            <Scale className="h-10 w-10 text-paper/70" strokeWidth={1.25} />
            <blockquote className="mt-8 max-w-6xl font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
              “Law is not what lawyers know. It is a question every generation must answer for
              itself.”
            </blockquote>
          </div>
        </section>

        <section id="framework" className="bg-cream">
          <div className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-crimson">
                  The Framework
                </div>
                <h2 className="mt-5 font-display text-5xl leading-none md:text-7xl">
                  Building tomorrow's legal minds.
                </h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-ink/70">
                Legal literacy, critical thinking, public service, and the confidence to argue for
                change.
              </p>
            </div>

            <div className="grid border border-ink/15 bg-ink/15 md:grid-cols-3 md:gap-px">
              {[
                {
                  number: "I",
                  title: "Who It's For",
                  text: "Students curious about law, politics, justice, and global affairs — no legal background required.",
                  icon: Users,
                },
                {
                  number: "II",
                  title: "How It Works",
                  text: "Six days of lectures, workshops, community service, and guest speakers building toward a final policy capstone.",
                  icon: BriefcaseBusiness,
                },
                {
                  number: "III",
                  title: "What You'll Gain",
                  text: "Legal literacy, critical thinking skills, a spirit of public service, and the confidence to argue for change.",
                  icon: Sparkles,
                },
              ].map((item) => (
                <article key={item.title} className="group bg-paper p-8 md:min-h-[390px] md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl text-crimson">{item.number}</span>
                    <item.icon
                      className="h-7 w-7 text-ink/50 transition-colors group-hover:text-crimson"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mt-20 font-display text-3xl">{item.title}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-ink/70">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProgramDetailsSection />

        <ScheduleSection />

        <OutingsSection />

        <section id="capstone" className="grid bg-ink text-paper lg:grid-cols-2">
          <div className="relative min-h-[560px] overflow-hidden">
            <img
              src={harvardCampus.url}
              alt="Historic Harvard campus architecture"
              className="absolute inset-0 h-full w-full object-cover opacity-65"
              loading="lazy"
              width={1600}
              height={1000}
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
            <div className="relative flex h-full items-end p-8 md:p-14">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-paper/60">
                  Final Policy Capstone
                </div>
                <h2 className="mt-5 font-display text-5xl leading-[0.95] md:text-7xl">
                  Argue your case.
                </h2>
              </div>
            </div>
          </div>
          <div className="flex items-center p-8 md:p-14 lg:p-20">
            <div>
              <Gavel className="h-12 w-12 text-crimson" strokeWidth={1.25} />
              <p className="mt-10 text-2xl font-semibold leading-snug md:text-4xl">
                You are a policymaker in your home country. Make one change to the law.
              </p>
              <p className="mt-7 text-lg leading-relaxed text-paper/70">
                On the final day, students argue their proposed legal change before a panel.
                Outstanding capstone arguments and program achievement are recognized during the
                awards and certificate ceremony.
              </p>
              <div className="mt-10 grid gap-px bg-paper/15 sm:grid-cols-3">
                {[
                  [FilePenLine, "Research"],
                  [ShieldCheck, "Policy"],
                  [Scale, "Argument"],
                ].map(([Icon, label]) => {
                  const Mark = Icon as typeof FilePenLine;
                  return (
                    <div key={label as string} className="bg-ink p-6">
                      <Mark className="h-6 w-6 text-crimson" strokeWidth={1.5} />
                      <div className="mt-4 text-sm font-semibold uppercase tracking-[0.18em]">
                        {label as string}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <MentorsSection />

        <HugemSection />

        <FAQSection />

        <section className="bg-crimson text-paper">
          <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-8 px-5 py-24 lg:px-10 lg:py-32">
            <div className="col-span-12 lg:col-span-8">
              <ScrollText className="h-9 w-9 text-paper/70" strokeWidth={1.4} />
              <h2 className="mt-8 font-display text-5xl leading-[0.95] md:text-7xl">
                Enter the conversation. Leave ready to change it.
              </h2>
            </div>
            <div className="col-span-12 flex flex-col items-start justify-end gap-8 lg:col-span-4">
              <p className="text-xl leading-relaxed text-paper/80">
                The HUGEM Pre-Law Academy builds legal literacy, critical thinking, public service,
                and confidence.
              </p>
              <a
                href={applyUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex bg-paper px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-crimson transition-colors hover:bg-ink hover:text-paper"
              >
                Apply Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-paper">
        <div className="border-t border-paper/15">
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
                className="transition-colors hover:text-crimson"
              >
                team@learnwithleaders.com
              </a>
              <a
                href="https://www.learnwithleaders.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-crimson"
              >
                www.learnwithleaders.com
              </a>
            </div>
            <p className="mt-8 text-xs text-paper/40">
              Harvard Undergraduate Global Education Movement · Pre-Law Academy at Harvard
              University · 11 – 17 January 2027
            </p>
          </div>
        </div>

        <div className="border-t border-paper/15">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-6 lg:px-10">
            <p className="text-xs text-paper/40">© HUGEM 2027</p>
            <a
              href="#top"
              className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-crimson"
            >
              Back to top <ArrowDown className="h-4 w-4 rotate-180" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
