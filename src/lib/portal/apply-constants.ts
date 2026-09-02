import { COUNTRY_CODES, DEFAULT_COUNTRY } from "@/lib/countryCodes";
import type { FormField } from "./form-field";

export interface MergedProgram {
  code: string;
  slug?: string;
  name: string;
  category: string;
  externalApplyUrl?: string;
  locationLabel?: string;
  duration?: string;
  grades?: string;
  startDate?: string;
  deliveryMode?: string;
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const CATEGORY_ORDER = ["camp", "certificate", "conference", "competition", "fellowship"];

export const CATEGORY_LABELS: Record<string, string> = {
  camp: "Camps",
  certificate: "Certificate Programmes",
  conference: "Conferences",
  competition: "Competitions",
  fellowship: "Fellowships",
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  camp: "Immersive experiences at world-class universities",
  certificate: "Earn credentials from prestigious institutions",
  conference: "Global forums for future leaders",
  competition: "Compete on the international stage",
  fellowship: "Exclusive mentorship & research programmes",
};

/** Detect whether a form field collects a phone number. */
export const isPhoneField = (f: FormField) => {
  const c = (f.db_column || "").toLowerCase();
  return f.type === "tel" || c.includes("phone") || c.includes("mobile") || c.includes("whatsapp");
};

/** Parse a stored phone string into country + national digits. */
export function parseStoredPhone(value: string) {
  if (!value) return { country: DEFAULT_COUNTRY, national: "" };
  const raw = String(value).trim();
  const v = raw.startsWith("+") ? raw : `+${raw.replace(/\D/g, "")}`;
  const sorted = [...COUNTRY_CODES].sort((a, b) => b.dial.length - a.dial.length);
  const m = sorted.find((c) => v.startsWith(c.dial));
  if (m) return { country: m, national: v.slice(m.dial.length).replace(/\D/g, "") };
  return { country: DEFAULT_COUNTRY, national: v.replace(/\D/g, "") };
}

/** Program-code prefix → programme category, as used across the platform. */
export const PROGRAM_CATEGORY_MAP: Record<string, string> = {
  CA: "Camp",
  ZL: "Zoom Led",
  IP: "In Person",
  UC: "University Camp",
  SC: "In School Program",
  CO: "Certificate Online",
  OC: "Certificate Program",
  OM: "Online Meeting",
  OP: "Competition",
  CF: "Conference",
};

export function decodeProgramCategory(code: string): string | null {
  if (!code) return null;
  const prefix = code.split("-")[0]?.toUpperCase();
  return prefix ? PROGRAM_CATEGORY_MAP[prefix] || null : null;
}

/** Normalise any category-ish string onto the five public buckets. */
export function bucketCategory(raw: string | null | undefined): string {
  const v = (raw || "").toLowerCase();
  if (!v) return "";
  if (v.includes("conference")) return "conference";
  if (v.includes("camp")) return "camp";
  if (v.includes("competition") || v.includes("olympiad")) return "competition";
  if (v.includes("fellowship")) return "fellowship";
  if (v.includes("certificate") || v.includes("online") || v.includes("school")) return "certificate";
  return "";
}
