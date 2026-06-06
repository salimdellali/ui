import type { Meta, StoryObj } from "@storybook/react"
import { DemoLink, Entry, Note, SectionLabel } from "../story-utils"
import { cssVar } from "../tokens"

const meta: Meta = {
  title: "Tokens/Typography",
}
export default meta

const HEADING_SAMPLE = "Chasing 16 sunrises over nominal software. Orbiting momentum."

const BODY_PARAGRAPH =
  "From an altitude of 400 kilometers, the curvature of the Earth is unmistakable, a thin blue line separating everything we have ever known from the silent expanse beyond. Each orbit takes 90 minutes. 16 sunrises in a single day, and 16 times the world falls dark again. The station hums at a frequency you feel more than hear, and outside the viewport, the terminator line sweeps across continents without stopping."

const BODY_SAMPLE =
  "From an altitude of 400 kilometers, the curvature of the Earth is unmistakable, a thin blue line separating everything we have ever known from the silent expanse beyond."

// ---- Headings ----

export const Headings: StoryObj = {
  name: "Headings",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-heading"), color: cssVar("--fg") }}>
      <Entry>
        <SectionLabel>Hero</SectionLabel>
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
          {HEADING_SAMPLE}
        </p>
        <Note label="fontSize: --fs-5xl     fontWeight: 800     lineHeight: --lh-tight     letterSpacing: --tracking-tight" />
      </Entry>

      <Entry>
        <SectionLabel>Heading 1</SectionLabel>
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
          {HEADING_SAMPLE}
        </p>
        <Note label="fontSize: --fs-3xl     fontWeight: 700     lineHeight: --lh-tight     letterSpacing: --tracking-tight" />
      </Entry>

      <Entry>
        <SectionLabel>Heading 2</SectionLabel>
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
          {HEADING_SAMPLE}
        </p>
        <Note label="fontSize: --fs-2xl     fontWeight: 600     lineHeight: --lh-snug     letterSpacing: --tracking-snug" />
      </Entry>

      <Entry>
        <SectionLabel>Heading 3</SectionLabel>
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
          {HEADING_SAMPLE}
        </p>
        <Note label="fontSize: --fs-xl     fontWeight: 500     lineHeight: --lh-snug     letterSpacing: --tracking-snug" />
      </Entry>

      <Entry>
        <SectionLabel>Eyebrow</SectionLabel>
        <p
          style={{
            fontSize: cssVar("--fs-sm"),
            fontWeight: 600,
            letterSpacing: cssVar("--tracking-caps"),
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {HEADING_SAMPLE}
        </p>
        <Note label="fontSize: --fs-sm     fontWeight: 600     letterSpacing: --tracking-caps     textTransform: uppercase" />
      </Entry>

      <Entry>
        <SectionLabel>Editorial</SectionLabel>
        <p
          style={{
            fontSize: cssVar("--fs-lg"),
            fontWeight: 500,
            fontStyle: "italic",
            lineHeight: cssVar("--lh-snug"),
            margin: 0,
          }}
        >
          {HEADING_SAMPLE}
        </p>
        <Note label="fontSize: --fs-lg     fontWeight: 500     fontStyle: italic     lineHeight: --lh-snug" />
      </Entry>

      <Entry>
        <SectionLabel>Em</SectionLabel>
        <p style={{ fontSize: cssVar("--fs-2xl"), fontWeight: 600, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
          Navigation requires <em style={{ fontStyle: "italic" }}>precise</em> calculation.
        </p>
        <Note label="fontStyle: italic     within Inter Tight at fontWeight: 600" />
      </Entry>

      <Entry>
        <SectionLabel>Link</SectionLabel>
        <p style={{ fontSize: cssVar("--fs-2xl"), fontWeight: 600, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
          <DemoLink>Orbital mechanics</DemoLink> and the mathematics of spaceflight.
        </p>
        <Note label="color: --link     hover: --link-hover     textDecoration: underline" />
      </Entry>

      <Entry>
        <SectionLabel>Selection</SectionLabel>
        <p style={{ fontSize: cssVar("--fs-2xl"), fontWeight: 600, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
          Select this heading to see selection colors at heading scale.
        </p>
        <Note label="background: --selection-bg     color: --selection-fg" />
      </Entry>
    </div>
  ),
}

// ---- Body ----

export const Body: StoryObj = {
  name: "Body",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-body"), color: cssVar("--fg") }}>
      <Entry>
        <SectionLabel>Lead</SectionLabel>
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
          {BODY_PARAGRAPH}
        </p>
        <Note label="fontSize: --fs-md     fontWeight: 300     lineHeight: --lh-loose     maxWidth: --measure     textAlign: justify" />
      </Entry>

      <Entry>
        <SectionLabel>Body</SectionLabel>
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
          {BODY_PARAGRAPH}
        </p>
        <Note label="fontSize: --fs-base     fontWeight: 400     lineHeight: --lh-loose     maxWidth: --measure     textAlign: justify" />
      </Entry>

      <Entry>
        <SectionLabel>Caption</SectionLabel>
        <p
          style={{
            fontSize: cssVar("--fs-sm"),
            fontWeight: 400,
            lineHeight: cssVar("--lh-loose"),
            maxWidth: cssVar("--measure"),
            textAlign: "justify",
            color: cssVar("--fg-muted"),
            margin: 0,
          }}
        >
          {BODY_SAMPLE}
        </p>
        <Note label="fontSize: --fs-sm     fontWeight: 400     lineHeight: --lh-loose     color: --fg-muted     maxWidth: --measure     textAlign: justify" />
      </Entry>

      <Entry>
        <SectionLabel>Label</SectionLabel>
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
        <Note label="fontSize: --fs-xs     fontWeight: 500     letterSpacing: --tracking-wide     textTransform: uppercase" />
      </Entry>

      <Entry>
        <SectionLabel>Strong</SectionLabel>
        <p style={{ fontSize: cssVar("--fs-base"), fontWeight: 400, lineHeight: cssVar("--lh-loose"), margin: 0 }}>
          The mission requires <strong style={{ fontWeight: 700 }}>absolute precision</strong>.
        </p>
        <Note label="fontWeight: 700 within body at fontWeight: 400" />
      </Entry>

      <Entry>
        <SectionLabel>Em</SectionLabel>
        <p style={{ fontSize: cssVar("--fs-base"), fontWeight: 400, lineHeight: cssVar("--lh-loose"), margin: 0 }}>
          Launch at <em style={{ fontStyle: "italic" }}>dawn</em>, not dusk.
        </p>
        <Note label="fontStyle: italic within body at fontWeight: 400" />
      </Entry>

      <Entry>
        <SectionLabel>Blockquote</SectionLabel>
        <blockquote
          style={{
            borderLeft: `3px solid ${cssVar("--border")}`,
            paddingLeft: cssVar("--sp-4"),
            margin: 0,
          }}
        >
          <p
            style={{
              fontSize: cssVar("--fs-md"),
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: cssVar("--lh-loose"),
              color: cssVar("--fg-muted"),
              maxWidth: cssVar("--measure"),
              margin: 0,
            }}
          >
            The universe is under no obligation to make sense to you.
          </p>
        </blockquote>
        <Note label="borderLeft: 3px solid --border     paddingLeft: --sp-4     fontSize: --fs-md     fontWeight: 300     fontStyle: italic     color: --fg-muted" />
      </Entry>

      <Entry>
        <SectionLabel>Link</SectionLabel>
        <p
          style={{
            fontSize: cssVar("--fs-base"),
            fontWeight: 400,
            lineHeight: cssVar("--lh-loose"),
            maxWidth: cssVar("--measure"),
            margin: 0,
          }}
        >
          From an altitude of 400 kilometers, <DemoLink>the curvature of the Earth</DemoLink> is unmistakable, a thin
          blue line separating <DemoLink>everything we have ever known</DemoLink> from the silent expanse beyond.
        </p>
        <Note label="color: --link     hover: --link-hover     textDecoration: underline" />
      </Entry>

      <Entry>
        <SectionLabel>Selection</SectionLabel>
        <p
          style={{
            fontSize: cssVar("--fs-base"),
            fontWeight: 400,
            lineHeight: cssVar("--lh-loose"),
            maxWidth: cssVar("--measure"),
            margin: 0,
          }}
        >
          Select this sentence to see the selection colors in action.
        </p>
        <Note label="background: --selection-bg     color: --selection-fg" />
      </Entry>
    </div>
  ),
}

// ---- Code ----

export const Code: StoryObj = {
  name: "Code",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-mono"), color: cssVar("--fg") }}>
      <Entry>
        <SectionLabel>Editor</SectionLabel>
        <pre
          style={{
            fontFamily: cssVar("--font-mono"),
            fontSize: cssVar("--fs-base"),
            fontWeight: 400,
            lineHeight: cssVar("--lh-snug"),
            margin: 0,
          }}
        >
          {
            'function countdown(n: number): void {\n  if (n <= 0) {\n    console.log("launch");\n    return;\n  }\n  console.log(n);\n  countdown(n - 1);\n}'
          }
        </pre>
        <Note label="fontSize: --fs-base     fontWeight: 400     lineHeight: --lh-snug" />
      </Entry>

      <Entry>
        <SectionLabel>Terminal</SectionLabel>
        <pre
          style={{
            fontFamily: cssVar("--font-mono"),
            fontSize: cssVar("--fs-sm"),
            fontWeight: 400,
            lineHeight: cssVar("--lh-snug"),
            margin: 0,
          }}
        >
          {
            '$ npm install @salimdellali/ui\nadded 1 package in 0.42s\n$ git commit -m "feat: launch sequence initiated"'
          }
        </pre>
        <Note label="fontSize: --fs-sm     fontWeight: 400     lineHeight: --lh-snug" />
      </Entry>

      <Entry>
        <SectionLabel>Comment</SectionLabel>
        <pre
          style={{
            fontFamily: cssVar("--font-mono"),
            fontSize: cssVar("--fs-base"),
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: cssVar("--lh-snug"),
            margin: 0,
          }}
        >
          {
            "// calculate orbital period using Kepler's third law\n/* TODO: account for atmospheric drag\n   negligible above 200 km */"
          }
        </pre>
        <Note label="fontSize: --fs-base     fontWeight: 400     fontStyle: italic     lineHeight: --lh-snug" />
      </Entry>

      <Entry>
        <SectionLabel>Link</SectionLabel>
        <pre
          style={{
            fontFamily: cssVar("--font-mono"),
            fontSize: cssVar("--fs-base"),
            fontWeight: 400,
            lineHeight: cssVar("--lh-snug"),
            margin: 0,
          }}
        >
          {"// source: "}
          <DemoLink>https://api.example.io/v1/telemetry</DemoLink>
          {"\nconst endpoint = '/v1/telemetry'"}
        </pre>
        <Note label="color: --link     hover: --link-hover     textDecoration: underline" />
      </Entry>

      <Entry>
        <SectionLabel>Selection</SectionLabel>
        <pre
          style={{
            fontFamily: cssVar("--font-mono"),
            fontSize: cssVar("--fs-base"),
            fontWeight: 400,
            lineHeight: cssVar("--lh-snug"),
            margin: 0,
          }}
        >
          {"const velocity = 7.9e3 // orbital velocity in m/s\nconst altitude = 408e3 // ISS orbit in meters"}
        </pre>
        <Note label="background: --selection-bg     color: --selection-fg" />
      </Entry>
    </div>
  ),
}
