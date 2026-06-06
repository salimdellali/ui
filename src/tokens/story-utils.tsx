import { useState } from "react"
import { cssVar } from "./tokens"

export const Entry = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: cssVar("--sp-3"),
      marginBottom: cssVar("--sp-6"),
    }}
  >
    {children}
  </div>
)

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontFamily: cssVar("--font-mono"),
      fontSize: cssVar("--fs-lg"),
      color: cssVar("--fg-subtle"),
      textTransform: "uppercase",
      letterSpacing: cssVar("--tracking-caps"),
      fontWeight: 500,
      margin: 0,
    }}
  >
    {children}
  </p>
)

export const Note = ({ label }: { label: string }) => (
  <p
    style={{
      fontFamily: cssVar("--font-mono"),
      fontSize: cssVar("--fs-xs"),
      color: cssVar("--fg-subtle"),
      margin: 0,
      fontWeight: 400,
      whiteSpace: "pre-wrap",
    }}
  >
    {label}
  </p>
)

export const DemoLink = ({ children }: { children: React.ReactNode }) => {
  const [hovered, setHovered] = useState(false)
  return (
    // biome-ignore lint/a11y/useValidAnchor: demo link for visual token showcase only
    <a
      href="#"
      style={{
        color: hovered ? cssVar("--link-hover") : cssVar("--link"),
        textDecoration: "underline",
        transition: `color ${cssVar("--dur-base")} ${cssVar("--ease-std")}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  )
}
