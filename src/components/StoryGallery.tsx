import { useCallback, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LinkedInStory } from "@/lib/social-proof";

export function LinkedInGlyph({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-6 w-6 items-center justify-center rounded-[5px] bg-ink font-sans text-[0.72rem] font-black text-paper ${className}`}
    >
      in
    </span>
  );
}

function Reactions({ story }: { story: LinkedInStory }) {
  return (
    <span className="flex items-center gap-1.5">
      <span aria-hidden className="flex items-center">
        <span className="h-3.5 w-3.5 rounded-full border-[1.5px] border-paper bg-crimson" />
        <span className="-ml-1 h-3.5 w-3.5 rounded-full border-[1.5px] border-paper bg-gold" />
        <span className="-ml-1 h-3.5 w-3.5 rounded-full border-[1.5px] border-paper bg-ink" />
      </span>
      {story.reactions} reactions
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
      aria-label={`Open LinkedIn story from ${story.name}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-5 text-left shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-crimson focus-visible:outline-none"
    >
      <header className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson/10 font-serif text-[0.9rem] font-bold text-crimson-deep">
          {story.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[0.9rem] font-bold text-ink">{story.name}</div>
          <div className="truncate text-[0.76rem] text-ink-faint">{story.role}</div>
          <div className="mono-label mt-0.5 text-ink-faint">{story.when} · Public</div>
        </div>
        <LinkedInGlyph />
      </header>

      {story.image ? (
        <img
          src={story.image}
          alt={story.imageAlt ?? `LinkedIn post by ${story.name}`}
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

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {story.tag ? (
          <span className="rounded-full border border-line bg-wash px-2.5 py-1 text-[0.72rem] font-semibold text-ink-soft">
            #{story.tag}
          </span>
        ) : null}
        <span className="text-[0.72rem] font-semibold text-crimson opacity-0 transition-opacity group-hover:opacity-100">
          Read the post →
        </span>
      </div>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3.5 text-[0.76rem] text-ink-faint">
        <Reactions story={story} />
        <span>{story.comments} comments</span>
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
          <LinkedInGlyph className="h-7 w-7" />
        </div>

        <div className="p-5">
          {story.image ? (
            <img
              src={story.image}
              alt={story.imageAlt ?? `LinkedIn post by ${story.name}`}
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
          ) : null}
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
              View on LinkedIn →
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

export function StoryGallery({
  stories,
  limit,
  variant = "grid",
}: {
  stories: LinkedInStory[];
  limit?: number;
  variant?: "grid" | "strip";
}) {
  const shown = limit ? stories.slice(0, limit) : stories;
  const [open, setOpen] = useState<number | null>(null);

  if (shown.length === 0) return null;

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
