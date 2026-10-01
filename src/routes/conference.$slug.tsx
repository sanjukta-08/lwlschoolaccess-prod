import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/conference/$slug")({
  staticData: { sitemap: false },
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/conferences/$slug", params: { slug: params.slug }, replace: true });
  },
});