import { Link } from "@tanstack/react-router";

import { slugOf } from "@/lib/programme-slug";
import { getMatches, type FinderSearch } from "@/lib/finder";
import {
  PROGRAMMES,
  TRACKS,
  TRENDING,
  TYPES,
  TYPE_NAME,
  cohortGrades,
  feeOf,
  fmtShort,
  isPast,
} from "@/lib/programmes";

type Props = {
  state?: FinderSearch;
  /** "section" = full band, "strip" = slim 3-across row inside a page column */
  variant?: "section" | "strip";
};

export function TrendingTop5({ state, variant = "section" }: Props) {
  const filteredMatches = state ? new Map(getMatches(state).map((m) => [m.p.id, m])) : null;
  const activeInterest =
    state && state.interest !== "all"
      ? TRACKS[state.interest as keyof typeof TRACKS]
      : null;
  const activeType =
    state && state.type !== "all" ? TYPES[state.type as keyof typeof TYPES] : null;

  const picks = TRENDING.map(({ id, why }) => {
    const filtered = filteredMatches?.get(id);
    if (filteredMatches && !filtered) return null;
    const p = filtered?.p ?? PROGRAMMES.find((x) => x.id === id);
    if (!p) return null;
    const next =
      filtered?.next ??
      p.cohorts.filter((c) => !isPast(c.d)).sort((a, b) => a.d.localeCompare(b.d))[0];
    if (!next) return null;
    return { p, next, why };
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  if (!picks.length) return null;

  const titleLead = activeInterest ? `Top ${activeInterest.label}` : "Top 5";
  const titleNoun = activeType ? activeType.label.toLowerCase() : "programmes";

  if (variant === "strip") {
    return (
      <section id="trending" className="scroll-mt-24">
        <header className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 className="font-serif text-[1.15rem] font-medium">
            {activeInterest ? `Best ${activeInterest.label}` : "Start here"} -{" "}
            <em className="text-crimson-deep">
              {picks.length === 1 ? "our top pick" : `top ${Math.min(picks.length, 3)}`}
            </em>{" "}
            {titleNoun}
          </h2>
          <span className="mono-label text-gold">Trending now</span>
        </header>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {picks.slice(0, 3).map(({ p, next, why }, i) => {
            const track = TRACKS[p.tracks[0]!];
            const fee = feeOf(p, next);
            return (
              <li key={p.id} className="relative">
                <div
                  className="flex h-full flex-col gap-1.5 rounded-xl border border-line bg-paper px-4 py-3.5 transition-shadow hover:shadow-soft"
                  style={{ borderLeft: `3px solid ${track.color}` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <b className="text-[0.94rem] leading-snug font-bold text-ink">
                      {p.name}
                    </b>
                    {i === 0 ? (
                      <span className="mt-0.5 flex-none rounded bg-crimson px-1.5 py-0.5 text-[0.58rem] font-bold tracking-[0.06em] text-paper uppercase">
                        Popular
                      </span>
                    ) : null}
                  </div>
                  <small className="mono-label text-ink-faint">
                    {TYPE_NAME[p.type]} · {fmtShort(next.d)} · {fee.e}
                  </small>
                  <p className="clamp-2 text-[0.8rem] text-ink-soft">{why}</p>
                  <div className="mt-auto flex items-center gap-3 pt-2">
                    <Link
                      to="/programmes/$slug"
                      params={{ slug: slugOf(p) }}
                      className="relative z-[2] text-[0.8rem] font-bold no-underline"
                      style={{ color: track.color }}
                    >
                      View programme →
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    );
  }

  return (
    <section id="trending" className="scroll-mt-24 bg-paper py-14">
      <div className="mx-auto max-w-[1100px] px-5">
        <header className="mb-6 text-center">
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/8 px-3 py-1 text-gold">
            🔥 Trending now
          </span>
          <h2 className="mt-3 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
            {titleLead} {titleNoun} to <em className="text-crimson-deep">start with</em>
          </h2>
          <p className="mx-auto mt-2 max-w-[40em] text-[0.92rem] text-ink-soft">
            If you&apos;re not sure where to begin, these are the ones most families choose
            first - strong mentors, clear outcomes, and a next cohort you can still join.
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
