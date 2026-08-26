import { Link, createFileRoute, stripSearchParams } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { PressStrip } from "@/components/PressStrip";
import { LinkedInGlyph, StoryGallery } from "@/components/StoryGallery";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { TRACKS, type TrackKey } from "@/lib/programmes";
import { APPROVED_STORIES } from "@/lib/social-proof";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Student & parent stories | Learn with Leaders";
const DESC =
  "Screenshots of what students and parents posted on LinkedIn after their Learn with Leaders cohort - research papers, ventures, moots, portfolios and competition results. Tap any story to read it in full.";

const DEFAULTS = { track: "" as string };

export const Route = createFileRoute("/stories")({
  validateSearch: (search: Record<string, unknown>) => ({
    track: typeof search["track"] === "string" ? (search["track"] as string) : "",
  }),
  search: { middlewares: [stripSearchParams(DEFAULTS)] },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/stories" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: TITLE,
          description: DESC,
          numberOfItems: APPROVED_STORIES.length,
        }),
      },
    ],
  }),
  component: StoriesPage,
});

const CHIP =
  "flex-none rounded-full border px-3.5 py-1.5 text-[0.8rem] font-semibold no-underline transition-colors";

function StoriesPage() {
  const { track } = Route.useSearch();
  const active = track as TrackKey | "";
  const stories = active
    ? APPROVED_STORIES.filter((s) => s.tags.includes(active))
    : APPROVED_STORIES;

  return (
    <div className="min-h-screen bg-paper">
      <div className="relative">
        <div className="hero-wash absolute inset-0" />
        <div className="relative">
          <SiteHeader />
          <section className="mx-auto max-w-[1100px] px-5 pt-10 pb-12 text-center">
            <LinkedInGlyph />
            <h1 className="mt-4 font-serif text-[clamp(2rem,5.2vw,2.9rem)] font-medium leading-[1.1]">
              What families post <em className="text-crimson-deep">afterwards</em>
            </h1>
            <p className="mx-auto mt-4 max-w-[42em] text-[1rem] text-ink-soft">
              The honest measure of a programme is what a student says about it once it's
              over. These are the posts and messages we've been given permission to share
              - filter by interest, and tap any story to read the whole thing.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/finder"
                search={DEFAULT_SEARCH}
                className="rounded-full bg-crimson px-7 py-3.5 text-[0.95rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
              >
                Find the right programme
              </Link>
              <a
                href="https://www.linkedin.com/company/learn-with-leaders/"
                target="_blank"
                rel="noopener"
                className="rounded-full border border-line bg-paper px-7 py-3.5 text-[0.95rem] font-bold text-ink no-underline transition-colors hover:bg-wash"
              >
                Follow on LinkedIn
              </a>
            </div>
          </section>
        </div>
      </div>

      <section className="mx-auto max-w-[1100px] px-5 pb-16">
        <div className="flex gap-2 overflow-x-auto pb-4">
          <Link
            to="/stories"
            search={{ track: "" }}
            className={`${CHIP} ${
              active
                ? "border-line bg-paper text-ink-soft hover:bg-wash"
                : "border-crimson bg-crimson text-paper"
            }`}
          >
            All stories
          </Link>
          {(Object.keys(TRACKS) as TrackKey[]).map((k) => (
            <Link
              key={k}
              to="/stories"
              search={{ track: k }}
              className={`${CHIP} ${
                active === k
                  ? "border-crimson bg-crimson text-paper"
                  : "border-line bg-paper text-ink-soft hover:bg-wash"
              }`}
            >
              {TRACKS[k].ic} {TRACKS[k].label}
            </Link>
          ))}
        </div>

        <p className="mono-label mb-5 text-ink-faint">
          {stories.length} {stories.length === 1 ? "story" : "stories"}
          {active ? ` · ${TRACKS[active].label}` : ""}
        </p>

        {stories.length ? (
          <StoryGallery stories={stories} />
        ) : (
          <div className="rounded-2xl border border-line bg-wash p-8 text-center">
            <b className="text-[1rem]">No stories in this interest yet.</b>
            <p className="mt-2 text-[0.9rem] text-ink-soft">
              New posts go up after each cohort finishes.{" "}
              <Link to="/stories" search={{ track: "" }} className="font-bold text-crimson">
                See all stories
              </Link>
              .
            </p>
          </div>
        )}
      </section>

      <PressStrip />

      <section className="bg-wash px-5 py-14">
        <div className="mx-auto max-w-[720px] rounded-[22px] border border-line bg-paper p-8 text-center shadow-soft">
          <h2 className="font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
            Want your child's story here next year?
          </h2>
          <p className="mx-auto mt-3 max-w-[36em] text-[0.92rem] text-ink-soft">
            Tell us their grade and what they're curious about, and we'll suggest the two
            or three cohorts that fit - including how the timings work from your city.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/finder"
              search={DEFAULT_SEARCH}
              className="rounded-full bg-crimson px-7 py-3.5 text-[0.95rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
            >
              Open the Programme Finder
            </Link>
            <Link
              to="/profile-building"
              className="rounded-full border border-line px-7 py-3.5 text-[0.95rem] font-bold text-ink no-underline transition-colors hover:bg-wash"
            >
              How profile building works
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
