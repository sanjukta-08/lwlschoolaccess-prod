# Add real LinkedIn stories to the gallery

Goal: put genuine, permissioned LinkedIn posts (starting with Kanav Suri's "My first LinkedIn post") into the stories gallery as screenshot cards, alongside the existing stand-in cards.

## What I need from you

LinkedIn blocks automated reading of posts, so I cannot pull the text or the images from the link. Attach to chat, for each post you want added:

1. A screenshot image of the post (crop to the post card; blur any name you do not want public before uploading).
2. The poster's name and role, e.g. "Kanav Suri - Grade 11, Future Doctors Fellowship".
3. The post URL (I already have Kanav's).

If you attach several screenshots in one go, I will add them all in one pass.

## What I will build

- Upload each screenshot to the CDN and store it as an asset pointer, so the repo stays light.
- Add one entry per post to the stories data, marked as real and approved, with the author name, role, a short excerpt for the card, the post link, and tags for the relevant programme tracks so the story also shows on those programme pages.
- Real posts sort first everywhere the gallery appears (home story strip, gallery page, programme pages); the nine existing stand-in cards stay after them.
- Each card keeps the current LinkedIn look (avatar, name, role, reaction stack, engagement count) and opens the screenshot in the lightbox; a "View on LinkedIn" link on the card goes to the live post.

## Technical notes

- Data lives in `src/lib/social-proof.ts` (`LINKEDIN_POSTS`, `APPROVED_STORIES`, track matching). New entries set `image`, `imageAlt`, `postUrl`, `approved: true`, and omit `placeholder`.
- Screenshots go through `lovable-assets create` into `src/assets/stories/*.asset.json`.
- Sorting changes: real stories (no `placeholder`) rank above stand-ins in the selector used by `StoryGallery` and `StoryStrip`.
- Cards render as image cards; no CSS blurring is used for privacy.
