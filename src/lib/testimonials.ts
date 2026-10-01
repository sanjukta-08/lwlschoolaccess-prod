/**
 * One normalised feed of every piece of family feedback on the site -
 * written cohort feedback, LinkedIn posts, Instagram features, video clips and
 * handwritten notes - so the /testimonials page can filter across all of them.
 */
import { LEARNER_QUOTES, accentForQuote } from "@/lib/learner-testimonials";
import type { LearnerQuote } from "@/lib/learner-testimonials";
import { HANDWRITTEN_NOTES } from "@/lib/handwritten-notes";
import type { HandwrittenNote } from "@/lib/handwritten-notes";
import {
  APPROVED_INSTAGRAM,
  APPROVED_LINKEDIN,
  VIDEO_TESTIMONIALS,
} from "@/lib/social-proof";
import type { LinkedInStory, VideoTestimonial } from "@/lib/social-proof";
import { PROGRAMMES, TRACKS } from "@/lib/programmes";
import type { TrackKey } from "@/lib/programmes";

export type Voice = "student" | "parent";

export type Format = "written" | "linkedin" | "instagram" | "video" | "note";

export const FORMATS: Record<Format, { label: string; short: string }> = {
  written: { label: "Written feedback", short: "Written" },
  linkedin: { label: "LinkedIn posts", short: "LinkedIn" },
  instagram: { label: "Instagram features", short: "Instagram" },
  video: { label: "Video clips", short: "Video" },
  note: { label: "Handwritten notes", short: "Handwritten" },
};

export const FORMAT_ORDER: Format[] = [
  "written",
  "linkedin",
  "instagram",
  "video",
  "note",
];

type Base = {
  id: string;
  name: string;
  voice: Voice;
  /** Canonical programme label used by the programme filter. */
  programme: string;
  /** Programme label exactly as written on the source (may include a batch). */
  cohort: string;
  programmeId?: string;
  tracks: TrackKey[];
  /** Text used by the free-text search. */
  search: string;
  accent: string;
};

export type Testimonial =
  | (Base & { format: "written"; quote: LearnerQuote })
  | (Base & { format: "linkedin" | "instagram"; story: LinkedInStory })
  | (Base & { format: "video"; video: VideoTestimonial })
  | (Base & { format: "note"; note: HandwrittenNote });

/* ------------------------------------------------------------------ *
 * Source tagging
 * ------------------------------------------------------------------ */

/** Who wrote a social post or recorded a clip, keyed by its source id. */
const VOICE_BY_ID: Record<string, Voice> = {};

/** Catalogue programme a social post or clip belongs to, keyed by source id. */
const PROGRAMME_BY_ID: Record<string, string> = {
  "rouqaya-future-doctors": "Future Doctors Fellowship",
  "ledger-finance": "FinLit Fellowship (Capital Minds)",
  "hcus-mawhiba": "Advance Leadership Programme",
  "hcus-tedx": "Advance Leadership Programme",
  "cambridge-founder": "Future Entrepreneurs Fellowship",
  "anjsum-delegate": "Yale Global Affairs - World Leaders Academy",
  wistarani: "Research Publication Fellowship",
  arghyaditya: "Research Publication Fellowship",
  aws: "Research Publication Fellowship",
};

/** Programme label for a cohort that names a partner camp rather than a batch. */
const RESEARCH_SCHOLARS = "Research Scholars Program";

const CATALOGUE_NAMES = new Set(PROGRAMMES.map((p) => p.name));

const catalogueIdFor = (label: string) =>
  PROGRAMMES.find((p) => p.name === label)?.id;

const tracksFor = (label: string, fallback: TrackKey[]): TrackKey[] => {
  const p = PROGRAMMES.find((x) => x.name === label);
  return p ? p.tracks : fallback;
};

/** "Future Doctors, Batch 2" -> "Future Doctors" */
const baseLabel = (label: string) =>
  label
    .replace(/,?\s*(batch|cohort)\s*\d+\s*$/i, "")
    .replace(/\s*[-–]\s*$/, "")
    .trim();

/** Catalogue name for a feedback-sheet label, when one matches. */
const canonicalProgramme = (label: string, programmeId?: string): string => {
  const byId = programmeId
    ? PROGRAMMES.find((p) => p.id === programmeId)?.name
    : undefined;
  if (byId) return byId;
  const base = baseLabel(label);
  if (CATALOGUE_NAMES.has(base)) return base;
  const loose = PROGRAMMES.find(
    (p) =>
      p.name.toLowerCase().startsWith(base.toLowerCase()) ||
      base.toLowerCase().startsWith(p.name.toLowerCase()),
  );
  return loose ? loose.name : base;
};

const TRACK_FALLBACK: TrackKey[] = ["lead"];

/* ------------------------------------------------------------------ *
 * Normalisation
 * ------------------------------------------------------------------ */

function fromQuote(q: LearnerQuote, i: number): Testimonial {
  const programme = canonicalProgramme(q.programme, q.programmeId);
  return {
    format: "written",
    id: `q-${i}`,
    name: q.name,
    voice: q.role === "Parent" ? "parent" : "student",
    programme,
    cohort: q.programme,
    ...(catalogueIdFor(programme) ? { programmeId: catalogueIdFor(programme)! } : {}),
    tracks: tracksFor(programme, TRACK_FALLBACK),
    search: [q.quote, q.more ?? "", q.name, q.programme, programme].join(" "),
    accent: accentForQuote(q),
    quote: q,
  };
}

function fromStory(s: LinkedInStory): Testimonial {
  const programme = PROGRAMME_BY_ID[s.id] ?? baseLabel(s.when);
  const id = catalogueIdFor(programme);
  return {
    format: s.source,
    id: `s-${s.id}`,
    name: s.name,
    voice: VOICE_BY_ID[s.id] ?? "student",
    programme,
    cohort: s.when,
    ...(id ? { programmeId: id } : {}),
    tracks: s.tags.length ? s.tags : tracksFor(programme, TRACK_FALLBACK),
    search: [s.text, s.name, s.role, s.when, programme].join(" "),
    accent: s.tags[0] ?? "crimson",
    story: s,
  };
}

function fromVideo(v: VideoTestimonial): Testimonial {
  const programme = PROGRAMME_BY_ID[v.id] ?? baseLabel(v.cohort);
  const id = catalogueIdFor(programme);
  return {
    format: "video",
    id: `v-${v.id}`,
    name: v.name,
    voice: VOICE_BY_ID[v.id] ?? "student",
    programme,
    cohort: v.cohort,
    ...(id ? { programmeId: id } : {}),
    tracks: v.tags.length ? v.tags : tracksFor(programme, TRACK_FALLBACK),
    search: [v.name, v.cohort, programme].join(" "),
    accent: v.tags[0] ?? "gold",
    video: v,
  };
}

function fromNote(n: HandwrittenNote): Testimonial {
  const id = catalogueIdFor(n.programme);
  return {
    format: "note",
    id: n.id,
    name: n.name,
    voice: "student",
    programme: n.programme,
    cohort: n.programme,
    ...(id ? { programmeId: id } : {}),
    tracks: n.tracks,
    search: [n.quote, n.transcript, n.name, n.programme].join(" "),
    accent: n.tracks[0] ?? "gold",
    note: n,
  };
}

/**
 * Every testimonial on the site, interleaved so the grid mixes formats.
 *
 * Built lazily: the programme catalogue is hydrated by the root loader at
 * runtime, so deriving this at module-evaluation time would tag every quote
 * with the fallback track instead of its real pathway. Recomputed whenever the
 * catalogue size changes.
 */
let cache: Testimonial[] | null = null;
let cacheKey = -1;

export function allTestimonials(): Testimonial[] {
  if (cache && cacheKey === PROGRAMMES.length) return cache;

  const written = LEARNER_QUOTES.map(fromQuote);
  const linkedin = APPROVED_LINKEDIN.map(fromStory);
  const instagram = APPROVED_INSTAGRAM.map(fromStory);
  const videos = VIDEO_TESTIMONIALS.map(fromVideo);
  const notes = HANDWRITTEN_NOTES.map(fromNote);

  // Round-robin so the default view shows a mix rather than 65 written cards.
  const buckets = [linkedin, videos, written, instagram, notes];
  const out: Testimonial[] = [];
  const max = Math.max(...buckets.map((b) => b.length));
  for (let i = 0; i < max; i += 1) {
    for (const b of buckets) {
      const item = b[i];
      if (item) out.push(item);
    }
  }

  cache = out;
  cacheKey = PROGRAMMES.length;
  return out;
}

export const testimonialTotal = () => allTestimonials().length;


/* ------------------------------------------------------------------ *
 * Filtering
 * ------------------------------------------------------------------ */

export type TestimonialSearch = {
  track: string;
  programme: string;
  format: string;
  q: string;
};

export const DEFAULT_TESTIMONIAL_SEARCH: TestimonialSearch = {
  track: "all",
  programme: "all",
  format: "all",
  q: "",
};

const isFormat = (v: string): v is Format => v in FORMATS;
const isTrack = (v: string): v is TrackKey => v in TRACKS;

export function isDefaultTestimonialSearch(s: TestimonialSearch) {
  return (
    s.track === "all" &&
    s.programme === "all" &&
    s.format === "all" &&
    s.q.trim() === ""
  );
}

export function filterTestimonials(
  s: TestimonialSearch,
  list: Testimonial[] = allTestimonials(),
): Testimonial[] {
  const q = s.q.trim().toLowerCase();
  return list.filter((t) => {
    if (isTrack(s.track) && !t.tracks.includes(s.track)) return false;
    if (s.programme !== "all" && t.programme !== s.programme) return false;
    if (isFormat(s.format) && t.format !== s.format) return false;
    if (q && !t.search.toLowerCase().includes(q)) return false;
    return true;
  });
}

/** Counts for one facet, computed with every *other* filter still applied. */
function countsFor(
  s: TestimonialSearch,
  key: keyof TestimonialSearch,
  valuesOf: (t: Testimonial) => string[],
) {
  const base = filterTestimonials({ ...s, [key]: "all" });
  const out: Record<string, number> = { all: base.length };
  for (const t of base) {
    for (const v of valuesOf(t)) out[v] = (out[v] ?? 0) + 1;
  }
  return out;
}

export function testimonialFacets(s: TestimonialSearch) {
  return {
    track: countsFor(s, "track", (t) => t.tracks),
    programme: countsFor(s, "programme", (t) => [t.programme]),
    format: countsFor(s, "format", (t) => [t.format]),
  };
}

/** Programme labels that actually have feedback, alphabetically. */
export const testimonialProgrammes = (): string[] =>
  [...new Set(allTestimonials().map((t) => t.programme))].sort((a, b) =>
    a.localeCompare(b),
  );

export const RESEARCH_SCHOLARS_LABEL = RESEARCH_SCHOLARS;

/** Grouped written feedback, cohort by cohort, for the browse-by-programme block. */
export function byProgramme(list: Testimonial[]) {
  const groups = new Map<string, Testimonial[]>();
  for (const t of list) {
    const arr = groups.get(t.programme);
    if (arr) arr.push(t);
    else groups.set(t.programme, [t]);
  }
  return [...groups.entries()]
    .map(([programme, items]) => ({ programme, items }))
    .sort((a, b) => b.items.length - a.items.length);
}
