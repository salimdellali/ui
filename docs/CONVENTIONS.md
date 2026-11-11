# Conventions

Naming and API rules every component in this library follows. Decided once here, applied by category when a new prop is needed — not re-invented per component.

Written before `Button`, the first component with real API surface beyond `children`/`className`/`...rest`. Every atom shipped so far (headings, `P`, `Lead`, `Blockquote`, `InlineCode`) had no naming decisions to make; HTML already decided their shape.

## Why this exists

This package publishes to npm on every merge — each shipped version is a real installable API, not a draft. Renaming a prop later is a breaking change for actual consumers, not an internal cleanup. Deciding the naming rule once, before it's load-bearing, is cheap. Fixing an inconsistency across several published versions is not.

## Booleans

- `is*` for state: `isDisabled`, `isLoading`, `isIconOnly`
- `has*` for feature/presence toggles: `hasIcon`, `hasError`

Never a bare adjective (`disabled`, `loading`) — even though that matches the native HTML attribute name, it reads ambiguously as JSX shorthand and breaks consistency with every other boolean in the library.

## Callbacks

`on{Verb}`, matching the native DOM event naming pattern: `onClick`, `onChange`, `onDismiss`. If the handler needs to run async work, it still returns from the same `on{Verb}` name (optionally returning a `Promise`) — no separate `*Action` naming tier. Keep it to one pattern.

## Sizes

`'sm' | 'md' | 'lg'` — same three values, same relative meaning, on every component that has a size axis. Don't introduce a fourth tier or different labels (`'small'`, `'large'`) on a one-off basis.

## Variant / style axis

The prop for a component's visual style is always named `variant`, typed as a string union (`'primary' | 'secondary' | 'ghost'`, etc.). Don't rename it `type` or `kind` on individual components — `type` in particular collides with the native HTML `type` attribute (`<button type="submit">`) and should stay reserved for that.

## Direction

`start`/`end`, never `left`/`right` — mirrors the logical-properties CSS pattern already used in `Blockquote` (`border-inline-start`). Free RTL correctness, costs nothing to apply from the start.

## Controlled vs. uncontrolled

Controlled by default: a `value` + `onChange` pair. The uncontrolled escape hatch uses a `default*` prefix: `defaultValue`, `defaultOpen` — never a second unprefixed prop that silently means "initial value" only sometimes.

## Accessibility

Every interactive component requires a `label` prop — it's the accessible name, not optional decoration. Rendered as visible text by default; used as `aria-label` when the component is icon-only or otherwise visually label-less.

`label` replaces `children` on these components: `Button` and `ButtonLink` take no `children`, so a control can never ship without a name.

One exception: `Link` takes `children` instead of `label`. Link text is prose that sits inside a sentence and can hold other inline atoms (`InlineCode`, `Kbd`), which a string prop cannot express. The children are the accessible name.

Display-only atoms (`Tag`, `BadgeDot`, `Kbd`, typography) are not interactive and keep `children`.

When a display component grows an optional control, that control's name is a required `{action}Label` prop tied to its callback: `Tag` requires `dismissLabel` whenever `onDismiss` is set. No built-in default text, so nothing ships untranslated or ambiguous ("Dismiss" five times in a row).

## Refs

React 19 ref-as-prop. No `forwardRef` wrapper needed — `ref` is destructured like any other prop:

```tsx
const Button = ({ ref, ...props }: ButtonProps) => <button ref={ref} {...props} />
```

This is a React 19-only API — in React 18, `ref` never reaches component props (React strips it before your component sees it), so this pattern silently fails to attach the ref. It's safe here specifically because `peerDependencies` declares `react: ">=19.0.0"`. If that range ever widens back down to include React 18, this rule needs to change to `forwardRef` first.

## Component and class naming

Component names carry no library prefix (`Button`, not `SdButton`) — the `sd-` prefix lives only in the internal CSS class (`sd-button`), never in the public JS API.
