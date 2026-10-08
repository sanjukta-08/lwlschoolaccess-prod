# Prevent raw pre-rendered content from flashing

## Confirmed project structure

This TanStack Start site does not have a standalone `index.html`. Its server-rendered document is created by the shared root shell in `src/routes/__root.tsx`, where the critical style can be emitted before the generated head content and before any visible page content.

No `prerender-content`, `bot-content`, or similarly named fallback container currently exists in this project's source. The rule will therefore act as a safeguard for content injected during publishing or rendering without hiding the site's normal server-rendered React pages.

## Changes

1. **Add the critical hiding rule at the earliest point**
   - Put the requested inline `<style>` first inside the shared document `<head>`, before `<HeadContent />`.
   - Hide `#prerender-content`, IDs containing `prerender`, and IDs containing `bot-content` with `display: none !important`.
   - Keep all existing fonts, colours, metadata, scripts, and tracking unchanged.

2. **Keep the first paint clean**
   - Give the document/root loading surface the site's existing background colour through the same critical style, without adding visible text or changing any completed page layout.
   - Preserve the current page while internal route data loads, avoiding a blank replacement or raw fallback during client-side navigation.

3. **Verify the result**
   - Check direct page loads and internal link navigation on desktop and mobile under a throttled connection.
   - Inspect the first HTML response to confirm the critical style precedes page content.
   - Confirm normal server-rendered content remains visible, fallback selectors stay hidden, and no console or build errors are introduced.

## Boundary

This protects pages served by `lwlschoolaccess.com`. It cannot change the separate HTML served after an Apply link opens an external domain such as `joinfinlit.com`; that destination must carry the same safeguard in its own project to eliminate its pre-form flash.
