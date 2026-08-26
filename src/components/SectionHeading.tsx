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
        className="font-serif text-[clamp(1.6rem,3.8vw,2.2rem)] leading-[1.15] font-medium tracking-tight"
      >
        {children}
      </h2>
      {sub ? (
        <p
          className={`mt-2.5 max-w-[54em] text-[0.92rem] text-ink-soft ${
            centred ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
