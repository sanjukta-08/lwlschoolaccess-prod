import { createServerFn } from "@tanstack/react-start";

import type { FormField, PublicFormTemplate } from "./form-field";

/* ------------------------------------------------------------------ */
/* templates                                                          */
/* ------------------------------------------------------------------ */

const SENSITIVE_SETTING_KEYS = [
  "stripe_price_id",
  "stripe_prices",
  "full_price",
  "installments",
  "razorpay_plan_id",
];

/** Never let payment keys reach the browser — same rule as the live portal RPC. */
const sanitise = (row: Record<string, unknown> | null): PublicFormTemplate | null => {
  if (!row) return null;
  const settings: Record<string, any> = { ...((row["settings"] as Record<string, any>) ?? {}) };
  for (const key of SENSITIVE_SETTING_KEYS) delete settings[key];
  const schema = Array.isArray(row["schema"]) ? (row["schema"] as FormField[]) : null;
  return {
    id: String(row["id"] ?? ""),
    name: String(row["name"] ?? "Application"),
    slug: (row["slug"] as string | null) ?? null,
    program_code: (row["program_code"] as string | null) ?? null,
    schema,
    settings,
    has_payment: row["has_payment"] === true || Boolean((row as { stripe_price_id?: string }).stripe_price_id),
  };
};

/** Every active public form template (used for programme browsing). */
export const listApplyTemplates = createServerFn({ method: "GET" }).handler(
  async () => {
    const { siteDb } = await import("./portal.server");
    const { data, error } = await siteDb().rpc("get_public_form_template", {});
    if (error) throw new Error(error.message);
    return (Array.isArray(data) ? data : [])
      .map((row) => sanitise(row as Record<string, unknown>))
      .filter((t): t is PublicFormTemplate => !!t);
  },
);

/**
 * Resolve one template for an apply link. Precedence mirrors the live portal:
 * slug → program_code → slug-as-code → template whose settings list the code.
 */
export const getApplyTemplate = createServerFn({ method: "GET" })
  .inputValidator((data: { slug?: string; code?: string }) => ({
    slug: (data?.slug ?? "").trim().toLowerCase(),
    code: (data?.code ?? "").trim(),
  }))
  .handler(async ({ data }) => {
    const { siteDb } = await import("./portal.server");
    const db = siteDb();
    const first = async (args: Record<string, string>) => {
      const { data: rows, error } = await db.rpc("get_public_form_template", args);
      if (error) return null;
      const row = Array.isArray(rows) ? rows[0] : null;
      return sanitise((row as Record<string, unknown>) ?? null);
    };

    if (data.slug) {
      const bySlug = await first({ _slug: data.slug });
      if (bySlug) return bySlug;
    }
    if (!data.code) return null;

    const byCode = await first({ _program_code: data.code });
    if (byCode) return byCode;

    const codeAsSlug = await first({ _slug: data.code.toLowerCase() });
    if (codeAsSlug) return codeAsSlug;

    // Legacy: templates listing the code inside settings.program_codes.
    const { data: all, error } = await db.rpc("get_public_form_template", {});
    if (error || !Array.isArray(all)) return null;
    const linked = (all as Record<string, unknown>[]).find((t) => {
      const codes = (t["settings"] as { program_codes?: unknown } | null)?.program_codes;
      return Array.isArray(codes) && codes.includes(data["code"]);
    });
    return sanitise(linked ?? null);
  });

/** Live programme-code catalogue so linked cohort ids resolve to current codes. */
export const listProgramCodes = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ id: string; ref_code: string }[]> => {
    const { siteDb } = await import("./portal.server");
    const { data, error } = await siteDb().from("program_codes").select("id, ref_code");
    if (error) return [];
    return (Array.isArray(data) ? data : [])
      .filter((r: Record<string, unknown>) => r?.id && r?.ref_code)
      .map((r: Record<string, unknown>) => ({ id: String(r["id"]), ref_code: String(r["ref_code"]) }));
  },
);

/* ------------------------------------------------------------------ */
/* submission                                                          */
/* ------------------------------------------------------------------ */

export type SubmitResult = {
  ok: boolean;
  /** True when the replica is dormant: nothing was written anywhere. */
  dormant: boolean;
  submissionToken?: string | null;
  paymentStatus?: string | null;
  rowId?: string | null;
  message?: string;
};

/**
 * Submit an application through `lwl_site.upsert_application` — the exact RPC
 * the live portal uses, so dedupe and student-id reuse stay identical.
 * While this replica is dormant nothing is written; the caller is told so.
 */
export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: { payload: Record<string, unknown> }) => {
    const payload = data?.payload;
    if (!payload || typeof payload !== "object") throw new Error("Application payload missing");
    const email = String((payload as Record<string, unknown>)["student_email"] ?? "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("A valid student email is required");
    }
    return { payload: payload as Record<string, unknown> };
  })
  .handler(async ({ data }): Promise<SubmitResult> => {
    const { siteDb, writeMode } = await import("./portal.server");
    if ((await writeMode()) !== "live") {
      return {
        ok: true,
        dormant: true,
        message:
          "Preview only — this replica is dormant, so your application was validated but not recorded. The live portal still owns submissions.",
      };
    }

    let lastError: { message: string; code?: string } | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      const { data: result, error } = await siteDb().rpc("upsert_application", {
        _payload: data.payload,
      });
      if (!error) {
        const row = (Array.isArray(result) ? result[0] : result) as Record<string, unknown> | null;
        return {
          ok: true,
          dormant: false,
          submissionToken: (row?.submission_token as string | null) ?? null,
          paymentStatus: (row?.payment_status as string | null) ?? null,
          rowId: (row?.row_id as string | null) ?? null,
        };
      }
      lastError = { message: error.message, code: (error as { code?: string }).code };
      const code = lastError.code ?? "";
      const transient =
        !code || code.startsWith("5") || code === "PGRST301" || /network|fetch|timeout/i.test(lastError?.message);
      if (!transient) break;
      await new Promise((r) => setTimeout(r, 400 * 2 ** attempt));
    }
    throw new Error(lastError?.message || "Failed to submit application");
  });

/* ------------------------------------------------------------------ */
/* captured leads (autosave)                                          */
/* ------------------------------------------------------------------ */

export type CapturedLeadInput = {
  program_code?: string | null;
  program_name?: string | null;
  program_category?: string | null;
  student_name?: string | null;
  student_email?: string | null;
  student_phone?: string | null;
  parent_name?: string | null;
  parent_email?: string | null;
  parent_phone?: string | null;
  grade?: string | null;
  school_name?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  raw_data?: Record<string, unknown>;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  landing_page?: string | null;
  device_type?: string | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Autosave a half-finished application as a captured lead — dedupes on
 * (program_code, email) exactly like the live portal. Dormant: no-op.
 */
export const captureApplyLead = createServerFn({ method: "POST" })
  .inputValidator((data: { lead: CapturedLeadInput }) => {
    const lead = data?.lead ?? {};
    const email = (lead.student_email || lead.parent_email || "").trim().toLowerCase();
    if (!email || !EMAIL_RE.test(email)) throw new Error("skip");
    return { lead };
  })
  .handler(async ({ data }): Promise<{ saved: boolean; dormant: boolean }> => {
    const { siteDb, writeMode } = await import("./portal.server");
    if ((await writeMode()) !== "live") return { saved: false, dormant: true };

    const lead = data.lead;
    const studentEmail = lead.student_email?.trim().toLowerCase() || null;
    const parentEmail = lead.parent_email?.trim().toLowerCase() || null;
    const matchEmail = studentEmail || parentEmail;
    if (!matchEmail) return { saved: false, dormant: false };

    const row = {
      lead_type: "form",
      source: "application_autosave",
      program_code: lead.program_code || null,
      program_name: lead.program_name || null,
      program_category: lead.program_category || null,
      student_name: lead.student_name?.trim() || null,
      student_email: studentEmail,
      student_phone: lead.student_phone || null,
      parent_name: lead.parent_name?.trim() || null,
      parent_email: parentEmail,
      parent_phone: lead.parent_phone || null,
      grade: lead.grade?.trim() || null,
      school_name: lead.school_name?.trim() || null,
      city: lead.city?.trim() || null,
      state: lead.state?.trim() || null,
      country: lead.country?.trim() || null,
      raw_data: lead.raw_data || {},
      utm_source: lead.utm_source || null,
      utm_medium: lead.utm_medium || null,
      utm_campaign: lead.utm_campaign || null,
      landing_page: lead.landing_page || null,
      device_type: lead.device_type || null,
    };

    const db = siteDb();
    let query = db
      .from("captured_leads")
      .select("id, converted")
      .eq("lead_type", "form")
      .eq("source", "application_autosave")
      .or(`student_email.eq.${matchEmail},parent_email.eq.${matchEmail}`);
    query = row["program_code"] ? query.eq("program_code", row["program_code"]) : query.is("program_code", null);

    const { data: existing, error } = await query.limit(1);
    const found = (Array.isArray(existing) ? existing[0] : null) as
      | { id: string; converted?: boolean }
      | null;

    if (!error && found?.id) {
      if (found.converted) return { saved: false, dormant: false };
      await db.from("captured_leads").update(row).eq("id", found.id);
      return { saved: true, dormant: false };
    }
    await db.from("captured_leads").insert(row);
    return { saved: true, dormant: false };
  });
