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
import { adminPayments, type PaymentRow } from "@/lib/portal/admin-ops.functions";

export const Route = createFileRoute("/admin/payments")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Payments | Learn with Leaders admin" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Collected fees, pending payments and transaction references per applicant.",
      },
      { property: "og:title", content: "Payments | Learn with Leaders admin" },
      {
        property: "og:description",
        content: "Collected fees, pending payments and transaction references per applicant.",
      },
    ],
  }),
  component: () => (
    <AdminShell title="Payments">
      <PaymentsBody />
    </AdminShell>
  ),
});

function PaymentsBody() {
  const [filters, setFilters] = useState<OpsFilters>(initialFilters);
  const [active, setActive] = useState<PaymentRow | null>(null);

  const query = useQuery({
    queryKey: ["admin", "payments", filters],
    queryFn: () => adminPayments({ data: { ...filters, pageSize: 25 } }),
    placeholderData: (prev) => prev,
  });
  const data = query.data;

  const columns: Column<PaymentRow>[] = [
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
      render: (r) => <span className="text-muted-foreground">{r.programName ?? "—"}</span>,
    },
    {
      key: "amount",
      label: "Amount",
      render: (r) => (
        <span className="font-mono text-xs text-foreground">
          {moneyLabel(r.amount, r.currency)}
        </span>
      ),
    },
    { key: "status", label: "Status", render: (r) => <StatusPill value={r.paymentStatus} /> },
    {
      key: "mode",
      label: "Mode",
      render: (r) => <span className="text-muted-foreground">{r.paymentMode ?? "—"}</span>,
    },
    {
      key: "paid",
      label: "Paid on",
      render: (r) => <span className="text-muted-foreground">{dateLabel(r.paymentDate)}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {(data?.totals ?? []).slice(0, 3).map((t) => (
          <div key={t.currency} className="rounded-lg border border-border bg-card p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Collected · {t.currency}
            </p>
            <p className="mt-1 font-serif text-2xl text-foreground">
              {t.collected.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {t.count} paid enrolment{t.count === 1 ? "" : "s"}
            </p>
          </div>
        ))}
      </div>

      <OpsToolbar
        filters={filters}
        onChange={setFilters}
        statuses={data?.statuses ?? []}
        programmes={data?.programmes ?? []}
        statusLabel="Payment status"
        searchPlaceholder="Search student, programme or payment reference…"
      />

      <OpsTable
        columns={columns}
        rows={data?.rows ?? []}
        loading={query.isFetching}
        emptyLabel="No payments match these filters."
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
          Could not load payments: {(query.error as Error).message}
        </p>
      )}

      <OpsDrawer
        open={!!active}
        title={active?.studentName ?? "Payment"}
        subtitle={active?.programName ?? undefined}
        onClose={() => setActive(null)}
      >
        {active && (
          <DetailRows
            rows={[
              ["Status", <StatusPill key="s" value={active.paymentStatus} />],
              ["Amount", moneyLabel(active.amount, active.currency)],
              ["Mode", active.paymentMode],
              ["Paid on", dateLabel(active.paymentDate)],
              ["Reference", active.paymentIntentId],
              ["Programme code", active.programCode],
              ["Student email", active.studentEmail],
              ["Application created", dateLabel(active.createdAt)],
            ]}
          />
        )}
      </OpsDrawer>
    </div>
  );
}
