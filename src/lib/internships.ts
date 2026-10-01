export type Role = {
  id: string;
  title: string;
  team: string;
  location: string;
  reportsTo: string;
  type: string;
  duration?: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  compensation: string;
};

export const ROLES: Role[] = [
  {
    id: "sponsorship-manager-competitions",
    title: "Sponsorship Manager, Competitions",
    team: "Competitions",
    location: "Remote",
    reportsTo: "CEO",
    type: "Full Time",
    about:
      "Learn with Leaders runs global competitions for students aged 10 to 18, mentored by Harvard and Yale affiliates. You will own sponsorship revenue for our competitions: build the pipeline, pitch, close, and deliver.",
    responsibilities: [
      "Raise corporate sponsorships for LWL competitions (title, category and in-kind tiers)",
      "Build target lists across edtech, banks, consumer brands and CSR arms",
      "Create decks and tiered packages; pitch and negotiate remotely",
      "Own revenue targets; report monthly on pipeline and closed deals",
      "Deliver sponsor obligations: branding, mentions, activations, post-event reports",
    ],
    requirements: [
      "3 to 6 years in sponsorship, partnerships or B2B sales with a closing record",
      "Strong remote-selling skills: cold outreach, video pitches, negotiation",
      "Education or events exposure a plus",
    ],
    compensation: "Base + commission on closed sponsorships",
  },
  {
    id: "sponsorship-intern-competitions",
    title: "Sponsorship Intern, Competitions",
    team: "Competitions",
    location: "Remote",
    reportsTo: "Sponsorship Manager",
    type: "Internship",
    duration: "3 to 6 months",
    about:
      "Support the competitions sponsorship team as we scale partnerships with edtech, consumer and CSR brands. This is a hands-on remote role for someone hungry to learn sales, research and partnership operations.",
    responsibilities: [
      "Research sponsor targets for competitions and build contact lists",
      "Draft outreach emails and LinkedIn messages; run follow-ups",
      "Customise sponsorship decks per prospect",
      "Keep the CRM and pipeline tracker updated",
    ],
    requirements: [
      "Student or recent graduate with excellent written English",
      "Strong research, Canva/PowerPoint skills, organised and hungry",
      "Interest in sales and education",
    ],
    compensation: "Stipend, certificate, recommendation letter, and a path to full time",
  },
];

export const ROLE_BY_ID = new Map(ROLES.map((r) => [r.id, r]));
