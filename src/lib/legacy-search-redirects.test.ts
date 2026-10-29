import { describe, expect, it } from "bun:test";
import { legacySearchRedirect } from "./legacy-search-redirects";

describe("verified legacy search addresses", () => {
  it("preserves attribution when redirecting the old competition listing", () => {
    expect(legacySearchRedirect("https://www.learnwithleaders.com/our-offerings/competitions/?utm_source=school&gclid=abc"))
      .toBe("/competitions?utm_source=school&gclid=abc");
  });
  it("maps the verified January winter programme", () => {
    expect(legacySearchRedirect("https://www.learnwithleaders.com/camps/hucswintercamp/"))
      .toBe("/camps/hcus-young-global-leaders-winter");
  });
  it("does not substitute a different summer edition", () => {
    expect(legacySearchRedirect("https://www.learnwithleaders.com/camps/hcusociety/"))
      .toBeUndefined();
  });
  it("leaves the indexed Yale page on its existing address", () => {
    expect(legacySearchRedirect("https://www.learnwithleaders.com/competitions/the-yale-international-relations-essay-competition/"))
      .toBeUndefined();
  });
  it("never redirects legacy downloadable resources", () => {
    expect(legacySearchRedirect("https://www.learnwithleaders.com/camps/hucswintercamp/brochure.pdf"))
      .toBeUndefined();
  });
});