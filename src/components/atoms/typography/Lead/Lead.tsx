import type { HTMLAttributes } from "react"
import "./Lead.css"

export const Lead = ({ className = "", ...rest }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`sd-lead ${className}`.trim()} {...rest} />
)
