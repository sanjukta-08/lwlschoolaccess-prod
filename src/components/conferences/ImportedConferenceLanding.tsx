import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUp, Award, CalendarDays, ChevronLeft, ChevronRight, Clock, DollarSign,
  GraduationCap, Globe, Mail, MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Programme } from "@/lib/programmes";
import { conferenceDateLabel, conferenceGrades, conferenceImage, conferenceLocation, conferencePrice } from "@/lib/conferences";
import { conferenceSlugOf } from "@/lib/programme-slug";

import banner from "@/assets/conferences/source/conferences-hwmun-banner.png.asset.json";
import worldmunLogo from "@/assets/conferences/source/conferences-hwmun-harvard-world-logo.png.asset.json";
import lwlLogo from "@/assets/conferences/source/conferences-hwmun-lwl-logo.png.asset.json";
import aboutImage from "@/assets/conferences/source/conferences-hwmun-about.png.asset.json";
import substantive from "@/assets/conferences/source/conferences-hwmun-substantive.png.asset.json";
import cultural from "@/assets/conferences/source/conferences-hwmun-cultural.png.asset.json";
import delegate from "@/assets/conferences/source/conferences-hwmun-delegate.png.asset.json";
import objectiveImage from "@/assets/conferences/source/conferences-hwmun-con-objective.png.asset.json";
import benefitsBackground from "@/assets/conferences/source/conferences-hwmun-bg-section2.png.asset.json";
import movementBackground from "@/assets/conferences/source/conferences-hwmun-bg-section1.png.asset.json";
import contactBackground from "@/assets/conferences/source/conference-contactbg.png.asset.json";
import glimpses from "@/assets/conferences/source/conferences-hwmun-glimpses-collage.jpg.asset.json";
import testimonialDiana from "@/assets/conferences/source/conferences-hwmun-testimonial-diana.png.asset.json";
import testimonialFilibali from "@/assets/conferences/source/conferences-hwmun-testimonial-filibali.png.asset.json";
import testimonialHarshit from "@/assets/conferences/source/conferences-hwmun-testimonial-harshit.png.asset.json";
import icon11 from "@/assets/conferences/source/conferences-hwmun-icon11.png.asset.json";
import icon12 from "@/assets/conferences/source/conferences-hwmun-icon12.png.asset.json";
import icon13 from "@/assets/conferences/source/conferences-hwmun-icon13.png.asset.json";
import icon14 from "@/assets/conferences/source/conferences-hwmun-icon14.png.asset.json";
import icon15 from "@/assets/conferences/source/conferences-hwmun-icon15.png.asset.json";
import icon21 from "@/assets/conferences/source/conferences-hwmun-icon21.png.asset.json";
import icon22 from "@/assets/conferences/source/conferences-hwmun-icon22.png.asset.json";
import icon23 from "@/assets/conferences/source/conferences-hwmun-icon23.png.asset.json";
import icon24 from "@/assets/conferences/source/conferences-hwmun-icon24.png.asset.json";
import icon25 from "@/assets/conferences/source/conferences-hwmun-icon25.png.asset.json";
import icon26 from "@/assets/conferences/source/conferences-hwmun-icon26.png.asset.json";
import key1 from "@/assets/conferences/source/conferences-hwmun-key1.png.asset.json";
import key2 from "@/assets/conferences/source/conferences-hwmun-key2.png.asset.json";
import key3 from "@/assets/conferences/source/conferences-hwmun-key3.png.asset.json";
import key4 from "@/assets/conferences/source/conferences-hwmun-key4.png.asset.json";
import key5 from "@/assets/conferences/source/conferences-hwmun-key5.png.asset.json";
import virginiaLogo from "@/assets/conferences/source/conferences-hwmun-Virginia.png.asset.json";
import ciaLogo from "@/assets/conferences/source/conferences-hwmun-cia-first-logo.png.asset.json";
import gemsLogo from "@/assets/conferences/source/gems-dubai-academy.png.asset.json";
import gardenLogo from "@/assets/conferences/source/logos-garden-school-logo.png.asset.json";
import pathwaysLogo from "@/assets/conferences/source/logos-pathways-logo.jpg.asset.json";
import pathwaysAccreditation from "@/assets/conferences/source/logos-pathways-accreditation.jpg.asset.json";
import snaLogo from "@/assets/conferences/source/logos-sna-logo.png.asset.json";
import spectrumLogo from "@/assets/conferences/source/logos-spectrum-logo.png.asset.json";
import pathwaysCollage from "@/assets/conferences/source/conferences-hwmun-pathways-collage.jpg.asset.json";

const CRIMSON = "#a9222e";
const meetings: Record<string, string> = {
  "hwmun-abu-dhabi": "https://calendly.com/learnwithleaders/30min?utm_source=HWMUN-AbuDhabi-OM",
  "hwmun-bangkok": "https://calendly.com/learnwithleaders/30min?utm_source=HWMUN-Bangkok-OM",
  "hwmun-cambodia": "https://calendly.com/learnwithleaders/30min?utm_source=HWMUN-Cambodia-OM",
  "hwmun-dubai": "https://calendly.com/learnwithleaders/30min?utm_source=HWMUN-Dubai-OM",
  "hwmun-india": "https://calendly.com/learnwithleaders/30min?utm_source=HWMUN-India-OM",
  "hwmun-kazakhstan": "https://calendly.com/learnwithleaders/30min?utm_source=HWMUN-Kazakhstan-OM",
  "hwmun-vietnam": "https://calendly.com/learnwithleaders/30min?utm_source=HWMUN-Vietnam-OM",
};

const hosts: Record<string, { name: string; logo: string; copy?: string }> = {
  "hwmun-abu-dhabi": { name: "Virginia American School", logo: virginiaLogo.url },
  "hwmun-bangkok": { name: "Garden International School, Bangkok", logo: gardenLogo.url },
  "hwmun-cambodia": { name: "CIA First International School", logo: ciaLogo.url },
  "hwmun-dubai": { name: "GEMS Dubai American Academy", logo: gemsLogo.url },
  "hwmun-india": { name: "Pathways School Gurgaon", logo: pathwaysLogo.url, copy: "Pathways School Gurgaon is an IB Continuum School offering all four International Baccalaureate programmes on its award-winning green campus." },
  "hwmun-kazakhstan": { name: "Spectrum International School", logo: spectrumLogo.url },
  "hwmun-vietnam": { name: "SNA International School", logo: snaLogo.url },
};

const objectives = [
  [icon11.url, "Promote Global Awareness & Diplomacy", "Explore pressing international issues through diplomacy and international cooperation."],
  [icon12.url, "Foster Cross-Cultural Understanding", "Celebrate cultural diversity and build lasting friendships across borders."],
  [icon13.url, "Simulate Real-World Decision-Making", "Experience realistic UN bodies and the complexity of global governance."],
  [icon14.url, "Develop Leadership & Communication", "Build negotiation, public speaking, collaboration, and critical-thinking skills."],
  [icon15.url, "Inspire Global Responsibility", "Return to your community with a deeper commitment to positive change."],
] as const;
const benefits = [
  [key1.url, "Develop leadership and diplomatic skills through realistic UN simulations."],
  [key2.url, "Strengthen research, negotiation, public speaking, and resolution writing."],
  [key3.url, "Build meaningful connections with students from different cultures."],
  [key4.url, "Engage deeply with the most urgent issues facing the world."],
  [key5.url, "Earn recognition for participation in the Harvard WorldMUN experience."],
] as const;
const committees = [
  [icon21.url, "Disarmament and International Security Committee (DISEC)", "International peace, security, and responsible multilateral action."],
  [icon22.url, "Economic and Financial Committee (ECOFIN)", "Global economic resilience, development, and financial cooperation."],
  [icon23.url, "Social, Humanitarian and Cultural Committee (SOCHUM)", "Human rights, social development, and humanitarian challenges."],
  [icon24.url, "Special Political and Decolonization Committee (SPECPOL)", "Complex political questions and international cooperation."],
  [icon25.url, "Legal Committee", "International law, accountability, and rights-based frameworks."],
  [icon26.url, "Commission for Social Development (CSocD)", "Inclusive development and community-led solutions."],
] as const;
const schedule = [
  { day: "Day 1", title: "Opening & Committee Sessions", rows: ["Registration and opening ceremony", "Committee session I", "Committee session II"] },
  { day: "Day 2", title: "Full Day Committee Sessions", rows: ["Committee session III", "Delegate networking", "Committee session IV"] },
  { day: "Day 3", title: "Final Sessions & Closing", rows: ["Final committee session", "Resolution voting", "Closing ceremony"] },
];
const testimonials = [
  [testimonialHarshit.url, "WorldMUN helped me become a more confident speaker and a more thoughtful global citizen.", "Harshit"],
  [testimonialDiana.url, "The friendships and perspectives I gained made this an experience I will always remember.", "Diana"],
  [testimonialFilibali.url, "Every committee session challenged me to listen, negotiate, and lead with empathy.", "Filibali"],
] as const;

function StickyNav({ apply }: { apply: string }) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = ["home", "about", "details", "committees"];
      const visible = [...sections].reverse().find((id: string) => (document.getElementById(id)?.getBoundingClientRect().top ?? 9999) < 180);
      setActive(visible ?? "home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <nav className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${scrolled ? "border-neutral-200 bg-white shadow-sm" : "border-transparent bg-white/95"}`}>
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20">
      <Link to="/conferences" aria-label="All conferences"><img src={worldmunLogo.url} alt="Harvard WorldMUN" className="h-12 md:h-16" /></Link>
      <div className="hidden items-center gap-8 md:flex">{["home", "about", "details", "committees"].map((id) => <a key={id} href={`#${id}`} className={`text-sm font-semibold capitalize no-underline ${active === id ? "text-[#a9222e]" : "text-neutral-700 hover:text-[#a9222e]"}`}>{id}</a>)}</div>
      <Button asChild className="rounded bg-[#a9222e] px-5 text-white hover:bg-[#8a1b25]"><a href={apply} target="_blank" rel="noopener noreferrer">Apply now</a></Button>
    </div>
  </nav>;
}

function ScheduleCarousel() {
  const [current, setCurrent] = useState(0);
  const item = schedule[current] ?? schedule[0];
  if (!item) return null;
  return <div className="mx-auto max-w-2xl">
    <div className="relative mx-8 min-h-80 rounded-2xl bg-[#3d1525] p-6 text-white shadow-2xl">
      <h3 className="text-center text-xl font-bold">{item.day}: {item.title}</h3>
      <div className="mt-7 space-y-3">{item.rows.map((row, index) => <div key={row} className="grid grid-cols-[92px_1fr] gap-2"><span className="rounded-full bg-[#c4747e] px-3 py-2 text-center text-xs">Session {index + 1}</span><span className="rounded-full bg-[#fff9f0] px-4 py-2 text-sm font-semibold text-neutral-800">{row}</span></div>)}</div>
      <Button variant="ghost" size="icon" aria-label="Previous day" onClick={() => setCurrent((current + schedule.length - 1) % schedule.length)} className="absolute left-2 top-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"><ChevronLeft /></Button>
      <Button variant="ghost" size="icon" aria-label="Next day" onClick={() => setCurrent((current + 1) % schedule.length)} className="absolute right-2 top-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"><ChevronRight /></Button>
    </div>
    <p className="mt-3 text-center text-sm text-white/60">{current + 1} / {schedule.length}</p>
  </div>;
}

export function ImportedConferenceLanding({ conference }: { conference: Programme }) {
  const slug = conferenceSlugOf(conference);
  const host = hosts[slug];
  const showTestimonials = slug === "hwmun-bangkok" || slug === "hwmun-kazakhstan";
  const [testimonial, setTestimonial] = useState(0);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => { const onScroll = () => setShowTop(window.scrollY > 500); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const date = conferenceDateLabel(conference);
  const location = conferenceLocation(conference);
  const activeTestimonial = testimonials[testimonial] ?? testimonials[0];
  const details = [
    [MapPin, "Venue", conference.format ? `${conference.format} · ${location}` : location],
    [CalendarDays, "Conference Dates", date], [DollarSign, "Conference Fee", conferencePrice(conference)],
    [Clock, "Duration", conference.dur], [GraduationCap, "Eligibility", conferenceGrades(conference)],
    [Award, "Certification", "Certificate of Participation from Harvard World Model United Nations"],
  ] as const;
  return <div className="min-h-dvh bg-white text-neutral-800">
    <StickyNav apply={conference.apply} />
    <main>
      <header id="home" className="relative flex min-h-screen items-center overflow-hidden">
        <img src={conferenceImage(conference) || banner.url} alt={conference.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-28 md:px-12">
          <h1 className="max-w-5xl text-4xl font-bold leading-[1.08] text-white md:text-6xl lg:text-7xl">Harvard World Model<br />United Nations <span className="text-[#ff263a]">{location}</span></h1>
          <p className="mt-4 text-xl text-white/90 md:text-2xl">in collaboration with Learn with Leaders</p>
          <div className="my-5 h-0.5 w-24 bg-[#a9222e]" />
          <p className="text-2xl text-white md:text-3xl">Olympics of Model United Nations</p>
          <Button asChild size="lg" className="mt-7 rounded bg-[#a9222e] px-8 text-lg text-white hover:bg-[#8a1b25]"><a href={conference.apply} target="_blank" rel="noopener noreferrer">{conference.cohorts.length ? "Register Now" : "Register Interest"}</a></Button>
          {host ? <div className="mt-7 inline-block rounded-xl bg-white p-3 shadow-lg"><img src={host.logo} alt={host.name} className="h-16 max-w-64 object-contain md:h-20" /></div> : null}
        </div>
      </header>

      <section className="relative bg-[#a9222e] py-16 text-center md:py-20"><img src={movementBackground.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" /><p className="relative text-3xl font-bold leading-snug text-white md:text-5xl">It's more than a Conference.<br />It's a Global Movement.</p></section>

      <section id="about" className="scroll-mt-20 py-20"><div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold md:text-4xl">About the <span className="text-[#a9222e]">Conference</span></h2>
        <p className="mx-auto mt-5 max-w-4xl text-center leading-relaxed text-neutral-600"><strong className="text-neutral-800">{conference.name}</strong> {conference.about || "brings high-level debate, cultural immersion, and social engagement together in an international learning experience."}</p>
        <div className="mt-12 grid items-center gap-8 md:grid-cols-2"><img src={aboutImage.url} alt="WorldMUN delegates" className="w-full rounded-lg" /><div className="space-y-4 leading-relaxed text-neutral-600"><p>Through thought-provoking discussions, diplomatic collaboration, and hands-on experiences, participants explore real-world global issues and sharpen their skills in negotiation, public speaking, and leadership.</p><p>Recognized for academic rigour and a vibrant international community, WorldMUN fosters empathy, understanding, and a commitment to global cooperation.</p></div></div>
        <div className="mt-14 grid items-center gap-8 md:grid-cols-[1fr_2fr]"><p className="leading-relaxed text-neutral-600">Through informed debate, social events, and the WorldMUN spirit, the experience reaches across cultures and borders to inspire cooperation and friendship.</p><div className="grid grid-cols-3 gap-3">{[[substantive.url,"Substantive Excellence"],[cultural.url,"Cultural Connection"],[delegate.url,"Delegate Experience"]].map(([image,title]) => <article key={title} className="overflow-hidden rounded-lg shadow-md"><img src={image} alt={title} className="h-48 w-full object-cover md:h-72" /><h3 className="bg-[#a9222e] px-2 py-4 text-center text-sm font-bold text-white md:text-lg">{title}</h3></article>)}</div></div>
      </div></section>

      <section id="details" className="scroll-mt-20 bg-[#a9222e] py-14"><div className="mx-auto max-w-6xl px-4"><h2 className="text-center text-3xl font-bold text-white md:text-4xl">Conference Details</h2><div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{details.map(([Icon,label,value]) => <article key={label} className="rounded-xl bg-white p-5"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#a9222e]"><Icon className="text-white" /></div><p className="mt-4 text-[#a9222e]">{label}</p><p className="mt-1 text-lg font-bold text-neutral-900">{value}</p></article>)}</div></div></section>

      <section className="bg-neutral-50 py-20"><div className="mx-auto max-w-6xl px-4"><h2 className="text-center text-3xl font-bold text-[#a9222e] md:text-4xl">Conference Objectives</h2><div className="mt-12 grid items-center gap-6 md:grid-cols-3"><div className="space-y-6">{objectives.slice(0,2).map(([image,title,body]) => <InfoCard key={title} image={image} title={title} body={body} />)}</div><img src={objectiveImage.url} alt="Conference objectives" className="h-full max-h-[430px] w-full rounded-2xl object-cover" /><div className="space-y-6">{objectives.slice(2,4).map(([image,title,body]) => <InfoCard key={title} image={image} title={title} body={body} />)}</div></div><div className="mt-6"><InfoCard image={objectives[4][0]} title={objectives[4][1]} body={objectives[4][2]} horizontal /></div></div></section>

      <section className="relative"><div className="h-[420px]"><img src={benefitsBackground.url} alt="" className="h-full w-full object-cover" /></div><div className="relative z-10 mx-auto -mt-64 max-w-6xl px-4 pb-16"><div className="rounded-3xl bg-[#a9222e] p-8 md:p-14"><h2 className="text-center text-3xl font-bold text-white md:text-4xl">Key Benefits for Students</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{benefits.map(([image,text]) => <article key={text} className="relative min-h-32 overflow-hidden rounded-xl bg-white p-6"><p className="relative z-10 pr-12 text-sm font-semibold text-neutral-700">{text}</p><img src={image} alt="" className="absolute bottom-2 right-2 h-20 w-20 object-contain opacity-60" /></article>)}</div></div></div></section>

      {conference.cohorts.length ? <section className="bg-[#a9222e] py-12"><h2 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">Tentative Conference Schedule</h2><ScheduleCarousel /></section> : null}

      <section id="committees" className="scroll-mt-20 py-20"><div className="mx-auto max-w-6xl px-4"><h2 className="text-center text-3xl font-bold md:text-4xl">World Model United Nations <span className="text-[#a9222e]">Committees</span></h2><div className="mt-12 grid gap-6 md:grid-cols-2">{committees.map(([image,name,body]) => <article key={name} className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm"><img src={image} alt="" className="mx-auto h-14 w-14 object-contain" /><h3 className="mt-5 font-bold text-[#a9222e]">{name}</h3><p className="mt-3 text-sm leading-relaxed text-neutral-600">{body}</p></article>)}</div></div></section>

      <section className="bg-[#a9222e] py-20 text-white"><div className="mx-auto max-w-5xl px-4"><div className="rounded-xl border border-white/15 bg-white/5 p-8 md:p-12"><p className="text-lg text-white/80">About</p><h2 className="mt-1 text-3xl font-bold md:text-4xl">Harvard World Model United Nations</h2><div className="mt-7 space-y-4 leading-relaxed text-white/90"><p>Harvard World Model United Nations is one of the world's most diverse Model United Nations experiences, bringing together delegates from across the world for global dialogue, diplomacy, and cultural exchange.</p><p>At its heart is the WorldMUN Spirit—a commitment to friendship, cooperation, and deeper understanding across borders.</p></div></div></div></section>

      {host ? <section className="bg-white py-20"><div className="mx-auto max-w-5xl px-6"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><p className="font-semibold text-[#a9222e]">Hosted by</p><h2 className="mt-1 text-3xl font-bold text-[#a9222e] md:text-4xl">{host.name}</h2></div><img src={host.logo} alt={host.name} className="h-20 max-w-72 object-contain" /></div>{host.copy ? <p className="mt-8 max-w-3xl leading-relaxed text-neutral-700">{host.copy}</p> : null}{slug === "hwmun-india" ? <><img src={pathwaysAccreditation.url} alt="Pathways accreditations" className="mt-8 max-h-28 max-w-full object-contain" /><img src={pathwaysCollage.url} alt="Pathways School Gurgaon" className="mt-10 w-full rounded-2xl shadow-md" /></> : null}</div></section> : null}

      {showTestimonials && activeTestimonial ? <section className="bg-white py-20"><div className="mx-auto max-w-6xl px-6"><h2 className="max-w-3xl text-3xl font-bold md:text-4xl">Hear what <span className="text-[#a9222e]">past participants</span> have to say</h2><article className="mt-10 flex flex-col gap-6 rounded-[2rem] bg-[#fdf3f4] p-7 sm:flex-row"><img src={activeTestimonial[0]} alt={activeTestimonial[2]} className="h-52 w-40 self-end object-contain object-bottom" /><div className="flex flex-1 flex-col justify-center"><p className="text-lg leading-relaxed">“{activeTestimonial[1]}”</p><strong className="mt-5 text-[#a9222e]">{activeTestimonial[2]}</strong></div></article><div className="mt-6 flex justify-end gap-3"><Button size="icon" aria-label="Previous testimonial" onClick={() => setTestimonial((testimonial + testimonials.length - 1) % testimonials.length)} className="rounded-full bg-black text-white"><ChevronLeft /></Button><Button size="icon" aria-label="Next testimonial" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)} className="rounded-full bg-black text-white"><ChevronRight /></Button></div><img src={glimpses.url} alt="Glimpses from past WorldMUN conferences" className="mt-12 w-full rounded-[2rem] shadow-2xl" /></div></section> : null}

      <section className="relative py-24"><img src={contactBackground.url} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-black/35" /><div className="relative z-10 mx-auto max-w-3xl px-4 text-center"><img src={lwlLogo.url} alt="Learn with Leaders" className="mx-auto h-14" /><h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">Ready to Join Us?</h2><div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"><Button asChild size="lg" className="rounded bg-[#a9222e] px-10 text-lg text-white hover:bg-[#8a1b25]"><a href={conference.apply} target="_blank" rel="noopener noreferrer">{conference.cohorts.length ? "Register Now!" : "Register Interest"}</a></Button>{meetings[slug] ? <Button asChild size="lg" className="rounded bg-[#a9222e] px-10 text-lg text-white hover:bg-[#8a1b25]"><a href={meetings[slug]} target="_blank" rel="noopener noreferrer">Schedule a Meeting</a></Button> : null}</div><div className="mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-4 rounded-xl bg-white p-5 text-sm text-neutral-600 sm:flex-row sm:gap-8"><a href="mailto:team@learnwithleaders.com" className="flex items-center gap-2"><Mail className="h-5 w-5 text-[#a9222e]" />team@learnwithleaders.com</a><a href="https://www.learnwithleaders.com/" className="flex items-center gap-2"><Globe className="h-5 w-5 text-[#a9222e]" />learnwithleaders.com</a></div></div></section>
    </main>
    {showTop ? <Button size="icon" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 z-50 rounded-full bg-neutral-900 text-white"><ArrowUp /></Button> : null}
  </div>;
}

function InfoCard({ image, title, body, horizontal = false }: { image: string; title: string; body: string; horizontal?: boolean }) {
  return <article className={`rounded-xl border border-neutral-200 bg-white p-6 shadow-md ${horizontal ? "flex items-center gap-6" : ""}`}><img src={image} alt="" className="h-12 w-12 flex-none object-contain" /><div><h3 className="font-bold text-neutral-900">{title}</h3><p className="mt-2 text-sm text-neutral-500">{body}</p></div></article>;
}
