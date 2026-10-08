import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AdminShell, fmtDateTime } from "@/components/admin/AdminShell";
import { deletePersonalData, findPersonalData } from "@/lib/admin-deletion.functions";

export const Route = createFileRoute("/admin/deletion")({
  head: () => ({
    meta: [
      { title: "Deletion requests · Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DeletionPage,
});

type Found = Awaited<ReturnType<typeof findPersonalData>>;

function DeletionPage() {
  const find = useServerFn(findPersonalData);
  const del = useServerFn(deletePersonalData);
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<Found | null>(null);
  const [searched, setSearched] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const r = await find({ data: { query } });
      setFound(r);
      setSearched(query);
    } catch (err) {
      setMsg(`Search failed: ${(err as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete every record matching "${searched}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const r = await del({ data: { query: searched } });
      setMsg(`Deleted ${r.deletedSessions} conversation(s) with their messages and contact details.`);
      setFound(null);
    } catch (err) {
      setMsg(`Delete failed: ${(err as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const total = found ? found.sessions.length + found.leads.length + found.messages.length : 0;

  return (
    <AdminShell title="Deletion requests">
      <p className="max-w-2xl text-sm text-muted-foreground">
        Enter the email address or phone number someone left in Compass, or a Compass conversation
        ID. You'll see every matching conversation, message and contact record on this site, and
        can delete them all at once.
      </p>
      <form onSubmit={search} className="mt-4 flex max-w-xl gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="email, phone or conversation ID"
          minLength={3}
          required
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <button
          disabled={busy}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          Search
        </button>
      </form>
      {msg ? <p className="mt-4 text-sm text-foreground">{msg}</p> : null}
      {found ? (
        total === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No records match "{searched}".</p>
        ) : (
          <div className="mt-6 space-y-6 text-sm">
            <div className="flex items-center justify-between">
              <p>
                {found.sessions.length} conversation(s), {found.leads.length} contact record(s),{" "}
                {found.messages.length} message(s).
              </p>
              <button
                onClick={remove}
                disabled={busy}
                className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground disabled:opacity-50"
              >
                Delete all
              </button>
            </div>
            <section>
              <h2 className="font-semibold">Contact details</h2>
              <ul className="mt-2 space-y-1">
                {found.leads.map((l) => (
                  <li key={l.id}>
                    {l.name ?? "—"} · {l.contact ?? "—"} · grade {l.grade ?? "—"} ·{" "}
                    {fmtDateTime(l.created_at)}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-semibold">Conversations</h2>
              <ul className="mt-2 space-y-1">
                {found.sessions.map((s) => (
                  <li key={s.id}>
                    {s.id} · {fmtDateTime(s.created_at)} · {s.source_page ?? "—"}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-semibold">Messages</h2>
              <ul className="mt-2 space-y-2">
                {found.messages.map((m) => (
                  <li key={m.id} className="rounded-md border border-border p-2">
                    <span className="text-muted-foreground">
                      {m.role} · {fmtDateTime(m.created_at)}
                    </span>
                    <p className="mt-1 whitespace-pre-wrap">{m.content}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )
      ) : null}
    </AdminShell>
  );
}
