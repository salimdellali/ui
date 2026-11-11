import type { Meta, StoryObj } from "@storybook/react"
import type { MouseEvent } from "react"
import { expect, fn, userEvent, within } from "storybook/test"
import { Link, type LinkProps } from "./Link"

const meta: Meta<typeof Link> = {
  title: "Components/Atoms/Interactive/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Navigates somewhere. Renders a native `<a>` and always requires `href`. The link text comes from `children` and is the accessible name. With `target="_blank"` it adds `rel="noopener noreferrer"`, a visually hidden "opens in a new tab" note, and a decorative arrow. For a link that looks like a button use `ButtonLink`; for an action use `Button`. Accepts all standard HTML anchor attributes.',
      },
    },
  },
  args: {
    href: "#details",
    children: "Read the details",
  },
  argTypes: {
    children: {
      description: "Link text. This is the accessible name, so describe the destination.",
      control: "text",
    },
    href: {
      description: "Destination URL. Required.",
      control: "text",
    },
    variant: {
      description:
        "`inline` sits inside running text and inherits its typography. `standalone` is for links on their own (navigation, card footers): sets its own body font, size and weight.",
      control: "inline-radio",
      options: ["inline", "standalone"],
      table: { defaultValue: { summary: "inline" } },
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
      description: "Additional CSS classes appended to `sd-link`.",
      control: "text",
    },
  },
}
export default meta

type Story = StoryObj<typeof Link>

const prose = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--fs-base)",
  lineHeight: "var(--lh-loose)",
  color: "var(--fg)",
  margin: 0,
}

export const Inline: Story = {
  render: (args) => (
    <p style={prose}>
      Tokens drive every component. <Link {...args} /> before overriding a style by hand.
    </p>
  ),
}

export const Standalone: Story = {
  args: { variant: "standalone", children: "View all components" },
}

export const NewTab: Story = {
  args: { href: "https://example.com", target: "_blank", children: "Storybook documentation" },
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--sp-4)", justifyItems: "start" }}>
      <p style={prose}>
        See the <Link {...args} /> for the full reference.
      </p>
      <Link {...args} variant="standalone" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--sp-4)", justifyItems: "start" }}>
      <p style={prose}>
        An <Link {...args}>inline link</Link> and an{" "}
        <Link {...args} href="https://example.com" target="_blank">
          inline link to another site
        </Link>{" "}
        inside a sentence.
      </p>
      <Link {...args} variant="standalone">
        Standalone link
      </Link>
      <Link {...args} variant="standalone" href="https://example.com" target="_blank">
        Standalone link to another site
      </Link>
    </div>
  ),
}

const behaviorArgs: LinkProps & Record<`data-${string}`, string> = {
  href: "#details",
  children: "Read the details",
  className: "consumer-class",
  "data-testid": "link-details",
  onClick: fn((event: MouseEvent) => event.preventDefault()),
  ref: fn(),
}

export const Behavior: Story = {
  args: behaviorArgs,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole("link", { name: "Read the details" })

    await expect(link.tagName).toBe("A")
    await expect(link).toHaveAttribute("href", "#details")
    await expect(link).toHaveClass("sd-link", "consumer-class")
    await expect(link).toHaveAttribute("data-testid", "link-details")
    await expect(link).toHaveAttribute("data-variant", "inline")
    await expect(link).not.toHaveAttribute("rel")
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
  args: { href: "https://example.com", target: "_blank", rel: "nofollow", children: "Documentation" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole("link", { name: "Documentation (opens in a new tab)" })

    await expect(link).toHaveAttribute("target", "_blank")
    await expect(link).toHaveAttribute("rel", "noopener noreferrer nofollow")
  },
}
