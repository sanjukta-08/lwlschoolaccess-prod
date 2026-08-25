import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { ShortlistBadge } from "@/components/ShortlistBadge";
import { WingMark } from "@/components/WingMark";
import logoAsset from "@/assets/lwl-logo.png.asset.json";

const linkCls =
  "relative flex items-center rounded-full px-3.5 py-2 leading-none text-ink-soft no-underline transition-colors hover:text-ink after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-gold after:transition-transform hover:after:scale-x-100";
const activeCls = "text-ink after:scale-x-100";
const mobileLinkCls =
  "rounded-xl px-3.5 py-2.5 leading-none text-ink-soft no-underline transition-colors hover:bg-gold-soft hover:text-ink";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  const nav = (mobile = false) => {
    const cls = mobile ? mobileLinkCls : linkCls;
    const active = mobile
      ? { className: "bg-gold-soft text-ink" }
      : { className: activeCls };
    return (
      <>
        <Link
          to="/finder"
          search={DEFAULT_SEARCH}
          className={cls}
          activeProps={active}
          onClick={close}
        >
          Programmes
        </Link>
        <Link
          to="/calendar"
          search={DEFAULT_SEARCH}
          className={cls}
          activeProps={active}
          onClick={close}
        >
          Calendar
        </Link>
        <Link
          to="/profile-building"
          className={cls}
          activeProps={active}
          onClick={close}
        >
          Profile building
        </Link>
        <Link
          to="/stories"
          search={{ track: "" }}
          className={cls}
          activeProps={active}
          onClick={close}
        >
          Stories
        </Link>
        <Link to="/about" className={cls} activeProps={active} onClick={close}>
          About
        </Link>
      </>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? "header-blur" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1100px] items-center justify-between gap-6 px-5">
        <Link
          to="/"
          className="flex flex-none items-center gap-2.5 no-underline"
          aria-label="Learn With Leaders home"
        >
          <img
            src={logoAsset.url}
            alt="Learn With Leaders"
            width={150}
            height={75}
            className="h-10 w-auto md:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 text-[0.85rem] font-semibold md:flex">
          {nav()}
        </nav>

        <div className="flex flex-none items-center gap-3 text-[0.85rem] font-semibold">
          <ShortlistBadge />
          <a
            href="https://www.learnwithleaders.com/"
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-2 rounded-full border-[1.5px] border-crimson/35 bg-paper px-4 py-2 leading-none text-crimson no-underline shadow-soft transition-colors hover:border-crimson hover:bg-crimson hover:text-paper sm:inline-flex"
          >
            Talk to an advisor
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-ink-soft transition-colors hover:border-gold-line hover:text-ink md:hidden"
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="mx-5 mb-3 rounded-2xl border border-gold-line bg-paper p-3 text-[0.95rem] font-semibold shadow-lift md:hidden">
          <div className="mb-2 flex items-center gap-2 px-3.5">
            <WingMark size={14} />
            <span className="mono-label text-gold">Explore</span>
          </div>
          <div className="flex flex-col gap-0.5">{nav(true)}</div>
          <a
            href="https://www.learnwithleaders.com/"
            target="_blank"
            rel="noopener"
            className="mt-3 block rounded-xl bg-crimson px-3.5 py-3 text-center text-paper no-underline sm:hidden"
          >
            Talk to an advisor
          </a>
        </nav>
      ) : null}
    </header>
  );
}
