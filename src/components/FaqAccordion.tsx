export const FAQS: { q: string; a: string }[] = [
  {
    q: "Are all these programmes fully online?",
    a: "Yes. Every programme listed here runs live on Zoom, so your child can join from anywhere in the world. Session times are US Eastern, which falls in the evening for families in the Gulf, India and Southeast Asia.",
  },
  {
    q: "What ages and grades do you cover?",
    a: "Grades 5 to 12. Many pathways run junior and senior tracks — for example Junior Doctor Fellowship for Grades 5–8 and the Future Doctors Fellowship for Grades 8–12. Every listing shows its exact grade band, and the finder only shows what your child qualifies for.",
  },
  {
    q: "How much do programmes cost?",
    a: "From USD 29 for the Yale IR Essay Competition up to USD 1,199 for the Research Publication Fellowship. Most two-weekend programmes are USD 300, and most fellowships USD 499–999. Early-bird pricing is shown wherever it applies.",
  },
  {
    q: "Who teaches the programmes?",
    a: "Student mentors from Harvard, Yale, MIT, Stanford and Princeton, alongside partners like Harvard Student Agencies, HPAIR, Harvard Model Congress and the Harvard MUN Team. Cohorts are kept small so mentors know every student.",
  },
  {
    q: "How do I apply?",
    a: "Tap Apply now on any programme — most take a few minutes. If you'd rather talk it through first, an advisor can walk you through the options with no obligation.",
  },
  {
    q: "How often is this page updated?",
    a: "It reflects the 2026–27 master programme calendar. Cohorts that have already started are hidden automatically, and final details are always confirmed on each programme's own page.",
  },
];

export function FaqAccordion() {
  return (
    <section id="faq" className="scroll-mt-20 bg-wash px-5 pt-12 pb-8">
      <div className="mx-auto max-w-[760px]">
        <h2 className="mb-6 text-center font-serif text-[clamp(1.5rem,3.6vw,2rem)] font-medium">
          Questions parents <em className="text-crimson-deep">ask us</em>
        </h2>
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group mb-2.5 overflow-hidden rounded-xl border border-line bg-paper"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-[0.95rem] font-semibold group-open:border-b group-open:border-line [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="shrink-0 font-serif text-[1.3rem] leading-none text-crimson">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">–</span>
              </span>
            </summary>
            <p className="px-5 pt-3.5 pb-4.5 text-[0.88rem] text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
