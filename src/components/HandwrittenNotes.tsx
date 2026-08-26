import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";

import faris from "@/assets/note-faris.jpg.asset.json";
import retaj from "@/assets/note-retaj.jpg.asset.json";
import fatima from "@/assets/note-fatima.jpg.asset.json";
import marya from "@/assets/note-marya.jpg.asset.json";
import maria from "@/assets/note-maria.jpg.asset.json";
import prof from "@/assets/note-prof.jpg.asset.json";
import hoor from "@/assets/note-hoor.jpg.asset.json";
import luqman from "@/assets/note-luqman.jpg.asset.json";

type Note = {
  src: string;
  name: string;
  quote: string;
  transcript: string;
  tilt: string;
};

const NOTES: Note[] = [
  {
    src: faris.url,
    name: "Faris Salim Al-Harthi",
    quote:
      "Thank you so much Dr. Jojo. We appreciate your mentorship. I am so happy that I chose this course.",
    transcript:
      "I have learned a lot of things that I will hopefully use in the future.",
    tilt: "-rotate-2",
  },
  {
    src: fatima.url,
    name: "Fatima",
    quote:
      "You're pretty inside out. Thank you prof Jojo, I really appreciate you supporting me.",
    transcript:
      "Being with me, calming me and understanding my anxiety. You're such a good role-model and I hope to join your other workshops.",
    tilt: "rotate-2",
  },
  {
    src: retaj.url,
    name: "Retaj Al-Hussein",
    quote:
      "Dr. Jojo, thank you for coming - you really inspired me to keep going even if I fail.",
    transcript:
      "Hearing it from you, a very successful person, changed my view. Thank you to all the teachers and people who helped make this programme possible.",
    tilt: "-rotate-1",
  },
  {
    src: luqman.url,
    name: "Luqman Al-Habsi",
    quote:
      "Dr. Jojo, you did a great job. I'm very happy that I joined the course and recommended my friend Faris.",
    transcript:
      "I really appreciate you giving us your emails and contact - it shows you love students and want us to genuinely grow, beyond the course.",
    tilt: "rotate-1",
  },
  {
    src: maria.url,
    name: "Maria Plummer",
    quote:
      "Thank you for teaching me in this programme. I learned to be confident while doing a pitch.",
    transcript:
      "A note written on the final day of the cohort, after presenting a first pitch to the room.",
    tilt: "-rotate-3",
  },
  {
    src: hoor.url,
    name: "Hoor Khalid",
    quote:
      "She's been so kind and patient. She made this programme fun and exciting.",
    transcript:
      "I'm really thankful to experience this - written by a student on behalf of her cohort.",
    tilt: "rotate-2",
  },
  {
    src: marya.url,
    name: "Marya Mohamed Ali",
    quote:
      "Thank you for teaching me in this programme and everything you did for us.",
    transcript:
      "I wish you the best day and a good flight - and a good thanks for the certificate today.",
    tilt: "rotate-1",
  },
  {
    src: prof.url,
    name: "A cohort graduate",
    quote:
      "Thank you prof Jojo for coming out of your way for us despite the challenges you faced.",
    transcript:
      "Your guidance, patience and kindness will forever be remembered.",
    tilt: "-rotate-2",
  },
];

export default function HandwrittenNotes() {
  const [open, setOpen] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = open === null ? null : NOTES[open];
  const loop = [...NOTES, ...NOTES];

  return (
    <div>
      <div className="px-5">
        <SectionHeading
          eyebrow="In their own handwriting"
          sub="Notes students pressed into our hands at the end of Dr Jojo's programme. Tap a card to read it."
        >
          From the <span className="text-crimson">heart</span> of the cohort
        </SectionHeading>
        <div className="gold-rule mx-auto mt-3 h-px w-24" />
      </div>

      <div
        className="relative mt-7 overflow-hidden px-5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="note-marquee-track flex w-max gap-8 py-4"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {loop.map((note, i) => (
            <figure
              key={`${note.src}-${i}`}
              className="group relative m-0 w-[19rem] shrink-0 sm:w-[23rem]"
            >
              <button
                type="button"
                onClick={() => setOpen(NOTES.indexOf(note))}
                className="relative block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
                aria-label={`Read the note from ${note.name}`}
              >
                <span className="pointer-events-none absolute -inset-2 translate-x-2 translate-y-2 rounded-sm border border-gold-line" />
                <span
                  className={`relative block overflow-hidden bg-ink p-2.5 shadow-lift ring-8 ring-paper/40 transition-transform duration-500 ${note.tilt} group-hover:-translate-y-2 group-hover:rotate-0`}
                >
                  <img
                    src={note.src}
                    alt={`Handwritten thank-you note from ${note.name}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </span>
              </button>
              <figcaption className="mt-4 px-1">
                <p className="font-serif text-[0.98rem] leading-snug italic text-ink">
                  “{note.quote}”
                </p>
                <p className="mono-label mt-2 text-crimson">{note.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <p className="mono-label mt-4 text-center text-ink-soft">
        &nbsp;HOVER TO PAUSE, TAP ANY NOTE TO READ IT
      </p>


      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Note from ${active.name}`}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-5 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-[900px] overflow-auto rounded-[18px] border border-gold-line bg-paper p-5 md:p-7"
          >
            <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
              <img
                src={active.src}
                alt={`Handwritten thank-you note from ${active.name}`}
                className="w-full rounded-md object-contain shadow-soft"
              />
              <div>
                <p className="mono-label text-gold">Handwritten note</p>
                <p className="mt-3 font-serif text-[1.25rem] leading-snug italic">
                  “{active.quote}”
                </p>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-soft">
                  {active.transcript}
                </p>
                <p className="mono-label mt-5 text-crimson">{active.name}</p>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="mt-7 rounded-full bg-crimson px-6 py-3 text-[0.88rem] font-bold text-paper transition-colors hover:bg-crimson-deep"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
