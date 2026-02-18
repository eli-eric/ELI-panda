import { renderHook } from '@testing-library/react'
import { useQueryState } from 'next-usequerystate'

import useTableStateStore from '@/store/useTableStateStore'

import useQueryManager from '../useQueryManager'

jest.mock('next-usequerystate', () => ({
    useQueryState: jest.fn(),
}))

const mockUseQueryState = useQueryState as jest.Mock

const queryState: Record<string, string | null> = {}

const getPagination = (pagination?: string) => JSON.parse(pagination || '{}')

describe('useQueryManager', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        sessionStorage.clear()
        useTableStateStore.setState({ instances: {} })

        Object.keys(queryState).forEach(key => {
            delete queryState[key]
        })

        mockUseQueryState.mockImplementation((key: string) => [queryState[key] ?? null, jest.fn()])
    })

    it('uses table-specific default page size for systemLeaves', () => {
        const { result } = renderHook(() => useQueryManager('systemLeaves'))

        expect(getPagination(result.current.query.pagination)).toEqual({
            page: 1,
            pageSize: 25,
        })
    })

    it('uses table-specific default page size for publications', () => {
        const { result } = renderHook(() => useQueryManager('publications'))

        expect(getPagination(result.current.query.pagination)).toEqual({
            page: 1,
            pageSize: 100,
        })
    })

    it('prefers explicit pageSizeDefault argument over table default', () => {
        const { result } = renderHook(() => useQueryManager('systemLeaves', 10))

        expect(getPagination(result.current.query.pagination)).toEqual({
            page: 1,
            pageSize: 10,
        })
    })

    it('uses URL pagination when store does not contain pagination', () => {
        queryState.page = '3'
        queryState.pageSize = '50'

        const { result } = renderHook(() => useQueryManager('systemLeaves'))

        expect(getPagination(result.current.query.pagination)).toEqual({
            page: 3,
            pageSize: 50,
        })
    })

    it('prioritizes paginationState from store over URL pagination', () => {
        queryState.page = '9'
        queryState.pageSize = '100'
        useTableStateStore.setState({
            instances: {
                systemLeaves: {
                    paginationState: {
                        page: 2,
                        pageSize: 10,
                    },
                    pagination: '{"page":2,"pageSize":10}',
                },
            },
        })

        const { result } = renderHook(() => useQueryManager('systemLeaves'))

        expect(getPagination(result.current.query.pagination)).toEqual({
            page: 2,
            pageSize: 10,
        })
    })

    it('uses legacy pagination from store when paginationState is missing', () => {
        useTableStateStore.setState({
            instances: {
                systemLeaves: {
                    pagination: '{"page":4,"pageSize":25}',
                },
            },
        })

        const { result } = renderHook(() => useQueryManager('systemLeaves'))

        expect(getPagination(result.current.query.pagination)).toEqual({
            page: 4,
            pageSize: 25,
        })
    })
})
