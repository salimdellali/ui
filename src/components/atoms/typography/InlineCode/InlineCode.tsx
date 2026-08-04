import type { HTMLAttributes } from "react"
import "./InlineCode.css"

export const InlineCode = ({ className = "", ...rest }: HTMLAttributes<HTMLElement>) => (
  <code className={`sd-inline-code ${className}`.trim()} {...rest} />
)
