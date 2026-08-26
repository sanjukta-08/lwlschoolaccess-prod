export const ABOUT = {
  kicker: "About Learn with Leaders",
  headline: "Ivy League mentors, live cohorts, and proof universities can check.",
  body: "Learn with Leaders runs live, small-group programmes for students in Grades 5–12, mentored by student leaders from Harvard, Yale, MIT, Stanford and Princeton, and delivered with partners like Harvard Student Agencies, HPAIR and Harvard Model Congress. Every pathway is built backwards from an outcome - a capstone project, a published paper, a judged pitch, a moot court, a portfolio - so a child finishes with something real to show, not just another certificate.",
  pillars: [
    {
      t: "Mentors, not lecturers",
      d: "Small cohorts on Zoom, led by current students and alumni of the world's most selective universities, who know each participant by name.",
    },
    {
      t: "One curriculum, two levels",
      d: "Junior and senior versions of each pathway, so a Grade 6 student and a Grade 12 student both get the right level of challenge.",
    },
    {
      t: "Output over attendance",
      d: "Research papers, ventures, prototypes, portfolios and competition results - the things admissions officers can actually verify.",
    },
  ],
};

export type PressItem = {
  publication: string;
  headline: string;
  date: string;
  url: string;
  placeholder?: boolean;
};

/**
 * Press coverage. Headlines and URLs marked `placeholder: true` are stand-ins -
 * replace the `headline`, `date` and `url` with the real article details.
 */
export const PRESS: PressItem[] = [
  {
    publication: "Forbes",
    headline:
      "How Ivy League student mentors are reshaping what a high-school résumé looks like",
    date: "2026",
    url: "https://www.forbes.com/",
    placeholder: true,
  },
  {
    publication: "Forbes India",
    headline:
      "Beyond grades: the rise of outcome-first enrichment for school students",
    date: "2025",
    url: "https://www.forbesindia.com/",
    placeholder: true,
  },
  {
    publication: "Gulf News",
    headline:
      "UAE families turn to live global cohorts to build university-ready profiles",
    date: "2025",
    url: "https://gulfnews.com/",
    placeholder: true,
  },
  {
    publication: "Khaleej Times",
    headline:
      "Harvard and Yale mentors bring research fellowships to Dubai classrooms",
    date: "2025",
    url: "https://www.khaleejtimes.com/",
    placeholder: true,
  },
  {
    publication: "The Economic Times",
    headline: "Learn with Leaders expands its Grades 5–12 programme calendar",
    date: "2025",
    url: "https://economictimes.indiatimes.com/",
    placeholder: true,
  },
  {
    publication: "Entrepreneur",
    headline: "The venture-building generation: teenagers who ship before college",
    date: "2025",
    url: "https://www.entrepreneur.com/",
    placeholder: true,
  },
];

export const PRESS_WORDMARKS = [
  "Forbes",
  "Forbes India",
  "Gulf News",
  "Khaleej Times",
  "The Economic Times",
  "Entrepreneur",
];

export const REACH = {
  countries: "80+",
  schools: "30,000+",
  regions: [
    "UAE & GCC",
    "India",
    "Southeast Asia",
    "East Asia",
    "Africa",
    "Europe",
    "North America",
    "Latin America",
  ],
  models: [
    {
      t: "Single school cohorts",
      d: "One programme run for a single school's students, scheduled around their term calendar.",
    },
    {
      t: "Co-branded pathways",
      d: "A multi-term sequence badged with the school, mapped to its enrichment or CAS goals.",
    },
    {
      t: "Open enrolment seats",
      d: "Students join global cohorts individually - counsellors get progress and outcome summaries.",
    },
  ],
};

import type { TrackKey } from "@/lib/programmes";

export type LinkedInStory = {
  id: string;
  name: string;
  initials: string;
  role: string;
  when: string;
  text: string;
  reactions: number;
  comments: number;
  tag?: string;
  /** Track keys this story belongs to - used to match it to programme pages. */
  tags: TrackKey[];
  /** CDN url of the approved screenshot. Leave undefined to render a text card. */
  image?: string;
  /** Alt text describing the screenshot. Required when `image` is set. */
  imageAlt?: string;
  /** Link to the live LinkedIn post, when we have it. */
  postUrl?: string;
  /** Only approved stories render anywhere on the site. */
  approved: boolean;
  /** True while the copy is a stand-in rather than a real, permissioned post. */
  placeholder?: boolean;
};

/**
 * LinkedIn stories.
 *
 * HOW TO ADD A REAL STORY
 * 1. Get written permission from the student/parent before publishing.
 * 2. Upload the screenshot via `lovable-assets` and paste its `url` into `image`,
 *    with a describing `imageAlt`. If a name must be hidden, blur it in the image
 *    before upload - we never blur in CSS.
 * 3. Set `placeholder: false` and `approved: true`, and add the live `postUrl`.
 *
 * Entries with `placeholder: true` are stand-in copy written by us, kept so the
 * gallery has shape. Replace them as real posts come in.
 */
export const LINKEDIN_POSTS: LinkedInStory[] = [
  {
    id: "aarav-research",
    name: "Aarav M.",
    initials: "AM",
    role: "Grade 12 · Future Doctors Fellowship alum",
    when: "2w",
    text: "Wrapped up my Learn with Leaders research fellowship today. Eight weeks of mentoring from a Harvard student researcher, and I finished with a literature review on adolescent sleep and cognition - plus the confidence to email two professors about summer lab work. One replied.",
    reactions: 412,
    comments: 38,
    tag: "Research",
    tags: ["res", "med"],
    approved: true,
    placeholder: true,
  },
  {
    id: "sara-venture",
    name: "Sara K.",
    initials: "SK",
    role: "Grade 11 · Innovation & Research Fellowship",
    when: "1mo",
    text: "Our team just pitched a low-cost water-testing kit to a panel of mentors from Harvard and Yale. Six weeks ago I had never built a prototype. Grateful to my Learn with Leaders mentor for making 'just try the ugly version first' stick.",
    reactions: 587,
    comments: 54,
    tag: "Venture",
    tags: ["ent", "res"],
    approved: true,
    placeholder: true,
  },
  {
    id: "priya-parent",
    name: "Priya R.",
    initials: "PR",
    role: "Parent · Dubai",
    when: "3w",
    text: "As a parent I was sceptical about another online programme. What changed my mind: my daughter came out of it with a finished project, a mentor reference and a much clearer idea of what she wants to study. Sessions ran in the evening Dubai time, so no clash with school.",
    reactions: 296,
    comments: 41,
    tag: "Parent",
    tags: ["lead", "res", "med", "law", "fin", "ai", "ent", "deb", "sat"],
    approved: true,
    placeholder: true,
  },
  {
    id: "yusuf-ai",
    name: "Yusuf A.",
    initials: "YA",
    role: "Grade 10 · AI & Leadership",
    when: "2mo",
    text: "Presented my first machine-learning model to a cohort of students from nine countries. Learned more in six weeks of live sessions than in a year of tutorials - mostly because someone reviewed my code and asked why every single time.",
    reactions: 341,
    comments: 27,
    tag: "AI",
    tags: ["ai", "lead"],
    approved: true,
    placeholder: true,
  },
  {
    id: "meera-congress",
    name: "Meera S.",
    initials: "MS",
    role: "Grade 12 · Model Congress delegate",
    when: "5w",
    text: "Won Best Delegate at my first conference after a Learn with Leaders prep cohort. My mentor made me rewrite my opening speech four times. Worth every draft.",
    reactions: 623,
    comments: 62,
    tag: "Conference",
    tags: ["deb", "lead", "law"],
    approved: true,
    placeholder: true,
  },
  {
    id: "ishaan-finance",
    name: "Ishaan T.",
    initials: "IT",
    role: "Grade 11 · Financial Literacy & Markets",
    when: "6w",
    text: "Built and back-tested a small portfolio strategy as my capstone, then wrote it up for my school's investment club - which now actually exists, because of this. Add 'launch something' to your summer, not just 'attend something'.",
    reactions: 254,
    comments: 19,
    tag: "Finance",
    tags: ["fin", "ent"],
    approved: true,
    placeholder: true,
  },
  {
    id: "hana-law",
    name: "Hana Q.",
    initials: "HQ",
    role: "Grade 11 · Future Lawyers Fellowship",
    when: "4w",
    text: "Argued my first moot as second counsel this weekend. Cross-examination is terrifying and I loved it. Thank you to my Learn with Leaders mentor for the twelve pages of notes on my written submission.",
    reactions: 388,
    comments: 33,
    tag: "Law",
    tags: ["law", "deb"],
    approved: true,
    placeholder: true,
  },
  {
    id: "dev-satscore",
    name: "Dev P.",
    initials: "DP",
    role: "Grade 11 · Test prep cohort",
    when: "7w",
    text: "Score up 190 points, but the more useful bit was learning to review my own mistakes properly instead of doing another practice set. That habit is transferring to school exams too.",
    reactions: 211,
    comments: 16,
    tag: "Test prep",
    tags: ["sat"],
    approved: true,
    placeholder: true,
  },
  {
    id: "anya-parent-2",
    name: "Anya B.",
    initials: "AB",
    role: "Parent · Abu Dhabi",
    when: "2mo",
    text: "Two things I did not expect: a mentor who actually replied between sessions, and a son who now talks about his project at dinner. He has a LinkedIn post of his own now - which is how I found this page.",
    reactions: 174,
    comments: 22,
    tag: "Parent",
    tags: ["lead", "ai", "ent", "res"],
    approved: true,
    placeholder: true,
  },
];

/** Real, permissioned posts rank above stand-in copy everywhere. */
const realFirst = (a: LinkedInStory, b: LinkedInStory) =>
  Number(Boolean(a.placeholder)) - Number(Boolean(b.placeholder));

export const APPROVED_STORIES = LINKEDIN_POSTS.filter((s) => s.approved).sort(
  realFirst,
);

/** Stories matching any of the given track keys, real posts first, then most-reacted. */
export function storiesForTracks(tracks: TrackKey[], limit = 3): LinkedInStory[] {
  const rank = (a: LinkedInStory, b: LinkedInStory) =>
    realFirst(a, b) || b.reactions - a.reactions;
  const matched = APPROVED_STORIES.filter((s) =>
    s.tags.some((t) => tracks.includes(t)),
  ).sort(rank);
  const fallback = [...APPROVED_STORIES].sort(rank);
  const out = [...matched];
  for (const s of fallback) {
    if (out.length >= limit) break;
    if (!out.some((o) => o.id === s.id)) out.push(s);
  }
  return out.slice(0, limit);
}

