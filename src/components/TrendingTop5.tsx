import { Link } from "@tanstack/react-router";

import { slugOf } from "@/lib/programme-detail";
import {
  PROGRAMMES,
  TRACKS,
  TRENDING,
  TYPE_NAME,
  cohortGrades,
  feeOf,
  fmtShort,
  isPast,
} from "@/lib/programmes";

export function TrendingTop5({ onOpen }: { onOpen: (id: string) => void }) {
  const picks = TRENDING.map(({ id, why }) => {
    const p = PROGRAMMES.find((x) => x.id === id);
    if (!p) return null;
    const next = p.cohorts.filter((c) => !isPast(c.d)).sort((a, b) => a.d.localeCompare(b.d))[0];
    if (!next) return null;
    return { p, next, why };
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  if (!picks.length) return null;

  return (
    <section id="trending" className="scroll-mt-24 bg-paper py-14">
      <div className="mx-auto max-w-[1100px] px-5">
        <header className="mb-6 text-center">
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/8 px-3 py-1 text-gold">
            🔥 Trending now
          </span>
          <h2 className="mt-3 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
            Top 5 programmes to <em className="text-crimson-deep">start with</em>
          </h2>
          <p className="mx-auto mt-2 max-w-[40em] text-[0.92rem] text-ink-soft">
            If you&apos;re not sure where to begin, these are the ones most families choose
            first — strong mentors, clear outcomes, and a next cohort you can still join.
          </p>
        </header>

        <ol className="grid gap-3">
          {picks.map(({ p, next, why }, i) => {
            const track = TRACKS[p.tracks[0]!];
            const [lo, hi] = cohortGrades(p, next);
            const fee = feeOf(p, next);
            return (
              <li key={p.id}>
                <div
                  className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-line bg-wash px-4 py-4 transition-shadow hover:shadow-soft"
                  style={{ borderLeft: `4px solid ${track.color}` }}
                >
                  <span
                    className="font-serif text-[1.7rem] leading-none font-semibold"
                    style={{ color: track.color }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-[220px] flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <b className="text-[1rem] font-bold text-ink">{p.name}</b>
                      {i === 0 ? (
                        <span className="rounded-md bg-crimson px-2 py-0.5 text-[0.62rem] font-bold tracking-[0.06em] text-paper uppercase">
                          Most popular
                        </span>
                      ) : null}
                    </div>
                    <small className="mono-label block text-ink-faint">
                      {track.ic} {track.label} · {TYPE_NAME[p.type]} · Grades {lo}–{hi}
                    </small>
                    <p className="mt-1 text-[0.84rem] text-ink-soft">{why}</p>
                  </div>
                  <div className="text-right">
                    <div className="mono-label text-ink-faint">Next start</div>
                    <div className="text-[0.9rem] font-bold text-ink">
                      {fmtShort(next.d)}
                    </div>
                    <div className="font-serif text-[1rem] font-semibold">{fee.e}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={p.apply}
                      target="_blank"
                      rel="noopener"
                      className="rounded-xl px-4 py-2.5 text-[0.84rem] font-bold text-paper no-underline transition-[filter] hover:brightness-110"
                      style={{ background: track.color }}
                    >
                      Apply
                    </a>
                    <Link
                      to="/programmes/$slug"
                      params={{ slug: slugOf(p) }}
                      className="rounded-xl border-[1.5px] border-line bg-paper px-4 py-2.5 text-[0.82rem] font-semibold text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
                    >
                      Full details
                    </Link>
                    <button
                      type="button"
                      onClick={() => onOpen(p.id)}
                      className="rounded-xl border-[1.5px] border-line bg-paper px-4 py-2.5 text-[0.82rem] font-semibold text-ink-soft hover:border-ink-soft hover:text-ink"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
