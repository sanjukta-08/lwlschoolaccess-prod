import { DEFAULT_TESTIMONIAL_SEARCH } from "@/lib/testimonials";
import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /stories URL - the section is now /testimonials. */
export const Route = createFileRoute("/stories")({
  staticData: { sitemap: false },
  beforeLoad: ({ search }) => {
    const track = typeof search["track"] === "string" ? search["track"] : "";
    throw redirect({
      to: "/testimonials",
      search: { ...DEFAULT_TESTIMONIAL_SEARCH, track: track || "all" },
      replace: true,
    });
  },
  validateSearch: (search: Record<string, unknown>) => ({
    track: typeof search["track"] === "string" ? (search["track"] as string) : "",
  }),
});
