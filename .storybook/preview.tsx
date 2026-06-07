/// <reference path="./global.d.ts" />

import { DocsContainer } from "@storybook/addon-docs/blocks"
import type { Decorator, Preview } from "@storybook/react-vite"
import React from "react"
import { themes } from "storybook/theming"
import "../src/tokens/tokens.css"

// ─── THEME TOGGLE (toolbar button) ───────────────────────────────────────────
// Runs on every story render. Reads the value selected in the toolbar toggle
// and applies it to the document so CSS custom properties (data-theme="dark"|"light")
// take effect on the story canvas. Also persists the choice to localStorage so
// ThemedDocsContainer can read it on initial load.
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? "dark"
  document.documentElement.setAttribute("data-theme", theme)
  document.body.style.background = "var(--bg)"
  localStorage.setItem("sd-theme", theme)
  return <Story />
}

// ─── GENERATED DOCS PAGE THEME ───────────────────────────────────────────────
// Storybook renders the generated Docs page outside the normal story decorator
// chain, so withTheme alone cannot theme it. The solution is a custom
// DocsContainer that receives a Storybook theme object (themes.dark / themes.light)
// which re-skins the docs chrome (typography, backgrounds, borders).

// Reads data-theme from the document on mount (set by withTheme on every story
// render). A MutationObserver keeps it in sync whenever withTheme updates the
// attribute, which is more reliable than the globalsUpdated channel event whose
// payload can carry a stale value.
function useThemeGlobal() {
  const [theme, setTheme] = React.useState(
    () => document.documentElement.getAttribute("data-theme") ?? localStorage.getItem("sd-theme") ?? "dark",
  )
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme")
      if (t) setTheme(t)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => observer.disconnect()
  }, [])
  return theme
}

// Replaces the default DocsContainer with one that passes the active Storybook
// theme to the docs chrome. Wired in via parameters.docs.container below.
function ThemedDocsContainer({ context, children }: { context: any; children: React.ReactNode }) {
  const theme = useThemeGlobal()
  return (
    <DocsContainer context={context} theme={theme === "dark" ? themes.dark : themes.light}>
      {children}
    </DocsContainer>
  )
}

const preview: Preview = {
  globalTypes: {
    // Initializes globals.theme with defaultValue: "dark" so withTheme and the
    // custom addon in manager.tsx both receive "dark" on first render
    // instead of undefined.
    theme: { defaultValue: "dark" },
  },
  decorators: [withTheme], // THEME TOGGLE — applies data-theme to the story canvas
  parameters: {
    docs: { container: ThemedDocsContainer }, // GENERATED DOCS PAGE — themes the docs chrome
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
}

export default preview
