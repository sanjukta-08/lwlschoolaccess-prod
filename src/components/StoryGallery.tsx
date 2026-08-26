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


/** Stacked reaction glyphs + faces, the way LinkedIn renders them. */
function ReactionStack({ story }: { story: LinkedInStory }) {
  const extra = story.reactions - 23;
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden className="flex items-center">
        <span className="flex h-4 w-4 items-center justify-center rounded-full border-[1.5px] border-paper bg-[oklch(0.55_0.13_245)] text-[0.5rem] text-paper">
          ▲
        </span>
        <span className="-ml-1 flex h-4 w-4 items-center justify-center rounded-full border-[1.5px] border-paper bg-crimson text-[0.5rem] text-paper">
          ♥
        </span>
        <span className="-ml-1 flex h-4 w-4 items-center justify-center rounded-full border-[1.5px] border-paper bg-gold text-[0.5rem] text-ink">
          ✦
        </span>
        <span className="-ml-1 h-4 w-4 rounded-full border-[1.5px] border-paper bg-ink/25" />
        <span className="-ml-1 h-4 w-4 rounded-full border-[1.5px] border-paper bg-crimson/25" />
        <span className="-ml-1 h-4 w-4 rounded-full border-[1.5px] border-paper bg-gold/35" />
      </span>
      {extra > 0 ? (
        <span className="rounded-full bg-wash px-2 py-0.5 text-[0.7rem] font-semibold text-ink-soft">
          +{extra}
        </span>
      ) : null}
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
  compact = false,
}: {
  story: LinkedInStory;
  onOpen: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${SOURCE_LABEL[story.source]} story from ${story.name}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-5 text-left shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-crimson focus-visible:outline-none"
    >
      <header className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-crimson/10 font-serif text-[0.9rem] font-bold text-crimson-deep">
          {story.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[0.9rem] font-bold text-ink">{story.name}</div>
          <div className="truncate text-[0.76rem] text-ink-faint">{story.role}</div>
          <div className="mono-label mt-1 flex items-center gap-1.5 text-ink-faint">
            {story.when} <span aria-hidden>·</span>
            <span aria-hidden className="text-[0.7rem]">
              🌐
            </span>
            PUBLIC
          </div>
        </div>
        <SourceGlyph story={story} />
        <span aria-hidden className="mt-0.5 text-[0.95rem] leading-none text-ink-faint">
          ⋮
        </span>
      </header>

      {story.image ? (
        <img
          src={story.image}
          alt={story.imageAlt ?? `${SOURCE_LABEL[story.source]} post by ${story.name}`}
          width={640}
          height={400}
          loading="lazy"
          className="mt-3.5 w-full rounded-xl border border-line object-cover"
        />
      ) : (
        <p
          className={`mt-3.5 text-[0.87rem] leading-relaxed text-ink-soft ${
            compact ? "line-clamp-5" : ""
          }`}
        >
          {story.text}
        </p>
      )}

      <div className="mt-3.5 mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="flex flex-wrap items-center gap-1.5">
          {story.tag ? (
            <span className="rounded-full bg-crimson/8 px-2.5 py-1 text-[0.72rem] font-semibold text-crimson-deep">
              #{story.tag}
            </span>
          ) : null}
          {!story.placeholder ? (
            <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[0.7rem] font-semibold text-ink-soft">
              ✦ Real {SOURCE_LABEL[story.source]} post
            </span>
          ) : null}
        </span>
      </div>



      <footer className="mt-auto flex flex-col gap-2.5 border-t border-line pt-3.5 text-[0.78rem] text-ink-faint">
        <ReactionStack story={story} />
        <span className="flex items-center gap-1.5">
          <Reactions story={story} />
          <span aria-hidden>·</span>
          <span className="font-semibold text-ink">{story.comments}</span> comments
        </span>
      </footer>
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
                  compact
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
            compact={variant === "strip"}
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
