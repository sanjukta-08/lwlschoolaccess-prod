import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeading } from "@/components/SectionHeading";
import { CampCard } from "@/components/CampCard";
import { CampVideoWall } from "@/components/CampVideoWall";
import { CampVoices } from "@/components/CampVoices";
import { CampFaq } from "@/components/CampFaq";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { CAMPS, campBySlug, datesLabel, relatedCamps, type Camp } from "@/lib/camps";

export const Route = createFileRoute("/camps/$slug")({
  loader: ({ params }) => {
    const camp = campBySlug(params.slug);
    if (!camp) throw notFound();
    return { camp };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Camp not found | Learn with Leaders" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const c = loaderData.camp;
    const title = `${c.name} at ${c.host} | Learn with Leaders`;
    const desc = `${c.promise} ${c.gradeBand}. ${c.durationLabel} in ${c.city}, ${c.country}. ${datesLabel(c)}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: c.name,
            description: desc,
            provider: { "@type": "Organization", name: "Learn with Leaders" },
            locationCreated: `${c.city}, ${c.country}`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: CampNotFound,
  component: CampPage,
});

function CampNotFound() {
  return (
    <div className="min-h-dvh bg-[#fbfbf9]">
      <SiteHeader />
      <div className="page-shell py-24 text-center">
        <h1 className="font-serif text-[2rem] font-medium">We could not find that camp</h1>
        <p className="mt-3 text-ink-soft">
          It may have been renamed or the intake has closed.
        </p>
        <Link
          to="/camps"
          className="mono-label mt-6 inline-block bg-crimson px-7 py-3.5 text-paper no-underline"
        >
          See all camps
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function ApplyButtons({ camp, tone = "light" }: { camp: Camp; tone?: "light" | "dark" }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={camp.applyUrl}
        target="_blank"
        rel="noopener"
        className="mono-label bg-crimson px-7 py-3.5 text-paper no-underline shadow-soft transition-colors hover:bg-crimson-deep"
      >
        {camp.cohorts[0]?.start ? "Apply now" : "Join the interest list"}
      </a>
      <a
        href={CALENDLY_BOOKING_URL}
        target="_blank"
        rel="noopener"
        className={`mono-label border px-7 py-3.5 no-underline transition-colors ${
          tone === "dark"
            ? "border-paper/40 text-paper hover:bg-paper/10"
            : "border-ink/25 text-ink hover:bg-ink/5"
        }`}
      >
        Book a call
      </a>
    </div>
  );
}

function CampPage() {
  const { camp } = Route.useLoaderData();
  const related = relatedCamps(camp);

  return (
    <div className="min-h-dvh bg-[#fbfbf9] pb-24 md:pb-0">
      <SiteHeader />

      {/* ---------- hero ---------- */}
      <section className="page-shell grid grid-cols-1 items-center gap-12 pt-8 pb-14 lg:grid-cols-12 lg:pt-14">
        <div className="flex flex-col gap-5 lg:col-span-6">
          <nav className="mono-label flex items-center gap-2 text-ink-faint">
            <Link to="/camps" className="text-ink-faint no-underline hover:text-crimson">
              Camps
            </Link>
            <span aria-hidden>/</span>
            <span>{camp.theme}</span>
          </nav>

          <span className="mono-label border border-gold-line px-2 py-1 text-gold-deep self-start">
            {camp.eyebrow}
          </span>

          <h1 className="font-serif text-[clamp(2.1rem,5.4vw,3.5rem)] leading-[1.02] font-normal tracking-tight text-ink">
            {camp.name}
          </h1>
          <p className="font-serif text-[1.25rem] text-crimson-deep">at {camp.host}</p>
          {camp.hostedBy ? (
            <p className="mono-label text-ink-faint">{camp.hostedBy}</p>
          ) : null}

          <p className="max-w-[36em] text-[1rem] leading-relaxed text-ink-soft">{camp.lede}</p>

          <ul className="flex flex-wrap gap-2">
            {[
              datesLabel(camp),
              `${camp.city}, ${camp.country}`,
              camp.durationLabel,
              camp.gradeBand,
            ].map((f) => (
              <li
                key={f}
                className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[0.78rem] font-semibold text-ink-soft"
              >
                {f}
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <ApplyButtons camp={camp} />
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-wash shadow-lift">
            <img
              src={camp.image}
              alt={`${camp.host} campus in ${camp.city}`}
              width={900}
              height={1120}
              className="h-full w-full object-cover"
            />
            <span className="mono-label absolute top-5 left-5 bg-paper/90 px-3 py-1.5 text-crimson backdrop-blur-sm">
              {camp.city}, {camp.country}
            </span>
          </div>
        </div>
      </section>

      {/* ---------- stat band ---------- */}
      <section className="border-y border-line bg-ink py-10 text-paper">
        <ul className="page-shell grid grid-cols-2 gap-8 md:grid-cols-4">
          {camp.stats.map((s) => (
            <li key={s.label}>
              <div className="font-serif text-[2.2rem] leading-none text-gold">{s.value}</div>
              <div className="mono-label mt-2 text-paper/70">{s.label}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- vision ---------- */}
      <section className="page-shell grid grid-cols-1 gap-10 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="The vision" align="left">
            Why this camp <em className="text-crimson-deep">exists</em>
          </SectionHeading>
        </div>
        <div className="space-y-5 lg:col-span-8">
          {camp.vision.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-serif text-[1.3rem] leading-snug text-ink"
                  : "text-[0.98rem] leading-relaxed text-ink-soft"
              }
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ---------- journey ---------- */}
      <section className="border-y border-line bg-paper py-16">
        <div className="page-shell">
          <SectionHeading
            eyebrow="The journey"
            align="left"
            sub="A guided progression rather than a series of unconnected talks."
          >
            {camp.journey.length} stages. One <em className="text-crimson-deep">arc</em>.
          </SectionHeading>
          <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
            {camp.journey.map((d) => (
              <li key={d.day} className="border-t-2 border-gold-line pt-4">
                <span className="mono-label text-gold-deep">{d.day}</span>
                <h3 className="mt-1 font-serif text-[1.25rem] font-medium text-ink">{d.title}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-soft">{d.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- framework ---------- */}
      <section className="page-shell py-16">
        <SectionHeading
          eyebrow="The framework"
          align="left"
          sub="Who it serves, how it unfolds, and what students carry forward."
        >
          A camp built <em className="text-crimson-deep">around your child</em>
        </SectionHeading>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {camp.framework.map((f) => (
            <div key={f.no} className="rounded-sm border border-line bg-paper p-6 shadow-soft">
              <span className="font-serif text-[1.8rem] leading-none text-gold">{f.no}</span>
              <h3 className="mt-3 font-serif text-[1.2rem] font-medium text-ink">{f.title}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- inclusions ---------- */}
      <section className="border-y border-line bg-paper py-16">
        <div className="page-shell grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mono-label mb-4 text-gold-deep">What the fee covers</h3>
            <ul className="space-y-2.5">
              {camp.included.map((i) => (
                <li key={i} className="flex gap-3 text-[0.92rem] text-ink-soft">
                  <span className="text-crimson" aria-hidden>
                    ✓
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mono-label mb-4 text-ink-faint">Not included</h3>
            <ul className="space-y-2.5">
              {camp.notIncluded.map((i) => (
                <li key={i} className="flex gap-3 text-[0.92rem] text-ink-soft">
                  <span className="text-ink-faint" aria-hidden>
                    –
                  </span>
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.85rem] text-ink-faint italic">
              Fees are confirmed on application. Sibling and school-group rates are
              available - ask an advisor before you book.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- cohorts ---------- */}
      <section className="page-shell py-16">
        <SectionHeading
          eyebrow="Dates"
          align="left"
          sub="Places are allocated in the order applications are completed."
        >
          Upcoming <em className="text-crimson-deep">cohorts</em>
        </SectionHeading>
        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {camp.cohorts.map((c) => (
            <li
              key={c.label}
              className="flex flex-col gap-3 rounded-sm border border-line bg-paper p-6 shadow-soft"
            >
              {c.note ? <span className="mono-label text-gold-deep">{c.note}</span> : null}
              <span className="font-serif text-[1.4rem] font-medium text-ink">{c.label}</span>
              <span className="text-[0.85rem] text-ink-soft">
                {camp.durationLabel} · {camp.city}, {camp.country} · {camp.gradeBand}
              </span>
              <a
                href={camp.applyUrl}
                target="_blank"
                rel="noopener"
                className="mono-label mt-1 self-start border border-crimson px-5 py-2.5 text-crimson no-underline transition-colors hover:bg-crimson hover:text-paper"
              >
                {c.start ? "Apply for this cohort" : "Register interest"}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- proof ---------- */}
      <section className="border-y border-line bg-paper py-16">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Proof"
            align="left"
            sub="Footage and notes from Learn with Leaders camp weeks."
          >
            What families <em className="text-crimson-deep">tell us</em>
          </SectionHeading>
          <div className="mt-8 space-y-10">
            <CampVoices limit={3} />
            <CampVideoWall />
          </div>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="page-shell py-16">
        <SectionHeading eyebrow="Before you book">
          Parents usually <em className="text-crimson-deep">ask</em>
        </SectionHeading>
        <div className="mt-8">
          <CampFaq items={camp.faqs} />
        </div>
      </section>

      {/* ---------- related ---------- */}
      <section className="border-t border-line bg-paper py-16">
        <div className="page-shell">
          <SectionHeading eyebrow="Also consider" align="left">
            Other <em className="text-crimson-deep">camps</em>
          </SectionHeading>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CampCard key={c.slug} camp={c} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* ---------- sticky apply bar ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 py-3 shadow-lift backdrop-blur-sm md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-[0.85rem] font-bold text-ink">{camp.name}</div>
            <div className="mono-label truncate text-ink-faint">{datesLabel(camp)}</div>
          </div>
          <a
            href={camp.applyUrl}
            target="_blank"
            rel="noopener"
            className="mono-label shrink-0 bg-crimson px-5 py-3 text-paper no-underline"
          >
            {camp.cohorts[0]?.start ? "Apply" : "Interest"}
          </a>
        </div>
      </div>
    </div>
  );
}

export const ALL_CAMP_SLUGS = CAMPS.map((c) => c.slug);
