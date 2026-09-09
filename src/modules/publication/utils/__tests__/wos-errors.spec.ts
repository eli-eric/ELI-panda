import { message } from '@/i18n/src/messages'

import { WOS_ERROR_CODES } from '../../types/wos-import'
import { getWosErrorMessageId, isWosErrorCode, isWosInvalidDoiError } from '../wos-errors'
const errors = message.publication.wosImport.errors

describe('WoS error contract', () => {
    it.each([
        [WOS_ERROR_CODES.INVALID_DOI, errors.invalid],
        [WOS_ERROR_CODES.WOS_RECORD_NOT_FOUND, errors.notFound],
        [WOS_ERROR_CODES.WOS_RECORD_AMBIGUOUS, errors.ambiguous],
        [WOS_ERROR_CODES.WOS_NOT_CONFIGURED, errors.notConfigured],
        [WOS_ERROR_CODES.WOS_AUTHENTICATION_FAILED, errors.authentication],
        [WOS_ERROR_CODES.WOS_RATE_LIMITED, errors.rateLimited],
        [WOS_ERROR_CODES.WOS_UPSTREAM_TIMEOUT, errors.timeout],
        [WOS_ERROR_CODES.WOS_UPSTREAM_ERROR, errors.unavailable],
    ])('maps %s before HTTP fallback', (code, expected) => {
        expect(getWosErrorMessageId({ code, status: 503 })).toBe(expected)
        expect(isWosErrorCode(code)).toBe(true)
        expect(isWosInvalidDoiError({ code })).toBe(code === WOS_ERROR_CODES.INVALID_DOI)
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
    })
    it('maps aborts to timeout', () =>
        expect(getWosErrorMessageId({ name: 'AbortError' })).toBe(errors.timeout))
})
