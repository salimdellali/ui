import type { HTMLAttributes } from "react"
import "./H2.css"

export const H2 = ({ className = "", ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`sd-h2 ${className}`.trim()} {...rest} />
)
