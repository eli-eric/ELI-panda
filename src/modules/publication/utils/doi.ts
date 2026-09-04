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
