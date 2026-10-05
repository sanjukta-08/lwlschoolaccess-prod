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
import type { ReactNode } from "react";
import { WingMark } from "@/components/WingMark";
function SeeAll({ label }: { label: string }) {
  return (
    <Link
      to="/testimonials"
      search={DEFAULT_TESTIMONIAL_SEARCH}
      className="inline-flex flex-none items-center gap-2 rounded-full border border-crimson/30 px-5 py-2.5 text-[0.85rem] font-bold text-crimson no-underline transition-colors hover:bg-crimson/5"
    >
      {label} <span aria-hidden>→</span>
    </Link>
  );
}

function SectionHeader({
  eyebrow,
  icon,
  title,
  sub,
  action,
}: {
  eyebrow?: string;
  icon?: ReactNode;
  title: ReactNode;
  sub: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <span className="mono-label mb-2 inline-flex items-center gap-2 text-gold font-bold">
            <WingMark size={14} />
            {eyebrow}
          </span>
        ) : null}
        <div className="flex items-center gap-3">
          {icon ? <span className="flex-shrink-0">{icon}</span> : null}
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.02] font-extrabold tracking-tight text-balance">
            {title}
          </h2>
        </div>
        <p className="mt-1.5 max-w-[54em] text-[0.92rem] leading-relaxed text-ink-soft">
          {sub}
        </p>
      </div>
      {action ? <div className="flex-shrink-0">{action}</div> : null}
    </div>
  );
}

/** Home-page stories band. Loaded lazily - it sits well below the fold. */
export default function StoryStrip() {
  return (
    <>
      <SectionHeader
        eyebrow="Social proof"
        icon={<LinkedInGlyph className="h-9 w-9" />}
        title={
          <>
            In their <em className="text-crimson-deep font-extrabold">own words</em>, on their
            own feeds
          </>
        }
        sub="Real posts from students, parents and mentors after their cohort ended. Tap any one to read it in full."
      />

      <div className="mt-4">
        <StoryGallery stories={APPROVED_LINKEDIN} limit={6} variant="carousel" />
      </div>

      {APPROVED_INSTAGRAM.length > 0 ? (
        <div className="mt-16">
          <SectionHeader
            eyebrow="Instagram updates"
            icon={<InstagramGlyph className="h-9 w-9" />}
            title={
              <>
                Research and wins we <em className="text-crimson-deep font-extrabold">shared</em>
              </>
            }
            sub="Published papers, judged pitches and competition results, posted as they happened on Instagram."
          />
          <div className="mt-4">
            <StoryGallery
              stories={APPROVED_INSTAGRAM}
              variant="marquee"
            />
          </div>
        </div>
      ) : null}

      <div className="mt-16">
        <SectionHeader
          eyebrow="Learner feedback"
          title={
            <>
              What learners said about{" "}
              <em className="text-crimson-deep font-extrabold">each program</em>
            </>
          }
          sub="Unedited answers from end-of-program feedback forms, labelled with the cohort they came from. Tap any card to read the full note."
          action={<SeeAll label="Read all learner feedback" />}
        />
        <div className="mt-4">
          <LearnerQuotes quotes={ONLINE_QUOTES} duration={190} />
        </div>
        <p className="mt-6 text-[0.78rem] font-semibold tracking-[0.14em] text-ink-faint uppercase">
          Summer Camp 2026
        </p>
        <div className="mt-2">
          <LearnerQuotes quotes={CAMP_QUOTES} duration={175} />
        </div>
      </div>

      {VIDEO_TESTIMONIALS.length > 0 ? (
        <div className="mt-16">
          <SectionHeader
            eyebrow="Video clips"
            title={
              <>
                Hear it from the <em className="text-crimson-deep font-extrabold">students</em>
              </>
            }
            sub="One-minute clips recorded at the end of a cohort, unscripted."
            action={<SeeAll label="Watch all clips" />}
          />
          <div className="mt-4">
            <VideoTestimonials videos={VIDEO_TESTIMONIALS} limit={4} />
          </div>
        </div>
      ) : null}

    </>
  );
}
