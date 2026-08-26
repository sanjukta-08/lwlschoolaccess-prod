import { Link, createFileRoute, stripSearchParams, useNavigate } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TestimonialFilters } from "@/components/TestimonialFilters";
import { TestimonialGrid } from "@/components/TestimonialGrid";

import { DEFAULT_SEARCH } from "@/lib/finder";
import {
  DEFAULT_TESTIMONIAL_SEARCH,
  FORMATS,
  FORMAT_ORDER,
  TESTIMONIAL_TOTAL,
  filterTestimonials,
  testimonialFacets,
} from "@/lib/testimonials";
import type { TestimonialSearch } from "@/lib/testimonials";

import birdAsset from "@/assets/lwl-bird-black.webp.asset.json";

const TITLE = "Student & parent testimonials | Learn with Leaders";
const DESC =
  "Filter 80+ testimonials from Learn with Leaders families - written cohort feedback, LinkedIn and Instagram posts, video clips and handwritten notes - by interest, programme and format.";

const str = (v: unknown, fallback: string) =>
  typeof v === "string" && v.length > 0 ? v : fallback;

export const Route = createFileRoute("/testimonials")({
  validateSearch: (search: Record<string, unknown>): TestimonialSearch => ({
    who: str(search["who"], "all"),
    track: str(search["track"], "all"),
    programme: str(search["programme"], "all"),
    format: str(search["format"], "all"),
    q: str(search["q"], ""),
  }),
  search: { middlewares: [stripSearchParams(DEFAULT_TESTIMONIAL_SEARCH)] },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: TITLE,
          description: DESC,
          numberOfItems: TESTIMONIAL_TOTAL,
        }),
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const update = (patch: Partial<TestimonialSearch>) => {
    void navigate({ search: (prev) => ({ ...prev, ...patch }) });
  };

  const results = filterTestimonials(search);
  const facets = testimonialFacets(search);

  return (
    <div className="min-h-screen bg-wash">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#fbfcfe_0%,#f7f2e8_60%,var(--wash)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_88%_20%,rgba(185,138,31,0.14),transparent_60%),radial-gradient(700px_420px_at_12%_10%,rgba(163,29,51,0.08),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(185,138,31,0.18) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden w-[min(420px,32vw)] -translate-y-1/2 opacity-[0.42] sm:block lg:w-[min(480px,30vw)]">
          <img
            src={birdAsset.url}
            alt=""
            aria-hidden="true"
            className="h-auto w-full object-contain object-right [mask-image:linear-gradient(to_left,black_55%,transparent_95%)]"
          />
        </div>

        <div className="relative">
          <SiteHeader />
          <section className="page-shell flex flex-col gap-4 pt-8 pb-10">
            <div>
              <span className="mono-label mb-2 inline-flex items-center gap-2 text-crimson">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                {TESTIMONIAL_TOTAL} testimonials · students & parents
              </span>
              <h1 className="font-serif text-[clamp(1.8rem,4.4vw,2.7rem)] leading-[1.1] font-medium tracking-tight">
                What families say <em className="text-crimson-deep">afterwards</em>
              </h1>
              <p className="mt-3 max-w-[58em] text-[0.98rem] leading-relaxed text-ink-soft">
                Every quote, post, clip and handwritten note we have permission to
                share, in one searchable place. Filter by who said it, the interest
                area, the exact programme, or the format you trust most.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {[
                [`${TESTIMONIAL_TOTAL} testimonials`, "All formats in one feed"],
                [`${PARENT_COUNT} parent voices`, "Written by families"],
                [`${VIDEO_COUNT} video clips`, "In their own words"],
                [`${PROGRAMMES.length} programmes`, "Filter cohort by cohort"],
              ].map(([top, sub]) => (
                <li
                  key={top}
                  className="rounded-full border border-line bg-paper/90 px-3.5 py-1.5 shadow-soft backdrop-blur-sm"
                >
                  <b className="block text-[0.78rem] font-bold text-ink">{top}</b>
                  <small className="mono-label block text-ink-faint">{sub}</small>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="page-shell pb-16">
        <div className="mb-6">
          <TestimonialFilters
            search={search}
            facets={facets}
            total={results.length}
            onChange={update}
            onReset={() => update(DEFAULT_TESTIMONIAL_SEARCH)}
          />
        </div>

        {/* Format shortcuts - the quickest way to jump to videos or notes. */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mono-label mr-1 text-ink-faint">Jump to</span>
          {FORMAT_ORDER.filter((f) => (facets.format[f] ?? 0) > 0).map((f) => {
            const on = search.format === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => update({ format: on ? "all" : f })}
                aria-pressed={on}
                className={`rounded-full border px-3.5 py-1.5 text-[0.8rem] font-semibold transition-colors ${
                  on
                    ? "border-crimson bg-crimson text-paper"
                    : "border-line bg-paper text-ink-soft hover:border-gold"
                }`}
              >
                {FORMATS[f].label}
                <span className={on ? "ml-1.5 text-paper/70" : "ml-1.5 text-ink-faint"}>
                  {facets.format[f]}
                </span>
              </button>
            );
          })}
        </div>

        <TestimonialGrid items={results} />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-line bg-paper p-7 text-center shadow-soft">
          <p className="w-full font-serif text-[1.2rem] font-medium text-ink">
            Ready to write your own?
          </p>
          <Link
            to="/finder"
            search={DEFAULT_SEARCH}
            className="rounded-full bg-crimson px-7 py-3.5 text-[0.95rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
          >
            Find the right programme
          </Link>
          <Link
            to="/calendar"
            search={DEFAULT_SEARCH}
            className="rounded-full border border-line bg-paper px-7 py-3.5 text-[0.95rem] font-bold text-ink no-underline transition-colors hover:bg-wash"
          >
            See upcoming dates
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
