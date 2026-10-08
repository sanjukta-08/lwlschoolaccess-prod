# Stop the plain-text flash before the FinLit application form

## What the video shows

1. On our FinLit programme page, the visitor clicks "Apply for November".
2. A new tab opens and shows a dark blank screen for a moment.
3. Then the plain, unstyled text appears: "Apply to the Capital Minds Fellowship… What you will need…". This is the flash in the video.
4. Then the real "Tell us about you." form loads.

## Confirmed cause

Step 3 comes from the FinLit website itself (joinfinlit.com/apply), not from lwlschoolaccess.com. When FinLit publishes, it writes a plain text summary for search engines into the visible part of every page. On the application pages, browsers show that text before the form's design loads. Our Apply button links straight to FinLit; nothing on our side adds that screen.

This project can only view the FinLit project, not change it. The changes below have to be made in the **Finlit Ai - Published** project.

## Changes (made in the FinLit project)

1. On the four FinLit application pages (/apply, /competition/apply, /masterclass/apply, /business-fin-challenge/apply), visitors no longer see any plain text while the page loads.
2. Instead, they see a short branded loading screen with FinLit's background colour and logo. It looks right from the very first moment, then the form takes over.
3. The text summary for search engines and AI tools stays, but only where visitors never see it.
4. Page titles, descriptions, links and the application form stay exactly as they are.

## Check after publishing

- Open each of the four pages in a normal browser and on a slow mobile connection. The plain text must never appear.
- Click "Apply for November" from our FinLit programme page, as in the video. Only the branded loading screen should show before the form.
- The campaign tracking details on the link still reach the form.

## Nothing changes on lwlschoolaccess.com

No changes to our site, links or catalogue data. We are not adding our own apply page.

## Technical details (for the FinLit project)

- In `scripts/prerender.mjs`, `injectBody()` writes route copy into `<div id="root">`. For the four application routes, write a styled loading shell into `#root` instead, with critical CSS inline in `<head>`. Put the crawler copy in a `<noscript>` block.
- `src/main.tsx` keeps the `data-prerendered-path` check; for these routes it clears the shell before `createRoot`.
- Leave the JSON-LD, meta, canonical and og tags unchanged.
