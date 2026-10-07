import abuDhabi from "@/assets/conferences/hwmun-abu-dhabi.jpg.asset.json";
import bangkok from "@/assets/conferences/hwmun-bangkok.png.asset.json";
import cambodia from "@/assets/conferences/hwmun-cambodia.webp.asset.json";
import dubai from "@/assets/conferences/hwmun-dubai.webp.asset.json";
import greece from "@/assets/conferences/hwmun-greece.jpg.asset.json";
import india from "@/assets/conferences/hwmun-india.jpg.asset.json";
import indonesia from "@/assets/conferences/worldmun-indonesia.jpg.asset.json";
import kazakhstan from "@/assets/conferences/hwmun-kazakhstan.jpg.asset.json";
import vietnam from "@/assets/conferences/hwmun-vietnam.jpg.asset.json";
import fallback from "@/assets/conferences/banner.png.asset.json";
import type { Programme } from "./programmes";
import { conferenceSlugOf } from "./programme-slug";

const IMAGES: Record<string, string> = {
  "hwmun-abu-dhabi": abuDhabi.url,
  "hwmun-bangkok": bangkok.url,
  "hwmun-cambodia": cambodia.url,
  "hwmun-dubai": dubai.url,
  "hwmun-greece": greece.url,
  "hwmun-india": india.url,
  "hwmun-indonesia": indonesia.url,
  "hwmun-kazakhstan": kazakhstan.url,
  "hwmun-vietnam": vietnam.url,
};

export const conferenceImage = (conference: Programme) =>
  conference.coverImage ?? IMAGES[conferenceSlugOf(conference)] ?? fallback.url;

export const conferenceLocation = (conference: Programme) =>
  conference.location?.trim() || conference.name.replace(/^HWMUN\s*/i, "").trim();

export const conferenceDateLabel = (conference: Programme) => {
  const cohort = conference.cohorts[0];
  if (!cohort) return "Dates to be announced";
  const start = new Date(`${cohort.d}T00:00:00`);
  const end = cohort.end ? new Date(`${cohort.end}T00:00:00`) : null;
  const startLabel = start.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: end && end.getFullYear() === start.getFullYear() ? undefined : "numeric",
  });
  if (!end || cohort.end === cohort.d)
    return start.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return `${startLabel} – ${end.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
};

export const conferenceGrades = (conference: Programme) =>
  `Grades ${conference.g[0]}–${conference.g[1]}`;

export const conferencePrice = (conference: Programme) =>
  conference.feeE === "On request" ? "Fee on request" : conference.feeE;
