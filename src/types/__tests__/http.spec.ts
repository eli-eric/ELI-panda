import type { AxiosError } from '../http'
import { isAxiosError, toAxiosError } from '../http'

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
