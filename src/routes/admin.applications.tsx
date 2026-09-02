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
  moneyLabel,
  type Column,
  type OpsFilters,
} from "@/components/admin/OpsTable";
import { adminApplications, type ApplicationRow } from "@/lib/portal/admin-ops.functions";

export const Route = createFileRoute("/admin/applications")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Applications | Learn with Leaders admin" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Every programme application received, with payment status and applicant details.",
      },
      { property: "og:title", content: "Applications | Learn with Leaders admin" },
      {
        property: "og:description",
        content: "Every programme application received, with payment status and applicant details.",
      },
    ],
  }),
  component: () => (
    <AdminShell title="Applications">
      <ApplicationsBody />
    </AdminShell>
  ),
});

function ApplicationsBody() {
  const [filters, setFilters] = useState<OpsFilters>(initialFilters);
  const [active, setActive] = useState<ApplicationRow | null>(null);

  const query = useQuery({
    queryKey: ["admin", "applications", filters],
    queryFn: () => adminApplications({ data: { ...filters, pageSize: 25 } }),
    placeholderData: (prev) => prev,
  });

  const data = query.data;

  const columns: Column<ApplicationRow>[] = [
    {
      key: "student",
      label: "Student",
      render: (r) => (
        <>
          <span className="block text-foreground">{r.studentName ?? "—"}</span>
          <span className="block text-xs text-muted-foreground">{r.studentEmail ?? ""}</span>
        </>
      ),
    },
    {
      key: "programme",
      label: "Programme",
      render: (r) => (
        <>
          <span className="block text-foreground">{r.programName ?? "—"}</span>
          <span className="block font-mono text-[10px] uppercase text-muted-foreground">
            {r.programCode ?? ""}
          </span>
        </>
      ),
    },
    {
      key: "school",
      label: "School / Country",
      render: (r) => (
        <>
          <span className="block text-muted-foreground">{r.schoolName ?? "—"}</span>
          <span className="block text-xs text-muted-foreground">{r.country ?? ""}</span>
        </>
      ),
    },
    { key: "status", label: "Payment", render: (r) => <StatusPill value={r.paymentStatus} /> },
    {
      key: "amount",
      label: "Amount",
      render: (r) => (
        <span className="font-mono text-xs text-muted-foreground">
          {moneyLabel(r.amount, r.currency)}
        </span>
      ),
    },
    {
      key: "received",
      label: "Received",
      render: (r) => <span className="text-muted-foreground">{dateLabel(r.createdAt)}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <OpsToolbar
        filters={filters}
        onChange={setFilters}
        statuses={data?.statuses ?? []}
        programmes={data?.programmes ?? []}
        statusLabel="Payment status"
      />

      <OpsTable
        columns={columns}
        rows={data?.rows ?? []}
        loading={query.isFetching}
        emptyLabel="No applications match these filters."
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
          Could not load applications: {(query.error as Error).message}
        </p>
      )}

      <OpsDrawer
        open={!!active}
        title={active?.studentName ?? "Application"}
        subtitle={active?.programName ?? undefined}
        onClose={() => setActive(null)}
      >
        {active && (
          <>
            <DetailRows
              rows={[
                ["Status", <StatusPill key="s" value={active.paymentStatus} />],
                ["Amount", moneyLabel(active.amount, active.currency)],
                ["Payment mode", active.paymentMode],
                ["Paid on", active.paymentDate ? dateLabel(active.paymentDate) : ""],
                ["Registration", active.registrationStatus],
                ["Source flow", active.sourceFlow],
                ["Student email", active.studentEmail],
                ["Student mobile", active.studentMobile],
                ["Grade", active.grade],
                ["Parent", active.parentName],
                ["Parent email", active.parentEmail],
                ["School", active.schoolName],
                ["Country", active.country],
                ["Programme code", active.programCode],
                ["Category", active.programCategory],
                ["UTM source", active.utmSource],
                ["UTM campaign", active.utmCampaign],
                ["Received", dateLabel(active.createdAt)],
                ["Admin notes", active.adminNotes],
              ]}
            />
            {active.submissionToken && (
              <a
                href={`/pay/${active.submissionToken}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-md border border-border px-3 py-1.5 text-xs text-foreground hover:bg-accent"
              >
                Open checkout link
              </a>
            )}
            <p className="mt-4 text-[11px] text-muted-foreground">
              This console is read only while the live Application Portal owns edits.
            </p>
          </>
        )}
      </OpsDrawer>
    </div>
  );
}
