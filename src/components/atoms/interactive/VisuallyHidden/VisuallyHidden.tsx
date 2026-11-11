import type { ComponentProps } from "react"
import "./VisuallyHidden.css"

export type VisuallyHiddenProps = ComponentProps<"span">

export const VisuallyHidden = ({ className = "", ...rest }: VisuallyHiddenProps) => (
  <span className={`sd-visually-hidden ${className}`.trim()} {...rest} />
)
