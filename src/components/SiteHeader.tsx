import { Link } from "@tanstack/react-router";
import { DEFAULT_SEARCH } from "@/lib/finder";

export function SiteHeader() {
  return (
    <header className="relative z-50">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-5 py-5">
        <Link to="/" search={DEFAULT_SEARCH} className="font-serif text-[1.2rem] font-semibold no-underline">
          Learn with Leaders<span className="text-crimson">.</span>
        </Link>
        <nav className="flex items-center gap-1 text-[0.85rem] font-semibold">
          <Link
            to="/"
            search={DEFAULT_SEARCH}
            className="rounded-full px-3 py-2 text-ink-soft transition-colors hover:text-ink"
            activeProps={{ className: "text-ink" }}
            activeOptions={{ exact: true }}
          >
            Finder
          </Link>
          <Link
            to="/calendar"
            search={DEFAULT_SEARCH}
            className="rounded-full px-3 py-2 text-ink-soft transition-colors hover:text-ink"
            activeProps={{ className: "text-ink" }}
          >
            Calendar
          </Link>
          <Link
            to="/"
            search={DEFAULT_SEARCH}
            hash="how"
            className="hidden rounded-full px-3 py-2 text-ink-soft transition-colors hover:text-ink sm:block"
          >
            How it works
          </Link>
          <Link
            to="/"
            search={DEFAULT_SEARCH}
            hash="faq"
            className="hidden rounded-full px-3 py-2 text-ink-soft transition-colors hover:text-ink sm:block"
          >
            FAQ
          </Link>
          <a
            href="https://www.learnwithleaders.com/"
            target="_blank"
            rel="noopener"
            className="ml-2 rounded-full border-[1.5px] border-crimson/35 bg-paper px-4 py-2 text-crimson shadow-soft transition-colors hover:border-crimson hover:bg-crimson hover:text-paper"
          >
            Talk to an advisor
          </a>
        </nav>
      </div>
    </header>
  );
}
