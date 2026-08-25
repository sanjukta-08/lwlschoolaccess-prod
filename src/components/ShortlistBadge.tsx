import { Link } from "@tanstack/react-router";
import { useShortlist } from "@/lib/shortlist";

/** Header counter — makes the saved list visible on every page. */
export function ShortlistBadge({ className = "" }: { className?: string }) {
  const { items, ready } = useShortlist();
  const n = ready ? items.length : 0;

  return (
    <Link
      to="/shortlist"
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 no-underline transition-colors ${
        n
          ? "border-[1.5px] border-crimson/35 bg-crimson/8 text-crimson"
          : "text-ink-soft hover:text-ink"
      } ${className}`}
      activeProps={{ className: "text-ink" }}
    >
      <span aria-hidden>{n ? "♥" : "♡"}</span>
      <span>Saved{n ? ` ${n}` : ""}</span>
    </Link>
  );
}
