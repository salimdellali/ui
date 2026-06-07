/// <reference path="./global.d.ts" />

import { DocsContainer } from "@storybook/addon-docs/blocks"
import type { Decorator, Preview } from "@storybook/react-vite"
import React from "react"
import { addons } from "storybook/preview-api"
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

// Reads the active theme from localStorage on mount (written by withTheme on
// every story render, so it always reflects the toolbar value). Subscribes to
// the globalsUpdated channel event to stay in sync when the user clicks the toggle.
function useThemeGlobal() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem("sd-theme") ?? "dark")
  React.useEffect(() => {
    const channel = addons.getChannel()
    const onChange = ({ globals }: { globals?: { theme?: string } }) => {
      if (globals?.theme) setTheme(globals.theme)
    }
    channel.on("globalsUpdated", onChange)
    return () => channel.off("globalsUpdated", onChange)
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
