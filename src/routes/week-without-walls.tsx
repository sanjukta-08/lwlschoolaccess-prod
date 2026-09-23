import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/week-without-walls")({
  staticData: { sitemap: false },
  component: WeekWithoutWallsLayout,
});

function WeekWithoutWallsLayout() {
  return <Outlet />;
}
