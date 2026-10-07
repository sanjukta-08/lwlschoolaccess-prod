import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeading } from "@/components/SectionHeading";
import { CampCardGrid } from "@/components/CampCard";
import { CampVideoWall } from "@/components/CampVideoWall";
import { CampVoices } from "@/components/CampVoices";
import { CampFaq } from "@/components/CampFaq";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import birdAsset from "@/assets/lwl-bird-black.webp.asset.json";
import {
  CAMPS,
  CAMP_FAQS,
  CAMP_WEEK,
  REGIONS,
  SEASONS,
  datesLabel,
  sortedCamps,
  type Region,
  type Season,
} from "@/lib/camps";
import { Link } from "@tanstack/react-router";

const TITLE = "Summer & Winter Camps at Harvard, Cambridge, Geneva | Learn with Leaders";
const DESC =
  "In-person residential camps for Grades 8-12 at Harvard, Cambridge Judge, the University of Geneva and Salamanca. Dates, grade bands, what is included and how to apply.";

export const Route = createFileRoute("/camps/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: CAMP_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: CampsHub,
});

const seg = (active: boolean) =>
  `px-4 py-1.5 text-[0.7rem] font-semibold tracking-wide uppercase transition-colors ${
    active ? "bg-crimson text-paper" : "bg-paper text-ink-soft hover:text-crimson"
  }`;

function CampsHub() {
  const [region, setRegion] = useState<Region | "all">("all");
  const [season, setSeason] = useState<Season | "all">("all");

  const camps = useMemo(
    () =>
      sortedCamps(
        CAMPS.filter(
          (c) =>
            (region === "all" || c.region === region) && (season === "all" || c.season === season),
        ),
      ),
    [region, season],
  );

  const upcoming = sortedCamps(CAMPS)
    .filter((c) => c.cohorts[0]?.start)
    .slice(0, 3);
  const cities = new Set(CAMPS.map((c) => c.city)).size;
  const universities = new Set(CAMPS.map((c) => c.host)).size;

  return (
    <div className="min-h-dvh bg-paper">
      <SiteHeader />
      <section className="relative isolate flex min-h-[19rem] items-center justify-center overflow-hidden border-b border-line bg-paper px-5 pb-10 pt-8 sm:min-h-[21rem] sm:px-8 lg:pb-12 lg:pt-10">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[68%] select-none items-center overflow-hidden pl-8 sm:flex"
          aria-hidden
        >
          <span className="whitespace-nowrap font-display text-[clamp(5.5rem,12vw,11rem)] font-black uppercase leading-none text-crimson/[0.06]">
            Camps
          </span>
        </div>
        <div
          className="pointer-events-none absolute right-10 top-1/2 z-[1] hidden w-[min(320px,21vw)] -translate-y-1/2 opacity-20 xl:block"
          aria-hidden
        >
          <img
            src={birdAsset.url}
            alt=""
            className="h-auto w-full object-contain object-right [mask-image:linear-gradient(to_left,black_55%,transparent_95%)]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-display text-5xl font-black leading-[0.98] text-ink sm:text-6xl xl:text-7xl">
            Explore Our <span className="text-crimson">Camps</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {CAMPS.length} residential camps at {universities} universities across {cities} cities —
            Harvard, Cambridge Judge, the University of Geneva and Salamanca. Small cohorts,
            undergraduate mentors, and a project your child presents before they fly home.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#all-camps"
              className="mono-label bg-crimson px-8 py-4 text-paper no-underline shadow-soft transition-colors hover:bg-crimson-deep"
            >
              View all camps
            </a>
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mono-label border border-line bg-paper px-8 py-4 text-ink no-underline shadow-soft transition-colors hover:border-gold-line hover:text-crimson"
            >
              Book a meeting
            </a>
          </div>
        </div>

        <div
          className="pointer-events-none absolute left-8 top-1/2 hidden h-32 w-1 -translate-y-1/2 bg-crimson/20 lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block"
          aria-hidden
        >
          <span className="mono-label text-crimson/35 [writing-mode:vertical-rl]">
            Learn with Leaders
          </span>
        </div>
      </section>

      {/* ---------- next departures ---------- */}
      <section className="border-y border-line bg-paper py-12">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Confirmed sessions"
            align="left"
            sub="Here are the next confirmed cohorts. Places are confirmed once the application review is complete."
          >
            Camps starting <em className="text-crimson-deep">soon</em>
          </SectionHeading>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {upcoming.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/camps/$slug"
                  params={{ slug: c.slug }}
                  className="flex h-full flex-col gap-2 rounded-sm border border-line bg-[#fbfbf9] p-5 no-underline transition-colors hover:border-gold-line"
                >
                  <span className="mono-label text-gold-deep">{datesLabel(c)}</span>
                  <span className="font-serif text-[1.15rem] leading-tight font-medium text-ink">
                    {c.name}
                  </span>
                  <span className="text-[0.82rem] text-ink-soft">
                    {c.host} · {c.city}, {c.country} · {c.gradeBand}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- all camps ---------- */}
      <section id="all-camps" className="page-shell scroll-mt-20 py-16">
        <SectionHeading
          eyebrow="Every camp"
          align="left"
          sub="Filter by destination and season. Every camp is residential, supervised and taught on campus."
        >
          Choose the <em className="text-crimson-deep">campus</em>
        </SectionHeading>

        <div className="mt-6 mb-10 flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span className="mono-label text-crimson">Destination</span>
            <div className="flex divide-x divide-line border border-line">
              <button
                type="button"
                className={seg(region === "all")}
                onClick={() => setRegion("all")}
              >
                All
              </button>
              {REGIONS.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  className={seg(region === r.key)}
                  onClick={() => setRegion(r.key)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="mono-label text-crimson">Season</span>
            <div className="flex divide-x divide-line border border-line">
              <button
                type="button"
                className={seg(season === "all")}
                onClick={() => setSeason("all")}
              >
                Any
              </button>
              {SEASONS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className={seg(season === s.key)}
                  onClick={() => setSeason(s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {camps.length ? (
          <CampCardGrid camps={camps} />
        ) : (
          <p className="rounded-sm border border-line bg-paper p-8 text-center text-[0.92rem] text-ink-soft">
            No camps match that combination yet. Clear a filter, or{" "}
            <a href={CALENDLY_BOOKING_URL} target="_blank" rel="noopener" className="text-crimson">
              talk to an advisor
            </a>{" "}
            about what is coming.
          </p>
        )}
      </section>

      {/* ---------- the week ---------- */}
      <section className="border-y border-line bg-paper py-16">
        <div className="page-shell">
          <SectionHeading
            eyebrow="A week in the life"
            align="left"
            sub="Camps are busy on purpose. Here is the shape of a typical week, wherever your child lands."
          >
            What the week actually <em className="text-crimson-deep">feels like</em>
          </SectionHeading>
          <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {CAMP_WEEK.map((s, i) => (
              <li key={s.title} className="border-t-2 border-gold-line pt-4">
                <span className="mono-label text-gold-deep">0{i + 1}</span>
                <h3 className="mt-1 font-serif text-[1.15rem] font-medium text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- video ---------- */}
      <section className="page-shell py-16">
        <SectionHeading
          eyebrow="Real footage"
          align="left"
          sub="Filmed at the Geneva camp - the FabLab build days, the international quarter and the final showcase."
        >
          See a camp <em className="text-crimson-deep">from the inside</em>
        </SectionHeading>
        <div className="mt-8">
          <CampVideoWall />
        </div>
      </section>

      {/* ---------- voices ---------- */}
      <section className="border-y border-line bg-paper py-16">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Students and parents"
            align="left"
            sub="Unedited notes from families who have already sent a child on a camp."
          >
            What they said <em className="text-crimson-deep">afterwards</em>
          </SectionHeading>
          <div className="mt-8">
            <CampVoices />
          </div>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="page-shell py-16">
        <SectionHeading
          eyebrow="Before you book"
          sub="Supervision, visas, flights and fees - the five questions every parent asks us first."
        >
          Parents usually <em className="text-crimson-deep">ask</em>
        </SectionHeading>
        <div className="mt-8">
          <CampFaq items={CAMP_FAQS} />
        </div>
      </section>

      {/* ---------- closing band ---------- */}
      <section className="bg-ink py-16 text-paper">
        <div className="page-shell flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] leading-tight font-medium">
              Not sure which campus fits your child?
            </h2>
            <p className="mt-2 max-w-[46em] text-[0.95rem] text-paper/75">
              Twenty minutes with an advisor is usually enough: grade band, travel window,
              interests, budget - then a shortlist of one or two camps.
            </p>
          </div>
          <a
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="mono-label shrink-0 bg-paper px-8 py-4 text-ink no-underline transition-colors hover:bg-gold-soft"
          >
            Book a call
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
