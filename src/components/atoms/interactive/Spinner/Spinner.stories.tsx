import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "storybook/test"
import { Spinner, type SpinnerProps } from "./Spinner"

const meta: Meta<typeof Spinner> = {
  title: "Components/Atoms/Interactive/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Loading indicator. Renders a `<span role="status">` with a rotating ring and a visually hidden label, so assistive tech announces it. Inherits its color from the surrounding text. Under `prefers-reduced-motion` the rotation is replaced by a slow fade. Accepts all standard HTML span attributes except `children`.',
      },
    },
  },
  argTypes: {
    label: {
      description: "Text announced by assistive tech. Not visible.",
      control: "text",
      table: { defaultValue: { summary: "Loading" } },
    },
    size: {
      description: "Diameter of the ring.",
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    className: {
      description: "Additional CSS classes appended to `sd-spinner`.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof Spinner>

const row = { display: "flex", alignItems: "center", gap: "var(--sp-5)", color: "var(--fg)" }

export const Default: Story = {
  decorators: [(Story) => <div style={row}>{Story()}</div>],
}

export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      <Spinner {...args} size="sm" label="Loading small" />
      <Spinner {...args} size="md" label="Loading medium" />
      <Spinner {...args} size="lg" label="Loading large" />
    </div>
  ),
}

export const InheritsColor: Story = {
  render: (args) => (
    <div style={{ ...row, color: "var(--danger)" }}>
      <Spinner {...args} />
    </div>
  ),
}

const behaviorArgs: SpinnerProps & Record<`data-${string}`, string> = {
  label: "Saving changes",
  size: "lg",
  className: "consumer-class",
  "data-testid": "spinner-saving",
}

export const Behavior: Story = {
  args: behaviorArgs,
  decorators: [(Story) => <div style={row}>{Story()}</div>],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const spinner = canvas.getByRole("status")

    await expect(spinner.tagName).toBe("SPAN")
    await expect(spinner).toHaveTextContent("Saving changes")
    await expect(spinner).toHaveClass("sd-spinner", "consumer-class")
    await expect(spinner).toHaveAttribute("data-size", "lg")
    await expect(spinner).toHaveAttribute("data-testid", "spinner-saving")
  },
}
