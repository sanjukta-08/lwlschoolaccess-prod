import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Globe2, Users } from "lucide-react";
import { ensureCatalogue } from "@/lib/catalogue";
import { PROGRAMMES } from "@/lib/programmes";
import { conferenceImage } from "@/lib/conferences";
import { ConferenceCard } from "@/components/conferences/ConferenceCard";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Harvard WorldMUN Conferences | Learn with Leaders";
const DESC = "Explore live Harvard WorldMUN conference destinations, dates, eligibility, fees and application links with Learn with Leaders.";

export const Route = createFileRoute("/conferences/")({
  staticData: { sitemap: true },
  loader: async ({ context }) => {
    await ensureCatalogue(context.queryClient);
    return { conferences: PROGRAMMES.filter((p) => p.type === "conf") };
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConferencesHub,
});

function ConferencesHub() {
  const { conferences } = Route.useLoaderData();
  const upcoming = conferences.filter((conference) => conference.cohorts.length > 0);
  const destinations = new Set(conferences.map((conference) => conference.location).filter(Boolean)).size;
  const lead = upcoming[0] ?? conferences[0];

  return (
    <div className="min-h-dvh bg-paper">
      <SiteHeader />
      <main>
        <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-ink">
          {lead ? (
            <img src={conferenceImage(lead)} alt="Harvard WorldMUN delegates" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
          <div className="page-shell relative z-10 w-full py-16 text-paper md:py-24">
            <p className="mono-label text-gold-line">Global conferences · Live catalogue</p>
            <h1 className="mt-4 max-w-[13ch] font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-semibold text-paper">
              Harvard WorldMUN, worldwide
            </h1>
            <p className="mt-6 max-w-[45rem] text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-paper/80">
              Step into committee rooms across the world. Research, debate, negotiate, and build friendships with students from different countries.
            </p>
            <a href="#destinations" className="mt-8 inline-flex items-center gap-2 bg-crimson px-7 py-3.5 font-semibold text-paper no-underline hover:bg-crimson-deep">
              Explore destinations <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </section>

        <section className="border-b border-line bg-wash py-8">
          <div className="page-shell grid grid-cols-3 divide-x divide-line">
            {[
              [Globe2, `${destinations || conferences.length}`, "destinations"],
              [CalendarDays, `${upcoming.length}`, "upcoming conferences"],
              [Users, "Grades 6–12", "live eligibility varies"],
            ].map(([Icon, value, label]) => {
              const StatIcon = Icon as typeof Globe2;
              return (
                <div key={String(label)} className="px-3 text-center md:px-8">
                  <StatIcon className="mx-auto h-5 w-5 text-crimson" aria-hidden />
                  <strong className="mt-2 block font-serif text-[clamp(1.2rem,3vw,2rem)] text-ink">{String(value)}</strong>
                  <span className="text-[0.72rem] text-ink-soft md:text-[0.82rem]">{String(label)}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section id="destinations" className="page-shell scroll-mt-24 py-20">
          <p className="mono-label text-crimson">Conference destinations</p>
          <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-[14ch] font-serif text-[clamp(2.2rem,5vw,4rem)] leading-tight font-semibold text-ink">
              Choose where you will represent the world
            </h2>
            <p className="max-w-[31rem] text-[0.95rem] leading-relaxed text-ink-soft">
              Dates, eligibility, fees, availability, and application links below come directly from the live catalogue.
            </p>
          </div>
          {conferences.length ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {conferences.map((conference) => <ConferenceCard key={conference.id} conference={conference} />)}
            </div>
          ) : (
            <p className="mt-10 border border-line bg-wash p-8 text-center text-ink-soft">
              Conference dates are being updated. Please check back shortly.
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}