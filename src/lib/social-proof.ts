import genevaClip1 from "@/assets/geneva-clip-1.webm.asset.json";
import genevaClip2 from "@/assets/geneva-clip-2.webm.asset.json";
import genevaClip3 from "@/assets/geneva-clip-3.webm.asset.json";
import genevaPoster1 from "@/assets/geneva-clip-1-poster.webp.asset.json";
import genevaPoster2 from "@/assets/geneva-clip-2-poster.webp.asset.json";
import genevaPoster3 from "@/assets/geneva-clip-3-poster.webp.asset.json";

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

import shotMompati from "@/assets/story-mompati.webp.asset.json";
import shotKhalid from "@/assets/story-khalid.webp.asset.json";
import shotMohammed from "@/assets/story-mohammed.webp.asset.json";
import shotSwaraj from "@/assets/story-swaraj.webp.asset.json";
import shotKanav from "@/assets/story-kanav.webp.asset.json";
import shotRouqaya from "@/assets/story-rouqaya.webp.asset.json";
import shotIreh from "@/assets/story-ireh.webp.asset.json";
import shotKalina from "@/assets/story-kalina.webp.asset.json";
import shotChloe from "@/assets/story-chloe.webp.asset.json";
import shotTanvi from "@/assets/story-tanvi.webp.asset.json";

export type StorySource = "linkedin" | "instagram";

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
  /** Where the post lives. Drives the card chrome and the gallery grouping. */
  source: StorySource;
  /** Track keys this story belongs to - used to match it to programme pages. */
  tags: TrackKey[];
  /** CDN url of the approved screenshot. Leave undefined to render a text card. */
  image?: string;
  /** Alt text describing the screenshot. Required when `image` is set. */
  imageAlt?: string;
  /** Link to the live post. */
  postUrl?: string;
  /** Alias of postUrl kept for clarity at call sites. */
  sourceUrl?: string;
  /** Only approved stories render anywhere on the site. */
  approved: boolean;
  /** True while the copy is a stand-in rather than a real, permissioned post. */
  placeholder?: boolean;
};

/**
 * Real, permissioned posts only. Every entry below is a live public post by the
 * student named, with the screenshot as shared by them.
 *
 * HOW TO ADD A NEW ONE
 * 1. Get written permission from the student/parent.
 * 2. Upload the screenshot via `lovable-assets`, import the pointer above and
 *    paste its `.url` into `image`, with a describing `imageAlt`.
 * 3. Add the live `postUrl` and tag it to the tracks it belongs to.
 */
export const LINKEDIN_POSTS: LinkedInStory[] = [
  {
    id: "rouqaya-future-doctors",
    name: "Rouqaya Elbanna",
    initials: "RE",
    role: "Sophomore at AIS Jeddah · Future Doctors Fellowship",
    when: "Future Doctors Fellowship x HPAIR",
    text: "55 million people worldwide live with dementia, with Alzheimer's being the leading cause of the majority of cases. I've always been drawn to the question of how the brain shapes who we are - and how changes within it can affect us, whether through psychological or neurological disorders such as Alzheimer's. This summer, the Learn with Leaders Future Doctors Fellowship, in partnership with the Harvard Project for Asian and International Relations (HPAIR), let me explore that question through neuroscience, psychology and medicine, and see how deeply they intersect in patient care.",
    reactions: 148,
    comments: 21,
    tag: "Medicine",
    source: "linkedin",
    tags: ["med", "res"],
    image: shotRouqaya.url,
    imageAlt:
      "LinkedIn post by Rouqaya Elbanna about her Future Doctors Fellowship research on Alzheimer's and neuroscience",
    postUrl:
      "https://www.linkedin.com/posts/rouqaya-elbanna-b7750b386_future-doctors-fellowship-certificates-share-7495698122250207232-v8tT/",
    approved: true,
  },
  {
    id: "swaraj-finance",
    name: "Swaraj Koyande",
    initials: "SK",
    role: "Founder & President, The Ledger · 8-week Finance Fellowship",
    when: "Sharpest Financial Analysis award",
    text: "I'm excited to have won the sharpest financial analysis award for the 8-week finance fellowship by Learn with Leaders. At the end of the programme I designed and built a venture pitch deck evaluating burn rate, LTV:CAC ratios, and financial and operational growth. I pitched TeenVenture, an idea I'm very keen about, and was able to build a connection with the judges and listeners who faced the problems TeenVenture aims to solve. I deepened my knowledge of financial analysis, business management, venture capital and financial management throughout the programme.",
    reactions: 132,
    comments: 18,
    tag: "Finance",
    source: "linkedin",
    tags: ["fin", "ent"],
    image: shotSwaraj.url,
    imageAlt:
      "LinkedIn post by Swaraj Koyande announcing his Sharpest Financial Analysis award and venture pitch deck",
    postUrl:
      "https://www.linkedin.com/posts/swarajkoyande_sharpest-financial-analysis-ugcPost-7494012270591799298-6o_0/",
    approved: true,
  },
  {
    id: "khalid-hcus",
    name: "Khalid W. Al-Sultan",
    initials: "KA",
    role: "Mechanical Engineering student · Mawhiba alumnus, KFUPM",
    when: "Mentor feedback letter",
    text: "I'm grateful to have received personal feedback from my mentor following my participation in the Harvard College Union Society (HCUS) Young Global Leaders Summer Camp. The experience challenged me to step outside my comfort zone, engage with diverse perspectives, strengthen my communication skills and think more intentionally about leadership. One piece of feedback that particularly stayed with me was the encouragement to take on leadership roles more often and become more actively involved in discussions and team challenges.",
    reactions: 118,
    comments: 14,
    tag: "Leadership",
    source: "linkedin",
    tags: ["lead", "deb"],
    image: shotKhalid.url,
    imageAlt:
      "LinkedIn post by Khalid W. Al-Sultan sharing mentor feedback from the HCUS Young Global Leaders Summer Camp",
    postUrl:
      "https://www.linkedin.com/posts/khalid-w-al-sultan-1bbb8731b_harvard-harvardcollege-hcus-share-7495857709075013632-gRzK/",
    approved: true,
  },
  {
    id: "kanav-hcus",
    name: "Kanav Suri",
    initials: "KS",
    role: "TEDx speaker · HCUS Young Leaders' Camp, Harvard",
    when: "First LinkedIn post",
    text: "Delighted to share my experiences from an unforgettable summer camp at Harvard University - HCUS: Young Leaders' Camp. A huge shout-out to my mentors, and especially our team mentor. Structured to provide diverse exposure to skills such as persuasive writing, public speaking, public policy, research, problem-solving, teamwork, decision-making and effective use of AI, the course was extensive. Hands-on activities and role plays made these exceptionally engaging. Our team worked on a project for a large city facing overcrowded hospitals.",
    reactions: 210,
    comments: 34,
    tag: "Leadership",
    source: "linkedin",
    tags: ["lead", "deb", "ai"],
    image: shotKanav.url,
    imageAlt:
      "LinkedIn post by Kanav Suri about the HCUS Young Leaders' Camp at Harvard University",
    postUrl:
      "https://www.linkedin.com/posts/kanav-suri-2b5a50375_my-first-linkedin-post-delighted-to-share-ugcPost-7495118364109938689-RwXW/",
    approved: true,
  },
  {
    id: "mompati-cambridge",
    name: "Mompati Masiangoako",
    initials: "MM",
    role: "Aspiring founder · Cambridge Judge Business School week",
    when: "Seed funding + mentoring winner",
    text: "I recently had the opportunity to spend a week at the Cambridge Judge Business School. One of the biggest takeaways was the mentorship I received as we were put into random groups with a mentor and had to come up with a startup idea and present it in five days. Although my group did not win, I am still really proud of what we managed to achieve in five days. I was incredibly honoured to be one of two participants to receive four hours of mentoring and 100 pounds of seed funding for my future endeavours.",
    reactions: 96,
    comments: 12,
    tag: "Entrepreneurship",
    source: "linkedin",
    tags: ["ent", "lead"],
    image: shotMompati.url,
    imageAlt:
      "LinkedIn post by Mompati Masiangoako about his Cambridge Judge Business School startup week and seed funding",
    postUrl:
      "https://www.linkedin.com/posts/mompati-masiangoako-9524673a1_learnwithleaders-startup-cambridge-share-7487528971228577793-0lGI/",
    approved: true,
  },
  {
    id: "mohammed-hcus",
    name: "Mohammed Majed Abu Baid",
    initials: "MA",
    role: "Delegate, ANJSUM 2025 · Harvard College Union Society programme",
    when: "Invitation letter shared",
    text: "A week ago I was able to get the opportunity to attend the Harvard College Union Society programme made by Learn with Leaders. I really appreciate how their team's fast response and quick support helped me know more about this programme, and from my perspective I recommend that any student who would like to try a new experience should. I also attended the one before, Ignite Young Minds summer camp, and it was an excellent experience too - making many friends and socialising with others, but most importantly learning new things from these programmes.",
    reactions: 87,
    comments: 9,
    tag: "Leadership",
    source: "linkedin",
    tags: ["lead", "deb", "law"],
    image: shotMohammed.url,
    imageAlt:
      "LinkedIn post by Mohammed Majed Abu Baid with his Harvard College Union Society invitation letter",
    postUrl:
      "https://www.linkedin.com/posts/mohammed-majed-abu-baid-7a2323423_a-week-ago-i-was-able-to-get-the-opportunity-share-7498005545514246145-44hI/",
    approved: true,
  },
];

/** Research Scholars features published on Instagram by the Sir Luther Center. */
export const INSTAGRAM_POSTS: LinkedInStory[] = [
  {
    id: "ireh-research",
    name: "Ireh Choe",
    initials: "IC",
    role: "Research Scholars Program · Sir Luther Center x Learn with Leaders",
    when: "Featured research",
    text: "Through Learn with Leaders, I learned how to synthesize complex information into a well-structured, persuasive academic paper. I've experienced great development in my writing skills, and I am so grateful for the program!",
    reactions: 17,
    comments: 8,
    tag: "Research",
    source: "instagram",
    tags: ["res"],
    image: shotIreh.url,
    imageAlt:
      "Instagram feature quoting Ireh Choe on the Research Scholars Program with the Sir Luther Center",
    postUrl: "https://www.instagram.com/p/DZvERn1EumY/",
    approved: true,
  },
  {
    id: "kalina-research",
    name: "Kalina Abdulla",
    initials: "KA",
    role: "Research Scholars Program · Sir Luther Center x Learn with Leaders",
    when: "Featured research",
    text: "Writing my research paper on data centers strengthened my analytical skills while expanding my understanding of modern technology. The Learn with Leaders program provided clear structure, valuable feedback and guidance, helping me refine my ideas and build confidence in my writing.",
    reactions: 20,
    comments: 10,
    tag: "Research",
    source: "instagram",
    tags: ["res", "ai"],
    image: shotKalina.url,
    imageAlt:
      "Instagram feature quoting Kalina Abdulla on her Research Scholars paper about data centers",
    postUrl: "https://www.instagram.com/p/Dann7Rqkr_d/",
    approved: true,
  },
  {
    id: "chloe-research",
    name: "Chloe Jenkins",
    initials: "CJ",
    role: "Research Scholars Program · Sir Luther Center x Learn with Leaders",
    when: "Featured research",
    text: "It was a great opportunity to research a topic I was curious about and learn more about it. I learned valuable skills during the Research Scholars Program that I've been able to apply in classes and other aspects of my academic career.",
    reactions: 13,
    comments: 2,
    tag: "Research",
    source: "instagram",
    tags: ["res"],
    image: shotChloe.url,
    imageAlt:
      "Instagram feature quoting Chloe Jenkins on the skills she gained in the Research Scholars Program",
    postUrl: "https://www.instagram.com/p/Da0JlF-EoYN/",
    approved: true,
  },
  {
    id: "tanvi-research",
    name: "Tanvi Koppula",
    initials: "TK",
    role: "Research Scholars Program · Sir Luther Center x Learn with Leaders",
    when: "Featured research",
    text: "My mentors helped me throughout the process, from ensuring my research questions were focused to proofreading my paper paragraph by paragraph. Since participating in this programme, I've become more comfortable reading scientific literature and citing sources in academic writing.",
    reactions: 5,
    comments: 1,
    tag: "Research",
    source: "instagram",
    tags: ["res", "med"],
    image: shotTanvi.url,
    imageAlt:
      "Instagram feature quoting Tanvi Koppula on mentor support during the Research Scholars Program",
    postUrl: "https://www.instagram.com/p/DbJJtFcEpGx/",
    approved: true,
  },
];

export type VideoTestimonial = {
  id: string;
  name: string;
  cohort: string;
  /** Google Drive file id - embedded through the Drive preview player. */
  fileId?: string;
  /** Self-hosted WebM clip served from the CDN (preferred over fileId). */
  src?: string;
  /** Poster frame for self-hosted clips. */
  poster?: string;
  tags: TrackKey[];
};

/**
 * Video testimonials, streamed from the shared Drive folders.
 * The Geneva camp clip (Yassin) is not publicly shared yet, so it is omitted
 * until the sharing setting is changed to "anyone with the link".
 */
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "kerryn",
    name: "Kerryn Chalmers",
    cohort: "Global Goals Camp, Geneva",
    src: genevaClip1.url,
    poster: genevaPoster1.url,
    tags: ["lead", "deb"],
  },
  {
    id: "hamza",
    name: "Hamza Monshar",
    cohort: "Global Goals Camp, Geneva",
    src: genevaClip2.url,
    poster: genevaPoster2.url,
    tags: ["lead", "deb"],
  },
  {
    id: "geneva-learner",
    name: "Global Goals Camp learner",
    cohort: "Global Goals Camp, Geneva",
    src: genevaClip3.url,
    poster: genevaPoster3.url,
    tags: ["lead", "res"],
  },

  {
    id: "efrain",
    name: "Efrain Calles-Arnaiz",
    cohort: "Harvard Winter Camp 2025",
    fileId: "1ToX2xWT-tareQBmWSInwyr2emSPe8wGa",
    tags: ["lead", "deb"],
  },
  {
    id: "maame",
    name: "Maame Adjoa Kakraba Nduom",
    cohort: "Harvard Winter Camp 2025",
    fileId: "1dTssxV7gQVDrPa3gG4nD_NsvNkgySfTo",
    tags: ["lead", "deb"],
  },
  {
    id: "isham",
    name: "Isham",
    cohort: "Harvard Winter Camp 2025",
    fileId: "1j1T2mCMPpgbR-Tx88e-voxUzGtokLk6k",
    tags: ["lead"],
  },
  {
    id: "yasmina",
    name: "Yasmina Traoré",
    cohort: "Harvard Winter Camp 2025",
    fileId: "1rIes6hptni3Y3o0_4JmSgDGblKvwSdPy",
    tags: ["lead", "deb"],
  },
  {
    id: "wistarani",
    name: "Ni Putu Wistarani",
    cohort: "Research Scholars Program",
    fileId: "1OhwsovaLQm-IuO5UlLFcHtnVLH707peP",
    tags: ["res"],
  },
  {
    id: "arghyaditya",
    name: "Arghyaditya",
    cohort: "Research Scholars Program",
    fileId: "1VmdHKA8yKg2CdcfZVNPEvze2xPitxkOD",
    tags: ["res"],
  },
  {
    id: "aws",
    name: "Aws Al Bokhari",
    cohort: "Research Scholars Program",
    fileId: "1kGRZuT1nuKqpPKHGG44tkGWdgojSikYa",
    tags: ["res", "med"],
  },
];

export const ALL_STORIES: LinkedInStory[] = [...LINKEDIN_POSTS, ...INSTAGRAM_POSTS];

export const APPROVED_STORIES = ALL_STORIES.filter((s) => s.approved);

export const APPROVED_LINKEDIN = LINKEDIN_POSTS.filter((s) => s.approved);

export const APPROVED_INSTAGRAM = INSTAGRAM_POSTS.filter((s) => s.approved);

/** Stories matching any of the given track keys, most-reacted first. */
export function storiesForTracks(tracks: TrackKey[], limit = 3): LinkedInStory[] {
  const rank = (a: LinkedInStory, b: LinkedInStory) => b.reactions - a.reactions;
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

/** Videos matching any of the given track keys, falling back to the newest set. */
export function videosForTracks(tracks: TrackKey[], limit = 3): VideoTestimonial[] {
  const matched = VIDEO_TESTIMONIALS.filter((v) =>
    v.tags.some((t) => tracks.includes(t)),
  );
  const out = [...matched];
  for (const v of VIDEO_TESTIMONIALS) {
    if (out.length >= limit) break;
    if (!out.some((o) => o.id === v.id)) out.push(v);
  }
  return out.slice(0, limit);
}
