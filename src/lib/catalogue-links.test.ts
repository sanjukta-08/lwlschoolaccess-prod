import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { catalogueApplyUrl, competitionDestination } from "./catalogue-links";

describe("database-owned competition destinations", () => {
  for (const [slug, url] of [
    ["huso-india", "https://studentform.ivyolympiad.com/register/india"],
    ["huso-middle-east", "https://studentform.ivyolympiad.com/register/middle-east"],
    ["yale-global-essay-competition", "https://studentform.ivycomp.com/"],
  ]) {
    it(`preserves the catalogue registration URL for ${slug}`, () => {
      assert.equal(catalogueApplyUrl({ pay_slug: slug, apply_url: url }, "learn-with-leaders"), url);
    });
  }
  it("builds LWL portal links from pay_slug only when no application URL is supplied", () => {
    assert.equal(catalogueApplyUrl({ pay_slug: "creating-livelihoods-challenge" }, "learn-with-leaders"),
      "https://apply.learnwithleaders.com/apply/creating-livelihoods-challenge");
  });
  it("never substitutes a LWL portal URL for a partner's application URL", () => {
    assert.equal(catalogueApplyUrl({ pay_slug: "onward-ai-founders-challenge", apply_url: "https://www.joinonwards.com/competitions/register" }, "onward-fellowship"),
      "https://www.joinonwards.com/competitions/register");
  });
  it("uses the actual catalogue official page without rewriting its hostname or path", () => {
    assert.equal(competitionDestination({ officialSite: "https://www.joinonwards.com/competitions" }),
      "https://www.joinonwards.com/competitions");
  });
  it("uses internal details instead of inventing a competition website when missing", () => {
    assert.equal(competitionDestination({}), null);
  });
});