import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { downloadIcs } from "@/lib/ics";
import { resolveSaved, useShortlist } from "@/lib/shortlist";

/**
 * Slim inline nudge (no modal) that appears once a family has saved a couple of
 * cohorts: put the dates in the calendar, or open the full list.
 */
export function SavedStrip({ minimum = 2 }: { minimum?: number }) {
  const { items, ready } = useShortlist();
  const rows = useMemo(() => resolveSaved(items), [items]);

  if (!ready || rows.length < minimum) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-crimson/25 bg-crimson/6 px-4 py-3">
      <span className="text-[0.86rem] text-ink-soft">
        <b className="text-ink">
          {rows.length} programme{rows.length === 1 ? "" : "s"} saved
        </b>{" "}
        — put the start dates in your family calendar so nothing slips.
      </span>
      <span className="ml-auto flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => downloadIcs(rows, "lwl-my-dates.ics")}
          className="rounded-xl bg-crimson px-3.5 py-1.5 text-[0.78rem] font-bold text-paper transition-[filter] hover:brightness-110"
        >
          🗓 Add all dates
        </button>
        <Link
          to="/shortlist"
          className="rounded-xl border-[1.5px] border-line bg-paper px-3.5 py-1.5 text-[0.78rem] font-bold text-ink-soft no-underline hover:text-ink"
        >
          See my list
        </Link>
      </span>
    </div>
  );
}
