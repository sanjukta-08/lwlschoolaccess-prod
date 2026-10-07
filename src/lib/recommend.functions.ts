import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { AnswersSchema, ResultSchema, promptFor } from "./fit-prompt";
import { fitCandidates, fitPayload, rulesResult, validateFitSearch, type FitResult } from "./fit";

export const recommendProgrammes = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => AnswersSchema.parse(raw))
  .handler(async ({ data }): Promise<FitResult> => {
    const answers = validateFitSearch(data as Record<string, unknown>);
    const cands = fitCandidates(answers);
    if (!cands.length) return { intro: "", picks: [], source: "rules" };

    const fallback = rulesResult(answers, cands);
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return fallback;

    // No session concept here at all (unlike Compass), so this was the easier
    // of the two public AI endpoints to script into an unbounded bill. Over
    // the limit -> degrade to the free rules-based result instead of erroring.
    const { clientIpFrom, withinRateLimit } = await import("./rate-limit.server");
    const clientIp = clientIpFrom(getWebRequest());
    if (!(await withinRateLimit("recommend", clientIp))) return fallback;

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
