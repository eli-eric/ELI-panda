import { getErrorStatus } from '@/types/http'

import type { SystemConflictCode } from '../types'
import { SYSTEM_CONFLICT_CODE } from '../types'

const HTTP_NOT_FOUND = 404
const HTTP_CONFLICT = 409

// Both fetch paths surface the JSON body's `code`: queryFetcher on the error
// itself, queryMutate (toAxiosError) on `error.code` and `response.data.code`.
const readErrorCode = (error: unknown): string | undefined =>
    (error as { code?: string })?.code ??
    (error as { response?: { data?: { code?: string } } })?.response?.data?.code

export const getSystemConflictCode = (error: unknown): SystemConflictCode | undefined => {
    if (getErrorStatus(error) !== HTTP_CONFLICT) return undefined
    const code = readErrorCode(error)
    return code === SYSTEM_CONFLICT_CODE.STALE ||
        code === SYSTEM_CONFLICT_CODE.DUPLICATE_SYSTEM_CODE
        ? code
        : undefined
}

export const isStaleConflict = (error: unknown): boolean =>
    getSystemConflictCode(error) === SYSTEM_CONFLICT_CODE.STALE

export const isDuplicateSystemCodeConflict = (error: unknown): boolean =>
    getSystemConflictCode(error) === SYSTEM_CONFLICT_CODE.DUPLICATE_SYSTEM_CODE

export const isNotFoundError = (error: unknown): boolean => getErrorStatus(error) === HTTP_NOT_FOUND
