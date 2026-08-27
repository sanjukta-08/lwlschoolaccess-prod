import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/internships")({
  component: InternshipsLayout,
});

function InternshipsLayout() {
  return <Outlet />;
}
