// Programme catalogue for Learn with Leaders. Static data, rendered on the server.
// Source of truth: "Online Programs - Filter Categories" (18 programmes, 7 interest
// categories, one category per programme).

export type TrackKey =
  | "med"
  | "law"
  | "fin"
  | "ai"
  | "res"
  | "lead"
  | "sat";
export type TypeKey = "fel" | "prog" | "comp" | "conf";
export type MentorKey = "harvard" | "hpair" | "yale" | "ivy";
export type Fee = { e: string; r: string | null };

export type Cohort = {
  d: string;
  /** Final day for multi-day events such as conferences and camps. */
  end?: string;
  g?: [number, number];
  fee?: Fee;
  /** Batch / cohort label as published in the master calendar. */
  label?: string;
  /** Session timing for this cohort when it differs from the programme default. */
  time?: string;
  /** Eligibility line for this cohort when it differs from the programme default. */
  elig?: string;
  flyer?: string;
  brochure?: string;
  /** Application deadline from the shared cohort calendar, when published. */
  deadline?: string;
  /** Seats remaining, when the cohort publishes a capacity. */
  seatsLeft?: number;
};

export type Programme = {
  id: string;
  name: string;
  type: TypeKey;
  /** Exactly one interest category, kept as an array for card/tag rendering. */
  tracks: TrackKey[];
  /** Mentor university group, used by the mentor filter and credential line. */
  mentor: MentorKey;
  g: [number, number];
  tag: string;
  about: string;
  dur: string;
  time: string;
  feeE: string;
  feeR: string | null;
  badge?: string;
  site: string;
  apply: string;
  /** Stable catalogue identifier used by dedicated experience routes. */
  paySlug?: string;
  /** Live catalogue facts used by in-person programme experiences. */
  location?: string;
  format?: string;
  coverImage?: string;
  categories?: string[];
  cohorts: Cohort[];
};

export const TRACKS: Record<TrackKey, { label: string; short: string; ic: string; color: string }> = {
  med: { label: "Medicine & Healthcare", short: "Medicine", ic: "🩺", color: "var(--track-med)" },
  law: {
    label: "Law, Debate & Communication",
    short: "Law & Debate",
    ic: "⚖️",
    color: "var(--track-law)",
  },
  fin: { label: "Finance & Investing", short: "Finance", ic: "📈", color: "var(--track-fin)" },
  ai: {
    label: "AI, Technology & Entrepreneurship",
    short: "AI & Entrepreneurship",
    ic: "🤖",
    color: "var(--track-ai)",
  },
  res: {
    label: "Research & Academic Writing",
    short: "Research",
    ic: "🔬",
    color: "var(--track-res)",
  },
  lead: {
    label: "Leadership & Global Affairs",
    short: "Leadership",
    ic: "🌍",
    color: "var(--track-lead)",
  },
  sat: {
    label: "Test Prep & College Readiness",
    short: "Test Prep",
    ic: "✏️",
    color: "var(--track-sat)",
  },
};

export const MENTORS: Record<MentorKey, { label: string; short: string }> = {
  harvard: { label: "Harvard mentors", short: "Harvard" },
  hpair: { label: "Harvard × HPAIR", short: "Harvard × HPAIR" },
  yale: { label: "Yale mentors", short: "Yale" },
  ivy: {
    label: "Harvard, MIT, Stanford, Yale & Princeton mentors",
    short: "MIT / Stanford / Princeton",
  },
};

export const MENTOR_ORDER: MentorKey[] = ["harvard", "hpair", "yale", "ivy"];

export const TYPES: Record<TypeKey, { label: string }> = {
  fel: { label: "Fellowships" },
  prog: { label: "Programmes" },
  comp: { label: "Competitions" },
  conf: { label: "Conferences" },
};

export const TYPE_NAME: Record<TypeKey, string> = {
  fel: "Fellowship",
  prog: "Programme",
  comp: "Competition",
  conf: "Conference",
};

/**
 * The catalogue is served from the shared database (all_programs / all_cohorts,
 * plus our own lwl_site editorial rows) and hydrated into this array by the
 * root route loader before anything renders. Nothing here is hardcoded.
 */
export const PROGRAMMES: Programme[] = [];

/** Replace the catalogue in place so existing synchronous readers stay valid. */
export const setCatalogue = (list: Programme[]) => {
  PROGRAMMES.length = 0;
  PROGRAMMES.push(...list);
};

/* ---------- helpers ---------- */

export const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const parseISO = (iso: string) => new Date(iso + "T00:00:00");

export const isPast = (iso: string) => parseISO(iso) < startOfToday();

export const isSoon = (iso: string) => {
  const diff = (parseISO(iso).getTime() - startOfToday().getTime()) / 86400000;
  return diff >= 0 && diff <= 45;
};

export const fmtLong = (iso: string) =>
  parseISO(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const fmtShort = (iso: string) =>
  parseISO(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export const cohortGrades = (p: Programme, c?: Cohort): [number, number] =>
  (c && c.g) || p.g;

export const feeOf = (p: Programme, c?: Cohort): Fee =>
  c && c.fee ? c.fee : { e: p.feeE, r: p.feeR };

/** Session timing for a cohort, falling back to the programme default. */
export const timeOf = (p: Programme, c?: Cohort): string => (c && c.time) || p.time;

export const mentorLabel = (p: Programme) => MENTORS[p.mentor].short;

/** Duration buckets used by the finder's secondary filter. */
export type DurationKey = "d3we" | "d6w" | "d8w" | "d1012w";

export const DURATIONS: Record<DurationKey, string> = {
  d3we: "3-Weekend Intensive",
  d6w: "6 Weeks",
  d8w: "8 Weeks",
  d1012w: "10–12 Weeks",
};

export const DURATION_ORDER: DurationKey[] = ["d3we", "d6w", "d8w", "d1012w"];

export const durationKey = (p: Programme): DurationKey => {
  const d = p.dur.toLowerCase();
  if (d.includes("weekend")) return "d3we";
  if (d.includes("6 week")) return "d6w";
  if (d.includes("8 week") || d.includes("8 saturdays")) return "d8w";
  return "d1012w";
};

/** Programmes with past cohorts removed (empty programmes dropped). */
export const upcomingProgrammes = (): Programme[] =>
  PROGRAMMES.map((p) => ({ ...p, cohorts: p.cohorts.filter((c) => !isPast(c.d)) }))
    .filter((p) => p.cohorts.length > 0);

/**
 * Sessions are published in US Eastern. Most families reading this are in the
 * Gulf, so show Dubai time (GMT+4, ET + 8h) first with the original alongside.
 */
export const dualTime = (str: string): string => {
  if (!/AM|PM/i.test(str)) return str;
  const spread = str.replace(
    /(\d{1,2}(?::\d{2})?)\s*[–-]\s*(\d{1,2}(?::\d{2})?)\s*(AM|PM)/gi,
    "$1 $3–$2 $3",
  );
  const conv = spread
    .replace(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/gi, (_m, h, mm, ap) => {
      let H = (parseInt(h, 10) % 12) + (String(ap).toUpperCase() === "PM" ? 12 : 0);
      H = (H + 8) % 24;
      const ap2 = H >= 12 ? "PM" : "AM";
      const h2 = H % 12 || 12;
      return `${h2}${mm ? ":" + mm : ":00"} ${ap2}`;
    })
    .replace(/\b(EDT|EST|ET)\b/g, "GMT+4");
  return `${/GMT\+4/.test(conv) ? conv : conv + " GMT+4"} (${str})`;
};

/** Dubai-only rendering of a session time, for tight one-line meta rows. */
export const shortTime = (str: string): string => {
  const dual = dualTime(str);
  const cut = dual.indexOf(" (");
  const local = (cut > -1 ? dual.slice(0, cut) : dual).trim();
  const first = local.match(/\d{1,2}:\d{2}\s*(?:AM|PM)/i);
  return first ? `${first[0]} GMT+4` : local;
};

/** One-line explainer under each category heading. */
export const TYPE_BLURB: Record<TypeKey, string> = {
  fel: "Mentor-led cohorts ending in a capstone or defence",
  prog: "Short live courses that build one specific skill",
  comp: "Judged challenges with awards and rankings",
  conf: "In-person global affairs conferences for student delegates",
};

export const TYPE_ORDER: TypeKey[] = ["fel", "prog", "comp", "conf"];

/** Live count of upcoming batches across the catalogue. */
export const totalCohorts = () => PROGRAMMES.reduce((n, p) => n + p.cohorts.length, 0);

export const TYPE_IC: Record<TypeKey, string> = {
  fel: "🎓",
  prog: "📚",
  comp: "🏆",
  conf: "🌐",
};

/** Editorially chosen flagships - the five a parent should look at first. */
export const TRENDING: { id: string; why: string }[] = [
  { id: "fdf", why: "The most asked-about pathway for future medics - clinical cases, live mentors, capstone." },
  { id: "ail", why: "Build and ship a real AI product; the fastest-moving skill on any application." },
  { id: "flf", why: "Moot court and legal reasoning - ideal first step for a law-curious teenager." },
  { id: "rpf", why: "Ivy League mentors and a published, citable research paper in eight weeks." },
  { id: "finlit", why: "Investing, valuation and fraud detection - finance fluency that lasts." },
];

/** Grade-band pathway for profile building. */
export type Outcome = {
  title: string;
  body: string;
  /** Optional programme that produces this outcome. */
  id?: string;
  /** Optional finder type filter to jump to. */
  type?: TypeKey;
  /** Optional finder interest filter to jump to. */
  interest?: TrackKey;
};

export const OUTCOMES: Outcome[] = [
  {
    title: "Write to a professor and land a research role",
    body: "Find the right academic, read one of their papers properly, and send the email that actually gets a reply.",
    id: "yrp",
    interest: "res",
  },
  {
    title: "Publish a paper with a citable link",
    body: "A permanent, checkable record of the research - not a line of unverifiable claim on a CV.",
    id: "rpf",
    interest: "res",
  },
  {
    title: "Build and launch a real venture",
    body: "A live product or service with users, customers or revenue, plus a pitch deck they can defend.",
    id: "fef",
    interest: "ai",
  },
  {
    title: "A portfolio site that holds everything",
    body: "Capstones, papers, demo videos and awards behind one link that goes on every application.",
  },
  {
    title: "A presence universities can verify",
    body: "LinkedIn and a public builder profile that match the portfolio, with certificates and mentor letters attached.",
  },
  {
    title: "Mentor letters and certificates on file",
    body: "Named, dated, verifiable documents from every programme - ready when a university or scholarship asks.",
    type: "comp",
  },
];

export const PATHWAY: {
  key: string;
  band: string;
  title: string;
  goal: string;
  ids: string[];
  outcomes?: Outcome[];
}[] = [
  {
    key: "explore",
    band: "Grades 5–7",
    title: "Explore widely",
    goal: "Try two or three fields, get comfortable speaking and presenting, and find what genuinely holds their attention.",
    ids: ["onw", "jdf", "yrp"],
  },
  {
    key: "deepen",
    band: "Grades 8–10",
    title: "Go deep, gather evidence",
    goal: "Commit to one or two interests, finish a mentor-led fellowship, and start collecting real work - projects, papers, pitches.",
    ids: ["fdf", "fef", "ydf"],
  },
  {
    key: "prove",
    band: "Grades 11–12",
    title: "Make it application-ready",
    goal: "Publish, compete and prepare so the profile shows proof - a paper, an award and a score that keeps doors open.",
    ids: ["rpf", "wow", "sat"],
  },
  {
    key: "verify",
    band: "Grades 9–12 · any stage",
    title: "Turn it into proof universities can check",
    goal: "The work only counts if an admissions officer can find it, read it and confirm it is real. Step 4 packages everything from steps 1-3.",
    ids: [],
    outcomes: OUTCOMES,
  },
];
