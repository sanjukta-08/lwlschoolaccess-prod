/**
 * Checkout server layer — replica of the Application Portal's /pay flow.
 *
 * Pricing is ALWAYS resolved server-side from our own catalogue
 * (`lwl_site.form_templates.settings` or a negotiated `lwl_site.payment_links`
 * row). The browser never sends an amount. While the replica is dormant no row
 * is written and no PaymentIntent is created: the flow returns a priced preview
 * so the whole journey can be reviewed safely.
 */
import { createServerFn } from "@tanstack/react-start";

import { applyDiscount, readPricing, type Pricing } from "./pricing";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type PayApplicant = {
  studentName: string;
  studentEmail: string;
  parentName: string;
  parentEmail: string;
  schoolName: string;
  cohortCode: string;
};

export type PayOffer = {
  kind: "token" | "direct";
  /** Present for tokenised checkouts. */
  token: string | null;
  slug: string | null;
  programCode: string | null;
  programName: string;
  programCategory: string | null;
  /** Cohort codes linked to the offer; the UI decodes dates from them. */
  cohortCodes: string[];
  pricing: Pricing;
  promoAllowed: boolean;
  paymentStatus: string | null;
  applicant: PayApplicant | null;
  /** True when the applicant details are fixed (tokenised checkout). */
  locked: boolean;
  formSlug: string | null;
};

const emptyPricing: Pricing = {
  currency: "USD",
  full: null,
  installments: [],
  installmentsEnabled: false,
};

const clean = (v: unknown) => String(v ?? "").trim();

function pricingFromPaymentLink(link: Record<string, any>): Pricing {
  return readPricing({
    currency: link["currency"] ?? "USD",
    full_price:
      Number(link["full_amount"]) > 0
        ? { label: link["name"] || "Full payment", amount: Number(link["full_amount"]) }
        : {},
    installments: link["installments_enabled"] ? (link["installments"] ?? []) : [],
    installments_enabled: link["installments_enabled"] === true,
  });
}

/** Cohort codes linked to a template, from either storage shape. */
function cohortCodesFrom(settings: Record<string, any>, programCode: string | null): string[] {
  const stored = Array.isArray(settings["program_codes"]) ? settings["program_codes"] : [];
  const codes = stored.map((c: unknown) => clean(c)).filter(Boolean);
  if (codes.length > 0) return codes;
  return programCode ? [programCode] : [];
}

/* ------------------------------------------------------------------ */
/* offer resolution                                                    */
/* ------------------------------------------------------------------ */

export const getPayOffer = createServerFn({ method: "GET" })
  .inputValidator((data: { param?: string }) => ({ param: clean(data?.param) }))
  .handler(async ({ data }) => {
    const { siteDb } = await import("./portal.server");
    const db = siteDb();
    const param = data["param"];
    if (!param) return null;

    /* ---- tokenised checkout: resume an existing application row ---- */
    if (UUID_RE.test(param)) {
      const { data: app } = await db
        .from("lwl_applications")
        .select(
          "id, submission_token, program_code, program_name, program_category, student_name, student_email, parent_name, parent_email, school_name, payment_status, form_template_id, payment_link_id, currency, amount",
        )
        .eq("submission_token", param)
        .maybeSingle();
      if (!app) return null;
      const row = app as Record<string, any>;

      let pricing = emptyPricing;
      let promoAllowed = true;
      let formSlug: string | null = null;
      let cohortCodes: string[] = row["program_code"] ? [row["program_code"]] : [];

      if (row["payment_link_id"]) {
        const { data: link } = await db
          .from("payment_links")
          .select("id, slug, name, currency, full_amount, installments, installments_enabled, is_active")
          .eq("id", row["payment_link_id"])
          .maybeSingle();
        if (link && (link as Record<string, any>)["is_active"] !== false) {
          pricing = pricingFromPaymentLink(link as Record<string, any>);
          promoAllowed = false;
        }
      }

      if (!pricing.full && !pricing.installmentsEnabled) {
        const query = row["form_template_id"]
          ? db.from("form_templates").select("id, slug, settings").eq("id", row["form_template_id"])
          : db
              .from("form_templates")
              .select("id, slug, settings")
              .eq("program_code", row["program_code"] ?? "");
        const { data: tpl } = await query.maybeSingle();
        const settings = ((tpl as Record<string, any> | null)?.["settings"] ?? {}) as Record<string, any>;
        pricing = readPricing(settings);
        promoAllowed = promoAllowed && settings["promo_disabled"] !== true;
        formSlug = clean((tpl as Record<string, any> | null)?.["slug"]) || null;
        const linked = cohortCodesFrom(settings, row["program_code"] ?? null);
        if (linked.length > 0) cohortCodes = linked;
      }

      const offer: PayOffer = {
        kind: "token",
        token: clean(row["submission_token"]),
        slug: null,
        programCode: clean(row["program_code"]) || null,
        programName: clean(row["program_name"]) || "Programme enrolment",
        programCategory: clean(row["program_category"]) || null,
        cohortCodes,
        pricing,
        promoAllowed,
        paymentStatus: clean(row["payment_status"]) || "pending",
        applicant: {
          studentName: clean(row["student_name"]),
          studentEmail: clean(row["student_email"]),
          parentName: clean(row["parent_name"]),
          parentEmail: clean(row["parent_email"]),
          schoolName: clean(row["school_name"]),
          cohortCode: clean(row["program_code"]),
        },
        locked: true,
        formSlug,
      };
      return offer;
    }

    /* ---- shareable direct link: negotiated offer first, then template ---- */
    const slug = param.toLowerCase();

    const { data: link } = await db
      .from("payment_links")
      .select(
        "id, slug, name, form_template_id, program_code, currency, full_amount, installments, installments_enabled, is_active, expires_at, max_uses, uses_count",
      )
      .eq("slug", slug)
      .maybeSingle();

    const negotiated = link as Record<string, any> | null;
    const linkUsable =
      !!negotiated &&
      negotiated["is_active"] !== false &&
      (!negotiated["expires_at"] || new Date(negotiated["expires_at"]).getTime() > Date.now()) &&
      (!Number(negotiated["max_uses"]) ||
        Number(negotiated["uses_count"] ?? 0) < Number(negotiated["max_uses"]));

    const tplQuery = linkUsable
      ? negotiated!["form_template_id"]
        ? db
            .from("form_templates")
            .select("id, slug, name, program_name_override, program_code, settings, is_active")
            .eq("id", negotiated!["form_template_id"])
        : db
            .from("form_templates")
            .select("id, slug, name, program_name_override, program_code, settings, is_active")
            .eq("program_code", clean(negotiated!["program_code"]))
      : db
          .from("form_templates")
          .select("id, slug, name, program_name_override, program_code, settings, is_active")
          .eq("slug", slug);

    const first = await tplQuery.maybeSingle();
    const resolved = first.data
      ? first
      : await db
          .from("form_templates")
          .select("id, slug, name, program_name_override, program_code, settings, is_active")
          .eq("program_code", param.toUpperCase())
          .maybeSingle();

    const tpl = resolved.data as Record<string, any> | null;
    if (!tpl && !linkUsable) return null;
    if (tpl && tpl["is_active"] === false && !linkUsable) return null;

    const settings = (tpl?.["settings"] ?? {}) as Record<string, any>;
    const programCode = clean(negotiated?.["program_code"]) || clean(tpl?.["program_code"]) || null;
    const offer: PayOffer = {
      kind: "direct",
      token: null,
      slug: linkUsable ? slug : clean(tpl?.["slug"]) || slug,
      programCode,
      programName:
        clean(tpl?.["program_name_override"]) ||
        clean(tpl?.["name"]) ||
        clean(negotiated?.["name"]) ||
        "Programme enrolment",
      programCategory: clean(settings["category"]) || null,
      cohortCodes: cohortCodesFrom(settings, programCode),
      pricing: linkUsable ? pricingFromPaymentLink(negotiated!) : readPricing(settings),
      promoAllowed: !linkUsable && settings["promo_disabled"] !== true,
      paymentStatus: null,
      applicant: null,
      locked: false,
      formSlug: clean(tpl?.["slug"]) || null,
    };
    return offer;
  });

/* ------------------------------------------------------------------ */
/* promo validation (central shared catalogue)                         */
/* ------------------------------------------------------------------ */

export type PromoResult =
  | { ok: true; code: string; discountType: "percent" | "fixed"; discountValue: number }
  | { ok: false; error: string };

/** One generic failure message everywhere: promo codes must not be enumerable. */
const PROMO_GENERIC = "This promo code cannot be applied to this programme.";

export const validatePayPromo = createServerFn({ method: "POST" })
  .inputValidator((data: { code?: string; programCode?: string; programName?: string }) => ({
    code: clean(data?.code).toUpperCase(),
    programCode: clean(data?.programCode).toUpperCase(),
    programName: clean(data?.programName),
  }))
  .handler(async ({ data }): Promise<PromoResult> => {
    if (!/^[A-Z0-9_-]{3,32}$/.test(data["code"])) return { ok: false, error: PROMO_GENERIC };
    const { sharedDb } = await import("./portal.server");
    const { data: rows, error } = await sharedDb()
      .from("promo_codes")
      .select(
        "code, program_name, discount_type, discount_value, max_redemptions, redemption_count, starts_at, expires_at, is_active",
      )
      .eq("code", data["code"])
      .limit(5);
    if (error) return { ok: false, error: PROMO_GENERIC };

    const now = Date.now();
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const match = (Array.isArray(rows) ? rows : []).find((r) => {
      const row = r as Record<string, any>;
      if (row["is_active"] === false) return false;
      if (row["starts_at"] && new Date(row["starts_at"]).getTime() > now) return false;
      if (row["expires_at"] && new Date(row["expires_at"]).getTime() < now) return false;
      const max = Number(row["max_redemptions"] ?? 0);
      if (max > 0 && Number(row["redemption_count"] ?? 0) >= max) return false;
      const scoped = clean(row["program_name"]);
      if (!scoped) return true;
      const a = norm(scoped);
      const b = norm(data["programName"]);
      return !b || a === b || a.includes(b) || b.includes(a);
    }) as Record<string, any> | undefined;

    if (!match) return { ok: false, error: PROMO_GENERIC };
    const type = clean(match["discount_type"]).toLowerCase() === "percent" ? "percent" : "fixed";
    const value = Number(match["discount_value"] ?? 0);
    if (!(value > 0)) return { ok: false, error: PROMO_GENERIC };
    return { ok: true, code: data["code"], discountType: type, discountValue: value };
  });

/* ------------------------------------------------------------------ */
/* checkout                                                            */
/* ------------------------------------------------------------------ */

export type CheckoutResult = {
  ok: boolean;
  /** True when the replica is dormant: priced preview only, nothing written. */
  dormant: boolean;
  token: string | null;
  amountMinor: number;
  currency: string;
  label: string;
  clientSecret: string | null;
  alreadyPaid: boolean;
  message?: string;
};

export const startCheckout = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      param?: string;
      planIndex?: number;
      promoCode?: string;
      applicant?: Partial<PayApplicant>;
      utm?: Record<string, string | null | undefined>;
    }) => {
      const param = clean(data?.param);
      if (!param) throw new Error("Missing checkout reference");
      const a = data?.applicant ?? {};
      const applicant: PayApplicant = {
        studentName: clean(a.studentName),
        studentEmail: clean(a.studentEmail).toLowerCase(),
        parentName: clean(a.parentName),
        parentEmail: clean(a.parentEmail).toLowerCase(),
        schoolName: clean(a.schoolName),
        cohortCode: clean(a.cohortCode),
      };
      return {
        param,
        planIndex: Number.isFinite(data?.planIndex) ? Number(data?.planIndex) : 0,
        promoCode: clean(data?.promoCode).toUpperCase(),
        applicant,
        utm: (data?.utm ?? {}) as Record<string, string | null | undefined>,
      };
    },
  )
  .handler(async ({ data }): Promise<CheckoutResult> => {
    const { writeMode } = await import("./portal.server");
    const offer = (await getPayOffer({ data: { param: data["param"] } })) as PayOffer | null;
    if (!offer) throw new Error("This payment link is no longer available.");

    if (offer.paymentStatus === "paid") {
      return {
        ok: true,
        dormant: false,
        token: offer.token,
        amountMinor: 0,
        currency: offer.pricing.currency,
        label: "Already paid",
        clientSecret: null,
        alreadyPaid: true,
      };
    }

    const applicant = offer.locked && offer.applicant ? offer.applicant : data["applicant"];
    if (!offer.locked) {
      if (!applicant.studentName || !EMAIL_RE.test(applicant.studentEmail)) {
        throw new Error("A valid student name and email are required.");
      }
      if (!applicant.parentName || !EMAIL_RE.test(applicant.parentEmail)) {
        throw new Error("A valid parent or guardian name and email are required.");
      }
      if (!applicant.schoolName) throw new Error("School name is required.");
      if (offer.cohortCodes.length > 1 && !applicant.cohortCode) {
        throw new Error("Please choose a cohort.");
      }
    }

    /* Server-side pricing: the browser's number is never trusted. */
    const { pricing } = offer;
    const plan = pricing.installmentsEnabled
      ? pricing.installments[Math.max(0, Math.min(data["planIndex"], pricing.installments.length - 1))]
      : pricing.full;
    if (!plan || plan.amountMinor === null) {
      throw new Error("No price is configured for this programme yet. Please talk to an advisor.");
    }

    let amountMinor = plan.amountMinor;
    if (offer.promoAllowed && data["promoCode"]) {
      const promo = await validatePayPromo({
        data: {
          code: data["promoCode"],
          programCode: offer.programCode ?? "",
          programName: offer.programName,
        },
      });
      if (promo.ok) {
        amountMinor = applyDiscount(
          amountMinor,
          { discountType: promo.discountType, discountValue: promo.discountValue },
          pricing.currency,
        );
      }
    }

    if ((await writeMode()) !== "live") {
      return {
        ok: true,
        dormant: true,
        token: offer.token,
        amountMinor,
        currency: pricing.currency,
        label: plan.label,
        clientSecret: null,
        alreadyPaid: false,
        message:
          "Preview only — this replica is dormant. Pricing, promo and cohort logic are live, but no application row was written and no card will be charged. The live portal still owns payments.",
      };
    }

    /* ---- live mode: one row per student per programme, then a PaymentIntent ---- */
    const { siteDb } = await import("./portal.server");
    let token = offer.token;
    if (!token) {
      const { data: upserted, error } = await siteDb().rpc("upsert_application", {
        _payload: {
          program_code: applicant.cohortCode || offer.programCode,
          program_name: offer.programName,
          program_category: offer.programCategory,
          student_name: applicant.studentName,
          student_email: applicant.studentEmail,
          parent_name: applicant.parentName,
          parent_email: applicant.parentEmail,
          school_name: applicant.schoolName,
          source_flow: "pay_first",
          utm_source: data["utm"]["utm_source"] ?? null,
          utm_medium: data["utm"]["utm_medium"] ?? null,
          utm_campaign: data["utm"]["utm_campaign"] ?? null,
        },
      });
      if (error) throw new Error(error.message);
      const row = (Array.isArray(upserted) ? upserted[0] : upserted) as Record<string, any> | null;
      token = clean(row?.["submission_token"]) || null;
      if (row?.["payment_status"] === "paid") {
        return {
          ok: true,
          dormant: false,
          token,
          amountMinor: 0,
          currency: pricing.currency,
          label: "Already paid",
          clientSecret: null,
          alreadyPaid: true,
        };
      }
    }

    const stripeKey = process.env["STRIPE_SECRET_KEY"];
    if (!stripeKey) {
      throw new Error("Card payments are not configured on this site yet. Please talk to an advisor.");
    }

    const body = new URLSearchParams({
      amount: String(amountMinor),
      currency: pricing.currency.toLowerCase(),
      description: offer.programCode ?? offer.programName,
      "automatic_payment_methods[enabled]": "true",
      receipt_email: applicant.parentEmail || applicant.studentEmail,
      "metadata[application_token]": token ?? "",
      "metadata[program_code]": applicant.cohortCode || offer.programCode || "",
      "metadata[program_name]": offer.programName,
      "metadata[student_name]": applicant.studentName,
      "metadata[student_email]": applicant.studentEmail,
      "metadata[parent_name]": applicant.parentName,
      "metadata[parent_email]": applicant.parentEmail,
      "metadata[school_name]": applicant.schoolName,
      "metadata[pay_mode]": pricing.installmentsEnabled ? "installments" : "full",
      "metadata[promo_code]": data["promoCode"] || "",
    });

    const res = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    const intent = (await res.json()) as Record<string, any>;
    if (!res.ok) {
      throw new Error(clean(intent?.["error"]?.["message"]) || "Could not start the payment.");
    }

    return {
      ok: true,
      dormant: false,
      token,
      amountMinor: Number(intent["amount"] ?? amountMinor),
      currency: String(intent["currency"] ?? pricing.currency).toUpperCase(),
      label: plan.label,
      clientSecret: clean(intent["client_secret"]) || null,
      alreadyPaid: false,
    };
  });

/* ------------------------------------------------------------------ */
/* success page                                                        */
/* ------------------------------------------------------------------ */

export const getPaymentStatus = createServerFn({ method: "GET" })
  .inputValidator((data: { token?: string }) => ({ token: clean(data?.token) }))
  .handler(async ({ data }) => {
    if (!UUID_RE.test(data["token"])) return null;
    const { siteDb } = await import("./portal.server");
    const { data: row } = await siteDb()
      .from("lwl_applications")
      .select(
        "submission_token, program_code, program_name, payment_status, amount, currency, student_name, student_email, payment_date",
      )
      .eq("submission_token", data["token"])
      .maybeSingle();
    if (!row) return null;
    const r = row as Record<string, any>;
    return {
      token: clean(r["submission_token"]),
      programCode: clean(r["program_code"]) || null,
      programName: clean(r["program_name"]) || "Programme enrolment",
      paymentStatus: clean(r["payment_status"]) || "pending",
      amount: r["amount"] === null || r["amount"] === undefined ? null : Number(r["amount"]),
      currency: clean(r["currency"]) || "USD",
      studentName: clean(r["student_name"]),
      studentEmail: clean(r["student_email"]),
      paidAt: r["payment_date"] ? String(r["payment_date"]) : null,
    };
  });
