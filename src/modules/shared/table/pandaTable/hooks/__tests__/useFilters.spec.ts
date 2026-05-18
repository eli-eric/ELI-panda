import { act, renderHook } from '@testing-library/react'
import { useQueryState } from 'next-usequerystate'

import useTableStateStore from '@/store/useTableStateStore'

import { useFilters } from '../useFilters'

jest.mock('next-usequerystate', () => ({
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
