import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin-auth.server";
import { loadCatalogue } from "./catalogue.functions";
import { listPublicMasterclasses } from "./masterclasses.functions";
import { buildRows, toPublic } from "./compass-search.server";

async function db() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (supabaseAdmin as unknown as { schema: (s: string) => any }).schema("lwl_site");
}

/** id → "Name (Platform)" using the same catalogue rows Compass searches, with a
 * fallback to the raw catalogue for programmes no longer listable. */
async function nameLookup(): Promise<Map<string, string>> {
  const [cat, mcs] = await Promise.all([
    loadCatalogue(),
    listPublicMasterclasses().catch(() => []),
  ]);
  const map = new Map<string, string>();
  for (const p of cat.programmes)
    map.set(p.id, `${p.name} (${p.partnerName ?? "Learn with Leaders"})`);
  for (const r of buildRows(cat, mcs)) {
    const p = toPublic(r);
    map.set(p.id, `${p.name} (${p.platform})`);
  }
  return map;
}

export const adminStats = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const d = await db();
  const since = new Date(Date.now() - 13 * 86400000);
  since.setUTCHours(0, 0, 0, 0);
  const [s, m, l, recent] = await Promise.all([
    d.from("concierge_sessions").select("id", { count: "exact", head: true }),
    d.from("concierge_messages").select("id", { count: "exact", head: true }),
    d.from("concierge_leads").select("id", { count: "exact", head: true }),
    d
      .from("concierge_sessions")
      .select("created_at")
      .gte("created_at", since.toISOString())
      .limit(10000),
  ]);
  const sessions = s.count ?? 0;
  const leads = l.count ?? 0;
  const byDay: { day: string; count: number }[] = [];
  for (let i = 0; i < 14; i++) {
    byDay.push({
      day: new Date(since.getTime() + i * 86400000).toISOString().slice(0, 10),
      count: 0,
    });
  }
  for (const r of (recent.data ?? []) as { created_at: string }[]) {
    const e = byDay.find((b) => b.day === r.created_at.slice(0, 10));
    if (e) e.count++;
  }
  return {
    sessions,
    messages: m.count ?? 0,
    leads,
    conversion: sessions ? Math.round((leads / sessions) * 1000) / 10 : 0,
    byDay: byDay.reverse(),
  };
});

export const adminLeads = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const d = await db();
  const [{ data, error }, names] = await Promise.all([
    d
      .from("concierge_leads")
      .select(
        "id, session_id, name, contact, grade, interested_program_ids, notes, contacted, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(500),
    nameLookup(),
  ]);
  if (error) throw new Error(error.message);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((data ?? []) as any[]).map((r) => ({
    id: r.id as string,
    session_id: (r.session_id ?? null) as string | null,
    name: r.name as string,
    contact: r.contact as string,
    grade: (r.grade ?? null) as string | null,
    notes: (r.notes ?? null) as string | null,
    contacted: !!r.contacted,
    created_at: r.created_at as string,
    programmes: ((r.interested_program_ids ?? []) as string[]).map((id) => names.get(id) ?? id),
  }));
});

export const adminSetContacted = createServerFn({ method: "POST" })
  .inputValidator((x) => z.object({ id: z.string().uuid(), contacted: z.boolean() }).parse(x))
  .handler(async ({ data }) => {
    await requireAdmin();
    const d = await db();
    const { data: row, error } = await d
      .from("concierge_leads")
      .update({ contacted: data.contacted })
      .eq("id", data.id)
      .select("contacted")
      .single();
    if (error) throw new Error(error.message);
    return { contacted: !!row.contacted };
  });

export const adminSessions = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const d = await db();
  const { data, error } = await d
    .from("concierge_sessions")
    .select("id, created_at, source_page, utm_source, utm_medium, utm_campaign")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(error.message);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const list = (data ?? []) as any[];
  const counts = new Map<string, number>();
  if (list.length) {
    const { data: msgs } = await d
      .from("concierge_messages")
      .select("session_id")
      .in(
        "session_id",
        list.map((s) => s.id),
      )
      .limit(20000);
    for (const m of (msgs ?? []) as { session_id: string }[])
      counts.set(m.session_id, (counts.get(m.session_id) ?? 0) + 1);
  }
  return list.map((s) => ({
    id: s.id as string,
    created_at: s.created_at as string,
    source_page: (s.source_page ?? null) as string | null,
    utm_source: (s.utm_source ?? null) as string | null,
    utm_medium: (s.utm_medium ?? null) as string | null,
    utm_campaign: (s.utm_campaign ?? null) as string | null,
    messages: counts.get(s.id) ?? 0,
  }));
});

export const adminTranscript = createServerFn({ method: "GET" })
  .inputValidator((x) => z.object({ id: z.string().uuid() }).parse(x))
  .handler(async ({ data }) => {
    await requireAdmin();
    const d = await db();
    const [sess, msgs, names] = await Promise.all([
      d
        .from("concierge_sessions")
        .select("id, created_at, source_page, utm_source, utm_medium, utm_campaign")
        .eq("id", data.id)
        .maybeSingle(),
      d
        .from("concierge_messages")
        .select("id, role, content, surfaced_program_ids, created_at")
        .eq("session_id", data.id)
        .order("created_at", { ascending: true })
        .limit(1000),
      nameLookup(),
    ]);
    if (!sess.data) return null;
    return {
      session: sess.data as {
        id: string;
        created_at: string;
        source_page: string | null;
        utm_source: string | null;
        utm_medium: string | null;
        utm_campaign: string | null;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: ((msgs.data ?? []) as any[]).map((m) => ({
        id: m.id as string,
        role: m.role as string,
        content: (m.content ?? "") as string,
        created_at: m.created_at as string,
        surfaced: ((m.surfaced_program_ids ?? []) as string[]).map((id) => ({
          id,
          name: names.get(id) ?? id,
        })),
      })),
    };
  });
