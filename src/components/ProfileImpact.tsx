import { Link } from "@tanstack/react-router";

import { slugOf } from "@/lib/programme-slug";
import { profileImpactFor } from "@/lib/programme-proof";
import { TYPE_NAME, type Programme } from "@/lib/programmes";

export function ProfileImpact({
  programme: p,
  color,
}: {
  programme: Programme;
  color: string;
}) {
  const impact = profileImpactFor(p);

  return (
    <>
      <div className="mt-6 grid items-stretch gap-3.5 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl border-2 border-dashed border-ink/15 bg-paper p-5">
          <span className="mono-label text-ink-faint">Before</span>
          <p className="mt-2 font-serif text-[1.05rem] text-ink-soft">{impact.before}</p>
          <p className="mt-2 text-[0.8rem] text-ink-faint">
            Nothing an admissions officer can check.
          </p>
        </div>
        <div
          className="grid place-items-center text-[1.5rem] font-bold sm:px-1"
          style={{ color }}
          aria-hidden
        >
          →
        </div>
        <div
          className="rounded-2xl border bg-paper p-5 shadow-soft"
          style={{ borderColor: `color-mix(in srgb, ${color} 40%, #fff)` }}
        >
          <span className="mono-label" style={{ color }}>
            After {p.name}
          </span>
          <p className="mt-2 font-serif text-[1.05rem]">{impact.after}</p>
          <p className="mt-2 text-[0.8rem] text-ink-faint">
            A line with an artefact behind it.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 rounded-[20px] border-2 border-ink/12 bg-wash px-6 py-6 sm:grid-cols-2">
        <div>
          <span className="mono-label block text-ink-faint">
            Why this {TYPE_NAME[p.type].toLowerCase()} counts
          </span>
          <p className="mt-2 text-[0.88rem] text-ink-soft">{impact.purpose}</p>
          <p className="mt-3 text-[0.88rem] text-ink-soft">{impact.story}</p>
        </div>
        <div>
          <span className="mono-label block text-ink-faint">
            What a university can verify
          </span>
          <ul className="mt-2.5 flex list-none flex-col gap-2 p-0">
            {impact.verifiable.map((v) => (
              <li key={v} className="flex items-start gap-2 text-[0.85rem]">
                <span className="font-bold" style={{ color }} aria-hidden>
                  ✓
                </span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Link
          to="/profile-building"
          className="text-[0.9rem] font-semibold text-crimson no-underline hover:underline"
        >
          How profile building works, step by step →
        </Link>
        {impact.next ? (
          <Link
            to="/programmes/$slug"
            params={{ slug: slugOf(impact.next) }}
            className="text-[0.9rem] font-semibold no-underline hover:underline"
            style={{ color }}
          >
            Deepen it next with {impact.next.name} →
          </Link>
        ) : null}
      </div>
    </>
  );
}
