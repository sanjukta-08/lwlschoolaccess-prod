import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminTranscript } from "@/lib/admin-data.functions";
import { AdminShell, fmtDateTime } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/sessions/$id")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Transcript · Compass admin" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: TranscriptPage,
});

function TranscriptPage() {
  const { id } = Route.useParams();
  const fetchT = useServerFn(adminTranscript);
  const { data, error, isLoading } = useQuery({ queryKey: ["admin", "transcript", id], queryFn: () => fetchT({ data: { id } }) });
  return (
    <AdminShell title="Transcript">
      <Link to="/admin/sessions" className="text-sm text-primary underline">← All conversations</Link>
      {error && <p className="mt-4 text-destructive">Could not load this conversation.</p>}
      {isLoading && <p className="mt-4 text-muted-foreground">Loading…</p>}
      {data === null && <p className="mt-4 text-muted-foreground">Conversation not found.</p>}
      {data && (
        <>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-sm md:grid-cols-4">
            <div><dt className="text-muted-foreground">Started</dt><dd className="text-foreground">{fmtDateTime(data.session.created_at)}</dd></div>
            <div><dt className="text-muted-foreground">Page</dt><dd className="break-all text-foreground">{data.session.source_page ?? "–"}</dd></div>
            <div><dt className="text-muted-foreground">UTM</dt><dd className="text-foreground">{[data.session.utm_source, data.session.utm_medium, data.session.utm_campaign].map((v) => v ?? "–").join(" / ")}</dd></div>
            <div><dt className="text-muted-foreground">Messages</dt><dd className="text-foreground">{data.messages.length}</dd></div>
          </dl>
          <ol className="mt-6 space-y-3">
            {data.messages.map((m) => (
              <li
                key={m.id}
                className={`rounded-lg border border-border p-4 ${m.role === "user" ? "bg-muted" : m.role === "assistant" ? "bg-card" : "bg-background text-muted-foreground"}`}
              >
                <div className="flex justify-between text-xs uppercase tracking-wide text-muted-foreground">
                  <span>{m.role}</span>
                  <span>{fmtDateTime(m.created_at)}</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm text-foreground">{m.content}</p>
                {m.surfaced.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Shown: {m.surfaced.map((s) => `${s.name} [${s.id}]`).join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </>
      )}
    </AdminShell>
  );
}
