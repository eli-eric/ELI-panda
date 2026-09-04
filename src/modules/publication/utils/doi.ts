const DOI_PATTERN = /^10\.\d{4,9}\/\S+$/u
const DOI_URL_PREFIX = /^(?:https?:\/\/)?(?:dx\.)?doi\.org\//iu
const DOI_LABEL_PREFIX = /^doi\s*:\s*/iu

const decodeDoi = (value: string): string => {
    try {
        return decodeURIComponent(value)
    } catch {
        return value
    }
}

/**
 * Converts a bare DOI, a `doi:` value, or a doi.org URL into a canonical DOI.
 */
export const normalizeDoi = (raw: string): string | undefined => {
    let value = raw.trim()
    const isDoiUrl = DOI_URL_PREFIX.test(value)

    if (isDoiUrl) {
        value = value.replace(DOI_URL_PREFIX, '').split(/[?#]/u, 1)[0]
    } else {
        value = value.replace(DOI_LABEL_PREFIX, '')
    }

    value = decodeDoi(value).trim().toLowerCase()
    return DOI_PATTERN.test(value) ? value : undefined
}

const RESEARCHER_ID_PATTERN = /^[A-Z]{1,3}-\d{4}-(\d{4})$/u

/**
 * Reads the issue year Clarivate encodes in a ResearcherID's suffix
 * (`LETTERS-NNNN-YYYY`). Returns undefined for anything unreadable, so an ID of
 * unknown vintage is never ranked against one we can actually read.
 */
export const researcherIdYear = (raw: string): number | undefined => {
    const match = RESEARCHER_ID_PATTERN.exec(raw.trim().toUpperCase())
    return match ? Number(match[1]) : undefined
}

/**
 * Whether `incoming` was issued strictly later than `current`. Only a confident
 * yes offers promotion: an equal or unreadable vintage is a decision for the
 * Researchers page, not a checkbox in an import dialog.
 */
export const isNewerResearcherId = (incoming: string, current?: string): boolean => {
    const incomingYear = researcherIdYear(incoming)
    const currentYear = current ? researcherIdYear(current) : undefined
    if (incomingYear === undefined || currentYear === undefined) return false

    return incomingYear > currentYear
}
