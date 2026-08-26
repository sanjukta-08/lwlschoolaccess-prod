// Real learner and parent feedback, transcribed from the two master feedback
// sheets (LWL Programs + Summer Camp 2026). Grouped by the programme the
// response came from, with programmeId pointing at the catalogue entry where
// one exists so the quote can also surface on that programme's landing page.

export type LearnerQuote = {
  quote: string;
  /** Optional longer body shown when the card is expanded. */
  more?: string;
  name: string;
  role: "Student" | "Parent";
  /** Programme label as written on the feedback sheet. */
  programme: string;
  /** Catalogue programme id, when this maps to a listed programme. */
  programmeId?: string;
  /** True for the residential Summer Camp 2026 programmes. */
  camp?: boolean;
};

export const LEARNER_QUOTES: LearnerQuote[] = [
  /* ---------------- Future Doctors ---------------- */
  {
    quote:
      "The session was interactive and I enjoyed being able to participate in activities and answer questions. The role-playing exercises made learning about different medical specialties interesting and engaging.",
    name: "Nyla P.",
    role: "Student",
    programme: "Future Doctors, Batch 2",
    programmeId: "fdf",
  },
  {
    quote:
      "I acquired new knowledge in the 4 ethical pillars of medicine. It was an engaging session, I enjoyed hearing everyone's perspectives on how they would approach different scenarios.",
    more: "I would also like to commend my mentor, Elizabeth, for encouraging us to express our responses verbally.",
    name: "Khadija S.",
    role: "Student",
    programme: "Future Doctors, Batch 2",
    programmeId: "fdf",
  },
  {
    quote:
      "I really appreciated Simran's presentation, as it provided an accurate look at medical truths versus myths. I especially enjoyed the slides covering a typical daily routine and the triage process.",
    name: "Elena Z.",
    role: "Student",
    programme: "Future Doctors, Batch 2",
    programmeId: "fdf",
  },
  {
    quote:
      "I received more clarity on the project, how it should be formatted, and I got to ask my mentor questions regarding the project at the end. My mentor Chloe has been super helpful and I am so thankful.",
    name: "Brittanae M.",
    role: "Student",
    programme: "Future Doctors, Batch 2",
    programmeId: "fdf",
  },
  {
    quote:
      "This session was really fun and interesting because I liked learning about ethics and the hard decisions doctors have to make. I also learned about how there are systems and laws in hospitals about who gets prioritized.",
    name: "Catherine L.",
    role: "Student",
    programme: "Future Doctors, Batch 2",
    programmeId: "fdf",
  },
  {
    quote:
      "Both mentors were quick but clear with explanations and encouraged participation throughout the session.",
    name: "Satya Pranavi A.",
    role: "Student",
    programme: "Future Doctors, Batch 2",
    programmeId: "fdf",
  },
  {
    quote:
      "The lessons are fun and interactive, and the recorded sessions are amazing. It helps to recover the missed information from the last session.",
    name: "Diekololaoluwa A.",
    role: "Student",
    programme: "Future Doctors, Batch 2",
    programmeId: "fdf",
  },
  {
    quote:
      "I've learned a lot so far on how tricky some diagnosis can be when being a doctor.",
    name: "Vanessa S.",
    role: "Student",
    programme: "Future Doctors, Batch 2",
    programmeId: "fdf",
  },
  {
    quote:
      "It was really interesting to hear about the different types of medical fields.",
    name: "Sadie M.",
    role: "Student",
    programme: "Future Doctors, Batch 2",
    programmeId: "fdf",
  },
  {
    quote:
      "I loved the session, and enjoyed how we played roleplay, and put ourselves in the shoes of different types of doctors. Not only did it increase my passion in medicine, but it gave me a deeper understanding of how being a medical doctor is.",
    name: "Ivanna A.",
    role: "Student",
    programme: "Future Doctors, Batch 1",
    programmeId: "fd1",
  },
  {
    quote:
      "I really enjoyed this session. I learned a lot of new helpful information, and my mentor really explained everything well. I can't wait for the next session!",
    name: "Ava K.",
    role: "Student",
    programme: "Future Doctors, Batch 1",
    programmeId: "fd1",
  },
  {
    quote:
      "I enjoyed how the slides weren't just informational, but allowed for engaging conversations which helped us to learn more about the topics discussed.",
    name: "Adhithi B.",
    role: "Student",
    programme: "Future Doctors, Batch 1",
    programmeId: "fd1",
  },
  {
    quote:
      "I learned more about the reality of being a doctor and what it takes to be one.",
    name: "Daniel E.",
    role: "Student",
    programme: "Future Doctors, Batch 1",
    programmeId: "fd1",
  },

  /* ---------------- AI pathway / Future AI Leaders ---------------- */
  {
    quote:
      "Biggest takeaway: integrations are never as simple as just connect the API. Every one I added hit a real constraint I had to solve first.",
    more: "Auth had to come back for Calendar, Apple Health wasn't reachable from a web app so I pivoted to Oura, and even weather needed a provider decision. The setup was often harder than the actual feature. I also learned it's implemented isn't the same as it works, a couple of times something was technically built but had a gap I only caught by testing it myself. The usability heuristics helped too, I'd already built some of that instinctively and the framework helped me build on it more intentionally.",
    name: "Fatma A.",
    role: "Student",
    programme: "Onward AI Pathway",
    programmeId: "ail",
  },
  {
    quote:
      "My biggest takeaway from this program was learning how to turn a simple idea into an actual project. I learned how to think about a real problem, come up with a useful solution, and use AI and vibe coding to bring my idea to life.",
    name: "Aisha Saif A.",
    role: "Student",
    programme: "Onward AI Pathway",
    programmeId: "ail",
  },
  {
    quote:
      "I really enjoyed this program as I feel that I was able to learn a lot more about AI tools, which gave me the opportunity to deepen my understanding of technology. The mentors always gave interactive sessions that helped me stay focused at all times.",
    name: "Heidy Yasmín T.",
    role: "Student",
    programme: "Onward AI Pathway",
    programmeId: "ail",
  },
  {
    quote:
      "The powerpoints and way of teaching was very informative as well as effective and interactive, leaving room for the student to explore and create implementing the skills just learnt.",
    name: "Rateel D.",
    role: "Student",
    programme: "Onward AI Pathway",
    programmeId: "ail",
  },
  {
    quote:
      "I really really liked my mentor, she was incredibly kind and warm and had such a friendly vibe!",
    name: "Kenda",
    role: "Student",
    programme: "Onward AI Pathway",
    programmeId: "ail",
  },
  {
    quote: "This program is worth the time and investment.",
    name: "Wentong F.",
    role: "Student",
    programme: "Future AI Leaders Fellowship",
    programmeId: "ail",
  },
  {
    quote:
      "I feel that I have learned a lot during these sessions. The mentor makes the class engaging and fun which I really enjoy as it helps me stay focused.",
    name: "Heidy Yasmín T.",
    role: "Student",
    programme: "Future AI Leaders Fellowship",
    programmeId: "ail",
  },
  {
    quote:
      "I really enjoyed the program and learned a lot about AI, prompt engineering, and building websites. It was fun working on a real project and learning new skills.",
    name: "Salamah A.",
    role: "Student",
    programme: "ADNOC Cohort 1",
    programmeId: "ail",
  },
  {
    quote:
      "The session was very helpful, showing us step by step what we are supposed to do with simple words which made everything clear. I knew nothing about coding, and it was easily explained to me with examples of integrations.",
    name: "Fareda O.",
    role: "Student",
    programme: "ADNOC Cohort 2",
    programmeId: "ail",
  },
  {
    quote: "I love how easy and quick the session was and how interactive it was.",
    name: "Laila",
    role: "Student",
    programme: "ADNOC Cohort 1",
    programmeId: "ail",
  },
  {
    quote:
      "It was really fun and I learned a lot of things in general. At first I was not sure, but after just one session I got encouraged.",
    name: "Hala",
    role: "Student",
    programme: "ADNOC Cohort 1",
    programmeId: "ail",
  },
  {
    quote:
      "She was amazing, she helps out and tries to find other solutions if we had a problem.",
    name: "Ammar",
    role: "Student",
    programme: "ADNOC Cohort 1",
    programmeId: "ail",
  },
  {
    quote:
      "I really enjoy the way my mentor encourages all of us to participate. It motivates people to step up and discuss what is being taught, and I find this a very effective way of helping both peers and students better understand the topics.",
    name: "Antonio La M.",
    role: "Student",
    programme: "EDGE AI",
    programmeId: "ail",
  },

  /* ---------------- Financial literacy ---------------- */
  {
    quote: "The sessions were very engaging and informative.",
    name: "Vaishmita K.",
    role: "Student",
    programme: "Financial Literacy Programme",
    programmeId: "finlit",
  },
  {
    quote: "Best class I ever had.",
    name: "Neer",
    role: "Student",
    programme: "Financial Literacy Programme",
    programmeId: "finlit",
  },

  /* ---------------- Onward fellowship cohorts ---------------- */
  {
    quote:
      "My biggest takeaway was learning how AI can be used to solve real world problems and turn ideas into solutions.",
    name: "Alisa Chiba N.",
    role: "Student",
    programme: "Onward, Batch 4",
    programmeId: "onw",
  },
  {
    quote:
      "I like how encouraging and inclusive the mentor is. Her lessons were insightful, especially breaking the awkward atmosphere and implementing public speaking by allowing us a chance to present our pitch, ideas and product in breakout rooms and the main room.",
    name: "Athenaette N.",
    role: "Student",
    programme: "Onward, Batch 4",
    programmeId: "onw",
  },
  {
    quote:
      "The session was interesting and helpful. I now have a better understanding of how AI can be used in entrepreneurship, and the mentor explained everything well.",
    name: "Nikita",
    role: "Student",
    programme: "Onward, Batch 4",
    programmeId: "onw",
  },
  {
    quote:
      "I grasped many new concepts during our first session, the importance of STEM and how to judge the effectiveness of methods to cope with basic issues. We also got introduced to our mentors and peers.",
    name: "Mohammed Abdullah A.",
    role: "Student",
    programme: "Onward, Batch 4",
    programmeId: "onw",
  },
  {
    quote: "I loved how we were able to have ethical debates and discussions.",
    name: "Mariam Abdul J.",
    role: "Student",
    programme: "Onward, Batch 4",
    programmeId: "onw",
  },
  {
    quote:
      "The mentor was great, extremely supportive, and most importantly very understanding. She knows how to keep the sessions entertaining and initiate fun discussions with us.",
    name: "Jana E.",
    role: "Student",
    programme: "Onward, Batch 4",
    programmeId: "onw",
  },
  {
    quote:
      "It was very informative and the biggest takeaway is that I didn't get bored. I was really engaged.",
    name: "Tristan Paul V.",
    role: "Student",
    programme: "Onward, Batch 4",
    programmeId: "onw",
  },
  {
    quote:
      "The way entrepreneurship was explained along with what it takes to become an entrepreneur was a very crucial part which was explained really well, and is one of my key takeaways of the session.",
    name: "Tanaya",
    role: "Student",
    programme: "Onward, Batch 5",
    programmeId: "fef",
  },
  {
    quote:
      "The paired group pitch practices really are helpful in preparation for presenting in front of everyone else. Learning to speak confidently and take time to reflect on yourself.",
    name: "Michelle S.",
    role: "Student",
    programme: "Onward, Batch 5",
    programmeId: "fef",
  },
  {
    quote:
      "Proper constructive feedback on how to improve my pitch during demo day from both Tsion and my peers, and encouragement to speak up.",
    name: "Lulu M.",
    role: "Student",
    programme: "Onward, Batch 5",
    programmeId: "fef",
  },
  {
    quote:
      "I love how she keeps us engaged in the sessions and gives one on one feedback every time she asks each of us a question.",
    name: "Shifa N.",
    role: "Student",
    programme: "Onward, Batch 5",
    programmeId: "fef",
  },
  {
    quote:
      "I really liked all the sessions we've had and it has helped me a lot to discover new interests in sustainability, AI and STEM areas.",
    name: "Constanza A.",
    role: "Student",
    programme: "Onward, Batch 3",
    programmeId: "onw",
  },
  {
    quote:
      "My takeaway was that I got a deeper understanding about STEM, and I realised it's more than just robotics or inventing something new.",
    name: "Vedika S.",
    role: "Student",
    programme: "Onward, Batch 2",
    programmeId: "onw",
  },
  {
    quote:
      "I liked the session a lot. I feel more confident now and I am participating more in class by speaking and sharing my ideas.",
    name: "Helena M.",
    role: "Student",
    programme: "Onward, Batch 2",
    programmeId: "onw",
  },
  {
    quote:
      "I learned that research is important for almost all things because it allows you to take in more information to make an informed decision.",
    name: "Areli F.",
    role: "Student",
    programme: "Onward, Batch 2",
    programmeId: "onw",
  },
  {
    quote: "Very informative and engaging session.",
    name: "Muhammad Ibrahim O.",
    role: "Student",
    programme: "Onward, Batch 1",
    programmeId: "onw",
  },
  {
    quote: "Building with AI is fun.",
    name: "Hamdan F.",
    role: "Student",
    programme: "Onward, Batch 1",
    programmeId: "onw",
  },

  /* ---------------- Summer Camp 2026 ---------------- */
  {
    quote:
      "As a parent, I was deeply impressed by the exceptional quality of the Yale Global Diplomacy Programme, the calibre of the mentors, and the depth of the themes they tackled.",
    more: "These were not abstract exercises; the topics were anchored in the immediate economic, social and political realities of our world, which is exactly the kind of grounding a young person needs to grow into a thinking, responsible global citizen. My daughter came home not only more knowledgeable, but more confident, more curious, and more aware of how complex and interconnected real decisions are. This is education at its most fundamental, shaping perspective, character and judgement, not just knowledge. Hats off to Learn with Leaders and Yale.",
    name: "Andrei O., Bucharest",
    role: "Parent",
    programme: "Yale Global Diplomacy Programme",
    programmeId: "wla",
    camp: true,
  },
  {
    quote:
      "As a parent, I am truly impressed by how this program deepened my daughter's interest in global issues, leadership, and making a meaningful impact.",
    more: "In such a short period, she gained a broader perspective on the world and developed a greater understanding of the social challenges we face today. More importantly, we witnessed her leadership skills grow through the experience. It gave us a glimpse of the kind of leader she is becoming. Learning alongside students from different parts of the world also enriched the experience, exposing her to diverse perspectives, cultures, and ideas.",
    name: "Helga Antoinette V.",
    role: "Parent",
    programme: "Yale Global Diplomacy Programme",
    programmeId: "wla",
    camp: true,
  },
  {
    quote:
      "The Yale Global Diplomacy Program taught me how to interact with people on an international scale.",
    name: "Levi M.",
    role: "Student",
    programme: "Yale Global Diplomacy Programme",
    programmeId: "wla",
    camp: true,
  },
  {
    quote:
      "During my time at the Harvard College Union Society, I developed a wide range of skills, from strengthening my research abilities to learning how to communicate effectively and build meaningful connections.",
    more: "What made the program truly unforgettable was the people I had the opportunity to learn from and alongside. Being surrounded by inspiring mentors and students from diverse backgrounds challenged me to grow, broaden my perspective, and appreciate the value of connecting with others despite our differences.",
    name: "Rateel D.",
    role: "Student",
    programme: "HCUS Young Global Leaders",
    camp: true,
  },
  {
    quote:
      "My experience at the HCUS Young Global Leaders Program was just amazing. I learned crucial skills such as leadership, teamwork, and public speaking while challenging myself to step outside my comfort zone.",
    more: "One of my proudest moments at the program was winning the Individual Speech Winner award, which gave me even more confidence in my communication skills. Beyond the learning, I made great friends from different backgrounds and countries and created wonderful memories that I will always remember.",
    name: "Fabian Emilio D.",
    role: "Student",
    programme: "HCUS Young Global Leaders",
    camp: true,
  },
  {
    quote:
      "I came in not knowing what intellectual vitality truly meant, and left understanding what open inquiry can do for a person. It broadened how I think and made me more willing to sit with ideas I don't necessarily agree with.",
    name: "Jose C.",
    role: "Student",
    programme: "HCUS Young Global Leaders",
    camp: true,
  },
  {
    quote:
      "The Young Global Leaders Program was an amazing experience. I learned a lot from the classes, especially public speaking, leadership, teamwork and AI, and enjoyed working with my group on our public policy proposal.",
    more: "One of my favourite parts was meeting people from different countries and making friends from all over the world. I would definitely recommend this program to other students because it is both educational and fun.",
    name: "Saurav Sachen S.",
    role: "Student",
    programme: "HCUS Young Global Leaders",
    camp: true,
  },
  {
    quote:
      "HCUS summer camp was an amazing experience! It was incredible to be working with students from all around the world on an issue we all care about. My public speaking skills have improved.",
    name: "Chloe Tran L.",
    role: "Student",
    programme: "HCUS Young Global Leaders",
    camp: true,
  },
  {
    quote:
      "It was one of the best programs I've ever attended. Countless memories made, bonds built and skills acquired. Only wish is it should have been longer.",
    name: "Walter Myles O.",
    role: "Student",
    programme: "HCUS Young Global Leaders",
    camp: true,
  },
  {
    quote:
      "The HCUS summer program opened my mind to the lives of Ivy League students. By being in the presence of Harvard students I learned that they are ordinary people in an extraordinary establishment.",
    name: "Wesley Uriah T.",
    role: "Student",
    programme: "HCUS Young Global Leaders",
    camp: true,
  },
  {
    quote:
      "The camp was not just an incredible way to learn new skills and work with others, it was a great way to make new friends. I made such amazing friends and created unforgettable memories.",
    name: "Anna-Sophia S.",
    role: "Student",
    programme: "HCUS Young Global Leaders",
    camp: true,
  },
  {
    quote:
      "I believe the HCUS summer camp was a very fun and engaging program that gave students a great opportunity to learn and develop.",
    name: "Nathan Ryu A.",
    role: "Student",
    programme: "HCUS Young Global Leaders",
    camp: true,
  },
  {
    quote:
      "When I first signed up I was nervous as it was my first camp and I didn't know anyone, but a chaperone greeted me immediately and made me feel comfortable and confident.",
    more: "When all of the students got together we all got along really well, and quite quickly we talked and played games. The visits to the different organisations were really interesting and interactive; at first I was scared it was going to be just a lecture, but it was more of a conversation where we got to ask questions. We saw so many interesting places that I really enjoyed, like CERN and Chamonix. Overall this trip created memories I'll never forget. I would definitely do this again.",
    name: "Safa B.",
    role: "Student",
    programme: "FUSI Geneva",
    camp: true,
  },
  {
    quote:
      "This experience was truly unforgettable. From the incredible academic opportunities to the lifelong friendships I have made from all over the world, I would not change a thing!",
    name: "Brielle B.",
    role: "Student",
    programme: "FUSI Geneva",
    camp: true,
  },
  {
    quote:
      "Taking part in the Cambridge Business School seminar was such a great experience. What I enjoyed most was that it wasn't just sitting and listening; we were encouraged to share our ideas, work with other students and solve problems.",
    more: "I also really enjoyed meeting students from different backgrounds and hearing their perspectives. As a high school student still figuring out exactly what I want to do, the seminar gave me a lot more confidence in my interest in business and entrepreneurship. I left feeling inspired, more confident, and motivated to keep learning.",
    name: "Gnangoran Affoua Cecilia R.",
    role: "Student",
    programme: "IGNITE Cambridge",
    camp: true,
  },
  {
    quote:
      "This program really helped me put myself out there. It genuinely gave me more confidence to speak in front of an audience, lead and work well with a group, and increased my ability to be independent.",
    name: "Oriane B.",
    role: "Student",
    programme: "IGNITE Cambridge",
    camp: true,
  },
  {
    quote:
      "I had a really amazing time and learned a lot. Not only did it help me understand how businesses and startups operate, but the importance of communication and collaboration with others.",
    name: "Mompati Otsile M.",
    role: "Student",
    programme: "IGNITE Cambridge",
    camp: true,
  },
  {
    quote:
      "In the beginning of this program nobody knew each other, but in the end we were as close as family members and we didn't want to leave each other.",
    name: "Mohammed Majed A.",
    role: "Student",
    programme: "IGNITE Cambridge",
    camp: true,
  },
];

export const ONLINE_QUOTES = LEARNER_QUOTES.filter((q) => !q.camp);
export const CAMP_QUOTES = LEARNER_QUOTES.filter((q) => q.camp);

/** Quotes tied to a catalogue programme id, for the programme landing pages. */
export const quotesForProgramme = (id: string) =>
  LEARNER_QUOTES.filter((q) => q.programmeId === id);

/** Quotes grouped by the programme label on the feedback sheet, in source order. */
export function groupedQuotes(list: LearnerQuote[] = LEARNER_QUOTES) {
  const groups = new Map<string, LearnerQuote[]>();
  for (const q of list) {
    const arr = groups.get(q.programme);
    if (arr) arr.push(q);
    else groups.set(q.programme, [q]);
  }
  return [...groups.entries()].map(([programme, quotes]) => ({ programme, quotes }));
}
