# Foundry Homes - Site UI/UX QA Audit

Audit date: 2026-07-10
Scope: all public routes, all reusable components, both themes (dark/light), all responsive breakpoints, admin panel, and API actions (audited from code).

---

## UI / UX Issues

### Issue 1
1. Page/Route: `/foundryhomes` (and all pages sharing the split-hero pattern: `/grannyflats`, `/granny-flats-cabins`, `/custom-builds`, `/contact`, `/steel-framing`, `/foundry`)
2. Component/File: `app/foundryhomes/page.tsx`, `app/globals.css` (`.fh-hero h1`, `.gf-hero h1`, `.granny-hero h1`, `.cb-hero h1`, `.contact-hero h1`, `.steel-hero h1`, `.foundry-hero h1`)
3. Exact Section: Page hero - large display headline in the left copy panel
4. Issue Description: The headline font sizes (up to `6.8–7.2vw`) are sized for a full-width hero, but the copy panel is only ~39% of the viewport. Long unbreakable words ("STRENGTH", "OPPORTUNITY") become wider than the panel and, because the copy panel has no overflow containment, the text spills across the panel edge onto the hero image. Worst between ~1000px and ~1700px viewport widths.
5. Screenshot-related issue reference: Yes - "WHERE STRENGTH MEETS DESIGN" overflowing onto the image (screenshot issue #2).
6. Status: Fixed

### Issue 2
1. Page/Route: `/` (homepage), Range section - plus the same overlay-text pattern anywhere text sits on an image gradient
2. Component/File: `components/Range.tsx`, `app/globals.css` (`.range-card__idx`, `.range-card h3`, `.range-card__meta`)
3. Exact Section: Range cards ("Range / 01", "Range / 02", "Range / 03" labels, card titles and meta text)
4. Issue Description: Card text sits on a permanently dark image gradient, but the title and meta colours were mapped to theme tokens. In light mode `h3` becomes near-black (`#0E1114`) and meta becomes dark grey (`#5A5654`) over the dark gradient - effectively invisible. The small "Range / 01" label uses base teal `#008080`, which is low-contrast (≈3.5:1) on the dark overlay at 10px.
5. Screenshot-related issue reference: Yes - unreadable "Range / 01" / "Range / 02" labels (screenshot issue #1).
6. Status: Fixed

### Issue 3
1. Page/Route: Site-wide (dark mode)
2. Component/File: `app/globals.css` (`.eyebrow`, `.range-card__idx`, `.step__num`, `.hero-strip__num`, and other small teal mono labels)
3. Exact Section: All small teal "eyebrow"/index labels on dark backgrounds
4. Issue Description: Base teal `#008080` on the dark background `#0E1114` gives roughly 3.5:1 contrast - below the 4.5:1 needed for 10–11px text. Every eyebrow label site-wide is affected in dark mode. (In light mode teal on `#F7F7F5` passes.)
5. Screenshot-related issue reference: Related to screenshot issue #1 (same class of contrast problem).
6. Status: Fixed

### Issue 4
1. Page/Route: `/grannyflats`, `/custom-builds` (and every page using `.btn` inside a flex row)
2. Component/File: `app/globals.css` (`.btn`), `app/grannyflats/page.tsx`, `app/custom-builds/page.tsx`
3. Exact Section: "Download free" brochure buttons; all `.btn` pill CTAs
4. Issue Description: `.btn` has no `white-space`, `flex-shrink`, or centring rules. Inside `display:flex; justify-content:space-between` brochure rows the button gets squeezed and "DOWNLOAD FREE" wraps awkwardly onto two left-aligned lines. Any long button label in a constrained flex container has the same failure.
5. Screenshot-related issue reference: Yes - "DOWNLOAD FREE" broken across two lines (screenshot issue #3).
6. Status: Fixed

### Issue 5
1. Page/Route: All 12 `/granny-flat-models/[slug]` pages
2. Component/File: `app/globals.css` - the "Rounded button treatment" rule `:where(button, .btn, …){border-radius:999px!important}`; `app/granny-flat-models/[slug]/ModelGallery.tsx`
3. Exact Section: Model gallery grid ("Indicative imagery")
4. Issue Description: The blanket pill-radius rule includes bare `button`. The gallery tiles are `<button>` elements, so every 4:3 gallery image is force-clipped into an oval/pill shape with badly cropped corners. The same blanket rule also distorts the blog search button, newsletter button, admin editor tabs, and blog filter tabs.
5. Screenshot-related issue reference: Yes - oval/circular image masks with bad cropping (screenshot issue #5).
6. Status: Fixed

### Issue 6
1. Page/Route: `/blog/[slug]` (every published article)
2. Component/File: `app/blog/[slug]/page.tsx`, `app/globals.css`
3. Exact Section: Entire article page (`.blog-post-page`, `.blog-post-hero`, `.blog-post-back`, `.blog-post-hero__meta`, `.blog-post-image`, `.blog-post-body`)
4. Issue Description: None of the `blog-post-*` classes exist in the stylesheet. The article page renders completely unstyled: no top padding (content starts underneath the fixed navbar), no typography for the article body, and the featured image uses Next `<Image fill>` inside an unpositioned, zero-height container so it renders broken/overlapping.
5. Screenshot-related issue reference: Related to screenshot issue #6 (image not fitting its box / broken empty space).
6. Status: Fixed

### Issue 7
1. Page/Route: `/blog`
2. Component/File: `app/blog/BlogPageClient.tsx`, `app/globals.css`
3. Exact Section: Hero lead article card (`.blog-lead*`), hero meta line (`.blog-hero__meta`), section head (`.blog-section-head`), empty state (`.blog-empty`)
4. Issue Description: These classes are used in the markup but have no CSS. The featured "lead" card is unstyled and its `<Image fill>` has no positioned parent, so the image escapes its container. The empty state and "articles / updated monthly" meta line render as bare text.
5. Screenshot-related issue reference: Related to screenshot issues #5/#6.
6. Status: Fixed

### Issue 8
1. Page/Route: All 12 `/granny-flat-models/[slug]` pages and `/blog/[slug]`
2. Component/File: `app/granny-flat-models/[slug]/page.tsx`, `app/blog/[slug]/page.tsx`, `hooks/useFoundryAnimations.ts`
3. Exact Section: Navbar + mobile burger menu + scroll behaviours
4. Issue Description: These pages are server components and never mount `useFoundryAnimations`, which owns the navbar `is-scrolled` toggle and the burger-menu click handler. Result: on all model pages and article pages the mobile menu button does nothing (mobile navigation completely broken), and the navbar never gains its scrolled glass background, so nav links float transparently over page content.
5. Screenshot-related issue reference: No (found during audit).
6. Status: Fixed

### Issue 9
1. Page/Route: `/grannyflats`, `/granny-flats-cabins`, `/foundryhomes`, `/custom-builds` vs `/foundry`, `/steel-framing`
2. Component/File: `app/globals.css` (reveal-stagger block that lists `.steel-benefits__grid.rv > *`, `.foundry-promise-grid.rv > *`, `.granny-feature-grid.rv > *` but not the step grids)
3. Exact Section: Circular "Your build, step by step" sections (`.granny-step-grid`, `.gf-step-grid`, `.fh-step-grid`, `.cb-step-grid`)
4. Issue Description: The teal benefit circles on `/foundry`, `/steel-framing` and `/grannyflats` get a staggered fade/rise reveal, but the visually identical step circles on the four range pages animate as one flat block (only the parent has `.rv`). Identical-looking sections behave differently - the animation inconsistency called out in the brief.
5. Screenshot-related issue reference: Yes - inconsistent circle animation (screenshot issue #4).
6. Status: Fixed

### Issue 10
1. Page/Route: `/grannyflats` (worst case), plus all four step-circle pages
2. Component/File: `app/globals.css` (`.granny-step`/`.gf-step`/`.fh-step`/`.cb-step` circle typography), `app/grannyflats/page.tsx` (step copy)
3. Exact Section: "Your build, step by step" teal circles
4. Issue Description: At 4-column desktop widths each circle is ~300px. The `/grannyflats` step descriptions are much longer than the versions used on the other three pages (~155 chars vs ~90), so the text block grows taller than the circle and is clipped by the round mask; lines near the top/bottom also run into the curved edge because the text max-width is wider than the circle chord at that height.
5. Screenshot-related issue reference: Yes - circle text cropped / touching the edge (screenshot issue #4).
6. Status: Fixed

### Issue 11
1. Page/Route: `/granny-flat-models/[slug]`
2. Component/File: `app/granny-flat-models/[slug]/page.tsx`
3. Exact Section: "A fully managed build" circular section (`.granny-feature-grid`)
4. Issue Description: The same circular grid that animates on `/grannyflats` is rendered here without any `rv` reveal classes, so the section shows no entrance animation at all - inconsistent with the identical section elsewhere.
5. Screenshot-related issue reference: Yes - animation inconsistency (screenshot issue #4).
6. Status: Fixed

### Issue 12
1. Page/Route: `/` (homepage), light mode
2. Component/File: `components/Contact.tsx`, `app/globals.css` (`.contact__left`)
3. Exact Section: "Let's talk" panel over the dark photo on the left of the quote form
4. Issue Description: The panel background is a permanently dark photograph with a dark gradient, but the `h2` inherits the theme text colour. In light mode the heading renders near-black on the dark photo - unreadable.
5. Screenshot-related issue reference: Related to screenshot issue #7 (dark/light inconsistency).
6. Status: Fixed

### Issue 13
1. Page/Route: `/` (homepage), light mode
2. Component/File: `components/Regions.tsx`, `app/globals.css` (`.regions`, `.regions__panel`, `.regions__list span`)
3. Exact Section: "Local builders who know your area" dark band
4. Issue Description: The regions band deliberately stays dark in light mode, but its `h2` and the region chips inherit light-theme text colours (near-black / dark grey) over the dark glass panel - unreadable heading and chips in light mode.
5. Screenshot-related issue reference: Related to screenshot issue #7.
6. Status: Fixed

### Issue 14
1. Page/Route: `/steel-framing`, light mode
2. Component/File: `app/globals.css` (`.steel-proof-card`)
3. Exact Section: "Stronger structure" / "Cleaner assembly" photo cards
4. Issue Description: Card text colour is `var(--paper)`, which flips to near-black in light mode, while the card keeps its dark photo + dark overlay. Headline and body text become unreadable in light mode.
5. Screenshot-related issue reference: Related to screenshot issue #7.
6. Status: Fixed

### Issue 15
1. Page/Route: `/contact` (and homepage form)
2. Component/File: `app/globals.css` (`.contact-page-form input::placeholder`, shared placeholder rule)
3. Exact Section: Contact form fields
4. Issue Description: Placeholders are rendered in brand teal (mixed with muted), which reads as pre-filled brand-coloured values rather than placeholders, and is low contrast against the input background in dark mode.
5. Screenshot-related issue reference: Related to screenshot issue #7.
6. Status: Fixed

### Issue 16
1. Page/Route: `/granny-flat-models/[slug]`, dark mode
2. Component/File: `app/globals.css` (`.model-floorplan__image`)
3. Exact Section: "Concept layout" floor plan container
4. Issue Description: The floor-plan container background was remapped to `var(--theme-surface)` (dark in dark mode). Architectural plan drawings are dark-line artwork; on a dark surface a transparent or off-white plan becomes hard to read. Plan drawings need a white plate in both themes.
5. Screenshot-related issue reference: Related to screenshot issue #6.
6. Status: Fixed

### Issue 17
1. Page/Route: `/foundryhomes`
2. Component/File: `app/globals.css` (`.fh-model-grid` responsive rules)
3. Exact Section: "Choose your model" cards
4. Issue Description: The model grid stays at 3 columns from 1100px all the way down to 760px, so between ~760–1100px each card is ~230–300px wide and the price/CTA row becomes cramped. The equivalent grid on `/granny-flats-cabins` correctly drops to 2 columns at 1100px.
5. Screenshot-related issue reference: Related to screenshot issue #8 (responsive).
6. Status: Fixed

### Issue 18
1. Page/Route: `/suppliers`
2. Component/File: `app/globals.css` (`.supplier-logo-card`)
3. Exact Section: Supplier logo grid
4. Issue Description: Cards only have a right border. When the grid wraps to 4 / 2 columns on tablet/mobile there is no divider between rows, so the white cells merge into a single undivided block.
5. Screenshot-related issue reference: Related to screenshot issue #8.
6. Status: Fixed

### Issue 19
1. Page/Route: `/custom-builds`
2. Component/File: `app/custom-builds/page.tsx`
3. Exact Section: Brochure band at the bottom of the page
4. Issue Description: The eyebrow label and the H2 contain the identical sentence "Download the Foundry custom build brochure", printed twice stacked on top of each other. Looks like a copy/paste defect.
5. Screenshot-related issue reference: No.
6. Status: Fixed

### Issue 20
1. Page/Route: `/grannyflats`
2. Component/File: `app/grannyflats/page.tsx`
3. Exact Section: Teal CTA band (`.granny-page-cta`)
4. Issue Description: Unlike every other page CTA (which uses a large display H2 + small mono line), this CTA renders its full sentence in the tiny 11px mono paragraph style with no heading at all - visually broken/inconsistent with the rest of the site.
5. Screenshot-related issue reference: No.
6. Status: Fixed

### Issue 21
1. Page/Route: `/admin/login`
2. Component/File: `app/admin/login/page.tsx`
3. Exact Section: Login card
4. Issue Description: The login page hard-codes `data-admin-theme="light"`, ignoring the stored admin theme and the OS preference. An admin using dark mode gets a flash-bang white login screen; theme is inconsistent with the dashboard they land on.
5. Screenshot-related issue reference: Related to screenshot issue #7 (theme consistency).
6. Status: Fixed

### Issue 22
1. Page/Route: Admin `/admin` (post editor, list)
2. Component/File: `app/globals.css` - same blanket `:where(button…) {border-radius:999px!important}` rule as Issue 5
3. Exact Section: Editor "Write / Preview" tabs, blog filter tabs, blog search & newsletter submit buttons
4. Issue Description: Bare `button` in the pill rule forces pill radii onto flat tab buttons (which use a bottom-border active indicator) and onto square, flush-fitting search/newsletter submit buttons - mismatched corners against their containers.
5. Screenshot-related issue reference: Related to screenshot issue #3 (button consistency).
6. Status: Fixed

### Issue 23
1. Page/Route: `/foundryhomes`
2. Component/File: `app/foundryhomes/page.tsx`
3. Exact Section: "Choose your model" section intro copy
4. Issue Description: Copy says "Six architecturally designed plans…" but only three models are listed. Business-copy accuracy issue - flagged only, copy not changed (needs owner confirmation of the intended model count).
5. Screenshot-related issue reference: No.
6. Status: Pending (needs content-owner decision)

### Issue 24
1. Page/Route: `/contact`
2. Component/File: `app/contact/page.tsx`
3. Exact Section: Contact details list - phone link
4. Issue Description: The phone anchor uses placeholder `tel:+6400000000` behind the label "0800 FOUNDRY". Tapping it dials a dummy number. Flagged only - real number needed from the business.
5. Screenshot-related issue reference: No.
6. Status: Pending (needs real phone number)

### Issue 25
1. Page/Route: `/suppliers`
2. Component/File: `app/suppliers/page.tsx`
3. Exact Section: Hero copy vs the statement band directly below
4. Issue Description: The hero paragraph and the statement section repeat the same sentence ("At Foundry Homes we have made a clear commitment to work alongside trusted NZ suppliers…") back-to-back. Reads as duplicated copy. Flagged only - copy decision for the owner.
5. Screenshot-related issue reference: No.
6. Status: Pending (needs content-owner decision)

### Issue 26
1. Page/Route: Site-wide
2. Component/File: `app/globals.css`
3. Exact Section: Legacy stylesheet layers
4. Issue Description: `globals.css` contains at least three full generations of styling for the same components (e.g. steel accordion styled four times, step circles three times), held together with `!important`. Current rendering is correct but the file is fragile and any new rule can be silently overridden. Structural debt - documented, not restyled in this pass.
5. Screenshot-related issue reference: No.
6. Status: Pending (refactor recommended, not a visual defect)

---

## Admin Panel QA

Environment note: the admin panel requires `DATABASE_URL` (PostgreSQL via Prisma), `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `BLOB_READ_WRITE_TOKEN` (Vercel Blob) and - for contact email - `RESEND_API_KEY` / `CONTACT_EMAIL_TO`. None of these secrets are available in this workspace, so all features were verified by code inspection and build-time type checking, not by live requests. Anything requiring a live DB/blob/email round-trip is marked "Not Testable (live)".

### Feature: Admin login
1. Feature name: Admin login
2. Route: `/admin/login` → `POST /api/admin/login`
3. Files involved: `app/admin/login/page.tsx`, `app/api/admin/login/route.ts`, `lib/adminSession.ts`, `middleware.ts`
4. API endpoint used: `POST /api/admin/login`
5. Expected behaviour: Password checked (timing-safe) against `ADMIN_PASSWORD`; signed HMAC session cookie set (7-day TTL, httpOnly, secure in prod); rate-limited to 5 attempts / 15 min / IP by middleware.
6. Current behaviour: Matches expected. Error states (bad JSON, wrong password, missing env) each return correct status + message shown in the UI.
7. Working status: Working (logic verified); Not Testable (live)
8. Issue found: Login page hard-coded light theme (Issue 21 - fixed).
9. Status: Fixed

### Feature: Admin logout
1. Feature name: Admin logout
2. Route: sidebar sign-out → `POST /api/admin/logout`
3. Files involved: `app/admin/page.tsx`, `app/api/admin/logout/route.ts`
4. API endpoint used: `POST /api/admin/logout`
5. Expected behaviour: Session cookie cleared, redirect to `/admin/login`.
6. Current behaviour: Cookie cleared with `maxAge:0`, client redirects + refreshes. Correct.
7. Working status: Working
8. Issue found: None.
9. Status: -

### Feature: Session protection
1. Feature name: Auth middleware
2. Route: `/admin/*`, mutating `/api/posts*`, `POST /api/upload`
3. Files involved: `middleware.ts`, `lib/adminSession.ts`, `lib/rateLimit.ts`
4. API endpoint used: n/a (edge middleware)
5. Expected behaviour: Unauthenticated admin-page hits redirect to login; unauthenticated mutating API calls get 401; mutation rate limit 120/5min/IP.
6. Current behaviour: Matches expected. `GET /api/posts` is intentionally public (used by the blog "load more"). Note: unfiltered `GET /api/posts` (no `status` param) exposes DRAFT posts publicly - the admin list relies on this being unauthenticated-readable.
7. Working status: Partially Working
8. Issue found: Draft posts (title, full content) are readable by anyone via `GET /api/posts` without a status filter, and via `GET /api/posts/[slug]`. Not a UI bug; security/privacy consideration documented for the owner. Not changed in this pass because the admin list view consumes the same unauthenticated endpoint and gating it needs a product decision.
9. Status: Pending (documented risk)

### Feature: List posts / dashboard stats
1. Feature name: Post list, search, filters, stats
2. Route: `/admin`
3. Files involved: `app/admin/page.tsx`, `app/admin/PostsListView.tsx`, `app/admin/useAdminPosts.ts`
4. API endpoint used: `GET /api/posts?pageSize=100`
5. Expected behaviour: Table of posts with search (title/tag), status filter tabs, stat cards, loading / error / empty states.
6. Current behaviour: All states implemented (loading, error with retry, empty with CTA, "no results for query"). Search + filters are client-side. Correct.
7. Working status: Working (logic verified); Not Testable (live)
8. Issue found: Admin list is capped at 100 posts (`pageSize=100` with no paging) - fine at current scale, will silently truncate beyond 100 posts. Documented.
9. Status: Pending (future-proofing note only)

### Feature: Create post
1. Feature name: Blog create
2. Route: `/admin` (New Post) → `POST /api/posts`
3. Files involved: `app/admin/PostEditorView.tsx`, `app/api/posts/route.ts`, `lib/validation.ts`, `lib/posts.ts`, `lib/sanitizePostContent.ts`
4. API endpoint used: `POST /api/posts`
5. Expected behaviour: Client-side validation (title/slug/excerpt/content/featured image) with shake + focus on first invalid field; zod validation server-side; slug auto-generated and uniquified; HTML sanitised; 201 with DTO.
6. Current behaviour: Matches expected, including slug-collision retry on the unique constraint.
7. Working status: Working (logic verified); Not Testable (live)
8. Issue found: None.
9. Status: -

### Feature: Edit post
1. Feature name: Blog edit / save
2. Route: `/admin` (edit) → `PUT /api/posts/[slug]`
3. Files involved: `app/admin/PostEditorView.tsx`, `app/api/posts/[slug]/route.ts`
4. API endpoint used: `PUT /api/posts/[slug]`
5. Expected behaviour: Optimistic-concurrency check on `updatedAt` (409 if changed elsewhere); slug re-uniquified on rename; old managed featured-image blob deleted when replaced.
6. Current behaviour: Matches expected; 409 message surfaced as toast and list refreshed.
7. Working status: Working (logic verified); Not Testable (live)
8. Issue found: None.
9. Status: -

### Feature: Delete post
1. Feature name: Blog delete
2. Route: `/admin` (trash icon) → `DELETE /api/posts/[slug]`
3. Files involved: `app/admin/PostsListView.tsx`, `app/api/posts/[slug]/route.ts`, `lib/blobStorage.ts`
4. API endpoint used: `DELETE /api/posts/[slug]`
5. Expected behaviour: Confirmation modal (focus-trapped, Esc closes, focus restored), post removed, managed blob image cleaned up.
6. Current behaviour: Matches expected; modal accessibility is properly implemented.
7. Working status: Working (logic verified); Not Testable (live)
8. Issue found: None.
9. Status: -

### Feature: Draft / publish toggle
1. Feature name: Save draft & publish
2. Route: `/admin` (status pill in table, Publish button in editor)
3. Files involved: `app/admin/page.tsx` (`toggleStatus`), `app/admin/PostEditorView.tsx`
4. API endpoint used: `PUT /api/posts/[slug]`
5. Expected behaviour: Toggling to PUBLISHED sets `publishedAt` if empty; public blog only shows PUBLISHED posts with `publishedAt <= now` (scheduling supported).
6. Current behaviour: Matches expected on both client and server.
7. Working status: Working (logic verified); Not Testable (live)
8. Issue found: None.
9. Status: -

### Feature: Image upload
1. Feature name: Featured image upload
2. Route: editor sidebar → `POST /api/upload`
3. Files involved: `app/admin/ImageUpload.tsx`, `app/api/upload/route.ts`
4. API endpoint used: `POST /api/upload`
5. Expected behaviour: JPEG/PNG/WEBP/GIF ≤5MB; server verifies real image signature with sharp, re-encodes to strip payloads, stores in Vercel Blob, returns URL.
6. Current behaviour: Matches expected; upload button shows uploading state; errors surfaced inline.
7. Working status: Working (logic verified); Not Testable (live - needs `BLOB_READ_WRITE_TOKEN`)
8. Issue found: None.
9. Status: -

### Feature: Admin dark/light theme
1. Feature name: Admin theme toggle
2. Route: `/admin` topbar
3. Files involved: `app/admin/page.tsx`, `app/globals.css` (`.admin[data-admin-theme="dark"]` token set)
4. API endpoint used: n/a
5. Expected behaviour: Toggle persists to localStorage, defaults to OS preference, all admin surfaces/tokens themed.
6. Current behaviour: Dashboard correct; login page ignored the preference (fixed - Issue 21). Dark token set covers surfaces, borders, states, date-input color-scheme.
7. Working status: Working
8. Issue found: Login page theme (fixed).
9. Status: Fixed

### Feature: Admin responsive layout
1. Feature name: Responsive admin
2. Route: `/admin`
3. Files involved: `app/globals.css` (admin media queries)
4. API endpoint used: n/a
5. Expected behaviour: Sidebar collapses to off-canvas at ≤1100px with burger + overlay; editor stacks to one column; table scrolls horizontally; filters stack at ≤720px.
6. Current behaviour: All implemented correctly (`.admin-sidebar` fixed/translated, `.admin-table-wrap{overflow-x:auto}` with `min-width:700px` table).
7. Working status: Working
8. Issue found: Editor tab corners distorted by global pill rule (Issue 22 - fixed).
9. Status: Fixed

### Feature: Contact form email (public, admin-adjacent API)
1. Feature name: Contact enquiry submission
2. Route: `/contact` + homepage form → `POST /api/contact`
3. Files involved: `hooks/useContactSubmission.ts`, `app/api/contact/route.ts`, `lib/validation.ts`
4. API endpoint used: `POST /api/contact`
5. Expected behaviour: Zod validation, honeypot silently accepted, 5 requests / 10 min / IP rate limit, Resend email with branded template, field errors mapped back to inputs, success state swaps the form.
6. Current behaviour: Matches expected; distinct error codes for config-missing vs send-failed with human messages.
7. Working status: Working (logic verified); Not Testable (live - needs `RESEND_API_KEY`)
8. Issue found: In-memory rate-limit store resets per serverless instance - acceptable, documented.
9. Status: -

### Not testable and why
- Live create/edit/delete/publish round-trips: no `DATABASE_URL` in this environment (Prisma/PostgreSQL).
- Live image upload: no `BLOB_READ_WRITE_TOKEN`.
- Live contact email: no `RESEND_API_KEY` / `CONTACT_EMAIL_TO`.
- Live login: no `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET`.
All request/response contracts, validation paths, error branches, and UI states were verified from the code and compile under `next build`.
