import { Link } from "@tanstack/react-router";
import { LinkedInGlyph, StoryGallery } from "@/components/StoryGallery";
import { APPROVED_STORIES } from "@/lib/social-proof";

/** Home-page stories band. Loaded lazily — it sits well below the fold. */
export default function StoryStrip() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-start gap-3">
          <LinkedInGlyph />
          <div>
            <h2 className="font-serif text-[clamp(1.4rem,3.4vw,1.95rem)] font-medium">
              What families post <em className="text-crimson-deep">afterwards</em>
            </h2>
            <p className="mt-1.5 max-w-[38em] text-[0.9rem] text-ink-soft">
              Not testimonials we wrote — posts students and parents put on their own
              feeds. Tap one to read it in full.
            </p>
          </div>
        </div>
        <Link
          to="/stories"
          search={{ track: "" }}
          className="text-[0.85rem] font-bold text-crimson no-underline hover:underline"
        >
          See all stories →
        </Link>
      </div>
      <div className="mt-7">
        <StoryGallery stories={APPROVED_STORIES} limit={4} variant="strip" />
      </div>
    </>
  );
}
