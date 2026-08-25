import { useEffect } from "react";
import {
  PROGRAMMES,
  TRACKS,
  TYPE_NAME,
  cohortGrades,
  feeOf,
  fmtLong,
  isPast,
  isSoon,
  dualTime,
} from "@/lib/programmes";

export function ProgrammeSheet({
  id,
  onClose,
}: {
  id: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [id, onClose]);

  const p = id ? PROGRAMMES.find((x) => x.id === id) : undefined;
  if (!p) return null;

  const track = TRACKS[p.tracks[0]!];
  const cohorts = p.cohorts.filter((c) => !isPast(c.d));
  const fee = feeOf(p, cohorts[0]);
  const discounted = fee.r && fee.r !== fee.e;
  const kind = TYPE_NAME[p.type];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.name}
      className="fixed inset-0 z-100"
      style={{ "--sp": track.color } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 bg-[rgba(20,25,38,0.55)] backdrop-blur-[3px]"
        onClick={onClose}
      />
      <div className="absolute inset-0 m-auto flex max-h-[calc(100%-40px)] w-[calc(100%-24px)] max-w-[780px] flex-col overflow-hidden rounded-[22px] bg-paper shadow-sheet">
        <div className="flex-1 overflow-y-auto">
          <div className="surface-track-strong relative border-b px-7 pt-7 pb-6">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-paper text-base font-bold text-ink shadow-soft"
            >
              ✕
            </button>
            <span
              className="mb-3.5 inline-flex items-center gap-2 rounded-full border bg-paper px-3 py-1.5 text-[0.74rem] font-bold"
              style={{
                color: track.color,
                borderColor: `color-mix(in srgb, ${track.color} 30%, #fff)`,
              }}
            >
              <span>{track.ic}</span>
              {kind} · {track.label}
            </span>
            <h2 className="max-w-[14em] font-serif text-[clamp(1.5rem,4vw,2.1rem)] leading-tight font-semibold">
              {p.name}
            </h2>
            <p className="mt-2.5 max-w-[38em] text-[0.95rem] text-ink-soft">{p.tag}</p>
          </div>

          <div className="flex flex-col gap-6 px-7 pt-6 pb-8">
            <section>
              <h4 className="mono-label mb-2 text-ink-faint">
                About this {kind.toLowerCase()}
              </h4>
              <p className="text-[0.92rem] text-ink-soft">{p.about}</p>
            </section>

            <section>
              <h4 className="mono-label mb-2 text-ink-faint">At a glance</h4>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  ["Length", p.dur],
                  ["Live sessions", dualTime(p.time)],
                  ["Eligibility", `Grades ${p.g[0]}–${p.g[1]}`],
                  ["Format", "Live on Zoom"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-col gap-1 rounded-xl bg-wash px-3.5 py-3"
                  >
                    <span className="mono-label text-ink-faint">{k}</span>
                    <span className="text-[0.9rem] text-ink">{v}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 className="mono-label mb-2 text-ink-faint">Fees</h4>
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="font-serif text-[1.5rem] font-semibold">{fee.e}</span>
                {discounted ? (
                  <>
                    <span className="text-[0.85rem] text-ink-faint line-through">
                      {fee.r}
                    </span>
                    <span className="rounded-[5px] border border-gold px-[7px] py-0.5 text-[0.7rem] font-bold tracking-wide text-gold uppercase">
                      Early bird
                    </span>
                  </>
                ) : null}
              </div>
            </section>

            {p.badge ? (
              <p className="rounded-xl bg-wash px-3.5 py-3 text-[0.85rem] font-semibold text-track-fin">
                ✓ {p.badge}
              </p>
            ) : null}

            <section>
              <h4 className="mono-label mb-2 text-ink-faint">Upcoming starts</h4>
              <div className="flex flex-col divide-y divide-line overflow-hidden rounded-xl border border-line">
                {cohorts.map((c) => {
                  const g = cohortGrades(p, c);
                  const f = feeOf(p, c);
                  return (
                    <div
                      key={c.d}
                      className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 text-[0.85rem]"
                    >
                      <span className="text-ink">{fmtLong(c.d)}</span>
                      <span className="font-mono text-[0.72rem] text-ink-soft">
                        G{g[0]}–{g[1]}
                        {c.fee ? ` · ${f.e}` : ""}
                      </span>
                      {isSoon(c.d) ? (
                        <span className="rounded-md bg-gold px-2 py-[3px] text-[0.66rem] font-bold tracking-wide text-paper uppercase">
                          Starting soon
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>

            <p className="text-[0.8rem] text-ink-faint">
              Times shown in Dubai time (GMT+4) with US Eastern alongside. Fees correct at time of publishing — confirm on
              the programme page.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={p.apply}
                target="_blank"
                rel="noopener"
                className="rounded-xl px-5 py-3 text-[0.9rem] font-bold text-paper no-underline transition-[filter] hover:brightness-110"
                style={{ background: track.color }}
              >
                Apply now
              </a>
              <a
                href={p.site}
                target="_blank"
                rel="noopener"
                className="rounded-xl border-[1.5px] border-line px-5 py-3 text-[0.88rem] font-semibold text-ink-soft no-underline transition-colors hover:border-ink-soft hover:text-ink"
              >
                Programme page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
