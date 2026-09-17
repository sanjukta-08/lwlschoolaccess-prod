// Slug helpers kept in their own module so pages that only need a link do not
// pull in the full landing-page copy from programme-detail.ts.
import { PROGRAMMES, type Programme } from "./programmes";

export const slugOf = (p: Programme) =>
  p.name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const programmeBySlug = (slug: string): Programme | undefined =>
  PROGRAMMES.find((p) => slugOf(p) === slug);

export const conferenceSlugOf = (p: Programme) => p.paySlug ?? p.id;

export const conferenceBySlug = (slug: string): Programme | undefined =>
  PROGRAMMES.find((p) => p.type === "conf" && conferenceSlugOf(p) === slug);

export const programmePath = (p: Programme) => `/programmes/${slugOf(p)}` as const;
