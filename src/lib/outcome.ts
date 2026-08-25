// Parent-language outcome lines: what the child walks away with, in one breath.
// Kept in a tiny standalone module so the finder list stays light.

import { TYPE_NAME, parseISO, type Programme } from "./programmes";

/** id -> "what they finish with" (plain, checkable, no marketing adjectives). */
export const OUTCOME_LINE: Record<string, string> = {
  fdf: "Finishes with a clinical capstone project presented on Demo Day",
  jdf: "Finishes with a first case write-up and a clear view of medicine",
  flf: "Finishes with a mooted case argued in front of mentors",
  finlit: "Finishes with a personal investment thesis and a pitch",
  ail: "Finishes with a working AI build they can demo and explain",
  fef: "Finishes with a validated business idea and an investor-style pitch",
  fcf: "Finishes with a community impact project plan they can run",
  ydf: "Finishes with three judged debates and a speaking showreel",
  rpf: "Finishes with a research paper prepared for publication",
  alp: "Finishes with a leadership brief and a 360 feedback report",
  comm: "Finishes with a recorded keynote and a communication plan",
  irf: "Finishes with a four-month research and impact portfolio",
  onw: "Finishes with a six-week growth plan and study habits that stick",
  yep: "Finishes with a mini-venture launched and first customers approached",
  yrp: "Finishes with a structured research abstract and poster",
  sat: "Finishes with full-length SAT practice scores and a section strategy",
  wla: "Finishes with a Yale-mentored global policy brief",
  ydp: "Finishes with a term of weekly debates and a judged final",
  rsp: "Finishes with a scholar-reviewed research report",
  fd1: "Finishes with a first taste of clinical reasoning and a case log",
  fd2: "Finishes with an advanced case analysis and specialism shortlist",
  flp: "Finishes with a legal argument written and defended",
  fl2: "Finishes with an advanced moot and a legal writing sample",
  fep: "Finishes with a business model canvas and a pitch deck",
  fcp: "Finishes with a sustainability project proposal",
  aiml: "Finishes with two machine-learning models built from scratch",
  calm: "Finishes with an exam-calm routine they actually use",
  hmcl: "Finishes with a committee position paper and floor speech",
  fmun: "Finishes with MUN-ready research, speeches and negotiation practice",
  wds: "Finishes with international debate rounds and a judged ranking",
  wow: "Finishes with a managed portfolio and a ranked trading record",
  yire: "Finishes with a competition essay entered and judged at Yale",
  huceg: "Finishes with a sustainability challenge entry judged by Harvard students",
  greenvan: "Finishes with a real internship deliverable and a reference",
  mun: "Finishes with two days of live MUN diplomacy and an award shot",
};

export const outcomeOf = (p: Programme): string =>
  OUTCOME_LINE[p.id] ?? `Finishes with a completed ${TYPE_NAME[p.type].toLowerCase()} project`;

/** Rough weekly commitment in hours, for the "how much time" quiz filter. */
export const WEEKLY_HOURS: Record<string, number> = {
  fdf: 4,
  jdf: 2,
  flf: 2,
  finlit: 3,
  ail: 3,
  fef: 2,
  fcf: 2,
  ydf: 2,
  rpf: 5,
  alp: 2,
  comm: 2,
  irf: 5,
  onw: 2,
  yep: 3,
  yrp: 3,
  sat: 4,
  wla: 2,
  ydp: 2,
  rsp: 4,
  fd1: 2,
  fd2: 2,
  flp: 2,
  fl2: 2,
  fep: 2,
  fcp: 2,
  aiml: 5,
  calm: 1,
  hmcl: 2,
  fmun: 2,
  wds: 2,
  wow: 3,
  yire: 3,
  huceg: 2,
  greenvan: 4,
  mun: 2,
};

export const weeklyHoursOf = (p: Programme): number => WEEKLY_HOURS[p.id] ?? 3;

/**
 * Human start line: "Starts Sat 12 Sept". Deliberately short enough to sit
 * next to a time and a fee on one row.
 */
export const startLabel = (iso: string): string =>
  `Starts ${parseISO(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })}`;
