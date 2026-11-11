import type { ComponentProps } from "react"
import "./BadgeDot.css"

export type BadgeDotProps = ComponentProps<"span"> & {
  variant?: "neutral" | "success" | "warning" | "danger" | "info"
}

export const BadgeDot = ({ variant = "neutral", className = "", ...rest }: BadgeDotProps) => (
  <span className={`sd-badge-dot ${className}`.trim()} data-variant={variant} {...rest} />
)
