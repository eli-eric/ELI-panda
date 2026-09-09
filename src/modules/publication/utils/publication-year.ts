const YEARS_BEFORE_CURRENT = 11
const YEARS_AFTER_CURRENT = 1

/** Offers 13 years, newest first, plus any valid loaded or imported year. */
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
    if (/^[1-9]\d{3}$/u.test(selected) && !years.includes(selected)) years.push(selected)
    return years.sort((a, b) => Number(b) - Number(a))
}
