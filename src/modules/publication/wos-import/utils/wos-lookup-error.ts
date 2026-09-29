import { message } from '@/i18n/src/messages'
import { isObject } from '@/lib/predicates/type-guards'

import { WOS_ABORT_ERROR_NAME, WOS_ERROR_CODES, type WosErrorCode } from '../../types/wos-import'
import { isWosErrorCode } from '../../utils/wos-errors'

/**
 * How the lookup surfaces a failure:
 * - `invalidDoi`: inline under the DOI field
 * - `notFound`: close the dialog and toast
 * - `rateLimited`: toast
 * - `notConfigured`: hide the button for the rest of the session
 * - `upstream`: toast with a Retry action
 */
export type WosLookupErrorKind =
    | 'invalidDoi'
    | 'notFound'
    | 'rateLimited'
    | 'notConfigured'
    | 'upstream'

export interface WosLookupErrorOutcome {
    kind: WosLookupErrorKind
    messageId: string
}

const errors = message.publication.wos.errors

const OUTCOME_BY_CODE: Record<WosErrorCode, WosLookupErrorOutcome> = {
    [WOS_ERROR_CODES.DOI_INVALID]: { kind: 'invalidDoi', messageId: errors.doiInvalid },
    [WOS_ERROR_CODES.WOS_NOT_FOUND]: { kind: 'notFound', messageId: errors.notFound },
    [WOS_ERROR_CODES.WOS_RATE_LIMITED]: { kind: 'rateLimited', messageId: errors.rateLimited },
    [WOS_ERROR_CODES.WOS_NOT_CONFIGURED]: {
        kind: 'notConfigured',
        messageId: errors.notConfigured,
    },
    [WOS_ERROR_CODES.WOS_UPSTREAM_ERROR]: { kind: 'upstream', messageId: errors.upstream },
    [WOS_ERROR_CODES.WOS_UPSTREAM_TIMEOUT]: { kind: 'upstream', messageId: errors.timeout },
    [WOS_ERROR_CODES.WOS_RECORD_AMBIGUOUS]: { kind: 'upstream', messageId: errors.ambiguous },
    [WOS_ERROR_CODES.WOS_AUTHENTICATION_FAILED]: {
        kind: 'upstream',
        messageId: errors.authentication,
    },
    [WOS_ERROR_CODES.INTERNAL_ERROR]: { kind: 'upstream', messageId: errors.internal },
}

/** Switches on the API error code only; anything uncoded is a retryable upstream failure. */
export const resolveWosLookupError = (error: unknown): WosLookupErrorOutcome => {
    if (!isObject(error)) return OUTCOME_BY_CODE[WOS_ERROR_CODES.WOS_UPSTREAM_ERROR]
    if (isWosErrorCode(error.code)) return OUTCOME_BY_CODE[error.code]
    // fetchClient aborts on its own timeout; a user cancel never reaches here.
    if (error.name === WOS_ABORT_ERROR_NAME)
        return OUTCOME_BY_CODE[WOS_ERROR_CODES.WOS_UPSTREAM_TIMEOUT]
    return OUTCOME_BY_CODE[WOS_ERROR_CODES.WOS_UPSTREAM_ERROR]
}
