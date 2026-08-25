import { Link } from "@tanstack/react-router";
import {
  PATHWAY,
  PROGRAMMES,
  TRACKS,
  cohortGrades,
  fmtShort,
  isPast,
} from "@/lib/programmes";
import { DEFAULT_SEARCH } from "@/lib/finder";

export function ProfilePathway({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="pathway" className="scroll-mt-24 bg-wash-deep/60 py-16">
      <div className="mx-auto max-w-[1100px] px-5">
        <header className="mb-8 text-center">
          <span className="mono-label text-crimson">Plan it, don&apos;t rush it</span>
          <h2 className="mt-2 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
            Plan your <em className="text-crimson-deep">profile building</em> with us
          </h2>
          <p className="mx-auto mt-2.5 max-w-[44em] text-[0.93rem] text-ink-soft">
            Universities look for a story, not a scatter of certificates. Here is the
            four-step path we recommend — explore early, go deep in the middle years,
            make it application-ready, then turn it into proof a university can verify.
          </p>
        </header>

        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PATHWAY.map((stage, i) => (
            <article
              key={stage.key}
              className="flex flex-col rounded-3xl border border-line bg-paper p-5 shadow-soft"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="mono-label text-crimson">Step {i + 1}</span>
                <span className="whitespace-nowrap rounded-full bg-wash px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-ink-soft">
                  {stage.band}
                </span>
              </div>
              <h3 className="mt-2 font-serif text-[1.25rem] font-semibold">
                {stage.title}
              </h3>
              <p className="mt-1.5 text-[0.86rem] text-ink-soft">{stage.goal}</p>

              {stage.outcomes ? (
                <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-wash-deep/70 p-3">
                  <span className="mono-label text-ink-faint">What they walk away with</span>
                  {stage.outcomes.map((o) => {
                    const inner = (
                      <>
                        <span className="mt-[0.15rem] shrink-0 text-[0.8rem] text-crimson">
                          ✓
                        </span>
                        <span>
                          <b className="block text-[0.85rem] font-semibold text-ink">
                            {o.title}
                          </b>
                          <small className="block text-[0.74rem] leading-snug text-ink-faint">
                            {o.body}
                          </small>
                        </span>
                      </>
                    );
                    const cls =
                      "flex w-full items-start gap-2 rounded-xl border border-transparent px-1.5 py-1.5 text-left transition-colors";
                    if (o.id) {
                      return (
                        <button
                          key={o.title}
                          type="button"
                          onClick={() => onOpen(o.id!)}
                          className={`${cls} hover:border-line hover:bg-paper`}
                        >
                          {inner}
                        </button>
                      );
                    }
                    if (o.type || o.interest) {
                      return (
                        <Link
                          key={o.title}
                          to="/finder"
                          search={{
                            ...DEFAULT_SEARCH,
                            ...(o.type ? { type: o.type } : {}),
                            ...(o.interest ? { interest: o.interest } : {}),
                          }}
                          className={`${cls} no-underline hover:border-line hover:bg-paper`}
                        >
                          {inner}
                        </Link>
                      );
                    }
                    return (
                      <span key={o.title} className={cls}>
                        {inner}
                      </span>
                    );
                  })}
                </div>
              ) : (
              <div className="mt-4 flex flex-col gap-2">
                <span className="mono-label text-ink-faint">Start here</span>
                {stage.ids.map((id) => {
                  const p = PROGRAMMES.find((x) => x.id === id);
                  if (!p) return null;
                  const next = p.cohorts
                    .filter((c) => !isPast(c.d))
                    .sort((a, b) => a.d.localeCompare(b.d))[0];
                  const track = TRACKS[p.tracks[0]!];
                  const [lo, hi] = cohortGrades(p, next);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onOpen(id)}
                      className="rounded-xl border border-line bg-wash px-3 py-2.5 text-left transition-colors hover:border-ink-soft"
                    >
                      <b className="block text-[0.87rem] font-semibold text-ink">
                        {p.name}
                      </b>
                      <small className="block text-[0.74rem] text-ink-faint">
                        <span style={{ color: track.color }}>{track.label}</span> · Grades{" "}
                        {lo}–{hi}
                        {next ? ` · next ${fmtShort(next.d)}` : ""}
                      </small>
                    </button>
                  );
                })}
              </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.learnwithleaders.com/"
            target="_blank"
            rel="noopener"
            className="rounded-full bg-crimson px-6 py-3 text-[0.88rem] font-bold text-paper no-underline hover:bg-crimson-deep"
          >
            Plan my child&apos;s pathway
          </a>
          <Link
            to="/profile-building"
            className="rounded-full border-[1.5px] border-line bg-paper px-6 py-3 text-[0.88rem] font-semibold text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
          >
            How profile building works →
          </Link>
          <Link
            to="/calendar"
            search={DEFAULT_SEARCH}
            className="rounded-full border-[1.5px] border-line bg-paper px-6 py-3 text-[0.88rem] font-semibold text-ink-soft no-underline hover:border-ink-soft hover:text-ink"
          >
            See the full calendar →
          </Link>
        </div>
      </div>
    </section>
  );
}
