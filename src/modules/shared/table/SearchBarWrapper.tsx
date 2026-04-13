import type { ReactNode } from 'react'

interface Props {
    children: ReactNode
    className?: string
}

/**
 * A wrapper component for table headers that provides:
 * - Sticky positioning
 * - Consistent padding and border styling
 *
 * Use this as a base for custom table headers with inline filters.
 */
export const SearchBarWrapper = ({ children, className }: Props) => {
    return (
        <div
            id="search-bar"
            className={`sticky top-0 z-10 bg-background border-b px-4 py-2 ${className ?? ''}`}
        >
            {children}
        </div>
    )
}
