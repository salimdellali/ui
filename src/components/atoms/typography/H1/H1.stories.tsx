import type { Meta, StoryObj } from "@storybook/react"
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

