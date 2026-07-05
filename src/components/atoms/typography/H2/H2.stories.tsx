import type { Meta, StoryObj } from "@storybook/react"
import { H2 } from "./H2"

const meta: Meta<typeof H2> = {
  title: "Components/Atoms/Typography/H2",
  component: H2,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Section-level heading. Renders an `<h2>` with design-system typography tokens applied. Accepts all standard HTML heading attributes.",
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
        "Additional CSS classes appended to `sd-h2`. Use this to extend or override styles at the consumer level.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof H2>

export const Default: Story = {
  args: { children: "Chasing 16 sunrises over nominal software. Orbiting momentum." },
}
