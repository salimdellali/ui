# @salimdellali/ui

My personal, opinionated React component library — pure CSS, fully typed.

## What is this?

A component library and design token system. Every component maps directly to a set of CSS custom properties, keeping the styling predictable and overridable.

## What to expect

- **Tokens**: design primitives: colors, typography scale, and spacing. These are the raw CSS custom properties the components are built on.
- **Atoms**: the smallest building blocks (headings, text, etc.). Each atom maps directly to a token or a small composition of tokens.
- More categories (**Molecules, Organisms**) will appear here as the library grows.

## Installation

```bash
npm i @salimdellali/ui
```

Then add one import to your app entry point:

```js
import "@salimdellali/ui/styles"
```

That's it — components are ready to use.
