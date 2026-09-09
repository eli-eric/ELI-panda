import { toAxiosError } from '@/types/http'

import { getSystemCodesErrorKind, SYSTEM_CODES_ERROR } from '../systemCodesErrors'

const normalizedError = (status: number, message: string) => {
    const error = new Error(message) as Error & { status?: number }
    error.status = status
    return error
}

const axiosLikeError = (status: number, message: string) =>
    toAxiosError(normalizedError(status, message))

// Verbatim messages from the API contract.
const BACKEND_MESSAGES: ReadonlyArray<[string, string]> = [
    [
        SYSTEM_CODES_ERROR.MISSING_DEFAULT_PARENT_SYSTEM,
        'Bad request: missing default parent system for selected zone (set it on the zone via PUT /v1/zones/{uid})',
    ],
    [SYSTEM_CODES_ERROR.ZONE_NOT_FOUND, 'Bad request: zone not found'],
    [SYSTEM_CODES_ERROR.SYSTEM_TYPE_NOT_FOUND, 'Bad request: system type not found'],
    [SYSTEM_CODES_ERROR.INVALID_BATCH, 'Bad request: batch must be greater than zero'],
    [
        SYSTEM_CODES_ERROR.NO_SYSTEM_CODE_MASK,
        'Bad request: system type has no system code mask with a serial number for this facility',
    ],
]

describe('getSystemCodesErrorKind', () => {
    it.each(BACKEND_MESSAGES)('maps a 400 to %s', (kind, message) => {
        expect(getSystemCodesErrorKind(normalizedError(400, message))).toBe(kind)
    })

    it.each(BACKEND_MESSAGES)('maps %s through the queryMutate error shape too', (kind, message) => {
        // The preview query and the create mutation throw different error shapes; both
        // have to resolve to the same kind or the toast and the alert would disagree.
        expect(getSystemCodesErrorKind(axiosLikeError(400, message))).toBe(kind)
    })

    it('is case-insensitive', () => {
        expect(getSystemCodesErrorKind(normalizedError(400, 'BAD REQUEST: ZONE NOT FOUND'))).toBe(
            SYSTEM_CODES_ERROR.ZONE_NOT_FOUND,
        )
    })

    it('returns null for an unrecognised 400 so the raw message can be surfaced', () => {
        expect(getSystemCodesErrorKind(normalizedError(400, 'Bad request: something new'))).toBeNull()
    })

    it.each([401, 403, 404, 500])('returns null for status %i', status => {
        expect(
            getSystemCodesErrorKind(normalizedError(status, 'Bad request: zone not found')),
        ).toBeNull()
    })

    it('returns null for errors without a status', () => {
        expect(getSystemCodesErrorKind(new Error('zone not found'))).toBeNull()
        expect(getSystemCodesErrorKind(undefined)).toBeNull()
    })
})
