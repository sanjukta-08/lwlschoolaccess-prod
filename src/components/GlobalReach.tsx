import { REACH } from "@/lib/social-proof";

export function GlobalReach() {
  return (
    <section id="schools" className="scroll-mt-20 border-t border-line bg-paper px-5 py-14">
      <div className="page-shell">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          Schools we <em className="text-crimson-deep">work with</em>
        </h2>
        <p className="mx-auto mt-2 max-w-[40em] text-center text-[0.9rem] text-ink-soft">
          Students join our cohorts from international, IB, CBSE, British and American
          curriculum schools all over the world - individually, or through their school.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[22px] border border-line bg-gradient-to-br from-wash-deep to-paper p-8 text-center">
            <div className="font-serif text-[clamp(2.4rem,7vw,3.4rem)] font-semibold leading-none text-crimson-deep">
              {REACH.countries}
            </div>
            <div className="mono-label mt-2 text-ink-faint">countries represented</div>
          </div>
          <div className="rounded-[22px] border border-line bg-gradient-to-br from-wash-deep to-paper p-8 text-center">
            <div className="font-serif text-[clamp(2.4rem,7vw,3.4rem)] font-semibold leading-none text-crimson-deep">
              {REACH.schools}
            </div>
            <div className="mono-label mt-2 text-ink-faint">schools worldwide</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {REACH.regions.map((r) => (
            <span
              key={r}
              className="rounded-full border border-line bg-wash px-3.5 py-1.5 text-[0.82rem] font-semibold text-ink-soft"
            >
              {r}
            </span>
          ))}
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {REACH.models.map((m) => (
            <div key={m.t} className="rounded-2xl border border-line bg-wash p-6">
              <h3 className="font-serif text-[1.08rem] font-semibold">{m.t}</h3>
              <p className="mt-2 text-[0.88rem] text-ink-soft">{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
