import { Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { ReactNode } from "react";
import { adminLogout } from "@/lib/admin.functions";

export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const router = useRouter();
  const logout = useServerFn(adminLogout);
  const nav = "text-sm text-muted-foreground hover:text-foreground";
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-6">
          <Link to="/admin" className="font-semibold text-foreground">
            Compass admin
          </Link>
          <Link
            to="/admin/leads"
            className={nav}
            activeProps={{ className: "text-sm text-foreground font-medium" }}
          >
            Leads
          </Link>
          <Link
            to="/admin/sessions"
            className={nav}
            activeProps={{ className: "text-sm text-foreground font-medium" }}
          >
            Conversations
          </Link>
        </div>
        <button
          onClick={async () => {
            await logout();
            await router.invalidate();
            await router.navigate({ to: "/admin/login", replace: true });
          }}
          className="rounded-md border border-input px-3 py-1.5 text-sm text-foreground"
        >
          Log out
        </button>
      </div>
      <h1 className="mt-8 text-2xl font-semibold text-foreground">{title}</h1>
      <div className="mt-6">{children}</div>
    </main>
  );
}
