// Decode cohort metadata directly from a program code string.
// Program codes follow: [CAT]-[ORG]-[PROG]-[DDMMYY](-[SCHOOL/LOC])
// e.g. "CO-HSA-FD01-020426" → 2 April 2026.
// This keeps cohort logic fully client-side; no Vault Console fetch required.

const MONTHS_LONG = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

export interface DecodedCohort {
  code: string;
  date: Date | null;
  label: string; // human friendly e.g. "2 April 2026"
  isPast: boolean;
}

function dateSegFromCode(code: string): string | null {
  const parts = code.split('-');
  return parts.find((p) => /^\d{6}$/.test(p)) ?? null;
}

export function decodeCohort(code: string): DecodedCohort {
  const seg = dateSegFromCode(code);
  if (!seg) {
    return { code, date: null, label: code, isPast: false };
  }
  const dd = parseInt(seg.slice(0, 2), 10);
  const mm = parseInt(seg.slice(2, 4), 10);
  const yy = parseInt(seg.slice(4, 6), 10);
  if (!dd || !mm || mm > 12 || dd > 31) {
    return { code, date: null, label: code, isPast: false };
  }
  const date = new Date(2000 + yy, mm - 1, dd);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return {
    code,
    date,
    label: `${dd} ${MONTHS_LONG[mm - 1]} ${2000 + yy}`,
    isPast: date.getTime() < today.getTime(),
  };
}

export function decodeCohorts(codes: string[]): DecodedCohort[] {
  return (codes ?? []).map(decodeCohort).sort((a, b) => {
    if (a.date && b.date) return a.date.getTime() - b.date.getTime();
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
}

// True only when at least one linked code decodes to a valid future date.
// Undecodable slug-style strings (e.g. "future-entrepreneurs") do NOT count as open.
export function hasOpenCohort(codes: string[]): boolean {
  if (!codes || codes.length === 0) return true; // no codes linked = unrestricted
  return decodeCohorts(codes).some((c) => c.date && !c.isPast);
}

// Convenience: shape used by Apply page cohort dropdown.
// Only returns codes with a valid decoded date that is not in the past —
// undecodable slug-style strings (e.g. "future-entrepreneurs") are ignored.
export function openCohorts(codes: string[]): DecodedCohort[] {
  return decodeCohorts(codes).filter((c) => c.date && !c.isPast);
}

// ─── Single source of truth helpers for program start dates ────────────────
// Anywhere in the platform that needs a program's start date should derive it
// from the program code via these helpers — never from a separately stored
// `startDate` field. The program code is canonical.

function pad2(n: number): string { return String(n).padStart(2, '0'); }

/** Decode a single program code's start date as 'YYYY-MM-DD'. */
export function startDateFromCode(code: string | null | undefined): string | null {
  if (!code) return null;
  const { date } = decodeCohort(code);
  if (!date) return null;
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

/**
 * Earliest start date among a list of codes.
 * Prefers the earliest non-past cohort; if every code is in the past, returns
 * the most recent past date (so the UI still has something to show).
 */
export function earliestStartDateFromCodes(codes: string[] | null | undefined): string | null {
  const decoded = decodeCohorts(codes || []).filter((c) => c.date);
  if (!decoded.length) return null;
  const future = decoded.filter((c) => !c.isPast);
  const pick = future.length ? future[0] : decoded[decoded.length - 1];
  const d = pick.date!;
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/** True if the code decodes to a date strictly before today (UTC-naive local). */
export function isCodeExpired(code: string | null | undefined, graceDays = 0): boolean {
  if (!code) return false;
  const { date } = decodeCohort(code);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cutoff = new Date(date.getTime() + graceDays * 86_400_000);
  return cutoff.getTime() < today.getTime();
}

