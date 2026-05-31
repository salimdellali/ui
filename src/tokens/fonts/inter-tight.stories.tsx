import type { Meta, StoryObj } from "@storybook/react"
import { type CSSToken, cssVar } from "../tokens"

const meta: Meta = {
  title: "Tokens/Fonts/Inter Tight (Heading)",
}
export default meta

const Note = ({ label }: { label: string }) => (
  <p
    style={{
      fontFamily: cssVar("--font-mono"),
      fontSize: cssVar("--fs-xs"),
      color: cssVar("--fg-subtle"),
      margin: "0 0 1.5rem",
      fontWeight: 400,
      whiteSpace: "pre-wrap",
    }}
  >
    {label}
  </p>
)

const SAMPLE = "Chasing 16 sunrises over nominal software. Orbiting momentum."

// ---- Font Sizes ----

export const FontSizes: StoryObj = {
  name: "Font Sizes",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-heading"), color: cssVar("--fg") }}>
      {(
        [
          "--fs-5xl",
          "--fs-4xl",
          "--fs-3xl",
          "--fs-2xl",
          "--fs-xl",
          "--fs-lg",
          "--fs-md",
          "--fs-base",
          "--fs-sm",
          "--fs-xs",
        ] satisfies CSSToken[]
      ).map((token) => (
        <div key={token}>
          <p style={{ fontSize: cssVar(token), fontWeight: 400, lineHeight: cssVar("--lh-tight"), margin: 0 }}>
            {SAMPLE}
          </p>
          <Note label={`fontSize: ${token}`} />
        </div>
      ))}
    </div>
  ),
}

// ---- Weights ----

export const Weights: StoryObj = {
  name: "Weights",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-heading"), color: cssVar("--fg") }}>
      {([900, 800, 700, 600, 500, 400, 300, 200, 100] as const).map((weight) => (
        <div key={weight}>
          <p style={{ fontSize: cssVar("--fs-3xl"), fontWeight: weight, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
            {SAMPLE}
          </p>
          <Note label={`fontWeight: ${weight}`} />
        </div>
      ))}
    </div>
  ),
}

// ---- Tracking ----

export const Tracking: StoryObj = {
  name: "Tracking",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-heading"), color: cssVar("--fg") }}>
      {(
        [
          "--tracking-tight",
          "--tracking-snug",
          "--tracking-normal",
          "--tracking-wide",
          "--tracking-caps",
        ] satisfies CSSToken[]
      ).map((token) => (
        <div key={token}>
          <p style={{ fontSize: cssVar("--fs-3xl"), fontWeight: 700, letterSpacing: cssVar(token), margin: 0 }}>
            {SAMPLE}
          </p>
          <Note label={`letterSpacing: ${token}`} />
        </div>
      ))}
    </div>
  ),
}

// ---- Specimen ----

export const Specimen: StoryObj = {
  name: "Specimen",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-heading"), color: cssVar("--fg") }}>
      <Note label="Inter Tight: recommended heading combinations" />

      <p
        style={{
          fontSize: cssVar("--fs-5xl"),
          fontWeight: 800,
          lineHeight: cssVar("--lh-tight"),
          letterSpacing: cssVar("--tracking-tight"),
          maxWidth: "18ch",
          margin: 0,
        }}
      >
        {SAMPLE}
      </p>
      <Note label="Hero title:     fontSize: --fs-5xl     fontWeight: 800     lineHeight: --lh-tight     letterSpacing: --tracking-tight" />

      <p
        style={{
          fontSize: cssVar("--fs-3xl"),
          fontWeight: 700,
          lineHeight: cssVar("--lh-tight"),
          letterSpacing: cssVar("--tracking-tight"),
          maxWidth: "22ch",
          margin: 0,
        }}
      >
        {SAMPLE}
      </p>
      <Note label="Heading 1:     fontSize: --fs-3xl     fontWeight: 700     lineHeight: --lh-tight     letterSpacing: --tracking-tight" />

      <p
        style={{
          fontSize: cssVar("--fs-2xl"),
          fontWeight: 600,
          lineHeight: cssVar("--lh-snug"),
          letterSpacing: cssVar("--tracking-snug"),
          maxWidth: "26ch",
          margin: 0,
        }}
      >
        {SAMPLE}
      </p>
      <Note label="Heading 2:     fontSize: --fs-2xl     fontWeight: 600     lineHeight: --lh-snug     letterSpacing: --tracking-snug" />

      <p
        style={{
          fontSize: cssVar("--fs-xl"),
          fontWeight: 500,
          lineHeight: cssVar("--lh-snug"),
          letterSpacing: cssVar("--tracking-snug"),
          maxWidth: "32ch",
          margin: 0,
        }}
      >
        {SAMPLE}
      </p>
      <Note label="Heading 3:     fontSize: --fs-xl     fontWeight: 500     lineHeight: --lh-snug     letterSpacing: --tracking-snug" />

      <p
        style={{
          fontSize: cssVar("--fs-sm"),
          fontWeight: 600,
          letterSpacing: cssVar("--tracking-caps"),
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {SAMPLE}
      </p>
      <Note label="Eyebrow:     fontSize: --fs-sm     fontWeight: 600     letterSpacing: --tracking-caps     textTransform: uppercase" />

      <p
        style={{
          fontSize: cssVar("--fs-lg"),
          fontWeight: 500,
          fontStyle: "italic",
          lineHeight: cssVar("--lh-snug"),
          margin: 0,
        }}
      >
        {SAMPLE}
      </p>
      <Note label="Editorial:     fontSize: --fs-lg     fontWeight: 500     fontStyle: italic     lineHeight: --lh-snug" />

      <p style={{ fontSize: cssVar("--fs-xl"), fontWeight: 600, margin: 0 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
      <Note label="Uppercase + numerals" />

      <p style={{ fontSize: cssVar("--fs-xl"), fontWeight: 400, margin: 0 }}>abcdefghijklmnopqrstuvwxyz 0123456789</p>
      <Note label="Lowercase + numerals" />

      <p style={{ fontSize: cssVar("--fs-xl"), fontWeight: 400, margin: 0 }}>
        Áá Àà Ââ Éé Èè Êê Ëë Îî Ïï Ôô Ùù Ûû Üü Ÿÿ Æœ Çç
      </p>
      <Note label="French diacritics" />
    </div>
  ),
}
