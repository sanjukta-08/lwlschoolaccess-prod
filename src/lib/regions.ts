import type { Programme } from "./programmes";

/**
 * Every cohort runs live online, so "location" for a family really means:
 * does the live session land at a civil hour where we live? Session times are
 * published in US Eastern; each region below is an offset from ET.
 */
export type RegionKey = "gulf" | "india" | "seasia" | "uk" | "us";

export const REGIONS: Record<
  RegionKey,
  { label: string; short: string; offset: number; note: string }
> = {
  gulf: { label: "Gulf (UAE, Saudi, Qatar)", short: "Gulf", offset: 8, note: "GMT+4" },
  india: { label: "India & Sri Lanka", short: "India", offset: 9.5, note: "GMT+5:30" },
  seasia: {
    label: "Singapore, Malaysia, Hong Kong",
    short: "SE Asia",
    offset: 12,
    note: "GMT+8",
  },
  uk: { label: "UK, Ireland & Europe", short: "UK / Europe", offset: 5, note: "GMT+1" },
  us: { label: "US & Canada", short: "US / Canada", offset: 0, note: "ET" },
};

export const REGION_ORDER: RegionKey[] = ["gulf", "india", "seasia", "uk", "us"];

/** First clock time in the published (US Eastern) session string, in hours. */
const etStartHour = (time: string): number | null => {
  const m = time.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!m) return null;
  const h12 = parseInt(m[1]!, 10) % 12;
  const mins = m[2] ? parseInt(m[2], 10) : 0;
  const pm = m[3]!.toUpperCase() === "PM";
  return h12 + (pm ? 12 : 0) + mins / 60;
};

/** Local start hour for a region, 0–24. */
export const localStartHour = (p: Programme, region: RegionKey): number | null => {
  const et = etStartHour(p.time);
  if (et === null) return null;
  return (et + REGIONS[region].offset) % 24;
};

/** Sessions your child can realistically attend: 7am–10pm local. */
export const fitsRegion = (p: Programme, region: string): boolean => {
  if (region === "all" || !(region in REGIONS)) return true;
  const h = localStartHour(p, region as RegionKey);
  if (h === null) return true; // self-paced / unscheduled - joinable anywhere
  return h >= 7 && h <= 22;
};

const fmt = (h: number) => {
  const hh = Math.floor(h) % 24;
  const mm = Math.round((h - Math.floor(h)) * 60);
  const ap = hh >= 12 ? "PM" : "AM";
  return `${hh % 12 || 12}:${String(mm).padStart(2, "0")} ${ap}`;
};

/** "5:00 PM GMT+4" for the chosen region, or null if there's no fixed time. */
export const regionTimeLabel = (p: Programme, region: string): string | null => {
  if (region === "all" || !(region in REGIONS)) return null;
  const h = localStartHour(p, region as RegionKey);
  if (h === null) return null;
  return `${fmt(h)} ${REGIONS[region as RegionKey].note}`;
};

export const regionOptions = () => [
  { value: "all", label: "anywhere in the world" },
  ...REGION_ORDER.map((k) => ({ value: k, label: REGIONS[k].label })),
];

export const regionLabel = (region: string) =>
  region in REGIONS ? REGIONS[region as RegionKey].label : "anywhere in the world";
