import { DEFAULT_TESTIMONIAL_SEARCH } from "@/lib/testimonials";
import { Link } from "@tanstack/react-router";
import { LearnerQuotes } from "@/components/LearnerQuotes";
import {
  InstagramGlyph,
  LinkedInGlyph,
  StoryGallery,
} from "@/components/StoryGallery";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { CAMP_QUOTES, ONLINE_QUOTES } from "@/lib/learner-testimonials";
import {
  APPROVED_INSTAGRAM,
  APPROVED_LINKEDIN,
  VIDEO_TESTIMONIALS,
} from "@/lib/social-proof";


function SeeAll({ label }: { label: string }) {
  return (
    <Link
      to="/testimonials"
      search={DEFAULT_TESTIMONIAL_SEARCH}
      className="inline-flex items-center gap-2 rounded-full border border-crimson/30 px-5 py-2.5 text-[0.85rem] font-bold text-crimson no-underline transition-colors hover:bg-crimson/5"
    >
      {label} <span aria-hidden>→</span>
    </Link>
  );
}

/** Home-page stories band. Loaded lazily - it sits well below the fold. */
export default function StoryStrip() {
  return (
    <>
      <div className="flex items-end justify-center gap-2">
        <LinkedInGlyph className="h-9 w-9" />
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium leading-none">
          In their <em className="text-crimson-deep">own words</em>, on their own
          feeds
        </h2>
      </div>

      <div className="mt-1 flex flex-col items-center gap-4">
        <p className="max-w-[64em] text-center text-[0.92rem] leading-relaxed text-ink-soft">
          Real posts from students, parents and mentors after their cohort ended.
          Tap any one to read it in full.
        </p>
      </div>

      <div className="mt-4">
        <StoryGallery stories={APPROVED_LINKEDIN} limit={6} variant="carousel" />
      </div>

      {APPROVED_INSTAGRAM.length > 0 ? (
        <div className="mt-16">
          <div className="flex items-end justify-center gap-2">
            <InstagramGlyph className="h-9 w-9" />
            <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium leading-none">
              Research and wins we <em className="text-crimson-deep">shared</em>
            </h2>
          </div>
          <div className="mt-1 flex flex-col items-center gap-4">
            <p className="max-w-[64em] text-center text-[0.92rem] leading-relaxed text-ink-soft">
              Published papers, judged pitches and competition results, posted as
              they happened on Instagram.
            </p>
          </div>
          <div className="mt-4">
            <StoryGallery
              stories={APPROVED_INSTAGRAM}
              variant="marquee"
            />
          </div>
        </div>
      ) : null}

      <div className="mt-16">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium leading-none">
          What learners said about{" "}
          <em className="text-crimson-deep">each programme</em>
        </h2>
        <div className="mt-1 flex flex-col items-center gap-4">

          <p className="max-w-[64em] text-center text-[0.92rem] leading-relaxed text-ink-soft">
            Unedited answers from end-of-programme feedback forms, labelled with the
            cohort they came from. Tap any card to read the full note.
          </p>
          <SeeAll label="Read all learner feedback" />
        </div>
        <div className="mt-4">
          <LearnerQuotes quotes={ONLINE_QUOTES} duration={190} />
        </div>
        <p className="mt-6 text-center text-[0.78rem] font-semibold tracking-[0.14em] text-ink-faint uppercase">
          Summer Camp 2026
        </p>
        <div className="mt-2">
          <LearnerQuotes quotes={CAMP_QUOTES} duration={175} />
        </div>
      </div>


      {VIDEO_TESTIMONIALS.length > 0 ? (
        <div className="mt-16">
          <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium leading-none">
            Hear it from the <em className="text-crimson-deep">students</em>
          </h2>
          <div className="mt-1 flex flex-col items-center gap-4">

            <p className="max-w-[64em] text-center text-[0.92rem] leading-relaxed text-ink-soft">
              One-minute clips recorded at the end of a cohort, unscripted.
            </p>
            <SeeAll label="Watch all clips" />
          </div>
          <div className="mt-4">
            <VideoTestimonials videos={VIDEO_TESTIMONIALS} limit={4} />
          </div>
        </div>
      ) : null}

      <div className="mt-12 flex justify-center">
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
