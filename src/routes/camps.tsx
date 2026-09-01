import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/camps")({
  component: CampsLayout,
});

function CampsLayout() {
  return <Outlet />;
}
