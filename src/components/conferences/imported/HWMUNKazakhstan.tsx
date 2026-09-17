import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Programme } from "@/lib/programmes";
import { conferenceDateLabel, conferenceGrades, conferenceLocation, conferencePrice } from "@/lib/conferences";
import { Link } from "@tanstack/react-router";
import hwmunHeroImgAsset from "@/assets/conferences/source/conferences-hwmun-banner.png.asset.json";
import worldmunLogoAsset from "@/assets/conferences/source/conferences-hwmun-harvard-world-logo.png.asset.json";
import aboutImgAsset from "@/assets/conferences/source/conferences-hwmun-about.png.asset.json";
import substantiveImgAsset from "@/assets/conferences/source/conferences-hwmun-substantive.png.asset.json";
import culturalImgAsset from "@/assets/conferences/source/conferences-hwmun-cultural.png.asset.json";
import delegateImgAsset from "@/assets/conferences/source/conferences-hwmun-delegate.png.asset.json";
import objectivesImgAsset from "@/assets/conferences/source/conferences-hwmun-con-objective.png.asset.json";
import key1Asset from "@/assets/conferences/source/conferences-hwmun-key1.png.asset.json";
import key2Asset from "@/assets/conferences/source/conferences-hwmun-key2.png.asset.json";
import key3Asset from "@/assets/conferences/source/conferences-hwmun-key3.png.asset.json";
import key4Asset from "@/assets/conferences/source/conferences-hwmun-key4.png.asset.json";
import key5Asset from "@/assets/conferences/source/conferences-hwmun-key5.png.asset.json";
import icon21Asset from "@/assets/conferences/source/conferences-hwmun-icon21.png.asset.json";
import icon22Asset from "@/assets/conferences/source/conferences-hwmun-icon22.png.asset.json";
import icon23Asset from "@/assets/conferences/source/conferences-hwmun-icon23.png.asset.json";
import icon24Asset from "@/assets/conferences/source/conferences-hwmun-icon24.png.asset.json";
import icon25Asset from "@/assets/conferences/source/conferences-hwmun-icon25.png.asset.json";
import icon26Asset from "@/assets/conferences/source/conferences-hwmun-icon26.png.asset.json";
import icon11Asset from "@/assets/conferences/source/conferences-hwmun-icon11.png.asset.json";
import icon12Asset from "@/assets/conferences/source/conferences-hwmun-icon12.png.asset.json";
import icon13Asset from "@/assets/conferences/source/conferences-hwmun-icon13.png.asset.json";
import icon14Asset from "@/assets/conferences/source/conferences-hwmun-icon14.png.asset.json";
import icon15Asset from "@/assets/conferences/source/conferences-hwmun-icon15.png.asset.json";
import lwlLogoAsset from "@/assets/conferences/source/conferences-hwmun-lwl-logo.png.asset.json";
import spectrumLogoAsset from "@/assets/conferences/source/logos-spectrum-logo.png.asset.json";
import contactBgAsset from "@/assets/conferences/source/conference-contactbg.png.asset.json";
import bgSection1Asset from "@/assets/conferences/source/conferences-hwmun-bg-section1.png.asset.json";
import bgSection2Asset from "@/assets/conferences/source/conferences-hwmun-bg-section2.png.asset.json";
import testimonialHarshitAsset from "@/assets/conferences/source/conferences-hwmun-testimonial-harshit.png.asset.json";
import testimonialDianaAsset from "@/assets/conferences/source/conferences-hwmun-testimonial-diana.png.asset.json";
import testimonialFilibaliAsset from "@/assets/conferences/source/conferences-hwmun-testimonial-filibali.png.asset.json";
import glimpsesCollageAsset from "@/assets/conferences/source/conferences-hwmun-glimpses-collage.jpg.asset.json";

const hwmunHeroImg = hwmunHeroImgAsset.url;
const worldmunLogo = worldmunLogoAsset.url;
const aboutImg = aboutImgAsset.url;
const substantiveImg = substantiveImgAsset.url;
const culturalImg = culturalImgAsset.url;
const delegateImg = delegateImgAsset.url;
const objectivesImg = objectivesImgAsset.url;
const key1 = key1Asset.url;
const key2 = key2Asset.url;
const key3 = key3Asset.url;
const key4 = key4Asset.url;
const key5 = key5Asset.url;
const icon21 = icon21Asset.url;
const icon22 = icon22Asset.url;
const icon23 = icon23Asset.url;
const icon24 = icon24Asset.url;
const icon25 = icon25Asset.url;
const icon26 = icon26Asset.url;
const icon11 = icon11Asset.url;
const icon12 = icon12Asset.url;
const icon13 = icon13Asset.url;
const icon14 = icon14Asset.url;
const icon15 = icon15Asset.url;
const lwlLogo = lwlLogoAsset.url;
const spectrumLogo = spectrumLogoAsset.url;
const contactBg = contactBgAsset.url;
const bgSection1 = bgSection1Asset.url;
const bgSection2 = bgSection2Asset.url;
const testimonialHarshit = testimonialHarshitAsset.url;
const testimonialDiana = testimonialDianaAsset.url;
const testimonialFilibali = testimonialFilibaliAsset.url;
const glimpsesCollage = glimpsesCollageAsset.url;
import {
  MapPin, Calendar, DollarSign, Clock, GraduationCap, Award,
  Mail, Globe, ArrowUp,
  ChevronLeft, ChevronRight,
} from "lucide-react";

const CALENDLY_URL = "https://calendly.com/learnwithleaders/30min?utm_source=HWMUN-Kazakhstan-OM&utm_medium=HWMUN-Kazakhstan-OM&utm_campaign=HWMUN-Kazakhstan-OM&utm_id=HWMUN-Kazakhstan-OM";
const CRIMSON = "#a9222e";


const objectives = [
  { icon: icon11, title: "Promote Global Awareness & Diplomacy", description: "Encourage delegates to explore pressing international issues through the lens of diplomacy and international cooperation." },
  { icon: icon12, title: "Foster Cross-Cultural Understanding", description: "Create an inclusive environment that celebrates cultural diversity and builds lasting friendships across borders." },
  { icon: icon13, title: "Simulate Real-World Decision-Making", description: "Provide realistic simulations of UN bodies to help students understand the complexity of global governance." },
  { icon: icon14, title: "Develop Leadership & Communication Skills", description: "Enhance participants' abilities in negotiation, public speaking, collaboration, and critical thinking." },
  { icon: icon15, title: "Inspire Civic Engagement & Global Responsibility", description: "Empower young leaders to return to their communities with a deeper sense of civic duty and commitment to positive change." },
];

const benefits = [
  { icon: key1, text: "Gain a deeper understanding of global issues, cultures, and international institutions." },
  { icon: key2, text: "Enhance negotiation, public speaking, and diplomacy skills through debates and resolutions." },
  { icon: key3, text: "Boost confidence, critical thinking, and creative problem-solving through immersive experiences." },
  { icon: key4, text: "Build leadership, teamwork, and collaboration skills in diverse, high-pressure settings." },
  { icon: key5, text: "Build a global network with peers across Southeast Asia, including future leaders and changemakers." },
];

const schedule = [
  {
    day: "Day 1 (2:30 pm - 8:00 pm)", title: "Opening & Committee Sessions",
    sessions: [
      { time: "2:30 pm - 4:00 pm", activity: "Registration and Lunch" },
      { time: "4:00 pm - 5:30 pm", activity: "Opening Ceremony" },
      { time: "5:30 pm - 8:00 pm", activity: "Committee Session 1" },
    ],
  },
  {
    day: "Day 2 (8:00 am - 4:30 pm)", title: "Full Day Committee Sessions",
    sessions: [
      { time: "8:00 am - 8:45 am", activity: "Check-ins and Snacks" },
      { time: "8:45 am - 9:00 am", activity: "Transition" },
      { time: "9:00 am - 12:00 pm", activity: "Committee Session 2" },
      { time: "12:00 pm - 1:00 pm", activity: "Lunch" },
      { time: "1:00 pm - 4:00 pm", activity: "Committee Session 3" },
      { time: "4:00 pm - 4:30 pm", activity: "Feedback and Snacks" },
    ],
  },
  {
    day: "Day 3 (8:00 am - 4:30 pm)", title: "Final Sessions & Closing",
    sessions: [
      { time: "8:00 am - 8:45 am", activity: "Check-in and Snacks" },
      { time: "8:45 am - 9:00 am", activity: "Transition" },
      { time: "9:00 am - 12:00 pm", activity: "Committee Session 4" },
      { time: "12:00 pm - 1:00 pm", activity: "Lunch" },
      { time: "1:00 pm - 3:00 pm", activity: "Committee Session" },
      { time: "3:00 pm - 4:30 pm", activity: "Closing Ceremony and Award Distribution" },
    ],
  },
];

const testimonials = [
  {
    quote: "It was our first time experiencing an English-format MUN, and I won't lie — I was nervous. But the moment I started speaking, the stress just melted away. The chairs, the delegates, the entire team... everyone was so kind. It's a different experience from what we're used to, but I loved it just as much.",
    author: "FILIBALI & BOA MARIA",
    school: "HWMUN Ivory Coast",
    image: testimonialFilibali,
  },
  {
    quote: "I have never experienced a MUN this big. It was very interesting to discover how I can collaborate from an European perspective and seeing how my country itself, Italy, connects with other countries. This has been a wonderful experience and I love this MUN so far.",
    author: "DIANA ROBITSKAYA",
    school: "HWMUN Kazakhstan",
    image: testimonialDiana,
  },
  {
    quote: "The skill I used the most in this conference was public speaking which I usually do not use in my classes but this conference made me speak a lot and helped me develop public speaking and debating skills. It also helped me overcome my fear of public speaking and made me a lot better.",
    author: "HARSHIT",
    school: "HWMUN India",
    image: testimonialHarshit,
  },
];

const committees = [
  { icon: icon21, name: "GA: Disarmament and International Security Committee (DISEC)", topic: "Cobalt Mining in the Congo", description: "Address the human cost of cobalt mining in the DRC, where children and civilians are exploited under inhumane conditions. Delegates will examine the international community's role and propose multilateral solutions to regulate supply chains and protect vulnerable communities." },
  { icon: icon22, name: "GA: Economic and Financial Committee (ECOFIN)", topic: "International Monetary Fund Bailouts and their Consequences", description: "Explore IMF interventions in countries facing repeated financial crises. Through case studies of Pakistan, Egypt, and Côte d'Ivoire, delegates will assess whether IMF policies have fostered sustainable development or entrenched debt cycles." },
  { icon: icon23, name: "GA: Social, Humanitarian, and Cultural Committee (SOCHUM)", topic: "Healthcare Treatment and Stigmas Surrounding its Provision", description: "Examine cultural, legal, and economic barriers limiting access to health rights worldwide. Delegates will debate solutions to combat stigmatisation and ensure equitable healthcare provision." },
  { icon: icon24, name: "GA: Special Political and Decolonization Committee (SPECPOL)", topic: "Protecting and Preserving Biodiversity", description: "Address the global biodiversity crisis, with wildlife populations declining by nearly 70% since 1970. Delegates will debate solutions reflecting their nations' ecological and geopolitical interests." },
  { icon: icon25, name: "GA: Legal Committee", topic: "Digital Learning and Educational Inequities", description: "Investigate how disparities in digital access widen global educational inequalities. Delegates will develop rights-based frameworks to support equitable digital learning worldwide." },
  { icon: icon26, name: "ECOSOC: Commission for Social Development (CSocD)", topic: "Collectivised Action for National Development", description: "Explore how local, community-led approaches can drive effective poverty reduction. Delegates will consider how systems-level interventions can be adapted globally across diverse international contexts." },
];

function StickyNav({ apply }: { apply: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "about", "details", "committees"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "details", label: "Details" },
    { id: "committees", label: "Committees" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-white/95"}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/conferences">
          <img src={worldmunLogo} alt="WorldMUN" className="h-12 md:h-16" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-sm font-medium transition-colors ${activeSection === link.id ? "text-[#a9222e]" : "text-gray-700 hover:text-[#a9222e]"}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={apply}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#a9222e] text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-[#8a1b25] transition-colors"
          >
            REGISTER NOW
          </a>
        </div>
      </div>
    </nav>
  );
}

function ScheduleCard({ day, sessions, isActive }: { day: string; sessions: { time: string; activity: string }[]; isActive: boolean }) {
  return (
    <div className={`bg-[#fcf3f4] rounded-[2rem] p-8 md:p-10 shadow-2xl border border-white/10 transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-40"}`}>
      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#a9222e] mb-6 text-left">{day}</h3>
      <div className="space-y-4 md:space-y-5">
        {sessions.map((s, i) => (
          <div key={i} className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-4 items-baseline text-left">
            <span className="text-gray-900 font-semibold text-sm md:text-base whitespace-nowrap">
              {s.time}
            </span>
            <span className="text-gray-800 font-medium text-sm md:text-base">
              {s.activity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleCarousel() {
  const [current, setCurrent] = useState(0);

  const getCardStyle = (idx: number) => {
    const diff = idx - current;
    if (diff === 0) return "z-30 scale-100 opacity-100 translate-x-0";
    if (diff === 1) return "z-20 scale-[0.92] opacity-60 translate-x-16";
    if (diff === -1) return "z-20 scale-[0.92] opacity-60 -translate-x-16";
    return "z-10 scale-[0.85] opacity-0 pointer-events-none";
  };

  return (
    <div className="relative max-w-2xl mx-auto px-6 md:px-0">
      <div className="relative" style={{ height: '420px' }}>
        {schedule.map((day, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${getCardStyle(idx)}`}
          >
            <div className="w-full max-w-lg">
              <ScheduleCard day={day.day} sessions={day.sessions} isActive={idx === current} />
            </div>
          </div>
        ))}
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-40 bg-black hover:bg-gray-950 disabled:opacity-30 rounded-full p-3 text-white transition-colors shadow-lg flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrent(Math.min(schedule.length - 1, current + 1))}
          disabled={current === schedule.length - 1}
          className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-40 bg-black hover:bg-gray-950 disabled:opacity-30 rounded-full p-3 text-white transition-colors shadow-lg flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center justify-center mt-1">
        <span className="text-sm text-white/60 font-medium">{current + 1} / {schedule.length}</span>
      </div>
    </div>
  );
}

export default function HWMUNKazakhstan({ conference }: { conference: Programme }) {
  const REGISTER_URL = conference.apply;
  const conferenceDetails = [
    { icon: MapPin, label: "Venue", value: conference.format ? `${conference.format} · ${conferenceLocation(conference)}` : conferenceLocation(conference) },
    { icon: Calendar, label: "Conference Dates", value: conferenceDateLabel(conference) },
    { icon: DollarSign, label: "Conference Fee", value: conferencePrice(conference) },
    { icon: Clock, label: "Duration", value: conference.dur },
    { icon: GraduationCap, label: "Eligibility", value: conferenceGrades(conference) },
    { icon: Award, label: "Certification", value: "Certificate of Participation from Harvard World Model United Nations" },
  ];
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
      <StickyNav apply={REGISTER_URL} />

      {/* Hero */}
      <header id="home" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={hwmunHeroImg} alt="HWMUN Kazakhstan" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-6 w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-2">
            Harvard World Model<br />United Nations{" "}
            <span style={{ color: '#ff263a' }}>Kazakhstan 2027</span>
          </h1>
          <p className="text-white/90 text-xl md:text-2xl italic mb-1">in collaboration with Learn with Leaders</p>
          <div className="w-24 h-0.5 bg-[#a9222e] my-4" />
          <p className="text-white text-2xl md:text-3xl mb-2">Olympics of Model United Nations</p>
          <div className="flex flex-col items-start gap-4">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#a9222e] hover:bg-[#8a1b25] text-white font-semibold px-8 py-3 rounded transition-colors text-lg"
            >
              Register Now
            </a>
            <div className="bg-white rounded-2xl p-3 shadow-lg">
              <img src={spectrumLogo} alt="Spectrum International School, Astana" className="h-16 md:h-20 w-auto object-contain" />
            </div>
          </div>
        </div>
      </header>

      {/* Global Movement Banner with Video */}
      <section className="relative bg-[#a9222e] py-16 md:py-24">
        <img src={bgSection1} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none" />
        <div className="relative z-[5] max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-white text-3xl md:text-5xl font-display font-bold leading-tight mb-4">
            It&apos;s more than a Conference.<br />It&apos;s a <strong>Global Movement.</strong>
          </h2>
          <p className="text-white/95 text-lg md:text-xl italic mb-8">
            Kazakhstan, we are back!
          </p>
          <div className="max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <video 
              src="/videos/hwmun-kazakhstan.mp4" 
              controls 
              className="w-full h-full object-cover"
              preload="metadata"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            About the <span style={{ color: CRIMSON }}>Conference</span>
          </h2>
          <div className="max-w-4xl mx-auto text-center space-y-4 text-gray-600 mb-12">
            <p>
              <strong className="text-gray-800">Harvard World Model United Nations Kazakhstan</strong> is a unique blend of high-level debate, cultural immersion, and social engagement, creating an environment where diverse perspectives are not only heard — but celebrated.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <img src={aboutImg} alt="About WorldMUN" className="rounded-lg w-full" />
            <div className="text-gray-600 space-y-4">
              <p>
                Through thought-provoking discussions, diplomatic collaboration, and hands-on experiences, participants explore real-world global issues and sharpen their skills in negotiation, public speaking, and leadership.
              </p>
              <p>
                Recognized for its academic rigor and vibrant international community, WorldMUN is more than just a Model UN — it's a life-changing experience that fosters empathy, understanding, and a commitment to global cooperation.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
            <p className="text-gray-600 leading-relaxed">
              Through lively and informed debate, exciting social events, and a unique
              conference spirit, the World Model United Nations experience reaches across
              cultures and borders to inspire both cooperation and friendship.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { img: substantiveImg, title: "Substantive Excellence" },
                { img: culturalImg, title: "Cultural Connection" },
                { img: delegateImg, title: "Delegate Experience" },
              ].map((item) => (
                <div key={item.title} className="rounded-lg overflow-hidden shadow-md">
                  <img src={item.img} alt={item.title} className="w-full h-72 object-cover" />
                  <div className="bg-[#a9222e] py-4 px-3 text-center">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conference Details */}
      <section id="details" className="py-12" style={{ backgroundColor: CRIMSON }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-8">
            Conference Details
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {conferenceDetails.map((d) => (
              <div key={d.label} className="bg-white rounded-xl p-5">
                <div className="bg-[#a9222e] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <d.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-base text-[#a9222e] mb-1">{d.label}</p>
                <p className="font-bold text-gray-900 text-lg">{d.value.includes('\n') ? d.value.split('\n').map((line, i) => <span key={i} className="block">{line}</span>) : d.value}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#a9222e] font-semibold px-8 py-3 rounded hover:bg-gray-100 transition-colors"
            >
              Register Now
            </a>
          </div>
        </div>
      </section>

      {/* Conference Objectives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" style={{ color: CRIMSON }}>
            Conference Objectives
          </h2>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            <div className="space-y-6">
              {[objectives[0], objectives[2]].filter((o): o is (typeof objectives)[number] => Boolean(o)).map((o) => (
                <div key={o.title} className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
                  <img src={o.icon} alt="" className="w-12 h-12 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">{o.title}</h3>
                  <p className="text-gray-500 text-sm">{o.description}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <img src={objectivesImg} alt="Conference Objectives" className="rounded-2xl w-full max-h-[420px] object-cover" />
            </div>
            <div className="space-y-6">
              {[objectives[1], objectives[3]].filter((o): o is (typeof objectives)[number] => Boolean(o)).map((o) => (
                <div key={o.title} className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
                  <img src={o.icon} alt="" className="w-12 h-12 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">{o.title}</h3>
                  <p className="text-gray-500 text-sm">{o.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 flex items-center gap-6">
              <img src={objectives[4]?.icon} alt="" className="w-12 h-12 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{objectives[4]?.title}</h3>
                <p className="text-gray-500 text-sm">{objectives[4]?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="relative">
        <div className="h-[420px] w-full">
          <img src={bgSection2} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="-mt-64 relative z-10 max-w-6xl mx-auto px-4 pb-16">
          <div className="rounded-3xl p-10 md:p-14" style={{ backgroundColor: CRIMSON }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-10">
              Key Benefits for Students
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {benefits.map((b, i) => (
                <div key={i} className={`bg-white rounded-xl p-6 relative overflow-hidden ${i === 2 ? 'md:row-span-2' : ''}`}>
                  <p className="text-gray-700 text-sm font-medium pr-16 relative z-10">{b.text}</p>
                  <img src={b.icon} alt="" className="absolute bottom-2 right-2 w-20 h-20 opacity-60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="pt-10 pb-8 relative" style={{ backgroundColor: CRIMSON }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-4">
            Tentative Conference Schedule
          </h2>
          <ScheduleCarousel />
        </div>
      </section>

      {/* Committees */}
      <section id="committees" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            World Model United Nations <span style={{ color: CRIMSON }}>Committees</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {committees.map((c) => (
              <div key={c.name} className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <img src={c.icon} alt="" className="w-14 h-14 mb-6" />
                  <h3 className="text-base font-semibold mb-2" style={{ color: CRIMSON }}>{c.name}</h3>
                  <p className="text-sm font-bold text-gray-900 mb-3">TOPIC: {c.topic}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About WorldMUN */}
      <section className="pt-20 pb-0" style={{ backgroundColor: CRIMSON }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white/5 border border-white/15 rounded-xl p-8 md:p-12">
            <p className="text-white/80 text-lg mb-1">About</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
              Harvard World Model United Nations
            </h2>
            <div className="text-white/90 space-y-4 leading-relaxed">
              <p>
                Harvard World Model United Nations (WorldMUN) is the world's most diverse collegiate Model United Nations conference, bringing together thousands of university students from over 110 countries each year. With a mission to foster authentic cross-cultural connections, WorldMUN travels to a different international city annually, inspiring delegates to engage in global dialogue, diplomacy, and cultural exchange.
              </p>
              <p>
                At the heart of WorldMUN is the WorldMUN Spirit — a guiding principle that encourages friendship, cooperation, and deeper understanding across borders. Past destinations have included Rome, Montreal, Panama City, Madrid, Paris, and Taipei, and the conference has featured keynote addresses by global leaders such as Pope Francis and King Felipe VI of Spain.
              </p>
              <p>
                WorldMUN provides a platform for young leaders to explore international relations, debate pressing global issues, and build meaningful relationships that transcend geography. Led by a team of experienced student organizers from Harvard University, the conference combines academic excellence with immersive cultural experiences and impactful diplomacy.
              </p>
              <p>
                In an ever-evolving global landscape, WorldMUN stands as a symbol of collaboration, cooperation, and hope for the next generation of changemakers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-10 text-left leading-tight">
            Hear what <span style={{ color: CRIMSON }}>our</span> past participants <span style={{ color: CRIMSON }}>have to say</span><br />about their experience..
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 relative">
            {/* Show two cards on desktop, only one on mobile */}
            {[0, 1].map((offset) => {
              const idx = (currentTestimonial + offset) % testimonials.length;
              const testimonial = testimonials[idx];
              if (!testimonial) return null;
              return (
                <div 
                  key={idx} 
                  className={`bg-[#fdf3f4] rounded-[2rem] p-6 md:p-8 relative overflow-hidden flex flex-col sm:flex-row items-stretch gap-6 transition-all duration-500 ${
                    offset === 1 ? 'hidden md:flex' : 'flex'
                  }`}
                >
                  <span className="absolute top-4 right-6 text-7xl font-serif text-[#f2d8db] leading-none pointer-events-none">“</span>
                  
                  {/* Photo container */}
                  <div className="w-full sm:w-[140px] md:w-[160px] flex items-end justify-center flex-shrink-0">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="max-h-[200px] sm:max-h-[220px] md:max-h-[240px] w-auto object-contain object-bottom align-bottom"
                    />
                  </div>
                  
                  {/* Text Container */}
                  <div className="flex-1 flex flex-col justify-between pt-2">
                    <p className="text-gray-800 text-sm md:text-[15px] leading-relaxed font-medium mb-6 text-left">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="text-left">
                      <h4 className="text-base font-bold text-[#a9222e] mb-0.5">{testimonial.author}</h4>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{testimonial.school}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3 justify-end mt-8">
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Glimpse Section */}
      <section className="pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
            <img 
              src={glimpsesCollage} 
              alt="Glimpses from past conferences" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <img src={contactBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <img src={lwlLogo} alt="Learn with Leaders" className="h-14 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-8">Ready to Join Us?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#a9222e] hover:bg-[#8a1b25] text-white font-semibold px-10 py-4 text-lg rounded transition-colors inline-flex items-center justify-center gap-2"
            >
              Register Now!
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#a9222e] hover:bg-[#8a1b25] text-white font-semibold px-10 py-4 text-lg rounded transition-colors inline-flex items-center justify-center"
            >
              Schedule a Meeting
            </a>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-xs sm:max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-gray-600 text-sm whitespace-nowrap">
              <Mail className="w-5 h-5 flex-shrink-0" style={{ color: CRIMSON }} />
              <a href="mailto:team@learnwithleaders.com" className="hover:underline">team@learnwithleaders.com</a>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm whitespace-nowrap">
              <Globe className="w-5 h-5 flex-shrink-0" style={{ color: CRIMSON }} />
              <a href="https://www.learnwithleaders.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">www.learnwithleaders.com</a>
            </div>
          </div>
        </div>
      </section>
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-white hover:bg-[#2a2a2a] transition-all shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
