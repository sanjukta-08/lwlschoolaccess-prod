import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { useAdminAuth } from "@/hooks/useAdminAuth";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin sign in | Learn with Leaders" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Staff sign in for the Learn with Leaders admin console." },
      { property: "og:title", content: "Admin sign in | Learn with Leaders" },
      { property: "og:description", content: "Staff sign in for the Learn with Leaders admin console." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { session, isAdmin, loading, signIn } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session && isAdmin) navigate({ to: "/admin/dashboard", replace: true });
  }, [loading, session, isAdmin, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn(email.trim(), password);
      navigate({ to: "/admin/dashboard", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Learn with Leaders
        </p>
        <h1 className="mt-1 font-serif text-3xl text-foreground">Admin console</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with your Learn with Leaders staff account.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <div>
            <label htmlFor="email" className="text-xs text-muted-foreground">
              Work email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs text-muted-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
