import { createServerFn } from "@tanstack/react-start";

import type {
  Cohort,
  MentorKey,
  Programme,
  TrackKey,
  TypeKey,
} from "./programmes";

/** A camp's live schedule, merged into the editorial camp records at runtime. */
export type LiveCamp = {
  slug: string;
  applyUrl: string | null;
  siteUrl: string | null;
  priceLabel: string | null;
  cohorts: { label: string; start?: string; note?: string }[];
};

export type LiveCatalogue = {
  programmes: Programme[];
  camps: LiveCamp[];
  generatedAt: string;
};

/* ------------------------------------------------------------------ */
/* row shapes                                                         */
/* ------------------------------------------------------------------ */

type PartnerRow = {
  id: string;
  org_name: string | null;
  website: string | null;
};

type ProgramRow = {
  id: string;
  partner_id: string | null;
  program_name: string;
  short_description: string | null;
  description: string | null;
  categories: string[] | null;
  target_categories: string[] | null;
  tags: string[] | null;
  duration: string | null;
  age_min: number | null;
  age_max: number | null;
  eligibility_grades: string | null;
  sticker_price: number | null;
  early_bird_price: number | null;
  price_currency: string | null;
  program_url: string | null;
  apply_url: string | null;
  pay_slug: string | null;
};

type CohortRow = {
  id: string;
  program_id: string;
  cohort_label: string | null;
  start_date: string | null;
  end_date: string | null;
  application_deadline: string | null;
  seats_total: number | null;
  seats_filled: number | null;
  is_cancelled: boolean | null;
};

type SiteProgramRow = {
  code: string;
  program_id: string | null;
  slug: string | null;
  name_override: string | null;
  type_key: string | null;
  track_key: string | null;
  mentor_key: string | null;
  tag: string | null;
  about: string | null;
  session_time: string | null;
  badge: string | null;
  dur_override: string | null;
  grade_min: number | null;
  grade_max: number | null;
  fee_early: string | null;
  fee_regular: string | null;
  site_url: string | null;
  apply_url: string | null;
  surface: string;
  is_visible: boolean;
  sort_order: number;
};

type SiteCohortRow = {
  program_code: string;
  cohort_id: string | null;
  start_date: string | null;
  label: string | null;
  session_time: string | null;
  elig: string | null;
  flyer_url: string | null;
  brochure_url: string | null;
  fee_early: string | null;
  fee_regular: string | null;
  is_visible: boolean;
};

/* ------------------------------------------------------------------ */
/* derivation helpers (used for database rows we have no editorial     */
/* record for, so a newly added programme still renders correctly)     */
/* ------------------------------------------------------------------ */

const ADVISOR = "https://calendly.com/learnwithleaders";
const TIME_TBC = "Live session times confirmed on registration";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const deriveType = (row: ProgramRow): TypeKey => {
  const cats = (row.categories ?? []).join(" ").toLowerCase();
  const name = row.program_name.toLowerCase();
  if (cats.includes("competition") || /championship|challenge|competition/.test(name))
    return "comp";
  if (cats.includes("fellowship") || name.includes("fellowship")) return "fel";
  return "prog";
};

const TRACK_RULES: [TrackKey, RegExp][] = [
  ["med", /doctor|medic|pre-?med|health|clinic/],
  ["law", /law|moot|debate|legal|advocacy|speech/],
  ["fin", /financ|finlit|wall street|invest|capital|money|econom/],
  ["ai", /\bai\b|artificial intelligence|entrepreneur|founder|startup|tech|innovat|business/],
  ["res", /research|scholar|publication|essay|academic writing/],
  ["sat", /\bsat\b|test prep|act\b|college readiness/],
  ["lead", /leader|diplomac|model united|mun|changemaker|global|impact|communicat|purpose/],
];

const deriveTrack = (row: ProgramRow): TrackKey => {
  const hay = [
    row.program_name,
    (row.tags ?? []).join(" "),
    (row.categories ?? []).join(" "),
    row.short_description ?? "",
  ]
    .join(" ")
    .toLowerCase();
  for (const [key, re] of TRACK_RULES) if (re.test(hay)) return key;
  return "lead";
};

const deriveMentor = (row: ProgramRow, partner: string): MentorKey => {
  const hay = `${row.program_name} ${(row.tags ?? []).join(" ")} ${partner}`.toLowerCase();
  if (hay.includes("hpair")) return "hpair";
  if (hay.includes("yale")) return "yale";
  if (hay.includes("harvard")) return "harvard";
  return "ivy";
};

const deriveGrades = (row: ProgramRow): [number, number] => {
  const m = (row.eligibility_grades ?? "").match(/(\d{1,2})\s*[-–to]+\s*(\d{1,2})/);
  if (m) return [Number(m[1]), Number(m[2])];
  if (row.age_min != null && row.age_max != null)
    return [Math.max(1, row.age_min - 5), Math.min(12, row.age_max - 5)];
  return [6, 12];
};

const money = (n: number | null, currency: string | null): string | null =>
  n == null ? null : `${(currency ?? "USD").trim()} ${n.toLocaleString("en-US")}`;

const firstUrl = (...urls: (string | null | undefined)[]) =>
  urls.find((u) => typeof u === "string" && u.trim().length > 0)?.trim() ?? null;

const isoToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};

/* ------------------------------------------------------------------ */
/* the server function                                                */
/* ------------------------------------------------------------------ */

export const loadCatalogue = createServerFn({ method: "GET" }).handler(
  async (): Promise<LiveCatalogue> => {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
    const key =
      process.env["SUPABASE_PUBLISHABLE_KEY"] ??
      process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return { programmes: [], camps: [], generatedAt: isoToday() };

    const auth = {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    } as const;
    const pub = createClient(url, key, { auth });
    const site = createClient(url, key, { auth, db: { schema: "lwl_site" } });

    const today = isoToday();

    const [partnersRes, programsRes, cohortsRes, siteProgRes, siteCohortRes] =
      await Promise.all([
        pub.from("all_partners").select("id,org_name,website"),
        pub
          .from("all_programs")
          .select(
            "id,partner_id,program_name,short_description,description,categories,target_categories,tags,duration,age_min,age_max,eligibility_grades,sticker_price,early_bird_price,price_currency,program_url,apply_url,pay_slug",
          )
          .eq("is_active", true),
        pub
          .from("all_cohorts")
          .select(
            "id,program_id,cohort_label,start_date,end_date,application_deadline,seats_total,seats_filled,is_cancelled",
          )
          .gte("start_date", today)
          .order("start_date", { ascending: true }),
        site.from("site_programs").select("*").order("sort_order", { ascending: true }),
        site.from("site_cohorts").select("*"),
      ]);

    const partners = new Map<string, PartnerRow>(
      ((partnersRes.data ?? []) as PartnerRow[]).map((p) => [p.id, p]),
    );
    const programs = (programsRes.data ?? []) as ProgramRow[];
    const dbCohorts = ((cohortsRes.data ?? []) as CohortRow[]).filter(
      (c) => !c.is_cancelled && c.start_date,
    );
    const siteProgrammes = ((siteProgRes.data ?? []) as SiteProgramRow[]).filter(
      (r) => r.is_visible,
    );
    const siteCohorts = ((siteCohortRes.data ?? []) as SiteCohortRow[]).filter(
      (r) => r.is_visible,
    );

    const programById = new Map(programs.map((p) => [p.id, p]));
    const cohortsByProgram = new Map<string, CohortRow[]>();
    for (const c of dbCohorts) {
      const list = cohortsByProgram.get(c.program_id);
      if (list) list.push(c);
      else cohortsByProgram.set(c.program_id, [c]);
    }
    const siteCohortsByCode = new Map<string, SiteCohortRow[]>();
    for (const c of siteCohorts) {
      const list = siteCohortsByCode.get(c.program_code);
      if (list) list.push(c);
      else siteCohortsByCode.set(c.program_code, [c]);
    }
    const overrideByCohortId = new Map<string, SiteCohortRow>();
    for (const c of siteCohorts) if (c.cohort_id) overrideByCohortId.set(c.cohort_id, c);

    /** Merge database batches with our per-batch extras, newest schedule wins. */
    const buildCohorts = (
      code: string | null,
      dbProgramId: string | null,
      programmeTime: string,
    ): Cohort[] => {
      const out = new Map<string, Cohort>();

      for (const c of dbProgramId ? (cohortsByProgram.get(dbProgramId) ?? []) : []) {
        const o = overrideByCohortId.get(c.id);
        const seatsLeft =
          c.seats_total != null ? Math.max(0, c.seats_total - (c.seats_filled ?? 0)) : null;
        const label = o?.label ?? c.cohort_label;
        out.set(c.start_date!, {
          d: c.start_date!,
          ...(label ? { label } : {}),
          ...(o?.session_time ? { time: o.session_time } : {}),
          ...(o?.elig ? { elig: o.elig } : {}),
          ...(o?.flyer_url ? { flyer: o.flyer_url } : {}),
          ...(o?.brochure_url ? { brochure: o.brochure_url } : {}),
          ...(o?.fee_early ? { fee: { e: o.fee_early, r: o.fee_regular ?? null } } : {}),
          ...(c.application_deadline ? { deadline: c.application_deadline } : {}),
          ...(seatsLeft != null ? { seatsLeft } : {}),
        });
      }

      // Batches we publish that the shared calendar has not picked up yet.
      for (const o of code ? (siteCohortsByCode.get(code) ?? []) : []) {
        if (!o.start_date || o.start_date < today) continue;
        if (out.has(o.start_date)) continue;
        out.set(o.start_date, {
          d: o.start_date,
          ...(o.label ? { label: o.label } : {}),
          ...(o.session_time ? { time: o.session_time } : {}),
          ...(o.elig ? { elig: o.elig } : {}),
          ...(o.flyer_url ? { flyer: o.flyer_url } : {}),
          ...(o.brochure_url ? { brochure: o.brochure_url } : {}),
          ...(o.fee_early ? { fee: { e: o.fee_early, r: o.fee_regular ?? null } } : {}),
        });
      }

      void programmeTime;
      return Array.from(out.values()).sort((a, b) => a.d.localeCompare(b.d));
    };

    /* --- 1. programmes we have an editorial record for ------------- */
    const programmes: Programme[] = [];
    const usedProgramIds = new Set<string>();
    const camps: LiveCamp[] = [];

    for (const s of siteProgrammes) {
      const db = s.program_id ? (programById.get(s.program_id) ?? null) : null;
      if (s.program_id) usedProgramIds.add(s.program_id);
      const partner = db?.partner_id ? partners.get(db.partner_id) : undefined;
      const cohorts = buildCohorts(s.code, db?.id ?? null, s.session_time ?? TIME_TBC);

      if (s.surface === "camp") {
        camps.push({
          slug: s.slug ?? s.code,
          applyUrl: firstUrl(db?.apply_url, s.apply_url, db?.program_url, ADVISOR),
          siteUrl: firstUrl(db?.program_url, s.site_url),
          priceLabel: money(db?.sticker_price ?? null, db?.price_currency ?? null),
          cohorts: cohorts.map((c) => ({
            label: c.label ?? c.d,
            start: c.d,
            ...(c.elig ? { note: c.elig } : {}),
          })),
        });
        continue;
      }

      const grades: [number, number] =
        s.grade_min != null && s.grade_max != null
          ? [s.grade_min, s.grade_max]
          : db
            ? deriveGrades(db)
            : [6, 12];

      programmes.push({
        id: s.code,
        name: s.name_override ?? db?.program_name ?? s.code,
        type: (s.type_key as TypeKey | null) ?? (db ? deriveType(db) : "prog"),
        tracks: [(s.track_key as TrackKey | null) ?? (db ? deriveTrack(db) : "lead")],
        mentor:
          (s.mentor_key as MentorKey | null) ??
          (db ? deriveMentor(db, partner?.org_name ?? "") : "harvard"),
        g: grades,
        tag: s.tag ?? db?.short_description ?? "",
        about: s.about ?? db?.description ?? db?.short_description ?? "",
        dur: s.dur_override ?? db?.duration ?? "",
        time: s.session_time ?? TIME_TBC,
        feeE:
          s.fee_early ??
          money(db?.early_bird_price ?? db?.sticker_price ?? null, db?.price_currency ?? null) ??
          "On request",
        feeR:
          s.fee_regular ??
          (db?.early_bird_price != null
            ? money(db.sticker_price, db.price_currency)
            : null),
        ...(s.badge ? { badge: s.badge } : {}),
        site: firstUrl(db?.program_url, s.site_url, partner?.website, ADVISOR)!,
        apply: firstUrl(db?.apply_url, s.apply_url, db?.program_url, partner?.website, ADVISOR)!,
        cohorts,
      });
    }

    /* --- 2. active database programmes with no editorial record ---- */
    for (const db of programs) {
      if (usedProgramIds.has(db.id)) continue;
      const cats = (db.categories ?? []).join(" ").toLowerCase();
      // Camps live on the camps hub; in-school programmes are not sold online.
      if (cats.includes("camp") || cats.includes("in_person") || cats.includes("in-school"))
        continue;
      if (/in-?school/i.test(db.program_name)) continue;

      const partner = db.partner_id ? partners.get(db.partner_id) : undefined;
      const cohorts = buildCohorts(null, db.id, TIME_TBC);

      programmes.push({
        id: db.pay_slug ?? db.id,
        name: db.program_name,
        type: deriveType(db),
        tracks: [deriveTrack(db)],
        mentor: deriveMentor(db, partner?.org_name ?? ""),
        g: deriveGrades(db),
        tag: db.short_description ?? "",
        about: db.description ?? db.short_description ?? "",
        dur: db.duration ?? "",
        time: TIME_TBC,
        feeE:
          money(db.early_bird_price ?? db.sticker_price, db.price_currency) ?? "On request",
        feeR: db.early_bird_price != null ? money(db.sticker_price, db.price_currency) : null,
        site: firstUrl(db.program_url, partner?.website, ADVISOR)!,
        apply: firstUrl(db.apply_url, db.program_url, partner?.website, ADVISOR)!,
        cohorts,
      });
    }

    return { programmes, camps, generatedAt: today };
  },
);

export { slugify as catalogueSlugify };
