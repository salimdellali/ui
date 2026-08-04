# Changelog

## [0.10.0] - 2026-08-04

### Added
- `InlineCode` typography atom — token-driven inline code snippet component with monospace font and a subtle background pill

This completes the typography atom set from `PLAN.md` (`H4` dropped, not needed).

## [0.9.0] - 2026-08-04

### Added
- `Blockquote` typography atom — token-driven quoted-content component with an inline-start border, italic muted text, and support for the standard `cite` attribute. Composes with `P` for multi-paragraph quotes.

## [0.8.0] - 2026-08-04

### Added
- `Lead` typography atom — token-driven intro paragraph component, larger and more spacious than `P`, meant to follow a heading and set up a section. Uses `--fs-lg` and `--lh-loosest`.

## [0.7.0] - 2026-08-03

### Added
- `P` typography atom — token-driven body paragraph component with `className` extension point and autodocs-enabled Storybook story
- `--lh-loosest` line-height token (2) to the type scale

## [0.6.0] - 2026-07-05

### Added
- `H3` typography atom — token-driven subsection heading component with
  `className` extension point and autodocs-enabled Storybook story

## [0.5.0] - 2026-07-05

### Added
- `H2` typography atom — token-driven section heading component with
  `className` extension point and autodocs-enabled Storybook story

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
