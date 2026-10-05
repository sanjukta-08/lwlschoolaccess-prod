import { Link } from "@tanstack/react-router";

import { AddToCalendar } from "@/components/AddToCalendar";
import { SiteFooter } from "@/components/SiteFooter";
import { SaveButton } from "@/components/SaveButton";
import { countdownLabel, decideLabel } from "@/lib/shortlist";
import { PageJump } from "@/components/PageJump";
import { ProfileImpact } from "@/components/ProfileImpact";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SkillMatrix } from "@/components/SkillMatrix";

import { DEFAULT_SEARCH } from "@/lib/finder";

import { brandFor } from "@/lib/programme-logos";
import { detailFor, relatedProgrammes } from "@/lib/programme-detail";
import { slugOf } from "@/lib/programme-slug";
import {
  TRACKS,
  TYPE_NAME,
  cohortGrades,
  dualTime,
  feeOf,
  timeOf,
  fmtLong,
  fmtShort,
  isPast,
  isSoon,
  parseISO,
  type Programme,
} from "@/lib/programmes";

const monthOf = (iso: string) =>
  parseISO(iso).toLocaleDateString("en-GB", { month: "long" });

export function ProgrammeLanding({ programme: p }: { programme: Programme }) {
  const trackMeta = TRACKS[p.tracks[0]!];
  /** Programme pages follow the brand palette (crimson + gold), not track colours. */
  const track = { ...trackMeta, color: "var(--crimson)" };
  const d = detailFor(p);
  const brand = brandFor(p.id, p.tracks);
  const kind = TYPE_NAME[p.type];
  const cohorts = p.cohorts.filter((c) => !isPast(c.d));
  const next = cohorts[0];
  const fee = feeOf(p, next);
  const discounted = fee.r && fee.r !== fee.e;
  const related = relatedProgrammes(p);

  return (
    <main
      className="pb-[92px]"
      style={{ "--sp": track.color } as React.CSSProperties}
    >
      {/* Hero */}
      <section className="surface-track-strong border-b">
        <div className="page-shell pt-10 pb-11 text-center">
          <p className="mono-label mb-4 text-ink-faint">
            <Link to="/finder" search={DEFAULT_SEARCH} className="no-underline hover:underline">
              Programs
            </Link>{" "}
            / <b style={{ color: track.color }}>{track.label}</b>
          </p>
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full border bg-paper px-3.5 py-1.5 text-[0.76rem] font-bold shadow-soft"
            style={{
              color: track.color,
              borderColor: `color-mix(in srgb, ${track.color} 30%, #fff)`,
            }}
          >
            <span aria-hidden>{track.ic}</span>
            {kind} · {track.label}
          </span>
          {brand ? (
            <img
              src={brand.src}
              alt={brand.alt}
              loading="eager"
              decoding="async"
              className="mx-auto mb-4 max-h-16 w-auto max-w-[16rem] object-contain"
            />
          ) : null}
          <h1 className="mx-auto max-w-[20em] font-serif text-[clamp(2rem,5.4vw,3.05rem)] leading-[1.08] font-semibold">
            {p.name}
          </h1>

          <p className="mx-auto mt-3.5 max-w-[54em] text-[clamp(0.98rem,2.3vw,1.08rem)] text-ink-soft">
            {d.lede}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={p.apply}
              target="_blank"
              rel="noopener"
              className="rounded-full px-7 py-3.5 text-[0.98rem] font-bold text-paper no-underline transition-transform hover:-translate-y-0.5 hover:brightness-110"
              style={{ background: track.color }}
            >
              {next ? `Apply for ${monthOf(next.d)} →` : "Apply now →"}
            </a>
            {next ? <SaveButton p={p} c={next} variant="wide" /> : null}
            {next ? <AddToCalendar p={p} c={next} size="md" /> : null}
          </div>

          {next ? (
            <p className="mt-4 text-center text-[0.86rem] text-ink-soft">
              Next cohort starts <b className="text-ink">{fmtLong(next.d)}</b>
              {" · "}
              {discounted ? "early-bird " : ""}
              <b className="text-ink">{fee.e}</b>
            </p>
          ) : null}


          {next ? (
            <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[0.78rem]">
              {countdownLabel(next.d) ? (
                <span className="rounded-lg bg-gold/12 px-2.5 py-1 font-bold text-gold">
                  {countdownLabel(next.d)}
                </span>
              ) : null}
              {decideLabel(next.d) ? (
                <span className="rounded-lg bg-crimson/8 px-2.5 py-1 font-bold text-crimson">
                  {decideLabel(next.d)}
                </span>
              ) : null}
              <span className="rounded-lg bg-paper/70 px-2.5 py-1 font-mono text-ink-soft">
                Cohorts of {d.cohortSize}
              </span>
            </p>
          ) : null}

          <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Length", p.dur],
              ["Cohort size", d.cohortSize],
              ["Eligibility", d.ageLabel],
              ["Live sessions", `${dualTime(p.time)} · live on Zoom`],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-2xl border border-line bg-paper px-4 py-3.5 shadow-soft"
              >
                <span className="mono-label block text-ink-faint">{k}</span>
                <b className="mt-1 block text-[0.9rem] font-bold">{v}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageJump
        items={[
          { id: "overview", label: "Overview" },
          { id: "skills", label: "Skills" },
          { id: "projects", label: "Projects" },
          { id: "profile", label: "Profile impact" },
          { id: "dates", label: "Dates & fees" },
          { id: "faq", label: "FAQs" },
        ]}
      />

      {/* What they'll do */}
      <section id="overview" className="page-shell scroll-mt-32 pt-12">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          What your child will{" "}
          <em className="text-crimson-deep not-italic">actually do</em>
        </h2>
        <p className="mx-auto mt-2 max-w-[40em] text-center text-[0.92rem] text-ink-soft">
          Live, mentor-led sessions - worked problems and real output, not lectures.
        </p>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
          {d.doSteps.map((s, i) => {
            const isLastOdd =
              i === d.doSteps.length - 1 && d.doSteps.length % 2 === 1;
            return (
              <div
                key={s.title}
                className={[
                  "flex items-start gap-3.5 rounded-2xl border-2 border-ink/12 bg-wash p-4.5 shadow-soft",
                  isLastOdd
                    ? "sm:col-span-2 sm:max-w-[calc(50%-0.5*0.875rem)] sm:justify-self-center"
                    : "",
                ].join(" ")}
              >
                <span
                  className="grid h-9 w-9 flex-none place-items-center rounded-full border-[1.5px] bg-paper font-serif font-semibold"
                  style={{
                    color: track.color,
                    borderColor: `color-mix(in srgb, ${track.color} 35%, #fff)`,
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <b className="block text-[0.95rem]">{s.title}</b>
                  <p className="mt-1 text-[0.85rem] text-ink-soft">{s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="page-shell scroll-mt-32 pt-12">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          Skills your child will <em className="text-crimson-deep not-italic">gain</em>
        </h2>
        <p className="mx-auto mt-2 max-w-none text-center text-[0.92rem] text-ink-soft lg:whitespace-nowrap">
          Named, practised skills - grouped the way universities read them, tied to how
          each is used in this {kind.toLowerCase()}.
        </p>
        <SkillMatrix programme={p} color={track.color} />
      </section>

      {/* Projects */}
      <section id="projects" className="page-shell scroll-mt-32 pt-12">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          Projects they <em className="text-crimson-deep not-italic">finish with</em>
        </h2>
        <p className="mx-auto mt-2 max-w-none text-center text-[0.92rem] text-ink-soft lg:whitespace-nowrap">
          Sample briefs from recent cohorts - the actual work that comes out of the
          programme, not a syllabus.
        </p>
        <ProjectShowcase programme={p} color={track.color} />

        <h3 className="mt-10 text-center font-serif text-[1.2rem] font-semibold">
          What they'll take away
        </h3>
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          {d.takeaways.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[0.85rem] font-semibold shadow-soft"
            >
              <span className="font-bold text-track-fin" aria-hidden>
                ✓
              </span>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Profile impact */}
      <section id="profile" className="page-shell scroll-mt-32 pt-12">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          How this strengthens their{" "}
          <em className="text-crimson-deep not-italic">university profile</em>
        </h2>
        <p className="mx-auto mt-2 max-w-none text-center text-[0.92rem] text-ink-soft lg:whitespace-nowrap">
          The point isn't the certificate. It's the line a family can honestly write
          afterwards - and the artefact sitting behind it.
        </p>
        <ProfileImpact programme={p} color={track.color} />
      </section>

      {p.badge ? (
        <section className="page-shell pt-12">
          <div className="mx-auto flex max-w-[860px] flex-wrap items-center gap-4 rounded-[18px] border border-line bg-wash px-6 py-5">
            <span className="text-[1.6rem]" aria-hidden>
              🛡️
            </span>
            <div>
              <b className="text-[1rem]">{p.badge}</b>
              <p className="mt-1 text-[0.86rem] text-ink-soft">
                If it isn't right for your child after the first session, tell us - we
                sort it out without forms or fuss.
              </p>
            </div>
          </div>
        </section>
      ) : null}





      {/* Cohorts */}
      <section id="dates" className="page-shell scroll-mt-32 pt-12">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          Upcoming <em className="text-crimson-deep not-italic">cohorts</em>
        </h2>
        {cohorts.length === 0 ? (
          <p className="mt-6 text-center text-[0.9rem] text-ink-soft">
            Dates for the next intake are being confirmed - the programme page has the
            latest.
          </p>
        ) : null}
        <div className="mx-auto mt-6 grid max-w-[1280px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cohorts.map((c, i) => {
            const g = cohortGrades(p, c);
            const f = feeOf(p, c);
            const disc = f.r && f.r !== f.e;
            return (
              <div
                key={c.d}
                className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-ink/12 bg-paper shadow-soft transition-shadow hover:shadow-lift"
              >
                <span className="block h-[3px] w-full bg-gradient-to-r from-gold-line via-gold to-gold-line" />
                {isSoon(c.d) ? (
                  <span className="absolute top-3.5 right-3 inline-flex items-center gap-1 rounded-sm border-2 border-dashed border-gold/80 bg-gold-soft px-2.5 py-1 font-mono text-[0.62rem] font-bold tracking-[0.1em] text-gold-deep uppercase shadow-soft">
                    <span aria-hidden className="text-[0.72rem]">✦</span>
                    Starting soon
                  </span>
                ) : null}

                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`block font-serif text-[1.35rem] leading-tight font-semibold ${isSoon(c.d) ? "pr-20" : ""}`}
                  >
                    {fmtLong(c.d)}
                  </span>
                  <small className="mt-1.5 block font-mono text-[0.68rem] tracking-[0.05em] text-ink-faint uppercase">
                    {p.dur} · Grades {g[0]}–{g[1]}
                  </small>
                  <small className="mt-1 block text-[0.78rem] font-semibold text-ink-soft">
                    {c.label ?? `Batch ${i + 1}`}
                  </small>

                  <div className="mt-3.5 min-h-[44px] border-t border-line pt-3">
                    {(() => {
                      const full = dualTime(timeOf(p, c));
                      const cut = full.indexOf(" (");
                      const local = cut > -1 ? full.slice(0, cut) : full;
                      let original = cut > -1 ? full.slice(cut + 1) : "";
                      if (original.startsWith("(") && !original.endsWith(")"))
                        original += ")";
                      return (
                        <small className="block text-[0.78rem] text-ink-soft">
                          <span className="block">{local}</span>
                          {original ? (
                            <span className="mt-0.5 block text-ink-faint">{original}</span>
                          ) : null}
                        </small>
                      );
                    })()}
                  </div>

                  <div className="mt-3 min-h-[30px]">
                    {c.flyer || c.brochure ? (
                      <span className="flex flex-wrap gap-1.5">
                        {c.flyer ? (
                          <a
                            href={c.flyer}
                            target="_blank"
                            rel="noopener"
                            className="rounded-md border border-line px-2 py-[3px] font-mono text-[0.66rem] font-semibold tracking-[0.04em] text-ink-soft uppercase no-underline hover:border-gold hover:text-gold"
                          >
                            Flyer
                          </a>
                        ) : null}
                        {c.brochure ? (
                          <a
                            href={c.brochure}
                            target="_blank"
                            rel="noopener"
                            className="rounded-md border border-line px-2 py-[3px] font-mono text-[0.66rem] font-semibold tracking-[0.04em] text-ink-soft uppercase no-underline hover:border-gold hover:text-gold"
                          >
                            Brochure
                          </a>
                        ) : null}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-auto pt-4">
                    <span className="flex flex-wrap items-baseline gap-1.5 text-[0.88rem]">
                      <b className="font-serif text-[1.2rem]">{f.e}</b>
                      {disc ? (
                        <>
                          <s className="text-[0.78rem] text-ink-faint">{f.r}</s>
                          <span className="text-[0.72rem] font-semibold text-gold-deep uppercase">
                            early bird
                          </span>
                        </>
                      ) : null}
                    </span>
                    <a
                      href={p.apply}
                      target="_blank"
                      rel="noopener"
                      className="mt-3 block rounded-xl px-3 py-2.5 text-center text-[0.85rem] font-bold text-paper no-underline transition-[filter] hover:brightness-110"
                      style={{ background: track.color }}
                    >
                      Apply for this cohort
                    </a>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <AddToCalendar p={p} c={c} />
                      <SaveButton p={p} c={c} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3.5 text-center text-[0.8rem] text-ink-faint">
          Session times shown in Dubai time (GMT+4) with US Eastern alongside. Fees are
          correct at time of publishing - confirm on the programme page.
        </p>

        <div className="mt-10 grid gap-4 rounded-[20px] bg-wash px-7 py-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <span className="text-[2rem]" aria-hidden>
            🎓
          </span>
          <div>
            <b className="block font-serif text-[1.15rem] font-semibold">
              {d.mentorTitle}
            </b>
            <p className="mt-1 text-[0.88rem] text-ink-soft">{d.mentorBody}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="page-shell scroll-mt-32 pt-12">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
          Parents usually <em className="text-crimson-deep not-italic">ask</em>
        </h2>
        <div className="mx-auto mt-6 flex max-w-[900px] flex-col gap-2.5">
          {d.faqs.map((f) => (
            <details
              key={f.q}
              className="overflow-hidden rounded-[14px] border-2 border-ink/12 bg-paper"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-[0.93rem] font-semibold">
                {f.q}
                <span className="font-serif text-[1.3rem] text-crimson" aria-hidden>
                  +
                </span>
              </summary>
              <p className="border-t border-line px-5 py-4 text-[0.87rem] text-ink-soft">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="page-shell pt-14">
          <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
            Families looking at this also{" "}
            <em className="text-crimson-deep not-italic">consider</em>
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3.5">
            {related.map((r) => {
              const rt = TRACKS[r.tracks[0]!];
              const rn = r.cohorts.find((c) => !isPast(c.d));
              return (
                <Link
                  key={r.id}
                  to="/programmes/$slug"
                  params={{ slug: slugOf(r) }}
                  className="flex w-full max-w-[340px] flex-col gap-2 rounded-2xl border-2 border-ink/12 bg-paper p-4.5 no-underline shadow-soft transition-all hover:-translate-y-[3px] hover:shadow-lift sm:w-[320px]"
                >
                  <span className="text-[0.74rem] font-bold text-gold-deep">
                    {rt.ic} {TYPE_NAME[r.type]}
                  </span>
                  <b className="text-[0.95rem]">{r.name}</b>
                  <small className="text-[0.8rem] text-ink-soft">{r.tag}</small>
                  <span className="mono-label mt-auto text-ink-faint">
                    Grades {r.g[0]}–{r.g[1]}
                    {rn ? ` · from ${fmtShort(rn.d)}` : ""}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-7 mb-4 flex justify-center">
            <Link
              to="/finder"
              search={DEFAULT_SEARCH}
              className="rounded-full border-[1.5px] border-line bg-ink px-6 py-3 text-[0.9rem] font-bold text-paper no-underline shadow-soft transition-transform hover:-translate-y-0.5 hover:brightness-110"
            >
              ← Browse all programs
            </Link>
          </div>
        </section>
      ) : null}

      {/* Sticky apply bar */}
      <div data-compass-offset className="fixed inset-x-0 bottom-0 z-60 border-t border-line bg-paper shadow-[0_-8px_24px_-16px_rgba(28,34,48,0.35)]">
        <div className="page-shell flex items-center justify-between gap-4 py-3">
          <div>
            <b className="font-serif text-[1.15rem] font-semibold">{fee.e}</b>
            {discounted ? (
              <s className="ml-1.5 text-[0.8rem] text-ink-faint">{fee.r}</s>
            ) : null}
            <small className="block text-[0.72rem] text-ink-faint">
              {discounted ? "Early bird · " : ""}
              {next ? `next cohort ${fmtShort(next.d)}` : "dates on request"}
            </small>
          </div>
          <div className="flex items-center gap-2.5">
            {next ? (
              <SaveButton p={p} c={next} variant="wide" className="hidden sm:inline-flex" />
            ) : null}
            <a
              href={p.apply}
              target="_blank"
              rel="noopener"
              className="rounded-full px-6 py-3 text-[0.9rem] font-bold text-paper no-underline transition-[filter] hover:brightness-110"
              style={{ background: track.color }}
            >
              Apply now →
            </a>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
