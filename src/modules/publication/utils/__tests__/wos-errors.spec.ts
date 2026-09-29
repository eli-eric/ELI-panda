import { message } from '@/i18n/src/messages'
import { toAxiosError } from '@/types/http'

import { WOS_ERROR_CODES } from '../../types/wos-import'
import { getWosErrorMessageId, isWosErrorCode, isWosInvalidDoiError } from '../wos-errors'
const errors = message.publication.wosImport.errors

describe('WoS error contract', () => {
    it.each([
        [WOS_ERROR_CODES.DOI_INVALID, errors.invalid],
        [WOS_ERROR_CODES.WOS_NOT_FOUND, errors.notFound],
        [WOS_ERROR_CODES.WOS_RECORD_AMBIGUOUS, errors.ambiguous],
        [WOS_ERROR_CODES.WOS_NOT_CONFIGURED, errors.notConfigured],
        [WOS_ERROR_CODES.WOS_AUTHENTICATION_FAILED, errors.authentication],
        [WOS_ERROR_CODES.WOS_RATE_LIMITED, errors.rateLimited],
        [WOS_ERROR_CODES.WOS_UPSTREAM_TIMEOUT, errors.timeout],
        [WOS_ERROR_CODES.WOS_UPSTREAM_ERROR, errors.unavailable],
        [WOS_ERROR_CODES.INTERNAL_ERROR, errors.failed],
    ])('maps %s before HTTP fallback', (code, expected) => {
        expect(getWosErrorMessageId({ code, status: 503 })).toBe(expected)
        const axiosError = toAxiosError({ code, status: 503 })
        expect(getWosErrorMessageId(axiosError)).toBe(expected)
        expect(isWosErrorCode(code)).toBe(true)
        expect(isWosInvalidDoiError({ code })).toBe(code === WOS_ERROR_CODES.DOI_INVALID)
        expect(isWosInvalidDoiError(axiosError)).toBe(code === WOS_ERROR_CODES.DOI_INVALID)
    })
    it.each([null, undefined, 'failure', 0, {}, { code: 'UNKNOWN' }, { code: 'toString' }])(
        'handles unknown rejection %p',
        error => {
            expect(getWosErrorMessageId(error)).toBe(errors.failed)
            expect(isWosInvalidDoiError(error)).toBe(false)
        },
    )
    it.each([502, 503, 504])('handles HTTP %i without a code', status => {
        expect(getWosErrorMessageId({ status })).toBe(errors.unavailable)
        expect(getWosErrorMessageId(toAxiosError({ status }))).toBe(errors.unavailable)
    })
    it('handles an Axios error with an unknown code', () => {
        const error = toAxiosError({ code: 'UNKNOWN', status: 400 })
        expect(getWosErrorMessageId(error)).toBe(errors.failed)
        expect(isWosInvalidDoiError(error)).toBe(false)
    })
    it('maps aborts to timeout', () =>
        expect(getWosErrorMessageId({ name: 'AbortError' })).toBe(errors.timeout))
})
