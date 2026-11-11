import type { ComponentProps, MouseEvent } from "react"
import "./Tag.css"

export type TagProps = ComponentProps<"span"> & {
  variant?: "neutral" | "outline" | "success" | "warning" | "danger" | "info"
} & (
    | { onDismiss: (event: MouseEvent<HTMLButtonElement>) => void; dismissLabel: string }
    | { onDismiss?: undefined; dismissLabel?: string }
  )

export const Tag = ({ variant = "neutral", onDismiss, dismissLabel, className = "", children, ...rest }: TagProps) => (
  <span className={`sd-tag ${className}`.trim()} data-variant={variant} {...rest}>
    {children}
    {onDismiss && (
      <button type="button" className="sd-tag__dismiss" aria-label={dismissLabel} onClick={onDismiss}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    )}
  </span>
)
