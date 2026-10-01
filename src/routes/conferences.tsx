import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/conferences")({
  staticData: { sitemap: false },
  component: ConferenceLayout,
});

function ConferenceLayout() {
  return <Outlet />;
}