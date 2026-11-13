# Đoàn Công Tài — Portfolio

An English portfolio for full-stack job applications, built with React, TypeScript, Vite, and custom CSS. The hero uses the original illustration embedded in the owner's `header.svg`.

**Status:** deployed on Vercel. Production: [tai130203-portfolio.vercel.app](https://tai130203-portfolio.vercel.app/). The implementation was pushed to `main` and the production URL returned HTTP 200 on 8 November 2026.

## Run locally

Use Node 20.19+ or 22.12+ (a supported LTS version is preferred).

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. To check the production version:

```sh
npm run build
npm run preview
```

## Content

- Edit name, links, projects, and skills in [`src/content/portfolio.ts`](./src/content/portfolio.ts).
- Hero copy and its scroll sequence live in [`src/sections/Hero.tsx`](./src/sections/Hero.tsx). About and Contact copy live in [`src/App.tsx`](./src/App.tsx).
- Base styling lives in [`src/styles/main.css`](./src/styles/main.css); typography and interactions live in [`src/styles/experience.css`](./src/styles/experience.css).
- Project details use native modal dialogs with Escape, focus containment, focus return, and a visible close button.
- WOFF2 fonts and responsive WebP hero images (25/68 KB) are self-hosted. Font licenses are included beside the font files.
- Like the reference, headings use Space Mono with real bold/italic fonts; reading text uses IBM Plex Sans. Newsreader is reserved for the personal mark.

The desktop hero stays in view as scrolling moves into the portal, then reveals a short statement word by word. This sequence uses passive scroll events and animation-frame updates rather than a continuously running animation. Narrow or short viewports and reduced-motion preferences show the same content in normal page flow. Navigation links can skip straight to the work or contact.

Project cards have pointer lighting and subtle tilt; the header stays available with reading progress. Click or keyboard-activate the orbit in About for a small visual spark. Touch and reduced-motion users keep the same actions and readable content without the extra motion. No animation dependency is required.

Journey update, 13 November 2026: four additions that the reference does not have. **The path of a request** ([`src/sections/Path.tsx`](./src/sections/Path.tsx)) is a keyboard-operable tab set that follows one request through Interface, Routing, API, Logic, and Data; each stop opens the project that backs it, and the API stop is labeled as a gap rather than implied. **The logbook** ([`src/sections/Notes.tsx`](./src/sections/Notes.tsx)) holds one lesson per project in native `details` elements. **The constellation map** ([`src/components/JourneyRail.tsx`](./src/components/JourneyRail.tsx)) is a second, desktop-only navigation that joins one star per section as the visitor scrolls. **The night sky** ([`src/components/Starfield.tsx`](./src/components/Starfield.tsx)) is a fixed canvas whose stars drift with scrolling and join into a constellation near a mouse pointer; with reduced motion it paints one still frame. About also shows the local time in Ho Chi Minh City. Their content lives in `stations`, `notes`, and `waypoints` in the content file; their styles live in [`src/styles/journey.css`](./src/styles/journey.css).

SE_104 is labeled as desktop/data-access work; QLDA is labeled as frontend work. Their visuals show public-source excerpts, not application screenshots. Personal contribution, screenshots, email, LinkedIn, and a public CV still need owner-supplied details. Unverified employment, metrics, backend integrations, and live demos are omitted.

## Checks

```sh
npm run typecheck
npm run build
npm test
```

Nine browser checks cover 375, 768, and 1440 px layouts, horizontal overflow, JavaScript errors, dialogs, Escape, focus restoration, mobile navigation, scroll-story reversal, changes to motion preferences and viewport size, pointer/touch behavior, the keyboard-activated orbit, and link destinations. Tests use Microsoft Edge. On a machine without Edge, install it with `npx playwright install msedge`, or change the browser channel in `playwright.config.ts`. Screenshots go to the ignored `test-results/` directory. For the pinned hero, inspect individual scroll positions; a full-page screenshot at the beginning does not show the later story state.

Verified on 13 November 2026 after the journey update: type checking and the production build pass; all twelve browser tests pass, including three new ones for the request path, the constellation map, and the logbook. Lighthouse has not been re-run since this update.

Verified on 8 November 2026: type checking and the production build pass; all nine browser tests pass. The interaction update's local production-preview Lighthouse 12 mobile run returned Performance **95**, Accessibility **100**, Best Practices **100**, and SEO **100** (LCP 2.5 s, CLS 0.001). These are lab results, not production or field measurements. Public profile, repository, and source links returned HTTP 200.

## Vercel

[`vercel.json`](./vercel.json) sets the Vite preset, `npm ci`, `npm run build`, output directory `dist`, immutable caching for hashed assets, and basic response headers. No environment variables, database, or API keys are needed. Section anchors need no catch-all route rewrite.

1. Push this implementation to `tai130203/tai130203-portfolio`.
2. In [Vercel New Project](https://vercel.com/new), import that repository with the intended account/team.
3. Use the repository root. The checked-in configuration supplies the build settings.
4. Deploy. Future commits generate deployments through the Vercel Git integration.

Alternatively, from an authenticated Vercel CLI:

```sh
npx vercel link
npx vercel --prod
```

The Vercel project is connected to this repository. Pushes to `main` trigger production deployments.

## Direction

- Midnight navy, warm peach accents, large editorial typography, and original portal-inspired artwork.
- A short path from introduction to real projects, technical evidence, and contact.
- Responsive, accessible interactions with restrained motion.

## Documents

- [Reference analysis and implementation plan](./PLAN.md)

## Public links

- [GitHub](https://github.com/tai130203)
- [Library Management — SE_104](https://github.com/tai130203/SE_104)
- [Management Dashboard — QLDA](https://github.com/tai130203/QLDA)
- [Visual reference](https://1longg-dev.vercel.app/)

The original plan and its historical planning-stage restrictions are retained in PLAN.md. Source previews replace application screenshots until the owner supplies suitable images.
