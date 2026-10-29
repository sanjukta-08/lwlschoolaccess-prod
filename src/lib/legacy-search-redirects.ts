// Only source/destination pairs verified to represent the same page/programme.
// Do not add different editions or redirect unported content to a category.
export const LEGACY_SEARCH_REDIRECTS: Readonly<Record<string, string>> = {
  "/about-us": "/about",
  "/our-offerings/competitions": "/competitions",
  "/our-offerings/camps": "/camps",
  "/our-offerings/conference": "/conferences",
  "/camps/hucswintercamp": "/camps/hcus-young-global-leaders-winter",
  "/camps/salamancaspaincamp": "/camps/entrepreneurship-ai-salamanca",
};

export function legacySearchRedirect(requestUrl: string): string | undefined {
  const url = new URL(requestUrl);
  const path = url.pathname.replace(/\/$/, "");
  const target = LEGACY_SEARCH_REDIRECTS[path];
  // Exact paths only: never capture PDF/resources or nested legacy pages.
  return target ? `${target}${url.search}` : undefined;
}