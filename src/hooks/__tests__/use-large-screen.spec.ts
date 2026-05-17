import { act, renderHook } from '@testing-library/react'

import { useIsLargeScreen } from '../use-large-screen'

describe('useIsLargeScreen', () => {
    const originalMatchMedia = window.matchMedia

    afterEach(() => {
        window.matchMedia = originalMatchMedia
        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 1024,
        })
    })

    const setWidth = (w: number) => {
        Object.defineProperty(window, 'innerWidth', { configurable: true, value: w })
    }

    it('returns true when window.innerWidth >= 1024 on mount', () => {
        setWidth(1280)
        let listener: () => void = () => undefined
        window.matchMedia = jest.fn().mockReturnValue({
            addEventListener: (_event: string, cb: () => void) => {
                listener = cb
            },
            removeEventListener: jest.fn(),
        }) as any

        const { result } = renderHook(() => useIsLargeScreen())
        expect(result.current).toBe(true)
        // touch listener to avoid unused warning
        expect(typeof listener).toBe('function')
    })

    it('returns false when window.innerWidth < 1024', () => {
        setWidth(800)
        window.matchMedia = jest.fn().mockReturnValue({
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }) as any

        const { result } = renderHook(() => useIsLargeScreen())
        expect(result.current).toBe(false)
    })

    it('updates when media query change fires', () => {
        setWidth(800)
        let handler: () => void = () => undefined
        window.matchMedia = jest.fn().mockReturnValue({
            addEventListener: (_event: string, cb: () => void) => {
                handler = cb
            },
            removeEventListener: jest.fn(),
        }) as any

        const { result } = renderHook(() => useIsLargeScreen())
        expect(result.current).toBe(false)

        // Resize the window past breakpoint and trigger listener
        setWidth(1280)
        act(() => handler())
        expect(result.current).toBe(true)
    })

    it('removes listener on unmount', () => {
        setWidth(800)
        const removeEventListener = jest.fn()
        window.matchMedia = jest.fn().mockReturnValue({
            addEventListener: jest.fn(),
            removeEventListener,
        }) as any

        const { unmount } = renderHook(() => useIsLargeScreen())
        unmount()
        expect(removeEventListener).toHaveBeenCalled()
    })
})
