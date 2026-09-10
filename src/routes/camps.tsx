import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/camps")({
  staticData: { sitemap: false },
  component: CampsLayout,
});

function CampsLayout() {
  return <Outlet />;
}
