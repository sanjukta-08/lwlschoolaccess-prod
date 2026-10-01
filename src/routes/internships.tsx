import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/internships")({
  staticData: { sitemap: false },
  component: InternshipsLayout,
});

function InternshipsLayout() {
  return <Outlet />;
}
