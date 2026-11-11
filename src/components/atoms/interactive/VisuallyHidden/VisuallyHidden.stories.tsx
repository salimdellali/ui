import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "storybook/test"
import { VisuallyHidden, type VisuallyHiddenProps } from "./VisuallyHidden"

const meta: Meta<typeof VisuallyHidden> = {
  title: "Components/Atoms/Interactive/VisuallyHidden",
  component: VisuallyHidden,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text for screen readers only. Renders a `<span>` that takes no visual space but stays in the accessibility tree. Use it to name icon-only controls or to add context a sighted user gets from layout. Accepts all standard HTML span attributes.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Content announced by assistive tech and hidden from sight.",
      control: "text",
    },
    className: {
      description: "Additional CSS classes appended to `sd-visually-hidden`.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof VisuallyHidden>

export const Default: Story = {
  args: {
    children: "This sentence is only announced by screen readers.",
  },
  render: (args) => (
    <p style={{ fontFamily: "var(--font-body)", color: "var(--fg)", margin: 0 }}>
      Nothing is visible after this colon:
      <VisuallyHidden {...args} />
    </p>
  ),
}

const behaviorArgs: VisuallyHiddenProps & Record<`data-${string}`, string> = {
  children: "Hidden text",
  className: "consumer-class",
  "data-testid": "visually-hidden-text",
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const hidden = canvas.getByText("Hidden text")

    await expect(hidden.tagName).toBe("SPAN")
    await expect(hidden).toHaveClass("sd-visually-hidden", "consumer-class")
    await expect(hidden).toHaveAttribute("data-testid", "visually-hidden-text")
    await expect(hidden.getBoundingClientRect().width).toBe(1)
    await expect(hidden.getBoundingClientRect().height).toBe(1)
  },
}
