import { renderHook } from '@testing-library/react'

let mockQueryValue: string | null = null
jest.mock('next-usequerystate', () => ({
    useQueryState: () => [mockQueryValue, jest.fn()],
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useCategoryUid } = require('../useCategoryUid')

describe('useCategoryUid', () => {
    beforeEach(() => {
        mockQueryValue = null
    })

    it('returns undefined when no query param', () => {
        mockQueryValue = null
        const { result } = renderHook(() => useCategoryUid())
        expect(result.current).toBeUndefined()
    })

    it('parses uid from JSON-encoded category param', () => {
        mockQueryValue = JSON.stringify({ uid: 'cat-123', name: 'Cat' })
        const { result } = renderHook(() => useCategoryUid())
        expect(result.current).toBe('cat-123')
    })

    it('returns undefined when parsed object has no uid', () => {
        mockQueryValue = JSON.stringify({ name: 'Cat' })
        const { result } = renderHook(() => useCategoryUid())
        expect(result.current).toBeUndefined()
    })

    it('throws on invalid JSON (caller must ensure valid URL state)', () => {
        mockQueryValue = 'not-json-{'
        const consoleErr = jest.spyOn(console, 'error').mockImplementation(() => {})
        expect(() => renderHook(() => useCategoryUid())).toThrow()
        consoleErr.mockRestore()
    })
})
