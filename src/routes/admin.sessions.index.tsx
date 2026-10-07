import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminSessions } from "@/lib/admin-data.functions";
import { AdminShell, fmtDateTime } from "@/components/admin/AdminShell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/sessions/")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Conversations · Compass admin" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: SessionsPage,
});

function SessionsPage() {
  const navigate = useNavigate();
  const fetchSessions = useServerFn(adminSessions);
  const { data, error, isLoading } = useQuery({
    queryKey: ["admin", "sessions"],
    queryFn: () => fetchSessions(),
  });
  return (
    <AdminShell title="Conversations">
      <p className="mb-4 text-sm text-muted-foreground">
        Most recent 100. Click a row to read the transcript.
      </p>
      {error && <p className="text-destructive">Could not load conversations.</p>}
      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Started</TableHead>
              <TableHead>Page</TableHead>
              <TableHead>utm_source</TableHead>
              <TableHead>utm_medium</TableHead>
              <TableHead>utm_campaign</TableHead>
              <TableHead className="text-right">Messages</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data ?? []).map((s) => (
              <TableRow
                key={s.id}
                className="cursor-pointer"
                tabIndex={0}
                onClick={() => navigate({ to: "/admin/sessions/$id", params: { id: s.id } })}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate({ to: "/admin/sessions/$id", params: { id: s.id } })
                }
              >
                <TableCell className="whitespace-nowrap">{fmtDateTime(s.created_at)}</TableCell>
                <TableCell className="break-all">{s.source_page ?? "–"}</TableCell>
                <TableCell>{s.utm_source ?? "–"}</TableCell>
                <TableCell>{s.utm_medium ?? "–"}</TableCell>
                <TableCell>{s.utm_campaign ?? "–"}</TableCell>
                <TableCell className="text-right">{s.messages}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </AdminShell>
  );
}
