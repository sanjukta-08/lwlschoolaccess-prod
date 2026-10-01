import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminStats } from "@/lib/admin-data.functions";
import { AdminShell } from "@/components/admin/AdminShell";

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

const CAPABILITIES = [
  "Searches the whole group's live catalogue — programmes, fellowships, competitions, conferences, camps and masterclasses across every platform.",
  "Compares options side by side (fee, dates, format, grades, application deadline).",
  "Cites real mentors from the mentor directory — never invented names.",
  "Checks promo codes against the live promo list.",
  "Tracks multiple children in one family conversation.",
  "Shows real application deadlines and mentions them only when they're close (about 14 days).",
  "Notices programmes the visitor has already saved and greets them with that.",
  "Captures advisor-callback requests (with consent) — these appear under Leads.",
  "Links out to apply/pay pages with the visitor's UTMs preserved; it never takes payment itself.",
];

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}

function AdminHome() {
  const fetchStats = useServerFn(adminStats);
  const { data, error } = useQuery({ queryKey: ["admin", "stats"], queryFn: () => fetchStats() });
  const max = Math.max(1, ...(data?.byDay.map((d) => d.count) ?? [1]));
  return (
    <AdminShell title="Overview">
      {error && <p className="text-destructive">Could not load stats.</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Conversations" value={data?.sessions ?? "–"} />
        <Stat label="Messages" value={data?.messages ?? "–"} />
        <Stat label="Leads" value={data?.leads ?? "–"} />
        <Stat label="Conversion (leads ÷ conversations)" value={data ? `${data.conversion}%` : "–"} />
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/admin/leads" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">View leads</Link>
        <Link to="/admin/sessions" className="rounded-md border border-input px-4 py-2 text-sm text-foreground">View conversations</Link>
      </div>

      {data && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Conversations per day (last 14 days, UTC)</h2>
          <ul className="mt-3 space-y-1">
            {data.byDay.map((d) => (
              <li key={d.day} className="flex items-center gap-3 text-sm">
                <span className="w-24 text-muted-foreground">{d.day}</span>
                <span className="h-3 rounded bg-primary" style={{ width: `${(d.count / max) * 60}%`, minWidth: d.count ? 4 : 0 }} />
                <span className="text-foreground">{d.count}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">What Compass can currently do</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {CAPABILITIES.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </section>
    </AdminShell>
  );
}
