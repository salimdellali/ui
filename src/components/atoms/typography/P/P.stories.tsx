import type { Meta, StoryObj } from "@storybook/react"
import type { HTMLAttributes } from "react"
import { expect, within } from "storybook/test"
import { P } from "./P"

const meta: Meta<typeof P> = {
  title: "Components/Atoms/Typography/P",
  component: P,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Body paragraph. Renders a `<p>` with design-system typography tokens applied. Accepts all standard HTML paragraph attributes.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Paragraph text content.",
      control: "text",
    },
    className: {
      description:
        "Additional CSS classes appended to `sd-p`. Use this to extend or override styles at the consumer level.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof P>

export const Default: Story = {
  args: {
    children:
      "From an altitude of 400 kilometers, the curvature of the Earth is unmistakable, a thin blue line separating everything we have ever known from the silent expanse beyond. Each orbit takes 90 minutes. 16 sunrises in a single day, and 16 times the world falls dark again. The station hums at a frequency you feel more than hear, and outside the viewport, the terminator line sweeps across continents without stopping.",
  },
}

const behaviorArgs: HTMLAttributes<HTMLParagraphElement> & Record<`data-${string}`, string> = {
  children: "Paragraph text",
  className: "consumer-class",
  "data-testid": "p-paragraph",
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const paragraph = canvas.getByRole("paragraph")

    await expect(paragraph.tagName).toBe("P")
    await expect(paragraph).toHaveTextContent("Paragraph text")
    await expect(paragraph).toHaveClass("sd-p", "consumer-class")
    await expect(paragraph).toHaveAttribute("data-testid", "p-paragraph")
  },
}
