// Centralised input normalizers — keeps DB data clean and consistent.
import { COUNTRY_CODES } from './countryCodes';


/**
 * Normalize a name:
 *  - Trim & collapse internal whitespace
 *  - Strip any non-Latin / non-allowed characters (digits, symbols, other scripts)
 *  - Title-case each word (preserving hyphens and apostrophes)
 *
 * Allowed: A-Z a-z, space, hyphen, apostrophe, dot.
 */
export function normalizeName(input: string): string {
  if (!input) return '';
  // 1. Strip disallowed characters
  const cleaned = input.replace(/[^A-Za-z\s'.\-]/g, '');
  // 2. Collapse whitespace and trim
  const collapsed = cleaned.replace(/\s+/g, ' ').trim();
  if (!collapsed) return '';
  // 3. Title-case (handles hyphen/apostrophe boundaries: O'Brien, Mary-Jane)
  return collapsed
    .toLowerCase()
    .replace(/(^|[\s'\-.])([a-z])/g, (_m, sep, ch) => sep + ch.toUpperCase());
}

/**
 * Live-input filter for name fields: strips disallowed chars while typing
 * but preserves spacing / case so the user isn't fighting the cursor.
 * Final formatting is done by `normalizeName` on submit.
 */
export function filterNameInput(input: string): string {
  return input.replace(/[^A-Za-z\s'.\-]/g, '');
}

/**
 * Normalize an email: lowercase + trim + strip spaces.
 */
export function normalizeEmail(input: string): string {
  if (!input) return '';
  return input.trim().toLowerCase().replace(/\s+/g, '');
}

/**
 * Resolve a dial code (digits only, no "+") from a country name or ISO2 code.
 */
export function dialFromCountry(country?: string | null): string {
  const q = (country || '').trim().toLowerCase();
  if (!q) return '';
  const byIso = q.length === 2 ? COUNTRY_CODES.find(c => c.iso2.toLowerCase() === q) : undefined;
  const match = byIso || COUNTRY_CODES.find(c => c.name.toLowerCase() === q);
  return match ? match.dial.replace(/\D/g, '') : '';
}

/**
 * DATABASE FORMAT for every phone number in the platform:
 * digits only — no "+", no spaces, no separators, no letters.
 * e.g. "+91 77499 90239" → "917749990239"
 *
 * When the value carries no country code, we derive one from the country the
 * user selected in the same form (`country` may be a name or an ISO2 code).
 */
export function normalizePhone(input: string, country?: string | null): string {
  if (!input) return '';
  let s = String(input).trim();
  // "0091..." international prefix → treat as country-coded
  if (/^00\d/.test(s)) s = s.slice(2);
  const hadPlus = s.startsWith('+');
  let digits = s.replace(/\D/g, '');
  if (!digits) return '';
  if (hadPlus) return digits;

  // Already carries a known dial code?
  const dials = [...new Set(COUNTRY_CODES.map(c => c.dial.replace(/\D/g, '')))]
    .sort((a, b) => b.length - a.length);
  const cc = dialFromCountry(country);
  if (cc) {
    if (digits.startsWith(cc)) {
      const national = digits.slice(cc.length);
      // Strip a trunk "0" (e.g. UK 044 7911 → 447911)
      return cc + national.replace(/^0+/, '');
    }
    return cc + digits.replace(/^0+/, '');
  }
  // No country hint — keep as-is if it plausibly already has a dial code.
  if (digits.length >= 11 && dials.some(d => digits.startsWith(d))) return digits;
  return digits;
}

/** Alias with an explicit, self-documenting name for save paths. */
export const toStoredPhone = normalizePhone;

/**
 * Front-end display format: always shown with a leading "+".
 */
export function displayPhone(stored?: string | null): string {
  const d = (stored || '').replace(/\D/g, '');
  return d ? `+${d}` : '';
}


/**
 * Generic field-aware normalizer — picks the right strategy based on
 * the dynamic form-field's column / type metadata.
 */
export function normalizeFieldValue(
  fieldKey: string,
  fieldType: string | undefined,
  value: string,
  country?: string | null,
): string {
  if (value == null) return '';
  const k = (fieldKey || '').toLowerCase();
  const t = (fieldType || '').toLowerCase();

  if (t === 'email' || k.includes('email')) return normalizeEmail(value);
  if (t === 'tel' || k.includes('phone') || k.includes('mobile') || k.includes('whatsapp'))
    return normalizePhone(value, country);
  if (k.includes('name')) return normalizeName(value);
  // Default: just trim
  return typeof value === 'string' ? value.trim() : value;
}

/**
 * Normalize an entire form-data record before submission.
 * Phone fields are resolved against the record's own `country` value so a
 * number typed without a country code still lands in the DB fully qualified.
 */
export function normalizeFormData<T extends Record<string, any>>(
  data: T,
  fieldsMeta?: Array<{ db_column: string; type?: string }>,
): T {
  const out: Record<string, any> = { ...data };
  const country: string | null =
    (typeof out["country"] === 'string' && out["country"]) ||
    (typeof out["student_country"] === 'string' && out["student_country"]) ||
    null;
  if (fieldsMeta && fieldsMeta.length > 0) {
    for (const f of fieldsMeta) {
      if (typeof out[f.db_column] === 'string') {
        out[f.db_column] = normalizeFieldValue(f.db_column, f.type, out[f.db_column], country);
      }
    }
  } else {
    for (const k of Object.keys(out)) {
      if (typeof out[k] === 'string') {
        out[k] = normalizeFieldValue(k, undefined, out[k], country);
      }
    }
  }

  return out as T;
}
