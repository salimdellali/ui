import type { ComponentProps } from "react"
import { VisuallyHidden } from "../VisuallyHidden"
import "./Link.css"

export type LinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string
  variant?: "inline" | "standalone"
  newTabLabel?: string
}

export const Link = ({
  variant = "inline",
  newTabLabel = "opens in a new tab",
  className = "",
  target,
  rel,
  children,
  ...rest
}: LinkProps) => {
  const opensNewTab = target === "_blank"

  return (
    <a
      className={`sd-link ${className}`.trim()}
      data-variant={variant}
      target={target}
      rel={opensNewTab ? `noopener noreferrer ${rel ?? ""}`.trim() : rel}
      {...rest}
    >
      {children}
      {opensNewTab && <VisuallyHidden> ({newTabLabel})</VisuallyHidden>}
    </a>
  )
}
