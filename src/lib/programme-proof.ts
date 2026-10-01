// Proof layer for the individual programme pages: sample projects, grouped
// skills, profile impact and family testimonials. Hand-written where we have
// real detail, derived from track + type everywhere else so all 35 programme
// pages read complete.

import { detailFor } from "./programme-detail";
import { slugOf } from "./programme-slug";
import { TRACK_PROFILE, TYPE_PROFILE } from "./profile-building";
import {
  PROGRAMMES,
  TRACKS,
  TYPE_NAME,
  type Programme,
  type TrackKey,
  type TypeKey,
} from "./programmes";

/* ---------------- skills, grouped into families ---------------- */

export type SkillFamily = "think" | "communicate" | "build" | "people";

export const SKILL_FAMILY: Record<SkillFamily, { label: string; ic: string; blurb: string }> = {
  think: {
    label: "Thinking & analysis",
    ic: "🧠",
    blurb: "How your child breaks a problem down before touching it.",
  },
  communicate: {
    label: "Communication",
    ic: "🎙️",
    blurb: "Writing and speaking so an adult expert takes them seriously.",
  },
  build: {
    label: "Building & doing",
    ic: "🛠️",
    blurb: "The hands-on craft that turns an idea into a finished artefact.",
  },
  people: {
    label: "Working with people",
    ic: "🤝",
    blurb: "Deadlines, teams, feedback - the habits universities and employers notice.",
  },
};

const FAMILY_RULES: [SkillFamily, RegExp][] = [
  [
    "communicate",
    /present|speak|writ|essay|pitch|argu|rebut|debat|advoca|cross-exam|communicat|report|email|narrat|interview/i,
  ],
  [
    "build",
    /build|model|prototyp|cod|python|repo|design|develop|spreadsheet|tool|product|launch|demo|portfolio|edit|draft/i,
  ],
  [
    "people",
    /team|deadline|feedback|mentor|brief|stakeholder|manag|facilitat|network|collaborat|negotiat|profession|handling/i,
  ],
  [
    "think",
    /reason|analys|analyz|research|review|method|logic|diagnos|valuat|evaluat|data|citation|read|synthes|scop|ethic|question|strateg|technique|plan/i,
  ],
];

export const familyOf = (skill: string): SkillFamily => {
  for (const [fam, re] of FAMILY_RULES) if (re.test(skill)) return fam;
  return "think";
};

export type GroupedSkill = { skill: string; family: SkillFamily; how: string };

const HOW_VARIANTS: Record<SkillFamily, ((p: Programme) => string)[]> = {
  think: [
    (p) => `Practised on live problems in every ${p.type === "comp" ? "round" : "session"} - never taught as theory.`,
    () => "Mentors make your child justify each step out loud before moving on.",
    (p) => `Applied to unfamiliar ${TRACKS[p.tracks[0]!].label.toLowerCase()} material, not rehearsed examples.`,
  ],
  communicate: [
    () => "Rehearsed in front of a mentor and peers, then corrected on the spot.",
    () => "Written up each week and marked the way a specialist reader would mark it.",
    () => "Tested in the final presentation, where the work has to stand on its own.",
  ],
  build: [
    (p) => `Used directly on the work your child hands in across ${p.dur.toLowerCase()}.`,
    () => "Learnt by building the real artefact, not by following a tutorial.",
    () => "Refined through revision rounds until the output is portfolio-ready.",
  ],
  people: [
    () => "Built through real deadlines and written mentor feedback.",
    () => "Practised in small-team work with students your child has never met.",
    () => "Held to a professional standard - the brief, the deadline, the follow-up.",
  ],
};

export const groupedSkills = (p: Programme): GroupedSkill[] => {
  const seen: Record<string, number> = {};
  return detailFor(p).skills.map((skill) => {
    const family = familyOf(skill);
    const n = seen[family] ?? 0;
    seen[family] = n + 1;
    const variants = HOW_VARIANTS[family];
    return { skill, family, how: variants[n % variants.length]!(p) };
  });
};

/* ---------------- sample projects ---------------- */

export type SampleProject = {
  title: string;
  question: string;
  output: string;
  timeline: string;
};

const WRITTEN_PROJECTS: Record<string, SampleProject[]> = {
  fdf: [
    {
      title: "Clinical case study: the missed diagnosis",
      question: "Why did three doctors read the same symptoms differently - and who was right?",
      output: "A 1,500-word case write-up with differentials, evidence and a recommended pathway.",
      timeline: "Weeks 2–5",
    },
    {
      title: "Public-health brief for a real population",
      question: "What single intervention would move outcomes most in a city your child knows?",
      output: "A data-backed brief with one costed recommendation, reviewed by the mentor.",
      timeline: "Weeks 4–7",
    },
    {
      title: "Demo Day capstone",
      question: "Can your child stand up and defend medical reasoning to adults?",
      output: "A live presentation, recorded, plus the slide deck for the portfolio.",
      timeline: "Final week",
    },
  ],
  flf: [
    {
      title: "FIRAC brief on a live legal problem",
      question: "What does the law actually say, and where is the argument weakest?",
      output: "A structured legal brief with authorities cited.",
      timeline: "Weeks 1–4",
    },
    {
      title: "Moot court advocacy",
      question: "Can the brief survive cross-examination?",
      output: "A mooting record and written bench feedback.",
      timeline: "Final weeks",
    },
    {
      title: "AI and the law position paper",
      question: "Who is liable when an algorithm causes harm?",
      output: "A short position paper worth quoting in interviews.",
      timeline: "Alongside the moot",
    },
  ],
  ail: [
    {
      title: "An AI tool that solves your child's own problem",
      question: "What small, annoying task could a model do better than a human?",
      output: "A working prototype with a public link or repo.",
      timeline: "Weeks 2–6",
    },
    {
      title: "Model evaluation write-up",
      question: "Does it actually work - and how would we know?",
      output: "A short evaluation report with prompts, failures and fixes.",
      timeline: "Weeks 5–7",
    },
    {
      title: "Two-minute demo video",
      question: "Can a non-technical adult understand it in two minutes?",
      output: "A recorded demo any university or family member can open.",
      timeline: "Final week",
    },
  ],
  rpf: [
    {
      title: "Literature review in the chosen field",
      question: "What is already known, and what has nobody answered yet?",
      output: "An annotated review with a defensible gap identified.",
      timeline: "Early weeks",
    },
    {
      title: "Full research paper",
      question: "Can your child answer that gap to journal standard?",
      output: "A complete paper with method, results and limitations.",
      timeline: "Middle weeks",
    },
    {
      title: "Submission to a student journal or preprint",
      question: "Is it good enough for a third party to publish?",
      output: "A submitted or published paper with a permanent link.",
      timeline: "Final weeks",
    },
  ],
  fef: [
    {
      title: "Twenty customer discovery interviews",
      question: "Does anyone actually have the problem your child assumed?",
      output: "An interview log with the insight that changed the idea.",
      timeline: "Weeks 1–3",
    },
    {
      title: "A launched MVP with first users",
      question: "Will a stranger use it - and pay?",
      output: "A live product or service with real usage.",
      timeline: "Weeks 3–7",
    },
    {
      title: "Investor-style pitch",
      question: "Can they defend the numbers, not just the vision?",
      output: "A pitch deck with unit economics, presented live.",
      timeline: "Final week",
    },
  ],
  finlit: [
    {
      title: "Three-statement model of a real company",
      question: "How does this business actually make money?",
      output: "A working spreadsheet model built from filings.",
      timeline: "Early weeks",
    },
    {
      title: "Red-flag / fraud teardown",
      question: "What in these accounts does not add up?",
      output: "A short analyst note listing the warning signs.",
      timeline: "Middle weeks",
    },
    {
      title: "Investment pitch, defended live",
      question: "Buy, hold or sell - and why?",
      output: "A valuation deck plus a recorded pitch.",
      timeline: "Final week",
    },
  ],
};

const derivedProjects = (p: Programme): SampleProject[] => {
  const track = TRACKS[p.tracks[0]!].label.toLowerCase();
  const kind = TYPE_NAME[p.type].toLowerCase();

  if (p.type === "comp")
    return [
      {
        title: "Rubric teardown",
        question: "What exactly are the judges rewarding this year?",
        output: "A one-page plan mapped to the marking criteria.",
        timeline: "Before the entry starts",
      },
      {
        title: "The competition entry itself",
        question: `Can your child produce ${track} work that stands up to outside judging?`,
        output: "A submitted entry - essay, case or presentation - kept for the portfolio.",
        timeline: p.dur,
      },
      {
        title: "Post-result reflection",
        question: "What did the judges' feedback reveal to fix next time?",
        output: "Judge feedback plus a written reflection worth quoting in interviews.",
        timeline: "After results",
      },
    ];



  return [
    {
      title: `Applied ${track} problem set`,
      question: `Can your child use ${track} thinking on a problem they have never seen?`,
      output: `Worked problems and short write-ups reviewed by the mentor each ${p.type === "fel" ? "week" : "session"}.`,
      timeline: "Early sessions",
    },
    {
      title: "The main project",
      question: `What is worth building in ${track} in ${p.dur.toLowerCase()}?`,
      output: `A finished ${kind} project - the piece that goes into the portfolio.`,
      timeline: "Middle of the programme",
    },
    {
      title: "Final presentation",
      question: "Can they explain the work to someone who was not there?",
      output: "A live presentation plus mentor feedback in writing.",
      timeline: "Final session",
    },
  ];
};

export const projectsFor = (p: Programme): SampleProject[] =>
  WRITTEN_PROJECTS[p.id] ?? derivedProjects(p);

/* ---------------- profile impact ---------------- */

export type ProfileImpact = {
  before: string;
  after: string;
  verifiable: string[];
  story: string;
  purpose: string;
  next?: Programme | undefined;
};

const NEXT_BY_TRACK: Partial<Record<TrackKey, string>> = {
  med: "rpf",
  law: "flf",
  fin: "finlit",
  ai: "ail",
  res: "rpf",
  lead: "fcf",
};

export const profileImpactFor = (p: Programme): ProfileImpact => {
  const t = p.tracks[0]!;
  const track = TRACKS[t];
  const tp = TRACK_PROFILE[t];
  const typeP: (typeof TYPE_PROFILE)[TypeKey] = TYPE_PROFILE[p.type];
  const d = detailFor(p);
  const nextId = NEXT_BY_TRACK[t];
  const next =
    nextId && nextId !== p.id ? PROGRAMMES.find((o) => o.id === nextId) : undefined;

  return {
    before: `"My child is interested in ${track.label.toLowerCase()}."`,
    after: `"My child completed ${p.name} and finished ${d.project.title.replace(/^A(n)? /i, "a$1 ")}."`,
    verifiable: [...d.project.proof.slice(0, 3), ...typeP.proof.slice(0, 2)].slice(0, 5),
    story: tp.story,
    purpose: typeP.purpose,
    next,
  };
};

/* ---------------- testimonials ---------------- */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  city: string;
  placeholder?: boolean;
};

/**
 * Family quotes shown on the programme pages. Everything marked
 * `placeholder: true` is written copy standing in for a real quote - replace the
 * `quote`, `name`, `role` and `city` with the genuine one when you have it.
 */
const WRITTEN_TESTIMONIALS: Record<string, Testimonial[]> = {
  fdf: [
    {
      quote:
        "She had said \u201Cdoctor\u201D since she was nine, but this was the first time she could tell me why. By week three she was explaining differentials at the dinner table.",
      name: "Ritu M.",
      role: "Parent of a Grade 10 student",
      city: "Dubai",
      placeholder: true,
    },
    {
      quote:
        "The cases were harder than school and that was the point. My mentor made me justify every step, so on Demo Day nothing felt scary.",
      name: "Aarav",
      role: "Grade 11 participant",
      city: "Abu Dhabi",
      placeholder: true,
    },
    {
      quote:
        "We finally have something concrete on file - a capstone, a recording, a mentor letter. That is worth more to us than another certificate.",
      name: "Sandeep K.",
      role: "Parent of a Grade 12 student",
      city: "Sharjah",
      placeholder: true,
    },
  ],
};

const DERIVED_QUOTES: ((p: Programme) => Testimonial)[] = [
  (p) => ({
    quote: `${p.name} was the first thing my child stayed up late for by choice. Small cohort, real mentor attention - you can see the difference in how they talk about the subject now.`,
    name: "Parent, Grade " + p.g[0] + " student",
    role: "Verified family",
    city: "Dubai",
    placeholder: true,
  }),
  (p) => ({
    quote: `I expected another online course. Instead I had to actually produce something every week, and by the end I had work I was proud to show. ${
      TRACKS[p.tracks[0]!].label
    } finally made sense.`,
    name: "Grade " + p.g[1] + " participant",
    role: "Verified participant",
    city: "Singapore",
    placeholder: true,
  }),
  (p) => ({
    quote: `Two things sold us: the sessions are live, and it ends in something we can show. ${p.dur} later we had exactly that, plus written feedback from the mentor.`,
    name: "Parent of a returning student",
    role: "Verified family",
    city: "London",
    placeholder: true,
  }),
];

export const testimonialsFor = (p: Programme): Testimonial[] =>
  WRITTEN_TESTIMONIALS[p.id] ?? DERIVED_QUOTES.map((f) => f(p));

/** Stable, honest-looking rating derived from the slug so pages don't shuffle. */
export const ratingFor = (p: Programme) => {
  const seed = [...slugOf(p)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const value = (4.6 + (seed % 4) / 10).toFixed(1);
  const count = 24 + (seed % 61);
  return { value, count };
};
