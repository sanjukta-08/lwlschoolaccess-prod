export const ABOUT = {
  kicker: "About Learn with Leaders",
  headline: "Ivy League mentors, live cohorts, and proof universities can check.",
  body: "Learn with Leaders runs live, small-group programmes for students in Grades 5–12, mentored by student leaders from Harvard, Yale, MIT, Stanford and Princeton, and delivered with partners like Harvard Student Agencies, HPAIR and Harvard Model Congress. Every pathway is built backwards from an outcome — a capstone project, a published paper, a judged pitch, a moot court, a portfolio — so a child finishes with something real to show, not just another certificate.",
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
      d: "Research papers, ventures, prototypes, portfolios and competition results — the things admissions officers can actually verify.",
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
 * Press coverage. Headlines and URLs marked `placeholder: true` are stand-ins —
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
      d: "Students join global cohorts individually — counsellors get progress and outcome summaries.",
    },
  ],
};

export type LinkedInPost = {
  name: string;
  initials: string;
  role: string;
  when: string;
  text: string;
  reactions: number;
  comments: number;
  tag?: string;
};

/**
 * LinkedIn-style stories, recreated as cards. Replace `name`, `role` and `text`
 * with real posts (with permission) as they come in.
 */
export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    name: "Aarav M.",
    initials: "AM",
    role: "Grade 12 · Future Doctors Fellowship alum",
    when: "2w",
    text: "Wrapped up my Learn with Leaders research fellowship today. Eight weeks of mentoring from a Harvard student researcher, and I finished with a literature review on adolescent sleep and cognition — plus the confidence to email two professors about summer lab work. One replied.",
    reactions: 412,
    comments: 38,
    tag: "Research",
  },
  {
    name: "Sara K.",
    initials: "SK",
    role: "Grade 11 · Innovation & Research Fellowship",
    when: "1mo",
    text: "Our team just pitched a low-cost water-testing kit to a panel of mentors from Harvard and Yale. Six weeks ago I had never built a prototype. Grateful to my Learn with Leaders mentor for making 'just try the ugly version first' stick.",
    reactions: 587,
    comments: 54,
    tag: "Venture",
  },
  {
    name: "Priya R.",
    initials: "PR",
    role: "Parent · Dubai",
    when: "3w",
    text: "As a parent I was sceptical about another online programme. What changed my mind: my daughter came out of it with a finished project, a mentor reference and a much clearer idea of what she wants to study. Sessions ran in the evening Dubai time, so no clash with school.",
    reactions: 296,
    comments: 41,
    tag: "Parent",
  },
  {
    name: "Yusuf A.",
    initials: "YA",
    role: "Grade 10 · AI & Leadership",
    when: "2mo",
    text: "Presented my first machine-learning model to a cohort of students from nine countries. Learned more in six weeks of live sessions than in a year of tutorials — mostly because someone reviewed my code and asked why every single time.",
    reactions: 341,
    comments: 27,
    tag: "AI",
  },
  {
    name: "Meera S.",
    initials: "MS",
    role: "Grade 12 · Model Congress delegate",
    when: "5w",
    text: "Won Best Delegate at my first conference after a Learn with Leaders prep cohort. My mentor made me rewrite my opening speech four times. Worth every draft.",
    reactions: 623,
    comments: 62,
    tag: "Conference",
  },
  {
    name: "Ishaan T.",
    initials: "IT",
    role: "Grade 11 · Financial Literacy & Markets",
    when: "6w",
    text: "Built and back-tested a small portfolio strategy as my capstone, then wrote it up for my school's investment club — which now actually exists, because of this. Add 'launch something' to your summer, not just 'attend something'.",
    reactions: 254,
    comments: 19,
    tag: "Finance",
  },
];
