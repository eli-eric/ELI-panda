const YEARS_BEFORE_CURRENT = 11
const YEARS_AFTER_CURRENT = 1

/** Offers 13 years, newest first, while preserving the exact loaded or imported value. */
export const getPublicationYearOptions = (
    selectedYear: unknown,
    currentYear = new Date().getFullYear(),
): string[] => {
    const latestYear = currentYear + YEARS_AFTER_CURRENT
    const years = Array.from(
        { length: YEARS_BEFORE_CURRENT + YEARS_AFTER_CURRENT + 1 },
        (_, index) => String(latestYear - index),
    )
    const selected = String(selectedYear ?? '')
    return selected.trim() && !years.includes(selected) ? [selected, ...years] : years
}
