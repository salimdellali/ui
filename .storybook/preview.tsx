/// <reference path="./global.d.ts" />
import type { Decorator, Preview } from "@storybook/react-vite"
import "../src/tokens/tokens.css"

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? "dark"
  document.documentElement.setAttribute("data-theme", theme)
  document.body.style.background = "var(--bg)"
  localStorage.setItem("sd-theme", theme)
  return <Story />
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for all stories",
      defaultValue: "dark",
    },
  },
  decorators: [withTheme],
  parameters: {
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
