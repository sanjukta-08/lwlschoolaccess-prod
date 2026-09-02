/**
 * Read-only operations data for the admin console (Phase 4).
 *
 * Everything here reads `lwl_site` through the privileged client behind
 * `requireAdmin`. No writes: the replica stays dormant until the live portal
 * is retired, so these screens are deliberately list/inspect only.
 */
import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const num = (v: unknown, fallback: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export type ListQuery = {
  search: string;
  status: string;
  program: string;
  page: number;
  pageSize: number;
};

const listInput = (data: Partial<ListQuery> | undefined): ListQuery => ({
  search: clean(data?.search).slice(0, 120),
  status: clean(data?.status).slice(0, 40),
  program: clean(data?.program).slice(0, 160),
  page: Math.max(1, Math.min(500, Math.round(num(data?.page, 1)))),
  pageSize: Math.max(10, Math.min(100, Math.round(num(data?.pageSize, 25)))),
});

/** Escapes a value for a PostgREST `or(...)` ilike filter. */
const ilikeSafe = (s: string) => s.replace(/[,()*]/g, " ").trim();

export type ApplicationRow = {
  id: string;
  studentName: string | null;
  studentEmail: string | null;
  studentMobile: string | null;
  parentName: string | null;
  parentEmail: string | null;
  grade: string | null;
  schoolName: string | null;
  country: string | null;
  programCode: string | null;
  programName: string | null;
  programCategory: string | null;
  paymentStatus: string | null;
  paymentMode: string | null;
  amount: number | null;
  currency: string | null;
  paymentDate: string | null;
  sourceFlow: string | null;
  registrationStatus: string | null;
  submissionToken: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  adminNotes: string | null;
  createdAt: string | null;
};

export type ApplicationsResult = {
  rows: ApplicationRow[];
  total: number;
  page: number;
  pageSize: number;
  statuses: string[];
  programmes: string[];
  writeMode: "dormant" | "live";
};

const APP_COLUMNS =
  "id,student_name,student_email,student_mobile,parent_name,parent_email,grade,school_name,country,program_code,program_name,program_category,payment_status,payment_mode,amount,currency,payment_date,source_flow,registration_status,submission_token,utm_source,utm_campaign,admin_notes,created_at";

const mapApplication = (r: Record<string, any>): ApplicationRow => ({
  id: String(r["id"]),
  studentName: r["student_name"] ?? null,
  studentEmail: r["student_email"] ?? null,
  studentMobile: r["student_mobile"] ?? null,
  parentName: r["parent_name"] ?? null,
  parentEmail: r["parent_email"] ?? null,
  grade: r["grade"] ?? null,
  schoolName: r["school_name"] ?? null,
  country: r["country"] ?? null,
  programCode: r["program_code"] ?? null,
  programName: r["program_name"] ?? null,
  programCategory: r["program_category"] ?? null,
  paymentStatus: r["payment_status"] ?? null,
  paymentMode: r["payment_mode"] ?? null,
  amount: r["amount"] == null ? null : Number(r["amount"]),
  currency: r["currency"] ?? null,
  paymentDate: r["payment_date"] ?? null,
  sourceFlow: r["source_flow"] ?? null,
  registrationStatus: r["registration_status"] ?? null,
  submissionToken: r["submission_token"] ?? null,
  utmSource: r["utm_source"] ?? null,
  utmCampaign: r["utm_campaign"] ?? null,
  adminNotes: r["admin_notes"] ?? null,
  createdAt: r["created_at"] ?? null,
});

/** Distinct facet values, computed from a bounded recent window. */
async function facets(db: any, table: string, statusColumn: string) {
  const { data } = await db
    .from(table)
    .select(`${statusColumn},program_name`)
    .order("created_at", { ascending: false })
    .limit(4000);
  const statuses = new Set<string>();
  const programmes = new Set<string>();
  for (const r of (data ?? []) as Record<string, any>[]) {
    const s = clean(r[statusColumn]);
    if (s) statuses.add(s);
    const p = clean(r["program_name"]);
    if (p) programmes.add(p);
  }
  return {
    statuses: Array.from(statuses).sort((a, b) => a.localeCompare(b)),
    programmes: Array.from(programmes).sort((a, b) => a.localeCompare(b)),
  };
}

export const adminApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(listInput)
  .handler(async ({ data, context }): Promise<ApplicationsResult> => {
    const { requireAdmin, siteDb, writeMode } = await import("./portal.server");
    await requireAdmin(context.userId);
    const db = siteDb();

    let q = db.from("lwl_applications").select(APP_COLUMNS, { count: "exact" });
    if (data.status) q = q.eq("payment_status", data.status);
    if (data.program) q = q.eq("program_name", data.program);
    const term = ilikeSafe(data.search);
    if (term) {
      q = q.or(
        [
          `student_name.ilike.%${term}%`,
          `student_email.ilike.%${term}%`,
          `parent_name.ilike.%${term}%`,
          `parent_email.ilike.%${term}%`,
          `school_name.ilike.%${term}%`,
          `program_name.ilike.%${term}%`,
          `program_code.ilike.%${term}%`,
        ].join(","),
      );
    }
    const from = (data.page - 1) * data.pageSize;
    const { data: rows, count } = await q
      .order("created_at", { ascending: false })
      .range(from, from + data.pageSize - 1);

    const { statuses, programmes } = await facets(db, "lwl_applications", "payment_status");

    return {
      rows: ((rows ?? []) as Record<string, any>[]).map(mapApplication),
      total: count ?? 0,
      page: data.page,
      pageSize: data.pageSize,
      statuses,
      programmes,
      writeMode: await writeMode(),
    };
  });

export type PaymentRow = {
  id: string;
  studentName: string | null;
  studentEmail: string | null;
  programName: string | null;
  programCode: string | null;
  amount: number | null;
  currency: string | null;
  paymentStatus: string | null;
  paymentMode: string | null;
  paymentIntentId: string | null;
  paymentDate: string | null;
  submissionToken: string | null;
  createdAt: string | null;
};

export type PaymentsResult = {
  rows: PaymentRow[];
  total: number;
  page: number;
  pageSize: number;
  statuses: string[];
  programmes: string[];
  totals: { currency: string; collected: number; count: number }[];
};

export const adminPayments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(listInput)
  .handler(async ({ data, context }): Promise<PaymentsResult> => {
    const { requireAdmin, siteDb } = await import("./portal.server");
    await requireAdmin(context.userId);
    const db = siteDb();

    let q = db
      .from("lwl_applications")
      .select(
        "id,student_name,student_email,program_name,program_code,amount,currency,payment_status,payment_mode,payment_intent_id,payment_date,submission_token,created_at",
        { count: "exact" },
      )
      .not("payment_status", "is", null)
      .neq("payment_status", "");
    if (data.status) q = q.eq("payment_status", data.status);
    if (data.program) q = q.eq("program_name", data.program);
    const term = ilikeSafe(data.search);
    if (term) {
      q = q.or(
        [
          `student_name.ilike.%${term}%`,
          `student_email.ilike.%${term}%`,
          `program_name.ilike.%${term}%`,
          `payment_intent_id.ilike.%${term}%`,
        ].join(","),
      );
    }
    const from = (data.page - 1) * data.pageSize;
    const { data: rows, count } = await q
      .order("payment_date", { ascending: false, nullsFirst: false })
      .range(from, from + data.pageSize - 1);

    const { data: paidRows } = await db
      .from("lwl_applications")
      .select("amount,currency,payment_status")
      .eq("payment_status", "paid")
      .limit(5000);

    const byCurrency = new Map<string, { collected: number; count: number }>();
    for (const r of (paidRows ?? []) as Record<string, any>[]) {
      const cur = (clean(r["currency"]) || "USD").toUpperCase();
      const bucket = byCurrency.get(cur) ?? { collected: 0, count: 0 };
      bucket.collected += Number(r["amount"] ?? 0);
      bucket.count += 1;
      byCurrency.set(cur, bucket);
    }

    const { statuses, programmes } = await facets(db, "lwl_applications", "payment_status");

    return {
      rows: ((rows ?? []) as Record<string, any>[]).map((r) => ({
        id: String(r["id"]),
        studentName: r["student_name"] ?? null,
        studentEmail: r["student_email"] ?? null,
        programName: r["program_name"] ?? null,
        programCode: r["program_code"] ?? null,
        amount: r["amount"] == null ? null : Number(r["amount"]),
        currency: r["currency"] ?? null,
        paymentStatus: r["payment_status"] ?? null,
        paymentMode: r["payment_mode"] ?? null,
        paymentIntentId: r["payment_intent_id"] ?? null,
        paymentDate: r["payment_date"] ?? null,
        submissionToken: r["submission_token"] ?? null,
        createdAt: r["created_at"] ?? null,
      })),
      total: count ?? 0,
      page: data.page,
      pageSize: data.pageSize,
      statuses,
      programmes,
      totals: Array.from(byCurrency.entries())
        .map(([currency, v]) => ({ currency, ...v }))
        .sort((a, b) => b.collected - a.collected),
    };
  });

export type LeadRow = {
  id: string;
  leadType: string | null;
  status: string | null;
  converted: boolean;
  studentName: string | null;
  studentEmail: string | null;
  studentPhone: string | null;
  parentName: string | null;
  parentEmail: string | null;
  grade: string | null;
  schoolName: string | null;
  country: string | null;
  programName: string | null;
  programCode: string | null;
  source: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  landingPage: string | null;
  createdAt: string | null;
};

export type LeadsResult = {
  rows: LeadRow[];
  total: number;
  page: number;
  pageSize: number;
  statuses: string[];
  programmes: string[];
  convertedCount: number;
};

export const adminCapturedLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(listInput)
  .handler(async ({ data, context }): Promise<LeadsResult> => {
    const { requireAdmin, siteDb } = await import("./portal.server");
    await requireAdmin(context.userId);
    const db = siteDb();

    let q = db.from("captured_leads").select(
      "id,lead_type,status,converted,student_name,student_email,student_phone,parent_name,parent_email,grade,school_name,country,program_name,program_code,source,utm_source,utm_campaign,landing_page,created_at",
      { count: "exact" },
    );
    if (data.status) q = q.eq("status", data.status);
    if (data.program) q = q.eq("program_name", data.program);
    const term = ilikeSafe(data.search);
    if (term) {
      q = q.or(
        [
          `student_name.ilike.%${term}%`,
          `student_email.ilike.%${term}%`,
          `parent_email.ilike.%${term}%`,
          `school_name.ilike.%${term}%`,
          `program_name.ilike.%${term}%`,
        ].join(","),
      );
    }
    const from = (data.page - 1) * data.pageSize;
    const { data: rows, count } = await q
      .order("created_at", { ascending: false })
      .range(from, from + data.pageSize - 1);

    const [{ count: converted }, f] = await Promise.all([
      db.from("captured_leads").select("id", { count: "exact", head: true }).eq("converted", true),
      facets(db, "captured_leads", "status"),
    ]);

    return {
      rows: ((rows ?? []) as Record<string, any>[]).map((r) => ({
        id: String(r["id"]),
        leadType: r["lead_type"] ?? null,
        status: r["status"] ?? null,
        converted: r["converted"] === true,
        studentName: r["student_name"] ?? null,
        studentEmail: r["student_email"] ?? null,
        studentPhone: r["student_phone"] ?? null,
        parentName: r["parent_name"] ?? null,
        parentEmail: r["parent_email"] ?? null,
        grade: r["grade"] ?? null,
        schoolName: r["school_name"] ?? null,
        country: r["country"] ?? null,
        programName: r["program_name"] ?? null,
        programCode: r["program_code"] ?? null,
        source: r["source"] ?? null,
        utmSource: r["utm_source"] ?? null,
        utmCampaign: r["utm_campaign"] ?? null,
        landingPage: r["landing_page"] ?? null,
        createdAt: r["created_at"] ?? null,
      })),
      total: count ?? 0,
      page: data.page,
      pageSize: data.pageSize,
      statuses: f.statuses,
      programmes: f.programmes,
      convertedCount: converted ?? 0,
    };
  });

export type MentorRow = {
  id: string;
  fullName: string | null;
  university: string | null;
  bio: string | null;
  imageUrl: string | null;
  programmes: string[];
  isActive: boolean;
  displayOrder: number | null;
  source: "portal" | "shared";
};

export const adminMentors = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ rows: MentorRow[]; sharedCount: number }> => {
    const { requireAdmin, siteDb, sharedDb } = await import("./portal.server");
    await requireAdmin(context.userId);

    const [ours, shared] = await Promise.all([
      siteDb()
        .from("mentors")
        .select("id,full_name,bio,image_url,university,program_associations,is_active,display_order")
        .order("display_order", { ascending: true })
        .limit(500),
      sharedDb().from("all_mentors").select("*").limit(500),
    ]);

    const portalRows: MentorRow[] = ((ours.data ?? []) as Record<string, any>[]).map((r) => ({
      id: String(r["id"]),
      fullName: r["full_name"] ?? null,
      university: r["university"] ?? null,
      bio: r["bio"] ?? null,
      imageUrl: r["image_url"] ?? null,
      programmes: Array.isArray(r["program_associations"])
        ? (r["program_associations"] as unknown[]).map(String)
        : [],
      isActive: r["is_active"] !== false,
      displayOrder: r["display_order"] == null ? null : Number(r["display_order"]),
      source: "portal",
    }));

    const sharedRows: MentorRow[] = ((shared.data ?? []) as Record<string, any>[]).map((r, i) => ({
      id: String(r["id"] ?? `shared-${i}`),
      fullName: r["full_name"] ?? r["name"] ?? null,
      university: r["university"] ?? r["affiliation"] ?? null,
      bio: r["bio"] ?? r["headline"] ?? null,
      imageUrl: r["image_url"] ?? r["photo_url"] ?? null,
      programmes: Array.isArray(r["program_associations"])
        ? (r["program_associations"] as unknown[]).map(String)
        : [],
      isActive: r["is_active"] !== false,
      displayOrder: null,
      source: "shared",
    }));

    const seen = new Set(
      portalRows.map((m) => (m.fullName ?? "").toLowerCase().replace(/\s+/g, " ").trim()),
    );
    const extras = sharedRows.filter(
      (m) => !seen.has((m.fullName ?? "").toLowerCase().replace(/\s+/g, " ").trim()),
    );

    return { rows: [...portalRows, ...extras], sharedCount: sharedRows.length };
  });
