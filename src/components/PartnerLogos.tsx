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

const LOGOS: Array<{
  url: string;
  alt: string;
  shape?: "crest" | "wide";
  size?: "default" | "large";
}> = [
  // First line
  { url: hpair.url, alt: "Harvard Project for Asian and International Relations", size: "large" },
  { url: hcus.url, alt: "Harvard College Union Society" },
  { url: hwcs.url, alt: "Harvard Women in Computer Science" },
  { url: hmc.url, alt: "Harvard Model Congress", size: "large" },
  { url: huso.url, alt: "Harvard Undergraduate Science Olympiad" },
  // Second line
  {
    url: cambridge.url,
    alt: "University of Cambridge Judge Business School Entrepreneurship Centre",
    shape: "wide",
    size: "large",
  },
  {
    url: yaleGlobalAffairs.url,
    alt: "Yale Global Affairs World Leaders Academy",
    shape: "crest",
    size: "large",
  },
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

  const renderRow = (logos: typeof LOGOS, columns: 5 | 6, width: string) => (
    <ul
      className={`mx-auto grid w-full list-none grid-cols-2 items-center justify-items-center gap-x-3 gap-y-4 p-0 sm:grid-cols-3 ${
        columns === 6 ? "lg:grid-cols-6" : "lg:grid-cols-5"
      } ${width}`}
    >
      {logos.map((l) => {
        const large = l.size === "large";
        return (
          <li
            key={l.url}
            className="flex h-20 w-full min-w-0 items-center justify-center px-1 sm:h-24"
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
                      ? "max-h-[5.25rem]"
                      : "max-h-24"
                    : compact
                      ? "max-h-[4.5rem]"
                      : "max-h-[4.5rem]"
                  : large
                    ? compact
                      ? "max-h-[5.25rem]"
                      : "max-h-24"
                    : compact
                      ? "max-h-[4.25rem]"
                      : "max-h-[4.5rem]"
              }`}
            />
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={compact ? "space-y-2" : "mt-6 space-y-3"}>
      {renderRow(firstRow, 5, "max-w-[1060px]")}
      {renderRow(secondRow, 6, "max-w-[1180px]")}
      {renderRow(thirdRow, 5, "max-w-[960px]")}
    </div>
  );
}
