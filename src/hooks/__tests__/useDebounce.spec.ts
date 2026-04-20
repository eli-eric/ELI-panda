import { act, renderHook } from '@testing-library/react'

import { useDebounce } from '../useDebounce'

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.useRealTimers()
})

describe('useDebounce', () => {
    it('returns initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('hello'))
        expect(result.current).toBe('hello')
    })

    it('updates value after default delay (500ms)', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
            initialProps: { value: 'hello' },
        })

        rerender({ value: 'world' })
        expect(result.current).toBe('hello')

        act(() => {
            jest.advanceTimersByTime(500)
        })
        expect(result.current).toBe('world')
    })

    it('updates value after custom delay', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
            initialProps: { value: 'a' },
        })

        rerender({ value: 'b' })

        act(() => {
            jest.advanceTimersByTime(199)
        })
        expect(result.current).toBe('a')

        act(() => {
            jest.advanceTimersByTime(1)
        })
        expect(result.current).toBe('b')
    })

    it('resets timer on rapid value changes', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
            initialProps: { value: 'a' },
        })

        rerender({ value: 'b' })
        act(() => {
            jest.advanceTimersByTime(200)
        })

        rerender({ value: 'c' })
        act(() => {
            jest.advanceTimersByTime(200)
        })
        // 'b' should never appear because timer was reset
        expect(result.current).toBe('a')

        act(() => {
            jest.advanceTimersByTime(100)
        })
        expect(result.current).toBe('c')
    })
})
