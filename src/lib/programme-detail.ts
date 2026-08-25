// Per-programme landing page content. Hand-written for the flagships, derived
// from the catalogue for everything else so every page reads complete.

import {
  PROGRAMMES,
  TRACKS,
  TYPE_NAME,
  type Programme,
  type TypeKey,
} from "./programmes";

export type DoStep = { title: string; body: string };
export type Faq = { q: string; a: string };

export type ProgrammeDetail = {
  lede: string;
  cohortSize: string;
  ageLabel: string;
  doSteps: DoStep[];
  takeaways: string[];
  mentorTitle: string;
  mentorBody: string;
  faqs: Faq[];
};

export const slugOf = (p: Programme) =>
  p.name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const programmeBySlug = (slug: string): Programme | undefined =>
  PROGRAMMES.find((p) => slugOf(p) === slug);

export const programmePath = (p: Programme) => `/programmes/${slugOf(p)}` as const;

/* ---------- hand-written detail for the flagships ---------- */

const WRITTEN: Record<string, Partial<ProgrammeDetail>> = {
  fdf: {
    lede: "An 8-week pre-med fellowship where your child solves 16+ real clinical cases with a dedicated Harvard student mentor — in a cohort of just 4 to 6 students, ending in a capstone project and Demo Day.",
    cohortSize: "4–6 students",
    doSteps: [
      {
        title: "Solve 16+ real clinical cases",
        body: "Work through genuine medical scenarios the way clinicians do — symptoms, tests, differentials, decisions.",
      },
      {
        title: "Debate medical ethics",
        body: "Argue the hard questions doctors face, and learn to defend a position with evidence.",
      },
      {
        title: "Explore healthcare careers",
        body: "See the paths beyond \u201Cdoctor\u201D — and what it actually takes to get into each one.",
      },
      {
        title: "Build a capstone project",
        body: "Choose one of four project tracks and build something portfolio-ready over the fellowship.",
      },
      {
        title: "Present at Demo Day",
        body: "Stand up and present the capstone — the confidence moment parents tell us about most.",
      },
    ],
    takeaways: [
      "Certificate of Completion",
      "Letter of Participation",
      "Portfolio-ready capstone",
      "Weekly parent progress reports",
    ],
    mentorTitle: "A dedicated Harvard student mentor, not a rotating cast",
    mentorBody:
      "Each cohort of 4–6 students works with one Harvard student mentor for all eight weeks — someone recently through the pre-med journey themselves, who learns your child's strengths and pushes them accordingly.",
    faqs: [
      {
        q: "Is my child ready for this?",
        a: "The fellowship is built for Grades 8–12 (ages 13–18) who are curious about medicine — no prior medical knowledge is needed. For Grades 5–8, the Junior Doctor Fellowship is the better on-ramp.",
      },
      {
        q: "How much time does it take each week?",
        a: "One live 90-minute session on Saturdays, plus light case preparation between sessions. It's designed to sit alongside school, not compete with it.",
      },
      {
        q: "How will I know how my child is doing?",
        a: "You receive a written progress report every week from the mentor, and you're invited to the Demo Day presentation at the end.",
      },
    ],
  },
  jdf: {
    lede: "A gentle, case-based first step into medicine for Grades 5–8: six medical mysteries, the human body system by system, and a capstone health project presented at Demo Day.",
    cohortSize: "Small live cohort",
    doSteps: [
      {
        title: "Solve six medical mysteries",
        body: "Role-play the clinician: gather clues, rule things out and reach a diagnosis with a mentor guiding the reasoning.",
      },
      {
        title: "Explore the body system by system",
        body: "Heart, lungs, brain, immunity — taught through cases rather than textbook diagrams.",
      },
      {
        title: "Build a Casebook Portfolio",
        body: "Every case gets written up, so your child finishes with something tangible they are proud of.",
      },
      {
        title: "Present a capstone health project",
        body: "A short, well-rehearsed Demo Day presentation — usually the first time they present to adults outside school.",
      },
    ],
    takeaways: [
      "Certificate of Completion",
      "Casebook Portfolio",
      "Demo Day presentation experience",
      "Weekly parent progress reports",
    ],
    mentorTitle: "Mentors who make medicine feel possible",
    mentorBody:
      "Sessions are led by mentors from top universities who are close enough in age to be relatable and experienced enough to be trusted. The tone is curious and encouraging — never a lecture.",
    faqs: [
      {
        q: "Is Grade 5 too young?",
        a: "No. The cases are written for ages 10–14 and use everyday language. Curiosity matters far more than science background.",
      },
      {
        q: "What if my child is shy?",
        a: "Cohorts are deliberately small so quieter students get spoken to by name every session, and Demo Day is rehearsed before it happens.",
      },
      {
        q: "What comes next?",
        a: "Most families move on to the Future Doctors Fellowship in Grade 8 or 9, which goes far deeper into clinical reasoning.",
      },
    ],
  },
  flf: {
    lede: "A Harvard student-mentored pre-law fellowship: how US courts really work, FIRAC case analysis, LSAT fundamentals, AI & the Law — finishing with a live Moot Court simulation.",
    doSteps: [
      {
        title: "Read and break down real cases",
        body: "Learn FIRAC — facts, issue, rule, analysis, conclusion — the method law students use from week one.",
      },
      {
        title: "Write like a lawyer",
        body: "Short legal memos with a clear position, evidence and a conclusion that holds up under questioning.",
      },
      {
        title: "Debate AI & the Law and legal ethics",
        body: "The questions the profession is arguing about right now, argued by your child with a mentor pushing back.",
      },
      {
        title: "Argue a live Moot Court",
        body: "Stand up, present a case, take questions — the moment most students say made law feel real.",
      },
    ],
    takeaways: [
      "Certificate of Completion",
      "Letter of Participation",
      "Written legal memo for the portfolio",
      "Moot Court experience",
    ],
    mentorTitle: "Taught by Harvard students, not a recorded course",
    mentorBody:
      "Mentors are current Harvard students who have been through competitive admissions and debate rooms recently. Every session is live, and every memo gets individual feedback.",
    faqs: [
      {
        q: "Does my child need debate experience?",
        a: "No. Structure is taught from scratch, and the Moot Court is scaffolded across the fellowship so nobody is thrown in cold.",
      },
      {
        q: "Is this only useful for future lawyers?",
        a: "The core skills — reading closely, arguing with evidence, writing tightly — transfer to any competitive university application.",
      },
      {
        q: "How is progress shared with parents?",
        a: "You get feedback on written work and an invitation to the Moot Court session at the end.",
      },
    ],
  },
  finlit: {
    lede: "An AI-native finance fellowship with HPAIR: investing, financial analysis, fraud detection and venture strategy — with a real project defended live before a mentor panel.",
    doSteps: [
      {
        title: "Learn how money actually works",
        body: "Markets, valuation, risk and budgeting taught through live company examples rather than definitions.",
      },
      {
        title: "Analyse real companies",
        body: "Read statements, build a simple model and form a view your child can justify with numbers.",
      },
      {
        title: "Use AI as a research analyst",
        body: "Practise AI-assisted research the way analysts now do — including spotting where the AI is wrong.",
      },
      {
        title: "Investigate financial fraud",
        body: "Work famous fraud cases backwards and learn the red flags professionals look for.",
      },
      {
        title: "Defend a capstone project",
        body: "An investment thesis, budgeting tool or venture pitch, presented and questioned by a mentor panel.",
      },
    ],
    takeaways: [
      "Certificate of Completion",
      "Capstone investment thesis or venture pitch",
      "AI research workflow they keep using",
      "Mentor panel feedback",
    ],
    mentorTitle: "Delivered in partnership with HPAIR",
    mentorBody:
      "Mentors come from the Harvard Project for Asian and International Relations network and from finance itself, so the standard for the final defence is set by people who do this professionally.",
    faqs: [
      {
        q: "Does my child need maths beyond school level?",
        a: "No. Comfortable arithmetic and curiosity are enough; the modelling is taught step by step.",
      },
      {
        q: "Is this about picking stocks?",
        a: "No. It is about reasoning with financial evidence — which is what universities and employers actually value.",
      },
      {
        q: "How long is each session?",
        a: "Two hours on Saturdays across eight weeks, with light preparation between sessions.",
      },
    ],
  },
  ail: {
    lede: "Three build weekends where your child ships a real AI product using Claude, Cursor, Lovable and Perplexity — ending in a live Demo Day and a public Builder Profile.",
    doSteps: [
      {
        title: "Find a problem worth solving",
        body: "Start from something your child actually cares about, then scope it down to something buildable.",
      },
      {
        title: "Build with professional AI tools",
        body: "Claude, Lovable, Cursor and Perplexity used the way working builders use them — not toy exercises.",
      },
      {
        title: "Ship a working product",
        body: "A live link other people can use, iterated on with mentor feedback across the build days.",
      },
      {
        title: "Present at Demo Day",
        body: "A short founder-style demo to mentors and parents, with a recorded demo video to keep.",
      },
    ],
    takeaways: [
      "Certificate of Completion",
      "A live AI product with a public link",
      "Public Builder Profile",
      "Demo video for applications",
    ],
    mentorTitle: "A 1:20 Harvard mentor ratio on every build day",
    mentorBody:
      "Build days are staffed so that no student sits stuck. Mentors are Harvard students who build with these tools themselves and review each product as it is shipped.",
    faqs: [
      {
        q: "Does my child need to code?",
        a: "No. The tools are AI-first, so students go from idea to working product without prior programming experience — though coders go deeper.",
      },
      {
        q: "What will they have to show afterwards?",
        a: "A live product link, a demo video and a public Builder Profile — all of which sit well in a university application.",
      },
      {
        q: "Is a laptop required?",
        a: "Yes, a laptop with a stable connection. Everything else runs in the browser.",
      },
    ],
  },
  rpf: {
    lede: "An eight-week mentored fellowship that takes your child from research question to a genuinely published paper — with publication guaranteed.",
    doSteps: [
      {
        title: "Choose a defensible research question",
        body: "Narrow a broad interest into something a school student can actually investigate well.",
      },
      {
        title: "Review the literature properly",
        body: "Find, read and cite real sources — the skill most first-year undergraduates arrive without.",
      },
      {
        title: "Write to journal structure",
        body: "Abstract, method, findings, discussion — drafted and redrafted with a mentor line by line.",
      },
      {
        title: "Submit and publish",
        body: "Guided submission through to publication, so the work exists at a permanent link.",
      },
    ],
    takeaways: [
      "Published paper with a citable link",
      "Certificate of Completion",
      "Mentor letter of participation",
      "Academic writing method they reuse",
    ],
    mentorTitle: "One research mentor for the whole eight weeks",
    mentorBody:
      "Your child works with a single mentor who knows the paper as well as they do, which is why drafts improve quickly rather than circling.",
    faqs: [
      {
        q: "What does the publication guarantee mean?",
        a: "Students who complete the fellowship and follow mentor feedback are guaranteed publication in a student-appropriate journal.",
      },
      {
        q: "Which subjects are possible?",
        a: "Sciences, social sciences, economics, public health and humanities are all supported — the question matters more than the field.",
      },
      {
        q: "How much writing is involved?",
        a: "Expect a few hours a week between sessions. It is the most demanding programme we run, and the most rewarding.",
      },
    ],
  },
  irf: {
    lede: "Four months with Harvard Student Agencies mentors, turning your child's chosen cause into measurable impact and a published research paper.",
    doSteps: [
      {
        title: "Define the impact goal",
        body: "Pick a cause and define what success looks like in numbers, not intentions.",
      },
      {
        title: "Research the evidence base",
        body: "Understand what has already been tried, and what the data says about why it worked or failed.",
      },
      {
        title: "Run a real initiative",
        body: "Execute something small and real, then measure the outcome honestly.",
      },
      {
        title: "Publish the findings",
        body: "Write the work up to publication standard so it stands as proof, not a claim.",
      },
    ],
    takeaways: [
      "Published research paper",
      "Evidence of a real-world initiative",
      "Certificate and mentor letter",
      "Portfolio-ready impact write-up",
    ],
    mentorTitle: "Mentored through Harvard Student Agencies",
    mentorBody:
      "Mentors hold students to a university standard of evidence over four months — long enough for the work to become substantial rather than a one-off project.",
    faqs: [
      {
        q: "Four months alongside school — is that realistic?",
        a: "Yes. The pace is deliberately steady, with fortnightly checkpoints rather than intense sprints.",
      },
      {
        q: "Who is this best suited to?",
        a: "Grades 8–12 students who already have a cause they care about and want proof of impact for applications.",
      },
      {
        q: "Is prior research experience needed?",
        a: "No, but the fellowship expects consistency. Students who show up every fortnight finish with something exceptional.",
      },
    ],
  },
  fef: {
    lede: "Three weekends of building a venture from scratch — customer conversations, a working model, unit economics and a live pitch to mentors.",
    doSteps: [
      {
        title: "Test an idea with real people",
        body: "Talk to potential customers before building anything, and let the answers change the plan.",
      },
      {
        title: "Build the business model",
        body: "Pricing, costs and unit economics your child can explain on one page.",
      },
      {
        title: "Make a first version",
        body: "A prototype, landing page or service anyone can actually try.",
      },
      {
        title: "Pitch to a mentor panel",
        body: "Seven minutes, real questions, honest feedback — and a pitch deck to keep.",
      },
    ],
    takeaways: [
      "Certificate of Completion",
      "Pitch deck and business model",
      "Prototype or landing page",
      "Mentor panel feedback",
    ],
    mentorTitle: "Mentors who have actually built things",
    mentorBody:
      "Sessions are led by student founders and operators, so feedback is practical rather than theoretical — what to cut, what to test next, what nobody will pay for.",
    faqs: [
      {
        q: "Does my child need a business idea already?",
        a: "No. The first weekend is about finding and testing ideas, so students arriving with nothing are fine.",
      },
      {
        q: "Is this useful without starting a company?",
        a: "Yes — the pitching, numbers and customer-research skills show up in interviews and applications immediately.",
      },
      {
        q: "How are teams formed?",
        a: "Students can work solo or in small teams; mentors help match complementary interests.",
      },
    ],
  },
};

/* ---------- derived defaults by type ---------- */

const TAKEAWAYS: Record<TypeKey, string[]> = {
  fel: [
    "Certificate of Completion",
    "Letter of Participation",
    "Portfolio-ready capstone",
    "Parent progress updates",
  ],
  prog: [
    "Certificate of Completion",
    "Project or portfolio artefact",
    "Live mentor feedback",
    "Parent progress updates",
  ],
  comp: [
    "Certificate of Participation",
    "Judging feedback and ranking",
    "Awards for top entries",
    "A submission to show universities",
  ],
  intern: [
    "Internship completion certificate",
    "Named organisation on the CV",
    "Real deliverable for the team",
    "Mentor feedback on the work",
  ],
  conf: [
    "Certificate of Participation",
    "Awards for standout delegates",
    "Position paper for the portfolio",
    "Public-speaking experience",
  ],
};

const derivedSteps = (p: Programme): DoStep[] => {
  const track = TRACKS[p.tracks[0]!].label.toLowerCase();
  const kind = TYPE_NAME[p.type].toLowerCase();
  if (p.type === "comp")
    return [
      {
        title: "Understand what judges reward",
        body: `A live briefing on the ${p.name} rubric, so your child knows what a winning entry looks like before starting.`,
      },
      {
        title: "Research and build the entry",
        body: `Structured work across ${p.dur.toLowerCase()}, with checkpoints rather than a last-minute scramble.`,
      },
      {
        title: "Submit and get judged",
        body: "Entries are assessed by the organising panel, with feedback and rankings returned to every participant.",
      },
    ];
  if (p.type === "intern")
    return [
      {
        title: "Get briefed by the organisation",
        body: `A real brief from the ${p.name.replace(/ Corporate Internship| Internship/, "")} team — the same framing their own analysts get.`,
      },
      {
        title: "Do the work in a small team",
        body: `Weekly working sessions across ${p.dur.toLowerCase()}, with a mentor reviewing progress.`,
      },
      {
        title: "Present to the company",
        body: "Final recommendations presented back to the organisation, and a certificate naming the internship.",
      },
    ];
  if (p.type === "conf")
    return [
      {
        title: "Prepare a country and position",
        body: "Research the brief, write a position paper and learn conference procedure before day one.",
      },
      {
        title: "Debate in committee",
        body: "Speak, caucus, negotiate and amend resolutions in a properly chaired committee.",
      },
      {
        title: "Pass a resolution",
        body: "Work a draft through to a vote — and see whether the coalition holds.",
      },
    ];
  return [
    {
      title: `Learn ${track} the applied way`,
      body: `${p.tag} Every session is live and mentor-led, with discussion instead of lecture.`,
    },
    {
      title: "Work on something real each week",
      body: `Across ${p.dur.toLowerCase()}, students produce work rather than notes — cases, drafts, builds or analyses depending on the ${kind}.`,
    },
    {
      title: "Get individual mentor feedback",
      body: "Cohorts are kept small so mentors know each student by name and push them at the right level.",
    },
    {
      title: "Finish with something to show",
      body: "A final project or presentation your child can put in front of a university, a school or you.",
    },
  ];
};

const derivedFaqs = (p: Programme): Faq[] => [
  {
    q: "Is my child the right age for this?",
    a: `It is designed for Grades ${p.g[0]}–${p.g[1]}. No prior background is assumed — mentors calibrate to the cohort in the first session.`,
  },
  {
    q: "How much time does it take?",
    a: `${p.dur} in total, with live sessions ${p.time.replace(/^\s+/, "").toLowerCase()} plus light preparation in between. It is built to sit alongside school.`,
  },
  {
    q: "What if we miss a session?",
    a: "Tell the team in advance and they will share the materials and arrange a catch-up so your child rejoins without falling behind.",
  },
  {
    q: "How do we pay and confirm a place?",
    a: `Places are confirmed on the ${p.name} application page. Fees shown here are correct at time of publishing — always confirm on the programme page before paying.`,
  },
];

export const detailFor = (p: Programme): ProgrammeDetail => {
  const w = WRITTEN[p.id] ?? {};
  return {
    lede: w.lede ?? `${p.tag} ${p.about}`.trim(),
    cohortSize: w.cohortSize ?? (p.type === "conf" ? "Full delegate committee" : "Small live cohort"),
    ageLabel: w.ageLabel ?? `Grades ${p.g[0]}–${p.g[1]} (${p.g[0] + 5}–${p.g[1] + 5})`,
    doSteps: w.doSteps ?? derivedSteps(p),
    takeaways: w.takeaways ?? TAKEAWAYS[p.type],
    mentorTitle: w.mentorTitle ?? "Live mentors, every single session",
    mentorBody:
      w.mentorBody ??
      `${p.name} is taught live by mentors from leading universities and partner organisations — never pre-recorded. Small cohorts mean your child is spoken to by name, not counted in an audience.`,
    faqs: w.faqs ?? derivedFaqs(p),
  };
};

/** Three sensible next reads: same interest first, then same grade band. */
export const relatedProgrammes = (p: Programme): Programme[] => {
  const sameTrack = PROGRAMMES.filter(
    (o) => o.id !== p.id && o.tracks.some((t) => p.tracks.includes(t)),
  );
  const overlapping = PROGRAMMES.filter(
    (o) =>
      o.id !== p.id &&
      !sameTrack.includes(o) &&
      o.g[0] <= p.g[1] &&
      o.g[1] >= p.g[0],
  );
  return [...sameTrack, ...overlapping].slice(0, 3);
};
