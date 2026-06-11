# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal site for an engineering leader (Director of Software Engineering, going on VP). Audience: CTOs, VPs, and executive recruiters. Must read as a senior, P&L-fluent, technically credible leader with taste, and win on web vitals. Content is in `morganstone_me_copy_final.md`. The agreed visual direction is in `morganstone_me_reference.html` (read it for exact tokens, spacing, and structure).

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

See `morganstone_me_reference.html` for the visual reference. Headshot assets are already in `public/images/` (`headshot_halftone_green.png`, `headshot_duotone_green.png`); serve as optimized AVIF/WebP. Use the green duotone treatment (shadows to deep green-black, highlights to the accent green) - the current reference HTML has an "MS" placeholder; replace with the duotone image.

## Stack rules

- Astro, static output. Zero client-side JS unless explicitly justified.
- Self-host fonts: Fraunces (variable) for display/serif, IBM Plex Mono for labels and data. Subset to used glyphs. `font-display: swap`. Preload the LCP font.
- Charts: hand-rolled inline SVG only. No chart libraries - they kill LCP and add CLS. Static markup, no layout shift.

## Design tokens

| Token | Value |
|---|---|
| Canvas | `#1b1a18` (warm near-black, not pure black) |
| Text primary | `#ece8e1` |
| Text secondary | `#cfccc4` |
| Muted | `#938d84` / `#8f8a82` |
| Accent | `#a1be63` |
| Accent-bright | `#b4ce72` (headline word, links) |
| Chart greens | `#a1be63` / `#c2d790` / `#7f9a48` |

One accent, used with discipline: the green marks quantified wins, the headline phrase, links, and chart fills. Nothing else.

Typography: big Fraunces serif for stats and headlines, IBM Plex Mono for eyebrows and labels. Editorial left-aligned. Generous whitespace. Hairline dividers between sections.

## Layout

Section order: Hero, Selected impact, Technical range, Career, Speaking & teaching, Connect.

The signature is the Selected impact section: each win leads with its number and carries one line of context. This is the page's thesis - data as proof. Do not template it into a generic big-number-plus-gradient hero.

## Hard rules

- Copy uses NO em dashes. Use " - " (space-hyphen-space), commas, colons, or two sentences. Match `morganstone_me_copy_final.md` exactly.
- Accessible: keyboard nav, semantic markup, sufficient contrast, `prefers-reduced-motion`. Charts get text alternatives.
- Perf budget: LCP < 1s, CLS ~0 on a fast connection. Flag any change that risks either before implementing.
- Responsive down to mobile.
- Real `<title>`, meta description, and OpenGraph tags (title, description, image, url). `theme-color` `#1b1a18`.

## Build order

Scaffold, then build section by section against `morganstone_me_reference.html`, reviewing each before moving on: hero, then the impact cards (including the inline-SVG FinOps bar), then technical range, career, speaking, connect.
