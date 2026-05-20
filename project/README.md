# Salim Dellali — Design System

> Software Engineer · Fullstack Web Developer · AI Engineer

A personal design system for Salim Dellali, used across portfolio sites, side
projects, prototypes, and tools built with Claude Code or by hand. The goal: a
single import that gives any new project Salim's voice, type, color, and a
solid component library — all responsive, accessible, and dark-mode ready.

---

## Brand context

This system takes its **structure** from the [GC Digital Talent](https://talent.canada.ca/en/)
platform — a calm, civic, accessibility-first interface built around generous
whitespace, strong typography, and a four-color highlight stripe (yellow, red,
cyan, green). The reference site uses Lato + Noto Sans on a deep purple
primary; we keep the *structural lessons* (token-driven, vertical rhythm,
WCAG-AA contrast, the multi-color stripe motif) but **reframe** the system
around Salim's personal brand:

| | GC Digital Talent | Salim Dellali |
| - | - | - |
| Heading font | Lato | **Inter Tight** (substitute for Alliance No.1) |
| Body font | Noto Sans | **Inter** |
| Primary | Deep purple `#3e2680` | **Black** `#0a0a0a` |
| Radii | Soft (6–10px) | **Sharp (0–4px)** |
| Vibe | Government-trustworthy | Modern dev portfolio, slightly warmer |
| Stripe | ✓ (yellow / red / cyan / green) | ✓ retuned to **yellow / red / cyan / purple** |

### Sources consulted
- **Reference site:** https://talent.canada.ca/en/
- **GC Design System docs:** https://design-system.canada.ca/
- **Source code (open):** https://github.com/GCTC-NTGC/gc-digital-talent
- **Type tokens reference:** https://design-system.canada.ca/en/styles/typography/

---

## CONTENT FUNDAMENTALS

How copy is written across all surfaces.

### Voice
- **Plain, direct, technical.** Short sentences. No hype, no marketing fluff.
- **First person, lowercase-friendly.** "I built", "I work on", "things I'm
  reading". Avoid corporate "we" — this is one person.
- **Engineer-honest.** Say what something does, not what it represents. Prefer
  "Postgres + Laravel" to "modern data infrastructure".

### Casing
- **Sentence case** for headings, buttons, navigation. Not Title Case.
  ✅ "About me" · ❌ "About Me"
- **Code names** stay verbatim — `Postgres`, `Vite`, `tRPC`.
- **CAPS+mono** for eyebrows and small labels (`PROJECTS`, `LATEST`).

### Examples
| Surface | Bad | Good |
| - | - | - |
| Hero | "Crafting digital experiences that delight." | "I build full-stack web apps and AI tools." |
| Project card | "An exciting journey into…" | "A small CLI for renaming screenshots." |
| Button | "Let's connect!" | "Get in touch" |
| 404 | "Oops! Page not found 🤔" | "404. That page doesn't exist." |
| Empty state | "Nothing to see here yet!" | "No projects yet." |

### Tone rules
- **No emoji** in headings, buttons, or navigation. Sparingly OK in long-form
  blog body if it adds meaning. Never decorative.
- **No exclamation marks** except in genuine error/success microcopy.
- **Numbers are real.** "12 projects" beats "lots of projects".
- **Links describe their target.** "Read the case study" beats "click here".

---

## VISUAL FOUNDATIONS

### Colors
- **Primary accent: black** (`#0a0a0a`). Buttons, focus rings, primary text.
  Confident, neutral, lets the work speak.
- **Brand quartet:** yellow `#f6c544`, red `#d8442e`, cyan `#2eb6c4`,
  purple `#7c4dff`. Used **only** in the signature stripe and matched
  semantic surfaces. Never as background fills for general UI.
- **Extended brand** (tags, illustrations, charts only — never in the
  stripe): green `#3fa566`, lime `#b8d62a`, maroon `#7d2336`.
- **Neutrals:** warm-cool balanced grays from `#0a0a0a` (ink) to `#fbfbfc`
  (paper). Backgrounds are `paper` or `slate-50`, not pure white.
- **Selection:** soft yellow (`#ffe9a3`) — the only place the warm yellow
  appears as a background fill in light mode.
- **Dark mode:** inverts cleanly. Background `#0c0c0e`, foreground `#f5f5f7`.
  Brand quartet shifts slightly brighter for contrast.

### Type
- **Heading:** `Inter Tight` (substitute for **Alliance No.1**, which is
  proprietary — see Caveats). Tight tracking (`-0.02em`), weights 700–800.
- **Body:** `Inter`, weight 400/500.
- **Mono:** `JetBrains Mono` — code blocks, eyebrows, labels, kbd.
- **Scale:** 1.25 ratio modular scale, 12px → 76px. See `colors_and_type.css`.
- **Measure:** body paragraphs cap at `65ch` for readable line length.
- **Wrap:** headings use `text-wrap: balance`, body uses `text-wrap: pretty`.

### Spacing
4px base, no half-steps. `--sp-1` (4px) through `--sp-10` (128px). Section
padding is generous — `--sp-8` (64px) min between major sections, `--sp-9`
(96px) on desktop heroes.

### Background
- **Plain.** Solid `--bg` (paper) or `--bg-alt` (slate-50). No gradient walls.
- **No imagery as page background.** Imagery is contained in cards or
  full-bleed image slots, never bleeding behind text.
- **The stripe** (4px, 4-color) is the only ornamental element — used as a
  hero top-border, section divider, footer top, sometimes as a 4px left
  border on featured cards. It is the brand.

### Animation
- **Restrained.** 120/180/280ms durations. `cubic-bezier(0.22, 1, 0.36, 1)`
  for outs, `cubic-bezier(0.4, 0, 0.2, 1)` for general transitions.
- **No bounces, no parallax, no scroll-jacking.** Fades, slides ≤8px,
  underline-thickness changes on hover. That's it.
- **Respect `prefers-reduced-motion`** — disable transitions entirely.

### Hover & press states
- **Links:** thicker underline (1px → 2px), color shifts to brand red.
- **Buttons:** slight darken (use `--accent-hover`/`--accent-press` tokens).
  No size change, no shadow grow.
- **Cards:** border-color shifts from `--border` to `--border-strong`. No
  scale, no lift.
- **Press:** `--accent-press` color, no scale-down.

### Borders
- Default `1px solid var(--border)`. Strong variant `--border-strong` for
  cards on hover or input focus.
- Focus uses `2px solid var(--border-focus)` with `2px` outline-offset —
  consistent across every interactive element.

### Shadows
Five-tier system, all very subtle (max 14% black at largest tier). Cards use
`--shadow-sm` at rest, `--shadow-md` raised. Modals use `--shadow-xl`. Dark
mode shadows are heavier and pure black.

### Transparency & blur
- **Sparingly.** Only sticky headers use `backdrop-filter: blur(12px)` over a
  semi-transparent `--bg`. Modals use a 60% black overlay. Otherwise solid.

### Imagery
- **Color vibe:** neutral, real, slightly muted. No heavy filters, no warm
  Instagram tints. Project screenshots stay as captured.
- **Treatment:** sharp corners (matching radii system), 1px border in
  `--border` for screenshots on the page background.

### Corner radii
**Sharp.** 0–4px across the entire system. `--r-md` (3px) is the default for
cards and buttons. `--r-pill` exists but is reserved for avatar circles and
tag chips only.

### Cards
- 1px `--border`, `var(--bg-raised)` background, `--shadow-sm` at rest.
- `--r-md` corners (3px).
- Hover: border deepens to `--border-strong`. No lift, no scale.
- "Featured" variant gets a 4px **single-color** top accent — set per card
  via inline `--card-accent` (defaults to `--sd-ink`). The full 4-color
  stripe is reserved for global motifs (nav, footer, dividers), so cards
  don't compete with it.

### Layout rules
- Header is sticky on scroll; semi-transparent + blur.
- No fixed/floating elements other than header and (in compound demos) a
  back-to-top link on long pages.
- Container max-widths: `1200px` for landing/marketing, `768px` for
  long-form text.

---

## ICONOGRAPHY

- **System: [Lucide](https://lucide.dev/)** — loaded from CDN. Stroke-based,
  1.5px weight, 24px default size. Matches the system's sharp + modest feel.
- **Usage:** inline `<i data-lucide="…">` paired with `lucide.createIcons()`,
  or React `<LucideIcon />` components. Always set `aria-hidden="true"` on
  decorative icons.
- **Color:** icons inherit `currentColor`. They never get their own brand
  color unless inside a status pill (then they take the semantic color).
- **No emoji** in interface chrome. (See content fundamentals.)
- **No PNG icons.** Vector only.
- **Custom marks:** the wordmark is the only custom asset — set in
  Inter Tight 700, with the 4-color stripe directly underneath. See
  `assets/wordmark.svg` and `preview/brand-wordmark.html`.

---

## Index

```
.
├── README.md                  ← you are here
├── SKILL.md                   ← agent skill manifest (also works in Claude Code)
├── colors_and_type.css        ← all design tokens (CSS variables) + base styles
├── assets/                    ← wordmark, logo, brand SVGs
├── fonts/                     ← (web fonts loaded via Google Fonts CDN; see caveat)
├── preview/                   ← review cards (Type, Colors, Spacing, Components, Brand)
└── ui_kits/
    └── personal-site/         ← the React UI kit
        ├── README.md
        ├── index.html         ← clickable mini-site demo
        ├── components.jsx     ← all primitive + compound components
        └── pages.jsx          ← landing / projects / about / contact pages
```

---

## Caveats

- **Alliance No.1 is proprietary** and we don't ship the font files.
  `Inter Tight` is the closest open-source substitute (tight modern grotesque,
  similar geometry). To use the real Alliance No.1, drop `.woff2` files into
  `fonts/` and update the `@font-face` block at the top of `colors_and_type.css`.
- **Lucide via CDN** — if you need offline use, run
  `npm i lucide` in your project and import locally instead.
- **Fonts loaded from Google Fonts CDN** for simplicity. For production
  performance, self-host: download Inter Tight, Inter, JetBrains Mono and
  drop them into `fonts/` with `@font-face` declarations.
