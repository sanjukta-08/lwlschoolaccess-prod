import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export const Route = createFileRoute("/admin/profile-settings")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My profile | Learn with Leaders admin" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Your admin account details and console access level." },
      { property: "og:title", content: "My profile | Learn with Leaders admin" },
      { property: "og:description", content: "Your admin account details and console access level." },
    ],
  }),
  component: () => (
    <AdminShell title="My profile">
      <ProfileBody />
    </AdminShell>
  ),
});

function ProfileBody() {
  const { user, profile, writeMode } = useAdminAuth();
  const rows: [string, string][] = [
    ["Name", profile?.fullName ?? "—"],
    ["Email", profile?.email ?? user?.email ?? "—"],
    ["Role", profile?.role ?? "—"],
    ["Console mode", writeMode === "live" ? "Live" : "Dormant replica (read only)"],
  ];

  return (
    <div className="max-w-lg rounded-lg border border-border bg-card p-4">
      <dl className="divide-y divide-border">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4 py-2.5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </dt>
            <dd className="text-sm text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        Editing your details, password and other admins' access arrives with the Manage Admins
        screen in a later phase.
      </p>
    </div>
  );
}
