import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { adminLeads, adminSetContacted } from "@/lib/admin-data.functions";
import { AdminShell, fmtDateTime } from "@/components/admin/AdminShell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/admin/leads")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Leads · Compass admin" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: LeadsPage,
});

type Lead = Awaited<ReturnType<typeof adminLeads>>[number];

function LeadsPage() {
  const qc = useQueryClient();
  const fetchLeads = useServerFn(adminLeads);
  const setContacted = useServerFn(adminSetContacted);
  const [hide, setHide] = useState(false);
  const { data, error, isLoading } = useQuery({ queryKey: ["admin", "leads"], queryFn: () => fetchLeads() });

  const m = useMutation({
    mutationFn: (v: { id: string; contacted: boolean }) => setContacted({ data: v }),
    onMutate: (v) => {
      qc.setQueryData<Lead[]>(["admin", "leads"], (old) => old?.map((l) => (l.id === v.id ? { ...l, contacted: v.contacted } : l)));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["admin", "leads"] }),
  });

  const rows = (data ?? []).filter((l) => !hide || !l.contacted);

  return (
    <AdminShell title="Leads">
      <label className="mb-4 flex items-center gap-2 text-sm text-foreground">
        <Checkbox checked={hide} onCheckedChange={(v) => setHide(v === true)} />
        Hide contacted
      </label>
      {error && <p className="text-destructive">Could not load leads.</p>}
      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contacted</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Interested in</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-muted-foreground">No leads.</TableCell></TableRow>
            )}
            {rows.map((l) => (
              <TableRow key={l.id}>
                <TableCell>
                  <Checkbox
                    aria-label={`Mark ${l.name} as contacted`}
                    checked={l.contacted}
                    onCheckedChange={(v) => m.mutate({ id: l.id, contacted: v === true })}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">{fmtDateTime(l.created_at)}</TableCell>
                <TableCell className="font-medium">{l.name}</TableCell>
                <TableCell className="break-all">{l.contact}</TableCell>
                <TableCell>{l.grade ?? "–"}</TableCell>
                <TableCell>
                  {l.programmes.length ? <ul className="space-y-0.5">{l.programmes.map((p) => <li key={p}>{p}</li>)}</ul> : "–"}
                </TableCell>
                <TableCell className="max-w-xs whitespace-pre-wrap">{l.notes ?? "–"}</TableCell>
                <TableCell>
                  {l.session_id && (
                    <Link to="/admin/sessions/$id" params={{ id: l.session_id }} className="text-sm text-primary underline">
                      Transcript
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {m.isError && <p className="mt-3 text-destructive">Could not save that change — please retry.</p>}
    </AdminShell>
  );
}
