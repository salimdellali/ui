import type { HTMLAttributes } from "react"
import "./H1.css"

export const H1 = ({ className = "", ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={`sd-h1 ${className}`.trim()} {...rest} />
)
