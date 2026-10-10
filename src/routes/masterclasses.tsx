import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/masterclasses")({
  staticData: { sitemap: false },
  component: MasterclassesLayout,
});

function MasterclassesLayout() {
  return <Outlet />;
}
