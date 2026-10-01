import { act, renderHook } from '@testing-library/react'
import { useQueryState } from 'nuqs'

import useTableStateStore from '@/store/useTableStateStore'

import { useFilters } from '../useFilters'

jest.mock('nuqs', () => ({
    useQueryState: jest.fn(),
}))

jest.mock('@/store/useTableStateStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockUseQueryState = useQueryState as jest.Mock
const mockUseTableStateStore = useTableStateStore as unknown as jest.Mock

let setColumnFilter: jest.Mock
let setFilterQuery: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setColumnFilter = jest.fn()
    setFilterQuery = jest.fn()
    mockUseTableStateStore.mockReturnValue({
        setColumnFilter,
        instances: {},
    })
    mockUseQueryState.mockReturnValue([null, setFilterQuery])
})

describe('useFilters', () => {
    it('returns empty array when no stored filters', () => {
        const { result } = renderHook(() => useFilters('t1', false))
        expect(result.current[0]).toEqual([])
    })

    it('hydrates from store columnFilter instance', () => {
        const instance = [{ id: 'name', value: 'foo' }]
        mockUseTableStateStore.mockReturnValue({
            setColumnFilter,
            instances: { t1: { columnFilter: instance } },
        })
        const { result } = renderHook(() => useFilters('t1', false))
        expect(result.current[0]).toEqual(instance)
    })

    it('setFiltering with array writes store; with enableQueryURL writes URL', () => {
        const { result } = renderHook(() => useFilters('t1', true))
        const next = [{ id: 'name', value: 'bar' }]
        act(() => {
            result.current[1](next)
        })
        expect(setColumnFilter).toHaveBeenCalledWith('t1', next)
        expect(setFilterQuery).toHaveBeenCalledWith(JSON.stringify(next))
    })

    it('clearing filters writes null URL', () => {
        const { result } = renderHook(() => useFilters('t1', true))
        act(() => {
            result.current[1]([])
        })
        expect(setFilterQuery).toHaveBeenCalledWith(null)
    })

    describe('first-render hydration (ELIPANDA-505)', () => {
        const URL_FILTERS = [{ id: 'systemLevel', value: ['TECHNOLOGY_UNIT'], name: 'systemLevel' }]

        afterEach(() => {
            window.history.replaceState({}, '', '/')
        })

        it('hydrates the store from the URL without rewriting the URL', () => {
            mockUseQueryState.mockReturnValue([JSON.stringify(URL_FILTERS), setFilterQuery])

            renderHook(() => useFilters('t1', true))

            expect(setColumnFilter).toHaveBeenCalledWith('t1', URL_FILTERS)
            expect(setFilterQuery).not.toHaveBeenCalled()
        })

        it('falls back to the address bar when the router has not populated nuqs yet', () => {
            // nuqs reports null while the pages router is still marking itself ready,
            // even though the filter is right there in the URL.
            window.history.replaceState(
                {},
                '',
                `/systems/overview?page=1&filter=${encodeURIComponent(JSON.stringify(URL_FILTERS))}`,
            )
            mockUseQueryState.mockReturnValue([null, setFilterQuery])

            renderHook(() => useFilters('t1', true))

            expect(setColumnFilter).toHaveBeenCalledWith('t1', URL_FILTERS)
            // must not delete the deep link's own filter param
            expect(setFilterQuery).not.toHaveBeenCalled()
        })

        it('hydrates when the URL value arrives after the first render', () => {
            // server-rendered page: the param only reaches the hook once
            // hydration is done, so first-render-only would miss it
            mockUseQueryState.mockReturnValue([null, setFilterQuery])
            const { rerender } = renderHook(() => useFilters('t1', true))
            expect(setColumnFilter).not.toHaveBeenCalledWith('t1', URL_FILTERS)

            mockUseQueryState.mockReturnValue([JSON.stringify(URL_FILTERS), setFilterQuery])
            rerender()

            expect(setColumnFilter).toHaveBeenCalledWith('t1', URL_FILTERS)
            expect(setFilterQuery).not.toHaveBeenCalled()
        })

        it('never clears the URL when store and URL are both empty', () => {
            mockUseQueryState.mockReturnValue([null, setFilterQuery])

            renderHook(() => useFilters('t1', true))

            expect(setFilterQuery).not.toHaveBeenCalled()
        })

        it('mirrors store filters into the URL when the store wins', () => {
            const instance = [{ id: 'name', value: 'foo' }]
            mockUseTableStateStore.mockReturnValue({
                setColumnFilter,
                instances: { t1: { columnFilter: instance } },
            })
            mockUseQueryState.mockReturnValue([null, setFilterQuery])

            renderHook(() => useFilters('t1', true))

            expect(setFilterQuery).toHaveBeenCalledWith(JSON.stringify(instance))
        })

        it('ignores a malformed filter param instead of throwing', () => {
            mockUseQueryState.mockReturnValue(['%5B%7Bbroken', setFilterQuery])

            expect(() => renderHook(() => useFilters('t1', true))).not.toThrow()
            expect(setFilterQuery).not.toHaveBeenCalled()
        })
    })

    it('setFiltering with updater function calls fn with current and writes result', () => {
        const instance = [{ id: 'name', value: 'foo' }]
        mockUseTableStateStore.mockReturnValue({
            setColumnFilter,
            instances: { t1: { columnFilter: instance } },
        })
        const { result } = renderHook(() => useFilters('t1', false))
        const updater = jest.fn(prev => [...prev, { id: 'price', value: 100 }])
        act(() => {
            result.current[1](updater)
        })
        expect(updater).toHaveBeenCalledWith(instance)
        expect(setColumnFilter).toHaveBeenCalledWith('t1', [
            ...instance,
            { id: 'price', value: 100 },
        ])
    })
})
