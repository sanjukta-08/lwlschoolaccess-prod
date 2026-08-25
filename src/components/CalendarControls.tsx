import {
  TRACKS,
  TYPES,
  TYPE_IC,
  TYPE_ORDER,
  type TrackKey,
  type TypeKey,
} from "@/lib/programmes";
import { facetCounts, type FinderSearch, type MonthGroup } from "@/lib/finder";

type Props = {
  state: FinderSearch;
  onChange: (patch: Partial<FinderSearch>) => void;
  onReset: () => void;
  months: MonthGroup[];
  programmeCount: number;
  cohortCount: number;
  dirty: boolean;
};

function Pill({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number | undefined;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.8rem] font-semibold whitespace-nowrap transition-colors ${
        active ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
      }`}
    >
      {children}
      {count !== undefined ? (
        <small
          className={`font-mono text-[0.68rem] ${active ? "text-paper/70" : "text-ink-faint"}`}
        >
          {count}
        </small>
      ) : null}
    </button>
  );
}

export function CalendarControls({
  state,
  onChange,
  onReset,
  months,
  programmeCount,
  cohortCount,
  dirty,
}: Props) {
  const typeVals = ["all", ...TYPE_ORDER];
  const trackVals = ["all", ...Object.keys(TRACKS)];
  const typeN = facetCounts(state, "type", typeVals);
  const trackN = facetCounts(state, "interest", trackVals);
  const byMonth = state.calView !== "type";

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto max-w-[1100px] space-y-2.5 px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            role="group"
            aria-label="View"
            className="inline-flex gap-0.5 rounded-full border border-line bg-wash p-1"
          >
            <Pill active={byMonth} onClick={() => onChange({ calView: "month" })}>
              📅 By month
            </Pill>
            <Pill active={!byMonth} onClick={() => onChange({ calView: "type" })}>
              🗂 By type
            </Pill>
          </div>

          <input
            type="search"
            value={state.q}
            onChange={(e) => onChange({ q: e.target.value })}
            aria-label="Search programmes"
            placeholder='Search — try "doctors", "Harvard", "research"…'
            className="min-w-[200px] flex-1 rounded-full border border-line bg-wash px-4 py-2 text-[0.85rem] text-ink placeholder:text-ink-faint focus:border-crimson/40 focus:bg-paper focus:outline-none"
          />

          <div
            role="group"
            aria-label="Status"
            className="inline-flex gap-0.5 rounded-full border border-line bg-wash p-1"
          >
            <Pill active={state.status !== "soon"} onClick={() => onChange({ status: "all" })}>
              All upcoming
            </Pill>
            <Pill active={state.status === "soon"} onClick={() => onChange({ status: "soon" })}>
              Starting soon
            </Pill>
          </div>
        </div>

        <div
          role="group"
          aria-label="Programme type"
          className="flex flex-wrap items-center gap-1 rounded-2xl border border-line bg-wash p-1"
        >
          {typeVals.map((t) => (
            <Pill
              key={t}
              active={state.type === t}
              onClick={() => onChange({ type: t })}
              count={typeN[t]}
            >
              {t === "all"
                ? "All types"
                : `${TYPE_IC[t as TypeKey]} ${TYPES[t as TypeKey].label}`}
            </Pill>
          ))}
        </div>

        <div role="group" aria-label="Interest" className="flex flex-wrap gap-1.5">
          {trackVals.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={state.interest === k}
              onClick={() => onChange({ interest: k })}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.78rem] font-semibold transition-colors ${
                state.interest === k
                  ? "border-crimson bg-crimson/8 text-crimson"
                  : "border-line bg-paper text-ink-soft hover:border-ink-soft hover:text-ink"
              }`}
            >
              {k === "all"
                ? "✨ Everything"
                : `${TRACKS[k as TrackKey].ic} ${TRACKS[k as TrackKey].label}`}
              <small className="font-mono text-[0.66rem] text-ink-faint">{trackN[k]}</small>
            </button>
          ))}
        </div>

        {byMonth && months.length ? (
          <div
            aria-label="Jump to month"
            className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {months.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => jump(`m-${m.key}`)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-[0.75rem] font-semibold text-ink-soft hover:border-ink-soft hover:text-ink"
              >
                {new Date(m.key + "-01T00:00:00").toLocaleDateString("en-GB", {
                  month: "short",
                })}{" "}
                ’{m.key.slice(2, 4)}
                <small className="font-mono text-[0.66rem] text-ink-faint">
                  {m.rows.length}
                </small>
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[0.76rem] text-ink-soft">
            <strong className="text-ink">{programmeCount}</strong> programmes ·{" "}
            {cohortCount} cohorts match
          </span>
          {dirty ? (
            <button
              type="button"
              onClick={onReset}
              className="text-[0.78rem] font-semibold text-ink-faint underline underline-offset-[3px] hover:text-crimson"
            >
              Clear all filters
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
