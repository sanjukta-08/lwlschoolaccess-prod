/** Shared catalogue URLs are authoritative; never infer a partner destination from its name. */
export type CatalogueLinkRow = {
  apply_url?: string | null;
  program_url?: string | null;
  pay_slug?: string | null;
};

export const catalogueUrl = (...urls: (string | null | undefined)[]): string | null =>
  urls.find((url) => typeof url === "string" && url.trim().length > 0)?.trim() ?? null;

export function catalogueApplyUrl(
  program: CatalogueLinkRow | null | undefined,
  partnerSlug: string | null | undefined,
  ...fallbacks: (string | null | undefined)[]
): string {
  const authored = catalogueUrl(program?.apply_url);
  if (authored) return authored;
  if (partnerSlug === "learn-with-leaders" && program?.pay_slug) {
    return `https://apply.learnwithleaders.com/apply/${encodeURIComponent(program.pay_slug)}`;
  }
  return catalogueUrl(...fallbacks) ?? "https://calendly.com/learnwithleaders";
}

export const competitionDestination = (program: { officialSite?: string }): string | null =>
  catalogueUrl(program.officialSite);