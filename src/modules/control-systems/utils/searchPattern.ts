export type SearchPattern = 'startsWith' | 'contains' | 'endsWith'

/**
 * Detects the search pattern mode based on asterisk placement in the search value
 * @param value - The search input value
 * @returns The detected pattern type or null if empty
 *
 * @example
 * detectSearchPattern('C01') // 'startsWith'
 * detectSearchPattern('*C01*') // 'contains'
 * detectSearchPattern('*C01') // 'endsWith'
 * detectSearchPattern('C01*') // 'startsWith' (treated as default)
 */
export const detectSearchPattern = (value: string): SearchPattern | null => {
    if (!value || value.trim() === '') return null

    const trimmedValue = value.trim()
    const startsWithAsterisk = trimmedValue.startsWith('*')
    const endsWithAsterisk = trimmedValue.endsWith('*')

    // *C01* -> CONTAINS
    if (startsWithAsterisk && endsWithAsterisk && trimmedValue.length > 2) {
        return 'contains'
    }

    // *C01 -> ENDS WITH
    if (startsWithAsterisk && !endsWithAsterisk) {
        return 'endsWith'
    }

    // C01 or C01* -> STARTS WITH (default)
    return 'startsWith'
}

/**
 * Checks if the search value contains any asterisk characters
 * Used for visual styling of the input when advanced patterns are used
 */
export const hasAsteriskPattern = (value: string): boolean => {
    return value.includes('*')
}
