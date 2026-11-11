import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, userEvent, within } from "storybook/test"
import { Tag, type TagProps } from "./Tag"

const meta: Meta<typeof Tag> = {
  title: "Components/Atoms/Interactive/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Short label for a category, status or attribute. Renders a `<span>` pill in the mono font. Display-only by default. Pass `onDismiss` to add a real `<button>` at the end; `dismissLabel` is then required as that button's accessible name. Accepts all standard HTML span attributes.",
      },
    },
  },
  args: {
    children: "TypeScript",
  },
  argTypes: {
    children: {
      description: "Tag text.",
      control: "text",
    },
    variant: {
      description:
        "Visual style. `neutral` and `outline` carry no meaning; `success`, `warning`, `danger` and `info` use the status tokens. Color is never the only signal, so keep the text explicit.",
      control: "inline-radio",
      options: ["neutral", "outline", "success", "warning", "danger", "info"],
      table: { defaultValue: { summary: "neutral" } },
    },
    onDismiss: {
      description:
        "Adds a dismiss button and is called when it is activated. The tag does not remove itself; the parent owns that state.",
    },
    dismissLabel: {
      description:
        'Accessible name of the dismiss button, for example `"Remove TypeScript"`. Required when `onDismiss` is set.',
      control: "text",
    },
    ref: {
      description: "Ref to the underlying `<span>` element.",
      control: false,
    },
    className: {
      description: "Additional CSS classes appended to `sd-tag`.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof Tag>

const row = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--sp-3)" } as const

export const Neutral: Story = {}

export const Outline: Story = {
  args: { variant: "outline" },
}

export const Success: Story = {
  args: { variant: "success", children: "Published" },
}

export const Warning: Story = {
  args: { variant: "warning", children: "Deprecated" },
}

export const Danger: Story = {
  args: { variant: "danger", children: "Breaking" },
}

export const Info: Story = {
  args: { variant: "info", children: "Beta" },
}

export const Dismissible: Story = {
  args: { onDismiss: fn(), dismissLabel: "Remove TypeScript" },
}

const VARIANTS = ["neutral", "outline", "success", "warning", "danger", "info"] as const

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--sp-4)" }}>
      <div style={row}>
        {VARIANTS.map((variant) => (
          <Tag key={variant} variant={variant}>
            {variant}
          </Tag>
        ))}
      </div>
      <div style={row}>
        {VARIANTS.map((variant) => (
          <Tag key={variant} variant={variant} onDismiss={fn()} dismissLabel={`Remove ${variant}`}>
            {variant}
          </Tag>
        ))}
      </div>
    </div>
  ),
}

const behaviorArgs: TagProps & Record<`data-${string}`, string> = {
  children: "TypeScript",
  variant: "info",
  className: "consumer-class",
  "data-testid": "tag-typescript",
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tag = canvas.getByText("TypeScript")

    await expect(tag.tagName).toBe("SPAN")
    await expect(tag).toHaveClass("sd-tag", "consumer-class")
    await expect(tag).toHaveAttribute("data-variant", "info")
    await expect(tag).toHaveAttribute("data-testid", "tag-typescript")
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument()
  },
}

export const DismissBehavior: Story = {
  args: { onDismiss: fn(), dismissLabel: "Remove TypeScript" },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const dismiss = canvas.getByRole("button", { name: "Remove TypeScript" })

    await expect(dismiss.tagName).toBe("BUTTON")
    await expect(dismiss).toHaveAttribute("type", "button")

    await userEvent.click(dismiss)
    await expect(args.onDismiss).toHaveBeenCalledTimes(1)

    dismiss.blur()
    await userEvent.tab()
    await expect(dismiss).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onDismiss).toHaveBeenCalledTimes(2)
    await userEvent.keyboard(" ")
    await expect(args.onDismiss).toHaveBeenCalledTimes(3)
  },
}
