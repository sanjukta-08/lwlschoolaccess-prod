/**
 * Single source of truth for sub-brand identity across the catalogue.
 *
 * Every programme belongs to exactly one brand. A brand has ONE logo file and
 * ONE display name — used identically on finder cards, trending rails and the
 * programme landing pages. Never introduce a second lockup for a brand here.
 */
import fd from "@/assets/logo-future-doctors.png.asset.json";
import finlit from "@/assets/logo-finlit.png.asset.json";
import luther from "@/assets/logo-sir-luther.png.asset.json";
import onwardWord from "@/assets/logo-onward-word.png.asset.json";
import lawyers from "@/assets/logo-future-lawyers.png.asset.json";
import yaleWla from "@/assets/logo-yale-wla.png.asset.json";
import yaleIr from "@/assets/logo-yale-ir.png.asset.json";
import hmc from "@/assets/logo-hmc.png.asset.json";
import sat from "@/assets/logo-sat.png.asset.json";
import type { TrackKey } from "@/lib/programmes";

export type BrandKey =
  "onward" | "doctors" | "finlit" | "luther" | "lawyers" | "yaleWla" | "yaleIra" | "hmc" | "sat";

export type Brand = { key: BrandKey; name: string; src: string; alt: string };

const brand = (key: BrandKey, name: string, src: string): Brand => ({
  key,
  name,
  src,
  alt: name,
});

export const BRANDS: Record<BrandKey, Brand> = {
  /** The Onward wordmark is the only Onward asset in use anywhere on the site. */
  onward: brand("onward", "ONWARD", onwardWord.url),
  doctors: brand("doctors", "Future Doctors", fd.url),
  finlit: brand("finlit", "FINLiT AI", finlit.url),
  luther: brand("luther", "Sir Luther Center for Research & Innovation", luther.url),
  lawyers: brand("lawyers", "Future Lawyers Fellowship", lawyers.url),
  yaleWla: brand("yaleWla", "Yale World Leaders Academy", yaleWla.url),
  yaleIra: brand("yaleIra", "Yale International Relations Association", yaleIr.url),
  hmc: brand("hmc", "Harvard Model Congress", hmc.url),
  sat: brand("sat", "SAT Instinct", sat.url),
};

/** Programme id -> brand. */
const PROGRAMME_BRANDS: Record<string, BrandKey> = {
  fdf: "doctors",
  jdf: "doctors",
  finlit: "finlit",
  rpf: "luther",
  yrp: "luther",
  ail: "onward",
  ydf: "onward",
  flf: "lawyers",
  wla: "yaleWla",
  yire: "yaleIra",
  hmcl: "hmc",
  sat: "sat",
};

// Programmes that should not display a brand logo at all.
export const NO_LOGO_IDS = new Set(["mun", "fmun", "wds", "huceg", "greenvan"]);

/** Pathway fallback when a programme is not explicitly mapped above. */
const TRACK_BRANDS: Partial<Record<TrackKey, BrandKey>> = {
  med: "doctors",
  fin: "finlit",
  law: "lawyers",
  res: "luther",
  ai: "onward",
  lead: "onward",
  sat: "onward",
};

export const brandFor = (id: string, tracks: TrackKey[] = []): Brand | undefined => {
  if (NO_LOGO_IDS.has(id)) return undefined;
  const key = PROGRAMME_BRANDS[id] ?? tracks.map((t) => TRACK_BRANDS[t]).find(Boolean) ?? "onward";
  return BRANDS[key];
};

export const PROGRAMME_LOGOS: Record<string, { src: string; alt: string }> = Object.fromEntries(
  Object.entries(PROGRAMME_BRANDS).map(([id, key]) => [
    id,
    { src: BRANDS[key].src, alt: BRANDS[key].alt },
  ]),
);

export const programmeLogo = (id: string) => PROGRAMME_LOGOS[id];

export const logoFor = (
  id: string,
  tracks: TrackKey[],
): { src: string; alt: string } | undefined => {
  const b = brandFor(id, tracks);
  return b ? { src: b.src, alt: b.alt } : undefined;
};
