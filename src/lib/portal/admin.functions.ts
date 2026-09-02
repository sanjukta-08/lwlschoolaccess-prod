import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminSession = {
  userId: string;
  email: string | null;
  fullName: string | null;
  role: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  writeMode: "dormant" | "live";
};

/** Who am I, and is this replica allowed to write right now. */
export const adminWhoami = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminSession> => {
    const { loadAdminProfile, writeMode } = await import("./portal.server");
    const profile = await loadAdminProfile(context.userId);
    return { ...profile, writeMode: await writeMode() };
  });

export type DashboardStat = { key: string; label: string; value: number; hint?: string };

export type DashboardData = {
  stats: DashboardStat[];
  monthly: { month: string; applications: number; paid: number }[];
  topPrograms: { name: string; count: number }[];
  recent: {
    id: string;
    studentName: string | null;
    studentEmail: string | null;
    programName: string | null;
    country: string | null;
    paymentStatus: string | null;
    amount: number | null;
    currency: string | null;
    createdAt: string | null;
  }[];
  writeMode: "dormant" | "live";
};

const monthKey = (iso: string) => iso.slice(0, 7);

/** Live counts straight from `lwl_site` — read only, safe while dormant. */
export const adminDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<DashboardData> => {
    const { requireAdmin, siteDb, writeMode } = await import("./portal.server");
    await requireAdmin(context.userId);
    const db = siteDb();

    const [appsRes, leadsRes, formsRes, linksRes] = await Promise.all([
      db
        .from("lwl_applications")
        .select(
          "id,student_name,student_email,program_name,country,payment_status,amount,currency,created_at",
        )
        .order("created_at", { ascending: false })
        .limit(2000),
      db.from("captured_leads").select("id", { count: "exact", head: true }),
      db.from("form_templates").select("id", { count: "exact", head: true }),
      db.from("payment_links").select("id", { count: "exact", head: true }),
    ]);

    type Row = {
      id: string;
      student_name: string | null;
      student_email: string | null;
      program_name: string | null;
      country: string | null;
      payment_status: string | null;
      amount: number | string | null;
      currency: string | null;
      created_at: string | null;
    };
    const rows = (appsRes.data ?? []) as Row[];
    const paid = rows.filter((r) => (r.payment_status ?? "").toLowerCase() === "paid");
    const revenue = paid.reduce((sum, r) => sum + Number(r.amount ?? 0), 0);

    const months = new Map<string, { applications: number; paid: number }>();
    for (const r of rows) {
      if (!r.created_at) continue;
      const k = monthKey(r.created_at);
      const bucket = months.get(k) ?? { applications: 0, paid: 0 };
      bucket.applications += 1;
      if ((r.payment_status ?? "").toLowerCase() === "paid") bucket.paid += 1;
      months.set(k, bucket);
    }

    const programCounts = new Map<string, number>();
    for (const r of rows) {
      const name = r.program_name?.trim();
      if (!name) continue;
      programCounts.set(name, (programCounts.get(name) ?? 0) + 1);
    }

    return {
      stats: [
        { key: "applications", label: "Applications", value: rows.length },
        {
          key: "paid",
          label: "Paid",
          value: paid.length,
          ...(rows.length
            ? { hint: `${Math.round((paid.length / rows.length) * 100)}% of applications` }
            : {}),
        },
        { key: "revenue", label: "Collected", value: Math.round(revenue), hint: "Sum of paid amounts" },
        { key: "leads", label: "Captured leads", value: leadsRes.count ?? 0 },
        { key: "forms", label: "Application forms", value: formsRes.count ?? 0 },
        { key: "links", label: "Payment links", value: linksRes.count ?? 0 },
      ],
      monthly: Array.from(months.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(-12)
        .map(([month, v]) => ({ month, ...v })),
      topPrograms: Array.from(programCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, count]) => ({ name, count })),
      recent: rows.slice(0, 8).map((r) => ({
        id: r.id,
        studentName: r.student_name,
        studentEmail: r.student_email,
        programName: r.program_name,
        country: r.country,
        paymentStatus: r.payment_status,
        amount: r.amount == null ? null : Number(r.amount),
        currency: r.currency,
        createdAt: r.created_at,
      })),
      writeMode: await writeMode(),
    };
  });
