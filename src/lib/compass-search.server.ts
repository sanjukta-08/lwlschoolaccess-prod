// Compass search: ranks the live catalogue (programmes, camps, masterclasses).
// Data comes from loadCatalogue (editorial overlay + applyLink contract) and the
// public-safe all_masterclasses_public view. Nothing here is hardcoded catalogue data.
import type { LiveCatalogue } from "./catalogue.functions";
import type { PublicMasterclass } from "./masterclasses.functions";
import { CAMPS } from "./camps";
import { TYPES, type TrackKey } from "./programmes";
import { programmePath, conferenceSlugOf } from "./programme-slug";

export type CompassCategory =
  | "medicine"
  | "law"
  | "finance"
  | "ai_tech"
  | "research"
  | "leadership"
  | "test_prep";

export type SearchParams = {
  grade_min: number | null;
  grade_max: number | null;
  categories: CompassCategory[] | null;
  type: "programme" | "masterclass" | "camp" | "any" | null;
  format: string | null;
  budget_max_usd: number | null;
  keyword: string | null;
  timing: "soonest" | "this_month" | "flexible" | null;
};

export type SearchResult = {
  id: string;
  name: string;
  platform: string;
  type: "programme" | "fellowship" | "competition" | "conference" | "camp" | "masterclass";
  grades: string;
  format: string;
  fee: string;
  next_date: string | null;
  view_url: string;
  apply_url: string | null;
  /** Short honest copy from the catalogue itself (about/tag/theme/description), capped at 200 chars. */
  blurb: string;
};

const SITE = "https://lwlschoolaccess.com";

const CAT_TRACK: Record<CompassCategory, TrackKey> = {
  medicine: "med",
  law: "law",
  finance: "fin",
  ai_tech: "ai",
  research: "res",
  leadership: "lead",
  test_prep: "sat",
};

const CAT_RE: Record<CompassCategory, RegExp> = {
  medicine: /doctor|medic|pre-?med|health|clinic/i,
  law: /law|moot|debate|legal|advocacy|speech/i,
  finance: /financ|finlit|invest|capital|money|econom/i,
  ai_tech: /\bai\b|artificial intelligence|entrepreneur|startup|tech|innovat|business/i,
  research: /research|scholar|publication|essay/i,
  leadership: /leader|diplomac|united nations|mun\b|changemaker|impact|communicat|purpose/i,
  test_prep: /\bsat\b|test prep|\bact\b|college readiness/i,
};

const CAMP_THEME: Record<string, CompassCategory> = {
  lead: "leadership",
  med: "medicine",
  law: "law",
  ent: "ai_tech",
  ai: "ai_tech",
  res: "research",
};

const parseGrades = (s: string | null | undefined): [number, number] | null => {
  const m = (s ?? "").match(/(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})/);
  if (m) return [Number(m[1]), Number(m[2])];
  const one = (s ?? "").match(/grade\s*(\d{1,2})/i);
  return one ? [Number(one[1]), Number(one[1])] : null;
};

const parseMoney = (s: string | null | undefined): number | null => {
  const m = (s ?? "").replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
};

/** Join whatever descriptive text a row carries into a single trimmed blurb (max 200 chars). */
const blurbOf = (...parts: (string | null | undefined)[]): string => {
  const text = parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  return text.length > 200 ? `${text.slice(0, 197).trimEnd()}…` : text;
};

type Row = SearchResult & {
  _g: [number, number] | null;
  _cats: CompassCategory[];
  _text: string;
  _feeNum: number | null;
  _free: boolean;
  _kind: "programme" | "camp" | "masterclass";
};

const today = () => new Date().toISOString().slice(0, 10);

export function buildRows(cat: LiveCatalogue, masterclasses: PublicMasterclass[]): Row[] {
  const now = today();
  const rows: Row[] = [];

  for (const p of cat.programmes) {
    const next = p.cohorts.find((c) => c.d >= now);
    if (!next) continue; // not listable without an upcoming cohort
    const typeLabel = TYPES[p.type]?.label ?? "Programme";
    const kind: SearchResult["type"] =
      p.type === "fel" ? "fellowship" : p.type === "comp" ? "competition" : p.type === "conf" ? "conference" : "programme";
    const cats = (Object.keys(CAT_TRACK) as CompassCategory[]).filter((c) => p.tracks.includes(CAT_TRACK[c]));
    const view = p.type === "conf" ? `/conferences/${conferenceSlugOf(p)}` : programmePath(p);
    rows.push({
      id: p.id,
      name: p.name,
      platform: p.partnerName ?? "Learn with Leaders",
      type: kind,
      grades: `Grades ${p.g[0]}–${p.g[1]}`,
      format: p.format ?? (p.location ? `In person · ${p.location}` : "Live online"),
      fee: p.feeR && p.feeR !== p.feeE ? `${p.feeE} (early) / ${p.feeR}` : p.feeE,
      next_date: next.d,
      view_url: `${SITE}${view}`,
      apply_url: p.apply,
      blurb: blurbOf(p.tag, p.about),
      _g: p.g,
      _cats: cats,
      _text: `${p.name} ${p.tag} ${p.about} ${(p.categories ?? []).join(" ")} ${typeLabel}`.toLowerCase(),
      _feeNum: parseMoney(p.feeE),
      _free: false,
      _kind: "programme",
    });
  }

  for (const live of cat.camps) {
    const ed = CAMPS.find((c) => c.slug === live.slug);
    if (!ed) continue;
    const next = live.cohorts.map((c) => c.start).filter((d): d is string => !!d && d >= now).sort()[0];
    if (!next) continue;
    const theme = CAMP_THEME[ed.themeKey];
    rows.push({
      id: live.slug,
      name: ed.name,
      platform: ed.host,
      type: "camp",
      grades: ed.gradeBand,
      format: `In person · ${ed.city}, ${ed.country}`,
      fee: live.priceLabel ?? "On request",
      next_date: next,
      view_url: `${SITE}/camps/${live.slug}`,
      apply_url: live.applyUrl,
      _g: parseGrades(ed.gradeBand),
      _cats: theme ? [theme] : [],
      _text: `${ed.name} ${ed.theme} ${ed.promise} ${ed.city} ${ed.country} camp residential`.toLowerCase(),
      _feeNum: parseMoney(live.priceLabel),
      _free: false,
      _kind: "camp",
    });
  }

  for (const m of masterclasses) {
    if (!m.scheduled_at) continue;
    const text = `${m.title} ${m.series ?? ""} ${m.program_name ?? ""} ${m.description ?? ""}`;
    rows.push({
      id: `masterclass:${m.id}`,
      name: m.title,
      platform: m.partner_name ?? "Learn with Leaders",
      type: "masterclass",
      grades: m.audience ?? "Open to students",
      format: "Live online",
      fee: "Free",
      next_date: m.scheduled_at,
      view_url: `${SITE}/masterclasses`,
      apply_url: m.apply_url,
      _g: parseGrades(m.audience),
      _cats: (Object.keys(CAT_RE) as CompassCategory[]).filter((c) => CAT_RE[c].test(text)),
      _text: text.toLowerCase(),
      _feeNum: 0,
      _free: true,
      _kind: "masterclass",
    });
  }
  return rows;
}

/** Rank: grade match > category match > budget fit > soonest start. */
export function searchRows(rows: Row[], q: SearchParams, limit = 3): SearchResult[] {
  const now = new Date();
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString().slice(0, 10);
  const lo = q.grade_min ?? q.grade_max;
  const hi = q.grade_max ?? q.grade_min;
  const cats = q.categories ?? [];
  const kw = (q.keyword ?? "").trim().toLowerCase();
  const fmt = (q.format ?? "").trim().toLowerCase();

  const scored = rows
    .filter((r) => !q.type || q.type === "any" || r._kind === q.type)
    .filter((r) => q.timing !== "this_month" || (r.next_date ?? "") < monthEnd)
    .filter((r) => !fmt || r.format.toLowerCase().includes(fmt) || (fmt.includes("online") && r.format.toLowerCase().includes("online")))
    .map((r) => {
      const grade = lo == null ? 0 : r._g ? (r._g[0] <= hi! && r._g[1] >= lo ? 1 : -1) : 0;
      const cat = cats.length ? (r._cats.some((c) => cats.includes(c)) ? 1 : 0) : 0;
      const key = kw ? (kw.split(/\s+/).some((w) => w.length > 2 && r._text.includes(w)) ? 1 : 0) : 0;
      const budget =
        q.budget_max_usd == null ? 0 : r._free || (r._feeNum != null && r._feeNum <= q.budget_max_usd) ? 1 : -1;
      return { r, grade, cat, key, budget, score: grade * 1000 + (cat + key) * 100 + budget * 10 };
    })
    // Drop clear mismatches: wrong grades, or nothing matching the asked topic.
    .filter((x) => x.grade >= 0 && ((!cats.length && !kw) || x.cat + x.key > 0))
    .sort((a, b) => b.score - a.score || (a.r.next_date ?? "9").localeCompare(b.r.next_date ?? "9"));

  return scored.slice(0, limit).map(({ r }) => {
    const { _g, _cats, _text, _feeNum, _free, _kind, ...pub } = r;
    void _g; void _cats; void _text; void _feeNum; void _free; void _kind;
    return pub;
  });
}
