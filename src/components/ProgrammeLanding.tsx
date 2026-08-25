import { Link } from "@tanstack/react-router";

import { PageJump } from "@/components/PageJump";
import { ProfileImpact } from "@/components/ProfileImpact";
import { ProgrammeTestimonials } from "@/components/ProgrammeTestimonials";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SkillMatrix } from "@/components/SkillMatrix";
import { DEFAULT_SEARCH } from "@/lib/finder";

import { detailFor, relatedProgrammes, slugOf } from "@/lib/programme-detail";
import {
  TRACKS,
  TYPE_NAME,
  cohortGrades,
  dualTime,
  feeOf,
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
  const track = TRACKS[p.tracks[0]!];
  const d = detailFor(p);
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
        <div className="mx-auto max-w-[1000px] px-5 pt-10 pb-11">
          <p className="mono-label mb-4 text-ink-faint">
            <Link to="/finder" search={DEFAULT_SEARCH} className="no-underline hover:underline">
              Programmes
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
          <h1 className="max-w-[13em] font-serif text-[clamp(2rem,5.4vw,3.05rem)] leading-[1.08] font-semibold">
            {p.name}
          </h1>
          <p className="mt-3.5 max-w-[38em] text-[clamp(0.98rem,2.3vw,1.08rem)] text-ink-soft">
            {d.lede}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={p.apply}
              target="_blank"
              rel="noopener"
              className="rounded-full px-7 py-3.5 text-[0.98rem] font-bold text-paper no-underline transition-transform hover:-translate-y-0.5 hover:brightness-110"
              style={{ background: track.color }}
            >
              {next ? `Apply for ${monthOf(next.d)} →` : "Apply now →"}
            </a>
            {next ? (
              <p className="text-[0.86rem] text-ink-soft">
                Next cohort starts <b className="text-ink">{fmtLong(next.d)}</b>
                {" · "}
                {discounted ? "early-bird " : ""}
                <b className="text-ink">{fee.e}</b>
              </p>
            ) : null}
          </div>

          <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Length", p.dur],
              ["Cohort size", d.cohortSize],
              ["Eligibility", d.ageLabel],
              ["Live sessions", dualTime(p.time)],
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
          { id: "reviews", label: "Reviews" },
          { id: "dates", label: "Dates & fees" },
          { id: "faq", label: "FAQs" },
        ]}
      />

      {/* What they'll do */}
      <section id="overview" className="mx-auto max-w-[1000px] scroll-mt-32 px-5 pt-12">
        <h2 className="font-serif text-[clamp(1.45rem,3.4vw,1.9rem)] font-medium">
          What your child will{" "}
          <em className="text-crimson-deep italic">actually do</em>
        </h2>
        <p className="mt-2 max-w-[40em] text-[0.92rem] text-ink-soft">
          Live, mentor-led sessions — worked problems and real output, not lectures.
        </p>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
          {d.doSteps.map((s, i) => (
            <div key={s.title} className="flex items-start gap-3.5 rounded-2xl bg-wash p-4.5">
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
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-[1000px] scroll-mt-32 px-5 pt-12">
        <h2 className="font-serif text-[clamp(1.45rem,3.4vw,1.9rem)] font-medium">
          Skills your child will <em className="text-crimson-deep italic">gain</em>
        </h2>
        <p className="mt-2 max-w-[40em] text-[0.92rem] text-ink-soft">
          Named, practised skills — grouped the way universities read them, and each one
          tied to how it is used in this {kind.toLowerCase()}.
        </p>
        <SkillMatrix programme={p} color={track.color} />
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-[1000px] scroll-mt-32 px-5 pt-12">
        <h2 className="font-serif text-[clamp(1.45rem,3.4vw,1.9rem)] font-medium">
          Projects they <em className="text-crimson-deep italic">finish with</em>
        </h2>
        <p className="mt-2 max-w-[40em] text-[0.92rem] text-ink-soft">
          Sample briefs from recent cohorts — the actual work that comes out of the
          programme, not a syllabus.
        </p>
        <ProjectShowcase programme={p} color={track.color} />

        <h3 className="mt-10 font-serif text-[1.2rem] font-semibold">
          What they'll take away
        </h3>
        <div className="mt-4 flex flex-wrap gap-2.5">
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
      <section id="profile" className="mx-auto max-w-[1000px] scroll-mt-32 px-5 pt-12">
        <h2 className="font-serif text-[clamp(1.45rem,3.4vw,1.9rem)] font-medium">
          How this strengthens their{" "}
          <em className="text-crimson-deep italic">university profile</em>
        </h2>
        <p className="mt-2 max-w-[40em] text-[0.92rem] text-ink-soft">
          The point isn't the certificate. It's the line a family can honestly write
          afterwards — and the artefact sitting behind it.
        </p>
        <ProfileImpact programme={p} color={track.color} />
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-[1000px] scroll-mt-32 px-5 pt-12">
        <h2 className="font-serif text-[clamp(1.45rem,3.4vw,1.9rem)] font-medium">
          What families <em className="text-crimson-deep italic">say</em>
        </h2>
        <ProgrammeTestimonials programme={p} color={track.color} />

        {p.badge ? (
          <div className="mt-9 flex flex-wrap items-center gap-4 rounded-[18px] border border-line bg-wash px-6 py-5">
            <span className="text-[1.6rem]" aria-hidden>
              🛡️
            </span>
            <div>
              <b className="text-[1rem]">{p.badge}</b>
              <p className="mt-1 text-[0.86rem] text-ink-soft">
                If it isn't right for your child after the first session, tell us — we
                sort it out without forms or fuss.
              </p>
            </div>
          </div>
        ) : null}
      </section>


      {/* Cohorts */}
      <section id="dates" className="mx-auto max-w-[1000px] scroll-mt-32 px-5 pt-12">
        <h2 className="font-serif text-[clamp(1.45rem,3.4vw,1.9rem)] font-medium">
          Upcoming <em className="text-crimson-deep italic">cohorts</em>
        </h2>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {cohorts.length === 0 ? (
            <p className="text-[0.9rem] text-ink-soft">
              Dates for the next intake are being confirmed — the programme page has
              the latest.
            </p>
          ) : null}
          {cohorts.map((c, i) => {
            const g = cohortGrades(p, c);
            const f = feeOf(p, c);
            const disc = f.r && f.r !== f.e;
            return (
              <div
                key={c.d}
                className="flex flex-col gap-2 rounded-2xl border border-line bg-paper p-4.5 shadow-soft"
              >
                {isSoon(c.d) ? (
                  <span className="w-fit rounded-md bg-gold px-2.5 py-[3px] text-[0.64rem] font-bold tracking-wide text-paper uppercase">
                    Starting soon
                  </span>
                ) : null}
                <span className="font-serif text-[1.25rem] font-semibold">
                  {fmtLong(c.d)}
                </span>
                <small className="mono-label text-ink-faint">
                  {p.dur} · Grades {g[0]}–{g[1]} · Batch {i + 1}
                </small>
                <span className="text-[0.88rem]">
                  <b className="font-serif text-[1.05rem]">{f.e}</b>
                  {disc ? (
                    <>
                      <s className="ml-1.5 text-[0.78rem] text-ink-faint">{f.r}</s>{" "}
                      early bird
                    </>
                  ) : null}
                </span>
                <a
                  href={p.apply}
                  target="_blank"
                  rel="noopener"
                  className="mt-auto rounded-xl px-3 py-2.5 text-center text-[0.85rem] font-bold text-paper no-underline transition-[filter] hover:brightness-110"
                  style={{ background: track.color }}
                >
                  Apply for this cohort
                </a>
              </div>
            );
          })}
        </div>
        <p className="mt-3.5 text-[0.8rem] text-ink-faint">
          Session times shown in Dubai time (GMT+4) with US Eastern alongside. Fees are
          correct at time of publishing — confirm on the programme page.
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
      <section id="faq" className="mx-auto max-w-[760px] scroll-mt-32 px-5 pt-12">
        <h2 className="text-center font-serif text-[clamp(1.45rem,3.4vw,1.9rem)] font-medium">
          Parents usually <em className="text-crimson-deep italic">ask</em>
        </h2>
        <div className="mt-6 flex flex-col gap-2.5">
          {d.faqs.map((f) => (
            <details
              key={f.q}
              className="overflow-hidden rounded-[14px] border border-line bg-paper"
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
        <section className="mx-auto max-w-[1000px] px-5 pt-14">
          <h2 className="font-serif text-[clamp(1.35rem,3vw,1.7rem)] font-medium">
            Families looking at this also{" "}
            <em className="text-crimson-deep italic">consider</em>
          </h2>
          <div className="mt-5 grid gap-3.5 sm:grid-cols-3">
            {related.map((r) => {
              const rt = TRACKS[r.tracks[0]!];
              const rn = r.cohorts.find((c) => !isPast(c.d));
              return (
                <Link
                  key={r.id}
                  to="/programmes/$slug"
                  params={{ slug: slugOf(r) }}
                  className="flex flex-col gap-2 rounded-2xl border border-line bg-paper p-4.5 no-underline shadow-soft transition-all hover:-translate-y-[3px] hover:shadow-lift"
                >
                  <span className="text-[0.74rem] font-bold" style={{ color: rt.color }}>
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
          <div className="mt-7 mb-4">
            <Link
              to="/finder"
              search={DEFAULT_SEARCH}
              className="text-[0.9rem] font-semibold text-crimson no-underline hover:underline"
            >
              ← Browse all programmes
            </Link>
          </div>
        </section>
      ) : null}

      {/* Sticky apply bar */}
      <div className="fixed inset-x-0 bottom-0 z-60 border-t border-line bg-paper shadow-[0_-8px_24px_-16px_rgba(28,34,48,0.35)]">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-4 px-5 py-3">
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
    </main>
  );
}
