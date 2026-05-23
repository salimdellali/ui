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

### Components to port (migration order: Theme → Primitives → Compounds → Wrappers)

**Theme**
- `ThemeProvider`, `ThemeToggle`

**Primitives**
- Brand: `Stripe`, `Eyebrow`
- Interactive: `Button`
- Form: `Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`
- Display: `Tag`, `BadgeDot`, `Kbd`, `Code`, `CodeBlock`

**Compounds** (composed from primitives)
- `Banner`, `Card`, `FeaturedCard`, `Modal`, `Tabs`, `Accordion`, `Table`, `Nav`, `Hero`, `Footer`

**Wrappers** (built last — stories use the full component library as fill content)
- `Container`, `Section`, `Stack`, `Row`, `EditorialGrid`

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

```
salimdellali-ui/                   ← repo root
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx         ← component
│   │   │   ├── Button.css         ← scoped styles
│   │   │   ├── Button.stories.tsx ← Storybook stories + tests
│   │   │   └── index.ts           ← re-export
│   │   ├── Card/
│   │   ├── Nav/
│   │   └── ... (one folder per component)
│   ├── tokens/
│   │   └── tokens.css             ← migrated from colors_and_type.css
│   └── index.ts                   ← package entry point (also imports tokens.css)
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
import { Button, Card, Nav } from "@salimdellali/ui"
// tokens.css loads automatically — no second import needed

function MyPage() {
  return (
    <Card>
      <h2>Hello</h2>
      <Button variant="primary" size="lg" onClick={handleClick}>
        Click me
      </Button>
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
- [ ] 3. Migrate `tokens.css` → `src/tokens/tokens.css`
- [ ] 4. Port **Theme**: `ThemeProvider`, `ThemeToggle` — verify dark/light toggle works in Storybook
- [ ] 5. Port **Primitives** one by one — verify each in Storybook in both themes before moving to the next
- [ ] 6. Port **Compounds** one by one — compose from already-ported primitives, verify in Storybook
- [ ] 7. Port **Wrappers** one by one — use mix of primitives and compounds as story fill content
- [ ] 8. Configure `src/index.ts` (exports + token CSS import)
- [ ] 9. Configure Vite library build, verify `dist/` output
- [ ] 10. Deploy Storybook to Vercel
- [ ] 11. Pre-publish checklist (do before step 12):
  - Add `homepage`, `bugs`, `engines` fields to `package.json`
  - Rewrite `README.md` for consumers (install, usage, peer deps, Next.js caveat, Storybook link)
  - Add GitHub Actions CI workflow (tsc + Vitest + Chromatic on every push)
- [ ] 12. Publish `@salimdellali/ui@1.0.0` to npm
- [ ] 13. Test in a fresh React project end-to-end
- [ ] 14. Delete the `project/` folder (legacy prototype — fully replaced by `src/`)
