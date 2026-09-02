import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { AdminShell } from "@/components/admin/AdminShell";
import { adminMentors } from "@/lib/portal/admin-ops.functions";

export const Route = createFileRoute("/admin/mentors")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mentors | Learn with Leaders admin" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Mentor roster across the portal and the shared Learn with Leaders faculty tables.",
      },
      { property: "og:title", content: "Mentors | Learn with Leaders admin" },
      {
        property: "og:description",
        content: "Mentor roster across the portal and the shared Learn with Leaders faculty tables.",
      },
    ],
  }),
  component: () => (
    <AdminShell title="Mentors">
      <MentorsBody />
    </AdminShell>
  ),
});

function MentorsBody() {
  const query = useQuery({ queryKey: ["admin", "mentors"], queryFn: () => adminMentors() });

  if (query.isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-primary" /> Loading mentors…
      </div>
    );
  }
  if (query.error) {
    return (
      <p className="text-sm text-destructive">
        Could not load mentors: {(query.error as Error).message}
      </p>
    );
  }

  const rows = query.data?.rows ?? [];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {rows.length} mentor{rows.length === 1 ? "" : "s"} in view · {query.data?.sharedCount ?? 0}{" "}
        on the shared faculty table. Portal records take priority when a name appears in both.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((m) => (
          <article key={`${m.source}-${m.id}`} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              {m.imageUrl ? (
                <img
                  src={m.imageUrl}
                  alt={m.fullName ?? "Mentor"}
                  loading="lazy"
                  className="h-12 w-12 flex-none rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-muted font-mono text-xs text-muted-foreground">
                  {(m.fullName ?? "?").slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">{m.fullName ?? "Unnamed mentor"}</p>
                <p className="truncate text-xs text-muted-foreground">{m.university ?? "—"}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {m.source === "portal" ? "Portal" : "Shared"}
                  {m.isActive ? "" : " · inactive"}
                </p>
              </div>
            </div>
            {m.bio && (
              <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                {m.bio}
              </p>
            )}
            {m.programmes.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {m.programmes.slice(0, 4).map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-muted-foreground">No mentor records found.</p>
        )}
      </div>
    </div>
  );
}
