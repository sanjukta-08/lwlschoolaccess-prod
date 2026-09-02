import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  DetailRows,
  OpsDrawer,
  OpsPager,
  OpsTable,
  OpsToolbar,
  StatusPill,
  dateLabel,
  initialFilters,
  type Column,
  type OpsFilters,
} from "@/components/admin/OpsTable";
import { adminCapturedLeads, type LeadRow } from "@/lib/portal/admin-ops.functions";

export const Route = createFileRoute("/admin/captured-leads")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Captured leads | Learn with Leaders admin" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Part-filled application forms and enquiries captured before submission.",
      },
      { property: "og:title", content: "Captured leads | Learn with Leaders admin" },
      {
        property: "og:description",
        content: "Part-filled application forms and enquiries captured before submission.",
      },
    ],
  }),
  component: () => (
    <AdminShell title="Captured leads">
      <LeadsBody />
    </AdminShell>
  ),
});

function LeadsBody() {
  const [filters, setFilters] = useState<OpsFilters>(initialFilters);
  const [active, setActive] = useState<LeadRow | null>(null);

  const query = useQuery({
    queryKey: ["admin", "captured-leads", filters],
    queryFn: () => adminCapturedLeads({ data: { ...filters, pageSize: 25 } }),
    placeholderData: (prev) => prev,
  });
  const data = query.data;

  const columns: Column<LeadRow>[] = [
    {
      key: "person",
      label: "Lead",
      render: (r) => (
        <>
          <span className="block text-foreground">{r.studentName ?? r.parentName ?? "—"}</span>
          <span className="block text-xs text-muted-foreground">
            {r.studentEmail ?? r.parentEmail ?? ""}
          </span>
        </>
      ),
    },
    {
      key: "programme",
      label: "Interest",
      render: (r) => (
        <>
          <span className="block text-muted-foreground">{r.programName ?? "—"}</span>
          <span className="block font-mono text-[10px] uppercase text-muted-foreground">
            {r.leadType ?? ""}
          </span>
        </>
      ),
    },
    {
      key: "source",
      label: "Source",
      render: (r) => (
        <>
          <span className="block text-muted-foreground">{r.source ?? "—"}</span>
          <span className="block text-xs text-muted-foreground">{r.utmCampaign ?? ""}</span>
        </>
      ),
    },
    { key: "status", label: "Status", render: (r) => <StatusPill value={r.status} /> },
    {
      key: "converted",
      label: "Converted",
      render: (r) => (
        <span className="text-muted-foreground">{r.converted ? "Yes" : "No"}</span>
      ),
    },
    {
      key: "captured",
      label: "Captured",
      render: (r) => <span className="text-muted-foreground">{dateLabel(r.createdAt)}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Leads captured
          </p>
          <p className="mt-1 font-serif text-2xl text-foreground">
            {(data?.total ?? 0).toLocaleString("en-GB")}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Converted
          </p>
          <p className="mt-1 font-serif text-2xl text-foreground">
            {(data?.convertedCount ?? 0).toLocaleString("en-GB")}
          </p>
        </div>
      </div>

      <OpsToolbar
        filters={filters}
        onChange={setFilters}
        statuses={data?.statuses ?? []}
        programmes={data?.programmes ?? []}
        searchPlaceholder="Search lead name, email or school…"
      />

      <OpsTable
        columns={columns}
        rows={data?.rows ?? []}
        loading={query.isFetching}
        emptyLabel="No captured leads match these filters."
        onRowClick={setActive}
      />

      <OpsPager
        page={data?.page ?? 1}
        pageSize={data?.pageSize ?? 25}
        total={data?.total ?? 0}
        onPage={(page) => setFilters((f) => ({ ...f, page }))}
      />

      {query.error && (
        <p className="text-sm text-destructive">
          Could not load captured leads: {(query.error as Error).message}
        </p>
      )}

      <OpsDrawer
        open={!!active}
        title={active?.studentName ?? active?.parentName ?? "Lead"}
        subtitle={active?.programName ?? undefined}
        onClose={() => setActive(null)}
      >
        {active && (
          <DetailRows
            rows={[
              ["Status", <StatusPill key="s" value={active.status} />],
              ["Converted", active.converted ? "Yes" : "No"],
              ["Lead type", active.leadType],
              ["Student email", active.studentEmail],
              ["Student phone", active.studentPhone],
              ["Grade", active.grade],
              ["Parent", active.parentName],
              ["Parent email", active.parentEmail],
              ["School", active.schoolName],
              ["Country", active.country],
              ["Programme", active.programName],
              ["Programme code", active.programCode],
              ["Source", active.source],
              ["UTM source", active.utmSource],
              ["UTM campaign", active.utmCampaign],
              ["Landing page", active.landingPage],
              ["Captured", dateLabel(active.createdAt)],
            ]}
          />
        )}
      </OpsDrawer>
    </div>
  );
}
