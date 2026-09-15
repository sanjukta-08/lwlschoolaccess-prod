import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import headerLogos from "@/assets/hcus-winter/header-logos.png";
import brochureAsset from "@/assets/brochures/HCUS_Winter_Camp_2026.pdf.asset.json";

import { campBySlug } from "@/lib/camps";

/** Apply destination for this camp, resolved live from the catalogue. */
const registrationUrl = () =>
  campBySlug("hcus-young-global-leaders-winter")?.applyUrl ??
  "https://apply.learnwithleaders.com/apply/harvard-winter-camp";
const CALENDLY_URL = "https://calendly.com/learnwithleaders?utm_source=Harvard+Winter+Camp&utm_medium=Harvard+Winter+Camp&utm_id=Harvard+Winter+Camp";

const navLinks = [
  { label: "About Camp", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Camp Brochure", href: brochureAsset.url, external: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md" : "bg-white shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center shrink-0">
          <img src={headerLogos} alt="HCUS & Learn with Leaders" className="h-10 md:h-14 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-xs font-sans font-semibold tracking-[0.15em] text-primary hover:text-primary/70 transition-colors duration-300 uppercase whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-semibold tracking-[0.1em] uppercase border border-primary text-primary rounded hover:bg-primary hover:text-primary-foreground transition-all duration-300 whitespace-nowrap">
            Book a Meeting
          </a>
          <a href={registrationUrl()} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-semibold tracking-[0.1em] uppercase bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all duration-300 whitespace-nowrap">
            Apply Now
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-primary"
          aria-label="Toggle menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 flex flex-col px-6 pt-8 pb-10 overflow-y-auto animate-fade-up">
          <nav className="flex flex-col gap-6 mb-10">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-base font-sans font-semibold tracking-[0.15em] text-primary hover:text-primary/70 transition-colors duration-300 uppercase">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
              className="text-center px-5 py-3.5 text-sm font-semibold tracking-[0.1em] uppercase border border-primary text-primary rounded hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Book a Meeting
            </a>
            <a href={registrationUrl()} target="_blank" rel="noopener noreferrer"
              className="text-center px-5 py-3.5 text-sm font-semibold tracking-[0.1em] uppercase bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all duration-300">
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
