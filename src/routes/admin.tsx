import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { adminStatus } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  staticData: { sitemap: "exclude-subtree" },
  beforeLoad: async ({ location }) => {
    const isLogin = location.pathname.replace(/\/$/, "") === "/admin/login";
    const { authed } = await adminStatus();
    if (!authed && !isLogin) throw redirect({ to: "/admin/login" });
    if (authed && isLogin) throw redirect({ to: "/admin" });
  },
  head: () => ({
    meta: [
      { title: "Admin · Learn with Leaders" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: () => <Outlet />,
});
