# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install   # install dependencies
pnpm dev       # dev server with live reload
pnpm build     # production build → dist/
pnpm preview   # serve the production build locally
```

## Architecture

Static site built with [Astro](https://astro.build). Source is in `src/`, output goes to `dist/`, static assets served as-is live in `public/`.

**Pages** (`src/pages/*.astro`) map directly to routes:
- `index.astro` — personal/professional homepage
- `bbq-links.astro` — BBQ link-in-bio page

**Layouts** (`src/layouts/*.astro`):
- `Default.astro` — used by the homepage; imports `main.css`, inlines the JSON-LD person schema, and inlines the GA tracking script
- `BbqLinks.astro` — used by the BBQ page; accepts `title` and `description` props, imports `bbq-links.css`

**Styles** (`src/styles/*.css`) are imported in their respective layout components. Vite handles bundling and minification in production.

**GA tracking** is inlined via `<script is:inline>` in both layouts (not processed by Vite) so the `captureOutboundLink`, `captureSocialOutboundLink`, `captureMailTo`, and `captureAffiliateLink` globals are available in `onclick` attributes on the page.

**Deployment**: Netlify. `netlify.toml` publishes `dist/` and runs `pnpm build`.
