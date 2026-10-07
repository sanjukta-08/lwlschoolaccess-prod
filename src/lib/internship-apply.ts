/**
 * Internship applications are collected outside this project.
 * This site never hosts /apply or /pay pages — see project memory.
 *
 * No utm_source/utm_medium/utm_campaign baked into this URL: UtmForwarder
 * decorates it at click time with the visitor's real stored attribution
 * (src/components/UtmForwarder.tsx). withUtm() only adds a param when it
 * isn't already present on the link, so a fixed value here would have
 * permanently overridden whatever campaign the visitor actually arrived from.
 */
export const INTERNSHIP_APPLY_URL = "https://calendly.com/learnwithleaders";

export function internshipApplyUrl(roleId?: string) {
  if (!roleId) return INTERNSHIP_APPLY_URL;
  return `${INTERNSHIP_APPLY_URL}?utm_content=${encodeURIComponent(roleId)}`;
}
