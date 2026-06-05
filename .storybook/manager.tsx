/** @jsxRuntime classic */
// biome-ignore lint/correctness/noUnusedImports: required for classic JSX runtime
import React, { useCallback } from "react"
import { addons, types, useGlobals } from "storybook/manager-api"

const SunIcon = () => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const ThemeToggleTool = () => {
  const [globals, updateGlobals] = useGlobals()
  const theme = (globals.theme as string) ?? "dark"

  const toggle = useCallback(() => {
    updateGlobals({ theme: theme === "dark" ? "light" : "dark" })
  }, [theme, updateGlobals])

  return (
    <button
      type="button"
      onClick={toggle}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 8px",
        background: theme === "light" ? "#f5f5f7" : "transparent",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: 12,
        fontFamily: "monospace",
        color: theme === "light" ? "#111113" : "inherit",
      }}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  )
}

addons.register("sd-theme-toggle", () => {
  addons.add("sd-theme-toggle/tool", {
    type: types.TOOL,
    title: "Theme",
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: () => <ThemeToggleTool />,
  })
})
