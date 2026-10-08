# Revised fix: the FinLit application page flash

## What the live page actually sends

I downloaded joinfinlit.com/apply exactly as a visitor's browser gets it and compared it with the FinLit project's current code.

- **FinLit already has two protections in its page head:** a branded loading spinner and the "hide crawler text" rule. Neither one works on the live page.
- **The plain text sits directly inside the app's main container.** Its markup carries no styling, so the browser shows it as raw headings and bullets. The FinLit app only replaces it after its code downloads and the form loads, and that gap is the flash in your video.

## Why FinLit's protections don't work

All of this comes from one script that FinLit runs every time it publishes:

1. **It deletes the hidden crawler block.** The source page keeps the search-engine text inside a block that visitors never see. The publish script removes that block from every page.
2. **It moves the text into the visible part of the page.** The same text is written straight into the app's main container.
3. **It switches off the loading spinner.** The spinner only shows while that container is empty and carries a specific label. The script fills the container and drops the label, so the spinner can never appear.
4. **The "hide crawler text" rule never matches.** That rule hides containers with certain names. The plain text isn't in one of those, so it stays visible.
5. **The app keeps the text until the form arrives.** On startup, the app sees text that belongs to the current page and leaves it there. On ordinary content pages that text is styled and looks fine. On the application pages it's plain, unstyled text.

Seven FinLit pages get this plain text: the four application pages (/apply, /competition/apply, /masterclass/apply, /business-fin-challenge/apply), plus /scholarship, /privacy and /terms.

## Revised fix (made in the "Finlit Ai - Published" project)

For those seven pages only:

1. Leave the app's main container empty and keep its spinner label, so the existing branded spinner shows from the first moment.
2. Put the search-engine text back in the hidden crawler block, so search engines and AI tools still read it and visitors never see it.
3. Keep every other FinLit page as it is. Those pages ship styled content and don't flash.
4. Keep page titles, descriptions, sharing images, structured data, the forms and campaign tracking unchanged.
5. Publish FinLit.

## Instruction to paste into the FinLit project

"In scripts/prerender.mjs, the routes that use markup() (/apply, /competition/apply, /masterclass/apply, /business-fin-challenge/apply, /scholarship, /privacy, /terms) ship unstyled copy inside #root. writeRoute() runs stripNoscriptFallback() and then injectBody() writes the copy into #root and drops class="app-boot", so the boot splash (#root.app-boot:empty) and the #bot-content guard never apply. Fix this for markup() routes only: (1) write `<div id="root" class="app-boot" data-prerendered-path="{path}"></div>` with nothing inside it; (2) emit the route copy as `<noscript><div id="bot-content">{copy}</div></noscript>` immediately before #root, and do not strip it for these routes; (3) keep the current behaviour for html() routes; (4) make injectBody keep the existing class attribute on #root for all routes. Leave the title, meta, canonical, og/twitter tags and JSON-LD unchanged. src/main.tsx needs no change because an empty #root yields no prerendered HTML. Then publish."

## How I will verify after FinLit publishes

1. Download each of the seven pages and confirm the app's main container is empty and the search-engine text is only in the hidden block.
2. Open each application page in a browser on a slow mobile connection and capture the first moments. Only the FinLit background and spinner may appear before the form, with no plain text at any point.
3. Repeat the journey from your video: homepage, Flagship Fellowships, FinLit programme page, "Apply for November". Confirm the form opens and campaign tracking is still attached.

## Unchanged

Nothing changes on lwlschoolaccess.com. Future Doctors and SAT Instinct don't need this fix: their application pages are styled from the first moment. Sir Luther Center's application page briefly shows its styled homepage before the form, so that would be a separate fix in its own project if you want it.
