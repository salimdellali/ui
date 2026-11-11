import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, userEvent, within } from "storybook/test"
import { Button, type ButtonProps } from "./Button"

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Interactive/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Triggers an action. Renders a native `<button>` with `type="button"` unless told otherwise. The text comes from the required `label` prop, never from `children`, so every button has an accessible name, including icon-only ones. For navigation use `Link` or `ButtonLink` instead. Accepts all standard HTML button attributes except `children` and `disabled` (use `isDisabled`).',
      },
    },
  },
  args: {
    label: "Save changes",
    onClick: fn(),
  },
  argTypes: {
    label: {
      description:
        "Accessible name. Rendered as the visible text, or as `aria-label` when `isIconOnly` is set. Required.",
      control: "text",
    },
    variant: {
      description:
        "Visual style. `primary` for the main action, `secondary` for alternatives, `ghost` for low-emphasis actions, `danger` for destructive ones.",
      control: "inline-radio",
      options: ["primary", "secondary", "ghost", "danger"],
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      description: "Control size.",
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    isDisabled: {
      description: "Sets the native `disabled` attribute. The button leaves the tab order and ignores clicks.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    isLoading: {
      description:
        "Shows a spinner over the content without changing the width. Sets `aria-busy` and `aria-disabled`, ignores clicks, and stays focusable.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    isIconOnly: {
      description: "Renders only `startIcon` in a square button. `label` becomes the `aria-label`.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    isFullWidth: {
      description: "Stretches the button to the width of its container.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    startIcon: {
      description:
        "Icon element placed before the label. Any `ReactNode`; an `<svg>` is sized to the text. Decorative, hidden from assistive tech.",
      control: false,
    },
    endIcon: {
      description: "Icon element placed after the label. Ignored when `isIconOnly` is set.",
      control: false,
    },
    type: {
      description: "Native button type.",
      control: "inline-radio",
      options: ["button", "submit", "reset"],
      table: { defaultValue: { summary: "button" } },
    },
    onClick: {
      description: "Called on click and on Enter or Space. Not called while disabled or loading.",
    },
    ref: {
      description: "Ref to the underlying `<button>` element.",
      control: false,
    },
    className: {
      description: "Additional CSS classes appended to `sd-button`.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof Button>

const row = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--sp-3)" } as const

export const Primary: Story = {
  args: { variant: "primary" },
}

export const Secondary: Story = {
  args: { variant: "secondary" },
}

export const Ghost: Story = {
  args: { variant: "ghost" },
}

export const Danger: Story = {
  args: { variant: "danger", label: "Delete project" },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} size="sm" label="Small" />
      <Button {...args} size="md" label="Medium" />
      <Button {...args} size="lg" label="Large" />
    </div>
  ),
}

export const WithIcons: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} label="New project" startIcon={<PlusIcon />} />
      <Button {...args} variant="secondary" label="Continue" endIcon={<ArrowIcon />} />
    </div>
  ),
}

export const IconOnly: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} isIconOnly size="sm" label="Close" startIcon={<CloseIcon />} />
      <Button {...args} isIconOnly variant="secondary" label="Add item" startIcon={<PlusIcon />} />
      <Button {...args} isIconOnly variant="ghost" size="lg" label="Close" startIcon={<CloseIcon />} />
    </div>
  ),
}

export const Loading: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} isLoading />
      <Button {...args} isLoading variant="secondary" />
      <Button {...args} isLoading variant="ghost" />
      <Button {...args} isLoading variant="danger" />
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} isDisabled />
      <Button {...args} isDisabled variant="secondary" />
      <Button {...args} isDisabled variant="ghost" />
      <Button {...args} isDisabled variant="danger" />
    </div>
  ),
}

export const FullWidth: Story = {
  args: { isFullWidth: true },
}

const VARIANTS = ["primary", "secondary", "ghost", "danger"] as const
const SIZES = ["sm", "md", "lg"] as const

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--sp-4)" }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={row}>
          {SIZES.map((size) => (
            <Button key={size} {...args} variant={variant} size={size} label={`${variant} ${size}`} />
          ))}
          <Button {...args} variant={variant} label="With icon" startIcon={<PlusIcon />} />
          <Button {...args} variant={variant} isIconOnly label="Add" startIcon={<PlusIcon />} />
          <Button {...args} variant={variant} isLoading label="Loading" />
          <Button {...args} variant={variant} isDisabled label="Disabled" />
        </div>
      ))}
    </div>
  ),
}

const behaviorArgs: ButtonProps & Record<`data-${string}`, string> = {
  label: "Save changes",
  className: "consumer-class",
  "data-testid": "button-save",
  onClick: fn(),
  ref: fn(),
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Save changes" })

    await expect(button.tagName).toBe("BUTTON")
    await expect(button).toHaveAttribute("type", "button")
    await expect(button).toHaveClass("sd-button", "consumer-class")
    await expect(button).toHaveAttribute("data-testid", "button-save")
    await expect(button).toHaveAttribute("data-variant", "primary")
    await expect(button).toHaveAttribute("data-size", "md")
    await expect(args.ref).toHaveBeenCalledWith(button)

    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)

    button.blur()
    await userEvent.tab()
    await expect(button).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onClick).toHaveBeenCalledTimes(2)
    await userEvent.keyboard(" ")
    await expect(args.onClick).toHaveBeenCalledTimes(3)
  },
}

export const DisabledBehavior: Story = {
  args: { isDisabled: true, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Save changes" })

    await expect(button).toBeDisabled()
    await userEvent.click(button, { pointerEventsCheck: 0 })
    await expect(args.onClick).not.toHaveBeenCalled()

    await userEvent.tab()
    await expect(button).not.toHaveFocus()
  },
}

const onSubmit = fn((event: React.FormEvent) => event.preventDefault())

export const LoadingBehavior: Story = {
  args: { isLoading: true, type: "submit", onClick: fn() },
  decorators: [(Story) => <form onSubmit={onSubmit}>{Story()}</form>],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Save changes" })

    await expect(button).toHaveAttribute("aria-busy", "true")
    await expect(button).toHaveAttribute("aria-disabled", "true")
    await expect(button).not.toBeDisabled()

    await userEvent.tab()
    await expect(button).toHaveFocus()
    await userEvent.click(button)
    await userEvent.keyboard("{Enter}")
    await expect(args.onClick).not.toHaveBeenCalled()
    await expect(onSubmit).not.toHaveBeenCalled()
  },
}

export const IconOnlyBehavior: Story = {
  args: { isIconOnly: true, label: "Close dialog", startIcon: <CloseIcon />, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Close dialog" })

    await expect(button).toHaveAttribute("aria-label", "Close dialog")
    await expect(button).not.toHaveTextContent("Close dialog")
    await expect(button.getBoundingClientRect().width).toBe(button.getBoundingClientRect().height)

    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}
