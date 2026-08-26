import fd from "@/assets/logo-future-doctors.asset.json";
import finlit from "@/assets/logo-finlit.asset.json";
import luther from "@/assets/logo-sir-luther.asset.json";
import onward from "@/assets/logo-onward.asset.json";

export const PROGRAMME_LOGOS: Record<string, { src: string; alt: string }> = {
  fdf: { src: fd.url, alt: "Future Doctors" },
  finlit: { src: finlit.url, alt: "FINLiT AI" },
  irf: { src: luther.url, alt: "Sir Luther Center for Research & Innovation" },
  ail: { src: onward.url, alt: "ONWARD - Future AI Leaders Fellowship" },
};

export const programmeLogo = (id: string) => PROGRAMME_LOGOS[id];
