import type { Meta, StoryObj } from "@storybook/react"
import type { HTMLAttributes } from "react"
import { expect, within } from "storybook/test"
import { H3 } from "./H3"

const meta: Meta<typeof H3> = {
  title: "Components/Atoms/Typography/H3",
  component: H3,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Subsection-level heading. Renders an `<h3>` with design-system typography tokens applied. Accepts all standard HTML heading attributes.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Heading text content.",
      control: "text",
    },
    className: {
      description:
        "Additional CSS classes appended to `sd-h3`. Use this to extend or override styles at the consumer level.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof H3>

export const Default: Story = {
  args: { children: "Chasing 16 sunrises over nominal software. Orbiting momentum." },
}

const behaviorArgs: HTMLAttributes<HTMLHeadingElement> & Record<`data-${string}`, string> = {
  children: "Heading text",
  className: "consumer-class",
  "data-testid": "h3-heading",
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const heading = canvas.getByRole("heading", { level: 3, name: "Heading text" })

    await expect(heading.tagName).toBe("H3")
    await expect(heading).toHaveClass("sd-h3", "consumer-class")
    await expect(heading).toHaveAttribute("data-testid", "h3-heading")
  },
}
