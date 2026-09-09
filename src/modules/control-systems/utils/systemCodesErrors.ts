import { getErrorMessageText, isBadRequestError } from '@/types/http'

/**
 * The system-code endpoints answer with a 400 and a human-readable `message`, but no
 * machine-readable error code — so the message is all there is to match on.
 */
export const SYSTEM_CODES_ERROR = {
    MISSING_DEFAULT_PARENT_SYSTEM: 'missingDefaultParentSystem',
    ZONE_NOT_FOUND: 'zoneNotFound',
    SYSTEM_TYPE_NOT_FOUND: 'systemTypeNotFound',
    INVALID_BATCH: 'invalidBatch',
    NO_SYSTEM_CODE_MASK: 'noSystemCodeMask',
} as const

export type SystemCodesErrorKind = (typeof SYSTEM_CODES_ERROR)[keyof typeof SYSTEM_CODES_ERROR]

// Fragments are deliberately shorter than the full backend messages so they survive
// minor rewording upstream. They do not overlap, so match order does not matter.
const MATCHERS: ReadonlyArray<readonly [string, SystemCodesErrorKind]> = [
    ['missing default parent system', SYSTEM_CODES_ERROR.MISSING_DEFAULT_PARENT_SYSTEM],
    ['zone not found', SYSTEM_CODES_ERROR.ZONE_NOT_FOUND],
    ['system type not found', SYSTEM_CODES_ERROR.SYSTEM_TYPE_NOT_FOUND],
    ['batch must be greater than zero', SYSTEM_CODES_ERROR.INVALID_BATCH],
    ['no system code mask', SYSTEM_CODES_ERROR.NO_SYSTEM_CODE_MASK],
]

export const getSystemCodesErrorKind = (error: unknown): SystemCodesErrorKind | null => {
    if (!isBadRequestError(error)) return null

    const raw = getErrorMessageText(error).toLowerCase()
    return MATCHERS.find(([fragment]) => raw.includes(fragment))?.[1] ?? null
}
