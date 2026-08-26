import { Layers, MessageSquareQuote, Search, Users, X } from "lucide-react";

import { TRACKS } from "@/lib/programmes";
import type { TrackKey } from "@/lib/programmes";
import {
  FORMATS,
  FORMAT_ORDER,
  TESTIMONIAL_PROGRAMMES,
  VOICES,
  VOICE_ORDER,
  isDefaultTestimonialSearch,
} from "@/lib/testimonials";
import type { TestimonialSearch } from "@/lib/testimonials";

type Facets = {
  who: Record<string, number>;
  track: Record<string, number>;
  programme: Record<string, number>;
  format: Record<string, number>;
};

const TRACK_ORDER = Object.keys(TRACKS) as TrackKey[];

const fieldCls =
  "w-full appearance-none rounded-xl border border-line bg-paper px-3 py-2.5 pr-8 text-[0.86rem] font-semibold text-ink outline-none transition-colors focus-visible:border-gold";

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mono-label mb-1.5 flex items-center gap-1.5 text-ink-faint">
        <span aria-hidden className="text-gold">
          {icon}
        </span>
        {label}
      </span>
      {children}
    </label>
  );
}

export function TestimonialFilters({
  search,
  facets,
  total,
  onChange,
  onReset,
}: {
  search: TestimonialSearch;
  facets: Facets;
  total: number;
  onChange: (patch: Partial<TestimonialSearch>) => void;
  onReset: () => void;
}) {
  const chips: { label: string; clear: Partial<TestimonialSearch> }[] = [];
  if (search.who !== "all")
    chips.push({
      label: VOICES[search.who as keyof typeof VOICES]?.label ?? search.who,
      clear: { who: "all" },
    });
  if (search.track !== "all")
    chips.push({
      label: TRACKS[search.track as TrackKey]?.label ?? search.track,
      clear: { track: "all" },
    });
  if (search.programme !== "all")
    chips.push({ label: search.programme, clear: { programme: "all" } });
  if (search.format !== "all")
    chips.push({
      label: FORMATS[search.format as keyof typeof FORMATS]?.label ?? search.format,
      clear: { format: "all" },
    });
  if (search.q.trim())
    chips.push({ label: `"${search.q.trim()}"`, clear: { q: "" } });

  return (
    <div className="rounded-2xl border border-line bg-paper p-4 shadow-soft sm:p-5">
      {/* Who said it - the first question every parent asks. */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mono-label mr-1 text-ink-faint">Who said it</span>
        {(["all", ...VOICE_ORDER] as const).map((v) => {
          const on = search.who === v;
          const count = facets.who[v] ?? 0;
          return (
            <button
              key={v}
              type="button"
              onClick={() => onChange({ who: v })}
              aria-pressed={on}
              className={`rounded-full border px-3.5 py-1.5 text-[0.82rem] font-semibold transition-colors ${
                on
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-ink-soft hover:border-gold"
              }`}
            >
              {v === "all" ? "Everyone" : VOICES[v].label}
              <span className={on ? "ml-1.5 text-paper/60" : "ml-1.5 text-ink-faint"}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field icon={<Layers className="h-3.5 w-3.5" />} label="Interest">
          <select
            className={fieldCls}
            value={search.track}
            onChange={(e) => onChange({ track: e.target.value })}
          >
            <option value="all">All interests ({facets.track.all ?? 0})</option>
            {TRACK_ORDER.filter((t) => (facets.track[t] ?? 0) > 0).map((t) => (
              <option key={t} value={t}>
                {TRACKS[t].short} ({facets.track[t]})
              </option>
            ))}
          </select>
        </Field>

        <Field icon={<Users className="h-3.5 w-3.5" />} label="Programme">
          <select
            className={fieldCls}
            value={search.programme}
            onChange={(e) => onChange({ programme: e.target.value })}
          >
            <option value="all">All programmes ({facets.programme.all ?? 0})</option>
            {TESTIMONIAL_PROGRAMMES.filter(
              (p) => (facets.programme[p] ?? 0) > 0 || p === search.programme,
            ).map((p) => (
              <option key={p} value={p}>
                {p} ({facets.programme[p] ?? 0})
              </option>
            ))}
          </select>
        </Field>

        <Field
          icon={<MessageSquareQuote className="h-3.5 w-3.5" />}
          label="Format"
        >
          <select
            className={fieldCls}
            value={search.format}
            onChange={(e) => onChange({ format: e.target.value })}
          >
            <option value="all">All formats ({facets.format.all ?? 0})</option>
            {FORMAT_ORDER.filter((f) => (facets.format[f] ?? 0) > 0).map((f) => (
              <option key={f} value={f}>
                {FORMATS[f].label} ({facets.format[f]})
              </option>
            ))}
          </select>
        </Field>

        <Field icon={<Search className="h-3.5 w-3.5" />} label="Search">
          <input
            type="search"
            value={search.q}
            onChange={(e) => onChange({ q: e.target.value })}
            placeholder="Name, word, programme"
            className="w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-[0.86rem] text-ink outline-none transition-colors placeholder:text-ink-faint focus-visible:border-gold"
          />
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3.5">
        <span className="text-[0.86rem] font-semibold text-ink">
          {total} {total === 1 ? "testimonial" : "testimonials"}
        </span>
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => onChange(c.clear)}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-gold/10 px-3 py-1 text-[0.76rem] font-semibold text-ink-soft transition-colors hover:border-crimson hover:text-crimson"
          >
            {c.label}
            <X className="h-3 w-3" />
          </button>
        ))}
        {!isDefaultTestimonialSearch(search) ? (
          <button
            type="button"
            onClick={onReset}
            className="ml-auto text-[0.8rem] font-semibold text-crimson underline decoration-crimson/30 underline-offset-4"
          >
            Clear all
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default TestimonialFilters;
