import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /stories URL - the section is now /testimonials. */
export const Route = createFileRoute("/stories")({
  beforeLoad: ({ search }) => {
    const track = typeof search["track"] === "string" ? search["track"] : "";
    throw redirect({
      to: "/testimonials",
      search: track ? { track } : {},
      replace: true,
    });
  },
  validateSearch: (search: Record<string, unknown>) => ({
    track: typeof search["track"] === "string" ? (search["track"] as string) : "",
  }),
});
