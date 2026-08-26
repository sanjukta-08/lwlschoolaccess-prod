import {
  PROGRAMMES,
  TRACKS,
  TYPES,
  TYPE_BLURB,
  TYPE_ORDER,
  DURATION_ORDER,
  DURATIONS,
  cohortGrades,
  durationKey,
  isPast,
  upcomingProgrammes,
  type Cohort,
  type Programme,
  type DurationKey,
  type TrackKey,
  type TypeKey,
} from "./programmes";
import { REGIONS, fitsRegion } from "./regions";

export type FinderSearch = {
  grade: string;
  interest: string;
  region: string;
  month: string;
  type: string;
  duration: string;
  q: string;
  view: string;
  status: string;
  sort: string;
  density: string;
  calView: string;
};

export const DEFAULT_SEARCH: FinderSearch = {
  grade: "all",
  interest: "all",
  region: "all",
  month: "all",
  type: "all",
  duration: "all",
  q: "",
  view: "list",
  status: "all",
  sort: "cat",
  density: "compact",
  calView: "month",
};

const str = (v: unknown, fallback: string) =>
  typeof v === "string" && v.length > 0 ? v : fallback;

/** Plain validator - search params are always strings with safe defaults. */
export const validateFinderSearch = (raw: Record<string, unknown>): FinderSearch => ({
  grade: str(raw["grade"], "all"),
  interest: str(raw["interest"], "all"),
  region: (() => {
    const r = str(raw["region"], "all");
    return r in REGIONS ? r : "all";
  })(),
  month: str(raw["month"], "all"),
  type: str(raw["type"], "all"),
  duration: (() => {
    const d = str(raw["duration"], "all");
    return d in DURATIONS ? d : "all";
  })(),
  mentor: (() => {
    const m = str(raw["mentor"], "all");
    return m in MENTORS ? m : "all";
  })(),
  q: str(raw["q"], "").slice(0, 80),
  view: str(raw["view"], "list") === "grid" ? "grid" : "list",
  status: str(raw["status"], "all") === "soon" ? "soon" : "all",
  sort: str(raw["sort"], "cat") === "month" ? "month" : "cat",
  density: str(raw["density"], "compact") === "comfy" ? "comfy" : "compact",
  calView: str(raw["calView"], "month") === "type" ? "type" : "month",
});


export const BANDS: Record<string, [number, number]> = {
  b57: [5, 7],
  b810: [8, 10],
  b1112: [11, 12],
};

export const BAND_LABEL: Record<string, string> = {
  b57: "Grades 5–7",
  b810: "Grades 8–10",
  b1112: "Grades 11–12",
};

export const gradeOptions = () => {
  const out = [
    { value: "all", label: "any grade" },
    { value: "b57", label: "Grades 5–7" },
    { value: "b810", label: "Grades 8–10" },
    { value: "b1112", label: "Grades 11–12" },
  ];
  for (let g = 5; g <= 12; g++) out.push({ value: String(g), label: `Grade ${g}` });
  return out;
};

/** Months that still contain at least one upcoming cohort. */
export const monthOptions = () => {
  const months = new Set<string>();
  upcomingProgrammes().forEach((p) =>
    p.cohorts.forEach((c) => months.add(c.d.slice(0, 7))),
  );
  const list = Array.from(months)
    .sort()
    .map((m) => ({
      value: m,
      label: new Date(m + "-01T00:00:00").toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      }),
    }));
  return [{ value: "all", label: "any time" }, ...list];
};

export const monthLabel = (value: string) =>
  monthOptions().find((m) => m.value === value)?.label ?? "any time";

const matchGrade = (p: Programme, c: Cohort, grade: string) => {
  if (grade === "all") return true;
  const [lo, hi] = cohortGrades(p, c);
  const band = BANDS[grade];
  if (band) return band[0] <= hi && band[1] >= lo;
  const g = Number(grade);
  return Number.isFinite(g) && g >= lo && g <= hi;
};

const matchInterest = (p: Programme, interest: string) =>
  interest === "all" || p.tracks.includes(interest as TrackKey);

const matchType = (p: Programme, type: string) => type === "all" || p.type === type;

const matchDuration = (p: Programme, duration: string) =>
  duration === "all" || durationKey(p) === (duration as DurationKey);

const matchMentor = (p: Programme, mentor: string) =>
  mentor === "all" || p.mentor === (mentor as MentorKey);

/** Options for the duration and mentor dropdowns. */
export const durationOptions = () => [
  { value: "all", label: "any length" },
  ...DURATION_ORDER.map((d) => ({ value: d, label: DURATIONS[d] })),
];

export const mentorOptions = () => [
  { value: "all", label: "any university" },
  ...MENTOR_ORDER.map((m) => ({ value: m, label: MENTORS[m].label })),
];

const matchMonth = (c: Cohort, month: string) =>
  month === "all" || c.d.startsWith(month);

const matchQuery = (p: Programme, q: string) => {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    p.name,
    p.tag,
    p.about,
    p.dur,
    ...p.tracks.map((t) => TRACKS[t].label),
  ]
    .join(" ")
    .toLowerCase();
  return needle.split(/\s+/).every((word) => haystack.includes(word));
};

export type Match = { p: Programme; next: Cohort; others: Cohort[] };

export type MatchOptions = {
  typeOverride?: string;
  ignoreRegion?: boolean;
  ignoreMonth?: boolean;
  ignoreInterest?: boolean;
  ignoreQuery?: boolean;
};

export function getMatches(state: FinderSearch, o: MatchOptions = {}): Match[] {
  const type = o.typeOverride !== undefined ? o.typeOverride : state.type;
  const out: Match[] = [];
  PROGRAMMES.forEach((p) => {
    if (!matchType(p, type)) return;
    if (!o.ignoreInterest && !matchInterest(p, state.interest)) return;
    if (!o.ignoreQuery && !matchQuery(p, state.q)) return;
    if (!matchDuration(p, state.duration)) return;
    if (!matchMentor(p, state.mentor)) return;
    if (!o.ignoreRegion && !fitsRegion(p, state.region)) return;
    const eligible = p.cohorts
      .filter((c) => !isPast(c.d))
      .filter(
        (c) =>
          matchGrade(p, c, state.grade) && (o.ignoreMonth || matchMonth(c, state.month)),
      )
      .sort((a, b) => a.d.localeCompare(b.d));
    if (eligible.length) {
      out.push({ p, next: eligible[0]!, others: eligible.slice(1) });
    }
  });
  out.sort((a, b) => a.next.d.localeCompare(b.next.d));
  return out;
}

/** Every matching cohort, flattened - used by the calendar. */
export function getCohortEntries(state: FinderSearch) {
  const entries: { p: Programme; c: Cohort }[] = [];
  getMatches({ ...state, month: "all" }, {}).forEach(({ p, next, others }) => {
    [next, ...others].forEach((c) => entries.push({ p, c }));
  });
  return entries.sort((a, b) => a.c.d.localeCompare(b.c.d));
}

export const typeCounts = (state: FinderSearch, types: string[]) =>
  Object.fromEntries(
    types.map((t) => [t, getMatches(state, { typeOverride: t }).length]),
  ) as Record<string, number>;

export const isDefaultSearch = (s: FinderSearch) =>
  s.grade === "all" &&
  s.interest === "all" &&
  s.region === "all" &&
  s.month === "all" &&
  s.type === "all" &&
  s.duration === "all" &&
  s.mentor === "all" &&
  !s.q;

export type MatchGroup = {
  key: string;
  label: string;
  sub: string;
  rows: Match[];
};

/** Group results either by category (default) or by the month they start. */
export function groupMatches(matches: Match[], sort: string): MatchGroup[] {
  if (sort === "month") {
    const byMonth = new Map<string, Match[]>();
    matches.forEach((m) => {
      const key = m.next.d.slice(0, 7);
      const list = byMonth.get(key);
      if (list) list.push(m);
      else byMonth.set(key, [m]);
    });
    return Array.from(byMonth.keys())
      .sort()
      .map((key) => {
        const rows = byMonth.get(key)!;
        return {
          key,
          label: new Date(key + "-01T00:00:00").toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          }),
          sub: "Cohorts opening this month",
          rows,
        };
      });
  }

  return TYPE_ORDER.map((t) => ({
    key: t,
    label: TYPES[t].label,
    sub: TYPE_BLURB[t],
    rows: matches.filter((m) => m.p.type === t),
  })).filter((g) => g.rows.length > 0);
}

export type Entry = { p: Programme; c: Cohort };

export type MonthGroup = { key: string; label: string; rows: Entry[] };

/** Cohort rows grouped by calendar month, chronologically. */
export function groupEntriesByMonth(entries: Entry[]): MonthGroup[] {
  const by = new Map<string, Entry[]>();
  entries.forEach((e) => {
    const key = e.c.d.slice(0, 7);
    const list = by.get(key);
    if (list) list.push(e);
    else by.set(key, [e]);
  });
  return Array.from(by.keys())
    .sort()
    .map((key) => ({
      key,
      label: new Date(key + "-01T00:00:00").toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      }),
      rows: by.get(key)!,
    }));
}

export type TypeGroup = {
  key: TypeKey;
  label: string;
  sub: string;
  rows: { p: Programme; next: Cohort; others: Cohort[] }[];
};

/** One row per programme, grouped by category and sorted by next start. */
export function groupProgrammesByType(entries: Entry[]): TypeGroup[] {
  const by = new Map<string, { p: Programme; cs: Cohort[] }>();
  entries.forEach(({ p, c }) => {
    const hit = by.get(p.id);
    if (hit) hit.cs.push(c);
    else by.set(p.id, { p, cs: [c] });
  });
  const progs = Array.from(by.values());
  progs.forEach((x) => x.cs.sort((a, b) => a.d.localeCompare(b.d)));
  progs.sort((a, b) => a.cs[0]!.d.localeCompare(b.cs[0]!.d));
  return TYPE_ORDER.map((t) => ({
    key: t,
    label: TYPES[t].label,
    sub: TYPE_BLURB[t],
    rows: progs
      .filter((x) => x.p.type === t)
      .map((x) => ({ p: x.p, next: x.cs[0]!, others: x.cs.slice(1) })),
  })).filter((g) => g.rows.length > 0);
}

/** Programme counts for one facet, holding every other filter steady. */
export function facetCounts(
  state: FinderSearch,
  facet: "type" | "interest" | "region" | "duration" | "mentor",
  values: string[],
): Record<string, number> {
  const out: Record<string, number> = {};
  values.forEach((v) => {
    const next = { ...state, [facet]: v } as FinderSearch;
    out[v] = new Set(getCohortEntries(next).map((e) => e.p.id)).size;
  });
  return out;
}

export type { TypeKey };

