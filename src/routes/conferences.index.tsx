import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
  return (
    <div className="min-h-dvh bg-[#080b10] text-white">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-36 md:pb-24 md:pt-48">
          <div className="pointer-events-none absolute -right-6 top-24 select-none text-[clamp(7rem,23vw,21rem)] font-black leading-none tracking-[-0.08em] text-[#d2a84a]/[0.07]">MUN</div>
          <div className="relative mx-auto max-w-[1600px]">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d2a84a]">Learn with Leaders · Conferences</p>
            <h1 className="mt-7 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-bold leading-[0.86] tracking-[-0.055em]">Global ideas.<br/><span className="text-[#d2a84a]">Global stages.</span></h1>
            <div className="mt-10 flex flex-col justify-between gap-8 border-t border-white/20 pt-7 md:flex-row md:items-end"><p className="max-w-2xl text-lg leading-relaxed text-white/65">Join globally renowned conferences that bring ambitious students together for debate, diplomacy, and leadership.</p><a href="#destinations" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#d2a84a]">Explore conferences <ArrowRight className="h-4 w-4"/></a></div>
          </div>
        </section>

        <section id="destinations" className="relative mx-auto max-w-[1600px] scroll-mt-24 px-6 py-20 md:py-28">
          <span className="pointer-events-none absolute right-4 top-8 select-none text-[clamp(5rem,15vw,13rem)] font-black leading-none text-white/[0.025]">WORLD</span>
          <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[0.32em] text-[#d2a84a]">Harvard WorldMUN</p><h2 className="mt-4 text-4xl font-bold md:text-6xl">Choose your destination</h2></div><p className="max-w-md text-sm leading-relaxed text-white/50">Conference dates, eligibility, and availability are drawn from the live catalogue.</p></div>
          {conferences.length ? (
            <div className="mt-14 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {conferences.map((conference) => <ConferenceCard key={conference.id} conference={conference} />)}
            </div>
          ) : (
            <p className="mt-10 border border-white/15 p-8 text-center text-white/60">
              Conference dates are being updated. Please check back shortly.
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}