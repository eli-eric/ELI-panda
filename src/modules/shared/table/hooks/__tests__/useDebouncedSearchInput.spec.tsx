import { act, fireEvent, render, renderHook } from '@testing-library/react'

import { useDebouncedSearchInput } from '../useDebouncedSearchInput'

const setSearch = jest.fn()
const setQuerySearch = jest.fn()
let querySearch: string | null = null
let storeSearch: string | undefined

jest.mock('next-usequerystate', () => ({
    useQueryState: () => [querySearch, setQuerySearch],
}))

jest.mock('@/store/useTableStateStore', () => ({
    __esModule: true,
    default: (selector: any) =>
        selector({
            setSearch,
            instances: { 't1': { search: storeSearch } },
        }),
}))

beforeEach(() => {
    jest.clearAllMocks()
    querySearch = null
    storeSearch = undefined
    jest.useFakeTimers()
})

afterEach(() => {
    jest.useRealTimers()
})

const HookHarness = ({ tableId = 't1', enableQueryURL = true, delay = 500 } = {}) => {
    const { inputRef, defaultValue, handleChange } = useDebouncedSearchInput({
        tableId,
        enableQueryURL,
        delay,
    })
    return <input ref={inputRef} defaultValue={defaultValue} onChange={handleChange} />
}

describe('useDebouncedSearchInput', () => {
    it('initial defaultValue prefers querySearch when present', () => {
        querySearch = 'from-url'
        const { result } = renderHook(() =>
            useDebouncedSearchInput({ tableId: 't1', enableQueryURL: true }),
        )
        expect(result.current.defaultValue).toBe('from-url')
    })

    it('falls back to storeSearch when no query param', () => {
        querySearch = null
        storeSearch = 'from-store'
        const { result } = renderHook(() =>
            useDebouncedSearchInput({ tableId: 't1', enableQueryURL: true }),
        )
        expect(result.current.defaultValue).toBe('from-store')
    })

    it('ignores querySearch when enableQueryURL is false (modal-local search)', () => {
        querySearch = 'page-search'
        storeSearch = undefined
        const { result } = renderHook(() =>
            useDebouncedSearchInput({ tableId: 't1', enableQueryURL: false }),
        )
        expect(result.current.defaultValue).toBe('')
    })

    it('defaultValue is empty when nothing set', () => {
        querySearch = null
        storeSearch = undefined
        const { result } = renderHook(() =>
            useDebouncedSearchInput({ tableId: 't1', enableQueryURL: true }),
        )
        expect(result.current.defaultValue).toBe('')
    })

    it('debounced change commits after delay (default 500)', () => {
        const { container } = render(<HookHarness />)
        const input = container.querySelector('input')!
        fireEvent.change(input, { target: { value: 'hello' } })
        // before delay: nothing committed
        expect(setSearch).not.toHaveBeenCalled()
        act(() => {
            jest.advanceTimersByTime(500)
        })
        expect(setSearch).toHaveBeenCalledWith('t1', 'hello')
        expect(setQuerySearch).toHaveBeenCalledWith('hello', { shallow: true })
    })

    it('rapid changes only commit the latest value once', () => {
        const { container } = render(<HookHarness />)
        const input = container.querySelector('input')!
        fireEvent.change(input, { target: { value: 'a' } })
        fireEvent.change(input, { target: { value: 'ab' } })
        fireEvent.change(input, { target: { value: 'abc' } })
        act(() => {
            jest.advanceTimersByTime(500)
        })
        expect(setSearch).toHaveBeenCalledTimes(1)
        expect(setSearch).toHaveBeenCalledWith('t1', 'abc')
    })

    it('does not touch query URL when enableQueryURL is false', () => {
        const { container } = render(<HookHarness enableQueryURL={false} />)
        fireEvent.change(container.querySelector('input')!, { target: { value: 'x' } })
        act(() => {
            jest.advanceTimersByTime(500)
        })
        expect(setSearch).toHaveBeenCalled()
        expect(setQuerySearch).not.toHaveBeenCalled()
    })

    it('respects custom delay', () => {
        const { container } = render(<HookHarness delay={100} />)
        fireEvent.change(container.querySelector('input')!, { target: { value: 'q' } })
        act(() => {
            jest.advanceTimersByTime(99)
        })
        expect(setSearch).not.toHaveBeenCalled()
        act(() => {
            jest.advanceTimersByTime(1)
        })
        expect(setSearch).toHaveBeenCalledWith('t1', 'q')
    })
})
