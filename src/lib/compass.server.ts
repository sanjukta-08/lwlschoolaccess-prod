import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, stepCountIs, streamText, tool, type ModelMessage } from "ai";
import { z } from "zod";

import { loadCatalogue } from "./catalogue.functions";
import { listPublicMasterclasses } from "./masterclasses.functions";
import { buildRows, searchRows, type SearchResult } from "./compass-search.server";
import type { CompassReply } from "./compass.functions";

const MODEL = "openai/gpt-6-astra";
const MAX_MESSAGES = 40; // user + assistant turns logged per session
const ADVISOR = "https://calendly.com/learnwithleaders";

type Input = {
  sessionId?: string | undefined;
  messages: { role: "user" | "assistant"; content: string }[];
  sourcePage?: string | undefined;
  utm?: { utm_source?: string | undefined; utm_medium?: string | undefined; utm_campaign?: string | undefined } | undefined;
};

const SYSTEM = (leadDone: boolean) => `You are Compass, the AI concierge for the Learn with Leaders group. You are an AI assistant — say so if asked, and never claim to be human.

You help parents and students find the right programme, masterclass or camp across the group's platforms (Learn with Leaders, Onward Fellowship, Future Doctors, Sir Luther Center, FinLit AI, Future Lawyers, SAT Instinct, Purpose Playbook and other partners).

Tone: warm, patient and encouraging, like a favourite teacher who genuinely enjoys helping. Explain things fully rather than just listing them — briefly describe what a student would actually experience in a programme and why it might suit them, not just its stats. Still keep replies reasonably concise for a chat widget — giving real substance and context, not long unstructured paragraphs.

Hard rules:
- Never state a programme name, price, date or eligibility claim unless it came from a search_catalogue result in this conversation. Call search_catalogue whenever you need facts.
- Only call search_catalogue when the user is asking for programme/masterclass/camp options, or gives new criteria that would change what matches (grade, subject, budget, timing, format). Do NOT call it just to acknowledge a choice, confirm interest, say thanks, or while collecting/confirming contact details for save_contact_request — reply in plain text with no new results in those turns unless the user explicitly asks for more options.
- If key info is missing (the student's grade, area of interest, or budget) and it matters, ask ONE clarifying question instead of guessing.
- For every recommendation, name the platform/partner it belongs to — results span several platforms in the group — and give its view link and apply link exactly as returned.
- If nothing matches well, say so plainly and suggest booking a free call with a human advisor: ${ADVISOR}
- Never make a family feel turned away or brushed off. If a question falls outside programmes, masterclasses, camps, pricing, eligibility or scheduling, never open with an apology or a refusal ("I'm sorry", "I can't", "unfortunately") — lead straight with the helpful pivot. Answer what you can, then connect it to something you can actually help with: "Taxes aren't something I handle directly, but if financial literacy is the interest, let me find you a programme that covers exactly that." The redirect IS the answer, not a consolation after a refusal — always try to be useful or point them somewhere useful (the advisor link, or a related question you can answer).
- Never require contact details to give recommendations.
${
  leadDone
    ? "- Contact details for this conversation were already handled. Do not ask for them again."
    : `- At most once in the conversation, after giving useful recommendations, you may offer: "Would you like an advisor to reach out with the details?" Only if the user clearly says yes, collect name, a contact (email or phone), the student's grade and which programme(s) interest them, then call save_contact_request with consent_confirmed=true. If they decline, never ask again.`
}`;

const nz = <T extends z.ZodTypeAny>(t: T) => t.nullable();

const searchSchema = z.object({
  grade_min: nz(z.number()).describe("Lowest school grade (1-12) of the student, or null"),
  grade_max: nz(z.number()).describe("Highest school grade (1-12), or null; same as grade_min for one student"),
  categories: nz(
    z.array(z.enum(["medicine", "law", "finance", "ai_tech", "research", "leadership", "test_prep"])),
  ).describe("Subject areas of interest, or null"),
  type: nz(z.enum(["programme", "masterclass", "camp", "any"])),
  format: nz(z.string()).describe("e.g. 'online' or 'in person', or null"),
  budget_max_usd: nz(z.number()).describe("Maximum budget in USD, or null"),
  keyword: nz(z.string()).describe("Free-text keyword, e.g. 'Harvard', 'debate', 'Geneva', or null"),
  timing: nz(z.enum(["soonest", "this_month", "flexible"])),
});

const leadSchema = z.object({
  consent_confirmed: z.boolean().describe("True only if the user explicitly agreed to be contacted"),
  name: z.string(),
  contact: z.string().describe("Email or phone number"),
  grade: nz(z.string()),
  interested_program_ids: z.array(z.string()).describe("ids from search_catalogue results"),
  notes: nz(z.string()),
});

export async function runCompass(input: Input): Promise<CompassReply> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // lwl_site isn't in the generated public types.
  const db = (supabaseAdmin as unknown as { schema: (s: string) => any }).schema("lwl_site");

  // --- session -------------------------------------------------------
  let sessionId = input.sessionId;
  if (sessionId) {
    const { data } = await db.from("concierge_sessions").select("id").eq("id", sessionId).maybeSingle();
    if (!data) sessionId = undefined;
  }
  if (!sessionId) {
    const { data, error } = await db
      .from("concierge_sessions")
      .insert({
        source_page: input.sourcePage ?? null,
        utm_source: input.utm?.utm_source ?? null,
        utm_medium: input.utm?.utm_medium ?? null,
        utm_campaign: input.utm?.utm_campaign ?? null,
      })
      .select("id")
      .single();
    if (error) throw new Error(`Could not start session: ${error.message}`);
    sessionId = data.id as string;
  }
  const sid = sessionId!;

  const [{ count }, { data: lead }] = await Promise.all([
    db.from("concierge_messages").select("id", { count: "exact", head: true }).eq("session_id", sid).in("role", ["user", "assistant"]),
    db.from("concierge_leads").select("id").eq("session_id", sid).maybeSingle(),
  ]);
  let leadCaptured = !!lead;

  if ((count ?? 0) >= MAX_MESSAGES) {
    return {
      sessionId: sid,
      reply: `We've reached the limit for this conversation. For more help, book a free call with an advisor: ${ADVISOR}`,
      results: [],
      leadCaptured,
      limitReached: true,
    };
  }

  const last = input.messages[input.messages.length - 1]!;
  if (last.role === "user") {
    await db.from("concierge_messages").insert({ session_id: sid, role: "user", content: last.content });
  }

  const key = process.env["LOVABLE_API_KEY"];
  if (!key) {
    return { sessionId: sid, reply: "Compass is not configured yet.", results: [], leadCaptured, limitReached: false, error: { status: 500, message: "Missing AI key" } };
  }

  // --- live catalogue (lazy, once per turn) ----------------------------
  let rowsP: Promise<ReturnType<typeof buildRows>> | undefined;
  const rows = () =>
    (rowsP ??= Promise.all([loadCatalogue(), listPublicMasterclasses().catch(() => [])]).then(([c, m]) => buildRows(c, m)));

  const surfaced = new Map<string, SearchResult>();
  const toolLogs: { content: string; ids: string[] }[] = [];

  const tools = {
    search_catalogue: tool({
      description:
        "Search the live Learn with Leaders group catalogue (programmes, fellowships, competitions, conferences, camps, masterclasses). Returns the top 3 ranked matches with platform, grades, format, fee, next date, view and apply links.",
      inputSchema: searchSchema,
      execute: async (q) => {
        const results = searchRows(await rows(), q);
        for (const r of results) surfaced.set(r.id, r);
        toolLogs.push({ content: JSON.stringify({ query: q, results }), ids: results.map((r) => r.id) });
        return { count: results.length, results };
      },
    }),
    ...(leadCaptured
      ? {}
      : {
          save_contact_request: tool({
            description:
              "Save a request for a human advisor to contact the family. Only call after the user explicitly agreed to be contacted and gave their details.",
            inputSchema: leadSchema,
            execute: async (l) => {
              if (!l.consent_confirmed) return { saved: false, reason: "No consent" };
              if (leadCaptured) return { saved: false, reason: "Already saved" };
              const { error } = await db.from("concierge_leads").insert({
                session_id: sid,
                name: l.name.slice(0, 200),
                contact: l.contact.slice(0, 200),
                grade: l.grade?.slice(0, 50) ?? null,
                interested_program_ids: l.interested_program_ids.slice(0, 20),
                notes: l.notes?.slice(0, 1000) ?? null,
              });
              if (error) return { saved: false, reason: "Could not save" };
              leadCaptured = true;
              toolLogs.push({ content: JSON.stringify({ lead_saved: true, programs: l.interested_program_ids }), ids: l.interested_program_ids });
              return { saved: true };
            },
          }),
        }),
  };

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey: key,
    headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  const messages: ModelMessage[] = input.messages.slice(-MAX_MESSAGES).map((m) => ({ role: m.role, content: m.content }));

  let reply = "";
  let err: CompassReply["error"];
  try {
    const result = streamText({
      model: provider.responses(MODEL),
      system: SYSTEM(leadCaptured),
      messages,
      tools,
      stopWhen: stepCountIs(50),
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    reply = (await result.text).trim();
  } catch (e) {
    const status = APICallError.isInstance(e) ? (e.statusCode ?? 500) : 500;
    console.error("Compass failed", e);
    err = {
      status,
      message:
        status === 429
          ? "Compass is busy right now — please try again in a moment."
          : status === 402
            ? "Compass is temporarily unavailable."
            : "Something went wrong. Please try again.",
    };
    reply = `${err.message} You can also book a free call with an advisor: ${ADVISOR}`;
  }
  if (!reply && !err) reply = `I couldn't find a good answer. A human advisor can help: ${ADVISOR}`;

  const surfacedIds = [...surfaced.keys()];
  await db.from("concierge_messages").insert([
    ...toolLogs.map((t) => ({ session_id: sid, role: "tool", content: t.content, surfaced_program_ids: t.ids })),
    { session_id: sid, role: "assistant", content: reply, surfaced_program_ids: surfacedIds },
  ]);

  return { sessionId: sid, reply, results: [...surfaced.values()], leadCaptured, limitReached: false, ...(err ? { error: err } : {}) };
}
