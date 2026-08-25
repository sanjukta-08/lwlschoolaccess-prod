import { useEffect, useRef, useState } from "react";
import type { Cohort, Programme } from "@/lib/programmes";
import {
  downloadIcs,
  googleCalendarUrl,
  icsFileName,
  outlookCalendarUrl,
} from "@/lib/ics";

type Props = {
  p: Programme;
  c: Cohort;
  size?: "sm" | "md";
  className?: string;
};

/** Puts the cohort start + a decide-by reminder into the family's own calendar. */
export function AddToCalendar({ p, c, size = "sm", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item =
    "block w-full px-3 py-2 text-left text-[0.8rem] font-semibold text-ink-soft no-underline transition-colors hover:bg-wash hover:text-ink";

  return (
    <div ref={box} className={`relative z-[4] ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-label={`Add ${p.name} to your calendar`}
        className={`inline-flex items-center gap-1.5 rounded-xl border border-line bg-paper font-bold text-ink-soft transition-colors hover:border-ink-soft/50 hover:text-ink ${
          size === "sm" ? "px-2.5 py-1.5 text-[0.74rem]" : "px-4 py-2 text-[0.85rem]"
        }`}
      >
        <span aria-hidden>🗓</span>
        <span className={size === "sm" ? "hidden sm:inline" : ""}>Add to calendar</span>
      </button>

      {open ? (
        <div className="absolute right-0 z-[60] mt-1.5 w-[13.5rem] overflow-hidden rounded-xl border border-line bg-paper py-1 shadow-lift">
          <p className="px-3 pt-1 pb-1.5 font-mono text-[0.62rem] tracking-[0.08em] text-ink-faint uppercase">
            Start date + decide-by reminder
          </p>
          <a
            href={googleCalendarUrl(p, c)}
            target="_blank"
            rel="noopener"
            className={item}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Google Calendar
          </a>
          <a
            href={outlookCalendarUrl(p, c)}
            target="_blank"
            rel="noopener"
            className={item}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Outlook.com
          </a>
          <button
            type="button"
            className={item}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              downloadIcs([{ p, c }], icsFileName(p, c));
              setOpen(false);
            }}
          >
            Apple / other (.ics)
          </button>
        </div>
      ) : null}
    </div>
  );
}
