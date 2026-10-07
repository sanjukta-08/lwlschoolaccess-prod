import faris from "@/assets/note-faris.webp.asset.json";
import retaj from "@/assets/note-retaj.webp.asset.json";
import fatima from "@/assets/note-fatima.webp.asset.json";
import marya from "@/assets/note-marya.webp.asset.json";
import maria from "@/assets/note-maria.webp.asset.json";
import prof from "@/assets/note-prof.webp.asset.json";
import hoor from "@/assets/note-hoor.webp.asset.json";
import luqman from "@/assets/note-luqman.webp.asset.json";

import type { TrackKey } from "@/lib/programmes";

export type HandwrittenNote = {
  id: string;
  src: string;
  name: string;
  quote: string;
  transcript: string;
  tilt: string;
  /** Programme label the note was written in. */
  programme: string;
  tracks: TrackKey[];
};

/** Notes students handed in at the end of Dr Jojo's leadership programme. */
export const HANDWRITTEN_NOTES: HandwrittenNote[] = [
  {
    id: "note-faris",
    src: faris.url,
    name: "Faris Salim Al-Harthi",
    quote:
      "Thank you so much Dr. Jojo. We appreciate your mentorship. I am so happy that I chose this course.",
    transcript: "I have learned a lot of things that I will hopefully use in the future.",
    tilt: "-rotate-2",
    programme: "Communication & Leadership Programme",
    tracks: ["law", "lead"],
  },
  {
    id: "note-fatima",
    src: fatima.url,
    name: "Fatima",
    quote: "You're pretty inside out. Thank you prof Jojo, I really appreciate you supporting me.",
    transcript:
      "Being with me, calming me and understanding my anxiety. You're such a good role-model and I hope to join your other workshops.",
    tilt: "rotate-2",
    programme: "Communication & Leadership Programme",
    tracks: ["law", "lead"],
  },
  {
    id: "note-retaj",
    src: retaj.url,
    name: "Retaj Al-Hussein",
    quote: "Dr. Jojo, thank you for coming - you really inspired me to keep going even if I fail.",
    transcript:
      "Hearing it from you, a very successful person, changed my view. Thank you to all the teachers and people who helped make this programme possible.",
    tilt: "-rotate-1",
    programme: "Communication & Leadership Programme",
    tracks: ["lead"],
  },
  {
    id: "note-luqman",
    src: luqman.url,
    name: "Luqman Al-Habsi",
    quote:
      "Dr. Jojo, you did a great job. I'm very happy that I joined the course and recommended my friend Faris.",
    transcript:
      "I really appreciate you giving us your emails and contact - it shows you love students and want us to genuinely grow, beyond the course.",
    tilt: "rotate-1",
    programme: "Communication & Leadership Programme",
    tracks: ["lead"],
  },
  {
    id: "note-maria",
    src: maria.url,
    name: "Maria Plummer",
    quote:
      "Thank you for teaching me in this programme. I learned to be confident while doing a pitch.",
    transcript:
      "A note written on the final day of the cohort, after presenting a first pitch to the room.",
    tilt: "-rotate-3",
    programme: "Communication & Leadership Programme",
    tracks: ["law", "lead"],
  },
  {
    id: "note-hoor",
    src: hoor.url,
    name: "Hoor Khalid",
    quote: "She's been so kind and patient. She made this programme fun and exciting.",
    transcript:
      "I'm really thankful to experience this - written by a student on behalf of her cohort.",
    tilt: "rotate-2",
    programme: "Communication & Leadership Programme",
    tracks: ["lead"],
  },
  {
    id: "note-marya",
    src: marya.url,
    name: "Marya Mohamed Ali",
    quote: "Thank you for teaching me in this programme and everything you did for us.",
    transcript:
      "I wish you the best day and a good flight - and a good thanks for the certificate today.",
    tilt: "rotate-1",
    programme: "Communication & Leadership Programme",
    tracks: ["lead"],
  },
  {
    id: "note-prof",
    src: prof.url,
    name: "A cohort graduate",
    quote:
      "Thank you prof Jojo for coming out of your way for us despite the challenges you faced.",
    transcript: "Your guidance, patience and kindness will forever be remembered.",
    tilt: "-rotate-2",
    programme: "Communication & Leadership Programme",
    tracks: ["lead"],
  },
];
