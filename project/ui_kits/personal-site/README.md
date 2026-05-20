# Personal Site — UI Kit

A React/JSX recreation of Salim Dellali's personal site, used as the
reference UI kit for the design system. Open `index.html` for the
clickable mini-site demo (landing → projects → about → contact).

## Files
- `index.html` — entry; loads React, Babel, and the kit
- `components.jsx` — primitive + compound components (Button, Input, Nav,
  Hero, Card, Banner, Footer, Modal, Tabs, Accordion, Table, CodeBlock, etc.)
- `pages.jsx` — the four demo pages composed from those components

## How to use in your own projects
1. Copy `colors_and_type.css` from the design system root into your project.
2. Copy `components.jsx` and `pages.jsx` from this folder.
3. Import `colors_and_type.css` in your entry HTML/JSX.
4. Use components as React elements: `<Button variant="primary">…</Button>`.

The components rely **only on CSS variables** from `colors_and_type.css` — no
runtime CSS-in-JS, no styled-components, no Tailwind. Drop them anywhere.

## Component coverage
**Primitives:** `Button`, `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`,
`Tag`, `Badge`, `Kbd`, `Stripe`, `Eyebrow`, `Code`, `CodeBlock`.

**Compound:** `Nav`, `Hero`, `Card`, `FeaturedCard`, `Banner` (success/warning/
danger/info), `Footer`, `Modal`, `Tabs`, `Accordion`, `Table`, `ThemeToggle`.

**Layout:** `Container`, `Section`, `Stack`, `Row`.
