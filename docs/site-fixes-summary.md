# Foundry Homes - Site Fixes Summary

Date: 2026-07-10
Companion document: `docs/site-ui-qa-audit.md` (full issue list with per-issue status).

---

## Files changed

| File | Change |
|---|---|
| `app/globals.css` | Removed bare `button` from the global pill-radius rule; appended a "QA fix layer" at the end of the file covering contrast, hero sizing, buttons, circles, blog CSS, and responsive gaps (detailed below). |
| `components/PageFx.tsx` | **New** client component that mounts the shared page behaviours (navbar scroll state, burger menu, reveal-on-scroll) on server-component routes. |
| `app/granny-flat-models/[slug]/page.tsx` | Added `<PageFx />`; added `rv` reveal classes to hero, section heads, inclusion grid, and circular feature grid for animation consistency. |
| `app/granny-flat-models/[slug]/ModelGallery.tsx` | Added `rv` reveal class to the gallery grid. |
| `app/blog/[slug]/page.tsx` | Added `<PageFx />` so the navbar/burger work on article pages. |
| `app/grannyflats/page.tsx` | Removed inline hero font-size (now handled by the CSS layer); aligned the four step-circle descriptions with the shared wording used on the other range pages (long copy was physically clipped by the circle mask); restructured the teal CTA into the standard `h2 + p` pattern. |
| `app/custom-builds/page.tsx` | Brochure band eyebrow no longer duplicates the H2 sentence (now "Brochure"). |
| `app/admin/login/page.tsx` | Login now respects the persisted admin theme / OS preference instead of hard-coding light mode. |
| `docs/site-ui-qa-audit.md` | New audit document. |
| `docs/site-fixes-summary.md` | This document. |

---

## Fixes completed

### 1. Low-contrast labels over dark/image backgrounds (screenshot issue #1)
- **Reusable fix in `globals.css`**, applies site-wide:
  - New tokens: `--teal-text` (AA-compliant teal per theme: `#17B3AD` dark / `#00706E` light) and `--teal-on-image` (`#2CC9C3`, for labels sitting on photos which are dark in both themes).
  - All eyebrow labels, step numbers, hero-strip numbers, footer column headings, range hint, blog tags and the mobile-menu tag now use `--teal-text`.
  - Range cards: "Range / 01"-style index labels now use `--teal-on-image` with a subtle text shadow; card titles forced white in **both** themes (they previously followed the theme token and went near-black in light mode); meta and description lines forced light; the bottom gradient was slightly strengthened; the "Explore the range" button on cards is forced to the light variant in both themes.
  - Same class of fix applied to every other always-dark-surface section: homepage contact photo panel, Regions band (heading, body, region chips, stat), and the steel-framing photo proof cards.

### 2. Hero headline overflowing the copy panel (screenshot issue #2)
- Root cause: split-hero headlines were sized with viewport units meant for a full-width hero, while the copy panel is ~39% of the viewport, so words like "STRENGTH" and "OPPORTUNITY" overflowed onto the hero image.
- Fixed centrally in the CSS layer for **all seven pages** sharing the pattern: `/foundryhomes`, `/granny-flats-cabins`, `/grannyflats`, `/custom-builds`, `/contact`, `/steel-framing`, `/foundry` (plus `max-width:100%` safety on model/suppliers/finance heroes). Headlines now scale from 38–44px up to 80–96px and always fit the panel across desktop, laptop and tablet; below 920px the heroes stack to one column as before.

### 3. Button text alignment and wrapping (screenshot issue #3)
- `.btn` (the single shared button class used by every CTA on the site) now has: `justify-content:center`, `text-align:center`, `white-space:nowrap`, and `flex-shrink:0` so it can no longer be squeezed by flex parents - this fixes "DOWNLOAD FREE" breaking onto two ragged lines in the brochure bands.
- Below 600px, buttons are allowed to wrap again (centred, `line-height:1.45`) so very long labels stay usable on small phones.
- Removed the bare `button` selector from the global `border-radius:999px !important` rule. That rule was silently distorting: model gallery tiles (see below), admin editor tabs, blog filter tabs, and the blog search/newsletter submit buttons (now explicitly square to sit flush with their inputs).

### 4. Circular info sections - centring, cropping, animation (screenshot issue #4)
- **Animation consistency:** a single keyframe-based staggered reveal (`fade + rise + slight scale-in`, 0.85s, 90ms stagger) now applies to *every* round grid on the site: `steel-benefits__grid`, `foundry-promise-grid`, `granny-feature-grid`, and the four step grids (`granny/gf/fh/cb-step-grid`) which previously animated as one flat block. Keyframes were used deliberately so the reveal cannot fight the `!important` hover-transform transitions in the legacy layers. `prefers-reduced-motion` disables it.
- **Model detail pages** now animate at all (they previously had zero entrance animation and, worse, no working burger menu - see item 6).
- **Text fit:** step circles get larger padding, tighter type scale (`strong` 26–46px, `h3` 16–26px capped at 11ch, `p` 11.5–13.5px capped at 26ch, line-height 1.5) so no line touches the curve; benefit circles get more padding and proper line-heights for sentence-length labels.
- `/grannyflats` step copy was aligned to the shared wording used on the other three range pages - the old long version could not fit inside a ~300px circle at 4-column widths and was being clipped by the round mask.

### 5. Gallery / image shape and cropping (screenshot issue #5)
- The model-page gallery tiles are `<button>` elements and were being forced into **oval/pill shapes** by the global pill-radius rule - this was the "circular image masks with bad cropping" issue. Removing bare `button` from that rule (plus an explicit `border-radius:0` on `.model-gallery__image`) restores clean rectangular 4:3 crops on all 12 model pages.
- All gallery/grid images were audited: every image container uses `object-fit:cover` with explicit aspect ratios or stretched containers; the lightbox uses `object-contain`. No stretching remains.

### 6. Large image not fitting its box / broken image containers (screenshot issue #6)
- Blog article featured image (`.blog-post-image`) had **no CSS at all** and used Next `<Image fill>` inside an unpositioned, zero-height div - the image escaped its box and the page showed broken empty space. It now has a positioned, bordered 16:8 (16:10 on mobile) container.
- Blog index lead-card image (`.blog-lead__image`) had the same `fill`-without-positioned-parent bug - fixed with a positioned 16:10 container.
- Model floor-plan container is pinned to a white plate in both themes (plan drawings are dark-line artwork and were sitting on a dark surface in dark mode).

### 7. Dark mode / light mode fixes
- Light mode: range card titles/meta, homepage "Let's talk" photo panel heading, Regions band heading + chips, steel proof-card text - all previously followed theme tokens and became dark-on-dark; now pinned to light text (these surfaces are dark in both themes by design).
- Dark mode: all small teal labels bumped from `#008080` (≈3.5:1 on the site background - an AA failure at 10–11px) to `#17B3AD`.
- Form placeholders switched from brand-teal to the muted theme token (they read as pre-filled values and were low-contrast in dark mode).
- Admin login page now follows the persisted admin theme / OS preference instead of always rendering light.
- Blog article + blog lead card styles are fully theme-token based, so both themes work out of the box.

### 8. Responsive fixes
- `/foundryhomes` model grid now drops to 2 columns below 1100px (previously stayed at 3 columns down to 760px and became cramped) - matches the granny-flats grid behaviour.
- `/suppliers` logo grid gets row dividers when it wraps to 4/2 columns.
- Buttons wrap gracefully (centred) below 600px, stay single-line above.
- Hero headline scaling verified against the panel width at 1920 / 1440 / 1200 / 1000 / 920 / 640 / 360px.
- Circle grids: existing 4 → 2 → 1 column stacking retained; text-fit changes verified at each tier.
- Admin: sidebar off-canvas, stacked editor, and horizontally scrolling table were already correct (verified).

### 9. Navigation fixed on server-rendered routes
- All 12 `/granny-flat-models/[slug]` pages and every `/blog/[slug]` article page previously **had a dead burger menu and no navbar scroll state** because those routes never mounted the shared behaviour hook. The new `PageFx` client component mounts `useFoundryAnimations` on those routes. Mobile navigation now works on every page of the site.

---

## Reusable components improved
- `app/globals.css` - all fixes were made at the shared-class level (`.btn`, `.eyebrow`, `.range-card`, circle grids, hero patterns), so they apply everywhere those components are used.
- `components/PageFx.tsx` (new) - reusable behaviour mount for any future server-component route.
- `ModelGallery` - participates in the shared reveal system.

## Admin panel actions tested
See the "Admin Panel QA" section of `docs/site-ui-qa-audit.md` for the full per-feature table. Summary: login/logout, session middleware, list/search/filter, create, edit (with optimistic-concurrency 409), delete (with blob cleanup), draft/publish toggle (with scheduling), image upload (sharp validation + re-encode + Vercel Blob), theme toggle, and responsive layout were all verified **from the code** and compile cleanly. Loading, error, empty, and validation states are all implemented in the UI.

## What is working
- `npm run build` passes: compile ✓, type-check + lint ✓, all 36 routes prerender ✓ (including the 12 model pages and blog).
- All screenshot issues (#1–#6) fixed at the component/stylesheet level, site-wide.
- Both themes verified rule-by-rule against every always-dark surface.
- Mobile menu now functional on all routes.

## What is not working / not changed (needs a decision or data)
- `/foundryhomes` copy says "Six architecturally designed plans" but lists three models - needs the content owner (audit Issue 23).
- `/contact` phone link is a placeholder `tel:+6400000000` behind "0800 FOUNDRY" - needs the real number (Issue 24).
- `/suppliers` hero and statement repeat the same sentence back-to-back - copy decision (Issue 25).
- `GET /api/posts` without a status filter (and `GET /api/posts/[slug]`) exposes DRAFT posts to unauthenticated callers. The admin list depends on this endpoint, so gating it needs a small product/API decision (Issue in Admin QA - documented risk).
- Admin post list caps at 100 posts with no pagination (fine at current scale; documented).
- `globals.css` carries several superseded styling generations held together with `!important`; rendering is correct but a consolidation refactor is recommended (Issue 26).

## What could not be tested and why
- Live admin round-trips (create/edit/delete/publish), image upload, login, and contact email delivery require `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `ADMIN_PASSWORD`/`ADMIN_SESSION_SECRET`, and `RESEND_API_KEY` - secrets not available in this workspace. All request/response contracts and error branches were verified from the code and by the type-checked build.
- Real-browser visual verification across devices: this environment has no browser; all layout math (panel widths vs. headline word widths, circle content heights) was computed from the CSS. A quick human pass over the checklist below is recommended.

## Recommended manual checks (5 minutes)
1. Home → Range section: hover a card in light **and** dark mode; "Range / 01" and the title should be clearly readable.
2. `/foundryhomes` at ~1280px width: "WHERE STRENGTH MEETS DESIGN" stays inside the dark panel.
3. `/grannyflats` and `/custom-builds`: "Download free" renders on one centred line.
4. `/grannyflats` step circles: all four circles animate in sequence; no clipped text.
5. Any `/granny-flat-models/*` page on a phone: burger menu opens; gallery tiles are rectangles; tap a tile → lightbox.
6. Open a published blog post: styled hero, readable article body, framed featured image, working back-link.
7. Admin in dark mode: log out → login page stays dark.

## Note
- A stale `next dev` server (running since yesterday) was holding a lock on `.next` and blocking the production build; it was stopped to complete verification. Restart it with `npm run dev` when you next develop.
