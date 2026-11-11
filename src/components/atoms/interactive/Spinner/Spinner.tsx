import type { ComponentProps } from "react"
import { VisuallyHidden } from "../VisuallyHidden"
import "./Spinner.css"

export type SpinnerProps = Omit<ComponentProps<"span">, "children"> & {
  label?: string
  size?: "sm" | "md" | "lg"
}

export const Spinner = ({ label = "Loading", size = "md", className = "", ...rest }: SpinnerProps) => (
  <span role="status" className={`sd-spinner ${className}`.trim()} data-size={size} {...rest}>
    <VisuallyHidden>{label}</VisuallyHidden>
  </span>
)
