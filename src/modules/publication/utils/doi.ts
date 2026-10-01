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

/** Encodes a normalized DOI as a resolver URL, or clears an invalid DOI. */
const getCanonicalDoiLink = (doi: unknown): string => {
    const normalized = normalizeDoi(String(doi ?? ''))
    const path = normalized?.split('/').map(encodeURIComponent).join('/')
    return path ? `https://doi.org/${path}` : ''
}

/** Recognizes canonical links and the exact bare-DOI links saved by older forms. */
const isDerivedFromDoi = (link: string, doi: unknown): boolean => {
    const rawDoi = String(doi ?? '')
    return (
        link === getCanonicalDoiLink(doi) ||
        (DOI_PATTERN.test(rawDoi) && link === `https://doi.org/${rawDoi}`)
    )
}

/** Refreshes derived links while preserving independently supplied record links. */
export const getDerivedWebLink = (
    doi: unknown,
    currentWebLink: unknown,
    previousDoi?: unknown,
): string | undefined => {
    const current = String(currentWebLink ?? '')
    if (current && !isDerivedFromDoi(current, doi) && !isDerivedFromDoi(current, previousDoi)) {
        return undefined
    }
    const next = getCanonicalDoiLink(doi)
    return next === current ? undefined : next
}
