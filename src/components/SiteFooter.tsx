import { DEFAULT_TESTIMONIAL_SEARCH } from "@/lib/testimonials";
import { Link } from "@tanstack/react-router";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { DEFAULT_FIT } from "@/lib/fit";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { REACH } from "@/lib/social-proof";
import footerLogo from "@/assets/lwl_white.png.asset.json";

const colCls = "flex flex-col gap-2 text-[0.82rem] text-paper/70";
const linkCls = "no-underline text-paper/70 transition-colors hover:text-paper";

export function SiteFooter({ note }: { note?: string }) {
  return (
    <footer className="bg-ink pt-14 pb-8 text-paper">
      <div className="page-shell">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <img
              src={footerLogo.url}
              alt="Learn With Leaders"
              width={120}
              height={60}
              loading="lazy"
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-[24em] text-[0.82rem] text-paper/60">
              Live programmes mentored by students and alumni of the world's most
              selective universities. Families in {REACH.countries} countries and{" "}
              {REACH.schools} schools.
            </p>
          </div>

          <nav className={colCls} aria-label="Programmes">
            <span className="mono-label text-gold">Programmes</span>
            <Link to="/fit" search={DEFAULT_FIT} className={`${linkCls} font-bold text-gold hover:text-gold`}>
              Find the right fit (quiz)
            </Link>
            <Link to="/finder" search={DEFAULT_SEARCH} className={linkCls}>
              Programme Finder
            </Link>
            <Link
              to="/finder"
              search={{ ...DEFAULT_SEARCH, sort: "month" }}
              className={linkCls}
            >
              Starting soonest
            </Link>
            <Link
              to="/finder"
              search={{ ...DEFAULT_SEARCH, type: "programme" }}
              className={linkCls}
            >
              Flagship programmes
            </Link>
            <Link
              to="/finder"
              search={{ ...DEFAULT_SEARCH, type: "competition" }}
              className={linkCls}
            >
              Competitions
            </Link>
            <Link to="/camps" className={linkCls}>
              Summer &amp; winter camps
            </Link>
          </nav>


          <nav className={colCls} aria-label="Dates">
            <span className="mono-label text-gold">Dates</span>
            <Link to="/calendar" search={DEFAULT_SEARCH} className={linkCls}>
              Full calendar
            </Link>
            <Link to="/calendar-month" search={DEFAULT_SEARCH} className={linkCls}>
              Month view
            </Link>
            <Link to="/shortlist" search={{}} className={linkCls}>
              Saved &amp; reminders
            </Link>
          </nav>

          <nav className={colCls} aria-label="Why us">
            <span className="mono-label text-gold">Why us</span>
            <Link to="/profile-building" className={linkCls}>
              Profile building
            </Link>
            <Link to="/about" className={linkCls}>
              About Learn with Leaders
            </Link>
            <Link to="/about" hash="why" className={linkCls}>
              Why Learn with Leaders
            </Link>
            <Link to="/testimonials" search={DEFAULT_TESTIMONIAL_SEARCH} className={linkCls}>
              Testimonials
            </Link>
            <Link to="/about" hash="press" className={linkCls}>
              Press
            </Link>
          </nav>

          <nav className={colCls} aria-label="Talk to us">
            <span className="mono-label text-gold">Talk to us</span>
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noopener"
              className={linkCls}
            >
              Book a call
            </a>
            <Link to="/internships" className={linkCls}>
              Internships
            </Link>
            <a
              href="https://www.learnwithleaders.com/"
              target="_blank"
              rel="noopener"
              className={linkCls}
            >
              Partner with us (schools)
            </a>
            <a
              href="https://www.linkedin.com/company/learn-with-leaders/"
              target="_blank"
              rel="noopener"
              className={linkCls}
            >
              LinkedIn
            </a>
          </nav>
        </div>

        <p className="mt-12 border-t border-paper/10 pt-6 text-[0.75rem] text-paper/50">
          © Learn with Leaders.{" "}
          {note ??
            "Programme details and fees correct at time of publishing; confirm on each programme page. Session times are US Eastern, shown with approximate Dubai (GMT+4) equivalents."}
        </p>
      </div>
    </footer>
  );
}
