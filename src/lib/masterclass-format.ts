/** Formatting helpers for the public masterclass listing. */

const DUBAI = "Asia/Dubai";

export function monthKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function monthLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: DUBAI,
  });
}

export function dayLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: DUBAI,
  });
}

export function dayNumber(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", timeZone: DUBAI });
}

export function dayMonth(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", timeZone: DUBAI });
}

function timeIn(iso: string, tz: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: tz,
  });
}

/** "5:00 PM GST (9:00 AM ET)" - Gulf time first, host timezone in brackets. */
export function dualTime(iso: string, displayTz?: string | null): string {
  const gulf = `${timeIn(iso, DUBAI)} GST`;
  const tz = displayTz && displayTz !== DUBAI ? displayTz : null;
  if (!tz) return gulf;
  const label = tz === "America/New_York" ? "ET" : tz === "Asia/Kolkata" ? "IST" : tz;
  return `${gulf} (${timeIn(iso, tz)} ${label})`;
}

export function durationLabel(mins?: number | null): string {
  if (!mins) return "";
  return mins % 60 === 0 ? `${mins / 60} hr` : `${mins} min`;
}

export function audienceLabel(a?: string | null): string {
  if (!a) return "All grades";
  const map: Record<string, string> = {
    junior: "Junior · Grades 5-8",
    senior: "Senior · Grades 9-12",
    parents: "Parents",
    schools: "Schools",
    all: "All grades",
    general: "General",
  };
  return map[a.toLowerCase()] ?? a;
}

export function isSoon(iso: string): boolean {
  const days = (new Date(iso).getTime() - Date.now()) / 86_400_000;
  return days >= 0 && days <= 10;
}
