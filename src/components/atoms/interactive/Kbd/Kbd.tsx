import type { ComponentProps } from "react"
import "./Kbd.css"

export type KbdProps = ComponentProps<"kbd">

export const Kbd = ({ className = "", ...rest }: KbdProps) => <kbd className={`sd-kbd ${className}`.trim()} {...rest} />
