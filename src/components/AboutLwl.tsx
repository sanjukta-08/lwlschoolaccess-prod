import { Link } from "@tanstack/react-router";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { PROGRAMMES, TOTAL_COHORTS, TRACKS } from "@/lib/programmes";
import { ABOUT, REACH } from "@/lib/social-proof";

export function AboutLwl() {
  const stats = [
    { k: `${PROGRAMMES.length}`, l: "live programmes" },
    { k: `${TOTAL_COHORTS}`, l: "cohorts in 2026–27" },
    { k: `${Object.keys(TRACKS).length}`, l: "interest tracks" },
    { k: REACH.countries, l: "countries reached" },
  ];

  return (
    <section id="about" className="scroll-mt-20 border-t border-line bg-paper px-5 py-14">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className="mono-label text-crimson">{ABOUT.kicker}</span>
            <h2 className="mt-3 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium leading-tight">
              {ABOUT.headline}
            </h2>
            <p className="mt-4 max-w-[46em] text-[0.95rem] leading-relaxed text-ink-soft">
              {ABOUT.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/finder"
                search={DEFAULT_SEARCH}
                className="rounded-full bg-crimson px-6 py-3 text-[0.9rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
              >
                Browse programmes →
              </Link>
              <Link
                to="/profile-building"
                className="rounded-full border-[1.5px] border-crimson/35 bg-paper px-6 py-3 text-[0.9rem] font-bold text-crimson no-underline transition-colors hover:border-crimson"
              >
                How profile building works
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {stats.map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-line bg-gradient-to-br from-wash-deep to-paper p-5 text-center"
              >
                <div className="font-serif text-[clamp(1.6rem,4vw,2.1rem)] font-semibold text-crimson-deep">
                  {s.k}
                </div>
                <div className="mono-label mt-1 text-ink-faint">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ABOUT.pillars.map((p) => (
            <div key={p.t} className="rounded-2xl border border-line bg-wash p-6">
              <h3 className="font-serif text-[1.1rem] font-semibold">{p.t}</h3>
              <p className="mt-2 text-[0.88rem] text-ink-soft">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
