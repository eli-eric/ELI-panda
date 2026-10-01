import { message } from '@/i18n/src/messages'
import { isObject, isString } from '@/lib/predicates/type-guards'
import { isAxiosError } from '@/types/http'

import {
    WOS_ABORT_ERROR_NAME,
    WOS_ERROR_CODES,
    WOS_ERROR_MESSAGE_IDS,
    WOS_UNAVAILABLE_HTTP_STATUSES,
    type WosErrorCode,
} from '../types/wos-import'

/** Guards untrusted API codes before indexing the exhaustive message map. */
export const isWosErrorCode = (code: unknown): code is WosErrorCode =>
    isString(code) && Object.prototype.hasOwnProperty.call(WOS_ERROR_MESSAGE_IDS, code)

/** Maps unknown rejections without throwing on nullish values. */
export const getWosErrorMessageId = (error: unknown): string => {
    if (!isObject(error)) return message.publication.wosImport.errors.failed
    const { code, name } = error
    const status = isAxiosError(error) ? error.response?.status : error.status
    if (isWosErrorCode(code)) return WOS_ERROR_MESSAGE_IDS[code]
    if (name === WOS_ABORT_ERROR_NAME) return message.publication.wosImport.errors.timeout
    if (WOS_UNAVAILABLE_HTTP_STATUSES.some(value => value === status))
        return message.publication.wosImport.errors.unavailable
    return message.publication.wosImport.errors.failed
}

/** Only invalid-DOI responses describe field validity; outages belong in a toast. */
export const isWosInvalidDoiError = (error: unknown): boolean =>
    isObject(error) && error.code === WOS_ERROR_CODES.INVALID_DOI
