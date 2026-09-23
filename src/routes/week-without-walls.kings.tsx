import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/week-without-walls/kings")({
  staticData: { sitemap: false },
  component: KingsWeekWithoutWallsLayout,
});

function KingsWeekWithoutWallsLayout() {
  return <Outlet />;
}
