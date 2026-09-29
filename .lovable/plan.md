# Compass concierge frontend

## Goal
Add one shared, session-only Compass conversation that opens from a floating launcher on every page and from an inline prompt on the Programme Finder.

## Implementation
- Add a global Compass provider/launcher to the root layout. It will own open state, transcript, returned session ID, request status, and the backend call so every launcher opens the same conversation.
- Lazy-load the panel only after the visitor opens Compass, keeping it out of the initial page bundle.
- Build the responsive panel with the existing accessible sheet foundation: 400–440px desktop side panel, full-screen mobile view, focus trapping, Escape/close controls, restored input focus, and an always-visible human-advisor link.
- Compose the transcript and composer from AI Elements primitives. Include the welcome message, four quick replies, optimistic user messages, thinking state, readable user/Compass messages, and disabled input after the conversation limit.
- Render returned catalogue matches as compact branded cards with platform, programme details, dates, fees, and attributed View/Apply links. Apply appears only when the backend supplies a URL.
- Pass the current page and the existing canonical UTM values to `askCompass`; retain the backend session ID for every later message.
- Add a small “Not sure where to start? Ask Compass” prompt near the Finder results heading, wired to the same global conversation.

## Validation
- Exercise a multi-turn conversation against the real backend, including a quick reply and rendered result links.
- Confirm the same conversation remains after closing, navigating, and reopening within the page session.
- Check limit/error/empty-result rendering, keyboard focus, Escape close, and attributed external links.
- Verify desktop and mobile layouts, then check lint, types/build output, runtime errors, and initial lazy-loading behavior.

## Technical details
- Conversation shape: one conversation, held only in React memory until a full reload, as requested.
- Backend boundary remains `askCompass`; no database or server changes are planned.
- AI Elements source components will be installed and branded rather than duplicating their transcript/composer primitives.
