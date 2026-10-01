<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Compass concierge: `askCompass` server fn (src/lib/compass.functions.ts) → compass.server.ts; searches via loadCatalogue + all_masterclasses_public, logs to lwl_site.concierge_* with service role — reuses the existing applyLink contract and keeps writes server-only.
- Compass frontend: one session-only conversation lives in the root `CompassProvider`; its sheet code lazy-loads on first open so every page and Finder trigger share one state without initial bundle cost.
- Admin gate: shared password (LWL_ADMIN_PANEL_PASSWORD) + encrypted httpOnly session (LWL_ADMIN_SESSION_SECRET) in admin-auth.server.ts; every admin data server fn calls requireAdmin() — route guard is UX only.
