import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  fitCandidates,
  fitPayload,
  rulesResult,
  validateFitSearch,
  GOAL_OPTIONS,
  HOURS_OPTIONS,
  interestList,
  type FitAnswers,
  type FitResult,
} from "./fit";
import { TRACKS } from "./programmes";

const Answers = z.object({
  grade: z.string(),
  interests: z.string(),
  hours: z.string(),
  goal: z.string(),
  region: z.string(),
});

const PickSchema = z.object({
  id: z.string(),
  why: z.string(),
  outcome: z.string(),
  commitment: z.string(),
  instead: z.string(),
});

const ResultSchema = z.object({
  intro: z.string(),
  picks: z.array(PickSchema),
});

const promptFor = (a: FitAnswers, rows: unknown) => {
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

export const recommendProgrammes = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => Answers.parse(raw))
  .handler(async ({ data }): Promise<FitResult> => {
    const answers = validateFitSearch(data as Record<string, unknown>);
    const cands = fitCandidates(answers);
    if (!cands.length) return { intro: "", picks: [], source: "rules" };

    const fallback = rulesResult(answers, cands);
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return fallback;

    try {
      const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
      const { streamText } = await import("ai");
      const gateway = createLovableAiGatewayProvider(key);
      const rows = fitPayload(cands);
      const result = streamText({
        model: gateway("google/gemini-3.7-flash"),
        prompt: promptFor(answers, rows),
      });
      const text = await result.text;
      const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
      const parsed = ResultSchema.safeParse(JSON.parse(json));
      if (!parsed.success) return fallback;
      const allowed = new Set(rows.map((r) => r.id));
      const picks = parsed.data.picks.filter((p) => allowed.has(p.id)).slice(0, 3);
      if (picks.length < 1) return fallback;
      return { intro: parsed.data.intro, picks, source: "ai" };
    } catch (err) {
      console.error("recommendProgrammes failed", err);
      return fallback;
    }
  });
