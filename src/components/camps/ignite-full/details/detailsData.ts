import { CalendarDays, Users, MapPin, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface DetailItem {
  icon: LucideIcon;
  label: string;
  highlight: string;
  sub?: string;
}

export const details: DetailItem[] = [
  { icon: CalendarDays, label: "Dates", highlight: "18–24 July 2027" },
  { icon: Users, label: "Eligibility", highlight: "Ages 15–18" },
  { icon: MapPin, label: "Venue", highlight: "Cambridge Judge Business School", sub: "University of Cambridge, Trumpington Street, UK" },
  { icon: Award, label: "Recognition", highlight: "Certificate of Attendance", sub: "From the Entrepreneurship Centre at Cambridge Judge Business School" },
];

export const feeIncludes = [
  "Academic fee",
  "Accommodation & meals – 6 nights at Clare College",
  "Airport pickup & drop-off",
  "Interactive teaching sessions",
  "Immersive workshops",
  "Engaging presentations",
  "Group work with facilitators",
  "Extra-curricular activities",
  "Guest speaker & career-focused sessions",
  "Programme materials & branded merchandise",
];

export const feeExcludes = ["Travel tickets / airfare", "Visa costs", "Personal expenses"];

export const FEE = "£4,500";
export const DEADLINE = "Applications reviewed on a rolling basis";
export const APPLY_URL = "https://apply.learnwithleaders.com/apply/cambridge-ignite";
