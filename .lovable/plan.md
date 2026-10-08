# Why the flash is still there, and how to remove it

## What I checked just now (live sites)

1. **joinfinlit.com/apply (the FinLit application page)** still sends the plain text "Apply to the Capital Minds Fellowship… What you will need…" as visible page content before the form loads. This is exactly the flash in your video. Nothing has changed on FinLit yet.
2. **lwlschoolaccess.com** does not yet include the safeguard added in the last change. That change is only in the preview; the live site has not been republished since.

## Why our last change could not fix it

The flash happens on the FinLit website, after the Apply button opens a new tab. Our site has no control over what another website shows while it loads. This project can only view the FinLit project, not change it. The fix has to be made inside the **Finlit Ai - Published** project.

## Steps

1. **Publish lwlschoolaccess.com** so the safeguard from the last change goes live on our own pages.
2. **In the FinLit project** (open it and paste the instruction below), for the four application pages /apply, /competition/apply, /masterclass/apply and /business-fin-challenge/apply:
   - Visitors never see the plain text while the page loads.
   - Show a short branded loading screen (FinLit background colour and logo) from the very first moment, then the form.
   - Keep the search-engine summary, but only where visitors never see it.
   - Keep page titles, descriptions, links and the form unchanged.
   - Publish FinLit.
3. **Check again after both are published**: I will re-test joinfinlit.com/apply on a slow mobile connection and from our "Apply for November" button, and confirm the plain text no longer appears.
4. **Check the other partner application pages** (Future Doctors, SAT Instinct, Sir Luther Center, Onward, Future Lawyers) the same way and list any that show the same flash, so each can be fixed in its own project.

## Instruction to paste into the FinLit project

"On /apply, /competition/apply, /masterclass/apply and /business-fin-challenge/apply, the published HTML shows plain route text inside #root before the app loads. In scripts/prerender.mjs, for these four routes, stop writing the route copy into #root. Write an empty branded loading shell into #root instead (critical CSS inline in head: page background colour, centered logo), and move the route copy into a noscript block. In src/main.tsx, clear #root before createRoot for these routes. Leave meta tags, canonical, og tags and JSON-LD unchanged. Then publish."

## Nothing else changes on lwlschoolaccess.com

No new apply page, no link changes, no catalogue data changes.
