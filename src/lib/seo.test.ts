import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { canonicalUrl, PUBLIC_SITE_URL } from "./seo";

describe("search origin and page identity", () => {
  it("keeps the current published origin before domain cutover", () => {
    assert.equal(PUBLIC_SITE_URL, "https://lwlschoolaccess.com");
  });
  it("canonicalizes filter and attribution variants to their page, not the homepage", () => {
    assert.equal(canonicalUrl("/finder?interest=med&utm_source=school#results"),
      "https://lwlschoolaccess.com/finder");
  });
  it("rejects protocol-relative external canonical destinations", () => {
    assert.throws(() => canonicalUrl("//other-site.example/finder"));
  });
});