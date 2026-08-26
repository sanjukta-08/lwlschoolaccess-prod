import studentLearning from "@/assets/student-learning.png.asset.json";

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
    <section id="how" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-paper px-5 py-10">
      {/* Right-side background image with soft edge fade */}
      <div className="pointer-events-none absolute -right-10 bottom-0 h-[95%] max-w-[55%] overflow-hidden lg:right-0 lg:max-w-[48%]">
        <img
          src={studentLearning.url}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-auto object-contain opacity-[0.25] md:opacity-[0.35]"
        />
        {/* Left edge fade into paper background */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-paper via-paper/80 to-transparent" />
        {/* Top edge fade into paper background */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-paper via-paper/70 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-[1100px]">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          How it <em className="text-crimson-deep">works</em>
        </h2>
        <div className="relative mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-ink/10 bg-paper/80 p-5 backdrop-blur-sm">
              <span className="mono-label text-crimson">{s.n}</span>
              <h3 className="mt-2 font-serif text-[1.15rem] font-semibold">{s.t}</h3>
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
    <section id="why" className="scroll-mt-20 bg-wash px-5 py-10">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          Why <em className="text-crimson-deep">Learn with Leaders</em>
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {REASONS.map((r) => (
            <div key={r.t} className="rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-serif text-[1.1rem] font-semibold">{r.t}</h3>
              <p className="mt-2 text-[0.88rem] text-ink-soft">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
