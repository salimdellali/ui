---
name: salim-dellali-design-system
description: Personal design system for Salim Dellali (Software Engineer · Fullstack · AI). Plain-direct voice, sharp radii, black primary with a yellow/red/cyan/purple stripe motif. Inter Tight headings (Alliance No.1 substitute), Inter body, JetBrains Mono code. Light + dark with toggle.
---

# Salim Dellali Design System — Skill

Use this skill any time you build something in Salim's voice or visual
language: a portfolio page, a side project, a prototype, README art, slides.

## When to use
- Personal sites, portfolio surfaces, project landing pages
- Tools and prototypes Salim is building (CLIs with web UIs, dashboards)
- Any deck or doc that should feel like *Salim*, not corporate

## When NOT to use
- Client work (use the client's design system)
- Anything that needs Alliance No.1's actual licensed files (we substitute Inter Tight)

## How to use

1. **Read `README.md`** for full content + visual fundamentals before writing
   any UI. The voice rules and "no emoji / sentence case / engineer-honest"
   guidance shape every label, button, and heading.
2. **Import `colors_and_type.css`** — every token (color, type, spacing,
   radii, shadows, motion) lives here. It also defines `[data-theme="dark"]`
   overrides for free dark-mode support.
3. **For React UIs**: copy `ui_kits/personal-site/components.jsx` and
   `components.css` and load them with the React/Babel script tags shown in
   `ui_kits/personal-site/index.html`. The kit exports:
   - Layout: `Container`, `Section`, `Stack`, `Row`
   - Brand: `Stripe`, `Eyebrow`, `Wordmark`, `ThemeProvider`, `ThemeToggle`
   - Forms: `Button`, `Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`
   - Display: `Tag`, `BadgeDot`, `Kbd`, `Banner`, `Card`, `FeaturedCard`,
     `CodeBlock`, `Code`, `Table`
   - Compound: `Nav`, `Hero`, `Footer`, `Modal`, `Tabs`, `Accordion`
4. **Pages** in `pages.jsx` are reference implementations — landing,
   projects grid, about/résumé, contact. Copy and adapt.

## Brand non-negotiables
- **Primary is BLACK**, not the brand quartet. Buttons, focus rings, links
  are black/ink. The quartet (yellow / red / cyan / purple) is reserved
  for the **signature stripe** motif (nav top, footer top, hero borders,
  dividers) and matched semantic surfaces.
- **Sharp radii** — 0–4px across the system. Default `--r-md` is 3px.
- **Sentence case** for everything except CAPS+mono eyebrows.
- **No emoji** in chrome. **No exclamation marks** except real errors.
- **No gradient walls, no parallax, no scroll-jacking.** Restrained motion.
- **Featured cards** get a *single* solid top accent (customizable per card
  via `--card-accent`), not the multi-color stripe. The stripe stays for
  global motifs only.

## Quick start (HTML)
```html
<link rel="stylesheet" href="colors_and_type.css">
<button class="sd-btn sd-btn-primary">Get in touch</button>
```

## Quick start (React)
```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="ui_kits/personal-site/components.css">
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin></script>
<script type="text/babel" src="ui_kits/personal-site/components.jsx"></script>
```

Then in your own babel script:
```jsx
<ThemeProvider>
  <Nav brand="Salim Dellali" links={[{id:'home',label:'Home'}]} />
  <Hero eyebrow="FULLSTACK · AI" title="I build full-stack web apps." />
</ThemeProvider>
```

## Reference files
- `preview/` — review cards for every primitive (open in browser)
- `ui_kits/personal-site/index.html` — full clickable demo
- `assets/wordmark.svg`, `assets/wordmark-dark.svg` — only logo assets
