import { TRACKS, TYPES } from "@/lib/programmes";
import {
  gradeOptions,
  isDefaultSearch,
  monthOptions,
  typeCounts,
  type FinderSearch,
} from "@/lib/finder";

type Props = {
  state: FinderSearch;
  onChange: (patch: Partial<FinderSearch>) => void;
  onReset: () => void;
  resultCount: number;
  cohortCount: number;
};

export function FinderPanel({
  state,
  onChange,
  onReset,
  resultCount,
  cohortCount,
}: Props) {
  const typeKeys = ["all", ...Object.keys(TYPES)];
  const counts = typeCounts(state, typeKeys);

  return (
    <div className="rounded-3xl border border-line bg-paper p-[clamp(22px,4vw,34px)] shadow-lift">
      <p className="text-center font-serif text-[clamp(1.2rem,3.2vw,1.65rem)] leading-[2] font-medium">
        I&apos;m looking for something for{" "}
        <SentenceSelect
          value={state.grade}
          onChange={(v) => onChange({ grade: v })}
          options={gradeOptions()}
          label="Grade"
        />{" "}
        starting{" "}
        <SentenceSelect
          value={state.month}
          onChange={(v) => onChange({ month: v })}
          options={monthOptions()}
          label="Start month"
        />
        .
      </p>

      <div className="mt-5 flex justify-center">
        <label className="relative w-full max-w-[420px]">
          <span className="sr-only">Search programmes</span>
          <input
            type="search"
            value={state.q}
            onChange={(e) => onChange({ q: e.target.value })}
            placeholder="Search programmes, e.g. research, moot court, SAT"
            className="w-full rounded-full border border-line bg-wash py-3 pr-11 pl-11 text-[0.88rem] text-ink placeholder:text-ink-faint focus:border-crimson/40 focus:bg-paper focus:outline-none"
          />
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-faint">
            🔍
          </span>
          {state.q ? (
            <button
              type="button"
              onClick={() => onChange({ q: "" })}
              aria-label="Clear search"
              className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[0.9rem] text-ink-faint hover:text-crimson"
            >
              ✕
            </button>
          ) : null}
        </label>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="inline-flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-line bg-wash p-1 [scrollbar-width:none]">
          {typeKeys.map((key) => {
            const pressed = state.type === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={pressed}
                onClick={() => onChange({ type: key })}
                className={`rounded-full px-4 py-[7px] text-[0.8rem] font-semibold whitespace-nowrap transition-all ${
                  pressed
                    ? "bg-ink text-paper shadow-soft"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {key === "all" ? "All types" : TYPES[key as keyof typeof TYPES].label}
                <small
                  className={`ml-1.5 font-mono text-[0.68rem] font-medium ${
                    pressed ? "text-[#c7ccda]" : "text-ink-faint"
                  }`}
                >
                  {counts[key]}
                </small>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mono-label mt-5 mb-3.5 text-center text-ink-faint">
        And they&apos;re curious about
      </p>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        <Tile
          label="Everything"
          icon="✨"
          pressed={state.interest === "all"}
          onClick={() => onChange({ interest: "all" })}
        />
        {Object.entries(TRACKS).map(([key, t]) => (
          <Tile
            key={key}
            label={t.label}
            icon={t.ic}
            color={t.color}
            pressed={state.interest === key}
            onClick={() => onChange({ interest: key })}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
        <span className="font-mono text-[0.8rem] text-ink-soft">
          <strong className="text-[0.95rem] font-semibold text-crimson">
            {resultCount}
          </strong>{" "}
          options · {cohortCount} upcoming cohorts
        </span>
        {!isDefaultSearch(state) ? (
          <button
            type="button"
            onClick={onReset}
            className="text-[0.8rem] font-semibold text-ink-faint underline underline-offset-[3px] hover:text-crimson"
          >
            Clear all filters
          </button>
        ) : null}
      </div>
    </div>
  );
}

function SentenceSelect({
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
    <span className="relative mx-0.5 inline-block">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none border-none border-b-2 border-dotted border-crimson/50 bg-transparent pr-6 pb-0.5 pl-1.5 font-serif text-[length:inherit] font-semibold text-crimson italic hover:border-crimson focus:outline-none"
        style={{ borderBottomWidth: "2px", borderBottomStyle: "dotted" }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-[52%] text-[0.6em] text-crimson">
        ▾
      </span>
    </span>
  );
}

function Tile({
  label,
  icon,
  color,
  pressed,
  onClick,
}: {
  label: string;
  icon: string;
  color?: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      style={
        pressed
          ? { background: color ?? "var(--ink)", borderColor: color ?? "var(--ink)" }
          : undefined
      }
      className={`flex flex-col items-center gap-1.5 rounded-2xl border-[1.5px] border-transparent px-1.5 pt-3 pb-2.5 text-center text-[0.78rem] leading-tight font-semibold transition-all ${
        pressed
          ? "text-paper"
          : "bg-wash text-ink-soft hover:-translate-y-px hover:bg-wash-deep hover:text-ink"
      }`}
    >
      <span className="text-[1.35rem] leading-none">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
