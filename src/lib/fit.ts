// The "Find the fit" quiz: answer shape, options, deterministic shortlisting.
// Hard rules (grade, timezone, upcoming cohorts) run in code so the AI only
// ever ranks programmes a child can actually attend.

import {
  TRACKS,
  TYPE_NAME,
  feeOf,
  upcomingProgrammes,
  type Cohort,
  type Programme,
  type TrackKey,
} from "./programmes";
import { fitsRegion, REGIONS, REGION_ORDER } from "./regions";
import { outcomeOf, weeklyHoursOf } from "./outcome";

export type FitAnswers = {
  grade: string;
  interests: string;
  hours: string;
  goal: string;
  region: string;
};

export const DEFAULT_FIT: FitAnswers = {
  grade: "",
  interests: "",
  hours: "",
  goal: "",
  region: "",
};

const str = (v: unknown) => (typeof v === "string" ? v.slice(0, 120) : "");

export const validateFitSearch = (raw: Record<string, unknown>): FitAnswers => ({
  grade: str(raw["grade"]),
  interests: str(raw["interests"]),
  hours: str(raw["hours"]),
  goal: str(raw["goal"]),
  region: str(raw["region"]),
});

export const GRADE_STEPS = [
  { value: "5", label: "Grade 5–6", lo: 5, hi: 6 },
  { value: "7", label: "Grade 7–8", lo: 7, hi: 8 },
  { value: "9", label: "Grade 9–10", lo: 9, hi: 10 },
  { value: "11", label: "Grade 11–12", lo: 11, hi: 12 },
];

export const INTEREST_OPTIONS: { value: TrackKey; label: string; ic: string }[] = (
  Object.keys(TRACKS) as TrackKey[]
).map((k) => ({ value: k, label: TRACKS[k].label, ic: TRACKS[k].ic }));

export const HOURS_OPTIONS = [
  { value: "1", label: "An hour or two a week", cap: 2 },
  { value: "3", label: "Half a weekend day", cap: 3.5 },
  { value: "5", label: "They can go all in", cap: 12 },
];

export type GoalKey = "proof" | "portfolio" | "marks" | "confidence" | "explore";

export const GOAL_OPTIONS: { value: GoalKey; label: string; sub: string }[] = [
  {
    value: "proof",
    label: "Something universities can verify",
    sub: "Mentor-signed work, publications, awards",
  },
  {
    value: "portfolio",
    label: "A real project to show",
    sub: "A build, a venture, a paper, a portfolio piece",
  },
  { value: "marks", label: "Better marks and test scores", sub: "SAT, focus, study habits" },
  {
    value: "confidence",
    label: "Confidence and speaking",
    sub: "Debate, MUN, presenting to a room",
  },
  { value: "explore", label: "Just exploring interests", sub: "Try a field before committing" },
];

export const REGION_STEPS = REGION_ORDER.map((k) => ({
  value: k,
  label: REGIONS[k].label,
  note: REGIONS[k].note,
}));

export const interestList = (a: FitAnswers): TrackKey[] =>
  a.interests
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is TrackKey => s in TRACKS);

export const fitComplete = (a: FitAnswers) =>
  Boolean(a.grade && a.interests && a.hours && a.goal && a.region);

const GOAL_TRACKS: Record<GoalKey, TrackKey[]> = {
  proof: ["res", "med", "law"],
  portfolio: ["ai", "res"],
  marks: ["sat"],
  confidence: ["law", "lead"],
  explore: [],
};

const GOAL_TYPES: Record<GoalKey, string[]> = {
  proof: ["fel", "comp"],
  portfolio: ["fel", "prog"],
  marks: ["prog"],
  confidence: ["prog", "comp"],
  explore: ["prog"],
};

export type FitCandidate = {
  p: Programme;
  next: Cohort;
  score: number;
};

/** Hard rules first, then a transparent score. Never returns an unattendable row. */
export function fitCandidates(a: FitAnswers): FitCandidate[] {
  const step = GRADE_STEPS.find((g) => g.value === a.grade);
  const interests = interestList(a);
  const goal = (a.goal || "explore") as GoalKey;
  const cap = HOURS_OPTIONS.find((h) => h.value === a.hours)?.cap ?? 12;

  return upcomingProgrammes()
    .filter((p) => {
      if (step && (p.g[1] < step.lo || p.g[0] > step.hi)) return false;
      if (a.region && !fitsRegion(p, a.region)) return false;
      return p.cohorts.length > 0;
    })
    .map((p) => {
      const next = [...p.cohorts].sort((x, y) => x.d.localeCompare(y.d))[0]!;
      let score = 0;
      p.tracks.forEach((t) => {
        if (interests.includes(t)) score += 5;
      });
      if (GOAL_TRACKS[goal].some((t) => p.tracks.includes(t))) score += 3;
      if (GOAL_TYPES[goal].includes(p.type)) score += 2;
      const hrs = weeklyHoursOf(p);
      score += hrs <= cap ? 2 : -3;
      return { p, next, score };
    })
    .sort((x, y) => y.score - x.score || x.next.d.localeCompare(y.next.d));
}

/** Compact catalogue rows for the model - ids only, so it cannot invent one. */
export const fitPayload = (cands: FitCandidate[]) =>
  cands.slice(0, 14).map(({ p, next }) => ({
    id: p.id,
    name: p.name,
    kind: TYPE_NAME[p.type],
    focus: p.tracks.map((t) => TRACKS[t].label).join(", "),
    grades: `${p.g[0]}-${p.g[1]}`,
    duration: p.dur,
    weeklyHours: weeklyHoursOf(p),
    sessionTime: p.time,
    fee: feeOf(p, next).e,
    nextStart: next.d,
    outcome: outcomeOf(p),
    summary: p.tag,
  }));

export type FitPick = {
  id: string;
  why: string;
  outcome: string;
  commitment: string;
  instead: string;
};

export type FitResult = {
  intro: string;
  picks: FitPick[];
  source: "ai" | "rules";
};

/** Used when the model is unavailable - same shape, honest copy. */
export function rulesResult(a: FitAnswers, cands: FitCandidate[]): FitResult {
  const top = cands.slice(0, 3);
  const goal = GOAL_OPTIONS.find((g) => g.value === a.goal)?.label.toLowerCase() ?? "their goals";
  return {
    intro: `Based on grade, interests and the time you have, these three fit ${goal} best.`,
    picks: top.map(({ p, next }, i) => ({
      id: p.id,
      why: `Matches ${p.tracks.map((t) => TRACKS[t].label).join(" and ")} for this grade, starting ${next.d}.`,
      outcome: outcomeOf(p),
      commitment: `${p.dur} · about ${weeklyHoursOf(p)}h a week`,
      instead: top[(i + 1) % Math.max(top.length, 1)]?.p.name
        ? `Consider ${top[(i + 1) % top.length]!.p.name} if the timing suits you better.`
        : "",
    })),
    source: "rules",
  };
}
