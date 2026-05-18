import { act, renderHook } from '@testing-library/react'
import { useQueryState } from 'next-usequerystate'

import useTableStateStore from '@/store/useTableStateStore'

import { useSorting } from '../useSorting'

jest.mock('next-usequerystate', () => ({
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
