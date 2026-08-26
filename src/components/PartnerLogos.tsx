import hpair from "@/assets/partners/hpair.png.asset.json";
import huso from "@/assets/partners/huso.png.asset.json";
import hcus from "@/assets/partners/hcus.webp.asset.json";
import hmc from "@/assets/partners/hmc.png.asset.json";
import hwcs from "@/assets/partners/hwcs.png.asset.json";
import sfls from "@/assets/partners/sfls.png.asset.json";
import yira from "@/assets/partners/yira.png.asset.json";

const LOGOS = [
  { url: hpair.url, alt: "HPAIR - Harvard College Project for Asian and International Relations" },
  { url: hmc.url, alt: "Harvard Model Congress" },
  { url: hcus.url, alt: "Harvard College Union Society" },
  { url: hwcs.url, alt: "Harvard Women in Computer Science" },
  { url: huso.url, alt: "HUSO - Harvard Undergraduate Science Olympiad" },
  { url: sfls.url, alt: "Stanford Financial Literacy Society" },
  { url: yira.url, alt: "Yale International Relations Association" },
];

export function PartnerLogos({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={`flex list-none flex-wrap items-center justify-center gap-x-9 gap-y-6 p-0 ${
        compact ? "" : "mt-7"
      }`}
    >
      {LOGOS.map((l) => (
        <li key={l.url} className="flex items-center">
          <img
            src={l.url}
            alt={l.alt}
            loading="lazy"
            decoding="async"
            className={`w-auto object-contain opacity-80 transition-opacity hover:opacity-100 ${
              compact ? "max-h-9" : "max-h-12 md:max-h-14"
            }`}
          />
        </li>
      ))}
    </ul>
  );
}
