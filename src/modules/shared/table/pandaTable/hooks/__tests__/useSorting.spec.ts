import { act, renderHook } from '@testing-library/react'
import { useQueryState } from 'nuqs'

import useTableStateStore from '@/store/useTableStateStore'

import { useSorting } from '../useSorting'

jest.mock('nuqs', () => ({
    useQueryState: jest.fn(),
}))

jest.mock('@/store/useTableStateStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockUseQueryState = useQueryState as jest.Mock
const mockUseTableStateStore = useTableStateStore as unknown as jest.Mock

let setSortBy: jest.Mock
let setSortByQueryString: jest.Mock
let setQueryFn: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setSortBy = jest.fn()
    setSortByQueryString = jest.fn()
    setQueryFn = jest.fn()
    mockUseTableStateStore.mockReturnValue({
        setSortBy,
        setSortByQueryString,
        instances: {},
    })
    mockUseQueryState.mockReturnValue([null, setQueryFn])
})

describe('useSorting', () => {
    it('starts with empty array when no stored sort', () => {
        const { result } = renderHook(() => useSorting('t1', false))
        expect(result.current[0]).toEqual([])
    })

    it('hydrates from sortByInstance when present', () => {
        const sortByInstance = [{ id: 'name', desc: false }]
        mockUseTableStateStore.mockReturnValue({
            setSortBy,
            setSortByQueryString,
            instances: { t1: { sortBy: sortByInstance } },
        })
        const { result } = renderHook(() => useSorting('t1', false))
        expect(result.current[0]).toEqual(sortByInstance)
    })

    it('applies a ?sortBy deep link even when nuqs has not seen the URL yet', () => {
        // pages router not ready -> nuqs reports null while the param is in the URL
        const sorting = [{ id: 'name', desc: true }]
        window.history.replaceState(
            {},
            '',
            `/systems/overview?sortBy=${encodeURIComponent(JSON.stringify(sorting))}`,
        )
        mockUseQueryState.mockReturnValue([null, setQueryFn])

        const { result } = renderHook(() => useSorting('t1', true))

        expect(result.current[0]).toEqual(sorting)
        expect(setSortBy).toHaveBeenCalledWith('t1', sorting)
        window.history.replaceState({}, '', '/')
    })

    it('ignores a malformed ?sortBy instead of throwing', () => {
        mockUseQueryState.mockReturnValue(['%5B%7Bbroken', setQueryFn])

        const { result } = renderHook(() => useSorting('t1', true))

        expect(result.current[0]).toEqual([])
    })

    it('does not clear ?sortBy before it has been read', () => {
        // The sync effect must not publish an empty initial sort: on a
        // server-rendered page ?sortBy arrives after the first render, and
        // publishing [] first would delete the deep link's own param.
        mockUseQueryState.mockReturnValue([null, setQueryFn])
        const { rerender } = renderHook(() => useSorting('t1', true))
        rerender()

        expect(setQueryFn).not.toHaveBeenCalled()
    })

    it('hydrates when ?sortBy arrives after the first render', () => {
        const sorting = [{ id: 'name', desc: true }]
        mockUseQueryState.mockReturnValue([null, setQueryFn])
        const { result, rerender } = renderHook(() => useSorting('t1', true))
        expect(result.current[0]).toEqual([])

        mockUseQueryState.mockReturnValue([JSON.stringify(sorting), setQueryFn])
        rerender()

        expect(result.current[0]).toEqual(sorting)
        expect(setSortBy).toHaveBeenCalledWith('t1', sorting)
    })

    it('still clears ?sortBy once the user has actually sorted', () => {
        mockUseQueryState.mockReturnValue([null, setQueryFn])
        const { result } = renderHook(() => useSorting('t1', true))

        act(() => {
            result.current[1]([{ id: 'name', desc: true }])
        })
        expect(setQueryFn).toHaveBeenCalledWith(JSON.stringify([{ id: 'name', desc: true }]))

        act(() => {
            result.current[1]([])
        })
        expect(setQueryFn).toHaveBeenCalledWith(null)
    })

    it('setSorting updates store + queryString', () => {
        const { result } = renderHook(() => useSorting('t1', true))
        const newSorting = [{ id: 'price', desc: true }]
        act(() => {
            result.current[1](newSorting)
        })
        expect(setSortBy).toHaveBeenCalledWith('t1', newSorting)
        expect(setSortByQueryString).toHaveBeenCalledWith('t1', JSON.stringify(newSorting))
    })

    it('clearing sorting writes undefined queryString + null query', () => {
        const { result } = renderHook(() => useSorting('t1', true))
        act(() => {
            result.current[1]([{ id: 'price', desc: true }])
        })
        act(() => {
            result.current[1]([])
        })
        // last call from clearing
        expect(setSortByQueryString).toHaveBeenLastCalledWith('t1', undefined)
        expect(setQueryFn).toHaveBeenLastCalledWith(null)
    })

    it('hydrates from URL sortByQuery on first render (enableQueryURL=true)', () => {
        const urlSort = [{ id: 'name', desc: false }]
        mockUseQueryState.mockReturnValue([JSON.stringify(urlSort), setQueryFn])
        renderHook(() => useSorting('t1', true))
        expect(setSortBy).toHaveBeenCalledWith('t1', urlSort)
    })
})
