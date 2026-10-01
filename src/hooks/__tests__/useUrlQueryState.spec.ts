import { act, renderHook } from '@testing-library/react'
import { useQueryState } from 'nuqs'

import { useUrlQueryState } from '../useUrlQueryState'

jest.mock('nuqs', () => ({
    useQueryState: jest.fn(),
}))

const mockUseQueryState = useQueryState as jest.Mock
const setValue = jest.fn()

const setRouterValue = (value: string | null) =>
    mockUseQueryState.mockReturnValue([value, setValue])

beforeEach(() => {
    jest.clearAllMocks()
    window.history.replaceState({}, '', '/')
})

describe('useUrlQueryState', () => {
    it('returns the router value when nuqs already has one', () => {
        window.history.replaceState({}, '', '/systems/overview?filter=from-url')
        setRouterValue('from-router')

        const { result } = renderHook(() => useUrlQueryState('filter'))

        expect(result.current[0]).toBe('from-router')
    })

    it('falls back to the address bar while the router has no value', () => {
        window.history.replaceState({}, '', '/systems/overview?filter=from-url')
        setRouterValue(null)

        const { result } = renderHook(() => useUrlQueryState('filter'))

        expect(result.current[0]).toBe('from-url')
    })

    it('returns null when the param is absent from both sources', () => {
        setRouterValue(null)

        const { result } = renderHook(() => useUrlQueryState('filter'))

        expect(result.current[0]).toBeNull()
    })

    it('preserves an empty-string param instead of treating it as absent', () => {
        window.history.replaceState({}, '', '/systems/overview?search=')
        setRouterValue(null)

        const { result } = renderHook(() => useUrlQueryState('search'))

        expect(result.current[0]).toBe('')
    })

    it('stops falling back once the router reports a value, so a cleared param stays cleared', () => {
        window.history.replaceState({}, '', '/systems/overview?filter=from-url')
        setRouterValue(null)

        const { result, rerender } = renderHook(() => useUrlQueryState('filter'))
        expect(result.current[0]).toBe('from-url')

        // router becomes ready and reports the param
        setRouterValue('from-url')
        rerender()
        expect(result.current[0]).toBe('from-url')

        // user clears it; the URL may still lag behind nuqs for a tick
        setRouterValue(null)
        rerender()
        expect(result.current[0]).toBeNull()
    })

    it('spends the fallback after the first commit that had a value', () => {
        // nuqs throttles its URL write, so a hook mounting just after another
        // component cleared the param must not keep reading the stale address bar
        window.history.replaceState({}, '', '/systems/overview?filter=from-url')
        setRouterValue(null)

        const { result, rerender } = renderHook(() => useUrlQueryState('filter'))
        expect(result.current[0]).toBe('from-url')

        rerender()
        expect(result.current[0]).toBeNull()
    })

    it('keeps the fallback alive across a commit that saw nothing', () => {
        // a server-rendered page's hydration commit legitimately has no value
        setRouterValue(null)
        const { result, rerender } = renderHook(() => useUrlQueryState('filter'))
        expect(result.current[0]).toBeNull()

        window.history.replaceState({}, '', '/systems/overview?filter=arrived-late')
        rerender()
        expect(result.current[0]).toBe('arrived-late')
    })

    it('passes the setter through untouched', () => {
        setRouterValue(null)

        const { result } = renderHook(() => useUrlQueryState('filter', { history: 'push' }))
        act(() => {
            result.current[1]('next')
        })

        expect(mockUseQueryState).toHaveBeenCalledWith('filter', { history: 'push' })
        expect(setValue).toHaveBeenCalledWith('next')
    })
})
