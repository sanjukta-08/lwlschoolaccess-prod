import type { ReactNode } from "react";
import { WingMark } from "@/components/WingMark";

export function SectionHeading({
  eyebrow,
  children,
  sub,
  align = "center",
  id,
}: {
  eyebrow?: string;
  children: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  id?: string;
}) {
  const centred = align === "center";
  return (
    <div className={centred ? "text-center" : ""}>
      {eyebrow ? (
        <span
          className={`mono-label mb-3 inline-flex items-center gap-2 text-gold ${
            centred ? "" : ""
          }`}
        >
          <WingMark size={14} />
          {eyebrow}
        </span>
      ) : null}
      <h2
        id={id}
        className="font-display text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.02] font-extrabold tracking-tight text-balance"
      >
        {children}
      </h2>
      {sub ? (
        <p
          className={`mt-1 max-w-[54em] pb-3 text-[0.92rem] leading-relaxed text-ink-soft ${
            centred ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
