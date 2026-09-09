import type { AxiosError } from '../http'
import {
    getErrorMessageText,
    getErrorStatus,
    isAxiosError,
    isBadRequestError,
    isClientError,
    toAxiosError,
} from '../http'

describe('isAxiosError', () => {
    it('true when isAxiosError property present', () => {
        const err = { isAxiosError: true }
        expect(isAxiosError(err)).toBe(true)
    })

    it('false for null/undefined/primitives', () => {
        expect(isAxiosError(null)).toBe(false)
        expect(isAxiosError(undefined)).toBe(false)
        expect(isAxiosError('error')).toBe(false)
        expect(isAxiosError(42)).toBe(false)
    })

    it('false for plain Error', () => {
        expect(isAxiosError(new Error('boom'))).toBe(false)
    })
})

describe('toAxiosError', () => {
    it('returns existing AxiosError as-is', () => {
        const ax = {
            isAxiosError: true,
            response: { status: 404 },
        } as AxiosError
        expect(toAxiosError(ax)).toBe(ax)
    })

    it('wraps a plain Error preserving message', () => {
        const result = toAxiosError(new Error('original message'))
        expect(result.isAxiosError).toBe(true)
        expect(result.message).toBe('original message')
    })

    it('wraps object with status into response.status', () => {
        const result = toAxiosError({ status: 500, details: 'oops' })
        expect(result.response?.status).toBe(500)
    })

    it('captures code and details', () => {
        const result = toAxiosError({
            status: 400,
            code: 'BAD_REQUEST',
            details: { field: 'name' },
        })
        expect(result.code).toBe('BAD_REQUEST')
        expect(result.details).toEqual({ field: 'name' })
    })

    it('uses candidate object as data when no data/details', () => {
        const candidate = { status: 422, foo: 'bar' }
        const result = toAxiosError(candidate)
        expect(result.response?.data).toEqual(candidate)
    })

    it('returns "Request failed" message for non-error input', () => {
        expect(toAxiosError(null).message).toBe('Request failed')
        expect(toAxiosError(undefined).message).toBe('Request failed')
        expect(toAxiosError('whatever').message).toBe('Request failed')
    })
})

/** Shape thrown by `queryFetcher` — the raw NormalizedHttpError. */
const normalizedError = (status: number, message = 'boom') => {
    const error = new Error(message) as Error & { status?: number }
    error.status = status
    return error
}

/** Shape thrown by `queryMutate` — status moves to response.status. */
const axiosLikeError = (status: number, message = 'boom') =>
    toAxiosError(normalizedError(status, message))

describe('getErrorStatus', () => {
    it('reads status off a NormalizedHttpError from queryFetcher', () => {
        expect(getErrorStatus(normalizedError(404))).toBe(404)
    })

    it('reads status off an axios-like error from queryMutate', () => {
        // Regression guard: toAxiosError does not copy status to the top level, so
        // reading only `.status` here silently misses every mutation error.
        const error = axiosLikeError(409)
        expect((error as { status?: number }).status).toBeUndefined()
        expect(getErrorStatus(error)).toBe(409)
    })

    it('returns undefined when neither shape carries a status', () => {
        expect(getErrorStatus(new Error('network down'))).toBeUndefined()
        expect(getErrorStatus(undefined)).toBeUndefined()
        expect(getErrorStatus(null)).toBeUndefined()
    })
})

describe('isClientError', () => {
    it.each([400, 403, 404, 409, 499])('treats %i as a client error', status => {
        expect(isClientError(normalizedError(status))).toBe(true)
        expect(isClientError(axiosLikeError(status))).toBe(true)
    })

    it.each([500, 502, 503])('does not treat %i as a client error', status => {
        expect(isClientError(normalizedError(status))).toBe(false)
        expect(isClientError(axiosLikeError(status))).toBe(false)
    })

    it('does not treat a statusless error as a client error', () => {
        expect(isClientError(new Error('network down'))).toBe(false)
    })
})

describe('isBadRequestError', () => {
    it('matches 400 in both error shapes', () => {
        expect(isBadRequestError(normalizedError(400))).toBe(true)
        expect(isBadRequestError(axiosLikeError(400))).toBe(true)
    })

    it('rejects other statuses', () => {
        expect(isBadRequestError(normalizedError(404))).toBe(false)
        expect(isBadRequestError(new Error('nope'))).toBe(false)
    })
})

describe('getErrorMessageText', () => {
    it('strips the backend "Bad request: " prefix', () => {
        expect(getErrorMessageText(normalizedError(400, 'Bad request: zone not found'))).toBe(
            'zone not found',
        )
    })

    it('is case-insensitive about the prefix', () => {
        expect(getErrorMessageText(normalizedError(400, 'BAD REQUEST:  spaced out'))).toBe(
            'spaced out',
        )
    })

    it('leaves messages without the prefix alone', () => {
        expect(getErrorMessageText(normalizedError(500, 'Internal error'))).toBe('Internal error')
    })

    it('returns an empty string for a messageless error', () => {
        expect(getErrorMessageText(undefined)).toBe('')
        expect(getErrorMessageText({})).toBe('')
    })
})
