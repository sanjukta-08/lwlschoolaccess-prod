import { Link } from "@tanstack/react-router";
import { LinkedInGlyph, StoryGallery } from "@/components/StoryGallery";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { APPROVED_LINKEDIN } from "@/lib/social-proof";

/** Home-page stories band. Loaded lazily - it sits well below the fold. */
export default function StoryStrip() {
  return (
    <>
      <div className="flex items-center gap-3">
        <LinkedInGlyph className="h-12 w-12 self-center" />
        <h2 className="font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium leading-none">
          What families post <em className="text-crimson-deep">afterwards</em>
        </h2>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-[38em] text-[0.92rem] leading-relaxed text-ink-soft">
          Not testimonials we wrote - posts students and parents put on their own feeds.
          Tap one to read it in full.
        </p>
        <Link
          to="/stories"
          search={{ track: "" }}
          className="inline-flex items-center gap-2 rounded-full border border-crimson/30 px-5 py-2.5 text-[0.85rem] font-bold text-crimson no-underline transition-colors hover:bg-crimson/5"
        >
          See all stories <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-7">
        <StoryGallery stories={APPROVED_LINKEDIN} limit={6} variant="carousel" />
      </div>


      <div className="mt-8 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl border border-gold/35 bg-gold/8 px-6 py-4">
          <span aria-hidden className="text-gold">
            ✦
          </span>
          <span className="text-[0.9rem] text-ink-soft">
            Want your child to be here next?
          </span>
          <Link
            to="/finder"
            search={DEFAULT_SEARCH}
            className="text-[0.9rem] font-bold text-crimson no-underline hover:underline"
          >
            Explore programmes for grades 5-12 →
          </Link>
        </div>
      </div>
    </>
  );
}
