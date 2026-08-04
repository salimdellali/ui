import type { Meta, StoryObj } from "@storybook/react"
import type { HTMLAttributes } from "react"
import { expect, within } from "storybook/test"
import { InlineCode } from "./InlineCode"

const meta: Meta<typeof InlineCode> = {
  title: "Components/Atoms/Typography/InlineCode",
  component: InlineCode,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Inline code snippet. Renders a `<code>` with monospace typography and a subtle background pill, meant to sit inline within a sentence. Accepts all standard HTML attributes.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Code text content.",
      control: "text",
    },
    className: {
      description:
        "Additional CSS classes appended to `sd-inline-code`. Use this to extend or override styles at the consumer level.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof InlineCode>

export const Default: Story = {
  args: {
    children: "npm install @salimdellali/ui",
  },
}

const behaviorArgs: HTMLAttributes<HTMLElement> & Record<`data-${string}`, string> = {
  children: "const x = 10",
  className: "consumer-class",
  "data-testid": "inline-code-snippet",
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const code = canvas.getByRole("code")

    await expect(code.tagName).toBe("CODE")
    await expect(code).toHaveTextContent("const x = 10")
    await expect(code).toHaveClass("sd-inline-code", "consumer-class")
    await expect(code).toHaveAttribute("data-testid", "inline-code-snippet")
  },
}
