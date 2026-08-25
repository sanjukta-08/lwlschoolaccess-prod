import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { ShortlistBadge } from "@/components/ShortlistBadge";
import logoAsset from "@/assets/lwl-logo.png.asset.json";

const linkCls =
  "rounded-full px-3 py-2 text-ink-soft transition-colors hover:text-ink no-underline";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const nav = (
    <>
      <Link
        to="/finder"
        search={DEFAULT_SEARCH}
        className={linkCls}
        activeProps={{ className: "text-ink" }}
        onClick={close}
      >
        Programmes
      </Link>
      <Link
        to="/calendar"
        search={DEFAULT_SEARCH}
        className={linkCls}
        activeProps={{ className: "text-ink" }}
        onClick={close}
      >
        Calendar
      </Link>
      <Link
        to="/profile-building"
        className={linkCls}
        activeProps={{ className: "text-ink" }}
        onClick={close}
      >
        Profile building
      </Link>
      <Link
        to="/stories"
        search={{ track: "" }}
        className={linkCls}
        activeProps={{ className: "text-ink" }}
        onClick={close}
      >
        Stories
      </Link>
      <Link
        to="/about"
        className={linkCls}
        activeProps={{ className: "text-ink" }}
        onClick={close}
      >
        About
      </Link>
    </>
  );

  return (
    <header className="relative z-50">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-5 py-5">
        <Link
          to="/"
          className="flex items-center no-underline"
          aria-label="Learn With Leaders home"
        >
          <img
            src={logoAsset.url}
            alt="Learn With Leaders"
            width={150}
            height={75}
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 text-[0.85rem] font-semibold md:flex">
          {nav}
        </nav>

        <div className="flex items-center gap-1 text-[0.85rem] font-semibold">
          <ShortlistBadge />
          <a
            href="https://www.learnwithleaders.com/"
            target="_blank"
            rel="noopener"
            className="ml-1 rounded-full border-[1.5px] border-crimson/35 bg-paper px-4 py-2 text-crimson no-underline shadow-soft transition-colors hover:border-crimson hover:bg-crimson hover:text-paper"
          >
            Talk to an advisor
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="ml-1 rounded-full border border-line bg-paper px-3 py-2 text-ink-soft transition-colors hover:text-ink md:hidden"
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="mx-5 mb-3 flex flex-col gap-1 rounded-2xl border border-line bg-paper p-3 text-[0.95rem] font-semibold shadow-lift md:hidden">
          {nav}
        </nav>
      ) : null}
    </header>
  );
}
