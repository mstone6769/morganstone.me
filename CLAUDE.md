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

## Homepage design direction

See `morganstone_me_green_direction.html` for the visual reference. Headshot assets are already in `public/images/` (`headshot_halftone_green.png`, `headshot_duotone_green.png`); serve as optimized AVIF/WebP. The halftone green treatment is the intended image.

## Stack rules

- Astro, static output. Zero client-side JS unless explicitly justified.
- Self-host fonts: Fraunces (variable) for display/serif, IBM Plex Mono for labels and data. Subset to used glyphs. `font-display: swap`. Preload the LCP font.
- Charts: hand-rolled inline SVG only. No chart libraries - they kill LCP and add CLS. Static markup, no layout shift.

## Design tokens

| Token | Value |
|---|---|
| Canvas | `#1b1a18` |
| Text | `#ece8e1` |
| Muted | `#938d84` |
| Accent | `#a1be63` (one accent, used sparingly) |

Typography: big Fraunces serif for stats and headlines, IBM Plex Mono for eyebrows and labels. Editorial left-aligned. Generous whitespace.

## Hard rules

- Copy uses NO em dashes. Use " - ", commas, or two sentences instead.
- Accessible: keyboard nav, semantic markup, sufficient contrast, `prefers-reduced-motion`.
- Perf budget: LCP < 1s, CLS ~0. Flag any change that risks either before implementing.
