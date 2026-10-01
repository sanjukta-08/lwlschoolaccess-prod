# New photography for the camp cards

Swap in the uploaded photos on the `/camps` cards so each camp shows its own destination.

## Which image goes where

| Camp card | New photo |
| --- | --- |
| HCUS Young Global Leaders Summer Camp | United States group photo (students at the MIT dome) |
| IGNITE Programme at Cambridge Judge | United Kingdom (King's College punting) |
| Future Sustainability Innovators (Geneva) | Geneva (Chillon castle on the lake) |
| Entrepreneurship Powered by AI (Salamanca) | Spain (Salamanca bell tower) |
| Pre-Med Horizons Program | Harvard hall (pre-med upload) |
| Pre-Law Horizons Program | Harvard aerial campus (pre-law upload) |
| HCUS Winter Camp | unchanged (current snowy Harvard photo) |

The motorcycle photo is ignored.

## Label handling

Four of the photos already have a printed white country label. On those four cards the card's own "City, Country" chip is hidden so there is only one location tag; the Winter, Pre-Med and Pre-Law cards keep their chip as today.

## Scope

- Only the camps hub cards and the shared camp record images change. The three bespoke camp pages (Summer, Winter, IGNITE) keep their own hero artwork untouched.
- No copy, layout, data or apply-link changes.

## Technical notes

- Upload the six images through Lovable Assets and reference them as `.asset.json` pointers from `src/lib/camps.ts`, replacing the current `src/assets/camps/*.jpg` imports for those six camps; the superseded local jpgs are deleted.
- Add an optional `hasPrintedLabel?: boolean` flag on the camp record; `CampCard` skips rendering the city chip when it is set. The "Dates soon" chip stays.
- Verify with a typecheck and a browser pass over `/camps` (all seven cards render, no 404s, no console errors).
