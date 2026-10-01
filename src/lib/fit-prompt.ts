import { z } from "zod";
import { GOAL_OPTIONS, HOURS_OPTIONS, interestList, type FitAnswers } from "./fit";
import { TRACKS } from "./programmes";

export const AnswersSchema = z.object({
  grade: z.string(),
  interests: z.string(),
  hours: z.string(),
  goal: z.string(),
  region: z.string(),
});

export const ResultSchema = z.object({
  intro: z.string(),
  picks: z.array(
    z.object({
      id: z.string(),
      why: z.string(),
      outcome: z.string(),
      commitment: z.string(),
      instead: z.string(),
    }),
  ),
});

export const promptFor = (a: FitAnswers, rows: unknown) => {
  const interests = interestList(a)
    .map((t) => TRACKS[t].label)
    .join(", ");
  const goal = GOAL_OPTIONS.find((g) => g.value === a.goal)?.label ?? "exploring";
  const hours = HOURS_OPTIONS.find((h) => h.value === a.hours)?.label ?? "a few hours a week";

  return [
    "You advise parents choosing an extracurricular programme for their child.",
    "",
    "The family:",
    `- Grade band: ${a.grade}`,
    `- Drawn to: ${interests || "not sure yet"}`,
    `- Time available: ${hours}`,
    `- What they want out of it: ${goal}`,
    `- Where they live (session timing): ${a.region}`,
    "",
    "Eligible programmes (already filtered for grade and civil session times):",
    JSON.stringify(rows),
    "",
    "Choose exactly 3, ranked best first. Rules:",
    "- Only use ids from the list above. Never invent a programme.",
    "- why: one sentence to the parent about THIS child, no marketing adjectives.",
    "- outcome: what the child finishes with, concrete.",
    "- commitment: duration plus weekly hours.",
    "- instead: one honest alternative from the list, phrased 'Consider X if ...'.",
    "- intro: one warm sentence summarising the direction you would take.",
    "Write in plain British English a busy parent can skim.",
    "",
    'Reply with JSON only: {"intro": string, "picks": [{"id": string, "why": string, "outcome": string, "commitment": string, "instead": string}]}',
  ].join("\n");
};
