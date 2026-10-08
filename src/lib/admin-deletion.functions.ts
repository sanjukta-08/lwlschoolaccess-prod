import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin-auth.server";

async function db() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (supabaseAdmin as unknown as { schema: (s: string) => any }).schema("lwl_site");
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Finds Compass session ids for an email/contact or a Compass session id. */
async function matchSessionIds(query: string): Promise<string[]> {
  const d = await db();
  const ids = new Set<string>();
  const q = query.trim();
  if (UUID.test(q)) ids.add(q.toLowerCase());
  const safe = q.replace(/[%_,()]/g, "");
  if (safe.length >= 3) {
    const { data, error } = await d
      .from("concierge_leads")
      .select("session_id")
      .ilike("contact", `%${safe}%`);
    if (error) throw new Error(error.message);
    for (const r of data ?? []) if (r.session_id) ids.add(r.session_id);
  }
  return [...ids];
}

const Input = z.object({ query: z.string().trim().min(3).max(320) });

export const findPersonalData = createServerFn({ method: "POST" })
  .inputValidator((d) => Input.parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const ids = await matchSessionIds(data.query);
    if (!ids.length) return { sessions: [], leads: [], messages: [] };
    const d = await db();
    const [s, l, m] = await Promise.all([
      d.from("concierge_sessions").select("id, created_at, source_page, utm_source").in("id", ids),
      d.from("concierge_leads").select("id, session_id, name, contact, grade, created_at").in("session_id", ids),
      d
        .from("concierge_messages")
        .select("id, session_id, role, content, created_at")
        .in("session_id", ids)
        .order("created_at", { ascending: true })
        .limit(500),
    ]);
    for (const r of [s, l, m]) if (r.error) throw new Error(r.error.message);
    return {
      sessions: (s.data ?? []) as { id: string; created_at: string; source_page: string | null; utm_source: string | null }[],
      leads: (l.data ?? []) as { id: string; session_id: string; name: string | null; contact: string | null; grade: string | null; created_at: string }[],
      messages: (m.data ?? []) as { id: string; session_id: string; role: string; content: string; created_at: string }[],
    };
  });

export const deletePersonalData = createServerFn({ method: "POST" })
  .inputValidator((d) => Input.parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const ids = await matchSessionIds(data.query);
    if (!ids.length) return { deletedSessions: 0 };
    const d = await db();
    for (const t of ["concierge_messages", "concierge_leads"]) {
      const { error } = await d.from(t).delete().in("session_id", ids);
      if (error) throw new Error(error.message);
    }
    const { error, count } = await d
      .from("concierge_sessions")
      .delete({ count: "exact" })
      .in("id", ids);
    if (error) throw new Error(error.message);
    return { deletedSessions: count ?? 0 };
  });
