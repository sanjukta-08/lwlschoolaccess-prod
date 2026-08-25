import {
  PROGRAMMES,
  TRACKS,
  cohortGrades,
  isPast,
  upcomingProgrammes,
  type Cohort,
  type Programme,
  type TrackKey,
  type TypeKey,
} from "./programmes";

export type FinderSearch = {
  grade: string;
  interest: string;
  month: string;
  type: string;
  q: string;
  view: string;
  status: string;
};

export const DEFAULT_SEARCH: FinderSearch = {
  grade: "all",
  interest: "all",
  month: "all",
  type: "all",
  q: "",
  view: "list",
  status: "all",
};

const str = (v: unknown, fallback: string) =>
  typeof v === "string" && v.length > 0 ? v : fallback;

/** Plain validator — search params are always strings with safe defaults. */
export const validateFinderSearch = (raw: Record<string, unknown>): FinderSearch => ({
  grade: str(raw["grade"], "all"),
  interest: str(raw["interest"], "all"),
  month: str(raw["month"], "all"),
  type: str(raw["type"], "all"),
  q: str(raw["q"], "").slice(0, 80),
  view: str(raw["view"], "list") === "grid" ? "grid" : "list",
  status: str(raw["status"], "all") === "soon" ? "soon" : "all",
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

/** Every matching cohort, flattened — used by the calendar. */
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
  s.grade === "all" && s.interest === "all" && s.month === "all" && s.type === "all" && !s.q;

export type { TypeKey };
