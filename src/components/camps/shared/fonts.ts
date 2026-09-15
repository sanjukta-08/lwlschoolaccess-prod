/**
 * The three imported camp pages keep their original typography
 * (Playfair Display + Source Sans 3). Loaded per-route so the rest of the
 * site is not asked to download fonts it never uses.
 */
export const CAMP_PAGE_FONT_LINKS = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap",
  },
];

/**
 * The Pre-Med and Pre-Law Horizons pages keep their original HUGEM
 * typography (Inter, with italic Playfair Display for script accents).
 */
export const HORIZONS_FONT_LINKS = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@1,400;1,500&display=swap",
  },
];
