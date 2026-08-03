import type { HTMLAttributes } from "react"
import "./P.css"

export const P = ({ className = "", ...rest }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`sd-p ${className}`.trim()} {...rest} />
)
