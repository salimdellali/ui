import type { Meta, StoryObj } from "@storybook/react"
import { Entry, Note, SectionLabel } from "../story-utils"
import { type CSSToken, cssVar } from "../tokens"

const meta: Meta = {
  title: "Tokens/Fonts/Inter Tight (Heading)",
}
export default meta

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
        <Entry key={token}>
          <p style={{ fontSize: cssVar(token), fontWeight: 400, lineHeight: cssVar("--lh-tight"), margin: 0 }}>
            {SAMPLE}
          </p>
          <Note label={`fontSize: ${token}`} />
        </Entry>
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
        <Entry key={weight}>
          <p style={{ fontSize: cssVar("--fs-3xl"), fontWeight: weight, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
            {SAMPLE}
          </p>
          <Note label={`fontWeight: ${weight}`} />
        </Entry>
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
        <Entry key={token}>
          <p style={{ fontSize: cssVar("--fs-3xl"), fontWeight: 700, letterSpacing: cssVar(token), margin: 0 }}>
            {SAMPLE}
          </p>
          <Note label={`letterSpacing: ${token}`} />
        </Entry>
      ))}
    </div>
  ),
}

const CHARACTER_GROUPS = [
  { label: "Uppercase", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
  { label: "Lowercase", chars: "abcdefghijklmnopqrstuvwxyz" },
  { label: "Numerals", chars: "0123456789" },
  {
    label: "ASCII punctuation and symbols",
    chars: "! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~",
  },
  { label: "French diacritics", chars: "Áá Àà Ââ Éé Èè Êê Ëë Îî Ïï Ôô Ùù Ûû Üü Ÿÿ Æœ Çç" },
]

// ---- Character Set ----

export const CharacterSet: StoryObj = {
  name: "Character Set",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-heading"), color: cssVar("--fg") }}>
      {CHARACTER_GROUPS.map(({ label, chars }) => (
        <Entry key={label}>
          <SectionLabel>{label}</SectionLabel>
          <p style={{ fontSize: cssVar("--fs-base"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
            {chars}
          </p>
        </Entry>
      ))}
    </div>
  ),
}
