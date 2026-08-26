// Programme catalogue for Learn with Leaders. Static data, rendered on the server.
// Source of truth: "Online Programs - Filter Categories" (18 programmes, 7 interest
// categories, one category per programme).

export type TrackKey =
  | "med"
  | "law"
  | "fin"
  | "ai"
  | "res"
  | "lead"
  | "sat";
export type TypeKey = "fel" | "prog" | "comp";
export type MentorKey = "harvard" | "hpair" | "yale" | "ivy";
export type Fee = { e: string; r: string | null };

export type Cohort = {
  d: string;
  g?: [number, number];
  fee?: Fee;
  /** Batch / cohort label as published in the master calendar. */
  label?: string;
  /** Session timing for this cohort when it differs from the programme default. */
  time?: string;
  /** Eligibility line for this cohort when it differs from the programme default. */
  elig?: string;
  flyer?: string;
  brochure?: string;
};

export type Programme = {
  id: string;
  name: string;
  type: TypeKey;
  /** Exactly one interest category, kept as an array for card/tag rendering. */
  tracks: TrackKey[];
  /** Mentor university group, used by the mentor filter and credential line. */
  mentor: MentorKey;
  g: [number, number];
  tag: string;
  about: string;
  dur: string;
  time: string;
  feeE: string;
  feeR: string | null;
  badge?: string;
  site: string;
  apply: string;
  cohorts: Cohort[];
};

export const TRACKS: Record<TrackKey, { label: string; short: string; ic: string; color: string }> = {
  med: { label: "Medicine & Healthcare", short: "Medicine", ic: "🩺", color: "var(--track-med)" },
  law: {
    label: "Law, Debate & Communication",
    short: "Law & Debate",
    ic: "⚖️",
    color: "var(--track-law)",
  },
  fin: { label: "Finance & Investing", short: "Finance", ic: "📈", color: "var(--track-fin)" },
  ai: {
    label: "AI, Technology & Entrepreneurship",
    short: "AI & Entrepreneurship",
    ic: "🤖",
    color: "var(--track-ai)",
  },
  res: {
    label: "Research & Academic Writing",
    short: "Research",
    ic: "🔬",
    color: "var(--track-res)",
  },
  lead: {
    label: "Leadership & Global Affairs",
    short: "Leadership",
    ic: "🌍",
    color: "var(--track-lead)",
  },
  sat: {
    label: "Test Prep & College Readiness",
    short: "Test Prep",
    ic: "✏️",
    color: "var(--track-sat)",
  },
};

export const MENTORS: Record<MentorKey, { label: string; short: string }> = {
  harvard: { label: "Harvard mentors", short: "Harvard" },
  hpair: { label: "Harvard × HPAIR", short: "Harvard × HPAIR" },
  yale: { label: "Yale mentors", short: "Yale" },
  ivy: {
    label: "Harvard, MIT, Stanford, Yale & Princeton mentors",
    short: "MIT / Stanford / Princeton",
  },
};

export const MENTOR_ORDER: MentorKey[] = ["harvard", "hpair", "yale", "ivy"];

export const TYPES: Record<TypeKey, { label: string }> = {
  fel: { label: "Fellowships" },
  prog: { label: "Programmes" },
  comp: { label: "Competitions" },
};

export const TYPE_NAME: Record<TypeKey, string> = {
  fel: "Fellowship",
  prog: "Programme",
  comp: "Competition",
};

/** Drive flyer/brochure link from the master calendar's file id. */
const dl = (id: string) => `https://drive.google.com/file/d/${id}/view?usp=sharing`;

export const PROGRAMMES: Programme[] = [
  {
    id: "fdf",
    name: "Future Doctors Fellowship",
    type: "fel",
    tracks: ["med"],
    mentor: "harvard",
    g: [8, 12],
    tag: "Solve 16+ real clinical cases with a dedicated Harvard student mentor, ending in a capstone project and Demo Day.",
    about: "The flagship pre-med fellowship. Students work in cohorts of 4-6 with a dedicated Harvard student mentor, solving 16+ real clinical cases, debating medical ethics and exploring healthcare careers. It culminates in a capstone project in one of four tracks and a Demo Day presentation, with weekly progress reports sent to parents.",
    dur: "8 weeks",
    time: "Saturdays, 9:00–10:30 AM ET",
    feeE: "USD 850",
    feeR: "USD 1,200",
    badge: "100% money-back guarantee after Session 1",
    site: "https://futuredoctorsprogram.com/fellowship",
    apply: "https://futuredoctorsprogram.com/fellowship/apply",
    cohorts: [
      {
        d: "2026-09-12",
        label: "Batch 1",
        elig: "Grades 8-12 (ages 13-18)",
        flyer: dl("1t-JehpudAZSB6pcKdD22ZPPS0he1GlM3"),
        brochure: dl("1uB9dsbH2gC_4GYFOvul5q1tMKG0Zaq3X"),
      },
      {
        d: "2026-11-14",
        label: "Batch 2",
        flyer: dl("1KIaJhp-JBbT5RE8v2tkNDjeab2DJpQgk"),
        brochure: dl("1DbrGXmsxN3FfdaVHjpv-hFP36p7ihkXh"),
      },
      {
        d: "2027-02-27",
        label: "Batch 3",
        flyer: dl("1ComGBHt5vVnht1tlDeiARj6iGmm9zD7H"),
        brochure: dl("15KwR4og8GcYt1u9jH8l_eL8a3rM-uWh4"),
      },
    ],
  },
  {
    id: "jdf",
    name: "Junior Doctor Fellowship",
    type: "fel",
    tracks: ["med"],
    mentor: "harvard",
    g: [5, 8],
    tag: "A case-based introduction to medicine: six medical mysteries, body systems exploration and a capstone health project.",
    about: "The junior on-ramp to the Future Doctors pathway. Students role-play clinicians, solve six medical mysteries, explore human body systems and build a personal Casebook Portfolio, ending with a capstone health project presented at Demo Day. Weekly parent reports keep you in the loop.",
    dur: "3 weekends · 6 live sessions",
    time: "Sat & Sun, 9:00–10:30 AM ET",
    feeE: "USD 499",
    feeR: "USD 899",
    site: "https://futuredoctorsprogram.com/junior-doctors",
    apply: "https://futuredoctorsprogram.com/junior-doctors/apply",
    cohorts: [
      {
        d: "2026-10-03",
        label: "Batch 1",
        flyer: dl("1StgUWWJSEe4Zr11urxVQ04z5XIbP845P"),
        brochure: dl("1bmQ8zNH-kAi6FSKau3IbfuWgX9ddqJnv"),
      },
      {
        d: "2026-12-19",
        label: "Batch 2",
        flyer: dl("1XP4VAAfwTTMzepDBlpGnDtVjRyq1R15L"),
        brochure: dl("1MG-LMoOK4c2i26hU576QxAZe9XHv8SQ8"),
      },
      {
        d: "2027-03-20",
        label: "Batch 3",
        flyer: dl("1_qpcxC0gKPyuGm7OkU5q1we5aAqfRTli"),
        brochure: dl("1e5lAo3L1DyZOLORV-YcP7hO2_TS4vaBH"),
      },
    ],
  },
  {
    id: "flf",
    name: "Future Lawyers Fellowship",
    type: "fel",
    tracks: ["law"],
    mentor: "harvard",
    g: [8, 12],
    tag: "Legal reasoning, FIRAC case analysis, LSAT fundamentals, AI & the Law, and a live Moot Court simulation.",
    about: "A Harvard student-mentored pre-law fellowship. Students learn how US courts work, practise FIRAC case analysis and legal writing, get a first taste of the LSAT, debate AI & the Law and legal ethics, and finish with a live Moot Court simulation and a capstone legal project.",
    dur: "3 weekends · 6 live sessions",
    time: "Sat & Sun, 9:00–10:30 AM ET",
    feeE: "USD 499",
    feeR: "USD 699",
    site: "https://futurelawyersprogram.com",
    apply: "https://futurelawyersprogram.com/apply",
    cohorts: [
      { d: "2026-08-29" },
      { d: "2026-10-31" },
      { d: "2027-03-06" },
    ],
  },
  {
    id: "ydf",
    name: "Young Debaters Fellowship",
    type: "fel",
    tracks: ["law"],
    mentor: "hpair",
    g: [8, 12],
    tag: "Structured argumentation, rebuttal and public speaking through live debates, ending in a judged final competition.",
    about: "A Harvard student-led debate fellowship in partnership with HPAIR. Students master structured argumentation, rebuttal, active listening and persuasive communication through practice debates and mentor feedback - finishing with a final debate competition, a personalised progress report and a Public Debater Profile.",
    dur: "3 weekends · 6 live sessions",
    time: "Sat & Sun, 9:00–10:30 AM ET",
    feeE: "USD 499",
    feeR: "USD 699",
    site: "https://joinonwards.com/young-debaters",
    apply: "https://joinonwards.com/young-debaters/apply",
    cohorts: [
      { d: "2026-09-26" },
      { d: "2026-12-12" },
      { d: "2027-04-24" },
    ],
  },
  {
    id: "comm",
    name: "Communication & Leadership Programme",
    type: "prog",
    tracks: ["law"],
    mentor: "harvard",
    g: [6, 12],
    tag: "A Voice → Influence → Stage arc with a performance in every session, ending in a judged showcase in front of external judges and parents.",
    about: "Run under the Onward Fellowship brand with Harvard student mentors. Students move through a Voice → Influence → Stage arc across two age tracks - Story Slam, Campaign HQ and a TEDx-style Showcase for Grades 6-8, with a matching track for Grades 9-12. There is a performance in every session and a judged showcase finale in front of external judges and parents.",
    dur: "3 weekends · 6 live sessions",
    time: "Sat & Sun, 2 hours per session",
    feeE: "Fee on request",
    feeR: null,
    site: "https://joinonwards.com/communication-leadership",
    apply: "https://joinonwards.com/communication-leadership/apply",
    cohorts: [
      { d: "2026-10-24" },
      { d: "2027-01-30" },
    ],
  },
  {
    id: "finlit",
    name: "FinLit Fellowship (Capital Minds)",
    type: "fel",
    tracks: ["fin"],
    mentor: "hpair",
    g: [8, 12],
    tag: "An AI-native finance fellowship: investing, financial analysis and fraud detection, ending in a live capstone defence.",
    about: "Delivered in partnership with HPAIR, this AI-native finance fellowship covers investing, entrepreneurship, financial analysis, AI-assisted research, fraud detection and business strategy. Students build and defend real financial projects - investment theses, budgeting tools, venture pitches - before a mentor panel.",
    dur: "8 weeks",
    time: "Saturdays, 9:00 AM ET · 120 min",
    feeE: "USD 999",
    feeR: "USD 1,200",
    site: "https://joinfinlit.com/fellowship",
    apply: "https://joinfinlit.com/apply",
    cohorts: [
      { d: "2026-08-29" },
      { d: "2026-11-07" },
      { d: "2027-02-13" },
    ],
  },
  {
    id: "wow",
    name: "Wolves of Wall Street Competition",
    type: "comp",
    tracks: ["fin"],
    mentor: "harvard",
    g: [8, 12],
    tag: "A 12-week global stock market simulation: build a portfolio, craft a professional investment pitch and compete for prizes.",
    about: "A global 12-week stock market simulation and investment thesis competition. Students build and manage a virtual investment portfolio, receive mentorship from Harvard students, prepare a professional stock pitch and compete for prizes worth up to USD 1,000.",
    dur: "12 weeks",
    time: "Saturdays, 9:00–10:00 AM ET",
    feeE: "USD 80",
    feeR: "USD 100",
    site: "https://joinfinlit.com/competition",
    apply: "https://joinfinlit.com/competition/apply",
    cohorts: [
      { d: "2026-07-25" },
      { d: "2026-10-24" },
      { d: "2027-02-27" },
    ],
  },
  {
    id: "ail",
    name: "Future AI Leaders Fellowship",
    type: "fel",
    tracks: ["ai"],
    mentor: "harvard",
    g: [8, 12],
    tag: "Build and launch a real AI product with tools like Claude, Cursor and Lovable, ending in Demo Day and a public Builder Profile.",
    about: "An intensive AI & entrepreneurship fellowship with a 1:20 Harvard mentor ratio. Students learn to build with modern AI tools - Claude, Lovable, Cursor, Perplexity - and ship a real AI product, presented at a live Demo Day. Every student leaves with a public Builder Profile, demo video and Certificate of Completion.",
    dur: "3 weekends · 6 live build days",
    time: "Sat & Sun, 9:00–11:00 AM ET",
    feeE: "USD 499",
    feeR: "USD 699",
    site: "https://joinonwards.com/aischool",
    apply: "https://joinonwards.com/aischool/apply",
    cohorts: [
      { d: "2026-10-17" },
      { d: "2027-02-20" },
    ],
  },
  {
    id: "fef",
    name: "Future Entrepreneurs Fellowship",
    type: "fel",
    tracks: ["ai"],
    mentor: "harvard",
    g: [8, 12],
    tag: "Take an idea to a validated MVP using AI and no-code tools, then deliver a live investor pitch on Demo Day.",
    about: "A Harvard student-led entrepreneurship fellowship. Students take an idea from concept to validated MVP using AI and no-code tools, build a full Business Model Canvas, and deliver a live investor-style pitch on Demo Day - earning a Certificate of Completion and a portfolio-ready venture.",
    dur: "3 weekends · 6 live sessions",
    time: "Sat & Sun, 9:00–10:30 AM ET",
    feeE: "USD 499",
    feeR: "USD 699",
    site: "https://joinonwards.com/young-entrepreneurs",
    apply: "https://joinonwards.com/young-entrepreneurs/apply",
    cohorts: [
      { d: "2026-09-12" },
      { d: "2027-01-30" },
    ],
  },
  {
    id: "yep",
    name: "Young Entrepreneurs Program",
    type: "prog",
    tracks: ["ai"],
    mentor: "harvard",
    g: [6, 8],
    tag: "Build a real startup or AI-powered product in small Harvard-mentored cohorts, with masterclasses and a portfolio project.",
    about: "A six-week online entrepreneurship programme where students build a real startup or AI-powered product with Harvard student mentors at a 1:20 ratio. Includes industry masterclasses, competition guidance, a Demo Day and a Certificate of Excellence.",
    dur: "6 weeks",
    time: "Weekly live sessions · 2 hours",
    feeE: "€299",
    feeR: "€349",
    site: "https://joinonwards.com/young-entrepreneurs",
    apply: "https://joinonwards.com/young-entrepreneurs/apply",
    cohorts: [
      { d: "2027-04-17" },
    ],
  },
  {
    id: "rpf",
    name: "Research Publication Fellowship",
    type: "fel",
    tracks: ["res"],
    mentor: "ivy",
    g: [8, 12],
    tag: "1:1 mentorship from Harvard, MIT, Stanford, Yale and Princeton mentors to publish in a Google Scholar-indexed journal.",
    about: "An intensive research mentorship where students work 1:1 with mentors from Harvard, MIT, Stanford, Yale and Princeton, going from research ideation to a published paper in a peer-reviewed, Google Scholar-indexed journal. 426+ students have published since 2020, and publication is guaranteed.",
    dur: "8 weeks",
    time: "Sundays, 9:00–10:30 AM ET + office hours",
    feeE: "USD 1,199",
    feeR: "USD 1,799",
    badge: "100% publication guarantee",
    site: "https://sirluthercenter.com/fellowship",
    apply: "https://sirluthercenter.com/fellowship/apply",
    cohorts: [
      { d: "2026-08-23" },
      { d: "2026-11-15" },
      { d: "2027-03-21" },
    ],
  },
  {
    id: "yrp",
    name: "Young Researchers Program",
    type: "prog",
    tracks: ["res"],
    mentor: "harvard",
    g: [6, 8],
    tag: "A first research programme: ask real questions, analyse data and write a structured research essay.",
    about: "A beginner-friendly research programme for middle schoolers. Students learn to ask research questions, evaluate evidence, design investigations, collect and analyse data and write a structured research essay - with guidance toward competitions like Broadcom MASTERS, National History Day and the Conrad Challenge.",
    dur: "6 weeks · 6 live sessions",
    time: "Saturdays, 9:00–10:00 AM ET",
    feeE: "USD 799",
    feeR: "USD 1,499",
    site: "https://sirluthercenter.com/young-researchers",
    apply: "https://sirluthercenter.com/young-researchers/apply",
    cohorts: [
      {
        d: "2026-10-10",
        label: "Batch 1",
        flyer: dl("1Fu93frAm2wqWLRSdv1VogLtBs5NfAJN7"),
        brochure: dl("1qE0ilcIFqwOVFGuW8qDuSjT1wFcPyI4R"),
      },
      {
        d: "2027-01-16",
        label: "Batch 2",
        time: "Saturdays, 10:00–11:30 AM ET",
        flyer: dl("1RToJRwOoStsemHBGMqRAha5WaJPYGg-b"),
        brochure: dl("1tok5DO21l5kseijt9OZswrao6smlAR6-"),
      },
      {
        d: "2027-04-10",
        label: "Batch 3",
        flyer: dl("1sMATVN2RoPAkVfMonJDUuOCq0tOp1k9v"),
        brochure: dl("1igS3ure9tZMIoBYV9m1_Qi76ZRM16vp0"),
      },
    ],
  },
  {
    id: "yire",
    name: "YIRA Global Essay Competition",
    type: "comp",
    tracks: ["res"],
    mentor: "yale",
    g: [8, 12],
    tag: "Explore global issues with Yale mentors, submit an essay with personalised feedback and compete for cash prizes.",
    about: "Students explore complex global issues under the mentorship of Yale students, attend weekly essay-writing webinars, submit essays and receive personalised feedback - competing for global recognition and cash prizes while sharpening research and analytical writing.",
    dur: "12 weeks",
    time: "Weekly webinars, 7:00–8:00 AM ET",
    feeE: "USD 29",
    feeR: "USD 50",
    site: "https://www.learnwithleaders.com/competitions/the-yale-international-relations-essay-competition/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSeD2WQ-nxDS4Ux_EXZPKhlSwjE4TfiL1Mjti28BsoWAZ8D5Tg/viewform",
    cohorts: [
      {
        d: "2027-01-09",
        flyer: dl("1H4ZOEedjiEEqfQbwjmKTXCnV7fl3AEnm"),
        brochure: dl("1sHezq7IpMAHJkLVdT-W4uJ97oZfCuwBH"),
      },
    ],
  },
  {
    id: "onw",
    name: "Onward 6-Week Programme",
    type: "prog",
    tracks: ["lead"],
    mentor: "harvard",
    g: [5, 12],
    tag: "A Gifted & Talented pathway: choose Leadership, STEM or AI & Entrepreneurship and build a portfolio project.",
    about: "A Harvard student-led Gifted & Talented programme. Students choose a track - Leadership, STEM Innovation or AI & Entrepreneurship - and complete project-based learning that ends in a real portfolio project, a Virtual Showcase presentation and a Certificate of Excellence. Junior (5-8) and Senior (9-12) batches run in parallel.",
    dur: "6 weeks · Sundays",
    time: "Sundays, 9:00 AM ET · 2 hours",
    feeE: "USD 349",
    feeR: "USD 499",
    site: "https://joinonwards.com/6-weeks",
    apply: "https://joinonwards.com/6-weeks/apply",
    cohorts: [
      { d: "2026-09-20", label: "Batch 1" },
      { d: "2026-12-13", label: "Batch 2", fee: { e: "€299", r: "€349" } },
      { d: "2027-03-14", label: "Batch 3" },
    ],
  },
  {
    id: "alp",
    name: "Advance Leadership Programme",
    type: "prog",
    tracks: ["lead"],
    mentor: "hpair",
    g: [6, 12],
    tag: "Students draft and sign a Student Leadership Council charter, defended before a school leadership panel. Parallel Grades 6-8 and 9-12 cohorts.",
    about: "Run under the Onward Fellowship brand in partnership with HPAIR. Through interactive breakouts, Socratic debate and role-plays, students move through an identity → governance → charter arc, ending by drafting and digitally signing a Student Leadership Council charter and presenting it to a school leadership panel. Grades 6-8 and 9-12 run as independent parallel cohorts.",
    dur: "3 weekends · 6 live sessions",
    time: "Sat & Sun, 9:00–10:30 AM ET",
    feeE: "USD 499",
    feeR: "USD 699",
    site: "https://joinonwards.com/advanced-leadership-online",
    apply: "https://joinonwards.com/advanced-leadership-online/apply",
    cohorts: [
      {
        d: "2026-11-14",
        label: "Cohort 1",
        elig: "Grades 6-8 and Grades 9-12 (parallel cohorts)",
        flyer: dl("1LkcprAPmeF-WEX1XDrxRMMyEg2St_NO7"),
        brochure: dl("1Cjx7ulrxjVhsTv3NM4fqnnVxbUzWNUs8"),
      },
      {
        d: "2027-02-20",
        label: "Cohort 2",
        flyer: dl("1OrkojFVuWE-WSRkOGApZ8WCc18Y3g8Xe"),
        brochure: dl("1vU5iWryndDp_KyO_y-AXjKLEMljA-otA"),
      },
    ],
  },
  {
    id: "wla",
    name: "Yale Global Affairs - World Leaders Academy",
    type: "prog",
    tracks: ["lead"],
    mentor: "yale",
    g: [6, 12],
    tag: "Diplomacy, crisis negotiation and a personal passion project with Yale mentors, ending in a final leadership pitch.",
    about: "A three-weekend online leadership academy guided by Yale mentors. Students develop diplomacy, crisis negotiation, public speaking and global affairs skills through live simulations and a personal passion project - finishing with a Leadership Profile, Passion Project Blueprint, final leadership pitch and Academy Certificate.",
    dur: "3 weekends · 4 live sessions",
    time: "10:00–11:30 AM ET",
    feeE: "USD 399",
    feeR: "USD 499",
    site: "https://purposeplaybook.ai/academy/online",
    apply: "https://purposeplaybook.ai/apply",
    cohorts: [
      {
        d: "2026-11-08",
        label: "Batch 1",
        elig: "Middle & high school (approx. Grades 8-12)",
        flyer: dl("1ErRwgKu3bTJ6eo934yz4N4i23IIJDSQu"),
        brochure: dl("1gMGp5w6Bcy47ox7JjCf_Y5IiyGCot2mF"),
      },
      {
        d: "2027-02-07",
        label: "Batch 2",
        flyer: dl("1ktRUGuH0tMijCVdslB90lzWipeiCKVVQ"),
        brochure: dl("1YlJEHldKpk7Az21PUlhhcKdU_oDg9l_c"),
      },
      {
        d: "2027-04-25",
        label: "Batch 3",
        flyer: dl("1_3ZwuQ30ovCFnjy-l1cLeEYMIH4gwuwr"),
        brochure: dl("1LWXqMM5eJ41RkjqACUJ42Rsd4ssegfMq"),
      },
    ],
  },
  {
    id: "fcf",
    name: "Future Changemakers Fellowship",
    type: "fel",
    tracks: ["lead"],
    mentor: "hpair",
    g: [8, 12],
    tag: "Design and launch a real social impact project using systems thinking, stakeholder research and evidence-based storytelling.",
    about: "Run with Harvard student mentors in partnership with HPAIR. Students design, build and pitch a real social impact project using stakeholder research, systems thinking, theory of change and evidence-based storytelling - ending with a Demo Day pitch, a public Changemaker Profile and a Certificate of Completion.",
    dur: "3 weekends · 6 live sessions",
    time: "Sat & Sun, 9:00–10:30 AM ET",
    feeE: "USD 499",
    feeR: "USD 699",
    site: "https://joinonwards.com/changemakers",
    apply: "https://joinonwards.com/changemakers/apply",
    cohorts: [
      {
        d: "2026-09-12",
        label: "Batch 1",
        flyer: dl("1_J4tcjOHVtnXdho58VPNgwVJeLDhL7wR"),
        brochure: dl("16BvtHd77iixG3IRpVvZjwZS1rStWAt1T"),
      },
      {
        d: "2026-12-23",
        label: "Batch 2",
        flyer: dl("1tPvdnlqk0JnJATxR-neslQY1Rh-QVLxe"),
        brochure: dl("15x4Svkk2yRSEyXuE7MsaBJNV52hfcc1H"),
      },
      {
        d: "2027-04-24",
        label: "Batch 3",
        flyer: dl("10cAuzNror6-lZ3iRY2VoZMhD88aYd_6-"),
        brochure: dl("1Go495Xw97zLtcBZd3uaruNN-pbEbvMV1"),
      },
    ],
  },
  {
    id: "sat",
    name: "SAT Instinct",
    type: "prog",
    tracks: ["sat"],
    mentor: "harvard",
    g: [9, 12],
    tag: "Pattern-based SAT coaching led by Matt Suescun (Harvard, SAT 1590), in cohorts of 8-12 with recordings and lifetime access.",
    about: "A live SAT preparation programme that trains test instincts through pattern recognition and decision-making rather than rote drilling. Led by Harvard mentor Matt Suescun (SAT 1590), with small cohorts of 8-12 students, ten live sessions, full recordings and lifetime access.",
    dur: "10 weeks · 10 live sessions",
    time: "Sundays, 10:30 AM ET",
    feeE: "USD 850",
    feeR: "USD 1,200",
    badge: "Scholarships available",
    site: "https://satinstinct.com",
    apply: "https://satinstinct.com/apply",
    cohorts: [
      {
        d: "2026-08-02",
        label: "Batch 1",
        fee: { e: "USD 850", r: null },
        flyer: dl("1rW74K13pKvkQFLgP36bIqxPtxVJUdWqv"),
        brochure: dl("1Ne5sz1SVlbfoN1CFEaM0Ddrf_NIc2E9C"),
      },
      {
        d: "2026-11-22",
        label: "Batch 2",
        time: "Sundays, 10:30 AM ET",
        flyer: dl("1tttUa1sGIk9laqsQO29H2xwHvFWa8pcG"),
        brochure: dl("1kexyI4Whk0oyhy5aj480tZ9e1hxohuwW"),
      },
      {
        d: "2027-03-28",
        label: "Batch 3",
        flyer: dl("1hGZ9aJULyA7XpUxlgYa6E12MEJOtC-ww"),
        brochure: dl("19MUcepOZXnaRptqTdj2lOiiYJdT_Aj_1"),
      },
    ],
  },
];

/* ---------- helpers ---------- */

export const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const parseISO = (iso: string) => new Date(iso + "T00:00:00");

export const isPast = (iso: string) => parseISO(iso) < startOfToday();

export const isSoon = (iso: string) => {
  const diff = (parseISO(iso).getTime() - startOfToday().getTime()) / 86400000;
  return diff >= 0 && diff <= 45;
};

export const fmtLong = (iso: string) =>
  parseISO(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const fmtShort = (iso: string) =>
  parseISO(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export const cohortGrades = (p: Programme, c?: Cohort): [number, number] =>
  (c && c.g) || p.g;

export const feeOf = (p: Programme, c?: Cohort): Fee =>
  c && c.fee ? c.fee : { e: p.feeE, r: p.feeR };

export const mentorLabel = (p: Programme) => MENTORS[p.mentor].short;

/** Duration buckets used by the finder's secondary filter. */
export type DurationKey = "d3we" | "d6w" | "d8w" | "d1012w";

export const DURATIONS: Record<DurationKey, string> = {
  d3we: "3-Weekend Intensive",
  d6w: "6 Weeks",
  d8w: "8 Weeks",
  d1012w: "10–12 Weeks",
};

export const DURATION_ORDER: DurationKey[] = ["d3we", "d6w", "d8w", "d1012w"];

export const durationKey = (p: Programme): DurationKey => {
  const d = p.dur.toLowerCase();
  if (d.includes("weekend")) return "d3we";
  if (d.includes("6 week")) return "d6w";
  if (d.includes("8 week") || d.includes("8 saturdays")) return "d8w";
  return "d1012w";
};

/** Programmes with past cohorts removed (empty programmes dropped). */
export const upcomingProgrammes = (): Programme[] =>
  PROGRAMMES.map((p) => ({ ...p, cohorts: p.cohorts.filter((c) => !isPast(c.d)) }))
    .filter((p) => p.cohorts.length > 0);

/**
 * Sessions are published in US Eastern. Most families reading this are in the
 * Gulf, so show Dubai time (GMT+4, ET + 8h) first with the original alongside.
 */
export const dualTime = (str: string): string => {
  if (!/AM|PM/i.test(str)) return str;
  const spread = str.replace(
    /(\d{1,2}(?::\d{2})?)\s*[–-]\s*(\d{1,2}(?::\d{2})?)\s*(AM|PM)/gi,
    "$1 $3–$2 $3",
  );
  const conv = spread
    .replace(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/gi, (_m, h, mm, ap) => {
      let H = (parseInt(h, 10) % 12) + (String(ap).toUpperCase() === "PM" ? 12 : 0);
      H = (H + 8) % 24;
      const ap2 = H >= 12 ? "PM" : "AM";
      const h2 = H % 12 || 12;
      return `${h2}${mm ? ":" + mm : ":00"} ${ap2}`;
    })
    .replace(/\b(EDT|EST|ET)\b/g, "GMT+4");
  return `${/GMT\+4/.test(conv) ? conv : conv + " GMT+4"} (${str})`;
};

/** Dubai-only rendering of a session time, for tight one-line meta rows. */
export const shortTime = (str: string): string => {
  const dual = dualTime(str);
  const cut = dual.indexOf(" (");
  const local = (cut > -1 ? dual.slice(0, cut) : dual).trim();
  const first = local.match(/\d{1,2}:\d{2}\s*(?:AM|PM)/i);
  return first ? `${first[0]} GMT+4` : local;
};

/** One-line explainer under each category heading. */
export const TYPE_BLURB: Record<TypeKey, string> = {
  fel: "Mentor-led cohorts ending in a capstone or defence",
  prog: "Short live courses that build one specific skill",
  comp: "Judged challenges with awards and rankings",
};

export const TYPE_ORDER: TypeKey[] = ["fel", "prog", "comp"];

export const TOTAL_COHORTS = PROGRAMMES.reduce((n, p) => n + p.cohorts.length, 0);

export const TYPE_IC: Record<TypeKey, string> = {
  fel: "🎓",
  prog: "📚",
  comp: "🏆",
};

/** Editorially chosen flagships - the five a parent should look at first. */
export const TRENDING: { id: string; why: string }[] = [
  { id: "fdf", why: "The most asked-about pathway for future medics - clinical cases, live mentors, capstone." },
  { id: "ail", why: "Build and ship a real AI product; the fastest-moving skill on any application." },
  { id: "flf", why: "Moot court and legal reasoning - ideal first step for a law-curious teenager." },
  { id: "rpf", why: "Ivy League mentors and a published, citable research paper in eight weeks." },
  { id: "finlit", why: "Investing, valuation and fraud detection - finance fluency that lasts." },
];

/** Grade-band pathway for profile building. */
export type Outcome = {
  title: string;
  body: string;
  /** Optional programme that produces this outcome. */
  id?: string;
  /** Optional finder type filter to jump to. */
  type?: TypeKey;
  /** Optional finder interest filter to jump to. */
  interest?: TrackKey;
};

export const OUTCOMES: Outcome[] = [
  {
    title: "Write to a professor and land a research role",
    body: "Find the right academic, read one of their papers properly, and send the email that actually gets a reply.",
    id: "yrp",
    interest: "res",
  },
  {
    title: "Publish a paper with a citable link",
    body: "A permanent, checkable record of the research - not a line of unverifiable claim on a CV.",
    id: "rpf",
    interest: "res",
  },
  {
    title: "Build and launch a real venture",
    body: "A live product or service with users, customers or revenue, plus a pitch deck they can defend.",
    id: "fef",
    interest: "ai",
  },
  {
    title: "A portfolio site that holds everything",
    body: "Capstones, papers, demo videos and awards behind one link that goes on every application.",
  },
  {
    title: "A presence universities can verify",
    body: "LinkedIn and a public builder profile that match the portfolio, with certificates and mentor letters attached.",
  },
  {
    title: "Mentor letters and certificates on file",
    body: "Named, dated, verifiable documents from every programme - ready when a university or scholarship asks.",
    type: "comp",
  },
];

export const PATHWAY: {
  key: string;
  band: string;
  title: string;
  goal: string;
  ids: string[];
  outcomes?: Outcome[];
}[] = [
  {
    key: "explore",
    band: "Grades 5–7",
    title: "Explore widely",
    goal: "Try two or three fields, get comfortable speaking and presenting, and find what genuinely holds their attention.",
    ids: ["onw", "jdf", "yrp"],
  },
  {
    key: "deepen",
    band: "Grades 8–10",
    title: "Go deep, gather evidence",
    goal: "Commit to one or two interests, finish a mentor-led fellowship, and start collecting real work - projects, papers, pitches.",
    ids: ["fdf", "fef", "ydf"],
  },
  {
    key: "prove",
    band: "Grades 11–12",
    title: "Make it application-ready",
    goal: "Publish, compete and prepare so the profile shows proof - a paper, an award and a score that keeps doors open.",
    ids: ["rpf", "wow", "sat"],
  },
  {
    key: "verify",
    band: "Grades 9–12 · any stage",
    title: "Turn it into proof universities can check",
    goal: "The work only counts if an admissions officer can find it, read it and confirm it is real. Step 4 packages everything from steps 1-3.",
    ids: [],
    outcomes: OUTCOMES,
  },
];
