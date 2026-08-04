import type { Meta, StoryObj } from "@storybook/react"
import type { HTMLAttributes } from "react"
import { expect, within } from "storybook/test"
import { Lead } from "./Lead"

const meta: Meta<typeof Lead> = {
  title: "Components/Atoms/Typography/Lead",
  component: Lead,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Intro paragraph. Renders a `<p>` with larger, more spacious typography tokens, meant to follow a heading and set up a section. Accepts all standard HTML paragraph attributes.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Lead paragraph text content.",
      control: "text",
    },
    className: {
      description:
        "Additional CSS classes appended to `sd-lead`. Use this to extend or override styles at the consumer level.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof Lead>

export const Default: Story = {
  args: {
    children:
      "Chasing 16 sunrises over nominal software. Orbiting momentum, shipping component by component until the design system holds its own weight.",
  },
}

const behaviorArgs: HTMLAttributes<HTMLParagraphElement> & Record<`data-${string}`, string> = {
  children: "Lead text",
  className: "consumer-class",
  "data-testid": "lead-paragraph",
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const paragraph = canvas.getByRole("paragraph")

    await expect(paragraph.tagName).toBe("P")
    await expect(paragraph).toHaveTextContent("Lead text")
    await expect(paragraph).toHaveClass("sd-lead", "consumer-class")
    await expect(paragraph).toHaveAttribute("data-testid", "lead-paragraph")
  },
}
