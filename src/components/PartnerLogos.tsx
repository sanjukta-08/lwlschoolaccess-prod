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
  // First line
  { url: hpair.url, alt: "Harvard Project for Asian and International Relations", size: "large" },
  { url: hcus.url, alt: "Harvard College Union Society" },
  { url: hwcs.url, alt: "Harvard Women in Computer Science" },
  { url: hmc.url, alt: "Harvard Model Congress", size: "large" },
  { url: huso.url, alt: "Harvard Undergraduate Science Olympiad" },
  // Second line
  { url: cambridge.url, alt: "University of Cambridge Judge Business School Entrepreneurship Centre", shape: "wide", size: "large" },
  { url: yaleGlobalAffairs.url, alt: "Yale Global Affairs World Leaders Academy", shape: "crest", size: "large" },
  { url: onward.url, alt: "Onward Fellowship", shape: "crest", size: "large" },
  { url: harvard.url, alt: "Harvard University", shape: "wide" },
  { url: worldMun.url, alt: "Harvard World Model United Nations", shape: "crest" },
  { url: salamanca.url, alt: "Universidad de Salamanca", shape: "wide" },
  // Third line (centered)
  { url: hugem.url, alt: "Harvard Undergraduate Global Education Movement", shape: "wide" },
  { url: hsaTutoring.url, alt: "Harvard Student Agencies Tutoring", shape: "wide" },
  { url: hackHarvard.url, alt: "Hack Harvard", shape: "wide" },
  { url: sfls.url, alt: "Stanford Financial Literacy Society" },
  { url: yira.url, alt: "Yale International Relations Association" },
];

export function PartnerLogos({ compact = false }: { compact?: boolean }) {
  const firstRow = LOGOS.slice(0, 5);
  const secondRow = LOGOS.slice(5, 11);
  const thirdRow = LOGOS.slice(11, 16);

  const renderRow = (logos: typeof LOGOS, centered = false) => (
    <ul
      className={`flex list-none flex-wrap items-center ${
        centered ? "justify-center" : "justify-center sm:justify-start"
      } gap-x-4 gap-y-5 p-0`}
    >
      {logos.map((l) => {
        const large = l.size === "large";
        return (
          <li
            key={l.url}
            className={`flex items-center justify-center ${
              centered ? "px-3" : "px-2"
            }`}
            style={{ flex: "0 0 auto", minWidth: centered ? "140px" : "120px" }}
          >
            <img
              src={l.url}
              alt={l.alt}
              loading="lazy"
              decoding="async"
              className={`h-auto w-auto max-w-full object-contain ${
                l.shape === "crest"
                  ? large
                    ? compact
                      ? "max-h-20"
                      : "max-h-24"
                    : compact
                      ? "max-h-16"
                      : "max-h-[4.5rem]"
                  : large
                    ? compact
                      ? "max-h-20"
                      : "max-h-24"
                    : compact
                      ? "max-h-14"
                      : "max-h-[4.5rem]"
              }`}
            />
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={compact ? "" : "mt-6 space-y-5"}>
      {renderRow(firstRow)}
      {renderRow(secondRow)}
      {renderRow(thirdRow, true)}
    </div>
  );
}
