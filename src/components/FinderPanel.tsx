import { TRACKS, TYPES } from "@/lib/programmes";
import {
  gradeOptions,
  isDefaultSearch,
  monthOptions,
  typeCounts,
  type FinderSearch,
} from "@/lib/finder";
import { regionOptions } from "@/lib/regions";
import { DEFAULT_FIT } from "@/lib/fit";
import { Link } from "@tanstack/react-router";

type Props = {
  state: FinderSearch;
  onChange: (patch: Partial<FinderSearch>) => void;
  onReset: () => void;
  resultCount: number;
  cohortCount: number;
  /** "panel" = original wide card, "rail" = narrow vertical sidebar */
  layout?: "panel" | "rail";
};

export function FinderPanel({
  state,
  onChange,
  onReset,
  resultCount,
  cohortCount,
  layout = "panel",
}: Props) {
  const typeKeys = ["all", ...Object.keys(TYPES)];
  const counts = typeCounts(state, typeKeys);

  const search = (
    <label className="relative block w-full">
      <span className="sr-only">Search programmes</span>
      <input
        type="search"
        value={state.q}
        onChange={(e) => onChange({ q: e.target.value })}
        placeholder="Search: research, moot court, SAT…"
        className="w-full rounded-full border border-line bg-wash py-2.5 pr-9 pl-9 text-[0.85rem] text-ink placeholder:text-ink-faint focus:border-crimson/40 focus:bg-paper focus:outline-none"
      />
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[0.85rem] text-ink-faint">
        ⌕
      </span>
      {state.q ? (
        <button
          type="button"
          onClick={() => onChange({ q: "" })}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-[0.85rem] text-ink-faint hover:text-crimson"
        >
          ✕
        </button>
      ) : null}
    </label>
  );

  const counter = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="font-mono text-[0.78rem] text-ink-soft">
        <strong className="text-[0.92rem] font-semibold text-crimson">
          {resultCount}
        </strong>{" "}
        options · {cohortCount} cohorts
      </span>
      {!isDefaultSearch(state) ? (
        <button
          type="button"
          onClick={onReset}
          className="text-[0.78rem] font-semibold text-ink-faint underline underline-offset-[3px] hover:text-crimson"
        >
          Clear all
        </button>
      ) : null}
    </div>
  );

  if (layout === "rail") {
    return (
      <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
        <Link
          to="/fit"
          search={DEFAULT_FIT}
          className="block border-b border-line bg-gold/8 px-4 py-3 no-underline transition-colors hover:bg-gold/14"
        >
          <b className="block text-[0.85rem] font-bold text-ink">
            Not sure where to start?
          </b>
          <small className="block text-[0.75rem] text-ink-soft">
            Answer 5 questions → 3 matched programmes
          </small>
        </Link>

        <div className="px-4 py-4">{search}</div>

        <div className="divide-y divide-line border-t border-line">
          <div className="px-4 py-4">
            <Field label="Grade">
              <BoxSelect
                value={state.grade}
                onChange={(v) => onChange({ grade: v })}
                options={gradeOptions()}
                label="Grade"
              />
            </Field>
          </div>

          <div className="px-4 py-4">
            <Field label="Starting">
              <BoxSelect
                value={state.month}
                onChange={(v) => onChange({ month: v })}
                options={monthOptions()}
                label="Start month"
              />
            </Field>
          </div>

          <div className="px-4 py-4">
            <Field label="Where you are">
              <BoxSelect
                value={state.region}
                onChange={(v) => onChange({ region: v })}
                options={regionOptions()}
                label="Location"
              />
              <p className="mt-1.5 text-[0.71rem] leading-snug text-ink-faint">
                Live online - we only show cohorts that meet at a sensible local hour.
              </p>
            </Field>
          </div>

          <div className="px-4 py-4">
            <Field label="Type">
              <div className="flex flex-col gap-0.5">
                {typeKeys.map((key) => {
                  const pressed = state.type === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => onChange({ type: key })}
                      className={`flex items-center justify-between rounded-lg px-2.5 py-[7px] text-left text-[0.8rem] font-semibold transition-colors ${
                        pressed
                          ? "bg-ink text-paper"
                          : "text-ink-soft hover:bg-wash hover:text-ink"
                      }`}
                    >
                      <span>
                        {key === "all"
                          ? "All types"
                          : TYPES[key as keyof typeof TYPES].label}
                      </span>
                      <small
                        className={`font-mono text-[0.68rem] font-medium ${
                          pressed ? "text-[#c7ccda]" : "text-ink-faint"
                        }`}
                      >
                        {counts[key]}
                      </small>
                    </button>
                  );
                })}
              </div>
            </Field>
          </div>

          <div className="px-4 py-4">
            <Field label="Curious about">
              <div className="flex flex-col gap-0.5">
                <TrackRow
                  label="All interests"
                  pressed={state.interest === "all"}
                  onClick={() => onChange({ interest: "all" })}
                />
                {Object.entries(TRACKS).map(([key, t]) => (
                  <TrackRow
                    key={key}
                    label={t.label}
                    track={key as TrackKey}
                    color={t.color}
                    pressed={state.interest === key}
                    onClick={() => onChange({ interest: key })}
                  />
                ))}
              </div>
            </Field>
          </div>

          <div className="px-4 py-3.5">{counter}</div>
        </div>
      </div>
    );
  }


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
        , joinable from{" "}
        <SentenceSelect
          value={state.region}
          onChange={(v) => onChange({ region: v })}
          options={regionOptions()}
          label="Location"
        />
        .
      </p>

      <div className="mt-5 flex justify-center">
        <div className="w-full max-w-[420px]">{search}</div>
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

      <div className="mt-5">{counter}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mono-label mb-1.5 block text-ink-faint">{label}</span>
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
  dense = false,
  onClick,
}: {
  label: string;
  icon: string;
  color?: string;
  pressed: boolean;
  dense?: boolean;
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
      className={`flex flex-col items-center gap-1 rounded-xl border-[1.5px] border-transparent text-center leading-tight font-semibold transition-all ${
        dense ? "px-1 pt-2 pb-1.5 text-[0.7rem]" : "px-1.5 pt-3 pb-2.5 text-[0.78rem]"
      } ${
        pressed
          ? "text-paper"
          : "bg-wash text-ink-soft hover:-translate-y-px hover:bg-wash-deep hover:text-ink"
      }`}
    >
      <span className={dense ? "text-[1.05rem] leading-none" : "text-[1.35rem] leading-none"}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
