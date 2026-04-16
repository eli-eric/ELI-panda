import { act, renderHook } from '@testing-library/react'

import useTableStateStore from '@/store/useTableStateStore'

import { usePagination, useResetPaginationOnChange } from '../usePagination'

jest.mock('next-usequerystate', () => ({
    useQueryState: jest.fn().mockReturnValue([null, jest.fn()]),
}))

beforeEach(() => {
    jest.clearAllMocks()
    useTableStateStore.setState({ instances: {} })
})

describe('usePagination', () => {
    it('returns default pagination (page 1, default page size)', () => {
        const { result } = renderHook(() => usePagination({ tableId: 'test', total: 100 }))
        expect(result.current.pagination.page).toBe(1)
        expect(result.current.pagination.pageSize).toBeGreaterThan(0)
    })

    it('computes totalPages from total and pageSize', () => {
        const { result } = renderHook(() =>
            usePagination({ tableId: 'test', total: 50, pageSizeDefault: 10 }),
        )
        expect(result.current.totalPages).toBe(5)
    })

    it('isFirstPage is true on page 1', () => {
        const { result } = renderHook(() =>
            usePagination({ tableId: 'test', total: 50, pageSizeDefault: 10 }),
        )
        expect(result.current.isFirstPage).toBe(true)
    })

    it('isLastPage is true when on last page', () => {
        useTableStateStore.setState({
            instances: {
                test: { paginationState: { page: 5, pageSize: 10 } } as any,
            },
        })
        const { result } = renderHook(() =>
            usePagination({ tableId: 'test', total: 50, pageSizeDefault: 10 }),
        )
        expect(result.current.isLastPage).toBe(true)
    })

    it('goToNextPage increments page', () => {
        const { result } = renderHook(() =>
            usePagination({ tableId: 'test', total: 50, pageSizeDefault: 10 }),
        )
        act(() => {
            result.current.goToNextPage()
        })
        expect(result.current.pagination.page).toBe(2)
    })

    it('goToPreviousPage does nothing on page 1', () => {
        const { result } = renderHook(() =>
            usePagination({ tableId: 'test', total: 50, pageSizeDefault: 10 }),
        )
        act(() => {
            result.current.goToPreviousPage()
        })
        expect(result.current.pagination.page).toBe(1)
    })

    it('goToPage navigates to specific page', () => {
        const { result } = renderHook(() =>
            usePagination({ tableId: 'test', total: 50, pageSizeDefault: 10 }),
        )
        act(() => {
            result.current.goToPage(3)
        })
        expect(result.current.pagination.page).toBe(3)
    })

    it('setPageSize resets to page 1', () => {
        useTableStateStore.setState({
            instances: {
                test: { paginationState: { page: 3, pageSize: 10 } } as any,
            },
        })
        const { result } = renderHook(() =>
            usePagination({ tableId: 'test', total: 50, pageSizeDefault: 10 }),
        )
        act(() => {
            result.current.setPageSize(25)
        })
        expect(result.current.pagination.page).toBe(1)
    })

    it('resetPagination resets to defaults', () => {
        useTableStateStore.setState({
            instances: {
                test: { paginationState: { page: 5, pageSize: 25 } } as any,
            },
        })
        const { result } = renderHook(() =>
            usePagination({ tableId: 'test', total: 100, pageSizeDefault: 10 }),
        )
        act(() => {
            result.current.resetPagination()
        })
        expect(result.current.pagination.page).toBe(1)
        expect(result.current.pagination.pageSize).toBe(10)
    })
})

describe('useResetPaginationOnChange', () => {
    it('resets page to 1 when called', () => {
        useTableStateStore.setState({
            instances: {
                test: { paginationState: { page: 5, pageSize: 10 } } as any,
            },
        })
        const { result } = renderHook(() => useResetPaginationOnChange('test'))
        act(() => {
            result.current()
        })
        const state = useTableStateStore.getState().instances.test?.paginationState
        expect(state?.page).toBe(1)
    })

    it('does nothing when already on page 1', () => {
        const setPaginationState = jest.fn()
        useTableStateStore.setState({
            instances: {
                test: { paginationState: { page: 1, pageSize: 10 } } as any,
            },
            setPaginationState,
        })
        const { result } = renderHook(() => useResetPaginationOnChange('test'))
        act(() => {
            result.current()
        })
        expect(setPaginationState).not.toHaveBeenCalled()
    })
})
