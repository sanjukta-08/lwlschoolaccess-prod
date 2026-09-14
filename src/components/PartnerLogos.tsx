import hcus from "@/assets/partners/hcus.webp.asset.json";
import hmc from "@/assets/partners/hmc.png.asset.json";
import hpair from "@/assets/partners/hpair.png.asset.json";
import huso from "@/assets/partners/huso.png.asset.json";
import hwcs from "@/assets/partners/hwcs.png.asset.json";
import sfls from "@/assets/partners/sfls.png.asset.json";
import yira from "@/assets/partners/yira.png.asset.json";
import worldMun from "@/assets/partners/harvard-worldmun.png.asset.json";
import cambridge from "@/assets/partners/cambridge-entrepreneurship-centre.png.asset.json";
import yaleGlobalAffairs from "@/assets/partners/yale-global-affairs.png.asset.json";
import hugem from "@/assets/partners/hugem.png.asset.json";
import salamanca from "@/assets/partners/universidad-salamanca.jpg.asset.json";
import hsaTutoring from "@/assets/partners/harvard-student-agencies-tutoring.png.asset.json";
import onward from "@/assets/partners/onward-fellowship.png.asset.json";
import hackHarvard from "@/assets/partners/hack-harvard.svg.asset.json";
import harvard from "@/assets/partners/harvard-veritas.png.asset.json";

const LOGOS: Array<{ url: string; alt: string; shape?: "crest" | "wide"; size?: "default" | "large" }> = [
  { url: worldMun.url, alt: "Harvard World Model United Nations", shape: "crest" },
  { url: cambridge.url, alt: "University of Cambridge Judge Business School Entrepreneurship Centre", shape: "wide", size: "large" },
  { url: yaleGlobalAffairs.url, alt: "Yale Global Affairs World Leaders Academy", shape: "crest", size: "large" },
  { url: hugem.url, alt: "Harvard Undergraduate Global Education Movement", shape: "wide" },
  { url: salamanca.url, alt: "Universidad de Salamanca", shape: "wide" },
  { url: hsaTutoring.url, alt: "Harvard Student Agencies Tutoring", shape: "wide" },
  { url: onward.url, alt: "Onward Fellowship", shape: "crest", size: "large" },
  { url: hackHarvard.url, alt: "Hack Harvard", shape: "wide" },
  { url: harvard.url, alt: "Harvard University", shape: "wide" },
  { url: hmc.url, alt: "Harvard Model Congress", size: "large" },
  { url: hcus.url, alt: "Harvard College Union Society" },
  { url: hwcs.url, alt: "Harvard Women in Computer Science" },
  { url: hpair.url, alt: "Harvard Project for Asian and International Relations" },
  { url: huso.url, alt: "Harvard Undergraduate Science Olympiad" },
  { url: sfls.url, alt: "Stanford Financial Literacy Society" },
  { url: yira.url, alt: "Yale International Relations Association" },
];

export function PartnerLogos({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={`grid list-none grid-cols-2 items-center gap-x-3 gap-y-4 p-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ${
        compact ? "" : "mt-6"
      }`}
    >
      {LOGOS.map((l) => {
        const large = l.size === "large";
        return (
          <li key={l.url} className="flex h-16 items-center justify-center px-1">
            <img
              src={l.url}
              alt={l.alt}
              loading="lazy"
              decoding="async"
              className={`w-auto object-contain opacity-80 transition-opacity hover:opacity-100 ${
                l.shape === "crest"
                  ? large
                    ? compact
                      ? "max-h-20 max-w-28"
                      : "max-h-24 max-w-32"
                    : compact
                      ? "max-h-16 max-w-24"
                      : "max-h-[4.5rem] max-w-28"
                  : large
                    ? compact
                      ? "max-h-20 max-w-full"
                      : "max-h-24 max-w-full"
                    : compact
                      ? "max-h-14 max-w-full"
                      : "max-h-[4.5rem] max-w-full"
              }`}
            />
          </li>
        );
      })}
    </ul>
  );
}
