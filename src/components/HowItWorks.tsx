import { SectionHeading } from "@/components/SectionHeading";

const STEPS = [
  {
    n: "01",
    t: "Filter in seconds",
    d: "Pick your child's grade, what they're curious about and when you'd like them to start. The finder only shows cohorts they actually qualify for.",
  },
  {
    n: "02",
    t: "Compare the shortlist",
    d: "Every card shows grade band, length, live session times in your timezone, fee and the next three start dates - no digging through brochures.",
  },
  {
    n: "03",
    t: "Apply or ask",
    d: "Apply directly on the programme page, or describe your child and let a counsellor recommend the pathway. Cohorts are small and fill up early.",
  },
];

const REASONS = [
  {
    t: "Mentors from the world's best campuses",
    d: "Student mentors from Harvard, Yale, MIT, Stanford and Princeton, plus partners like Harvard Student Agencies, HPAIR and Harvard Model Congress.",
  },
  {
    t: "Built around real output",
    d: "Every pathway ends in something your child can show: a capstone project, a published paper, a moot court, a pitch or a judged showcase.",
  },
  {
    t: "Live, small and online",
    d: "All sessions run live on Zoom in small cohorts, so mentors know each student by name - from anywhere in the world.",
  },
  {
    t: "Grades 5 to 12, junior and senior tracks",
    d: "Age-appropriate versions of the same pathways, so a Grade 6 student and a Grade 12 student each get the right level of challenge.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-paper px-5 py-10">
      <div className="page-shell">
        <SectionHeading sub="Three steps from curiosity to a confirmed seat in the right cohort.">
          How it <em className="text-crimson-deep">works</em>
        </SectionHeading>
        <div className="relative mt-4 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-line bg-paper/80 p-5 backdrop-blur-sm"
            >
              <span className="mono-label text-crimson">{s.n}</span>
              <h3 className="mt-2 font-display text-[1.15rem] font-bold">{s.t}</h3>
              <p className="mt-2 text-[0.88rem] text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyLwl() {
  return (
    <section id="why" className="scroll-mt-20 bg-wash py-10">
      <div className="page-shell">
        <SectionHeading sub="The details parents ask about most, built into every programme we run.">
          Why <em className="text-crimson-deep">Learn with Leaders</em>
        </SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {REASONS.map((r) => (
            <div key={r.t} className="rounded-2xl border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-[1.1rem] font-bold">{r.t}</h3>
              <p className="mt-2 text-[0.88rem] text-ink-soft">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
