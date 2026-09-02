import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { adminDashboard, type DashboardData } from "@/lib/portal/admin.functions";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin dashboard | Learn with Leaders" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Applications, payments and lead activity at a glance." },
      { property: "og:title", content: "Admin dashboard | Learn with Leaders" },
      { property: "og:description", content: "Applications, payments and lead activity at a glance." },
    ],
  }),
  component: () => (
    <AdminShell title="Dashboard">
      <DashboardBody />
    </AdminShell>
  ),
});

const nf = new Intl.NumberFormat("en-US");

const monthLabel = (ym: string) => {
  const [y, m] = ym.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
};

function DashboardBody() {
  const { isAdmin } = useAdminAuth();
  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["admin", "dashboard"],
    queryFn: () => adminDashboard(),
    enabled: isAdmin,
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading live figures…
      </div>
    );
  }
  if (error) {
    return <p className="text-sm text-destructive">{(error as Error).message}</p>;
  }
  if (!data) return null;

  const peak = Math.max(1, ...data.monthly.map((m) => m.applications));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {data.stats.map((s) => (
          <div key={s.key} className="rounded-lg border border-border bg-card p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-1 font-serif text-2xl text-foreground">{nf.format(s.value)}</p>
            {s.hint && <p className="mt-1 text-[11px] text-muted-foreground">{s.hint}</p>}
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-lg border border-border bg-card p-4 lg:col-span-2">
          <h2 className="font-serif text-lg text-foreground">Applications by month</h2>
          {data.monthly.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No applications recorded yet.</p>
          ) : (
            <div className="mt-4 flex h-40 items-end gap-2">
              {data.monthly.map((m) => (
                <div key={m.month} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-primary/70"
                      style={{ height: `${(m.applications / peak) * 100}%` }}
                      title={`${m.applications} applications, ${m.paid} paid`}
                    />
                  </div>
                  <span className="truncate font-mono text-[9px] uppercase text-muted-foreground">
                    {monthLabel(m.month)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-serif text-lg text-foreground">Most applied programmes</h2>
          <ul className="mt-3 space-y-2">
            {data.topPrograms.length === 0 && (
              <li className="text-sm text-muted-foreground">Nothing to rank yet.</li>
            )}
            {data.topPrograms.map((p) => (
              <li key={p.name} className="flex items-start justify-between gap-3 text-sm">
                <span className="min-w-0 flex-1 text-foreground">{p.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{p.count}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-lg border border-border bg-card">
        <h2 className="border-b border-border px-4 py-3 font-serif text-lg text-foreground">
          Latest applications
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Programme</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Received</th>
              </tr>
            </thead>
            <tbody>
              {data.recent.map((r) => (
                <tr key={r.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-2">
                    <span className="block text-foreground">{r.studentName ?? "—"}</span>
                    <span className="block text-xs text-muted-foreground">{r.studentEmail}</span>
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">{r.programName ?? "—"}</td>
                  <td className="px-4 py-2 text-muted-foreground">{r.country ?? "—"}</td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {r.paymentStatus ?? "—"}
                    {r.amount ? ` · ${r.currency ?? ""} ${nf.format(r.amount)}` : ""}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-GB") : "—"}
                  </td>
                </tr>
              ))}
              {data.recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-sm text-muted-foreground">
                    No applications yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
