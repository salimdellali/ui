import type { Meta, StoryObj } from "@storybook/react"
import { Entry, SectionLabel } from "../story-utils"
import { type CSSToken, cssVar } from "../tokens"

const meta: Meta = {
  title: "Tokens/Colors",
}
export default meta

// Resolves any CSS token — primitive or alias — to its current hex value.
// Uses a temporary element so the browser fully resolves var() chains (including
// theme overrides from data-theme on <html>) before we read back the color.
function resolveTokenHex(token: string): string {
  const el = document.createElement("div")
  el.style.backgroundColor = `var(${token})`

  document.body.appendChild(el)
  const rgb = window.getComputedStyle(el).backgroundColor
  document.body.removeChild(el)

  const match = rgb.match(/\d+/g) ?? []
  return `#${match
    .slice(0, 3)
    .map((n) => Number(n).toString(16).padStart(2, "0"))
    .join("")}`
}

// ---- Shared components ----

const SwatchGrid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: cssVar("--sp-4") }}>{children}</div>
)

const Swatch = ({ token }: { token: string }) => (
  // outer div: stacks color block and label vertically at a fixed width
  <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
    {/* inner div: renders the actual token value as a background */}
    <div
      style={{
        height: 56,
        background: `var(${token})`,
        border: "1px solid rgba(128,128,128,0.15)",
      }}
    />
    <p
      style={{
        fontFamily: cssVar("--font-mono"),
        fontSize: cssVar("--fs-xs"),
        color: cssVar("--fg-subtle"),
        margin: "6px 0 0",
        lineHeight: 1.4,
      }}
    >
      {`var(${token})`}
      <br />
      {resolveTokenHex(token)}
    </p>
  </div>
)

// ---- Story data ----

const NEUTRALS_DARK: CSSToken[] = ["--sd-black", "--sd-ink", "--sd-graphite"]
const NEUTRALS_SLATES: CSSToken[] = [
  "--sd-slate-900",
  "--sd-slate-700",
  "--sd-slate-500",
  "--sd-slate-400",
  "--sd-slate-300",
  "--sd-slate-200",
  "--sd-slate-100",
  "--sd-slate-50",
]
const NEUTRALS_LIGHT: CSSToken[] = ["--sd-paper", "--sd-white"]

const BRAND_FAMILIES: Array<{ label: string; tokens: CSSToken[] }> = [
  { label: "Yellow", tokens: ["--sd-yellow", "--sd-yellow-deep", "--sd-yellow-dark", "--sd-yellow-deep-dark"] },
  { label: "Red", tokens: ["--sd-red", "--sd-red-deep", "--sd-red-dark", "--sd-red-deep-dark"] },
  { label: "Cyan", tokens: ["--sd-cyan", "--sd-cyan-deep", "--sd-cyan-dark", "--sd-cyan-deep-dark"] },
  { label: "Purple", tokens: ["--sd-purple", "--sd-purple-deep", "--sd-purple-dark", "--sd-purple-deep-dark"] },
  { label: "Green", tokens: ["--sd-green", "--sd-green-deep", "--sd-green-dark", "--sd-green-deep-dark"] },
  { label: "Lime", tokens: ["--sd-lime", "--sd-lime-deep", "--sd-lime-dark", "--sd-lime-deep-dark"] },
  { label: "Maroon", tokens: ["--sd-maroon", "--sd-maroon-deep", "--sd-maroon-dark", "--sd-maroon-deep-dark"] },
]

const SEMANTIC_GROUPS: Array<{ label: string; tokens: CSSToken[] }> = [
  { label: "Background", tokens: ["--bg", "--bg-alt", "--bg-raised", "--bg-sunken"] },
  { label: "Foreground", tokens: ["--fg", "--fg-muted", "--fg-subtle", "--fg-disabled", "--fg-on-accent"] },
  { label: "Border", tokens: ["--border", "--border-strong", "--border-focus"] },
  { label: "Accent", tokens: ["--accent", "--accent-hover", "--accent-press"] },
  { label: "Link", tokens: ["--link", "--link-hover"] },
  { label: "Selection", tokens: ["--selection-bg", "--selection-fg"] },
]

// ---- Stories ----

export const Neutrals: StoryObj = {
  name: "Neutrals",
  render: () => (
    <div style={{ padding: cssVar("--sp-6") }}>
      <Entry>
        <SectionLabel>Darks</SectionLabel>
        <SwatchGrid>
          {NEUTRALS_DARK.map((token) => (
            <Swatch key={token} token={token} />
          ))}
        </SwatchGrid>
      </Entry>

      <Entry>
        <SectionLabel>Slates</SectionLabel>
        <SwatchGrid>
          {NEUTRALS_SLATES.map((token) => (
            <Swatch key={token} token={token} />
          ))}
        </SwatchGrid>
      </Entry>

      <Entry>
        <SectionLabel>Lights</SectionLabel>
        <SwatchGrid>
          {NEUTRALS_LIGHT.map((token) => (
            <Swatch key={token} token={token} />
          ))}
        </SwatchGrid>
      </Entry>
    </div>
  ),
}

export const Brand: StoryObj = {
  name: "Brand",
  render: () => (
    <div style={{ padding: cssVar("--sp-6") }}>
      {BRAND_FAMILIES.map(({ label, tokens }) => (
        <Entry key={label}>
          <SectionLabel>{label}</SectionLabel>
          <SwatchGrid>
            {tokens.map((token) => (
              <Swatch key={token} token={token} />
            ))}
          </SwatchGrid>
        </Entry>
      ))}
    </div>
  ),
}

const StripeRow = ({ title, token, height }: { title: string; token: CSSToken; height: number }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: cssVar("--sp-3"), marginBottom: cssVar("--sp-8") }}>
    <SectionLabel>{title}</SectionLabel>
    <div style={{ height, background: `var(${token})` }} />
    <p
      style={{
        fontFamily: cssVar("--font-mono"),
        fontSize: cssVar("--fs-xs"),
        color: cssVar("--fg-subtle"),
        margin: 0,
        lineHeight: 1.4,
      }}
    >
      {`var(${token})`}
    </p>
  </div>
)

export const Stripe: StoryObj = {
  name: "Stripe",
  render: () => (
    <div style={{ padding: cssVar("--sp-6") }}>
      <StripeRow title="Stripe with hard stops" token="--sd-stripe-hard" height={24} />
      <StripeRow title="Stripe gradient" token="--sd-stripe-gradient" height={24} />
      <StripeRow title="Stripe with hard stops (thin)" token="--sd-stripe-hard" height={6} />
      <StripeRow title="Stripe gradient (thin)" token="--sd-stripe-gradient" height={6} />
    </div>
  ),
}

export const Semantic: StoryObj = {
  name: "Semantic",
  render: () => (
    <div style={{ padding: cssVar("--sp-6") }}>
      <h1 style={{ color: cssVar("--fg-subtle"), marginBottom: cssVar("--sp-6"), fontFamily: cssVar("--font-body") }}>
        Toggle the theme to see every swatch reaction.
      </h1>
      {SEMANTIC_GROUPS.map(({ label, tokens }) => (
        <Entry key={label}>
          <SectionLabel>{label}</SectionLabel>
          <SwatchGrid>
            {tokens.map((token) => (
              <Swatch key={token} token={token} />
            ))}
          </SwatchGrid>
        </Entry>
      ))}
    </div>
  ),
}
