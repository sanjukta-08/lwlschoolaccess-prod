import { useShortlist } from "@/lib/shortlist";
import type { Cohort, Programme } from "@/lib/programmes";

type Props = {
  p: Programme;
  c: Cohort;
  /** "icon" for cards and rows, "wide" for the landing page / sticky bar. */
  variant?: "icon" | "wide";
  className?: string;
};

/**
 * "Save for later" - the low-commitment action for a student who is not ready
 * to apply. Lives above card link overlays, so it stops propagation.
 */
export function SaveButton({ p, c, variant = "icon", className = "" }: Props) {
  const { has, toggle, ready } = useShortlist();
  const saved = ready && has(p.id, c.d);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(p.id, c.d);
  };

  if (variant === "wide") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        className={`relative z-[3] inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-crimson px-4 py-2 text-[0.85rem] font-bold text-crimson ${
          saved ? "bg-crimson/10" : "bg-paper"
        } ${className}`}
      >
        <span aria-hidden>{saved ? "♥" : "♡"}</span>
        {saved ? "Saved - see my list" : "Save & remind me"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${p.name} from saved` : `Save ${p.name} for later`}
      title={saved ? "Saved - in your list" : "Save for later"}
      className={`relative z-[3] inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line bg-paper text-[0.95rem] leading-none transition-colors ${
        saved
          ? "border-crimson/45 bg-crimson/8 text-crimson"
          : "text-ink-faint hover:border-crimson/40 hover:text-crimson"
      } ${className}`}
    >
      <span aria-hidden>{saved ? "♥" : "♡"}</span>
    </button>
  );
}
