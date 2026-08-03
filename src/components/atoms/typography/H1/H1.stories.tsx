import type { Meta, StoryObj } from "@storybook/react"
import type { HTMLAttributes } from "react"
import { expect, within } from "storybook/test"
import { H1 } from "./H1"

const meta: Meta<typeof H1> = {
  title: "Components/Atoms/Typography/H1",
  component: H1,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Page-level heading. Renders an `<h1>` with design-system typography tokens applied. Accepts all standard HTML heading attributes.",
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
        "Additional CSS classes appended to `sd-h1`. Use this to extend or override styles at the consumer level.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof H1>

export const Default: Story = {
  args: { children: "Chasing 16 sunrises over nominal software. Orbiting momentum." },
}

const behaviorArgs: HTMLAttributes<HTMLHeadingElement> & Record<`data-${string}`, string> = {
  children: "Heading text",
  className: "consumer-class",
  "data-testid": "h1-heading",
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const heading = canvas.getByRole("heading", { level: 1, name: "Heading text" })

    await expect(heading.tagName).toBe("H1")
    await expect(heading).toHaveClass("sd-h1", "consumer-class")
    await expect(heading).toHaveAttribute("data-testid", "h1-heading")
  },
}
