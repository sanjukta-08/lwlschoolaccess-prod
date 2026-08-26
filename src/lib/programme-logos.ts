import fd from "@/assets/logo-future-doctors.png.asset.json";
import finlit from "@/assets/logo-finlit.png.asset.json";
import luther from "@/assets/logo-sir-luther.png.asset.json";
import onward from "@/assets/logo-onward.png.asset.json";
import onwardWord from "@/assets/logo-onward-word.png.asset.json";
import lawyers from "@/assets/logo-future-lawyers.png.asset.json";
import yaleWla from "@/assets/logo-yale-wla.png.asset.json";
import sat from "@/assets/logo-sat.png.asset.json";
import type { TrackKey } from "@/lib/programmes";

const ONWARD_WORD = { src: onwardWord.url, alt: "ONWARD" };

export const PROGRAMME_LOGOS: Record<string, { src: string; alt: string }> = {
  fdf: { src: fd.url, alt: "Future Doctors" },
  jdf: { src: fd.url, alt: "Future Doctors" },
  finlit: { src: finlit.url, alt: "FINLiT AI" },
  irf: { src: luther.url, alt: "Sir Luther Center for Research & Innovation" },
  ail: { src: onward.url, alt: "ONWARD - Future AI Leaders Fellowship" },
  flf: { src: lawyers.url, alt: "Future Lawyers Fellowship" },
  ydf: { src: onward.url, alt: "ONWARD - Young Debaters" },
  ydp: { src: onward.url, alt: "ONWARD - Young Debaters" },
  wla: { src: yaleWla.url, alt: "Yale World Leaders Academy" },
  sat: { src: sat.url, alt: "SAT Instinct" },
};

// Programmes that should not display a brand logo at all.
export const NO_LOGO_IDS = new Set([
  "mun",
  "fmun",
  "wds",
  "huceg",
  "greenvan",
]);

// Pathway fallbacks: specific logos for medicine/finance/law/research; the AI
// Leaders fellowship keeps its own lockup, everything else uses the ONWARD wordmark.
export const TRACK_LOGOS: Partial<Record<TrackKey, { src: string; alt: string }>> = {
  med: { src: fd.url, alt: "Future Doctors" },
  fin: { src: finlit.url, alt: "FINLiT AI" },
  law: { src: lawyers.url, alt: "Future Lawyers Fellowship" },
  deb: { src: lawyers.url, alt: "Future Lawyers Fellowship" },
  res: { src: luther.url, alt: "Sir Luther Center for Research & Innovation" },
  ai: ONWARD_WORD,
  ent: ONWARD_WORD,
  lead: ONWARD_WORD,
  sat: ONWARD_WORD,
};

export const programmeLogo = (id: string) => PROGRAMME_LOGOS[id];

export const logoFor = (
  id: string,
  tracks: TrackKey[]
): { src: string; alt: string } | undefined => {
  if (NO_LOGO_IDS.has(id)) return undefined;
  return (
    PROGRAMME_LOGOS[id] ??
    tracks.map((t) => TRACK_LOGOS[t]).find(Boolean) ??
    ONWARD_WORD
  );
};
