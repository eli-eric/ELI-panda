/**
 * Parses comma-separated serial numbers string into an array
 * - Splits by comma
 * - Trims whitespace from each value
 * - Removes empty strings
 * - Returns unique values only (no duplicates)
 *
 * @param serialNumbers - Comma-separated string of serial numbers
 * @returns Array of unique, trimmed serial number strings
 */
export const parseSerialNumbers = (serialNumbers: string | null | undefined): string[] => {
    if (!serialNumbers || typeof serialNumbers !== 'string') {
        return []
    }

    const parsed = serialNumbers
        .split(',')
        .map(sn => sn.trim())
        .filter(sn => sn.length > 0)

    // Return unique values only
    return [...new Set(parsed)]
}

/**
 * Gets the count of serial numbers from a comma-separated string
 * @param serialNumbers - Comma-separated string
 * @returns Count of unique, non-empty serial numbers
 */
export const getSerialNumberCount = (serialNumbers: string | null | undefined): number => {
    return parseSerialNumbers(serialNumbers).length
}

/**
 * Checks if serial numbers string contains duplicates
 * @param serialNumbers - Comma-separated string
 * @returns true if duplicates exist
 */
export const hasDuplicateSerialNumbers = (serialNumbers: string | null | undefined): boolean => {
    if (!serialNumbers) return false

    const parsed = serialNumbers
        .split(',')
        .map(sn => sn.trim())
        .filter(sn => sn.length > 0)

    return parsed.length !== new Set(parsed).size
}
