import fd from "@/assets/logo-future-doctors.png.asset.json";
import finlit from "@/assets/logo-finlit.png.asset.json";
import luther from "@/assets/logo-sir-luther.png.asset.json";
import onward from "@/assets/logo-onward.png.asset.json";
import lawyers from "@/assets/logo-future-lawyers.png.asset.json";
import type { TrackKey } from "@/lib/programmes";

export const PROGRAMME_LOGOS: Record<string, { src: string; alt: string }> = {
  fdf: { src: fd.url, alt: "Future Doctors" },
  finlit: { src: finlit.url, alt: "FINLiT AI" },
  irf: { src: luther.url, alt: "Sir Luther Center for Research & Innovation" },
  ail: { src: onward.url, alt: "ONWARD - Future AI Leaders Fellowship" },
  flf: { src: lawyers.url, alt: "Future Lawyers Fellowship" },
};

// Pathway fallbacks: medicine, finance, law, research.
export const TRACK_LOGOS: Partial<Record<TrackKey, { src: string; alt: string }>> = {
  med: { src: fd.url, alt: "Future Doctors" },
  fin: { src: finlit.url, alt: "FINLiT AI" },
  law: { src: lawyers.url, alt: "Future Lawyers Fellowship" },
  deb: { src: lawyers.url, alt: "Future Lawyers Fellowship" },
  res: { src: luther.url, alt: "Sir Luther Center for Research & Innovation" },
  ai: { src: onward.url, alt: "ONWARD - Future AI Leaders Fellowship" },
};

export const programmeLogo = (id: string) => PROGRAMME_LOGOS[id];

export const logoFor = (id: string, tracks: TrackKey[]) =>
  PROGRAMME_LOGOS[id] ?? tracks.map((t) => TRACK_LOGOS[t]).find(Boolean);
