import { TRACKS, TYPES, type TrackKey } from "@/lib/programmes";
import { ALL_TRACKS_ICON, TrackIcon } from "@/lib/track-icons";
import {
  durationOptions,
  gradeOptions,
  isDefaultSearch,
  monthOptions,
  typeCounts,
  type FinderSearch,
} from "@/lib/finder";

import { regionOptions } from "@/lib/regions";
import { DEFAULT_FIT } from "@/lib/fit";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Clock,
  Compass,
  Globe,
  GraduationCap,
  Search,
} from "lucide-react";


type Props = {
  state: FinderSearch;
  onChange: (patch: Partial<FinderSearch>) => void;
  onReset: () => void;
  resultCount: number;
  cohortCount: number;
  /** "panel" = original wide card, "rail" = narrow vertical sidebar, "bar" = horizontal dropdown bar */
  layout?: "panel" | "rail" | "bar";
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
      <span className="sr-only">Search programs</span>
      <input
        type="search"
        value={state.q}
        onChange={(e) => onChange({ q: e.target.value })}
        placeholder="Search: research, moot court, SAT…"
        className="w-full rounded-full border border-line bg-wash py-2.5 pr-9 pl-10 text-[0.85rem] text-ink placeholder:text-ink-faint focus:border-crimson/40 focus:bg-paper focus:outline-none"
      />
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-faint">
        <Search className="h-4 w-4" />
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

  if (layout === "bar") {
    const typeOptions = [
      { value: "all", label: "Any type" },
      ...Object.entries(TYPES).map(([key, t]) => ({ value: key, label: t.label })),
    ];

    return (
      <div className="rounded-2xl border border-line bg-paper p-4 shadow-soft sm:p-5">
        <div className="grid grid-cols-2 items-end gap-x-4 gap-y-3 md:grid-cols-3 lg:grid-cols-7">
          <div className="min-w-0">
            <Field label="Grade" icon={<GraduationCap className="h-3.5 w-3.5" />}>
              <BoxSelect
                value={state.grade}
                onChange={(v) => onChange({ grade: v })}
                options={gradeOptions()}
                label="Grade"
              />
            </Field>
          </div>
          <div className="min-w-0">
            <Field label="Starting" icon={<CalendarDays className="h-3.5 w-3.5" />}>
              <BoxSelect
                value={state.month}
                onChange={(v) => onChange({ month: v })}
                options={monthOptions()}
                label="Start month"
              />
            </Field>
          </div>
          <div className="min-w-0">
            <Field label="Length" icon={<Clock className="h-3.5 w-3.5" />}>
              <BoxSelect
                value={state.duration}
                onChange={(v) => onChange({ duration: v })}
                options={durationOptions()}
                label="Programme length"
              />
            </Field>
          </div>
          <div className="min-w-0">
            <Field label="Where you are" icon={<Globe className="h-3.5 w-3.5" />}>
              <BoxSelect
                value={state.region}
                onChange={(v) => onChange({ region: v })}
                options={regionOptions()}
                label="Location"
              />
            </Field>
          </div>
          <div className="min-w-0">
            <Field label="Type" icon={<Compass className="h-3.5 w-3.5" />}>
              <BoxSelect
                value={state.type}
                onChange={(v) => onChange({ type: v })}
                options={typeOptions}
                label="Programme type"
              />
            </Field>
          </div>
          <div className="col-span-2 min-w-0 md:col-span-3 lg:col-span-2">
            <Field label="Search" icon={<Search className="h-3.5 w-3.5" />}>
              {search}
            </Field>
          </div>
        </div>


        <div className="mt-3.5 border-t border-line pt-3">{counter}</div>
      </div>
    );
  }


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
            <Field label="Subject">
              <div className="flex flex-col gap-0.5">
                <TrackRow
                  label="All subjects"
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

          <div className="px-4 py-4">
            <Field label="Format">
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
                          ? "All formats"
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

          <div className="px-4 py-3.5">{counter}</div>
        </div>
      </div>
    );
  }


  return (
    <div className="rounded-3xl border border-line bg-paper p-[clamp(22px,4vw,34px)] shadow-lift">
      <p className="text-center font-serif text-[clamp(1.2rem,3.2vw,1.65rem)] leading-[2] font-medium">
        I&apos;m looking for something in{" "}
        <SentenceSelect
          value={state.interest}
          onChange={(v) => onChange({ interest: v })}
          options={[
            { value: "all", label: "any subject" },
            ...Object.entries(TRACKS).map(([key, t]) => ({ value: key, label: t.label })),
          ]}
          label="Interest"
        />{" "}
        for{" "}
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

      <p className="mono-label mt-5 mb-3.5 text-center text-ink-faint">
        Pick a subject
      </p>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        <Tile
          label="Everything"
          pressed={state.interest === "all"}
          onClick={() => onChange({ interest: "all" })}
        />
        {Object.entries(TRACKS).map(([key, t]) => (
          <Tile
            key={key}
            label={t.label}
            track={key as TrackKey}
            color={t.color}
            pressed={state.interest === key}
            onClick={() => onChange({ interest: key })}
          />
        ))}
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

      <div className="mt-5">{counter}</div>
    </div>
  );
}

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
    <div>
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
    <span className="relative block w-full min-w-0">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 cursor-pointer appearance-none overflow-hidden rounded-lg border border-line bg-wash px-3 py-2 pr-8 text-[0.85rem] font-semibold text-ellipsis whitespace-nowrap text-ink focus:border-crimson/40 focus:outline-none"

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

function TrackRow({
  label,
  track,
  color,
  pressed,
  onClick,
}: {
  label: string;
  track?: TrackKey;
  color?: string;
  pressed: boolean;
  onClick: () => void;
}) {
  const Icon = ALL_TRACKS_ICON;
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left text-[0.8rem] font-semibold transition-colors ${
        pressed ? "bg-ink text-paper" : "text-ink-soft hover:bg-wash hover:text-ink"
      }`}
    >
      <span
        className="flex-none"
        aria-hidden
        style={pressed ? undefined : { color: color ?? "var(--ink-faint)" }}
      >
        {track ? (
          <TrackIcon track={track} className="h-[0.95rem] w-[0.95rem]" />
        ) : (
          <Icon className="h-[0.95rem] w-[0.95rem]" strokeWidth={1.75} />
        )}
      </span>
      <span className="truncate">{label}</span>
    </button>
  );
}

function Tile({
  label,
  track,
  color,
  pressed,
  onClick,
}: {
  label: string;
  track?: TrackKey;
  color?: string;
  pressed: boolean;
  onClick: () => void;
}) {
  const Icon = ALL_TRACKS_ICON;
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
      className={`flex flex-col items-center gap-1.5 rounded-xl border-[1.5px] border-transparent px-1.5 pt-3 pb-2.5 text-center text-[0.78rem] leading-tight font-semibold transition-all ${
        pressed
          ? "text-paper"
          : "bg-wash text-ink-soft hover:-translate-y-px hover:bg-wash-deep hover:text-ink"
      }`}
    >
      <span aria-hidden style={pressed ? undefined : { color }}>
        {track ? (
          <TrackIcon track={track} className="h-[1.15rem] w-[1.15rem]" />
        ) : (
          <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
        )}
      </span>
      <span>{label}</span>
    </button>
  );
}
