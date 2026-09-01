import { DEFAULT_TESTIMONIAL_SEARCH } from "@/lib/testimonials";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { ShortlistBadge } from "@/components/ShortlistBadge";
import { WingMark } from "@/components/WingMark";
import logoAsset from "@/assets/lwl-logo.png.asset.json";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TRACKS, type TrackKey } from "@/lib/programmes";

const linkCls =
  "relative flex items-center rounded-full px-3.5 py-2 leading-none text-ink-soft no-underline transition-colors hover:text-ink after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-gold after:transition-transform hover:after:scale-x-100";
const activeCls = "text-ink after:scale-x-100";
const mobileLinkCls =
  "rounded-xl px-3.5 py-2.5 leading-none text-ink-soft no-underline transition-colors hover:bg-gold-soft hover:text-ink";

const offeringItems: { label: string; interest: TrackKey | "all"; description?: string }[] = [
  { label: "All offerings", interest: "all", description: "Browse everything" },
  { label: TRACKS.med.label, interest: "med", description: "Fellowships, programmes & competitions" },
  { label: TRACKS.law.label, interest: "law", description: "Fellowships, programmes & competitions" },
  { label: TRACKS.fin.label, interest: "fin", description: "Fellowships, programmes & competitions" },
  { label: TRACKS.ai.label, interest: "ai", description: "Fellowships, programmes & competitions" },
  { label: TRACKS.res.label, interest: "res", description: "Fellowships, programmes & competitions" },
  { label: TRACKS.lead.label, interest: "lead", description: "Fellowships, programmes & competitions" },
  { label: TRACKS.sat.label, interest: "sat", description: "Fellowships, programmes & competitions" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [offeringsOpen, setOfferingsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => {
    setOpen(false);
    setOfferingsOpen(false);
  };

  const offeringsSearch = (interest: TrackKey | "all") =>
    interest === "all" ? DEFAULT_SEARCH : { ...DEFAULT_SEARCH, interest };

  const offeringsActiveOptions = { includeSearch: true };

  const offeringsDesktop = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`${linkCls} gap-1 bg-transparent font-[inherit] text-[inherit] focus:outline-none`}
          aria-haspopup="menu"
        >
          Our Offerings
          <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="min-w-[220px] rounded-2xl border border-line bg-paper p-2 shadow-lift"
      >
        {offeringItems.map((item) => (
          <DropdownMenuItem key={item.interest} asChild>
            <Link
              to="/finder"
              search={offeringsSearch(item.interest)}
              activeOptions={offeringsActiveOptions}
              activeProps={{ className: "bg-wash text-ink" }}
              className="flex cursor-pointer flex-col items-start rounded-xl px-3 py-2 text-left text-[0.85rem] font-semibold text-ink-soft no-underline outline-none transition-colors hover:bg-wash hover:text-ink focus:bg-wash focus:text-ink"
              onClick={close}
            >
              <span>{item.label}</span>
              {item.description ? (
                <span className="text-[0.72rem] font-normal text-ink-faint">
                  {item.description}
                </span>
              ) : null}
            </Link>
          </DropdownMenuItem>
        ))}
        <div className="my-1 h-px bg-line" />
        <DropdownMenuItem asChild>
          <Link
            to="/camps"
            activeProps={{ className: "bg-wash text-ink" }}
            className="flex cursor-pointer flex-col items-start rounded-xl px-3 py-2 text-left text-[0.85rem] font-semibold text-ink-soft no-underline outline-none transition-colors hover:bg-wash hover:text-ink focus:bg-wash focus:text-ink"
            onClick={close}
          >
            <span>Camps (in person)</span>
            <span className="text-[0.72rem] font-normal text-ink-faint">
              Harvard, Cambridge, Geneva, Salamanca
            </span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  );

  const offeringsMobile = (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOfferingsOpen((v) => !v)}
        aria-expanded={offeringsOpen}
        className={`${mobileLinkCls} flex w-full items-center justify-between`}
      >
        <span>Our Offerings</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${offeringsOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {offeringsOpen ? (
        <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-gold-line/40 pl-3">
          {offeringItems.map((item) => (
            <Link
              key={item.interest}
              to="/finder"
              search={offeringsSearch(item.interest)}
              activeOptions={offeringsActiveOptions}
              activeProps={{ className: "bg-gold-soft text-ink" }}
              className={mobileLinkCls}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/camps"
            activeProps={{ className: "bg-gold-soft text-ink" }}
            className={mobileLinkCls}
            onClick={close}
          >
            Camps (in person)
          </Link>
        </div>

      ) : null}
    </div>
  );

  const nav = (mobile = false) => {
    const cls = mobile ? mobileLinkCls : linkCls;
    const active = mobile
      ? { className: "bg-gold-soft text-ink" }
      : { className: activeCls };
    return (
      <>
        {mobile ? offeringsMobile : offeringsDesktop}
        <Link to="/camps" className={cls} activeProps={active} onClick={close}>
          Camps
        </Link>
        <Link
          to="/masterclasses"
          className={cls}
          activeProps={active}
          onClick={close}
        >
          Masterclasses
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
          to="/testimonials"
          search={DEFAULT_TESTIMONIAL_SEARCH}
          className={cls}
          activeProps={active}
          onClick={close}
        >
          Testimonials
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
      <div className="mx-auto flex h-[76px] w-full max-w-none items-center justify-between gap-6 px-4 sm:px-5 lg:px-6 xl:px-8">
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
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-2 rounded-full border-[1.5px] border-crimson bg-crimson px-4 py-2 leading-none text-paper no-underline shadow-soft transition-colors hover:bg-crimson/90 sm:inline-flex"
          >
            Talk to an Advisor
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
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="mt-3 block rounded-xl bg-crimson px-3.5 py-3 text-center text-paper no-underline sm:hidden"
          >
            Talk to an Advisor
          </a>
        </nav>
      ) : null}
    </header>
  );
}
