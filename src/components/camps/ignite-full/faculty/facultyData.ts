const annImg = "/__l5e/assets-v1/21b503f1-bc86-4429-81cf-24982f108b19/faculty-ann-new.jpg";
const moniqueImg = "/__l5e/assets-v1/b5b366ae-14cb-4c62-9083-7239865cc3dd/faculty-monique-new.webp";
const simonImg = "/__l5e/assets-v1/862e2bb6-0b22-4998-a47e-09244371185a/faculty-simon.webp";
const daniilImg = "/__l5e/assets-v1/0257b9c7-eb68-47b8-964e-b30aa1706a86/faculty-daniil.webp";
const hamidImg = "/__l5e/assets-v1/8ce91bcd-2eaa-4f2b-bebf-55b9758ba4c0/faculty-hamid.webp";
const michaelImg = "/__l5e/assets-v1/6f4b5285-1601-48a1-bb3a-804ad5a23043/faculty-michael.webp";
const andrewImg = "/__l5e/assets-v1/04919109-3d4d-4948-9b3d-b778fb74723c/faculty-andrew.webp";

export type Faculty = {
  name: string;
  credentials: string;
  title: string;
  bio: string;
  image: string;
  objectPosition: string;
};

export const faculty: Faculty[] = [
  {
    name: "Ann Davidson",
    credentials: "LLB (Hons) PGDip Legal Practice, MBA",
    title: "Head of Entrepreneurship Centre",
    bio: "Ann is Head of Practice at the Entrepreneurship Centre, working across the Accelerate, Ignite, Venture Creation and Envision programmes. Prior to joining the Centre, she was Enterprise Programme Director at the Scottish Institute for Enterprise, working across all Scottish Universities and Colleges to kickstart and support entrepreneurship and innovation.\n\nHer areas of interest include helping new founders develop a purpose-led venture, identifying and working with company values and prototyping and iterating into your value proposition. She is also a certified Design Futurist and Foresight Practitioner with expertise in helping ventures design and operate resilient, sustainable, and innovative business models.",
    image: annImg,
    objectPosition: "center 15%",
  },
  {
    name: "Dr Monique Boddington",
    credentials: "Management Practice",
    title: "Associate Professor, CJBS · Director of the MSt in Entrepreneurship programme",
    bio: "Monique's research interests include entrepreneurship, lean startup and pivoting, gender, application of sociological approaches to broaden understanding of entrepreneurial activity, and entrepreneurial strategy. She is passionate about understanding how research can improve the delivery and impact of entrepreneurship education to educate the next generation of entrepreneurs.",
    image: moniqueImg,
    objectPosition: "center 15%",
  },
  {
    name: "Simon Stockley",
    credentials: "Management Practice",
    title: "Associate Professor, CJBS",
    bio: "Simon's research interests include entrepreneurship education, technology ventures, and entrepreneurial behaviour. He previously spent 10 years at Imperial College Business School as director of the full-time MBA programme and a principal teaching fellow. Simon's MBA course in entrepreneurship was ranked 3rd in the world by the Financial Times.\n\nOutside work, he is a social entrepreneur and holds several non-executive directorships and has advised over 100 technology startups.",
    image: simonImg,
    objectPosition: "center 15%",
  },
  {
    name: "Daniil Shcherbakov",
    credentials: "",
    title: "Co-Founder & Chief Revenue Officer, Libi & Daughters",
    bio: "Daniil is an experienced venture builder with over 12 years launching and scaling technology startups worldwide. Holding an MBA from Cambridge Judge Business School, he has distributed over 50,000 VR headsets via Best Buy and Amazon, expanded Radario into the US and UK, co-founded luxury skincare brand Libi & Daughters, and secured over £3.5 million in funding. He actively mentors startup founders through Barclays Eagle Labs, LSE Generate, and Accelerate Cambridge.",
    image: daniilImg,
    objectPosition: "center 15%",
  },
  {
    name: "Dr Hamid Hashemi",
    credentials: "",
    title: "CEO of school.how",
    bio: "Dr Hamid Hashemi has 20 years of experience providing career advice, university guidance, and professional qualifications support. He is the founder of a leading educational consultancy with offices in London, the Middle East, and Asia. Trained as a Neuroscientist, Lawyer, and Careers Advisor in the UK, Hamid is currently the founder of school.how — a global online school providing children ages 5–19 with accessible, personalised learning.",
    image: hamidImg,
    objectPosition: "center 15%",
  },
  {
    name: "Michael Grange",
    credentials: "",
    title: "CEO at Parker Veese Limited",
    bio: "Michael Grange is an experienced professional specialising in artificial intelligence, entrepreneurship, and leadership development. With a proven track record in mentoring, coaching, and venture advising, he has guided numerous entrepreneurs in launching and scaling innovative businesses. His expertise spans strategic innovation, startup ecosystems, and technology-driven transformation.",
    image: michaelImg,
    objectPosition: "center 15%",
  },
  {
    name: "Andrew Hatcher",
    credentials: "",
    title: "Managing Director, The Applied Knowledge Network Limited · Entrepreneur and Mentor",
    bio: "Andrew is a seasoned entrepreneur, investor, and advisor with a proven track record driving innovation across diverse sectors. From his early career at Reuters to leading an Asian-based Internet trading spin-out as CEO, he has founded and scaled numerous companies. A mentor at Cambridge Judge Business School and London Business School, Andrew specialises in strategy development, proposition refinement, and strategic marketing.",
    image: andrewImg,
    objectPosition: "center 15%",
  },
];

export const sectionHeader = {
  title: "Teaching & Workshops",
  italic: "Contributors",
  lead: "Learn from world-class faculty, seasoned entrepreneurs, and industry leaders from Cambridge Judge Business School.",
};
