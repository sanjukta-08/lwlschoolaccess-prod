import { Loader2, Search, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  className?: string;
};

export type OpsFilters = {
  search: string;
  status: string;
  program: string;
  page: number;
};

export const initialFilters: OpsFilters = { search: "", status: "", program: "", page: 1 };

/** Debounced search box + facet selects, shared by every ops list screen. */
export function OpsToolbar({
  filters,
  onChange,
  statuses,
  programmes,
  statusLabel = "Status",
  searchPlaceholder = "Search name, email, programme…",
  right,
}: {
  filters: OpsFilters;
  onChange: (next: OpsFilters) => void;
  statuses: string[];
  programmes: string[];
  statusLabel?: string;
  searchPlaceholder?: string;
  right?: ReactNode;
}) {
  const [term, setTerm] = useState(filters.search);

  useEffect(() => {
    const id = setTimeout(() => {
      if (term !== filters.search) onChange({ ...filters, search: term, page: 1 });
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const select =
    "h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground outline-none focus:border-primary";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-9 w-full rounded-md border border-border bg-background pl-8 pr-8 text-sm text-foreground outline-none focus:border-primary"
        />
        {term && (
          <button
            type="button"
            onClick={() => setTerm("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value, page: 1 })}
        className={select}
        aria-label={statusLabel}
      >
        <option value="">All {statusLabel.toLowerCase()}</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={filters.program}
        onChange={(e) => onChange({ ...filters, program: e.target.value, page: 1 })}
        className={cn(select, "max-w-[240px]")}
        aria-label="Programme"
      >
        <option value="">All programmes</option>
        {programmes.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      {right}
    </div>
  );
}

export function OpsTable<T extends { id: string }>({
  columns,
  rows,
  loading,
  emptyLabel,
  onRowClick,
}: {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  emptyLabel: string;
  onRowClick?: (row: T) => void;
}) {
  return (
    <div className="relative overflow-x-auto rounded-lg border border-border bg-card">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/60">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      )}
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-border text-left font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {columns.map((c) => (
              <th key={c.key} className={cn("px-4 py-2 font-normal", c.className)}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                "border-b border-border/60 last:border-0",
                onRowClick && "cursor-pointer hover:bg-accent/60",
              )}
            >
              {columns.map((c) => (
                <td key={c.key} className={cn("px-4 py-2.5 align-top", c.className)}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && !loading && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-sm text-muted-foreground">
                {emptyLabel}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function OpsPager({
  page,
  pageSize,
  total,
  onPage,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPage: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  const btn =
    "rounded-md border border-border px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
      <span>
        {from}–{to} of {total.toLocaleString("en-GB")}
      </span>
      <div className="flex items-center gap-2">
        <button type="button" className={btn} disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Previous
        </button>
        <span className="font-mono">
          {page} / {pages}
        </span>
        <button
          type="button"
          className={btn}
          disabled={page >= pages}
          onClick={() => onPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/** Right-hand inspect panel: the replica is read only, so no edit controls. */
export function OpsDrawer({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string | undefined;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/30"
      />
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-xl">
        <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
          <div className="min-w-0">
            <p className="truncate font-serif text-lg text-foreground">{title}</p>
            {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3">{children}</div>
      </div>
    </div>
  );
}

export function DetailRows({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="divide-y divide-border">
      {rows
        .filter(([, v]) => v !== null && v !== undefined && v !== "")
        .map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4 py-2">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </dt>
            <dd className="max-w-[62%] break-words text-right text-sm text-foreground">{value}</dd>
          </div>
        ))}
    </dl>
  );
}

export function StatusPill({ value }: { value: string | null }) {
  const v = (value ?? "").toLowerCase();
  const tone =
    v === "paid" || v === "converted" || v === "completed"
      ? "bg-primary/10 text-primary"
      : v === "pending" || v === "in progress" || v === "partial"
        ? "bg-amber-500/10 text-amber-600"
        : v === "failed" || v === "lost" || v === "cancelled"
          ? "bg-destructive/10 text-destructive"
          : "bg-muted text-muted-foreground";
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]",
        tone,
      )}
    >
      {value || "—"}
    </span>
  );
}

export const dateLabel = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

export const moneyLabel = (amount: number | null, currency: string | null) =>
  amount == null
    ? "—"
    : `${(currency ?? "USD").toUpperCase()} ${amount.toLocaleString("en-GB", { maximumFractionDigits: 2 })}`;
