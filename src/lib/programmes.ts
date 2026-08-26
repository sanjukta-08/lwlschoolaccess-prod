// Programme catalogue for Learn with Leaders. Static data, rendered on the server.

export type TrackKey =
  | "med"
  | "law"
  | "fin"
  | "ai"
  | "ent"
  | "res"
  | "deb"
  | "lead"
  | "sat";
export type TypeKey =
  | "fel"
  | "prog"
  | "comp"
  | "intern"
  | "conf";
export type Fee = { e: string; r: string | null };

export type Cohort = {
  d: string;
  g?: [number, number];
  fee?: Fee;
};

export type Programme = {
  id: string;
  name: string;
  type: TypeKey;
  tracks: TrackKey[];
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

export const TRACKS: Record<TrackKey, { label: string; ic: string; color: string }> = {
  med: { label: "Medicine", ic: "🩺", color: "var(--track-med)" },
  law: { label: "Law", ic: "⚖️", color: "var(--track-law)" },
  fin: { label: "Finance", ic: "📈", color: "var(--track-fin)" },
  ai: { label: "AI & Tech", ic: "🤖", color: "var(--track-ai)" },
  ent: { label: "Entrepreneurship", ic: "🚀", color: "var(--track-ent)" },
  res: { label: "Research", ic: "🔬", color: "var(--track-res)" },
  deb: { label: "Debate & Speaking", ic: "🎙️", color: "var(--track-deb)" },
  lead: { label: "Leadership", ic: "🌍", color: "var(--track-lead)" },
  sat: { label: "Exams & Test Prep", ic: "✏️", color: "var(--track-sat)" },
};

export const TYPES: Record<TypeKey, { label: string }> = {
  fel: { label: "Fellowships" },
  prog: { label: "Programmes" },
  comp: { label: "Competitions" },
  intern: { label: "Internships" },
  conf: { label: "MUN & Conferences" },
};

export const TYPE_NAME: Record<TypeKey, string> = {
  fel: "Fellowship",
  prog: "Programme",
  comp: "Competition",
  intern: "Corporate Internship",
  conf: "Conference",
};

export const PROGRAMMES: Programme[] = [
  {
    id: "fdf",
    name: "Future Doctors Fellowship",
    type: "fel",
    tracks: ["med"],
    g: [8, 12],
    tag: "Solve 16+ real clinical cases with a dedicated Harvard student mentor, ending in a capstone project and Demo Day.",
    about: "The flagship pre-med fellowship. Students work in cohorts of 4–6 with a dedicated Harvard student mentor, solving 16+ real clinical cases, debating medical ethics and exploring healthcare careers. It culminates in a capstone project in one of four tracks and a Demo Day presentation, with weekly progress reports sent to parents.",
    dur: "8 weeks",
    time: "Saturdays, 9:00–10:30 AM ET",
    feeE: "USD 850",
    feeR: "USD 1,200",
    badge: "100% money-back guarantee after Session 1",
    site: "https://futuredoctorsprogram.com/fellowship",
    apply: "https://futuredoctorsprogram.com/fellowship/apply",
    cohorts: [
      { d: "2026-09-12" },
      { d: "2026-11-14" },
      { d: "2027-02-27" },
    ],
  },
  {
    id: "jdf",
    name: "Junior Doctor Fellowship",
    type: "fel",
    tracks: ["med"],
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
      { d: "2026-10-03" },
      { d: "2026-12-19" },
      { d: "2027-03-20" },
    ],
  },
  {
    id: "flf",
    name: "Future Lawyers Fellowship",
    type: "fel",
    tracks: ["law"],
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
    id: "finlit",
    name: "FinLit Fellowship - Capital Minds",
    type: "fel",
    tracks: ["fin"],
    g: [8, 12],
    tag: "An AI-native finance fellowship: investing, financial analysis and fraud detection, ending in a live capstone defence.",
    about: "Delivered in partnership with HPAIR, this AI-native finance fellowship covers investing, entrepreneurship, financial analysis, AI-assisted research, fraud detection and business strategy. Students build and defend real financial projects - investment theses, budgeting tools, venture pitches - before a mentor panel.",
    dur: "8 Saturdays",
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
    id: "ail",
    name: "Future AI Leaders Fellowship",
    type: "fel",
    tracks: ["ai", "ent"],
    g: [7, 12],
    tag: "Build and launch a real AI product with tools like Claude, Cursor and Lovable, ending in Demo Day and a public Builder Profile.",
    about: "An intensive AI & entrepreneurship fellowship with a 1:20 Harvard mentor ratio. Students learn to build with modern AI tools - Claude, Lovable, Cursor, Perplexity - and ship a real AI product, presented at a live Demo Day. Every student leaves with a public Builder Profile, demo video and Certificate of Completion.",
    dur: "3 weekends · 6 live build days",
    time: "Sat & Sun, 9:00–11:00 AM ET",
    feeE: "USD 499",
    feeR: "USD 699",
    site: "https://joinonwards.com/aischool",
    apply: "https://joinonwards.com/aischool/apply",
    cohorts: [
      { d: "2026-07-18", g: [7, 12] },
      { d: "2026-10-17", g: [9, 12] },
      { d: "2027-02-20", g: [9, 12] },
    ],
  },
  {
    id: "fef",
    name: "Future Entrepreneurs Fellowship",
    type: "fel",
    tracks: ["ent"],
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
    id: "fcf",
    name: "Future Changemakers Fellowship",
    type: "fel",
    tracks: ["lead"],
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
      { d: "2026-09-12" },
      { d: "2026-12-23" },
      { d: "2027-04-24" },
    ],
  },
  {
    id: "ydf",
    name: "Young Debaters Fellowship",
    type: "fel",
    tracks: ["deb"],
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
    id: "rpf",
    name: "Research Publication Fellowship",
    type: "fel",
    tracks: ["res"],
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
    id: "alp",
    name: "Advance Leadership Programme",
    type: "fel",
    tracks: ["lead"],
    g: [6, 12],
    tag: "Students draft and sign a Student Leadership Council charter, defended before a school leadership panel. Parallel Grades 6–8 and 9–12 cohorts.",
    about: "Run under the Onward Fellowship brand in partnership with HPAIR. Through interactive breakouts, Socratic debate and role-plays, students move through an identity → governance → charter arc, ending by drafting and digitally signing a Student Leadership Council charter and presenting it to a school leadership panel. Grades 6–8 and 9–12 run as independent parallel cohorts.",
    dur: "3 weekends · 6 live sessions",
    time: "Sat & Sun, 9:00–10:30 AM ET",
    feeE: "USD 499",
    feeR: "USD 699",
    site: "https://joinonwards.com/advanced-leadership-online",
    apply: "https://joinonwards.com/advanced-leadership-online/apply",
    cohorts: [
      { d: "2026-11-14" },
      { d: "2027-02-20" },
    ],
  },
  {
    id: "comm",
    name: "Communication & Leadership Programme",
    type: "fel",
    tracks: ["deb", "lead"],
    g: [6, 12],
    tag: "A Voice → Influence → Stage arc with a performance in every session, ending in a judged showcase in front of external judges and parents.",
    about: "Run under the Onward Fellowship brand with Harvard student mentors. Students move through a Voice → Influence → Stage arc across two age tracks - Story Slam, Campaign HQ and a TEDx-style Showcase for Grades 6–8, with a matching track for Grades 9–12. There is a performance in every session and a judged showcase finale in front of external judges and parents.",
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
    id: "irf",
    name: "The Impact & Research Fellowship",
    type: "fel",
    tracks: ["res", "lead"],
    g: [8, 12],
    tag: "Solve a real-world problem with HSA mentors over four months, producing a research paper and an actionable solution.",
    about: "Selected high-school students are guided by Harvard Student Agencies mentors to solve real-world problems through actionable solutions - producing a research paper and building leadership through experiential, project-based learning over four months.",
    dur: "4 months",
    time: "9:00–10:30 AM ET",
    feeE: "USD 1,200",
    feeR: "USD 1,500",
    site: "https://www.learnwithleaders.com/fellowships/the-impact-research-fellowship-on/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSeBF_wif8_j1LzuiOl346boDFMZT7CkZ_ZPhZlzT01j4aVfMQ/viewform",
    cohorts: [
      { d: "2026-10-26" },
    ],
  },
  {
    id: "onw",
    name: "Onward 6-Week Programme",
    type: "prog",
    tracks: ["lead", "ai", "ent"],
    g: [5, 12],
    tag: "A Gifted & Talented pathway: choose Leadership, STEM or AI & Entrepreneurship and build a portfolio project.",
    about: "A Harvard student-led Gifted & Talented programme. Students choose a track - Leadership, STEM Innovation or AI & Entrepreneurship - and complete project-based learning that ends in a real portfolio project, a Virtual Showcase presentation and a Certificate of Excellence. Junior (5–8) and Senior (9–12) batches run in parallel.",
    dur: "6 weeks · Sundays",
    time: "Sundays, 9:00 AM ET · 2 hours",
    feeE: "USD 349",
    feeR: "USD 499",
    site: "https://joinonwards.com/6-weeks",
    apply: "https://joinonwards.com/6-weeks/apply",
    cohorts: [
      { d: "2026-09-20" },
      { d: "2026-12-13", fee: { e: "€299", r: "€349" } },
      { d: "2027-03-14" },
    ],
  },
  {
    id: "yep",
    name: "Young Entrepreneurs Programme",
    type: "prog",
    tracks: ["ent", "ai"],
    g: [5, 12],
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
    id: "yrp",
    name: "Young Researchers Programme",
    type: "prog",
    tracks: ["res"],
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
      { d: "2026-10-10" },
      { d: "2027-01-16" },
      { d: "2027-04-10" },
    ],
  },
  {
    id: "sat",
    name: "SAT Instinct",
    type: "prog",
    tracks: ["sat"],
    g: [9, 12],
    tag: "Pattern-based SAT coaching led by Matt Suescun (Harvard, SAT 1590), in cohorts of 8–12 with recordings and lifetime access.",
    about: "A live SAT preparation programme that trains test instincts through pattern recognition and decision-making rather than rote drilling. Led by Harvard mentor Matt Suescun (SAT 1590), with small cohorts of 8–12 students, ten live sessions, full recordings and lifetime access.",
    dur: "10 weeks · 10 live sessions",
    time: "Sundays, 10:30 AM ET",
    feeE: "USD 850",
    feeR: "USD 1,200",
    badge: "Scholarships available",
    site: "https://satinstinct.com",
    apply: "https://satinstinct.com/apply",
    cohorts: [
      { d: "2026-08-02" },
      { d: "2026-11-22" },
      { d: "2027-03-28" },
    ],
  },
  {
    id: "wla",
    name: "Yale World Leaders Academy",
    type: "prog",
    tracks: ["lead"],
    g: [8, 12],
    tag: "Diplomacy, crisis negotiation and a personal passion project with Yale mentors, ending in a final leadership pitch.",
    about: "A three-weekend online leadership academy guided by Yale mentors. Students develop diplomacy, crisis negotiation, public speaking and global affairs skills through live simulations and a personal passion project - finishing with a Leadership Profile, Passion Project Blueprint, final leadership pitch and Academy Certificate.",
    dur: "3 weekends · 4 live sessions",
    time: "10:00–11:30 AM ET",
    feeE: "USD 399",
    feeR: "USD 499",
    site: "https://purposeplaybook.ai/academy/online",
    apply: "https://purposeplaybook.ai/apply",
    cohorts: [
      { d: "2026-11-08" },
      { d: "2027-02-07" },
      { d: "2027-04-25" },
    ],
  },
  {
    id: "ydp",
    name: "Young Debaters Programme",
    type: "prog",
    tracks: ["deb"],
    g: [5, 7],
    tag: "A 12-week debate foundation for Grades 5–7: fundamentals, confidence and strategic thinking with Harvard College mentors.",
    about: "A 12-week Zoom-led workshop built for younger students. Harvard College mentors teach the fundamentals of debate while cultivating leadership, confidence and strategic thinking through interactive sessions and competitive simulations.",
    dur: "12 weeks · every Saturday",
    time: "Saturdays, 9:00–10:30 AM ET",
    feeE: "USD 350",
    feeR: "USD 480",
    site: "https://www.learnwithleaders.com/certificate_programs/young-debaters-program/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSd6c44A3iIdT5XXi24j7uNXFL5FI7JbXgokrUXxfnllYJp3yQ/viewform",
    cohorts: [
      { d: "2026-09-26" },
      { d: "2026-11-15" },
      { d: "2026-12-12" },
      { d: "2027-04-24" },
    ],
  },
  {
    id: "rsp",
    name: "Research Scholars Programme",
    type: "prog",
    tracks: ["res"],
    g: [8, 12],
    tag: "Learn the fundamentals of research and research writing, producing a 1,500–2,000 word report for publication.",
    about: "A prestigious academic experience for students passionate about research, critical inquiry and innovative thinking. Under qualified student mentors, students learn the fundamentals of research and research writing, producing a 1,500–2,000 word research report for publication.",
    dur: "8 weeks",
    time: "9:00–10:30 AM ET",
    feeE: "USD 750",
    feeR: "USD 1,000",
    site: "https://www.learnwithleaders.com/certificate_programs/research-scholars-program-official/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLScT-pInnnzlEF6Pc_QQMY1eytz0yiVCbm5QOpKLbyoNRFlVBg/viewform",
    cohorts: [
      { d: "2026-11-08" },
      { d: "2027-02-23" },
    ],
  },
  {
    id: "fd1",
    name: "Future Doctors Level 1 (HSA)",
    type: "prog",
    tracks: ["med"],
    g: [8, 12],
    tag: "A two-weekend introduction to pre-med: genetics, hormones, immunology, organic chemistry and the MCAT process.",
    about: "Delivered with Harvard Student Agencies instructors, this two-weekend programme introduces the fundamentals of pre-medical studies - genetic inheritance, hormones, immunology, organic chemistry, real case studies and an overview of the MCAT process.",
    dur: "2 weekends",
    time: "Sat & Sun, 9:00 AM–12:00 PM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://www.learnwithleaders.com/certificate_programs/future-doctors-level-1-program-hsa/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSfJgM4jin3mRs0QtoA7lckVzBke4t6PLimswQ4W1KRzcZuSbg/viewform",
    cohorts: [
      { d: "2026-11-22" },
      { d: "2027-03-01" },
      { d: "2027-04-06" },
    ],
  },
  {
    id: "fd2",
    name: "Future Doctors Level 2 (HSA)",
    type: "prog",
    tracks: ["med"],
    g: [8, 12],
    tag: "Step into the shoes of an ER doctor or triage nurse, examining real cases in human physiology and pathology.",
    about: "Building on Level 1, this two-weekend programme gives students the tools to fill the shoes of an ER doctor or triage nurse in patient care - examining real-life case studies in human physiology and pathology with Harvard Student Agencies mentors.",
    dur: "2 weekends",
    time: "Sat & Sun, 9:00 AM–12:00 PM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://www.learnwithleaders.com/certificate_programs/future-doctors-level-2-program-hsa-online/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSfAZIXTLtBiPQJdo70uYfXTCKDezj0UrYYL3jooLACRlf6iFA/viewform",
    cohorts: [
      { d: "2027-03-22" },
      { d: "2027-04-20" },
    ],
  },
  {
    id: "flp",
    name: "Future Lawyers Programme (HSA)",
    type: "prog",
    tracks: ["law"],
    g: [8, 12],
    tag: "A two-weekend orientation to law: due process, legal careers, the US legal system and law school admissions.",
    about: "An intensive pre-law experience hosted by Harvard Student Agencies for students aspiring to careers in law, public policy or social justice. Covers due process, careers in law, the American legal system, LSAT strategies and the requirements of applying to law school.",
    dur: "2 weekends",
    time: "Sat & Sun, 9:00 AM–12:00 PM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://www.learnwithleaders.com/certificate_programs/future-lawyer-program-by-harvard-student-agencies/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSdLoYXJZjRJIgkEA8TO-i50brgSsTDmGC4FpM0VuzofQlO9pA/viewform",
    cohorts: [
      { d: "2026-10-25" },
      { d: "2026-12-06" },
      { d: "2027-02-01" },
      { d: "2027-04-20" },
    ],
  },
  {
    id: "fl2",
    name: "Future Lawyers Level 2 (HSA)",
    type: "prog",
    tracks: ["law"],
    g: [8, 12],
    tag: "Dive deeper into constitutional, cyber, corporate and international law, plus schools of legal philosophy.",
    about: "An extension of Future Lawyers Level 1, diving deeper into constitutional, cyber, corporate and international law - plus schools of legal philosophy and law-school career paths, with Harvard Student Agencies mentors.",
    dur: "2 weekends",
    time: "Sat & Sun, 9:00 AM–12:00 PM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://www.learnwithleaders.com/certificate_programs/future-lawyers-level-2-program-hsa/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSfiLiXfGbvU10WQ66qKhflx1vRYjzqubr0vLHpENrQnAAfKXg/viewform",
    cohorts: [
      { d: "2027-02-15" },
    ],
  },
  {
    id: "fep",
    name: "Future Entrepreneurs Programme (HSA)",
    type: "prog",
    tracks: ["ent"],
    g: [8, 12],
    tag: "Pitch business ideas, run market research and learn to raise investment with Harvard Student Agencies.",
    about: "A dynamic, immersive programme by Harvard Student Agencies for aspiring entrepreneurs and business leaders. Students learn to pitch business ideas, perform market research and generate investment - excellent preparation for taking an idea from launch to execution.",
    dur: "2–3 weekends",
    time: "Sat & Sun, 9:00 AM–12:00 PM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://www.learnwithleaders.com/certificate_programs/future-entrepreneurs-program-by-harvard-student-agencies-updated/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSerY7HBEa0WuRhscG4A32EUeK8MQwUzcRGp2zc_b839exMRRQ/viewform",
    cohorts: [
      { d: "2026-10-18" },
      { d: "2026-12-13" },
      { d: "2027-01-25" },
    ],
  },
  {
    id: "fcp",
    name: "Future Changemakers Programme (HSA)",
    type: "prog",
    tracks: ["lead"],
    g: [8, 12],
    tag: "Collaborate with top-university mentors over four weekends to tackle today’s most significant challenges.",
    about: "Brings together exceptional high school students to collaborate with student mentors from top universities and tackle today’s and tomorrow’s most significant challenges over four weekends, shaping the world of the future.",
    dur: "4 weekends",
    time: "9:00–10:30 AM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://learnwithleaders.com/certificate_programs/the-future-changemakers-program-by-harvard-student-agencies-cohort/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLScYOFuBVnngXJygNGgW33rglmakyNE73kLEPavuzPegyW0KsA/viewform",
    cohorts: [
      { d: "2027-03-22" },
    ],
  },
  {
    id: "aiml",
    name: "AI & ML Bootcamp",
    type: "prog",
    tracks: ["ai"],
    g: [6, 12],
    tag: "Two power-packed weeks of Python, AI and Machine Learning - build your own Fake News Detector, no experience needed.",
    about: "Two weeks of power-packed skills in Python, Artificial Intelligence and Machine Learning under qualified student mentors. Students learn to structure algorithms and code to build their own Fake News Detector - no prior Python experience required.",
    dur: "2 weeks",
    time: "9:00 AM–12:00 PM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://www.learnwithleaders.com/certificate_programs/ai-ml-bootcamp/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLScUtiIjsPCChO64s6n2yVDltd0lzdfAmiLuLYwvvde09E2G0Q/viewform",
    cohorts: [
      { d: "2026-12-06" },
    ],
  },
  {
    id: "calm",
    name: "Mastering Calm & Focus for Exam Success",
    type: "prog",
    tracks: ["sat"],
    g: [8, 12],
    tag: "Manage stress, boost focus and build wellbeing habits for exams and presentations, with trulyBalance.",
    about: "A six-weekend online programme by trulyBalance in collaboration with Learn with Leaders, empowering students to manage stress, boost focus and enhance wellbeing during exams and presentations.",
    dur: "6 weeks",
    time: "9:00–10:30 AM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://www.learnwithleaders.com/certificate_programs/mastering-calm-and-focus-program-for-exam-success/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSd_kzQOEpfRtZ52HCEY4IeiJXs9WYLxQd-Cq7EnurLNg8AyZQ/viewform",
    cohorts: [
      { d: "2027-03-01" },
    ],
  },
  {
    id: "hmcl",
    name: "Harvard Model Congress Young Leadership",
    type: "prog",
    tracks: ["lead"],
    g: [8, 12],
    tag: "Think through a real-world problem critically and creatively, and turn it into an actionable plan with HMC mentors.",
    about: "A two-weekend programme led by Harvard Model Congress mentors, focusing on leadership activities and a contextual problem - teaching students to think through issues critically and creatively and create an actionable plan.",
    dur: "2 weekends",
    time: "Sat & Sun, 9:00 AM–12:00 PM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://learnwithleaders.com/certificate_programs/harvard-model-congress-young-leadership-program-2024/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSfRYPJFECcQ0Xs7tLBs37kCPNuGpirV0ThiqdtxFMStqTIDpQ/viewform",
    cohorts: [
      { d: "2027-04-13" },
    ],
  },
  {
    id: "fmun",
    name: "Future MUN Leaders",
    type: "prog",
    tracks: ["deb", "lead"],
    g: [8, 12],
    tag: "Train as a delegate with the Harvard MUN Team: public speaking, research and writing, ending in a mock simulation.",
    about: "A two-weekend workshop by the Harvard MUN Team training students to be successful debaters, writers and delegates through public speaking, research and writing skills - ending in a mock simulation with feedback from the Harvard MUN Team.",
    dur: "2 weekends",
    time: "Sat & Sun, 9:00 AM–12:00 PM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://learnwithleaders.com/certificate_programs/future-mun-leaders-by-the-harvard-mun-team-on/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSdlP_2mBR_RJTI9wZoaSQf9LIXNjLO4uAUWp0QDf6rJuLyIYw/viewform",
    cohorts: [
      { d: "2027-04-20" },
    ],
  },
  {
    id: "wds",
    name: "World Debate Stars (ICMUN)",
    type: "prog",
    tracks: ["deb"],
    g: [6, 12],
    tag: "The art of argumentation with collegiate MUN debaters - skills that transfer to every stage and setting.",
    about: "A course spread over two weekends led by qualified student mentors experienced in collegiate MUN debate, preparing students in the art of argumentation - transferable across academic and real-world settings.",
    dur: "2 weekends",
    time: "Sat & Sun, 9:00 AM–12:00 PM ET",
    feeE: "USD 300",
    feeR: "USD 400",
    site: "https://learnwithleaders.com/certificate_programs/world-debate-stars-with-the-harvard-mun-team-icmun-online/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSdIWB-0b23F4o5hjU46hCxr9EzfX8DGd2X4vMYeP7LwfunWvQ/viewform",
    cohorts: [
      { d: "2027-04-27" },
    ],
  },
  {
    id: "wow",
    name: "Wolves of Wall Street Competition",
    type: "comp",
    tracks: ["fin"],
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
    id: "yire",
    name: "Yale IR Global Essay Competition",
    type: "comp",
    tracks: ["res", "lead"],
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
      { d: "2027-01-09" },
    ],
  },
  {
    id: "huceg",
    name: "HUCEG Sustainability Leaders Challenge",
    type: "comp",
    tracks: ["lead"],
    g: [8, 12],
    tag: "Kick-start a sustainability journey with Ivy League mentors, culminating in a competition with mentorship for finalists.",
    about: "Focused on mentoring young changemakers kick-starting their sustainability journeys, with guidance from Ivy League mentors and global leaders - culminating in a competition, with continued mentorship for finalists.",
    dur: "4 weekends",
    time: "See programme schedule",
    feeE: "USD 80",
    feeR: "USD 120",
    site: "https://learnwithleaders.com/competitions/the-huceg-sustainability-leaders-challenge-online/",
    apply: "https://learnwithleaders.com/application_form/harvard-sustainability-leaders-challenge/?pay-now=yes",
    cohorts: [
      { d: "2027-04-20" },
    ],
  },
  {
    id: "greenvan",
    name: "Greenvan Corporate Internship",
    type: "intern",
    tracks: ["ent"],
    g: [8, 12],
    tag: "Refine the business model of a London start-up and pitch marketing solutions to its senior leadership team.",
    about: "Student interns analyse Greenvan’s services (the \"Amazon of Services\" start-up in London), refine the business model and offer novel marketing solutions with a Harvard student mentor - culminating in a presentation to Greenvan’s senior leadership team.",
    dur: "8 weeks · Sundays",
    time: "10:00–11:00 AM ET",
    feeE: "USD 750",
    feeR: "USD 1,200",
    site: "https://learnwithleaders.com/fellowships/greenvan-corporate-internship-project/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLSfgMbYt80OqAA2FDnwaQzFUPJxmZkCUTQZq_SZ24ZiKpSUS2Q/viewform",
    cohorts: [
      { d: "2027-04-07" },
    ],
  },
  {
    id: "mun",
    name: "Model United Nations by HMCSF",
    type: "conf",
    tracks: ["deb", "lead"],
    g: [6, 12],
    tag: "An immersive two-day MUN simulation with Harvard Model Congress - a deep dive into global policy making.",
    about: "The HMCSF Model United Nations is an immersive two-day simulation exercise bringing together aspiring leaders for an unparalleled dive into international relations and global policy making.",
    dur: "2 days",
    time: "6:30–11:30 AM ET",
    feeE: "USD 80",
    feeR: "USD 100",
    site: "https://www.learnwithleaders.com/conference/model-united-nations-mun-program/",
    apply: "https://docs.google.com/forms/d/e/1FAIpQLScqSHaFs2DcWOMssNP0x9IPgQFtaM5arw4sEsl77NsUTdg8kQ/viewform",
    cohorts: [
      { d: "2026-11-08" },
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
    /(\d{1,2}(?::\d{2})?)\s*[–--]\s*(\d{1,2}(?::\d{2})?)\s*(AM|PM)/gi,
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
  intern: "Real work experience with partner organisations",
  conf: "Delegate-style summits, MUNs and simulations",
};

export const TYPE_ORDER: TypeKey[] = ["fel", "prog", "comp", "intern", "conf"];

export const TOTAL_COHORTS = PROGRAMMES.reduce((n, p) => n + p.cohorts.length, 0);


export const TYPE_IC: Record<TypeKey, string> = {
  fel: "🎓",
  prog: "📚",
  comp: "🏆",
  intern: "💼",
  conf: "🌐",
};

/** Editorially chosen flagships - the five a parent should look at first. */
export const TRENDING: { id: string; why: string }[] = [
  { id: "fdf", why: "The most asked-about pathway for future medics - clinical cases, live mentors, capstone." },
  { id: "ail", why: "Build and ship a real AI product; the fastest-moving skill on any application." },
  { id: "flf", why: "Moot court and legal reasoning - ideal first step for a law-curious teenager." },
  { id: "irf", why: "Harvard Student Agencies mentors and a published research paper in four months." },
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
    interest: "ent",
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
    type: "intern",
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
    ids: ["onw", "ydp", "yrp"],
  },
  {
    key: "deepen",
    band: "Grades 8–10",
    title: "Go deep, gather evidence",
    goal: "Commit to one or two interests, finish a mentor-led fellowship, and start collecting real work - projects, papers, pitches.",
    ids: ["jdf", "fef", "yrp"],
  },
  {
    key: "prove",
    band: "Grades 11–12",
    title: "Make it application-ready",
    goal: "Publish, compete and intern so the profile shows proof - a paper, an award or real work experience with a named organisation.",
    ids: ["rpf", "irf", "greenvan"],
  },
  {
    key: "verify",
    band: "Grades 9–12 · any stage",
    title: "Turn it into proof universities can check",
    goal: "The work only counts if an admissions officer can find it, read it and confirm it is real. Step 4 packages everything from steps 1–3.",
    ids: [],
    outcomes: OUTCOMES,
  },

];
