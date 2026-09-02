/**
 * Internship applications are collected outside this project.
 * This site never hosts /apply or /pay pages — see project memory.
 */
export const INTERNSHIP_APPLY_URL =
  "https://calendly.com/learnwithleaders?utm_source=lwl%20online%20program%20school%20access&utm_medium=website&utm_campaign=internships";

export function internshipApplyUrl(roleId?: string) {
  if (!roleId) return INTERNSHIP_APPLY_URL;
  return `${INTERNSHIP_APPLY_URL}&utm_content=${encodeURIComponent(roleId)}`;
}
