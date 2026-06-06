import type { Meta, StoryObj } from "@storybook/react"
import { Entry, Note, SectionLabel } from "../story-utils"
import { type CSSToken, cssVar } from "../tokens"

const meta: Meta = {
  title: "Tokens/Fonts/Inter (Body)",
}
export default meta

const SAMPLE =
  "From an altitude of 400 kilometers, the curvature of the Earth is unmistakable, a thin blue line separating everything we have ever known from the silent expanse beyond."

const PARAGRAPH =
  "From an altitude of 400 kilometers, the curvature of the Earth is unmistakable, a thin blue line separating everything we have ever known from the silent expanse beyond. Each orbit takes 90 minutes. 16 sunrises in a single day, and 16 times the world falls dark again. The station hums at a frequency you feel more than hear, and outside the viewport, the terminator line sweeps across continents without stopping."

// ---- Font Sizes ----

export const FontSizes: StoryObj = {
  name: "Font Sizes",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-body"), color: cssVar("--fg") }}>
      {(["--fs-lg", "--fs-md", "--fs-base", "--fs-sm", "--fs-xs"] satisfies CSSToken[]).map((token) => (
        <Entry key={token}>
          <p style={{ fontSize: cssVar(token), fontWeight: 400, lineHeight: cssVar("--lh-normal"), margin: 0 }}>
            {SAMPLE}
          </p>
          <Note label={`fontSize: ${token}`} />
        </Entry>
      ))}
    </div>
  ),
}

// ---- Line Heights ----

export const LineHeights: StoryObj = {
  name: "Line Heights",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-body"), color: cssVar("--fg") }}>
      {(["--lh-tight", "--lh-snug", "--lh-normal", "--lh-loose"] satisfies CSSToken[]).map((token) => (
        <Entry key={token}>
          <p
            style={{
              fontSize: cssVar("--fs-base"),
              fontWeight: 400,
              lineHeight: cssVar(token),
              maxWidth: cssVar("--measure"),
              margin: 0,
            }}
          >
            {PARAGRAPH}
          </p>
          <Note label={`lineHeight: ${token}`} />
        </Entry>
      ))}
    </div>
  ),
}

// ---- Measure ----

export const Measure: StoryObj = {
  name: "Measure",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-body"), color: cssVar("--fg") }}>
      {(["40ch", "55ch", "65ch", "80ch"] as const).map((width) => (
        <Entry key={width}>
          <p
            style={{
              fontSize: cssVar("--fs-base"),
              fontWeight: 400,
              lineHeight: cssVar("--lh-normal"),
              maxWidth: width === "65ch" ? cssVar("--measure") : width,
              margin: 0,
            }}
          >
            {PARAGRAPH}
          </p>
          <Note label={width === "65ch" ? "maxWidth: --measure (65ch)" : `maxWidth: ${width}`} />
        </Entry>
      ))}
    </div>
  ),
}

// ---- Justification ----

export const Justification: StoryObj = {
  name: "Justification",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-body"), color: cssVar("--fg") }}>
      <Entry>
        <p
          style={{
            fontSize: cssVar("--fs-base"),
            fontWeight: 400,
            lineHeight: cssVar("--lh-normal"),
            maxWidth: "55ch",
            margin: 0,
          }}
        >
          {PARAGRAPH}
        </p>
        <Note label="textAlign: left (default)     ragged right" />
      </Entry>

      <Entry>
        <p
          style={{
            fontSize: cssVar("--fs-base"),
            fontWeight: 400,
            lineHeight: cssVar("--lh-normal"),
            textAlign: "justify",
            maxWidth: "55ch",
            margin: 0,
          }}
        >
          {PARAGRAPH}
        </p>
        <Note label="textAlign: justify     flush right and left edges" />
      </Entry>
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
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-body"), color: cssVar("--fg") }}>
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
