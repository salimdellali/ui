import type { Meta, StoryObj } from "@storybook/react"
import { type CSSToken, cssVar } from "../tokens"

const meta: Meta = {
  title: "Tokens/Fonts/Inter (Body)",
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
        <div key={token}>
          <p style={{ fontSize: cssVar(token), fontWeight: 400, lineHeight: cssVar("--lh-normal"), margin: 0 }}>
            {SAMPLE}
          </p>
          <Note label={`fontSize: ${token}`} />
        </div>
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
        <div key={token}>
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
        </div>
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
        <div key={width}>
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
        </div>
      ))}
    </div>
  ),
}

// ---- Justification ----

export const Justification: StoryObj = {
  name: "Justification",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-body"), color: cssVar("--fg") }}>
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
    </div>
  ),
}

// ---- Specimen ----

export const Specimen: StoryObj = {
  name: "Specimen",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-body"), color: cssVar("--fg") }}>
      <Note label="Inter: recommended body combinations" />

      <p
        style={{
          fontSize: cssVar("--fs-md"),
          fontWeight: 300,
          lineHeight: cssVar("--lh-loose"),
          maxWidth: cssVar("--measure"),
          textAlign: "justify",
          margin: 0,
        }}
      >
        {PARAGRAPH}
      </p>
      <Note label="Lead:     fontSize: --fs-md     fontWeight: 300     lineHeight: --lh-loose     maxWidth: --measure     textAlign: justify" />

      <p
        style={{
          fontSize: cssVar("--fs-base"),
          fontWeight: 400,
          lineHeight: cssVar("--lh-loose"),
          maxWidth: cssVar("--measure"),
          textAlign: "justify",
          margin: 0,
        }}
      >
        {PARAGRAPH}
      </p>
      <Note label="Body:     fontSize: --fs-base     fontWeight: 400     lineHeight: --lh-loose     maxWidth: --measure     textAlign: justify" />

      <p
        style={{
          fontSize: cssVar("--fs-sm"),
          fontWeight: 400,
          lineHeight: cssVar("--lh-loose"),
          maxWidth: cssVar("--measure"),
          textAlign: "justify",
          margin: 0,
          color: cssVar("--fg-muted"),
        }}
      >
        {SAMPLE}
      </p>
      <Note label="Caption:     fontSize: --fs-sm     fontWeight: 400     lineHeight: --lh-loose     color: --fg-muted     maxWidth: --measure     textAlign: justify" />

      <p
        style={{
          fontSize: cssVar("--fs-xs"),
          fontWeight: 500,
          letterSpacing: cssVar("--tracking-wide"),
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Mission log · 4 min read
      </p>
      <Note label="Label:     fontSize: --fs-xs     fontWeight: 500     letterSpacing: --tracking-wide     textTransform: uppercase" />

      <p
        style={{
          fontSize: cssVar("--fs-base"),
          fontWeight: 400,
          lineHeight: cssVar("--lh-loose"),
          maxWidth: cssVar("--measure"),
          textAlign: "justify",
          margin: 0,
        }}
      >
        Interstellar navigation requires more than propulsion,{" "}
        <strong style={{ fontWeight: 700 }}>crossing relativistic distances</strong> demands systems that account for
        time dilation, gravitational lensing, and the irreversible passage of years.
      </p>
      <Note label="Strong:     fontSize: --fs-base     fontWeight: 700 within body at fontWeight: 400     lineHeight: --lh-loose     maxWidth: --measure     textAlign: justify" />

      <p style={{ fontSize: cssVar("--fs-lg"), fontWeight: 400, lineHeight: cssVar("--lh-normal"), margin: 0 }}>
        Áá Àà Ââ Éé Èè Êê Ëë Îî Ïï Ôô Ùù Ûû Üü Ÿÿ Æœ Çç
      </p>
      <Note label="French diacritics:     fontSize: --fs-lg     fontWeight: 400     lineHeight: --lh-normal" />
    </div>
  ),
}
