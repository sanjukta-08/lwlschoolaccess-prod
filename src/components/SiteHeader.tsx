import { Link } from "@tanstack/react-router";
import { DEFAULT_SEARCH } from "@/lib/finder";

const linkCls =
  "rounded-full px-3 py-2 text-ink-soft transition-colors hover:text-ink no-underline";

export function SiteHeader() {
  return (
    <header className="relative z-50">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-5 py-5">
        <Link to="/" className="font-serif text-[1.2rem] font-semibold no-underline">
          Learn with Leaders<span className="text-crimson">.</span>
        </Link>
        <nav className="flex items-center gap-1 text-[0.85rem] font-semibold">
          <Link
            to="/finder"
            search={DEFAULT_SEARCH}
            className={linkCls}
            activeProps={{ className: "text-ink" }}
          >
            Programme Finder
          </Link>
          <Link
            to="/calendar"
            search={DEFAULT_SEARCH}
            className={linkCls}
            activeProps={{ className: "text-ink" }}
          >
            Full calendar
          </Link>
          <Link
            to="/calendar-month"
            search={DEFAULT_SEARCH}
            className={`hidden md:block ${linkCls}`}
            activeProps={{ className: "text-ink" }}
          >
            Month view
          </Link>
          <Link
            to="/profile-building"
            className={linkCls}
            activeProps={{ className: "text-ink" }}
          >
            Profile building
          </Link>
          <Link to="/about" className={linkCls} activeProps={{ className: "text-ink" }}>
            About
          </Link>

          <Link to="/" hash="pathways" className={`hidden sm:block ${linkCls}`}>
            Pathways
          </Link>
          <Link to="/" hash="why" className={`hidden sm:block ${linkCls}`}>
            Why LWL
          </Link>
          <a
            href="https://www.learnwithleaders.com/"
            target="_blank"
            rel="noopener"
            className="ml-2 rounded-full border-[1.5px] border-crimson/35 bg-paper px-4 py-2 text-crimson no-underline shadow-soft transition-colors hover:border-crimson hover:bg-crimson hover:text-paper"
          >
            Talk to an advisor
          </a>
        </nav>
      </div>
    </header>
  );
}
