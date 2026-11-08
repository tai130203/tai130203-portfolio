# Đoàn Công Tài — Portfolio

An English portfolio for full-stack job applications, built with React, TypeScript, Vite, and custom CSS. The hero uses the original illustration embedded in the owner's `header.svg`.

**Status:** implemented and tested locally. Vercel configuration is included; account connection and publication are pending.

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
- Hero, About, and Contact copy lives in [`src/App.tsx`](./src/App.tsx).
- Styling lives in [`src/styles/main.css`](./src/styles/main.css).
- Project details use native modal dialogs with Escape, focus containment, focus return, and a visible close button.
- WOFF2 fonts and responsive WebP hero images (25/68 KB) are self-hosted. Font licenses are included beside the font files.

SE_104 is labeled as desktop/data-access work; QLDA is labeled as frontend work. Their visuals show public-source excerpts, not application screenshots. Personal contribution, screenshots, email, LinkedIn, and a public CV still need owner-supplied details. Unverified employment, metrics, backend integrations, and live demos are omitted.

## Checks

```sh
npm run typecheck
npm run build
npm test
```

Browser checks cover 375, 768, and 1440 px layouts, horizontal overflow, JavaScript errors, dialogs, Escape, focus restoration, mobile navigation, reduced motion, and link destinations. Tests use Microsoft Edge. On a machine without Edge, install it with `npx playwright install msedge`, or change the browser channel in `playwright.config.ts`. Screenshots go to the ignored `test-results/` directory.

Verified on 8 November 2026: type checking and the production build pass; all five browser tests pass. A local production-preview Lighthouse 12 mobile run returned Performance **97**, Accessibility **100**, Best Practices **100**, and SEO **100**. These are lab results, not production or field measurements. Public profile, repository, and source links returned HTTP 200.

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

A connected account and a successful returned deployment URL are required before hosting is complete. No project ID or production URL is assumed.

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
