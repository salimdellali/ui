# Handoff Context: @salimdellali/ui

Context carried over from a claude.ai planning conversation. Read this before making changes.

## Project overview

`@salimdellali/ui` is Salim Dellali's personal React component library (currently v0.6.0, MIT licensed, published to npm, repo: github.com/salimdellali/ui).

Core thesis:

- As few external dependencies as possible (zero runtime deps; React 18+ and react-dom as peer dependencies only)
- Raw CSS instead of Tailwind or CSS-in-JS
- Minimal bundle size
- Fully typed (strict TypeScript)
- Low-friction consumption: two steps, `npm install @salimdellali/ui` then import `@salimdellali/ui/styles` once at the app level

Tooling: Vite build (ESM + CJS + type declarations via vite-plugin-dts), Storybook 10 + Chromatic for visual review, Vitest (browser mode via Playwright), Biome for lint/format, Husky.

## Design inspiration and the licensing rule

Salim is inspired by the GC Digital Talent platform (talent.canada.ca), whose source is public at github.com/GCTC-NTGC/gc-digital-talent. Their design system lives in `packages/ui/src/components/` (roughly 40 components) with tokens in `packages/theme`. Their stack: Tailwind CSS with tailwind-variants and tailwind-merge, Radix UI and Base UI primitives, Heroicons, motion.

IMPORTANT: that repo is AGPL-3.0. The rule for this project is "recreate, don't copy":

- Taking design inspiration (colors, spacing, radii, type scale, layout patterns, variant structures) is fine
- Copying their actual code is not, since it would force AGPL onto this MIT library
- In practice their styling is Tailwind class strings, so everything gets translated by hand into this library's own raw CSS anyway

## Architecture decisions made

1. Keep the explicit CSS import (no JS-injected styles). It is the industry-standard pattern (Mantine, Radix Themes) and avoids SSR/RSC and style-ordering problems.
2. Build the entire theme on CSS custom properties from day one (e.g. `--ui-color-primary`, `--ui-radius-md`). Component CSS should only reference variables. This makes "adopt the GC palette, tweak a few colors" a first-class feature and gives consumers free theming with zero JS.
3. Per-component CSS exports (e.g. `./styles/button.css`) are a possible later optimization, not a current concern.
4. `sideEffects: ["**/*.css"]` must stay so bundlers do not tree-shake the CSS.

## Open items / known issues

- `engines` field is too strict for consumers (`node >=24`, `npm >=11`). A browser UI library has no runtime Node requirement. Loosen to something like `>=18` or drop it, and keep strict versions for contributors via `.nvmrc` or `devEngines`.
- Version check: `chromatic ^17.0.0` in devDependencies may not pair well with Storybook 10 / `@chromatic-com/storybook ^5`. Verify or bump to chromatic 18+.
- peerDependencies claim React >=18 but development is against React 19. Either add a CI matrix job running Vitest against React 18, or declare `>=19` honestly.
- The hard components are the ones where Radix normally earns its keep: Dialog, DropdownMenu, Tabs, and similar. Going dependency-free means owning focus trapping, keyboard navigation, and ARIA wiring in-house. Budget real effort for accessibility there (the GC repo's Storybook and their use of Radix behavior are useful references for expected keyboard/ARIA behavior, but implement independently).

## Style preferences

- Strict TypeScript, clean readable code over theoretical optimizations
- No em dashes or AI-sounding language in any written output (docs, comments, commit messages)
