# Changelog

## [0.4.0] - 2026-06-07

### Added
- `H1` typography atom — token-driven page-level heading component with
  `className` extension point and autodocs-enabled Storybook story

## [0.3.0] — 2026-05-23

### Added
- `src/tokens/tokens.css` — design tokens: self-hosted Inter Tight, Inter, and JetBrains Mono fonts via `@font-face`, CSS custom properties for colors, typography, spacing, radii, shadows, and motion, dark theme overrides via `[data-theme="dark"]`
- `src/index.ts` imports `tokens.css` so tokens load automatically for consumers

## [0.2.0] — 2026-05-22

### Added
- Repo scaffold: `package.json`, `tsconfig.json`, `vite.config.ts`, `LICENSE`
- Dependencies: React 19, TypeScript 6, Vite 8, Storybook 10, Vitest, Playwright, Chromatic
- `.storybook/` config with Vite builder, a11y, vitest, docs, MCP, Chromatic addons
- `src/index.ts` entry point, `vitest.shims.d.ts`

### Changed
- `PLAN.md` updated with exact versions, addons, and steps 1–2 marked complete
- `.gitignore` excludes Storybook log files
