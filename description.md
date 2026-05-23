# Portfolio

Welcome to the most self-referential project in my portfolio: the portfolio itself. This site is where my projects, GitHub activity, resume, personal context, and small interface experiments all get pulled into one place, wrapped in a mono-font, glassy, grid-heavy visual system.

## The Journey

What started as "I need a portfolio site" turned into a full React interface with custom route handling, animated transitions, theme persistence, accent controls, project detail pages, and enough spacing tweaks to make me question whether pixels should have opinions.

The goal is simple: make the site feel personal without turning it into a generic landing page. The execution, naturally, involved more refactoring than a simple portfolio probably deserves.

## Technical Stack

**Frontend:** React with TypeScript, because the site may be personal but the props still deserve boundaries.

**Build Tooling:** Vite, keeping local development fast and the production build straightforward.

**Styling:** Tailwind CSS 4 with a CSS variable theme system for the background, text, panels, grid, muted colors, and accent color.

**Routing:** Lightweight route handling in `src/App.tsx` instead of a full router library, currently covering the home page, about page, projects page, project detail pages, and placeholders for the rest of the navigation.

**Data:** Static project configuration merged with generated GitHub repository snapshots so project cards can show repo metadata without hardcoding every detail by hand.

## Features That Probably Took Longer Than Expected

**Theme Switching:** Latte, Frappe, Macchiato, and Mocha themes with persisted local preferences.

**Accent Controls:** A set of selectable accent swatches that drive the site highlights and background pulses.

**Grid Toggle:** Because sometimes the terminal-inspired grid is the vibe, and sometimes it needs to calm down.

**Project Cards:** Featured work with tags, contributor labels, GitHub stats, and detail routes.

**GitHub Sync:** A script that fetches repository metadata, contributors, and recent commits into `src/data/github.generated.json`.

**Animated Navigation:** Small route transitions and navbar directory state so the site feels more like an interface than a pile of pages.

**Responsive Layouts:** Home, about, projects, and detail views built to hold together across screen sizes without abandoning the visual language.

## The Reality Check

This is still a portfolio, which means it will probably never be "done." There will always be another section to polish, another project write-up to improve, another animation to tune down by 10%, and another reason to touch the theme variables.

But it does what it needs to do: it gives my work a home, keeps the codebase small enough to reason about, and leaves enough room for the site to evolve without needing to be rebuilt from scratch every time I change my mind.

Built with React, TypeScript, Vite, Tailwind CSS, and a suspicious number of visual alignment decisions.
