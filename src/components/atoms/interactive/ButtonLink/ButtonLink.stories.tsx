import type { Meta, StoryObj } from "@storybook/react"
import type { MouseEvent } from "react"
import { expect, fn, userEvent, within } from "storybook/test"
import { ButtonLink, type ButtonLinkProps } from "./ButtonLink"

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

const meta: Meta<typeof ButtonLink> = {
  title: "Components/Atoms/Interactive/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A link that looks like a `Button`. Renders a native `<a>` and always requires `href`, so navigation keeps link semantics (open in new tab, copy address, visited history) while calls to action get button styling. Shares `variant`, `size` and the icon slots with `Button`. There is no disabled or loading state: a link that cannot be followed should not be rendered as a link. With `target="_blank"` it adds `rel="noopener noreferrer"` and a hidden "opens in a new tab" note.',
      },
    },
  },
  args: {
    label: "Get started",
    href: "#get-started",
  },
  argTypes: {
    label: {
      description:
        "Accessible name. Rendered as the visible text, or as `aria-label` when `isIconOnly` is set. Required.",
      control: "text",
    },
    href: {
      description: "Destination URL. Required.",
      control: "text",
    },
    variant: {
      description: "Visual style, same values as `Button`.",
      control: "inline-radio",
      options: ["primary", "secondary", "ghost", "danger"],
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      description: "Control size, same values as `Button`.",
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    isIconOnly: {
      description: "Renders only `startIcon` in a square link. `label` becomes the `aria-label`.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    isFullWidth: {
      description: "Stretches the link to the width of its container.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    startIcon: {
      description: "Icon element placed before the label. Decorative, hidden from assistive tech.",
      control: false,
    },
    endIcon: {
      description: "Icon element placed after the label. Ignored when `isIconOnly` is set.",
      control: false,
    },
    target: {
      description: 'Native anchor target. `"_blank"` turns on the new-tab handling.',
      control: "inline-radio",
      options: [undefined, "_blank"],
    },
    newTabLabel: {
      description: 'Hidden text appended for assistive tech when `target="_blank"`. Override to translate.',
      control: "text",
      table: { defaultValue: { summary: "opens in a new tab" } },
    },
    ref: {
      description: "Ref to the underlying `<a>` element.",
      control: false,
    },
    className: {
      description: "Additional CSS classes appended to `sd-button`.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof ButtonLink>

const row = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--sp-3)" } as const

export const Default: Story = {}

export const WithIcon: Story = {
  args: { endIcon: <ArrowIcon /> },
}

export const NewTab: Story = {
  args: { label: "View on GitHub", href: "https://example.com", target: "_blank", variant: "secondary" },
}

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--sp-4)" }}>
      {(["primary", "secondary", "ghost", "danger"] as const).map((variant) => (
        <div key={variant} style={row}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <ButtonLink key={size} {...args} variant={variant} size={size} label={`${variant} ${size}`} />
          ))}
          <ButtonLink {...args} variant={variant} label="With icon" endIcon={<ArrowIcon />} />
          <ButtonLink {...args} variant={variant} isIconOnly label="Next page" startIcon={<ArrowIcon />} />
        </div>
      ))}
    </div>
  ),
}

const behaviorArgs: ButtonLinkProps & Record<`data-${string}`, string> = {
  label: "Get started",
  href: "#get-started",
  className: "consumer-class",
  "data-testid": "button-link-start",
  onClick: fn((event: MouseEvent) => event.preventDefault()),
  ref: fn(),
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole("link", { name: "Get started" })

    await expect(link.tagName).toBe("A")
    await expect(link).toHaveAttribute("href", "#get-started")
    await expect(link).toHaveClass("sd-button", "consumer-class")
    await expect(link).toHaveAttribute("data-testid", "button-link-start")
    await expect(link).toHaveAttribute("data-variant", "primary")
    await expect(link).toHaveAttribute("data-size", "md")
    await expect(args.ref).toHaveBeenCalledWith(link)

    await userEvent.click(link)
    await expect(args.onClick).toHaveBeenCalledTimes(1)

    link.blur()
    await userEvent.tab()
    await expect(link).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onClick).toHaveBeenCalledTimes(2)
  },
}

export const NewTabBehavior: Story = {
  args: { label: "View on GitHub", href: "https://example.com", target: "_blank" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole("link", { name: "View on GitHub (opens in a new tab)" })

    await expect(link).toHaveAttribute("rel", "noopener noreferrer")
  },
}

export const IconOnlyBehavior: Story = {
  args: {
    label: "Next page",
    isIconOnly: true,
    startIcon: <ArrowIcon />,
    target: "_blank",
    href: "https://example.com",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole("link", { name: "Next page (opens in a new tab)" })

    await expect(link).not.toHaveTextContent("Next page")
    await expect(link.getBoundingClientRect().width).toBe(link.getBoundingClientRect().height)
  },
}
