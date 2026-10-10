import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/masterclasses")({
  component: MasterclassesLayout,
});

function MasterclassesLayout() {
  return <Outlet />;
}
