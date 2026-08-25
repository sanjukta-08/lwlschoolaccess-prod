import { useState } from "react";

const EXAMPLES = [
  "My daughter loves biology but is very shy — what would suit her?",
  "My son is in Grade 9 and wants to start a business one day.",
  "We need a weekend programme that helps with US college applications.",
];

export function CounsellorCard() {
  const [text, setText] = useState("");

  const mailto = `mailto:hello@learnwithleaders.com?subject=${encodeURIComponent(
    "Programme advice for my child",
  )}&body=${encodeURIComponent(text)}`;

  return (
    <section id="counsellor" className="scroll-mt-20 bg-wash px-5 pt-4 pb-12">
      <div className="mx-auto grid max-w-[1100px] gap-8 rounded-3xl border border-line bg-paper p-6 sm:p-8 md:grid-cols-2 md:p-10">
        <div>
          <h2 className="mb-2.5 font-serif text-[clamp(1.4rem,3.2vw,1.9rem)] font-medium">
            Prefer to just <em className="text-crimson-deep">describe your child</em>?
          </h2>
          <p className="text-[0.92rem] text-ink-soft">
            Tell our counsellor about their interests, personality and goals in your own
            words — we&apos;ll suggest the programmes that fit best.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {EXAMPLES.map((eg) => (
              <button
                key={eg}
                type="button"
                onClick={() => setText(eg)}
                className="rounded-xl border border-line bg-wash px-3.5 py-2.5 text-left text-[0.82rem] font-medium text-ink-soft transition-colors hover:border-crimson hover:text-ink"
              >
                {eg}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="sr-only" htmlFor="counsellor-text">
            Tell us about your child
          </label>
          <textarea
            id="counsellor-text"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. My son is 14, loves maths and arguing his point, and we're thinking about US universities…"
            className="resize-y rounded-2xl border-[1.5px] border-line bg-paper px-4 py-3.5 text-[0.9rem] text-ink placeholder:text-ink-faint focus:border-crimson focus:outline-none"
          />
          <a
            href={mailto}
            className="rounded-full bg-crimson px-6 py-3 text-center text-[0.9rem] font-bold text-paper no-underline transition-colors hover:bg-crimson-deep"
          >
            Ask the counsellor →
          </a>
          <p className="text-center text-[0.75rem] text-ink-faint">
            Opens your email — a real advisor replies, usually within a day.
          </p>
        </div>
      </div>
    </section>
  );
}
