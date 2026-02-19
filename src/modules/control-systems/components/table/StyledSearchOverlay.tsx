import { cn } from '@/lib/utils'

interface StyledSearchOverlayProps {
    value: string
    className?: string
}

/**
 * Overlay component that displays search text with styled asterisks.
 * Renders over the native input to provide visual highlighting of search pattern characters.
 * Asterisks (*) are displayed in bold, larger font, and lime color.
 */
export const StyledSearchOverlay = ({ value, className }: StyledSearchOverlayProps) => {
    const ASTERISK = '*'

    if (!value) return null

    // Only show overlay if value contains asterisks
    const hasAsterisk = value.includes('*')

    // If no asterisks, show plain text (no splitting needed)
    if (!hasAsterisk) {
        return (
            <div
                className={cn(
                    'absolute inset-0 flex items-center pl-10 pr-10 pointer-events-none',
                    'text-sm overflow-hidden whitespace-nowrap',
                    className,
                )}
                aria-hidden="true"
            >
                <span className="text-foreground/90">{value}</span>
            </div>
        )
    }

    // Split text by asterisks while keeping them in the result
    const parts = value.split(/(\*)/).filter(Boolean) // Remove empty strings

    return (
        <div
            className={cn(
                'absolute inset-0 flex items-center pl-10 pr-10 pointer-events-none',
                'text-sm overflow-hidden whitespace-nowrap',
                className,
            )}
            aria-hidden="true"
        >
            <span className="text-foreground/90">
                {parts.map((part, i) =>
                    part === ASTERISK ? (
                        <span key={i} className="font-bold text-lime-600 dark:text-lime-400">
                            {ASTERISK}
                        </span>
                    ) : (
                        <span key={i}>{part}</span>
                    ),
                )}
            </span>
        </div>
    )
}
