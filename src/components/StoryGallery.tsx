import { useCallback, useEffect, useState } from "react";
import linkedinMark from "@/assets/linkedin-logo.png.asset.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LinkedInStory } from "@/lib/social-proof";

export function LinkedInGlyph({ className = "" }: { className?: string }) {
  return (
    <img
      src={linkedinMark.url}
      alt=""
      aria-hidden
      width={24}
      height={24}
      loading="lazy"
      className={`inline-block h-6 w-6 shrink-0 rounded-[5px] object-cover ${className}`}
    />
  );
}

export function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)] text-paper ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
      </svg>
    </span>
  );
}

function SourceGlyph({
  story,
  className = "",
}: {
  story: LinkedInStory;
  className?: string;
}) {
  return story.source === "instagram" ? (
    <InstagramGlyph className={className} />
  ) : (
    <LinkedInGlyph className={className} />
  );
}

const SOURCE_LABEL: Record<LinkedInStory["source"], string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
};


/** LinkedIn-style reaction stack. */
function ReactionStack({ story }: { story: LinkedInStory }) {
  return (
    <span className="flex items-center gap-2">
        <span aria-hidden className="flex items-center -space-x-1">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-paper bg-[#0a66c2] text-[0.55rem] text-paper">
          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 2 7.58 7.59C7.21 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1c0-.03-.01-.06-.01-.09z"/></svg>
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-paper bg-crimson text-[0.55rem] text-paper">
          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-paper bg-gold text-[0.55rem] text-ink">
          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-paper bg-ink/25" />
      </span>
      <span className="text-[0.78rem] font-semibold text-ink-soft">{story.reactions}</span>
    </span>
  );
}

function Reactions({ story }: { story: LinkedInStory }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="font-semibold text-ink">{story.reactions}</span> reactions
    </span>
  );
}

function StoryTile({
  story,
  onOpen,
}: {
  story: LinkedInStory;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${SOURCE_LABEL[story.source]} story from ${story.name}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 text-left shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-crimson focus-visible:outline-none"
    >
      <header className="flex items-start gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crimson/10 font-serif text-[0.95rem] font-bold text-crimson-deep">
          {story.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[0.95rem] font-bold leading-tight text-ink">{story.name}</div>
          <div className="truncate text-[0.78rem] text-ink-faint">{story.role}</div>
        </div>
        <div className="flex items-center gap-1">
          <SourceGlyph story={story} className="h-6 w-6" />
          <span aria-hidden className="text-[0.95rem] leading-none text-ink-faint">
            ⋮
          </span>
        </div>
      </header>

      <div className="mt-4">
        <h3 className="text-[1.05rem] font-bold leading-snug text-ink">
          {story.when}
        </h3>
      </div>

      {story.image ? (
        <img
          src={story.image}
          alt={story.imageAlt ?? `${SOURCE_LABEL[story.source]} post by ${story.name}`}
          width={640}
          height={400}
          loading="lazy"
          className="mt-4 w-full rounded-xl border border-line object-cover"
        />
      ) : (
        <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-soft line-clamp-5">
          {story.text}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between border-b border-line pb-3.5 text-[0.78rem] text-ink-faint">
        <ReactionStack story={story} />
        <span className="flex items-center gap-1.5">
          <span className="font-semibold text-ink">{story.comments}</span> comments
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {story.tag ? (
            <span className="rounded-full bg-crimson/8 px-2.5 py-1 text-[0.72rem] font-semibold text-crimson-deep">
              #{story.tag}
            </span>
          ) : null}
        </div>
        {!story.placeholder ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.7rem] font-semibold text-ink-soft">
            <svg className="h-3.5 w-3.5 text-[#0a66c2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            Real {SOURCE_LABEL[story.source]} post
          </span>
        ) : null}
      </div>
    </button>
  );
}

function StoryLightbox({
  stories,
  index,
  onClose,
  onIndex,
}: {
  stories: LinkedInStory[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const story = open ? stories[index!] : undefined;

  const step = useCallback(
    (delta: number) => {
      if (index === null || stories.length === 0) return;
      onIndex((index + delta + stories.length) % stories.length);
    },
    [index, onIndex, stories.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  if (!story) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-h-[88vh] max-w-[720px] overflow-y-auto bg-paper p-0">
        <div className="flex items-start gap-3 border-b border-line p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-crimson/10 font-serif text-[0.95rem] font-bold text-crimson-deep">
            {story.initials}
          </span>
          <div className="min-w-0 flex-1">
            <DialogTitle className="text-[1rem] font-bold text-ink">
              {story.name}
            </DialogTitle>
            <DialogDescription className="text-[0.8rem] text-ink-faint">
              {story.role}
            </DialogDescription>
            <div className="mono-label mt-1 text-ink-faint">
              {story.when} · Public{story.tag ? ` · #${story.tag}` : ""}
            </div>
          </div>
          <SourceGlyph story={story} className="h-7 w-7" />
        </div>

        <div className="p-5">
          {story.image ? (
            <img
              src={story.image}
              alt={story.imageAlt ?? `${SOURCE_LABEL[story.source]} post by ${story.name}`}

              className="w-full rounded-xl border border-line"
            />
          ) : null}
          <p className="mt-4 text-[0.95rem] leading-relaxed whitespace-pre-line text-ink-soft">
            {story.text}
          </p>
          {story.placeholder ? (
            <p className="mono-label mt-4 text-ink-faint">
              Illustrative story - real posts are published with the family's permission.
            </p>
          ) : (
            <p className="mono-label mt-4 text-ink-faint">
              Published by {story.name} on {SOURCE_LABEL[story.source]}, shared with permission.
            </p>
          )}

        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 text-[0.8rem] text-ink-faint">
          <Reactions story={story} />
          <span>{story.comments} comments</span>
          {story.postUrl ? (
            <a
              href={story.postUrl}
              target="_blank"
              rel="noopener"
              className="font-bold text-crimson no-underline hover:underline"
            >
              View on {SOURCE_LABEL[story.source]} →
            </a>
          ) : null}
        </div>

        {stories.length > 1 ? (
          <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3.5">
            <button
              type="button"
              onClick={() => step(-1)}
              className="rounded-full border border-line px-4 py-2 text-[0.8rem] font-semibold text-ink-soft transition-colors hover:bg-wash"
            >
              ← Previous
            </button>
            <span className="mono-label text-ink-faint">
              {index! + 1} / {stories.length}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              className="rounded-full border border-line px-4 py-2 text-[0.8rem] font-semibold text-ink-soft transition-colors hover:bg-wash"
            >
              Next →
            </button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

/** Three cards at a time, auto-advancing page by page. Pauses on hover. */
function StoryCarousel({
  stories,
  onOpen,
}: {
  stories: LinkedInStory[];
  onOpen: (i: number) => void;
}) {
  const perPage = 3;
  const pages = Math.max(1, Math.ceil(stories.length / perPage));
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || pages < 2) return;
    const id = window.setInterval(() => setPage((p) => (p + 1) % pages), 6500);
    return () => window.clearInterval(id);
  }, [paused, pages]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {Array.from({ length: pages }).map((_, p) => (
            <div
              key={p}
              className="grid w-full shrink-0 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              aria-hidden={p !== page}
            >
              {stories.slice(p * perPage, p * perPage + perPage).map((s, i) => (
                <StoryTile
                  key={s.id}
                  story={s}
                  onOpen={() => onOpen(p * perPage + i)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {pages > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-2.5">
          {Array.from({ length: pages }).map((_, p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-label={`Show stories ${p * perPage + 1}-${Math.min(
                (p + 1) * perPage,
                stories.length,
              )}`}
              aria-current={p === page}
              className={`h-2 rounded-full transition-all ${
                p === page ? "w-7 bg-crimson" : "w-2 bg-ink/20 hover:bg-ink/35"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}


export function StoryGallery({
  stories,
  limit,
  variant = "grid",
}: {
  stories: LinkedInStory[];
  limit?: number;
  /** "carousel" shows three cards at a time and auto-advances through the set. */
  variant?: "grid" | "strip" | "carousel";
}) {
  const shown = limit ? stories.slice(0, limit) : stories;
  const [open, setOpen] = useState<number | null>(null);

  if (shown.length === 0) return null;

  if (variant === "carousel") {
    return (
      <>
        <StoryCarousel stories={shown} onOpen={setOpen} />
        <StoryLightbox
          stories={shown}
          index={open}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      </>
    );
  }

  return (
    <>
      <div
        className={
          variant === "strip"
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {shown.map((s, i) => (
          <StoryTile
            key={s.id}
            story={s}
            onOpen={() => setOpen(i)}
          />
        ))}
      </div>


      <StoryLightbox
        stories={shown}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </>
  );
}
