import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, stepCountIs, streamText, tool, type ModelMessage } from "ai";
import { z } from "zod";

import { loadCatalogue } from "./catalogue.functions";
import { listPublicMasterclasses } from "./masterclasses.functions";
import { buildRows, searchRows, toPublic, type SearchResult } from "./compass-search.server";
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

Tone: warm, patient and encouraging, like a favourite teacher who genuinely enjoys helping. Explain things fully rather than just listing them — briefly describe what a student would actually experience in a programme and why it might suit them, not just its stats. Give yourself room to build genuine enthusiasm and rapport rather than replying in short transactional bursts — but still avoid long unstructured paragraphs.

Hard rules:
- Never state a programme name, price, date or eligibility claim unless it came from a search_catalogue result in this conversation. Call search_catalogue whenever you need facts.
- Only call search_catalogue when the user is asking for programme/masterclass/camp options, or gives new criteria that would change what matches (grade, subject, budget, timing, format). Do NOT call it just to acknowledge a choice, confirm interest, say thanks, or while collecting/confirming contact details for save_contact_request — reply in plain text with no new results in those turns unless the user explicitly asks for more options.
- If key info is missing (the student's grade, area of interest, or budget) and it matters, ask ONE clarifying question instead of guessing.
- When search_catalogue results are attached to your reply, do NOT restate their details — no numbered lists, no repeating name/price/date/eligibility/links in the text (the interface already shows each as its own card with all of that). The text should only add brief framing — what's different between the options or what to consider — and at most one clarifying question, in 1-3 short sentences. Only describe a programme in prose when no results were returned at all (e.g. explaining why nothing matched).
- When you mention a specific option by name in your framing, say which platform/partner it's from — results span several platforms in the group, so this matters even though the full details are on its card.
- If nothing matches well, say so plainly and suggest booking a free call with a human advisor: ${ADVISOR}
- Never make a family feel turned away or brushed off. If a question falls outside programmes, masterclasses, camps, pricing, eligibility or scheduling, never open with an apology or a refusal ("I'm sorry", "I can't", "unfortunately") — lead straight with the helpful pivot. Answer what you can, then connect it to something you can actually help with: "Taxes aren't something I handle directly, but if financial literacy is the interest, let me find you a programme that covers exactly that." The redirect IS the answer, not a consolation after a refusal — always try to be useful or point them somewhere useful (the advisor link, or a related question you can answer).
- Never require contact details to give recommendations.
- Keep the conversation going: after sharing options or answering a question, never close in a way that sounds final (avoid "let me know if you need anything else"-style endings). End with an engaging, specific follow-up that invites the next step in their decision — e.g. asking what matters most to them (schedule, cost, mentor background, outcomes), offering to compare two options, or asking about the student's specific goals or interests. The conversation should feel like an ongoing helpful back-and-forth, not a single Q&A.
- You represent the Learn with Leaders group commercially, not just as a neutral directory — actively build the case for enrolling. Speak to real outcomes and value (mentorship from Harvard/Yale/MIT students, what the student walks away with, how it strengthens their profile, applications and skills), and proactively address likely hesitations (cost, time commitment, "will this actually help my child") with genuine, confident reassurance. Each search_catalogue result carries a 'blurb' — the programme's own catalogue copy (what it is, what students gain). That blurb is the one exception where descriptive (non-logistics) content from a result may be spoken to directly: it is genuine catalogue copy, so use it as the real, honest source for outcome and value claims when making the case — but still never claim anything beyond what the blurb or other fields actually say. Persuasion must come from honestly explaining real value — never from inventing urgency, scarcity, testimonials, or any fact not in the catalogue (the never-state-a-fact-not-from-search_catalogue rule stays absolute and overrides this). Where natural, nudge toward a concrete next step (view details, apply, or the advisor call) rather than leaving things open-ended.
- Masterclass blurbs may name the actual host ("Hosted by ..."); you may name that host for that masterclass only. For programmes and fellowships (not masterclasses), you may call get_mentors and cite its real profiles as general social proof about the mentor network ("mentors from our network include ..."), but NEVER claim a specific mentor teaches, leads or is assigned to a specific programme — no such link exists in the data.
- The get_mentors caveat is ONLY about mentor-to-programme LINKAGE (no specific mentor is tied to a specific non-masterclass programme) — it says nothing about whether the programme itself, its price, or its dates are real. search_catalogue results are fully verified the moment they are returned in this conversation — keep these two facts separate and never blur them; never cast retroactive doubt on a previously-shown catalogue result, re-open it, or call it "unconfirmed".
- Only call check_promo_code when the user actually gives you a code. Never invent, guess or suggest promo codes that weren't provided. Report the result plainly — if the code is invalid, expired, not yet active or fully used, say so directly, and state the discount only as the tool returned it.
- When asked to compare options — whether named directly or referenced positionally/relatively ("the first two", "the second one", "that one and this one") — resolve the reference against results already surfaced earlier in this conversation and call compare_programmes with their exact ids directly. Do NOT call search_catalogue again first, and do NOT claim previously-shown options are unavailable, unretrieved or unverified — they are already confirmed. Only ask the user to clarify if the reference is genuinely ambiguous (e.g. more than 3 candidates could match), never when it's simply positional.
- If the family mentions more than one child (different grades or interests), track each child as a separate thread in the conversation. Search separately for each when needed — call search_catalogue once per child, even in the same turn — and always make clear which child each recommendation or question is for (e.g. by name or grade).
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
  let compareIds: string[] | undefined;

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
    compare_programmes: tool({
      description:
        "Show 2-3 options already surfaced in this conversation side by side. Pass their ids exactly as returned by search_catalogue. Returns the same result objects.",
      inputSchema: z.object({ ids: z.array(z.string()).min(2).max(3) }),
      execute: async ({ ids }) => {
        const { data: prior } = await db
          .from("concierge_messages")
          .select("surfaced_program_ids")
          .eq("session_id", sid);
        const allowed = new Set<string>([
          ...surfaced.keys(),
          ...((prior ?? []) as { surfaced_program_ids: string[] | null }[]).flatMap((r) => r.surfaced_program_ids ?? []),
        ]);
        const all = await rows();
        const results = ids
          .filter((id, i) => allowed.has(id) && ids.indexOf(id) === i)
          .map((id) => { const r = all.find((x) => x.id === id); return r ? toPublic(r) : undefined; })
          .filter((r): r is SearchResult => !!r);
        for (const r of results) surfaced.set(r.id, r);
        if (results.length >= 2) compareIds = results.map((r) => r.id);
        toolLogs.push({ content: JSON.stringify({ compare_programmes: ids, results }), ids: results.map((r) => r.id) });
        return results.length >= 2
          ? { count: results.length, results }
          : { count: results.length, results, error: "Need at least 2 ids already shown in this conversation" };
      },
    }),
    get_mentors: tool({
      description:
        "Get a small sample of real, active mentors from the group's mentor network (name, university, short bio). Not linked to any specific programme — use only as general social proof.",
      inputSchema: z.object({ university: nz(z.string()).describe("Optional university filter, e.g. 'Harvard', or null") }),
      execute: async ({ university }) => {
        let q = supabaseAdmin.from("all_mentors").select("full_name, university, bio").eq("is_active", true).not("bio", "is", null);
        if (university) q = q.ilike("university", `%${university.replace(/[%_,]/g, "")}%`);
        const { data, error } = await q.limit(40);
        if (error) return { count: 0, mentors: [], error: "Could not load mentors" };
        const mentors = (data ?? [])
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
          .map((m) => ({
            name: m.full_name,
            university: m.university,
            bio: (m.bio ?? "").replace(/\s+/g, " ").trim().slice(0, 160),
          }));
        toolLogs.push({ content: JSON.stringify({ get_mentors: { university }, mentors: mentors.map((m) => m.name) }), ids: [] });
        return { count: mentors.length, mentors, note: "General mentor network — not assigned to any specific programme." };
      },
    }),
    check_promo_code: tool({
      description:
        "Check a promo code the user provided. Returns whether it is valid now, the discount type/value, and the programme it's scoped to. Only call with a code the user actually gave.",
      inputSchema: z.object({
        code: z.string().min(1).max(64),
        program_id: nz(z.string()).describe("id of the programme the user wants to use it on, if known, or null"),
      }),
      execute: async ({ code, program_id }) => {
        const clean = code.trim().replace(/[%_]/g, "");
        const { data, error } = await supabaseAdmin
          .from("promo_codes")
          .select("code, is_active, starts_at, expires_at, max_redemptions, redemption_count, discount_type, discount_value, currency, program_id, program_name")
          .ilike("code", clean)
          .limit(5);
        let res: Record<string, unknown>;
        if (error) res = { valid: false, reason: "Could not check the code right now" };
        else {
          const rows = data ?? [];
          const now = Date.now();
          const pick = (program_id && rows.find((r) => r.program_id === program_id)) || rows[0];
          if (!pick) res = { valid: false, reason: "Code not found" };
          else {
            const reason = !pick.is_active
              ? "Code is not active"
              : pick.starts_at && Date.parse(pick.starts_at) > now
                ? "Code is not active yet"
                : pick.expires_at && Date.parse(pick.expires_at) <= now
                  ? "Code has expired"
                  : pick.max_redemptions != null && pick.redemption_count >= pick.max_redemptions
                    ? "Code has been fully used"
                    : program_id && pick.program_id !== program_id
                      ? "Code is for a different programme"
                      : null;
            res = {
              valid: !reason,
              ...(reason ? { reason } : {}),
              discount_type: pick.discount_type,
              discount_value: pick.discount_value,
              currency: pick.currency,
              program_name: pick.program_name,
            };
          }
        }
        toolLogs.push({ content: JSON.stringify({ check_promo_code: { code: clean, program_id }, result: res }), ids: [] });
        return res;
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

  return { sessionId: sid, reply, results: [...surfaced.values()], ...(compareIds ? { compareIds } : {}), leadCaptured, limitReached: false, ...(err ? { error: err } : {}) };
}
