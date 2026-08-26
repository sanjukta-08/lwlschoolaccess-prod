import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";

import { HANDWRITTEN_NOTES } from "@/lib/handwritten-notes";
import type { HandwrittenNote as Note } from "@/lib/handwritten-notes";

const NOTES: Note[] = HANDWRITTEN_NOTES;

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
  const track = [...NOTES, ...NOTES];

  return (
    <div>
      <div className="px-5">
        <SectionHeading
          eyebrow="In their own handwriting"
          sub="Notes students pressed into our hands at the end of Dr Jojo's programme. Tap a card to read it."
        >
          From the <span className="text-crimson">heart</span> of the cohort
        </SectionHeading>
      </div>

      <div
        className="relative mt-4 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="note-marquee-track flex w-max gap-7 px-5 py-4"
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          {track.map((note, i) => {
            const index = i % NOTES.length;
            return (
              <figure
                key={`${note.src}-${i}`}
                className="group relative m-0 w-[260px] shrink-0 sm:w-[300px]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  className="relative block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
                  aria-label={`Read the note from ${note.name}`}
                >
                  <span className="pointer-events-none absolute -inset-2 translate-x-2 translate-y-2 rounded-sm border border-gold-line" />
                  <span
                    className={`relative block overflow-hidden bg-ink p-2 shadow-lift ring-8 ring-paper/40 transition-transform duration-500 ${note.tilt} group-hover:-translate-y-2 group-hover:rotate-0`}
                  >
                    <img
                      src={note.src}
                      alt={`Handwritten thank-you note from ${note.name}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full bg-paper object-contain"
                    />
                  </span>
                </button>
                <figcaption className="mt-5 px-1">
                  <p className="line-clamp-3 font-serif text-[0.9rem] leading-snug italic text-ink">
                    “{note.quote}”
                  </p>
                  <p className="mono-label mt-2 text-[0.6rem] text-crimson">{note.name}</p>
                </figcaption>
              </figure>
            );
          })}
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
