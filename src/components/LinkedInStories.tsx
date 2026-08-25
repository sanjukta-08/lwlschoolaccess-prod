import { LINKEDIN_POSTS } from "@/lib/social-proof";

function LinkedInGlyph() {
  return (
    <span
      aria-hidden
      className="inline-flex h-6 w-6 items-center justify-center rounded-[5px] bg-ink font-sans text-[0.72rem] font-black text-paper"
    >
      in
    </span>
  );
}

export function LinkedInStories() {
  return (
    <section id="linkedin" className="scroll-mt-20 bg-wash px-5 py-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col items-center text-center">
          <LinkedInGlyph />
          <h2 className="mt-3 font-serif text-[clamp(1.5rem,3.6vw,2rem)] font-medium">
            Learn with Leaders on <em className="text-crimson-deep">LinkedIn</em>
          </h2>
          <p className="mt-2 max-w-[40em] text-[0.9rem] text-ink-soft">
            Students and parents share what they finished, not just what they attended.
            A selection of the stories posted after recent cohorts.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINKEDIN_POSTS.map((p) => (
            <article
              key={p.name + p.when}
              className="flex flex-col rounded-2xl border border-line bg-paper p-5 shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <header className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson/10 font-serif text-[0.9rem] font-bold text-crimson-deep">
                  {p.initials}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[0.9rem] font-bold text-ink">{p.name}</div>
                  <div className="truncate text-[0.76rem] text-ink-faint">{p.role}</div>
                  <div className="mono-label mt-0.5 text-ink-faint">
                    {p.when} · Public
                  </div>

                </div>
                <LinkedInGlyph />
              </header>

              <p className="mt-3.5 text-[0.87rem] leading-relaxed text-ink-soft">{p.text}</p>

              {p.tag ? (
                <span className="mt-3 self-start rounded-full border border-line bg-wash px-2.5 py-1 text-[0.72rem] font-semibold text-ink-soft">
                  #{p.tag}
                </span>
              ) : null}

              <footer className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3.5 text-[0.76rem] text-ink-faint">
                <span className="flex items-center gap-1.5">
                  <span aria-hidden className="flex items-center">
                    <span className="h-3.5 w-3.5 rounded-full border-[1.5px] border-paper bg-crimson" />
                    <span className="-ml-1 h-3.5 w-3.5 rounded-full border-[1.5px] border-paper bg-gold" />
                    <span className="-ml-1 h-3.5 w-3.5 rounded-full border-[1.5px] border-paper bg-ink" />
                  </span>
                  {p.reactions} reactions
                </span>

                <span>{p.comments} comments</span>
              </footer>
            </article>
          ))}
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
