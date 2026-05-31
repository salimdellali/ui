import type { Meta, StoryObj } from "@storybook/react"
import { type CSSToken, cssVar } from "../tokens"

const meta: Meta = {
  title: "Tokens/Fonts/JetBrains Mono (Code)",
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

const SAMPLE = "const velocity = 7.9e3 // orbital velocity in m/s"

// ---- Font Sizes ----

export const FontSizes: StoryObj = {
  name: "Font Sizes",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-mono"), color: cssVar("--fg") }}>
      {(["--fs-lg", "--fs-md", "--fs-base", "--fs-sm", "--fs-xs"] satisfies CSSToken[]).map((token) => (
        <div key={token}>
          <p style={{ fontSize: cssVar(token), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
            {SAMPLE}
          </p>
          <Note label={`fontSize: ${token}`} />
        </div>
      ))}
    </div>
  ),
}

// ---- Ligatures ----

const LIGATURE_GROUPS = [
  {
    title: "Comparison",
    items: [
      { raw: "= =", rendered: "==", label: "equality" },
      { raw: "= = =", rendered: "===", label: "strict equality" },
      { raw: "! =", rendered: "!=", label: "inequality" },
      { raw: "! = =", rendered: "!==", label: "strict inequality" },
      { raw: "< =", rendered: "<=", label: "less or equal" },
      { raw: "> =", rendered: ">=", label: "greater or equal" },
      { raw: "< >", rendered: "<>", label: "not equal (SQL)" },
      { raw: "< = >", rendered: "<=>", label: "spaceship" },
    ],
  },
  {
    title: "Arrows & Assignment",
    items: [
      { raw: "= >", rendered: "=>", label: "arrow" },
      { raw: "- >", rendered: "->", label: "thin arrow" },
      { raw: "< -", rendered: "<-", label: "Go channel receive" },
      { raw: "| >", rendered: "|>", label: "pipe" },
      { raw: ": =", rendered: ":=", label: "walrus / Go assign" },
      { raw: "+ =", rendered: "+=", label: "plus assign" },
    ],
  },
  {
    title: "Logical",
    items: [
      { raw: "| |", rendered: "||", label: "logical or" },
      { raw: "& &", rendered: "&&", label: "logical and" },
      { raw: "? ?", rendered: "??", label: "nullish coalescing" },
    ],
  },
  {
    title: "Arithmetic & Bitwise",
    items: [
      { raw: "+ +", rendered: "++", label: "increment" },
      { raw: "- -", rendered: "--", label: "decrement" },
      { raw: "* *", rendered: "**", label: "exponent / glob" },
      { raw: "> >", rendered: ">>", label: "right shift" },
      { raw: "< <", rendered: "<<", label: "left shift" },
      { raw: "> > >", rendered: ">>>", label: "unsigned right shift" },
    ],
  },
  {
    title: "Comments",
    items: [
      { raw: "/ /", rendered: "//", label: "line comment" },
      { raw: "/ *", rendered: "/*", label: "open block comment" },
      { raw: "* /", rendered: "*/", label: "close block comment" },
      { raw: "< ! - -", rendered: "<!--", label: "open HTML comment" },
      { raw: "- - >", rendered: "-->", label: "close HTML comment" },
    ],
  },
  {
    title: "Punctuation",
    items: [
      { raw: ": :", rendered: "::", label: "double colon" },
      { raw: ". .", rendered: "..", label: "range" },
      { raw: ". . .", rendered: "...", label: "spread" },
      { raw: "# !", rendered: "#!", label: "shebang" },
    ],
  },
]

export const Ligatures: StoryObj = {
  name: "Ligatures",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-mono"), color: cssVar("--fg") }}>
      {LIGATURE_GROUPS.map(({ title, items }) => (
        <div key={title} style={{ marginBottom: cssVar("--sp-6") }}>
          <p style={{ fontSize: cssVar("--fs-xs"), color: cssVar("--fg-subtle"), fontWeight: 400, margin: "0 0 1rem" }}>
            {title}
          </p>
          {items.map(({ raw, rendered, label }) => (
            <div
              key={rendered}
              style={{ display: "flex", alignItems: "baseline", gap: cssVar("--sp-5"), marginBottom: cssVar("--sp-3") }}
            >
              <span
                style={{ fontSize: cssVar("--fs-md"), fontWeight: 400, color: cssVar("--fg-subtle"), minWidth: "5rem" }}
              >
                {raw}
              </span>
              <span style={{ fontSize: cssVar("--fs-md"), color: cssVar("--fg-subtle") }}>renders</span>
              <span style={{ fontSize: cssVar("--fs-md"), fontWeight: 400, minWidth: "3rem" }}>{rendered}</span>
              <span style={{ fontSize: cssVar("--fs-md"), color: cssVar("--fg-subtle") }}>{label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}

// ---- Disambiguation ----

export const Disambiguation: StoryObj = {
  name: "Disambiguation",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-mono"), color: cssVar("--fg") }}>
      <p style={{ fontSize: cssVar("--fs-2xl"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>0O</p>
      <Note label="Zero VS uppercase letter O" />

      <p style={{ fontSize: cssVar("--fs-2xl"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>1lI|</p>
      <Note label="One VS lowercase l VS uppercase I VS pipe" />

      <p style={{ fontSize: cssVar("--fs-2xl"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>2Z</p>
      <Note label="Two VS uppercase letter Z" />

      <p style={{ fontSize: cssVar("--fs-2xl"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>5S</p>
      <Note label="Five VS uppercase letter S" />

      <p style={{ fontSize: cssVar("--fs-2xl"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>7T</p>
      <Note label="Seven VS uppercase letter T" />

      <p style={{ fontSize: cssVar("--fs-2xl"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>8B</p>
      <Note label="Eight VS uppercase letter B" />
    </div>
  ),
}

// ---- Character Set ----

export const CharacterSet: StoryObj = {
  name: "Character Set",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-mono"), color: cssVar("--fg") }}>
      <p style={{ fontSize: cssVar("--fs-lg"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
        ABCDEFGHIJKLMNOPQRSTUVWXYZ
      </p>
      <Note label="Uppercase" />

      <p style={{ fontSize: cssVar("--fs-lg"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
        abcdefghijklmnopqrstuvwxyz
      </p>
      <Note label="Lowercase" />

      <p style={{ fontSize: cssVar("--fs-lg"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
        0123456789
      </p>
      <Note label="numerals" />

      <p style={{ fontSize: cssVar("--fs-lg"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
        {"! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~"}
      </p>
      <Note label="ASCII punctuation and symbols" />

      <p style={{ fontSize: cssVar("--fs-lg"), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
        Áá Àà Ââ Éé Èè Êê Ëë Îî Ïï Ôô Ùù Ûû Üü Ÿÿ Æœ Çç
      </p>
      <Note label="French diacritics" />
    </div>
  ),
}

// ---- Specimen ----

export const Specimen: StoryObj = {
  name: "Specimen",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-mono"), color: cssVar("--fg") }}>
      <Note label="JetBrains Mono: recommended code combinations" />

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
      <Note label="Editor:     fontSize: --fs-base     fontWeight: 400     lineHeight: --lh-snug" />

      <pre
        style={{
          fontFamily: cssVar("--font-mono"),
          fontSize: cssVar("--fs-sm"),
          fontWeight: 400,
          lineHeight: cssVar("--lh-snug"),
          margin: 0,
        }}
      >
        {'$ npm install @salimdellali/ui\nadded 1 package in 0.42s\n$ git commit -m "feat: launch sequence initiated"'}
      </pre>
      <Note label="Terminal:     fontSize: --fs-sm     fontWeight: 400     lineHeight: --lh-snug" />

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
      <Note label="Comment:     fontSize: --fs-base     fontWeight: 400     fontStyle: italic     lineHeight: --lh-snug" />
    </div>
  ),
}
