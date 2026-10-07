import { createFileRoute, redirect } from "@tanstack/react-router";

/** Preserve the conference URLs used by the previous student website. */
export const Route = createFileRoute("/our-offerings/conferences/$slug")({
  staticData: { sitemap: false },
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/conferences/$slug", params: { slug: params.slug }, replace: true });
  },
});
