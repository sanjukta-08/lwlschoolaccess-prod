// In-person residential camps. Separate from the online programme catalogue in
// programmes.ts: camps travel, cost more, and are sold on the campus itself.
import summerAsset from "@/assets/camps/card-summer.webp.asset.json";
import winterAsset from "@/assets/camps/card-winter.webp.asset.json";
import premedAsset from "@/assets/camps/card-premed.jpg.asset.json";
import prelawAsset from "@/assets/camps/card-prelaw.jpg.asset.json";
import igniteAsset from "@/assets/camps/card-ignite.webp.asset.json";
import genevaAsset from "@/assets/camps/card-geneva.jpg.asset.json";
import spainAsset from "@/assets/camps/card-spain.png.asset.json";

const harvardSummer = summerAsset.url;
const harvardWinter = winterAsset.url;
const premed = premedAsset.url;
const prelaw = prelawAsset.url;
const cambridge = igniteAsset.url;
const geneva = genevaAsset.url;
const salamanca = spainAsset.url;

export type Region = "usa" | "uk" | "europe";
export type Season = "summer" | "winter";

export type CampCohort = {
  /** Human label, e.g. "4 - 9 January 2027". */
  label: string;
  /** ISO date used for sorting; undefined when dates are not announced. */
  start?: string;
  note?: string;
};

export type Camp = {
  slug: string;
  name: string;
  host: string;
  hostedBy?: string;
  city: string;
  country: string;
  region: Region;
  season: Season;
  theme: string;
  themeKey: "lead" | "med" | "law" | "ent" | "res" | "ai";
  gradeBand: string;
  durationLabel: string;
  promise: string;
  eyebrow: string;
  lede: string;
  image: string;
  applyUrl: string;
  stats: { value: string; label: string }[];
  vision: string[];
  journey: { day: string; title: string; body: string }[];
  framework: { no: string; title: string; body: string }[];
  included: string[];
  notIncluded: string[];
  cohorts: CampCohort[];
  faqs: { q: string; a: string }[];
};

const CAL = "https://calendly.com/learnwithleaders";

export const CAMPS: Camp[] = [
  {
    slug: "premed-horizons-harvard",
    name: "Pre-Med Horizons Program",
    host: "Harvard University",
    hostedBy: "Harvard Undergraduate Global Education Movement (HUGEM)",
    city: "Cambridge",
    country: "USA",
    region: "usa",
    season: "winter",
    theme: "Medicine & Health",
    themeKey: "med",
    gradeBand: "Grades 9-12",
    durationLabel: "6 days",
    promise:
      "Six days inside medicine, innovation and health policy - and your own place in what comes next.",
    eyebrow: "Where the future of medicine begins",
    lede: "An immersive on-campus camp for students ready to explore medicine, innovation and policy, taught by Harvard undergraduates and guest clinicians.",
    image: premed,
    applyUrl: "https://apply.learnwithleaders.com/apply/premed-academy",
    stats: [
      { value: "06", label: "Days of programming" },
      { value: "01", label: "Capstone challenge" },
      { value: "03", label: "Themes per day" },
      { value: "∞", label: "Career pathways" },
    ],
    vision: [
      "The future of health will not be shaped by physicians alone. It will be shaped by innovators, researchers, entrepreneurs, policymakers and technologists working together.",
      "The programme introduces students to the biological foundations of health, the realities of modern healthcare systems, and the innovations transforming medicine.",
      "Through interdisciplinary learning and collaborative problem-solving, students explore how they can contribute to building a healthier future for all.",
    ],
    journey: [
      { day: "Day 1", title: "Understanding health", body: "Biology, the body and what health really means beyond the absence of disease." },
      { day: "Day 2", title: "Today's challenges", body: "Chronic disease, access, ageing populations and the gaps in global health." },
      { day: "Day 3", title: "Understanding healthcare", body: "How systems, insurance, hospitals and public health actually work." },
      { day: "Day 4", title: "Building the future", body: "Biotech, AI diagnostics, devices and the innovators changing the field." },
      { day: "Day 5", title: "Leading global change", body: "Policy, ethics and advocacy - who decides, and how change is made." },
      { day: "Day 6", title: "Capstone and closing", body: "Teams present their health challenge solution to a Harvard panel." },
    ],
    framework: [
      { no: "01", title: "Who it's for", body: "Students curious about medicine, public health, biotech or health policy. No prior coursework required." },
      { no: "02", title: "How it unfolds", body: "Morning seminars, afternoon labs and site visits, evening team work on the capstone." },
      { no: "03", title: "What they carry forward", body: "A certificate, a capstone presentation, a mentor network and a much sharper sense of direction." },
    ],
    included: [
      "All academic sessions and campus facilities",
      "Mentorship from Harvard undergraduates and guest speakers",
      "Certificate of completion and capstone feedback",
      "Supervised group activities and city immersion",
    ],
    notIncluded: ["International flights", "Visa fees", "Personal spending and insurance"],
    cohorts: [{ label: "4 - 9 January 2027", start: "2027-01-04" }],
    faqs: [
      { q: "Is prior science coursework required?", a: "No. The programme starts from first principles and is designed for curious students from Grade 9 upwards, whatever their school syllabus." },
      { q: "How are students supervised?", a: "Students are supervised by programme staff throughout academic hours and group activities, with clear check-in points each day and a 24/7 emergency contact for families." },
      { q: "Do you help with the visa?", a: "Yes. Once a place is confirmed we issue an invitation and enrolment letter for the visa appointment, and our team guides families through the documentation." },
      { q: "What does my child leave with?", a: "A completion certificate, a capstone project presented to a panel, written feedback and a mentor network they can keep in touch with." },
    ],
  },
  {
    slug: "prelaw-horizons-harvard",
    name: "Pre-Law Horizons Program",
    host: "Harvard University",
    hostedBy: "Harvard Undergraduate Global Education Movement (HUGEM)",
    city: "Cambridge",
    country: "USA",
    region: "usa",
    season: "winter",
    theme: "Law & Advocacy",
    themeKey: "law",
    gradeBand: "Grades 9-12",
    durationLabel: "6 days",
    promise:
      "A six-day intensive in the law - its history, its contradictions and the questions that define our world.",
    eyebrow: "Argue it out on campus",
    lede: "For students who want to test whether law is really for them: case reading, legal reasoning and a full moot court finale on a Harvard campus.",
    image: prelaw,
    applyUrl: "https://apply.learnwithleaders.com/apply/prelaw-academy",
    stats: [
      { value: "06", label: "Days of programming" },
      { value: "01", label: "Moot court final" },
      { value: "04", label: "Landmark cases" },
      { value: "∞", label: "Career pathways" },
    ],
    vision: [
      "Law is how a society argues with itself. Students read the arguments that changed nations, then make their own.",
      "The camp moves from legal foundations to constitutional questions, human rights and the ethics of advocacy.",
      "By the final day every student has stood up, made a case under pressure and been questioned by a bench.",
    ],
    journey: [
      { day: "Day 1", title: "What law is for", body: "Systems, sources and the difference between justice and legality." },
      { day: "Day 2", title: "Reading a case", body: "Facts, holding and reasoning - how lawyers actually read." },
      { day: "Day 3", title: "Rights and constitutions", body: "Landmark rulings and the arguments that moved them." },
      { day: "Day 4", title: "Building an argument", body: "Structure, evidence, rebuttal and the art of concession." },
      { day: "Day 5", title: "Ethics and advocacy", body: "Who the law leaves out, and what a lawyer owes their client." },
      { day: "Day 6", title: "Moot court", body: "Teams argue before a judging panel and receive individual feedback." },
    ],
    framework: [
      { no: "01", title: "Who it's for", body: "Students drawn to debate, politics, human rights or law - no legal background needed." },
      { no: "02", title: "How it unfolds", body: "Seminar in the morning, case work in the afternoon, drafting and practice rounds in the evening." },
      { no: "03", title: "What they carry forward", body: "A written case brief, a mooted argument, judging feedback and a completion certificate." },
    ],
    included: [
      "All academic sessions and campus facilities",
      "Case packs and moot court materials",
      "Certificate of completion and judging feedback",
      "Supervised group activities and city immersion",
    ],
    notIncluded: ["International flights", "Visa fees", "Personal spending and insurance"],
    cohorts: [{ label: "11 - 16 January 2027", start: "2027-01-11" }],
    faqs: [
      { q: "Does my child need debate experience?", a: "No. Practice rounds build up to the moot court, and every student is coached through their first argument." },
      { q: "Is this useful for non-law careers?", a: "Yes. Reading closely, structuring an argument and speaking under questioning are the transferable skills universities and employers look for." },
      { q: "How large is the cohort?", a: "Cohorts are kept small so every student argues, is questioned and receives individual feedback." },
      { q: "Can it be combined with Pre-Med Horizons?", a: "Yes - the two camps run back to back in January, and families often book both weeks together. Ask an advisor about combined placement." },
    ],
  },
  {
    slug: "hcus-young-global-leaders-winter",
    name: "HCUS Young Global Leaders Winter Camp",
    host: "Harvard University",
    hostedBy: "Harvard College Undergraduate Society",
    city: "Cambridge",
    country: "USA",
    region: "usa",
    season: "winter",
    theme: "Leadership & Global Affairs",
    themeKey: "lead",
    gradeBand: "Grades 8-12",
    durationLabel: "8 days",
    promise: "Leadership training on a winter campus, with mentors who were in your seat three years ago.",
    eyebrow: "Winter on campus",
    lede: "Empower your leadership skills at Harvard with expert mentorship, structured training and a team challenge that runs the length of the week.",
    image: harvardWinter,
    applyUrl: "https://apply.learnwithleaders.com/apply/harvard-winter-camp",
    stats: [
      { value: "08", label: "Days on campus" },
      { value: "02", label: "Cohort options" },
      { value: "01", label: "Team challenge" },
      { value: "∞", label: "Alumni network" },
    ],
    vision: [
      "Leadership is not a personality type. It is a set of habits: framing a problem, listening well, deciding under uncertainty and carrying a team with you.",
      "Students work in small teams with Harvard undergraduate mentors across the week, on real cases rather than abstract theory.",
      "The week closes with a showcase in front of mentors, peers and visiting speakers.",
    ],
    journey: [
      { day: "Day 1-2", title: "Arrival and foundations", body: "Campus orientation, team formation and the leadership self-assessment." },
      { day: "Day 3-4", title: "Communication and influence", body: "Public speaking, storytelling and negotiating a shared decision." },
      { day: "Day 5-6", title: "Global challenges", body: "Case work on a live global issue, coached by mentors." },
      { day: "Day 7-8", title: "Showcase and closing", body: "Final presentations, certificates and the closing ceremony." },
    ],
    framework: [
      { no: "01", title: "Who it's for", body: "Students in Grades 8-12 who lead clubs, teams or projects - or want to start." },
      { no: "02", title: "How it unfolds", body: "Two cohort weeks in January; workshops by day, team work and campus life by evening." },
      { no: "03", title: "What they carry forward", body: "A showcase presentation, a leadership profile and a certificate from the programme." },
    ],
    included: [
      "All workshops, campus sessions and materials",
      "Harvard undergraduate mentorship",
      "Certificate and closing ceremony",
      "Supervised activities and Boston city immersion",
    ],
    notIncluded: ["International flights", "Visa fees", "Personal spending and insurance"],
    cohorts: [
      { label: "3 - 10 January 2027", start: "2027-01-03", note: "Cohort 1" },
      { label: "10 - 17 January 2027", start: "2027-01-10", note: "Cohort 2" },
    ],
    faqs: [
      { q: "Which cohort should we choose?", a: "The two cohorts run the same programme. Pick the week that suits your school calendar and flights; places are allocated first come, first served." },
      { q: "How cold is Cambridge in January?", a: "Cold - usually below freezing. We send a full packing list once a place is confirmed, and indoor sessions are the bulk of the day." },
      { q: "What ages share a room?", a: "Rooming is arranged by age band and gender, with staff on the same floor." },
      { q: "Is there a sibling or group discount?", a: "Yes for siblings and for school groups. Speak to an advisor before you book." },
    ],
  },
  {
    slug: "hcus-young-global-leaders-summer",
    name: "HCUS Young Global Leaders Summer Camp",
    host: "Harvard University",
    hostedBy: "Harvard College Undergraduate Society",
    city: "Cambridge",
    country: "USA",
    region: "usa",
    season: "summer",
    theme: "Leadership & Global Affairs",
    themeKey: "lead",
    gradeBand: "Grades 8-12",
    durationLabel: "8 days",
    promise: "The summer edition: leadership, global affairs and a campus in full bloom.",
    eyebrow: "Summer on campus",
    lede: "Empower your leadership skills at Harvard with expert mentorship and training, in the long light of a New England summer.",
    image: harvardSummer,
    applyUrl: "https://apply.learnwithleaders.com/apply/harvard-summer-camp",
    stats: [
      { value: "08", label: "Days on campus" },
      { value: "01", label: "Team challenge" },
      { value: "12+", label: "Nationalities" },
      { value: "∞", label: "Alumni network" },
    ],
    vision: [
      "The summer camp takes the same leadership curriculum outdoors: more site visits, more city, more time with mentors.",
      "Students build a global cohort - most weeks bring together students from a dozen countries.",
      "Every student leaves with a project they presented and people they stay in touch with.",
    ],
    journey: [
      { day: "Day 1-2", title: "Arrival and foundations", body: "Orientation, team formation and setting a personal goal for the week." },
      { day: "Day 3-4", title: "Voice and influence", body: "Speaking, storytelling and persuading a room that disagrees with you." },
      { day: "Day 5-6", title: "Global challenge", body: "Team case work with mentor coaching and a mid-week review." },
      { day: "Day 7-8", title: "Showcase and closing", body: "Presentations, certificates and the farewell dinner." },
    ],
    framework: [
      { no: "01", title: "Who it's for", body: "Grades 8-12, from first-time travellers to seasoned club presidents." },
      { no: "02", title: "How it unfolds", body: "Workshops, site visits and evening team work across eight days." },
      { no: "03", title: "What they carry forward", body: "A presented project, a certificate and an international peer group." },
    ],
    included: [
      "All workshops, campus sessions and materials",
      "Harvard undergraduate mentorship",
      "Certificate and closing ceremony",
      "Supervised activities and Boston city immersion",
    ],
    notIncluded: ["International flights", "Visa fees", "Personal spending and insurance"],
    cohorts: [{ label: "Dates to be announced", note: "Join the interest list and we will contact you first" }],
    faqs: [
      { q: "When will summer dates be confirmed?", a: "Summer dates are usually confirmed a few months ahead. Join the interest list and an advisor will contact you before public release." },
      { q: "Can we hold a place before dates are out?", a: "You can register interest at no cost. Deposits are only taken once dates and fees are published." },
      { q: "What is the group size?", a: "Cohorts are deliberately small so each student works closely with a mentor." },
      { q: "Do parents travel with students?", a: "Most students travel independently or with a school group; some families travel alongside and stay in the city. Both work." },
    ],
  },
  {
    slug: "ignite-cambridge-judge",
    name: "IGNITE Programme at Cambridge Judge",
    host: "Cambridge Judge Business School",
    hostedBy: "Cambridge Judge Entrepreneurship Centre",
    city: "Cambridge",
    country: "United Kingdom",
    region: "uk",
    season: "summer",
    theme: "Entrepreneurship",
    themeKey: "ent",
    gradeBand: "Grades 9-12",
    durationLabel: "7 days",
    promise: "Sharpen entrepreneurial skills with Cambridge faculty and industry mentors.",
    eyebrow: "Build it in Cambridge",
    lede: "A venture-building week inside one of Europe's strongest start-up ecosystems, finishing with a pitch to a panel of founders and investors.",
    image: cambridge,
    applyUrl: "https://apply.learnwithleaders.com/apply/cambridge-ignite",
    stats: [
      { value: "07", label: "Days on campus" },
      { value: "01", label: "Investor pitch" },
      { value: "05", label: "Founder sessions" },
      { value: "∞", label: "Venture ideas" },
    ],
    vision: [
      "Cambridge is a working start-up cluster wrapped around an 800-year-old university. Students learn where the two meet.",
      "Teams take an idea from customer problem to tested prototype and a costed business model in a single week.",
      "The final pitch is judged by founders and investors who give direct, unvarnished feedback.",
    ],
    journey: [
      { day: "Day 1", title: "Find the problem", body: "Customer discovery: what actually hurts, and for whom." },
      { day: "Day 2", title: "Shape the idea", body: "Value proposition, competitors and positioning." },
      { day: "Day 3", title: "Test it", body: "Rapid prototyping and getting real feedback in the city." },
      { day: "Day 4", title: "Make it work", body: "Business model, unit economics and the numbers investors ask for." },
      { day: "Day 5", title: "Tell the story", body: "Pitch structure, deck design and delivery coaching." },
      { day: "Day 6-7", title: "Pitch and close", body: "Dress rehearsal, investor panel and certificates." },
    ],
    framework: [
      { no: "01", title: "Who it's for", body: "Students who want to build something - clubs, side projects or a first venture." },
      { no: "02", title: "How it unfolds", body: "Faculty sessions, mentor clinics and team build time, every day." },
      { no: "03", title: "What they carry forward", body: "A tested prototype, an investor-ready deck and panel feedback." },
    ],
    included: [
      "All faculty sessions and mentor clinics",
      "Prototyping materials and workspace",
      "Certificate from the programme and pitch feedback",
      "Supervised activities and Cambridge city immersion",
    ],
    notIncluded: ["International flights", "UK visa fees", "Personal spending and insurance"],
    cohorts: [{ label: "18 - 24 July 2027", start: "2027-07-18" }],
    faqs: [
      { q: "Does my child need a business idea already?", a: "No. Day one is customer discovery, and teams form around problems people actually care about." },
      { q: "Do students work alone or in teams?", a: "In small teams, with a mentor attached to each team for the week." },
      { q: "Is accommodation on campus?", a: "Residential placement is arranged through the programme; details are confirmed with your booking." },
      { q: "What if we need a UK visa?", a: "We provide the enrolment and invitation letters required for a Standard Visitor visa application." },
    ],
  },
  {
    slug: "future-sustainability-innovators-geneva",
    name: "Future Sustainability Innovators Programme",
    host: "University of Geneva",
    hostedBy: "SDG Solution Space FabLab",
    city: "Geneva",
    country: "Switzerland",
    region: "europe",
    season: "winter",
    theme: "Sustainability & Research",
    themeKey: "res",
    gradeBand: "Grades 8-12",
    durationLabel: "7 days",
    promise: "Tackle sustainability at Geneva's SDG FabLab, in the city where global policy is written.",
    eyebrow: "Where the world negotiates",
    lede: "A week of prototyping and policy in Geneva: the UN quarter by day, the FabLab by afternoon, and a solution presented at the end of it.",
    image: geneva,
    applyUrl: "https://apply.learnwithleaders.com/apply/geneva-camp",
    stats: [
      { value: "07", label: "Days in Geneva" },
      { value: "17", label: "SDGs in play" },
      { value: "01", label: "Prototype built" },
      { value: "∞", label: "Global careers" },
    ],
    vision: [
      "Geneva holds the machinery of global cooperation: the UN, the WHO, the Red Cross and hundreds of NGOs within a few square kilometres.",
      "Students pair that context with the University of Geneva's SDG Solution Space, where ideas are actually built.",
      "The week ends with a working prototype and a pitch tied to a specific Sustainable Development Goal.",
    ],
    journey: [
      { day: "Day 1", title: "Arrival and the SDGs", body: "Orientation and choosing the goal your team will work on." },
      { day: "Day 2", title: "Inside global governance", body: "The international quarter and how decisions get made." },
      { day: "Day 3", title: "Research the problem", body: "Data, stakeholders and what has already been tried." },
      { day: "Day 4", title: "FabLab build", body: "Design and prototype in the SDG Solution Space." },
      { day: "Day 5", title: "Test and iterate", body: "Feedback rounds with mentors and a rebuild." },
      { day: "Day 6-7", title: "Pitch and close", body: "Final presentations, certificates and an alpine day out." },
    ],
    framework: [
      { no: "01", title: "Who it's for", body: "Students interested in climate, development, engineering or international affairs." },
      { no: "02", title: "How it unfolds", body: "Site visits in the morning, hands-on build work in the afternoon." },
      { no: "03", title: "What they carry forward", body: "A physical or digital prototype, a pitch and a certificate from the programme." },
    ],
    included: [
      "All sessions, site visits and FabLab access",
      "Materials for prototyping",
      "Certificate and final showcase",
      "Supervised activities and Geneva city immersion",
    ],
    notIncluded: ["International flights", "Schengen visa fees", "Personal spending and insurance"],
    cohorts: [{ label: "13 - 19 December 2026", start: "2026-12-13" }],
    faqs: [
      { q: "Is the FabLab work technical?", a: "It is hands-on but not specialist. Mentors take students through design tools and fabrication from scratch." },
      { q: "Do students visit the UN?", a: "The programme includes visits in Geneva's international quarter; specific site access is confirmed closer to the dates." },
      { q: "How cold is Geneva in December?", a: "Cold and often crisp. A packing list goes out with the joining pack, and most work is indoors." },
      { q: "Can this support a research portfolio?", a: "Yes. Students leave with documented project work they can write about in applications." },
    ],
  },
  {
    slug: "entrepreneurship-ai-salamanca",
    name: "Entrepreneurship Powered by AI",
    host: "University of Salamanca",
    hostedBy: "Delivered with NYU faculty",
    city: "Salamanca",
    country: "Spain",
    region: "europe",
    season: "winter",
    theme: "AI & Entrepreneurship",
    themeKey: "ai",
    gradeBand: "Grades 9-12",
    durationLabel: "7 days",
    promise: "Innovate, lead and create in Spain - with NYU faculty and eight centuries of university behind you.",
    eyebrow: "Innovate. Lead. Create.",
    lede: "Build an AI-powered venture at one of the oldest universities in the world, guided by NYU faculty and Spanish founders.",
    image: salamanca,
    applyUrl: "https://apply.learnwithleaders.com/apply/salamanca-entrepreneurship-ai",
    stats: [
      { value: "07", label: "Days in Spain" },
      { value: "01", label: "AI product shipped" },
      { value: "1218", label: "University founded" },
      { value: "∞", label: "Ways to build" },
    ],
    vision: [
      "AI has moved the cost of building software close to zero. What matters now is judgement: what to build, for whom, and why.",
      "Students learn to use AI tools as a team of collaborators, then ship something real within the week.",
      "Salamanca's golden sandstone campus is the backdrop - and Spanish culture is part of the curriculum, not a side trip.",
    ],
    journey: [
      { day: "Day 1", title: "Arrival and framing", body: "What AI is good at, what it is not, and where the opportunities sit." },
      { day: "Day 2", title: "Problem hunting", body: "Find a real user and a problem worth solving." },
      { day: "Day 3", title: "Build with AI", body: "Prototype an AI-powered product with faculty support." },
      { day: "Day 4", title: "Ethics and limits", body: "Bias, privacy and responsibility - the questions founders skip." },
      { day: "Day 5", title: "Business model", body: "Pricing, go-to-market and the first ten customers." },
      { day: "Day 6-7", title: "Demo day and close", body: "Live demos to a panel, certificates and a farewell in the old town." },
    ],
    framework: [
      { no: "01", title: "Who it's for", body: "Students curious about AI, product and starting things. No coding requirement." },
      { no: "02", title: "How it unfolds", body: "NYU faculty sessions, build sprints and cultural immersion in the city." },
      { no: "03", title: "What they carry forward", body: "A working AI product demo, a pitch and a certificate." },
    ],
    included: [
      "All faculty sessions and workspace",
      "AI tooling used during the programme",
      "Certificate and demo day feedback",
      "Supervised activities and Salamanca city immersion",
    ],
    notIncluded: ["International flights", "Schengen visa fees", "Personal spending and insurance"],
    cohorts: [{ label: "13 - 19 December 2026", start: "2026-12-13" }],
    faqs: [
      { q: "Does my child need to code?", a: "No. Teams build with AI tools, and students who do code go deeper - both routes ship something." },
      { q: "Is the programme in English?", a: "Yes, taught entirely in English. Basic Spanish is picked up in the city, not required." },
      { q: "Who are the faculty?", a: "The programme is delivered with NYU faculty alongside local founders and university staff." },
      { q: "What will they demo?", a: "A working AI-powered prototype built during the week, presented live on demo day." },
    ],
  },
];

export const REGIONS: { key: Region; label: string }[] = [
  { key: "usa", label: "United States" },
  { key: "uk", label: "United Kingdom" },
  { key: "europe", label: "Europe" },
];

export const SEASONS: { key: Season; label: string }[] = [
  { key: "winter", label: "Winter" },
  { key: "summer", label: "Summer" },
];

export const campBySlug = (slug: string) => CAMPS.find((c) => c.slug === slug);

export const campPath = (c: Camp) => `/camps/${c.slug}` as const;

/**
 * Dates and apply links come from the shared programme calendar; the campus
 * photography, vision and journey copy stay here. Called by the root loader.
 */
export const applyLiveCamps = (
  live: { slug: string; applyUrl: string | null; cohorts: CampCohort[] }[],
) => {
  for (const l of live) {
    const camp = CAMPS.find((c) => c.slug === l.slug);
    if (!camp) continue;
    if (l.applyUrl) camp.applyUrl = l.applyUrl;
    if (l.cohorts.length) camp.cohorts = l.cohorts;
  }
};


/** First announced start date, or undefined when the camp has no dates yet. */
export const nextStart = (c: Camp) =>
  c.cohorts.map((x) => x.start).filter(Boolean).sort()[0];

export const datesLabel = (c: Camp) =>
  c.cohorts[0]?.start ? c.cohorts.map((x) => x.label).join(" · ") : "Dates to be announced";

/** Camps with dates first (soonest first), undated camps last. */
export const sortedCamps = (list: Camp[] = CAMPS) =>
  [...list].sort((a, b) => {
    const sa = nextStart(a);
    const sb = nextStart(b);
    if (sa && sb) return sa.localeCompare(sb);
    if (sa) return -1;
    if (sb) return 1;
    return a.name.localeCompare(b.name);
  });

export const relatedCamps = (c: Camp, n = 3) =>
  sortedCamps(CAMPS.filter((x) => x.slug !== c.slug)).slice(0, n);

export const CAMP_FAQS = [
  {
    q: "How are students supervised?",
    a: "Programme staff supervise students throughout academic hours and group activities, with daily check-ins, staff on the residence floor and a 24/7 emergency contact for families.",
  },
  {
    q: "Do you help with visas and letters?",
    a: "Yes. Once a place is confirmed we issue an invitation and enrolment letter for the visa appointment, and our team guides families through the documentation for US, UK and Schengen applications.",
  },
  {
    q: "Are flights and accommodation included?",
    a: "Accommodation and supervised activities are part of the camp fee. International flights, visa fees, insurance and personal spending are not - each camp page lists exactly what is covered.",
  },
  {
    q: "Can students travel alone?",
    a: "Most do. We share arrival windows and airport guidance, and students are met and accompanied to the residence. Unaccompanied-minor arrangements with airlines are handled by families.",
  },
  {
    q: "What if the dates are not announced yet?",
    a: "Register interest at no cost. You will hear about dates and early pricing before they are made public, and no deposit is taken until you confirm.",
  },
];

export const CAMP_WEEK = [
  { title: "Arrival day", body: "Airport pickup window, residence check-in, campus walk and the first team dinner." },
  { title: "Campus mornings", body: "Seminars and labs with mentors who studied here - small rooms, lots of questions." },
  { title: "City afternoons", body: "Site visits that only make sense in this city: the UN quarter, a start-up cluster, a teaching hospital." },
  { title: "Capstone evenings", body: "Team work on the project that gets presented at the end of the week." },
  { title: "Closing ceremony", body: "Presentations to a panel, certificates, photographs and a group that stays in touch." },
];

export type CampVoice = { quote: string; name: string; role: string; camp: string };

export const CAMP_VOICES: CampVoice[] = [
  {
    quote:
      "I arrived not knowing anyone and left with a team I still message every week. Standing up to present at the end was the proudest I have been.",
    name: "Rouqaya",
    role: "Student, Grade 11",
    camp: "Geneva · Sustainability Innovators",
  },
  {
    quote:
      "The mentors were undergraduates, so they spoke to my son like a slightly older friend rather than a teacher. That changed how much he asked.",
    name: "Mrs Kanav",
    role: "Parent, Dubai",
    camp: "Harvard · Young Global Leaders",
  },
  {
    quote:
      "We built the prototype in the FabLab on day four and broke it on day five. Fixing it taught me more than any class this year.",
    name: "Mompati",
    role: "Student, Grade 10",
    camp: "Geneva · Sustainability Innovators",
  },
  {
    quote:
      "Six days of cases and a moot court at the end. She came home certain she wants to read law - and with the evidence to back it up.",
    name: "Mr Khalid",
    role: "Parent, Riyadh",
    camp: "Harvard · Pre-Law Horizons",
  },
];
