import { Link } from "@tanstack/react-router";
import { PROGRAMMES, TYPES, type TypeKey } from "@/lib/programmes";
import { TYPE_PROFILE } from "@/lib/profile-building";
import { slugOf } from "@/lib/programme-slug";

const ORDER: TypeKey[] = ["fel", "prog", "comp"];

export function ProfileTypeBlocks() {
  return (
    <section id="by-type" className="scroll-mt-24 py-14">
      <div className="page-shell">
        <header className="mb-8 mx-auto max-w-[46em] text-center">
          <span className="mono-label text-crimson">Program by program</span>
          <h2 className="mt-2 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
            What each kind of program <em className="text-crimson-deep">builds</em>
          </h2>
          <p className="mt-2.5 text-[0.93rem] text-ink-soft">
            The five kinds of program do different jobs on a profile. Read the job
            first, then pick the field - that order stops families buying five of the
            same thing.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {ORDER.map((t) => {
            const info = TYPE_PROFILE[t];
            const list = PROGRAMMES.filter((p) => p.type === t);
            return (
              <article
                key={t}
                className="rounded-3xl border border-line bg-paper p-6 shadow-soft"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-[1.3rem] font-semibold">
                    {TYPES[t].label}
                  </h3>
                  <span className="rounded-full bg-wash px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-ink-soft">
                    {list.length} listed
                  </span>
                </div>
                <p className="mt-2 max-w-[60em] text-[0.9rem] text-ink-soft">
                  {info.purpose}
                </p>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <span className="mono-label text-ink-faint">Skills gained</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {info.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-line bg-wash px-3 py-1.5 text-[0.8rem] font-semibold text-ink-soft"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="mono-label text-ink-faint">
                      What you end up holding
                    </span>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {info.proof.map((s) => (
                        <li key={s} className="flex gap-2 text-[0.84rem] text-ink-soft">
                          <span className="text-crimson" aria-hidden>
                            ✓
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 border-t border-line pt-4">
                  <span className="mono-label text-ink-faint">In this category</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {list.map((p) => (
                      <Link
                        key={p.id}
                        to="/programmes/$slug"
                        params={{ slug: slugOf(p) }}
                        className="rounded-xl border border-line bg-wash px-3 py-2 text-[0.82rem] font-semibold text-ink no-underline transition-colors hover:border-ink-soft"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
