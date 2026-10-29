import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { legacySearchRedirect } from "./legacy-search-redirects";

describe("verified legacy search addresses", () => {
  it("preserves attribution when redirecting the old competition listing", () => {
    assert.equal(legacySearchRedirect("https://www.learnwithleaders.com/our-offerings/competitions/?utm_source=school&gclid=abc"),
      "/competitions?utm_source=school&gclid=abc");
  });
  it("maps the verified January winter programme", () => {
    assert.equal(legacySearchRedirect("https://www.learnwithleaders.com/camps/hucswintercamp/"),
      "/camps/hcus-young-global-leaders-winter");
  });
  it("does not substitute a different summer edition", () => {
    assert.equal(legacySearchRedirect("https://www.learnwithleaders.com/camps/hcusociety/"), undefined);
  });
  it("leaves the indexed Yale page on its existing address", () => {
    assert.equal(legacySearchRedirect("https://www.learnwithleaders.com/competitions/the-yale-international-relations-essay-competition/"), undefined);
  });
  it("never redirects legacy downloadable resources", () => {
    assert.equal(legacySearchRedirect("https://www.learnwithleaders.com/camps/hucswintercamp/brochure.pdf"), undefined);
  });
});