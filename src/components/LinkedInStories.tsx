import { APPROVED_STORIES } from "@/lib/social-proof";
import { LinkedInGlyph, StoryGallery } from "@/components/StoryGallery";

export function LinkedInStories() {
  return (
    <section id="linkedin" className="scroll-mt-20 bg-wash px-5 py-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col items-center text-center">
          <LinkedInGlyph />
          <h2 className="mt-3 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">
            Learn with Leaders on <em className="text-crimson-deep">LinkedIn</em>
          </h2>
          <p className="mt-2 max-w-[40em] text-[0.9rem] text-ink-soft">
            Students and parents share what they finished, not just what they attended.
            Tap any story to read the full post.
          </p>
        </div>

        <div className="mt-8">
          <StoryGallery stories={APPROVED_STORIES} limit={6} />
        </div>

        <p className="mt-6 text-center">
          <a
            href="https://www.linkedin.com/company/learn-with-leaders/"
            target="_blank"
            rel="noopener"
            className="text-[0.85rem] font-bold text-crimson no-underline hover:underline"
          >
            Follow Learn with Leaders on LinkedIn →
          </a>
        </p>
      </div>
    </section>
  );
}
