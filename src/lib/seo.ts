// Keep the current public origin until the existing-domain cutover is ready.
// Set VITE_PUBLIC_SITE_URL=https://www.learnwithleaders.com for that deployment.
const configuredOrigin = import.meta.env['VITE_PUBLIC_SITE_URL'] || "https://lwlschoolaccess.com";
const allowedOrigins = new Set([
  "https://lwlschoolaccess.com",
  "https://www.learnwithleaders.com",
]);

export const PUBLIC_SITE_URL = allowedOrigins.has(configuredOrigin.replace(/\/$/, ""))
  ? configuredOrigin.replace(/\/$/, "")
  : "https://lwlschoolaccess.com";

export function canonicalUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("Search page URLs must be site-relative paths");
  }
  const url = new URL(path, PUBLIC_SITE_URL);
  url.search = "";
  url.hash = "";
  return url.href;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.learnwithleaders.com/#organization",
  name: "Learn with Leaders",
  url: "https://www.learnwithleaders.com/",
  sameAs: ["https://www.linkedin.com/company/learn-with-leaders/"],
};