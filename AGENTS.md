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
- Critical first-paint safeguards live inline at the start of the root document head so publishing-injected fallback content is hidden before external CSS loads.
- Public typography uses locally bundled font weights with root-level preloads to avoid external-font delays and late metric swaps.
- Standalone campaign pages may use route-scoped typography and design tokens so their approved source artwork is reproduced without changing the public site theme.
- Search URLs use the shared SEO origin setting; keep the currently published origin until the verified legacy-domain cutover, so canonicals, sitemap and robots stay aligned without changing outbound application links.
- Legacy URL redirects are exact, evidence-backed mappings and preserve query strings; unmapped pages and assets must remain on the existing host until exported, so indexed content is not silently redirected to unrelated pages.
