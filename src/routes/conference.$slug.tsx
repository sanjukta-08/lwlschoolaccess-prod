import { createFileRoute, redirect } from "@tanstack/react-router";

/** Preserve the singular /conference/$slug URL some old links still use. */
export const Route = createFileRoute("/conference/$slug")({
  staticData: { sitemap: false },
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/conferences/$slug", params: { slug: params.slug }, replace: true });
  },
});