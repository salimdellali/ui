import type { Meta, StoryObj } from "@storybook/react"
import type { BlockquoteHTMLAttributes } from "react"
import { expect, within } from "storybook/test"
import { Blockquote } from "./Blockquote"

const meta: Meta<typeof Blockquote> = {
  title: "Components/Atoms/Typography/Blockquote",
  component: Blockquote,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Quoted content. Renders a `<blockquote>` with an inline-start border and italic, muted typography tokens applied. Accepts all standard HTML blockquote attributes, including `cite`.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Quoted text content.",
      control: "text",
    },
    cite: {
      description: "URL of the source the quote is from.",
      control: "text",
    },
    className: {
      description:
        "Additional CSS classes appended to `sd-blockquote`. Use this to extend or override styles at the consumer level.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof Blockquote>

export const Default: Story = {
  args: {
    children:
      "Chasing 16 sunrises over nominal software. Orbiting momentum until the design system holds its own weight.",
  },
}

const behaviorArgs: BlockquoteHTMLAttributes<HTMLQuoteElement> & Record<`data-${string}`, string> = {
  children: "Quoted text",
  className: "consumer-class",
  "data-testid": "blockquote-quote",
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const quote = canvas.getByRole("blockquote")

    await expect(quote.tagName).toBe("BLOCKQUOTE")
    await expect(quote).toHaveTextContent("Quoted text")
    await expect(quote).toHaveClass("sd-blockquote", "consumer-class")
    await expect(quote).toHaveAttribute("data-testid", "blockquote-quote")
  },
}
