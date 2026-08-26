import { Layers, MessageSquareQuote, Search, Users, X } from "lucide-react";

import { TRACKS } from "@/lib/programmes";
import type { TrackKey } from "@/lib/programmes";
import {
  FORMATS,
  FORMAT_ORDER,
  TESTIMONIAL_PROGRAMMES,
  isDefaultTestimonialSearch,
} from "@/lib/testimonials";
import type { TestimonialSearch } from "@/lib/testimonials";

type Facets = {
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
  onChange,
  onReset,
}: {
  search: TestimonialSearch;
  facets: Facets;
  onChange: (patch: Partial<TestimonialSearch>) => void;
  onReset: () => void;
}) {
  const chips: { label: string; clear: Partial<TestimonialSearch> }[] = [];
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

  const showFooter = chips.length > 0 || !isDefaultTestimonialSearch(search);

  return (
    <div className="rounded-2xl border border-line bg-paper p-3.5 shadow-soft sm:p-4">
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <Field icon={<Layers className="h-3.5 w-3.5" />} label="Interest">
          <select
            className={fieldCls}
            value={search.track}
            onChange={(e) => onChange({ track: e.target.value })}
          >
            <option value="all">All interests</option>
            {TRACK_ORDER.filter((t) => (facets.track[t] ?? 0) > 0).map((t) => (
              <option key={t} value={t}>
                {TRACKS[t].short}
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
            <option value="all">All programmes</option>
            {TESTIMONIAL_PROGRAMMES.filter(
              (p) => (facets.programme[p] ?? 0) > 0 || p === search.programme,
            ).map((p) => (
              <option key={p} value={p}>
                {p}
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
            <option value="all">All formats</option>
            {FORMAT_ORDER.filter((f) => (facets.format[f] ?? 0) > 0).map((f) => (
              <option key={f} value={f}>
                {FORMATS[f].label}
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

      {showFooter ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-2.5">
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
      ) : null}
    </div>
  );
}

export default TestimonialFilters;
