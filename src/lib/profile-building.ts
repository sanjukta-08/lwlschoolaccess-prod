// Content for the /profile-building explainer page: what each programme type
// and each interest track contributes to a university profile, the skills a
// child gains, and the proof the family ends up holding.

import type { TrackKey, TypeKey } from "./programmes";

export type TypeProfile = {
  purpose: string;
  skills: string[];
  proof: string[];
};

export const TYPE_PROFILE: Record<TypeKey, TypeProfile> = {
  fel: {
    purpose:
      "Depth. A fellowship is the spine of a profile - several weeks with one mentor, one field and one finished piece of work at the end. This is what turns \"interested in medicine\" into evidence.",
    skills: [
      "Reading primary sources",
      "Structured problem solving",
      "Working to a mentor's brief",
      "Presenting to adults",
      "Writing for a specialist reader",
    ],
    proof: [
      "A finished capstone or research piece",
      "Mentor feedback in writing",
      "Named completion certificate",
      "Two or three application-worthy stories",
    ],
  },
  prog: {
    purpose:
      "Exploration, cheaply and quickly. Short live programmes let a child test a field over a couple of weekends before committing months to it - and they are the natural first step in Grades 5–8.",
    skills: [
      "Speaking up in a live room",
      "Note-taking and synthesis",
      "Team work with strangers",
      "Basic field vocabulary",
    ],
    proof: [
      "Certificate of completion",
      "A small project or presentation",
      "A clear yes or no on the interest",
    ],
  },
  comp: {
    purpose:
      "External validation. A competition is judged by someone other than us, which is exactly why admissions officers weigh it - a rank or an award is a third party saying the work was good.",
    skills: [
      "Working to a hard deadline",
      "Argument under scrutiny",
      "Editing ruthlessly",
      "Handling results, win or lose",
    ],
    proof: [
      "A rank, award or honourable mention",
      "A submitted essay or case entry",
      "A line that needs no explaining on a form",
    ],
  },
  intern: {
    purpose:
      "Workplace credibility. A corporate internship puts a real organisation's name next to your child's work - the single hardest thing for a school student to obtain on their own.",
    skills: [
      "Professional email and deadlines",
      "Working inside a real brief",
      "Data and reporting basics",
      "Receiving and acting on feedback",
    ],
    proof: [
      "An internship letter on company letterhead",
      "Deliverables you can show",
      "A LinkedIn entry that verifies",
    ],
  },
  conf: {
    purpose:
      "Diplomacy and presence. MUN and conferences build the room skills - negotiation, alliance-building, speaking without notes - that interviews and leadership roles later depend on.",
    skills: [
      "Public speaking without a script",
      "Negotiation and caucusing",
      "Drafting resolutions and clauses",
      "Researching a country or brief fast",
    ],
    proof: [
      "Delegate award or committee recognition",
      "Position paper and resolution drafts",
      "A leadership story with a named conference",
    ],
  },
};

export type TrackProfile = {
  story: string;
  skills: string[];
  outcome: string;
};

export const TRACK_PROFILE: Record<TrackKey, TrackProfile> = {
  med: {
    story: "A pre-med narrative that shows clinical curiosity, not just good biology grades.",
    skills: ["Case reasoning", "Medical ethics", "Reading clinical papers"],
    outcome: "A case study or research piece plus a mentor letter from a med-track mentor.",
  },
  law: {
    story: "A future-lawyer profile built on argument quality rather than debate trophies alone.",
    skills: ["Case briefs", "Cross-examination", "Statutory reading"],
    outcome: "A written brief or mooting record, ideally with a competition placement.",
  },
  fin: {
    story: "Commercial literacy - a child who can read a business, not just say they like finance.",
    skills: ["Financial modelling", "Valuation basics", "Market analysis"],
    outcome: "A pitch or valuation deck plus an internship or competition entry.",
  },
  ai: {
    story: "Builder evidence: something that runs, with a repo and a demo behind it.",
    skills: ["Python and prompting", "Model evaluation", "Product thinking"],
    outcome: "A working prototype, a public repo and a two-minute demo video.",
  },
  ent: {
    story: "Initiative that can be checked - a venture with users, not a business plan in a drawer.",
    skills: ["Customer discovery", "Unit economics", "Pitching"],
    outcome: "A launched product or service, first users or revenue, and a pitch deck.",
  },
  res: {
    story: "The strongest single signal available to a school student: published, citable research.",
    skills: ["Literature review", "Method design", "Academic citation"],
    outcome: "A published paper with a permanent link, plus a supervisor's letter.",
  },
  deb: {
    story: "Voice and composure - the thread that makes interviews and leadership roles land.",
    skills: ["Rebuttal structure", "Impromptu speaking", "Evidence use"],
    outcome: "Tournament or committee results and recorded speeches for the portfolio.",
  },
  lead: {
    story: "Impact on other people, documented - the difference between a title and leadership.",
    skills: ["Project management", "Team facilitation", "Stakeholder writing"],
    outcome: "A led initiative with numbers attached and letters from those involved.",
  },
  sat: {
    story: "The floor beneath everything else: scores that keep the door open at selective schools.",
    skills: ["Timed technique", "Error analysis", "Study planning"],
    outcome: "A target score reached with a documented practice trajectory.",
  },
};

export const PROOF_FLOW: { title: string; body: string }[] = [
  {
    title: "Join live",
    body: "Attend the sessions, ask questions by name, and take the mentor's brief seriously from week one.",
  },
  {
    title: "Build the artefact",
    body: "Every programme should end in a thing - a paper, a deck, a prototype, a resolution, a case brief.",
  },
  {
    title: "Get it reviewed",
    body: "Ask the mentor for written feedback and one line of endorsement while the work is fresh.",
  },
  {
    title: "Publish or launch",
    body: "Put it somewhere permanent: a journal, a live site, a public repo, a competition submission.",
  },
  {
    title: "Link it in the portfolio",
    body: "One portfolio page holds every artefact, with certificates and letters attached beside it.",
  },
  {
    title: "Keep the paperwork",
    body: "Named, dated certificates and mentor letters on file, ready when a university or scholarship asks.",
  },
];

export const BANDS: { band: string; head: string; body: string; dos: string[] }[] = [
  {
    band: "Grades 5–7",
    head: "Explore without pressure",
    body: "Nothing here goes on an application. The job is to find what holds their attention and to get comfortable speaking in a live room.",
    dos: [
      "Two or three short programmes across different fields",
      "One speaking or debate programme",
      "No fellowships yet - they are wasted this early",
    ],
  },
  {
    band: "Grades 8–10",
    head: "Go deep and start collecting",
    body: "This is the window where profiles are actually built. Commit to one or two interests and finish work you can point at.",
    dos: [
      "One mentor-led fellowship per year in the chosen field",
      "One competition for external validation",
      "Start the portfolio page now, not in Grade 12",
    ],
  },
  {
    band: "Grades 11–12",
    head: "Convert to proof",
    body: "Time is short, so choose things that end in a verifiable artefact rather than another certificate.",
    dos: [
      "Publish the research or launch the venture",
      "Secure an internship letter from a named organisation",
      "Collect mentor letters before mentors move on",
    ],
  },
];

export const PB_FAQS: { q: string; a: string }[] = [
  {
    q: "How many programmes does a strong profile actually need?",
    a: "Fewer than most parents assume. Two or three finished pieces of work in one or two fields read far better than eight unrelated certificates. Depth is the signal; volume is noise.",
  },
  {
    q: "Do certificates matter to universities?",
    a: "On their own, very little. What matters is the artefact behind the certificate - the paper, the venture, the ranked award - and whether an admissions officer can verify it. The certificate is the receipt, not the achievement.",
  },
  {
    q: "Does profile building replace grades and test scores?",
    a: "No. Grades and scores decide whether the file is read at all. Profile building decides what the reader finds when it is. Treat academics as the floor and this as the story on top.",
  },
  {
    q: "How do universities verify any of this?",
    a: "Through things that exist outside your control: a published paper with a permanent link, a live product, a competition's own results page, an internship letter on organisational letterhead, and a mentor who can be contacted. That is why step four of the pathway exists.",
  },
  {
    q: "Is it too late if we start in Grade 11?",
    a: "It is later, not too late - but the choices narrow. In Grade 11 skip exploration and go straight to programmes that end in a publishable or launchable artefact, and to internships that produce a letter.",
  },
  {
    q: "How do we choose between a fellowship and a competition?",
    a: "A fellowship builds the work; a competition validates it. If your child has nothing finished yet, start with the fellowship. If they already have a piece of work, enter it somewhere judged.",
  },
];
