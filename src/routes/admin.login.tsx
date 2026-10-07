import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { adminLogin } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/login")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Admin sign in · Learn with Leaders" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const login = useServerFn(adminLogin);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    try {
      const res = await login({ data: { password } });
      if (res.ok) {
        await router.invalidate();
        await router.navigate({ to: "/admin" });
        return;
      }
      setError(true);
    } catch {
      setError(true);
    }
    setBusy(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        method="post"
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-card p-6"
      >
        <h1 className="text-xl font-semibold text-foreground">Admin sign in</h1>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          aria-label="Password"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
        />
        {error && <p className="text-sm text-destructive">Incorrect password.</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
