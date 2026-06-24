# Salim Dellali — Visual Design System Plan

## Goals

1. **npm package** — `@salimdellali/ui` published publicly on npm. Any React project can install and use components out of the box, with full TypeScript prop autocompletion.
2. **Storybook site** — hosted on Vercel. Publicly browsable component library. Includes interaction tests and accessibility checks per component.
3. **Single install, zero config** — `npm install @salimdellali/ui` is the only step. CSS tokens load automatically. No separate CSS import required by the consumer.
4. **Component-by-component migration** — each component is migrated from JSX → TSX one at a time, verified in Storybook before moving to the next.

---

## What Already Exists (to migrate, not rebuild)

| File                                           | What it contains                                                                   |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| `project/colors_and_type.css`                  | Full token system: colors, type scale, spacing, radii, shadows, motion, dark theme |
| `project/ui_kits/personal-site/components.jsx` | All components in plain JSX (to be converted to TSX)                               |
| `project/ui_kits/personal-site/components.css` | Component styles                                                                   |
| `project/preview/*.html`                       | Static HTML previews (replaced by Storybook)                                       |

> `project/assets/` (SVGs: wordmark, wordmark-dark, avatar-mark) — **out of scope**. Personal brand assets with no reuse value for consumers. Will be revisited when revamping the personal site.

### Component hierarchy (Storybook sidebar + build order)

```
Components/
  Atoms/                       ← single-element, no composition
    Typography/                ← semantic HTML tags, token-wired, zero props needed for basic use
      H1, H2, H3, H4
      P, Lead, Blockquote
      InlineCode
    Interactive/               ← non-form interactive elements
      Button
      Tag, BadgeDot, Kbd
    Form/                      ← form controls
      Input, Select, Textarea
      Checkbox, Radio
  Molecules/                   ← composed from atoms
    Field                      ← label + form atom + help text / error
    Banner                     ← icon + text + optional dismiss
  Organisms/                   ← complex, self-contained
    Card, FeaturedCard
    Modal, Tabs, Accordion, Table
    CodeBlock
  Wrappers/                    ← layout; atoms/molecules/organisms fill 100% width inside these
    Stack, Row, Container, Section, EditorialGrid
  Theme/                       ← brand + theme plumbing
    Stripe, Eyebrow
    ThemeProvider, ThemeToggle
  Page/                        ← compose everything above
    Header, Nav, Hero, Footer
```

> Components are fully closed — no `className` prop exposed. Every component spreads `...rest` onto its root element to support `onClick`, `aria-*`, `data-testid`, and other HTML attributes without needing to prop-type each one explicitly.

---

## Tech Stack

| Tool                      | Role                          | Why                                                              |
| ------------------------- | ----------------------------- | ---------------------------------------------------------------- |
| **TypeScript 6**          | Language                      | Typed props = in-editor docs for consumers                       |
| **React 19**              | UI framework                  | Peer dependency — `>=18.0.0` range, currently resolves to 19     |
| **Pure CSS**              | Styling                       | Zero runtime, no peer deps, no bundle bloat                      |
| **CSS custom properties** | Design tokens                 | Semantic naming, theme-aware, works with any styling approach    |
| **Vite 8 (lib mode)**     | Package build                 | Outputs ESM + CJS, handles CSS bundling                          |
| **Storybook 10**          | Dev environment + public site | Component browser, a11y, docs, MCP                               |
| **Vitest + Playwright**   | Testing                       | Stories run as browser tests via `@storybook/addon-vitest`       |
| **Chromatic**             | Visual regression / CI        | Catches visual regressions on every push                         |
| **Vercel**                | Hosting                       | Auto-deploys Storybook on every push                             |
| **npm (public)**          | Distribution                  | `npm publish` makes it installable anywhere                      |

---

## Repository Structure

Each component lives in its own folder: `ComponentName.tsx`, `ComponentName.css`, `ComponentName.stories.tsx`, `index.ts`.

```
salimdellali-ui/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── typography/        ← semantic HTML tags, token-wired, zero props for basic use (H1, P, Lead...)
│   │   │   ├── interactive/       ← single non-form elements (Button, Tag, Kbd...)
│   │   │   └── form/              ← single form controls (Input, Select, Checkbox...)
│   │   ├── molecules/             ← composed from atoms (Field, Banner...)
│   │   ├── organisms/             ← complex self-contained sections (Card, Modal, Tabs...)
│   │   ├── wrappers/              ← layout containers (Stack, Row, EditorialGrid...)
│   │   ├── theme/                 ← brand + theme plumbing (Stripe, ThemeProvider...)
│   │   └── page/                  ← full page sections (Header, Hero, Footer...)
│   ├── tokens/
│   │   ├── tokens.css             ← all CSS custom properties (primitives + semantic, light + dark)
│   │   ├── tokens.ts              ← CSSToken union type + cssVar() helper
│   │   ├── story-utils.tsx        ← shared Storybook layout components
│   │   ├── colors/                ← color palette stories
│   │   ├── fonts/                 ← Inter, Inter Tight, JetBrains Mono stories
│   │   └── typography/            ← Headings, Body, Code stories
│   └── index.ts                   ← package entry point (exports + tokens.css import)
├── .storybook/
│   ├── main.ts
│   └── preview.tsx
├── dist/                          ← built output (gitignored, published to npm)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── PLAN.md
```

---

## How the Package Works for Consumers

```bash
npm install @salimdellali/ui
```

```tsx
import { H1, P, Button, Card } from "@salimdellali/ui"
// tokens.css loads automatically — no second import needed

// Typography atoms work with zero props
function QuickPage() {
  return (
    <>
      <H1>Hello world</H1>
      <P>This is a paragraph with default body styles.</P>
    </>
  )
}

// Organisms compose atoms together
function FeaturePage() {
  return (
    <Card>
      <H1>Card title</H1>
      <P>Card body text.</P>
      <Button variant="primary" onClick={handleClick}>Get started</Button>
    </Card>
  )
}
```

TypeScript users get full prop autocompletion and type safety automatically.

> **Next.js consumers:** add `transpilePackages: ['@salimdellali/ui']` to `next.config.js` once. This is a known Next.js requirement for packages that ship CSS imports — one line, no other config needed.

---

## Build Outputs

`vite build` in library mode produces:

```
dist/
  index.es.js    ← ESM (for Vite, modern bundlers)
  index.cjs.js   ← CommonJS (for older setups e.g. legacy Jest)
  index.d.ts     ← TypeScript type declarations
  style.css      ← compiled CSS (loaded automatically via index.ts import)
```

`package.json` exports field points consumers to the right file based on their bundler.

---

## Theming

**For consumers:** `ThemeProvider` defaults to the user's OS preference (`prefers-color-scheme`). Can be overridden with a prop to force light or dark.

**In Storybook:** a toolbar toggle (dark/light) is configured in `.storybook/preview.ts`. Default is dark. The decorator applies `data-theme="dark"` or `data-theme="light"` to `document.documentElement` so all stories reflect the active theme instantly.

**CSS structure:** `:root` defines light theme variables, `[data-theme="dark"]` overrides for dark. A `@media (prefers-color-scheme: dark)` block covers the OS-preference case without JavaScript. This structure already exists in `colors_and_type.css` — minor addition of the media query block during migration.

---

## Storybook

Each component has a `.stories.tsx` file colocated with it:

```tsx
// Button.stories.tsx
export const Primary: Story = {
  args: { variant: "primary", children: "Button" },
}
export const Ghost: Story = { args: { variant: "ghost", children: "Button" } }

// Interaction test
export const ClickTest: Story = {
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole("button")
    await userEvent.click(btn)
    await expect(fn).toHaveBeenCalled()
  },
}
```

Storybook addons in use:

- `@storybook/addon-a11y` — accessibility audit on every story (advisory — fix mechanical issues, use judgment on visual ones)
- `@storybook/addon-vitest` — stories run as Vitest + Playwright browser tests (replaces `addon-interactions` from Storybook 8)
- `@storybook/addon-docs` — auto-generated docs from TypeScript types
- `@chromatic-com/storybook` — visual regression testing and CI
- `@storybook/addon-mcp` — lets AI assistants browse Storybook via MCP protocol

---

## Editorial Grid

`EditorialGrid` is a **wrapper component** in the library — not a Storybook shell design. It implements the centered-column layout with persistent vertical hairline borders and horizontal section dividers (reference: aihero.dev). Consumers who want this aesthetic use it; those who don't, ignore it. It will be used by the author's personal site revamp.

---

## Vercel Deployment

- Build command: `npm run build-storybook`
- Output directory: `storybook-static`
- Triggers: every push to `main`
- Result: public URL where anyone can browse components

---

## npm Publishing

```bash
npm version patch   # or minor / major — bumps version in package.json
npm run build       # builds dist/
npm publish --access public
```

Package name: `@salimdellali/ui`
Starting version: `0.1.0` — stable public API declared at `1.0.0` once all components are ported and end-to-end tested.
Versioning: semantic versioning (`0.1.0` → `0.1.1` patch, `0.2.0` minor, `1.0.0` stable release)

Publishing is manual. Automation via GitHub Actions or a Claude skill may be added later as a separate learning exercise.

---

## Build Order

- [x] 1. Initialize repo: `package.json`, `tsconfig.json`, `vite.config.ts`, `LICENSE`
- [x] 2. Install dependencies via CLI (`tsc --init`, `npx storybook@latest init`) — React 19, TypeScript 6, Vite 8, Storybook 10, Vitest, Playwright
- [x] 3. Migrate `tokens.css` → `src/tokens/tokens.css` + build full Storybook token docs (Colors, Fonts, Typography)
- [x] 4. Port **Atoms / Typography**: `H1` only
- [ ] 5. Smoke-test npm publishing — build `dist/`, publish a pre-release (`0.4.0-alpha.1`), install in a fresh React project, verify `H1` renders correctly end-to-end
- [ ] 6. Port **Atoms / Typography** (remaining): `H2`, `H3`, `H4`, `P`, `Lead`, `Blockquote`, `InlineCode`
- [ ] 7. Port **Atoms / Interactive**: `Button`, `Tag`, `BadgeDot`, `Kbd`
- [ ] 8. Port **Atoms / Form**: `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`
- [ ] 9. Port **Molecules**: `Field`, `Banner`
- [ ] 10. Port **Organisms**: `Card`, `FeaturedCard`, `Modal`, `Tabs`, `Accordion`, `Table`, `CodeBlock`
- [ ] 11. Port **Wrappers**: `Stack`, `Row`, `Container`, `Section`, `EditorialGrid`
- [ ] 12. Port **Theme**: `Stripe`, `Eyebrow`, `ThemeProvider`, `ThemeToggle`
- [ ] 13. Port **Page**: `Header`, `Nav`, `Hero`, `Footer`
- [ ] 14. Configure `src/index.ts` (exports + token CSS import)
- [ ] 15. Configure Vite library build, verify `dist/` output
- [ ] 16. Deploy Storybook to Vercel
- [ ] 17. Pre-publish checklist (do before step 18):
  - Add `homepage`, `bugs`, `engines` fields to `package.json`
  - Rewrite `README.md` for consumers (install, usage, peer deps, Next.js caveat, Storybook link)
  - Add GitHub Actions CI workflow (tsc + Vitest + Chromatic on every push)
- [ ] 18. Publish `@salimdellali/ui@1.0.0` to npm
- [ ] 19. Test in a fresh React project end-to-end
- [ ] 20. Delete the `project/` folder (legacy prototype — fully replaced by `src/`)
