import type { NormalizedHttpError } from '@/core/http/fetchClient'
import { message } from '@/i18n/src/messages'

import {
    WOS_ABORT_ERROR_NAME,
    WOS_ERROR_MESSAGE_IDS,
    WOS_UNAVAILABLE_HTTP_STATUSES,
} from '../constants/wos-import'
import { WOS_ERROR_CODES, type WosErrorCode } from '../types/wos-import'

/** Guards untrusted API codes before indexing the exhaustive message map. */
export const isWosErrorCode = (code: unknown): code is WosErrorCode =>
    typeof code === 'string' && Object.prototype.hasOwnProperty.call(WOS_ERROR_MESSAGE_IDS, code)

/** Maps unknown rejections without throwing on nullish values. */
export const getWosErrorMessageId = (error: unknown): string => {
    const { code, status, name } = (error ?? {}) as NormalizedHttpError
    if (isWosErrorCode(code)) return WOS_ERROR_MESSAGE_IDS[code]
    if (name === WOS_ABORT_ERROR_NAME) return message.publication.wosImport.errors.timeout
    if (WOS_UNAVAILABLE_HTTP_STATUSES.some(value => value === status))
        return message.publication.wosImport.errors.unavailable
    return message.publication.wosImport.errors.failed
}

/** Only invalid-DOI responses describe field validity; outages belong in a toast. */
export const isWosInvalidDoiError = (error: unknown): boolean =>
    (error as NormalizedHttpError | null | undefined)?.code === WOS_ERROR_CODES.INVALID_DOI
