# Changelog

## [Unreleased]

### Added
- `Kbd` atom: `<kbd>` keycap; nest `Kbd` inside `Kbd` for key combinations
- `BadgeDot` atom: status text with a decorative dot, typed `variant` (`neutral`/`success`/`warning`/`danger`/`info`) mapped to status tokens
- `Tag` atom: pill label with `variant` (`neutral`/`outline`/`success`/`warning`/`danger`/`info`) and an optional dismiss button (`onDismiss` + required `dismissLabel`)
- `Link` atom: native `<a>` with required `href`, `variant` (`inline`/`standalone`), and new-tab handling for `target="_blank"` (`rel="noopener noreferrer"`, hidden "opens in a new tab" text via `newTabLabel`, decorative arrow)
- `ButtonLink` atom: native `<a>` with required `href` and `label`, styled like `Button` (`variant`, `size`, icon slots, `isIconOnly`, `isFullWidth`), with new-tab handling
- `Button` atom: native `<button>` with required `label`, `variant` (`primary`/`secondary`/`ghost`/`danger`), `size` (`sm`/`md`/`lg`), `isDisabled`, `isLoading` (keeps width, sets `aria-busy`), `isIconOnly`, `isFullWidth`, `startIcon`/`endIcon` slots, and `ref` as a prop
- `Spinner` atom: `role="status"` loading indicator with a hidden label, `size` (`sm`/`md`/`lg`), inherits text color, fades instead of spinning under `prefers-reduced-motion`
- `VisuallyHidden` atom: screen-reader-only text that takes no visual space
- Status color tokens: `--success`, `--warning`, `--danger`, `--info`, each with a `-bg` tint, plus `--danger-hover` and `--danger-press` for solid fills. Theme-aware through `light-dark()`, text on tint meets WCAG AA in both themes.

### Changed
- **Breaking:** `react` and `react-dom` peer dependencies now require `>=19.0.0` (was `>=18.0.0`). Components take `ref` as a regular prop, which React 18 silently drops. Consumers on React 18 must upgrade to React 19 or stay on `0.10.x`.

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
