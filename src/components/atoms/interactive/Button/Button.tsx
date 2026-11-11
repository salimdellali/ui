import type { ComponentProps, MouseEvent, ReactNode } from "react"
import { Spinner } from "../Spinner"
import "./Button.css"

export type ButtonProps = Omit<ComponentProps<"button">, "children" | "disabled"> & {
  label: string
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  isDisabled?: boolean
  isLoading?: boolean
  isIconOnly?: boolean
  isFullWidth?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const preventClick = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault()

export const Button = ({
  label,
  variant = "primary",
  size = "md",
  isDisabled = false,
  isLoading = false,
  isIconOnly = false,
  isFullWidth = false,
  startIcon,
  endIcon,
  className = "",
  type = "button",
  onClick,
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    className={`sd-button ${className}`.trim()}
    data-variant={variant}
    data-size={size}
    data-icon-only={isIconOnly || undefined}
    data-full-width={isFullWidth || undefined}
    data-loading={isLoading || undefined}
    aria-label={isIconOnly ? label : undefined}
    aria-busy={isLoading || undefined}
    aria-disabled={isLoading || undefined}
    {...rest}
    disabled={isDisabled}
    // Loading keeps the button focusable (no native disabled), so clicks and
    // implicit form submission are swallowed here instead.
    onClick={isLoading ? preventClick : onClick}
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
    {isLoading && <Spinner className="sd-button__spinner" aria-hidden="true" />}
  </button>
)
