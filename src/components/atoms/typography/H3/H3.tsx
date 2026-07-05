import type { HTMLAttributes } from "react"
import "./H3.css"

export const H3 = ({ className = "", ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`sd-h3 ${className}`.trim()} {...rest} />
)
