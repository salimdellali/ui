import type { BlockquoteHTMLAttributes } from "react"
import "./Blockquote.css"

export const Blockquote = ({ className = "", ...rest }: BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
  <blockquote className={`sd-blockquote ${className}`.trim()} {...rest} />
)
