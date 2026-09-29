import { message } from '@/i18n/src/messages'
import { toAxiosError } from '@/types/http'

import { WOS_ERROR_CODES } from '../../../types/wos-import'
import { resolveWosLookupError } from '../wos-lookup-error'

const errors = message.publication.wos.errors

describe('resolveWosLookupError', () => {
    it.each([
        [WOS_ERROR_CODES.DOI_INVALID, 'invalidDoi', errors.doiInvalid],
        [WOS_ERROR_CODES.WOS_NOT_FOUND, 'notFound', errors.notFound],
        [WOS_ERROR_CODES.WOS_RATE_LIMITED, 'rateLimited', errors.rateLimited],
        [WOS_ERROR_CODES.WOS_NOT_CONFIGURED, 'notConfigured', errors.notConfigured],
        [WOS_ERROR_CODES.WOS_UPSTREAM_ERROR, 'upstream', errors.upstream],
        [WOS_ERROR_CODES.WOS_UPSTREAM_TIMEOUT, 'upstream', errors.timeout],
        [WOS_ERROR_CODES.WOS_RECORD_AMBIGUOUS, 'upstream', errors.ambiguous],
        [WOS_ERROR_CODES.WOS_AUTHENTICATION_FAILED, 'upstream', errors.authentication],
        [WOS_ERROR_CODES.INTERNAL_ERROR, 'upstream', errors.internal],
    ])('%s → %s', (code, kind, messageId) => {
        // The HTTP status must not override the code.
        expect(resolveWosLookupError({ code, status: 400 })).toEqual({ kind, messageId })
        expect(resolveWosLookupError(toAxiosError({ code, status: 503 }))).toEqual({
            kind,
            messageId,
        })
    })

    it('gives every code its own message', () => {
        const ids = Object.values(WOS_ERROR_CODES).map(
            code => resolveWosLookupError({ code }).messageId,
        )
        expect(new Set(ids).size).toBe(ids.length)
    })

    it('treats a client-side timeout as a retryable upstream timeout', () =>
        expect(resolveWosLookupError({ name: 'AbortError' })).toEqual({
            kind: 'upstream',
            messageId: errors.timeout,
        }))

    it.each([null, undefined, 'boom', { status: 429 }, { code: 'UNKNOWN' }, { code: 'toString' }])(
        'falls back to a retryable upstream error for %p without switching on HTTP status',
        error =>
            expect(resolveWosLookupError(error)).toEqual({
                kind: 'upstream',
                messageId: errors.upstream,
            }),
    )
})
