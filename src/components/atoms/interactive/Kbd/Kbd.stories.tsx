import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "storybook/test"
import { Kbd, type KbdProps } from "./Kbd"

const meta: Meta<typeof Kbd> = {
  title: "Components/Atoms/Interactive/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A keyboard key. Renders a `<kbd>` styled as a keycap. For a key combination, nest `Kbd` elements inside an outer `Kbd`, as the HTML spec describes: the outer one becomes an unstyled group and each inner one is a key. Accepts all standard HTML attributes.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Key name, or nested `Kbd` elements with separators for a combination.",
      control: "text",
    },
    ref: {
      description: "Ref to the underlying `<kbd>` element.",
      control: false,
    },
    className: {
      description: "Additional CSS classes appended to `sd-kbd`.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof Kbd>

const prose = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--fs-base)",
  lineHeight: "var(--lh-loose)",
  color: "var(--fg)",
  margin: 0,
}

export const Default: Story = {
  args: { children: "Esc" },
}

export const Combination: Story = {
  render: (args) => (
    <Kbd {...args}>
      <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>P</Kbd>
    </Kbd>
  ),
}

export const InText: Story = {
  render: () => (
    <p style={prose}>
      Press <Kbd>/</Kbd> to focus search, or{" "}
      <Kbd>
        <Kbd>⌘</Kbd>+<Kbd>K</Kbd>
      </Kbd>{" "}
      to open the command menu. <Kbd>Esc</Kbd> closes it.
    </p>
  ),
}

const behaviorArgs: KbdProps & Record<`data-${string}`, string> = {
  children: "Enter",
  className: "consumer-class",
  "data-testid": "kbd-enter",
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const key = canvas.getByText("Enter")

    await expect(key.tagName).toBe("KBD")
    await expect(key).toHaveClass("sd-kbd", "consumer-class")
    await expect(key).toHaveAttribute("data-testid", "kbd-enter")
  },
}

export const CombinationBehavior: Story = {
  render: () => (
    <Kbd data-testid="kbd-combo">
      <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>
    </Kbd>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const combo = canvas.getByTestId("kbd-combo")

    await expect(combo.tagName).toBe("KBD")
    await expect(combo).toHaveTextContent("Ctrl+C")
    await expect(combo.querySelectorAll("kbd")).toHaveLength(2)
    await expect(getComputedStyle(combo).borderTopWidth).toBe("0px")
    await expect(getComputedStyle(canvas.getByText("Ctrl")).borderTopWidth).toBe("1px")
  },
}
