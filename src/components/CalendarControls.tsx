import { CalendarDays, Compass, Search, SlidersHorizontal } from "lucide-react";
import {
  TRACKS,
  TYPES,
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
  /** Hide the month/type grouping switch (the month-grid page has no grouping). */
  showGrouping?: boolean;
};

/** Labelled dropdown, same visual language as the finder filter bar. */
function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <span className="mono-label mb-1.5 inline-flex items-center gap-1.5 text-ink-faint">
        {icon ? <span className="text-ink-faint/70">{icon}</span> : null}
        {label}
      </span>
      {children}
    </div>
  );
}

function BoxSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  return (
    <span className="relative block">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-lg border border-line bg-wash px-3 py-2 pr-8 text-[0.85rem] font-semibold text-ink focus:border-crimson/40 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[0.65rem] text-ink-faint">
        ▾
      </span>
    </span>
  );
}

function Seg({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex gap-0.5 rounded-lg border border-line bg-wash p-1"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md px-3 py-1.5 text-[0.78rem] font-semibold whitespace-nowrap transition-colors ${
            value === o.value ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const shortMonth = (key: string) =>
  new Date(key + "-01T00:00:00").toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

export function CalendarControls({
  state,
  onChange,
  onReset,
  months,
  programmeCount,
  cohortCount,
  dirty,
  showGrouping = true,
}: Props) {
  const typeVals = ["all", ...TYPE_ORDER];
  const trackVals = ["all", ...Object.keys(TRACKS)];
  const typeN = facetCounts(state, "type", typeVals);
  const trackN = facetCounts(state, "interest", trackVals);
  const byMonth = state.calView !== "type";

  const interestOptions = trackVals.map((k) => ({
    value: k,
    label:
      k === "all"
        ? `Every subject (${trackN["all"] ?? 0})`
        : `${TRACKS[k as TrackKey].label} (${trackN[k] ?? 0})`,
  }));

  const typeOptions = typeVals.map((t) => ({
    value: t,
    label:
      t === "all"
        ? `Every format (${typeN["all"] ?? 0})`
        : `${TYPES[t as TypeKey].label} (${typeN[t] ?? 0})`,
  }));

  const monthOptions = [
    { value: "all", label: "Any month" },
    ...months.map((m) => ({
      value: m.key,
      label: `${shortMonth(m.key)} (${m.rows.length})`,
    })),
  ];

  // Active filters, each individually clearable.
  const chips: { label: string; clear: Partial<FinderSearch> }[] = [];
  if (state.q) chips.push({ label: `“${state.q}”`, clear: { q: "" } });
  if (state.interest !== "all")
    chips.push({
      label: TRACKS[state.interest as TrackKey]?.label ?? state.interest,
      clear: { interest: "all" },
    });
  if (state.type !== "all")
    chips.push({
      label: TYPES[state.type as TypeKey]?.label ?? state.type,
      clear: { type: "all" },
    });
  if (state.month !== "all")
    chips.push({ label: shortMonth(state.month), clear: { month: "all" } });
  if (state.status === "soon")
    chips.push({ label: "Starting soon", clear: { status: "all" } });

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto max-w-[1100px] px-5 py-4">
        {/* Row 1 — what you are looking at, and how it is grouped */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="mono-label inline-flex items-center gap-2 text-ink-faint">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter the calendar
          </span>
          {showGrouping ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="mono-label hidden text-ink-faint sm:inline">Group by</span>
              <Seg
                label="Group cohorts by"
                value={byMonth ? "month" : "type"}
                onChange={(v) => onChange({ calView: v })}
                options={[
                  { value: "month", label: "Month" },
                  { value: "type", label: "Programme type" },
                ]}
              />
            </div>
          ) : null}
        </div>

        {/* Row 2 — easy-pick category chips */}
        <div className="relative mt-3">
          <div className="flex gap-1.5 overflow-x-auto rounded-full border border-line bg-wash p-1.5 [scrollbar-width:none]">
            {typeVals.map((key) => {
              const pressed = state.type === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => onChange({ type: key })}
                  className={`shrink-0 rounded-full px-4 py-2 text-[0.82rem] font-semibold whitespace-nowrap transition-all ${
                    pressed
                      ? "bg-ink text-paper shadow-soft"
                      : "text-ink-soft hover:bg-paper hover:text-ink"
                  }`}
                >
                  {key === "all" ? "All" : TYPES[key as TypeKey].label}
                  <small
                    className={`ml-1.5 font-mono text-[0.7rem] font-medium ${
                      pressed ? "text-[#c7ccda]" : "text-ink-faint"
                    }`}
                  >
                    {typeN[key] ?? 0}
                  </small>
                </button>
              );
            })}
          </div>
          <span
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-paper/95 to-transparent sm:hidden"
            aria-hidden="true"
          />
        </div>

        {/* Row 3 — three plain dropdowns plus search, all labelled */}
        <div className="mt-3 grid gap-x-3 gap-y-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.4fr]">
          <Field label="Subject area" icon={<Compass className="h-3.5 w-3.5" />}>
            <BoxSelect
              label="Subject area"
              value={state.interest}
              onChange={(v) => onChange({ interest: v })}
              options={interestOptions}
            />
          </Field>
          <Field label="Starts in" icon={<CalendarDays className="h-3.5 w-3.5" />}>
            <BoxSelect
              label="Start month"
              value={state.month}
              onChange={(v) => onChange({ month: v })}
              options={monthOptions}
            />
          </Field>
          <Field label="Search" icon={<Search className="h-3.5 w-3.5" />}>
            <span className="relative block">
              <input
                type="search"
                value={state.q}
                onChange={(e) => onChange({ q: e.target.value })}
                aria-label="Search programmes"
                placeholder='Try "doctors", "Harvard", "research"'
                className="w-full rounded-lg border border-line bg-wash px-3 py-2 pr-8 text-[0.85rem] text-ink placeholder:text-ink-faint focus:border-crimson/40 focus:bg-paper focus:outline-none"
              />
              {state.q ? (
                <button
                  type="button"
                  onClick={() => onChange({ q: "" })}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-[0.8rem] text-ink-faint hover:text-crimson"
                >
                  ✕
                </button>
              ) : null}
            </span>
          </Field>
        </div>

        {/* Row 4 — count, quick "starting soon" toggle, active filters, reset */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.78rem] text-ink-soft">
              <strong className="text-[0.9rem] font-semibold text-crimson">
                {programmeCount}
              </strong>{" "}
              programmes · {cohortCount} cohorts
            </span>
            <Seg
              label="Start window"
              value={state.status === "soon" ? "soon" : "all"}
              onChange={(v) => onChange({ status: v })}
              options={[
                { value: "all", label: "All upcoming" },
                { value: "soon", label: "Starting soon" },
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => onChange(c.clear)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-[0.76rem] font-semibold text-ink-soft transition-colors hover:border-crimson/50 hover:text-crimson"
              >
                {c.label}
                <span aria-hidden>✕</span>
              </button>
            ))}
            {dirty ? (
              <button
                type="button"
                onClick={onReset}
                className="text-[0.78rem] font-semibold text-ink-faint underline underline-offset-[3px] hover:text-crimson"
              >
                Clear all
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
