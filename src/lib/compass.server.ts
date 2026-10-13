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
  utm?:
    | {
        utm_source?: string | undefined;
        utm_medium?: string | undefined;
        utm_campaign?: string | undefined;
      }
    | undefined;
};

const SYSTEM = (
  leadDone: boolean,
) => `You are Compass, the AI concierge for the Learn with Leaders group. You are an AI assistant — say so if asked, and never claim to be human.

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
- Application deadlines: each result may carry a real 'deadline' date. When it is genuinely close (within roughly 14 days), you may mention it plainly as useful information — e.g. "worth noting, applications for this close on [date]" — as a helpful fact, not manufactured pressure: no exclamation marks, no artificial hype. Never mention a deadline that is not in the result data, and do not mention ones that are far off (that is just noise). This real data may inform the nudge toward a concrete next step; it is not a separate urgency tactic.
- Masterclass blurbs may name the actual host ("Hosted by ..."); you may name that host for that masterclass only. For programmes and fellowships (not masterclasses), you may call get_mentors and cite its real profiles as general social proof about the mentor network ("mentors from our network include ..."), but NEVER claim a specific mentor teaches, leads or is assigned to a specific programme — no such link exists in the data.
- The get_mentors caveat is ONLY about mentor-to-programme LINKAGE (no specific mentor is tied to a specific non-masterclass programme) — it says nothing about whether the programme itself, its price, or its dates are real. search_catalogue results are fully verified the moment they are returned in this conversation — keep these two facts separate and never blur them; never cast retroactive doubt on a previously-shown catalogue result, re-open it, or call it "unconfirmed".
- Only call check_promo_code when the user actually gives you a code. Never invent, guess or suggest promo codes that weren't provided. Report the result plainly — if the code is invalid, expired, not yet active or fully used, say so directly, and state the discount only as the tool returned it.
- When asked to compare options — whether named directly or referenced positionally/relatively ("the first two", "the second one", "that one and this one") — call compare_programmes immediately, passing what the user said as refs: a name or distinctive part of it, or a position ("1", "2", "first", "second", "last"). For "the first two" pass ["1", "2"]. You do not need to know or recall any id — the server resolves refs against everything already shown in this conversation. Do NOT call search_catalogue again first, and do NOT claim previously-shown options are unavailable, unretrieved or unverified — they are already confirmed. Only if the tool reports specific refs as unresolved, ask the user to clarify just those.
- If the family mentions more than one child (different grades or interests), track each child as a separate thread in the conversation. Search separately for each when needed — call search_catalogue once per child, even in the same turn — and always make clear which child each recommendation or question is for (e.g. by name or grade).
${
  leadDone
    ? "- A contact request for this conversation was already successfully saved — this is a confirmed fact, not something to doubt or second-guess. Never say it wasn't actually submitted, wasn't real, or needs correcting; never re-collect contact details. If the user mentions another child or another programme they'd like included, acknowledge it warmly and say you'll make sure the advisor has that context too — do not claim the original request failed or offer to redo it from scratch."
    : `- At most once in the conversation, after giving useful recommendations, you may offer: "Would you like an advisor to reach out with the details?" Only if the user clearly says yes, collect name, a contact (email or phone), the student's grade and which programme(s) interest them, then call save_contact_request with consent_confirmed=true. If they decline, never ask again.`
}`;

const nz = <T extends z.ZodTypeAny>(t: T) => t.nullable();

const searchSchema = z.object({
  grade_min: nz(z.number()).describe("Lowest school grade (1-12) of the student, or null"),
  grade_max: nz(z.number()).describe(
    "Highest school grade (1-12), or null; same as grade_min for one student",
  ),
  categories: nz(
    z.array(
      z.enum(["medicine", "law", "finance", "ai_tech", "research", "leadership", "test_prep"]),
    ),
  ).describe("Subject areas of interest, or null"),
  type: nz(z.enum(["programme", "masterclass", "camp", "any"])),
  format: nz(z.string()).describe("e.g. 'online' or 'in person', or null"),
  budget_max_usd: nz(z.number()).describe("Maximum budget in USD, or null"),
  keyword: nz(z.string()).describe(
    "Free-text keyword, e.g. 'Harvard', 'debate', 'Geneva', or null",
  ),
  timing: nz(z.enum(["soonest", "this_month", "flexible"])),
});

const leadSchema = z.object({
  consent_confirmed: z
    .boolean()
    .describe("True only if the user explicitly agreed to be contacted"),
  name: z.string(),
  contact: z.string().describe("Email or phone number"),
  grade: nz(z.string()),
  interested_program_ids: z.array(z.string()).describe("ids from search_catalogue results"),
  notes: nz(z.string()),
});

export async function runCompass(input: Input, clientIp: string): Promise<CompassReply> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { withinRateLimit } = await import("./rate-limit.server");
  // lwl_site isn't in the generated public types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = (supabaseAdmin as unknown as { schema: (s: string) => any }).schema("lwl_site");

  // --- session -------------------------------------------------------
  // A caller-supplied sessionId is only honoured when it also matches the
  // visitor's IP hash recorded at creation -- otherwise anyone holding (or
  // guessing) a session UUID could read its lead status or write messages
  // into another visitor's conversation. Mismatch -> start a fresh session.
  const { hashIp } = await import("./rate-limit.server");
  const ipHash = hashIp(clientIp);
  let sessionId = input.sessionId;
  if (sessionId) {
    const { data } = await db
      .from("concierge_sessions")
      .select("id, ip_hash")
      .eq("id", sessionId)
      .maybeSingle();
    if (!data || (data.ip_hash && data.ip_hash !== ipHash)) sessionId = undefined;
  }
  if (!sessionId) {
    // Caps new-session creation per visitor. Without this, the per-session
    // MAX_MESSAGES cap below is meaningless -- a client-supplied sessionId is
    // free to mint, so a script could otherwise get a fresh budget every call.
    if (!(await withinRateLimit("compass_session", clientIp))) {
      return {
        sessionId: "",
        reply: `Compass is getting a lot of use right now — please try again in a little while, or book a free call with an advisor: ${ADVISOR}`,
        results: [],
        leadCaptured: false,
        limitReached: true,
      };
    }
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
    db
      .from("concierge_messages")
      .select("id", { count: "exact", head: true })
      .eq("session_id", sid)
      .in("role", ["user", "assistant"]),
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

  // Aggregate cap across ALL of this visitor's sessions -- this is what
  // actually stops the "mint a new session every call" workaround, since the
  // per-session count above resets to zero for each new session.
  if (!(await withinRateLimit("compass_message", clientIp))) {
    return {
      sessionId: sid,
      reply: `Compass has hit its usage limit for now — please try again later, or book a free call with an advisor: ${ADVISOR}`,
      results: [],
      leadCaptured,
      limitReached: true,
    };
  }

  const last = input.messages[input.messages.length - 1]!;
  if (last.role === "user") {
    await db
      .from("concierge_messages")
      .insert({ session_id: sid, role: "user", content: last.content });
  }

  const key = process.env["LOVABLE_API_KEY"];
  if (!key) {
    return {
      sessionId: sid,
      reply: "Compass is not configured yet.",
      results: [],
      leadCaptured,
      limitReached: false,
      error: { status: 500, message: "Missing AI key" },
    };
  }

  // --- live catalogue (lazy, once per turn) ----------------------------
  let rowsP: Promise<ReturnType<typeof buildRows>> | undefined;
  const rows = () =>
    (rowsP ??= Promise.all([loadCatalogue(), listPublicMasterclasses().catch(() => [])]).then(
      ([c, m]) => buildRows(c, m),
    ));

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
        toolLogs.push({
          content: JSON.stringify({ query: q, results }),
          ids: results.map((r) => r.id),
        });
        return { count: results.length, results };
      },
    }),
    compare_programmes: tool({
      description:
        "Show 2-3 options already shown in this conversation side by side. Pass what the user said for each option as refs — a name (or distinctive part of it) or a position among the options just shown ('1', 'first', '2nd', 'last'). Resolution to real catalogue rows happens server-side; you never need ids. Returns the resolved result objects plus any refs that could not be resolved.",
      inputSchema: z.object({
        refs: z
          .array(z.string())
          .min(2)
          .max(3)
          .describe(
            "Each item is the programme's name (or a distinctive part of it) OR its position among the options already shown, e.g. '1', 'first', '2nd'",
          ),
      }),
      execute: async ({ refs }) => {
        const { data: prior } = await db
          .from("concierge_messages")
          .select("role, surfaced_program_ids, created_at")
          .eq("session_id", sid)
          .order("created_at", { ascending: true });
        const priorRows = (prior ?? []) as {
          role: string;
          surfaced_program_ids: string[] | null;
        }[];
        const allowed = new Set<string>([
          ...priorRows.flatMap((r) => r.surfaced_program_ids ?? []),
          ...surfaced.keys(),
        ]);
        const all = await rows();
        const byId = new Map(all.map((r) => [r.id, r]));
        const pool = [...allowed].filter((id) => byId.has(id));

        // Most recently shown set, in display order: this turn's search results if any,
        // otherwise the latest earlier assistant reply that surfaced options.
        const thisTurn = [...surfaced.keys()];
        const lastPrior = [...priorRows]
          .reverse()
          .find((r) => r.role === "assistant" && (r.surfaced_program_ids ?? []).length);
        const recent = [
          ...new Set(thisTurn.length ? thisTurn : (lastPrior?.surfaced_program_ids ?? [])),
        ].filter((id) => byId.has(id));

        const ORD: Record<string, number> = {
          first: 1,
          "1st": 1,
          one: 1,
          second: 2,
          "2nd": 2,
          two: 2,
          third: 3,
          "3rd": 3,
          three: 3,
        };
        const norm = (s: string) =>
          s
            .toLowerCase()
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ")
            .trim();
        const position = (ref: string): number | undefined => {
          const t = norm(ref)
            .replace(/^(the|option|no\.?|number|#)\s*/g, "")
            .replace(/\s+(one|option)$/g, "")
            .trim();
          if (t === "last" || t === "final") return recent.length;
          if (/^#?\d+$/.test(t)) return Number(t.replace("#", ""));
          if (ORD[t]) return ORD[t];
          const words = t.split(" ");
          for (const w of words) if (ORD[w] && words.length <= 2) return ORD[w];
          return undefined;
        };

        const resolved: string[] = [];
        const unresolved: { ref: string; reason: string }[] = [];
        for (const ref of refs) {
          const raw = ref.trim();
          if (allowed.has(raw) && byId.has(raw)) {
            resolved.push(raw);
            continue;
          }
          const pos = position(raw);
          if (pos !== undefined) {
            const id = recent[pos - 1];
            if (id) resolved.push(id);
            else
              unresolved.push({
                ref,
                reason: `no option at position ${pos} (only ${recent.length} shown most recently)`,
              });
            continue;
          }
          const q = norm(raw);
          const matches = q ? pool.filter((id) => norm(byId.get(id)!.name).includes(q)) : [];
          const inRecent = matches.filter((id) => recent.includes(id));
          if (matches.length === 1) resolved.push(matches[0]!);
          else if (inRecent.length === 1) resolved.push(inRecent[0]!);
          else if (!matches.length)
            unresolved.push({ ref, reason: "no previously shown option matches this name" });
          else
            unresolved.push({
              ref,
              reason: `ambiguous — matches ${matches.map((id) => byId.get(id)!.name).join(", ")}`,
            });
        }

        const results = [...new Set(resolved)].map((id) => toPublic(byId.get(id)!));
        for (const r of results) surfaced.set(r.id, r);
        if (results.length >= 2) compareIds = results.map((r) => r.id);
        toolLogs.push({
          content: JSON.stringify({ compare_programmes: refs, results, unresolved }),
          ids: results.map((r) => r.id),
        });
        return results.length >= 2
          ? { count: results.length, results, ...(unresolved.length ? { unresolved } : {}) }
          : {
              count: results.length,
              results,
              unresolved,
              error:
                "Fewer than 2 refs resolved — ask the user to clarify only the unresolved ones",
            };
      },
    }),
    get_mentors: tool({
      description:
        "Get a small sample of real, active mentors from the group's mentor network (name, university, short bio). Not linked to any specific programme — use only as general social proof.",
      inputSchema: z.object({
        university: nz(z.string()).describe("Optional university filter, e.g. 'Harvard', or null"),
      }),
      execute: async ({ university }) => {
        let q = supabaseAdmin
          .from("all_mentors")
          .select("full_name, university, bio")
          .eq("is_active", true)
          .not("bio", "is", null);
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
        toolLogs.push({
          content: JSON.stringify({
            get_mentors: { university },
            mentors: mentors.map((m) => m.name),
          }),
          ids: [],
        });
        return {
          count: mentors.length,
          mentors,
          note: "General mentor network — not assigned to any specific programme.",
        };
      },
    }),
    check_promo_code: tool({
      description:
        "Check a promo code the user provided. Returns whether it is valid now, the discount type/value, and the programme it's scoped to. Only call with a code the user actually gave.",
      inputSchema: z.object({
        code: z.string().min(1).max(64),
        program_id: nz(z.string()).describe(
          "id of the programme the user wants to use it on, if known, or null",
        ),
      }),
      execute: async ({ code, program_id }) => {
        const clean = code.trim().replace(/[%_]/g, "");
        const { data, error } = await supabaseAdmin
          .from("promo_codes")
          .select(
            "code, is_active, starts_at, expires_at, max_redemptions, redemption_count, discount_type, discount_value, currency, program_id, program_name",
          )
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
        toolLogs.push({
          content: JSON.stringify({ check_promo_code: { code: clean, program_id }, result: res }),
          ids: [],
        });
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
              toolLogs.push({
                content: JSON.stringify({ lead_saved: true, programs: l.interested_program_ids }),
                ids: l.interested_program_ids,
              });
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

  const messages: ModelMessage[] = input.messages
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content }));

  // --- grounding: options already shown earlier in this session --------
  // Prior tool results are not replayed in the text-only history, so give the
  // model an id → name → platform reference, grouped per earlier reply in order.
  let grounding = "";
  {
    const { data: shown } = await db
      .from("concierge_messages")
      .select("surfaced_program_ids, created_at")
      .eq("session_id", sid)
      .eq("role", "assistant")
      .order("created_at", { ascending: true });
    const groups = ((shown ?? []) as { surfaced_program_ids: string[] | null }[])
      .map((r) => [...new Set(r.surfaced_program_ids ?? [])])
      .filter((g) => g.length > 0);
    if (groups.length) {
      const all = await rows();
      const byId = new Map(all.map((r) => [r.id, r]));
      const seen = new Set<string>();
      const blocks: string[] = [];
      groups.forEach((g, gi) => {
        const lines = g
          .map((id, i) => {
            const r = byId.get(id);
            if (!r) return undefined;
            seen.add(id);
            const p = toPublic(r);
            return `  ${i + 1}. ${p.id} — ${p.name} — ${p.platform}`;
          })
          .filter(Boolean);
        if (lines.length)
          blocks.push(
            `Earlier reply ${gi + 1}${gi === groups.length - 1 ? " (most recent)" : ""}, in the order shown:\n${lines.join("\n")}`,
          );
      });
      if (seen.size) {
        grounding = `\n\nOptions already shown to this user in this conversation (id — name — platform), for resolving references like "the first two" or a name. Positional references normally mean the most recent set. These were genuinely retrieved from search_catalogue and shown as cards — they are confirmed. Do NOT repeat this list to the user, it's for your own grounding only:\n${blocks.join("\n")}`;
      }
    }
  }

  let reply = "";
  let err: CompassReply["error"];
  try {
    const result = streamText({
      model: provider.responses(MODEL),
      system: SYSTEM(leadCaptured) + grounding,
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
    ...toolLogs.map((t) => ({
      session_id: sid,
      role: "tool",
      content: t.content,
      surfaced_program_ids: t.ids,
    })),
    { session_id: sid, role: "assistant", content: reply, surfaced_program_ids: surfacedIds },
  ]);

  return {
    sessionId: sid,
    reply,
    results: [...surfaced.values()],
    ...(compareIds ? { compareIds } : {}),
    leadCaptured,
    limitReached: false,
    ...(err ? { error: err } : {}),
  };
}
