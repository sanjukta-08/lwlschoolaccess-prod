import kingsLogoAsset from "@/assets/kings-www/kings-school-logo-color.png.asset.json";
import hpairLogoAsset from "@/assets/kings-www/hpair-logo-new.png.asset.json";
import finlitLogoAsset from "@/assets/finlit-logo-ai.png.asset.json";
import lwlLogoAsset from "@/assets/lwl-logo.png.asset.json";
import lwlWhiteAsset from "@/assets/lwl_white.png.asset.json";
import heroImageAsset from "@/assets/kings-www/student-group.jpg.asset.json";
import aiImageAsset from "@/assets/kings-www/classroom-session.jpg.asset.json";
import leadershipImageAsset from "@/assets/kings-www/forum-discussion.jpg.asset.json";
import ventureImageAsset from "@/assets/kings-www/classroom-presentation.jpg.asset.json";
import aiBrochureAsset from "@/assets/kings-www/future-ai-entrepreneurs.pdf.asset.json";
import socialBrochureAsset from "@/assets/kings-www/social-impact-leaders.pdf.asset.json";
import leadershipBrochureAsset from "@/assets/kings-www/leadership-communication.pdf.asset.json";
import sovereignBrochureAsset from "@/assets/kings-www/sovereign-capital-challenge.pdf.asset.json";
import juniorBrochureAsset from "@/assets/kings-www/junior-venture-challenge.pdf.asset.json";

export type CurriculumDay = {
  day: string;
  title: string;
  focus: string;
  activities: string[];
  outcome: string;
};

export type KingsProgram = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  partner: string;
  tagline: string;
  summary: string;
  description: string;
  outcome: string;
  cardSchedule: string[];
  detail?: string;
  years: "Years 10–13" | "Years 7–9";
  duration: string;
  recognition: string;
  image: string;
  logo?: string;
  brochure: string;
  outcomes: string[];
  curriculum: CurriculumDay[];
  extendedTitle?: string;
  extendedDescription?: string;
  extendedItems?: string[];
  mentorTitle: string;
  mentorDescription: string;
};

export const kingsWwwAssets = {
  kingsLogo: kingsLogoAsset.url,
  hpairLogo: hpairLogoAsset.url,
  finlitLogo: finlitLogoAsset.url,
  lwlLogo: lwlLogoAsset.url,
  lwlWhite: lwlWhiteAsset.url,
  heroImage: heroImageAsset.url,
  aiImage: aiImageAsset.url,
  leadershipImage: leadershipImageAsset.url,
  ventureImage: ventureImageAsset.url,
};

export const sharedFacts = {
  dates: "1–5 February 2027",
  location: "Kings’ School Al Barsha",
  fee: "USD 650 per student",
};

export const kingsFaqs = [
  {
    q: "Who can take part?",
    a: "The five programs are designed for Kings’ School Al Barsha students in Years 7–13. Each program is assigned to a specific year group so students work with age-appropriate challenges and expectations.",
  },
  {
    q: "When and where does the experience take place?",
    a: "The core experience runs on campus at Kings’ School Al Barsha from 1–5 February 2027. The two FinLit challenges also include a 15-day live virtual portfolio sprint after the campus week.",
  },
  {
    q: "What is the Program Fee?",
    a: "The Program Fee is USD 650 per student. Full program-specific details are available in each brochure.",
  },
  {
    q: "What will students create?",
    a: "Every program culminates in a tangible outcome: a venture prototype, investment mandate, social-impact action plan, speech and passion project, or virtual investment portfolio.",
  },
];

export const kingsPrograms: KingsProgram[] = [
  {
    slug: "sovereign-capital-challenge",
    number: "01",
    title: "The Sovereign Capital Challenge",
    eyebrow: "FinLit AI · HPAIR · Years 10–13",
    partner: "FinLit AI · HPAIR",
    tagline: "Build the fund. Defend the mandate.",
    summary: "Students become sovereign wealth fund analysts, building an investment thesis and managing a USD 100,000 paper portfolio through a live market simulation.",
    description: "Student analyst firms manage a USD 100,000 paper portfolio on live markets, document every decision and pitch an investor panel for a USD 1 million mandate.",
    outcome: "An investment mandate, evidence-based trade log, risk architecture and final USD 1 million mandate pitch.",
    cardSchedule: [
      "Day 1 · Markets, mandates and the investment thesis",
      "Day 2 · Research, portfolio construction and risk",
      "Day 3 · Execution, analysis and trade decisions",
      "Day 4 · Portfolio review and mandate preparation",
      "Day 5 · Investment committee pitch",
    ],
    detail: "The on-campus week continues into a 15-day MarketWatch sprint, where students track and defend their decisions against live market movement.",
    years: "Years 10–13",
    duration: "5 campus days + 15-day live sprint",
    recognition: "Certificate of Participation from HPAIR",
    image: kingsWwwAssets.leadershipImage,
    logo: kingsWwwAssets.finlitLogo,
    brochure: sovereignBrochureAsset.url,
    outcomes: [
      "A live MarketWatch paper portfolio with a clear investment thesis",
      "Fundamental and technical analysis of real companies",
      "An auditable Trade-Reason Log and diversification matrix",
      "A boardroom pitch covering portfolio health, winners, losses and outlook",
    ],
    curriculum: [
      { day: "Day 1", title: "Finance first principles and first trade", focus: "Markets and ownership", activities: ["Explore capital, profit, supply, demand and compounding through practical analogies", "Learn shares, tickers, market capitalization, bid and ask", "Open the team’s MarketWatch fund and place a first paper trade"], outcome: "An active USD 100,000 fund and first documented trade" },
      { day: "Day 2", title: "Fundamentals and corporate due diligence", focus: "Business quality", activities: ["Compare revenue, net profit and valuation", "Study the P/E ratio and economic moats", "Complete a corporate face-off and investment memo"], outcome: "A due-diligence memo and two fundamentally supported positions" },
      { day: "Day 3", title: "Technicals and trend timing", focus: "Market behavior", activities: ["Read candlesticks, support and resistance", "Use moving averages, RSI and volume", "Set stop-loss protection and execute a trend-confirmed trade"], outcome: "An annotated technical chart and protection log" },
      { day: "Day 4", title: "Risk architecture and trade discipline", focus: "Protecting capital", activities: ["Set diversification caps and cash buffers", "Stress-test the portfolio", "Record the catalyst, horizon, stop-loss and target for every position"], outcome: "A complete Trade-Reason Log and diversification matrix" },
      { day: "Day 5", title: "Mock partner pitch and sprint hand-off", focus: "Defending decisions", activities: ["Build the investment story and portfolio deck", "Deliver a timed mock boardroom pitch", "Receive critique and prepare for the independent sprint"], outcome: "A reviewed pitch deck and live-sprint plan" },
    ],
    extendedTitle: "The 15-day live sprint and Grand Finals",
    extendedDescription: "After the campus week, each firm continues managing its fund under professional risk rules. The final panel evaluates discipline, strategic rationale, risk defense and composure rather than short-term luck.",
    extendedItems: ["No single asset above 20% of the portfolio", "Maintain a 5% to 10% cash buffer", "Set a stop-loss for every position", "Record the reason before every trade", "Present the 20-day track record to the investor panel"],
    mentorTitle: "Harvard student mentors as senior partners",
    mentorDescription: "Harvard student mentors lead the MarketWatch labs, review deliverables, critique the mock pitch, follow the sprint and join the Grand Finals panel at a 1:20 mentor ratio.",
  },
  {
    slug: "future-ai-entrepreneurs",
    number: "02",
    title: "Future AI Entrepreneurs Program",
    eyebrow: "HPAIR · Years 10–13",
    partner: "HPAIR",
    tagline: "Think it. Build it. Pitch it.",
    summary: "A rapid venture-building experience in which students discover a meaningful problem, validate it with users and create an AI-enabled solution.",
    description: "A five-day startup journey where students identify a real problem, understand users, create an AI-enabled prototype and present a credible venture concept.",
    outcome: "A tested venture concept, working no-code prototype, business model, marketing plan and investor-style pitch.",
    cardSchedule: [
      "Day 1 · Problem discovery and founder thinking",
      "Day 2 · Customer discovery and idea validation",
      "Day 3 · Vibe coding and prototype creation",
      "Day 4 · Business model, brand and go-to-market",
      "Day 5 · Demo Day pitch",
    ],
    detail: "Pre-program modules prepare students to arrive with the foundations needed to move quickly from an idea to a credible prototype.",
    years: "Years 10–13",
    duration: "5-day intensive program",
    recognition: "Certificate of Participation from HPAIR",
    image: kingsWwwAssets.aiImage,
    brochure: aiBrochureAsset.url,
    outcomes: ["An evidence-led problem and solution statement", "Customer personas and market research", "A working prototype built with AI-assisted tools", "A business model, brand, marketing plan and final pitch"],
    curriculum: [
      { day: "Day 1", title: "Think like a founder", focus: "Discovery", activities: ["Explore entrepreneurship and teen founder case studies", "Use ideation techniques to identify meaningful problems", "Learn customer discovery and build user personas", "Join a live session with a startup founder"], outcome: "A focused problem, user profile and venture direction" },
      { day: "Day 2", title: "Build the idea", focus: "Prototype", activities: ["Understand AI-assisted building and no-code tools", "Complete a hands-on Lovable prototype sprint", "Map how the venture creates and captures value", "Present the first demo for feedback"], outcome: "A first working demo and business model canvas" },
      { day: "Day 3", title: "Build the startup foundation", focus: "Product and brand", activities: ["Apply user-centered product design", "Create the venture identity and brand", "Add advanced prototype features", "Learn practical startup finance foundations"], outcome: "A refined prototype, brand direction and financial foundation" },
      { day: "Day 4", title: "Mock launch and market simulation", focus: "Go to market", activities: ["Develop a clear pitch story", "Test decisions through a market simulation", "Improve the final prototype", "Run a mock launch event"], outcome: "A market-ready concept and rehearsed launch story" },
      { day: "Day 5", title: "Final pitch and Demo Day", focus: "Communication", activities: ["Explore responsible early-stage growth", "Practice and refine the pitch", "Present the final prototype to judges", "Respond to questions and feedback"], outcome: "A complete venture presentation and working demonstration" },
    ],
    extendedTitle: "Preparation before Day 1",
    extendedDescription: "Students receive pre-program video modules so the in-person week can begin with active building rather than introductory theory.",
    extendedItems: ["Introduction to startup thinking", "Problem-solving frameworks", "Beginner guide to AI-assisted building", "Lovable platform walkthroughs", "How to turn an idea into a first prototype quickly"],
    mentorTitle: "Guidance from Harvard student mentors",
    mentorDescription: "Students receive practical guidance, structured feedback and founder perspectives from Harvard student mentors throughout the build and pitch process, with a 1:20 mentor ratio.",
  },
  {
    slug: "social-impact-leaders",
    number: "03",
    title: "HPAIR Social Impact Leaders",
    eyebrow: "HPAIR · Years 10–13",
    partner: "HPAIR",
    tagline: "Real problem. Real people. Real solution.",
    summary: "Students investigate a local challenge, listen to people affected by it and design a practical response grounded in empathy and evidence.",
    description: "Teams choose a genuine issue from their school or community, learn directly from the people affected, test a practical response and present it to adults who can help take it forward.",
    outcome: "A tested social-impact prototype, public pitch and focused 30-day action plan for continued implementation.",
    cardSchedule: [
      "Day 1 · Local challenge research and systems thinking",
      "Day 2 · Empathy interviews and defining the need",
      "Day 3 · Solution design and prototyping",
      "Day 4 · Testing with real users and refinement",
      "Day 5 · Public pitch and 30-day action plan",
    ],
    detail: "The experience is facilitated by Dr Jojo O’Driscoll-Kearny, guiding students from community insight to responsible action.",
    years: "Years 10–13",
    duration: "5 consecutive campus days",
    recognition: "Certificate of Participation from HPAIR",
    image: kingsWwwAssets.heroImage,
    brochure: socialBrochureAsset.url,
    outcomes: ["A locally grounded problem statement backed by real voices", "Evidence from interviews, surveys and observation", "A solution tested with real users and improved through feedback", "A public pitch, 30-day action plan and global challenge entry"],
    curriculum: [
      { day: "Day 1", title: "See the problem", focus: "Systems and empathy", activities: ["Use Five Whys and a Problem Tree", "Form teams around locally relevant issues", "Interview staff and students across the school", "Build a Wall of Voices from what people actually said"], outcome: "A one-sentence problem statement supported by real voices" },
      { day: "Day 2", title: "Understand it deeply", focus: "Research", activities: ["Run surveys, observation and desk research", "Map stakeholders, influence and missing voices", "Question a guest practitioner", "Turn findings into an Insight Board"], outcome: "Three evidence-backed insights" },
      { day: "Day 3", title: "Design the solution", focus: "Making", activities: ["Use How Might We and rapid ideation", "Compare ideas by impact and feasibility", "Complete a Solution Canvas and simple budget", "Build a prototype others can react to"], outcome: "A tangible prototype and one-page budget" },
      { day: "Day 4", title: "Test and iterate", focus: "User feedback", activities: ["Create a test protocol", "Test with ten real users", "Make three evidence-led improvements", "Build and rehearse the five-part pitch"], outcome: "A test log, three changes and first complete pitch" },
      { day: "Day 5", title: "Launch", focus: "Public action", activities: ["Join pitch-coaching clinics", "Complete a dress rehearsal", "Present to teachers, parents and a community leader", "Commit to the next 30 days"], outcome: "A public pitch, recognition and 30-day action card" },
    ],
    extendedTitle: "Issues anchored in the local community",
    extendedDescription: "The school helps localize the issue shortlist before Day 1. Possible themes include climate resilience, food waste, youth wellbeing, inclusion, accessibility, digital wellbeing and the dignity of support staff.",
    extendedItems: ["Every day ends with something made", "Research and testing happen with real people on campus", "The final showcase focuses on the work, not only the certificate", "The project can complement service learning, leadership and wellbeing initiatives"],
    mentorTitle: "Facilitated by Dr Jojo O’Driscoll-Kearny",
    mentorDescription: "Dr Jojo brings experience in leadership, organizational psychology, human-centered design and executive coaching, guiding teams from community insight to practical action.",
  },
  {
    slug: "leadership-communication",
    number: "04",
    title: "HPAIR Leadership & Communication Program",
    eyebrow: "HPAIR · Years 7–9",
    partner: "HPAIR",
    tagline: "Lead with purpose. Speak with confidence.",
    summary: "An active introduction to leadership, public speaking and persuasive communication, built around collaborative challenges and authentic student voice.",
    description: "An immersive program where students practice leadership, public speaking, debate and collaboration while developing a Passion Project they can continue beyond the week.",
    outcome: "A prepared speech, debate experience, mini-conference contribution and personal passion project direction.",
    cardSchedule: [
      "Day 1 · Personal leadership and team dynamics",
      "Day 2 · Public speaking and confident delivery",
      "Day 3 · Speech, debate and persuasion",
      "Day 4 · Mini-conference and collaborative leadership",
      "Day 5 · Passion projects, pathways and networking",
    ],
    years: "Years 7–9",
    duration: "5-day intensive program",
    recognition: "Certificate of Participation from HPAIR",
    image: kingsWwwAssets.leadershipImage,
    brochure: leadershipBrochureAsset.url,
    outcomes: ["A personal Passion Project with a practical implementation direction", "A stronger toolkit for leadership and teamwork", "Public speaking, debate and presentation experience", "First-hand perspectives on college, careers and purposeful networking"],
    curriculum: [
      { day: "Day 1", title: "Launch into leadership", focus: "Purpose and teamwork", activities: ["Analyze leadership through real examples", "Identify world issues strategically", "Compete in a collaborative case challenge", "Identify strengths and possible Passion Project directions"], outcome: "A team leadership experience and initial Passion Project idea" },
      { day: "Day 2", title: "Find your voice", focus: "Public speaking", activities: ["Study the foundations of strong public speaking", "Research and prepare an assigned speech topic", "Take part in speech and debate", "Develop the project’s focus, strategy and goals"], outcome: "A delivered speech and researched project direction" },
      { day: "Day 3", title: "Think, debate, strategize", focus: "Conference skills", activities: ["Learn parliamentary procedure and debate etiquette", "Write and deliver opening speeches", "Join moderated debate sessions", "Meet student mentors for individual project guidance"], outcome: "A mini-conference contribution and mentor-reviewed strategy" },
      { day: "Day 4", title: "Turn strategy into action", focus: "Implementation", activities: ["Draft resolutions and solve problems collaboratively", "Develop the Passion Project brand and communication channels", "Explore budgets, surveys and resource planning", "Refine the project through mentor feedback"], outcome: "A practical implementation and communication plan" },
      { day: "Day 5", title: "From college to careers", focus: "Future readiness", activities: ["Apply leadership and speaking skills to college and career contexts", "Practice interviews and networking", "Join a Harvard College question-and-answer session", "Plan outreach and the next steps for the Passion Project"], outcome: "A presentation-ready Passion Project and continuation plan" },
    ],
    extendedTitle: "The Passion Project thread",
    extendedDescription: "Across all five days, students move from their interests and strengths to a focused initiative that may become a startup, nonprofit project, publication, website, product or school-based campaign.",
    extendedItems: ["Discover a meaningful issue or opportunity", "Research the audience and context", "Develop strategy, goals and identity", "Plan resources and communication", "Begin outreach and implementation"],
    mentorTitle: "Harvard student mentor perspective",
    mentorDescription: "Harvard student mentors share leadership experience, support Passion Project development and offer age-appropriate perspectives on school, college and future pathways at a 1:20 mentor ratio.",
  },
  {
    slug: "junior-venture-challenge",
    number: "05",
    title: "The Junior Venture Challenge",
    eyebrow: "FinLit AI · HPAIR · Years 7–9",
    partner: "FinLit AI · HPAIR",
    tagline: "Build the fund. Tell the money story.",
    summary: "A practical finance adventure using familiar brands, games and analogies to help younger students understand investing and decision-making.",
    description: "Junior Fund Teams learn how money and businesses work by managing a USD 100,000 virtual fund in familiar brands, then presenting their decisions to an Angel Investor panel.",
    outcome: "A USD 100,000 virtual fund, investment rationale and Angel Investor showcase presentation, recognised with a Junior Certificate.",
    cardSchedule: [
      "Day 1 · Money, markets and familiar brands",
      "Day 2 · Research and choosing strong businesses",
      "Day 3 · Building the virtual portfolio",
      "Day 4 · Risk, teamwork and investment stories",
      "Day 5 · Angel Investor showcase",
    ],
    detail: "The five-day experience is followed by a 15-day sprint in which teams watch their virtual portfolios and learn from real market movement.",
    years: "Years 7–9",
    duration: "5 campus days + 15-day live sprint",
    recognition: "Junior Certificate of Venture Excellence",
    image: kingsWwwAssets.ventureImage,
    logo: kingsWwwAssets.finlitLogo,
    brochure: juniorBrochureAsset.url,
    outcomes: ["A USD 100,000 virtual portfolio in familiar real-world businesses", "A Brand Detective card, Basket Map and trade diary", "An age-appropriate understanding of revenue, profit, trends and diversification", "A four-slide money story presented by every team member"],
    curriculum: [
      { day: "Day 1", title: "Money, scarcity and the stock bazaar", focus: "Ownership", activities: ["Explore money, scarcity, supply and demand through games", "Use the pizza-slice analogy to understand shares", "Open a guided MarketWatch account", "Place a first paper trade in a familiar company"], outcome: "A verified virtual fund and first trade" },
      { day: "Day 2", title: "Revenue, profit and strong businesses", focus: "Business basics", activities: ["Move from consumer thinking to owner thinking", "Use a lemonade stand to understand revenue and expenses", "Compare familiar companies through the Brand Detective lab", "Choose two businesses with clear reasons"], outcome: "A Brand Detective card and two supported positions" },
      { day: "Day 3", title: "Trends, rollercoasters and calm decisions", focus: "Market movement", activities: ["Understand why prices move", "Read simple line charts and trendlines", "Explore real charts through a mystery game", "Set safety alerts and write team rules for difficult days"], outcome: "A trend sketch, safety setup and reaction rulebook" },
      { day: "Day 4", title: "The basket rule", focus: "Diversification", activities: ["Learn why a balanced basket matters", "Sort companies into sectors", "Set a 25% maximum for any one company", "Rebalance the fund and complete the trade diary"], outcome: "A balanced Basket Map and fully documented portfolio" },
      { day: "Day 5", title: "Junior showcase and sprint kickoff", focus: "Storytelling", activities: ["Build a clear four-slide money story", "Explain strategy, choices, protection and outlook", "Give every teammate a speaking role", "Present an interim showcase and prepare for the sprint"], outcome: "A reviewed presentation and sprint-ready portfolio" },
    ],
    extendedTitle: "The 15-day sprint and Day 21 showcase",
    extendedDescription: "Teams check their fund once each day after school and join three 45-minute Explorer sessions. On Day 21, every teammate presents to the Angel Investor panel, with learning and resilience valued above raw profit.",
    extendedItems: ["Day 9: Market News Safari", "Mid-sprint: portfolio and trade-diary review", "Day 18: Slide Deck Party and mock questions", "Day 21: Grand Showcase for parents, teachers and the panel", "One Harvard student mentor to every 20 students"],
    mentorTitle: "Harvard student mentors throughout the 21 days",
    mentorDescription: "Mentors lead the games and MarketWatch labs, give feedback after the first showcase, host three virtual check-ins and join the final Angel Investor panel at a 1:20 mentor ratio.",
  },
];

export const kingsProgramsBySlug = Object.fromEntries(
  kingsPrograms.map((program) => [program.slug, program]),
) as Record<string, KingsProgram | undefined>;

export const allYears = [7, 8, 9, 10, 11, 12, 13];

export type YearFilterValue = "all" | "junior" | "senior" | number;

export const yearRange = (years: KingsProgram["years"]): [number, number] =>
  years === "Years 7–9" ? [7, 9] : [10, 13];

export const matchesFilter = (programme: KingsProgram, filter: YearFilterValue): boolean => {
  if (filter === "all") return true;
  if (filter === "junior") return programme.years === "Years 7–9";
  if (filter === "senior") return programme.years === "Years 10–13";
  const [min, max] = yearRange(programme.years);
  return filter >= min && filter <= max;
};
