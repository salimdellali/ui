import type { Meta, StoryObj } from "@storybook/react"
import { Entry, Note, SectionLabel } from "../story-utils"
import { type CSSToken, cssVar } from "../tokens"

const meta: Meta = {
  title: "Tokens/Fonts/JetBrains Mono (Code)",
}
export default meta

const SAMPLE = "const velocity = 7.9e3 // orbital velocity in m/s"

// ---- Font Sizes ----

export const FontSizes: StoryObj = {
  name: "Font Sizes",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-mono"), color: cssVar("--fg") }}>
      {(["--fs-lg", "--fs-md", "--fs-base", "--fs-sm", "--fs-xs"] satisfies CSSToken[]).map((token) => (
        <Entry key={token}>
          <p style={{ fontSize: cssVar(token), fontWeight: 400, lineHeight: cssVar("--lh-snug"), margin: 0 }}>
            {SAMPLE}
          </p>
          <Note label={`fontSize: ${token}`} />
        </Entry>
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
        <Entry key={title}>
          <SectionLabel>{title}</SectionLabel>
          <div>
            {items.map(({ raw, rendered, label }) => (
              <div
                key={rendered}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: cssVar("--sp-5"),
                  marginBottom: cssVar("--sp-3"),
                }}
              >
                <span
                  style={{
                    fontSize: cssVar("--fs-base"),
                    fontWeight: 400,
                    color: cssVar("--fg-subtle"),
                    minWidth: "5rem",
                  }}
                >
                  {raw}
                </span>
                <span style={{ fontSize: cssVar("--fs-base"), color: cssVar("--fg-subtle") }}>renders</span>
                <span style={{ fontSize: cssVar("--fs-base"), fontWeight: 400, minWidth: "3rem" }}>{rendered}</span>
                <span style={{ fontSize: cssVar("--fs-base"), color: cssVar("--fg-subtle") }}>{label}</span>
              </div>
            ))}
          </div>
        </Entry>
      ))}
    </div>
  ),
}

const DISAMBIGUATION_PAIRS = [
  { label: "Zero VS uppercase letter O", chars: "0O" },
  { label: "One VS lowercase l VS uppercase I VS pipe", chars: "1lI|" },
  { label: "Two VS uppercase letter Z", chars: "2Z" },
  { label: "Five VS uppercase letter S", chars: "5S" },
  { label: "Seven VS uppercase letter T", chars: "7T" },
  { label: "Eight VS uppercase letter B", chars: "8B" },
]

// ---- Disambiguation ----

export const Disambiguation: StoryObj = {
  name: "Disambiguation",
  render: () => (
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-mono"), color: cssVar("--fg") }}>
      {DISAMBIGUATION_PAIRS.map(({ label, chars }) => (
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
    <div style={{ padding: cssVar("--sp-6"), fontFamily: cssVar("--font-mono"), color: cssVar("--fg") }}>
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
