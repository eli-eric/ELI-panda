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
        value = decodeDoi(value.replace(DOI_URL_PREFIX, '').split(/[?#]/u, 1)[0])
    } else {
        value = value.replace(DOI_LABEL_PREFIX, '')
    }

    value = value.trim().toLowerCase()
    return DOI_PATTERN.test(value) ? value : undefined
}

/** Identifies resolver links that the read-only Web Link field may regenerate. */
export const isDoiResolverLink = (value: string): boolean => DOI_URL_PREFIX.test(value.trim())

/** Refreshes derived links while preserving independently supplied record links. */
export const getDerivedWebLink = (doi: unknown, currentWebLink: unknown): string | undefined => {
    const current = String(currentWebLink ?? '')
    if (current && !isDoiResolverLink(current)) return undefined
    const normalized = normalizeDoi(String(doi ?? ''))
    const path = normalized?.split('/').map(encodeURIComponent).join('/')
    const next = path ? `https://doi.org/${path}` : ''
    return next === current ? undefined : next
}
