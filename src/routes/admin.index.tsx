import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminLogout } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Compass admin · Learn with Leaders" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  const router = useRouter();
  const logout = useServerFn(adminLogout);
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Compass admin</h1>
        <button
          onClick={async () => {
            await logout();
            await router.invalidate();
            await router.navigate({ to: "/admin/login", replace: true });
          }}
          className="rounded-md border border-input px-4 py-2 text-sm text-foreground"
        >
          Log out
        </button>
      </div>
      <p className="mt-4 text-muted-foreground">Signed in. Leads, transcripts and stats come next.</p>
    </main>
  );
}
