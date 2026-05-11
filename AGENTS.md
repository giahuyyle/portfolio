# AGENTS.md

## Project Overview

This is a personal portfolio built with React, TypeScript, Vite, and Tailwind CSS 4.

The app uses lightweight route handling in `src/App.tsx` instead of a router library. The main routes currently are:

- `/` for the home page
- `/about` for the About page
- placeholder pages for other navbar routes

## Commands

Use these commands for verification:

```bash
npm run lint
npm run build
```

Use this command only when the user asks to run the local app:

```bash
npm run dev
```

The user prefers to start and stop the dev server themselves unless they explicitly ask otherwise.

## Code Style

- Use TypeScript and React function components.
- Use 4 spaces for indentation.
- Keep files ASCII unless there is a clear reason not to.
- Keep components small and section-oriented:
    - reusable UI lives in `src/components`
    - page sections live in `src/sections`
    - route pages live in `src/pages`
    - static content/data lives in `src/data`
- Prefer the existing CSS variable theme system:
    - `--hero-bg`
    - `--hero-text`
    - `--hero-muted`
    - `--hero-soft`
    - `--hero-accent`
    - `--hero-panel`
    - `--hero-grid`

## UI Conventions

- Preserve the mono-font, navy/accent, glass, and grid-based visual language.
- The navbar directory marker should reflect the current path, for example `~/about/`.
- Hash links should not drive the navbar directory state.
- Keep the background pulses subtle, small, and tied to the selected accent color.
- Keep the dev server stopped after changes unless the user asks for live testing.

## Assets

Image assets belong in `public/image`.

Current expected images include:

- `public/image/hero.jpeg`
- `public/image/about-me.jpeg`
- `public/image/edmonton-map.png`

## Validation

After code changes, run:

```bash
npm run lint
npm run build
```

If a visual change is complex and the user asks for rendered verification, run the app and test in-browser. Otherwise, avoid starting the dev server.
