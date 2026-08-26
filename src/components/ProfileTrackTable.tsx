import { Link } from "@tanstack/react-router";
import { PROGRAMMES, TRACKS, type TrackKey } from "@/lib/programmes";
import { TRACK_PROFILE } from "@/lib/profile-building";
import { DEFAULT_SEARCH } from "@/lib/finder";

const ORDER: TrackKey[] = [
  "med",
  "law",
  "fin",
  "ai",
  "res",
  "lead",
  "sat",
];

export function ProfileTrackTable() {
  return (
    <section id="by-interest" className="scroll-mt-24 bg-wash px-5 py-14">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-8 max-w-[46em]">
          <span className="mono-label text-crimson">Interest by interest</span>
          <h2 className="mt-2 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
            The <em className="text-crimson-deep">skills and outcomes</em> per field
          </h2>
          <p className="mt-2.5 text-[0.93rem] text-ink-soft">
            For each interest: the story it supports on an application, the skills your
            child actually practises, and the outcome worth aiming at.
          </p>
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          {ORDER.map((t) => {
            const track = TRACKS[t];
            const info = TRACK_PROFILE[t];
            const count = PROGRAMMES.filter((p) => p.tracks.includes(t)).length;
            return (
              <article
                key={t}
                className="rounded-2xl border border-line bg-paper p-5 shadow-soft"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[1.1rem]" aria-hidden>
                    {track.ic}
                  </span>
                  <h3
                    className="text-[1rem] font-bold"
                    style={{ color: track.color }}
                  >
                    {track.label}
                  </h3>
                  <span className="ml-auto font-mono text-[0.7rem] font-semibold text-ink-faint">
                    {count} programmes
                  </span>
                </div>
                <p className="mt-2 text-[0.86rem] text-ink-soft">{info.story}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {info.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-wash-deep/70 px-2.5 py-1 text-[0.76rem] font-semibold text-ink-soft"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-[0.82rem] text-ink">
                  <b className="font-semibold">Aim for:</b>{" "}
                  <span className="text-ink-soft">{info.outcome}</span>
                </p>

                <Link
                  to="/finder"
                  search={{ ...DEFAULT_SEARCH, interest: t }}
                  className="mt-3 inline-block text-[0.8rem] font-semibold text-crimson no-underline hover:text-crimson-deep"
                >
                  See {track.label} programmes →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
