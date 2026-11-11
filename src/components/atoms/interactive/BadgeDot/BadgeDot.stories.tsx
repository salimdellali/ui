import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "storybook/test"
import { BadgeDot, type BadgeDotProps } from "./BadgeDot"

const meta: Meta<typeof BadgeDot> = {
  title: "Components/Atoms/Interactive/BadgeDot",
  component: BadgeDot,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Status text with a colored dot in front. Renders a `<span>`. The dot is decorative and invisible to assistive tech, so the text must state the status on its own. Accepts all standard HTML span attributes.",
      },
    },
  },
  args: {
    children: "Operational",
  },
  argTypes: {
    children: {
      description: "Status text. Carries the meaning; the dot only reinforces it.",
      control: "text",
    },
    variant: {
      description: "Dot color, mapped to the status tokens.",
      control: "inline-radio",
      options: ["neutral", "success", "warning", "danger", "info"],
      table: { defaultValue: { summary: "neutral" } },
    },
    ref: {
      description: "Ref to the underlying `<span>` element.",
      control: false,
    },
    className: {
      description: "Additional CSS classes appended to `sd-badge-dot`.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof BadgeDot>

export const Neutral: Story = {
  args: { children: "Draft" },
}

export const Success: Story = {
  args: { variant: "success" },
}

export const Warning: Story = {
  args: { variant: "warning", children: "Degraded" },
}

export const Danger: Story = {
  args: { variant: "danger", children: "Outage" },
}

export const Info: Story = {
  args: { variant: "info", children: "Maintenance" },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-5)" }}>
      <BadgeDot>Draft</BadgeDot>
      <BadgeDot variant="success">Operational</BadgeDot>
      <BadgeDot variant="warning">Degraded</BadgeDot>
      <BadgeDot variant="danger">Outage</BadgeDot>
      <BadgeDot variant="info">Maintenance</BadgeDot>
    </div>
  ),
}

const behaviorArgs: BadgeDotProps & Record<`data-${string}`, string> = {
  children: "Operational",
  variant: "success",
  className: "consumer-class",
  "data-testid": "badge-status",
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText("Operational")

    await expect(badge.tagName).toBe("SPAN")
    await expect(badge).toHaveClass("sd-badge-dot", "consumer-class")
    await expect(badge).toHaveAttribute("data-variant", "success")
    await expect(badge).toHaveAttribute("data-testid", "badge-status")
    await expect(badge.childElementCount).toBe(0)
  },
}
