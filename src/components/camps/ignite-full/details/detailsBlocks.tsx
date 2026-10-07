import { Check, X } from "lucide-react";
import { details, feeIncludes, feeExcludes, FEE, DEADLINE, APPLY_URL } from "./detailsData";

export const ApplyButton = ({
  className = "",
  variant = "white",
  applyUrl = APPLY_URL,
}: {
  className?: string;
  variant?: "white" | "rust";
  applyUrl?: string | undefined;
}) => (
  <a
    href={applyUrl}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-block text-center py-3.5 px-8 font-body font-bold text-xs uppercase tracking-[0.15em] rounded-sm transition ${
      variant === "white"
        ? "bg-white text-cambridge-rust hover:bg-cambridge-cream"
        : "bg-cambridge-rust text-white hover:bg-cambridge-rust/90"
    } ${className}`}
  >
    Apply Now
  </a>
);

export const FeeBlock = ({
  tone = "rust",
  applyUrl,
}: {
  tone?: "rust" | "dark" | "white";
  applyUrl?: string | undefined;
}) => {
  const styles = {
    rust: "bg-cambridge-rust text-white",
    dark: "bg-foreground text-white",
    white: "bg-white text-foreground",
  }[tone];
  const muted = tone === "white" ? "text-foreground/50" : "text-white/60";
  const accent = tone === "white" ? "text-cambridge-rust" : "text-white";

  return (
    <div className={`${styles} p-8 md:p-10 rounded-sm`}>
      <p className={`text-[10px] uppercase tracking-[0.4em] font-body font-bold mb-2 ${muted}`}>Programme Fee</p>
      <p className={`text-5xl md:text-6xl font-display font-bold leading-none ${accent}`}>{FEE}</p>
      <p className={`text-base font-body mt-2 ${muted}`}>per student</p>
      <div className={`h-px my-5 ${tone === "white" ? "bg-foreground/10" : "bg-white/15"}`} />
      <p className={`text-[10px] uppercase tracking-[0.3em] font-body font-bold mb-1.5 ${muted}`}>Deadline</p>
      <p className={`text-2xl md:text-3xl font-display font-bold ${accent}`}>{DEADLINE}</p>
      <ApplyButton className="w-full mt-7" variant={tone === "white" ? "rust" : "white"} applyUrl={applyUrl} />
    </div>
  );
};

export const DetailsGrid = ({ tone = "light", cols = 2 }: { tone?: "light" | "dark"; cols?: 2 | 4 }) => {
  const labelColor = tone === "dark" ? "text-white/55" : "text-cambridge-rust";
  const highlightColor = tone === "dark" ? "text-white" : "text-foreground";
  const subColor = tone === "dark" ? "text-white/55" : "text-foreground/50";
  const iconColor = tone === "dark" ? "text-cambridge-cream" : "text-cambridge-rust";

  return (
    <div className={`grid ${cols === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"} gap-5`}>
      {details.map((d) => {
        const Icon = d.icon;
        return (
          <div key={d.label}>
            <Icon size={26} className={`${iconColor} mb-3`} strokeWidth={1.5} />
            <p className={`text-[10px] uppercase tracking-[0.3em] font-body font-bold ${labelColor} mb-1.5`}>{d.label}</p>
            <p className={`text-base md:text-lg font-display font-bold leading-snug ${highlightColor}`}>{d.highlight}</p>
            {d.sub && <p className={`text-xs font-body leading-relaxed mt-1 ${subColor}`}>{d.sub}</p>}
          </div>
        );
      })}
    </div>
  );
};

export const IncludesBlock = ({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) => {
  const text = tone === "dark" ? "text-white" : "text-foreground";
  const muted = tone === "dark" ? "text-white/55" : "text-foreground/55";
  const border = tone === "dark" ? "border-white/10" : "border-foreground/8";
  const accent = "text-cambridge-rust";

  return (
    <div>
      <p className={`text-[10px] tracking-[0.3em] uppercase font-body font-bold ${accent} mb-4`}>What's Included</p>
      <div className={`grid ${compact ? "grid-cols-1" : "sm:grid-cols-2"} gap-x-6 gap-y-1.5`}>
        {feeIncludes.map((item) => (
          <div key={item} className={`flex items-start gap-2 py-1 text-sm font-body ${text}`}>
            <Check size={14} className={`${accent} mt-1 shrink-0`} strokeWidth={2.5} />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className={`mt-5 pt-4 border-t ${border}`}>
        <p className={`text-[10px] tracking-[0.3em] uppercase font-body font-semibold ${muted} mb-2`}>Not Included</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
          {feeExcludes.map((item) => (
            <div key={item} className={`flex items-center gap-1.5 text-xs font-body ${muted}`}>
              <X size={11} className={accent} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
