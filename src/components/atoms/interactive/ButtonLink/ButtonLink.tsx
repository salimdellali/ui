import type { ComponentProps, ReactNode } from "react"
import { VisuallyHidden } from "../VisuallyHidden"
import "../Button/Button.css"

export type ButtonLinkProps = Omit<ComponentProps<"a">, "children" | "href"> & {
  label: string
  href: string
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  isIconOnly?: boolean
  isFullWidth?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  newTabLabel?: string
}

export const ButtonLink = ({
  label,
  href,
  variant = "primary",
  size = "md",
  isIconOnly = false,
  isFullWidth = false,
  startIcon,
  endIcon,
  newTabLabel = "opens in a new tab",
  className = "",
  target,
  rel,
  ...rest
}: ButtonLinkProps) => {
  const opensNewTab = target === "_blank"

  return (
    <a
      href={href}
      className={`sd-button ${className}`.trim()}
      data-variant={variant}
      data-size={size}
      data-icon-only={isIconOnly || undefined}
      data-full-width={isFullWidth || undefined}
      aria-label={isIconOnly ? (opensNewTab ? `${label} (${newTabLabel})` : label) : undefined}
      target={target}
      rel={opensNewTab ? `noopener noreferrer ${rel ?? ""}`.trim() : rel}
      {...rest}
    >
      {startIcon && (
        <span className="sd-button__icon" aria-hidden="true">
          {startIcon}
        </span>
      )}
      {!isIconOnly && <span className="sd-button__label">{label}</span>}
      {endIcon && !isIconOnly && (
        <span className="sd-button__icon" aria-hidden="true">
          {endIcon}
        </span>
      )}
      {opensNewTab && !isIconOnly && <VisuallyHidden> ({newTabLabel})</VisuallyHidden>}
    </a>
  )
}
