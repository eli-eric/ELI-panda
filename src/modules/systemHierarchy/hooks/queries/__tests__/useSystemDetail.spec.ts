import { renderHook } from '@testing-library/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { SYSTEM_DETAIL_QUERY_KEY } from '../../../types/constants'
import { useSystemDetail } from '../useSystemDetail'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

const mockUseGraphQL = useGraphQL as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseGraphQL.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
    })
})

describe('useSystemDetail', () => {
    it('keys the query by leaf uid and only enables when a leaf is selected', () => {
        renderHook(() => useSystemDetail('sys-1'))
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.customQueryKey).toEqual([SYSTEM_DETAIL_QUERY_KEY, 'sys-1'])
        expect(opts.enabled).toBe(true)
    })

    it('disables the query when no leaf is selected', () => {
        renderHook(() => useSystemDetail(null))
        expect(mockUseGraphQL.mock.calls[0][1].enabled).toBe(false)
    })

    // refetchOnMount:false is what keeps secondary consumers cheap: when PhysicalItemTab
    // mounts on a tab switch it re-reads this same query, but must NOT trigger a network
    // refetch. The only refetch on navigation is the explicit one in SystemDetailView.
    it('does not refetch on mount, so secondary consumers (PhysicalItemTab) stay cache reads', () => {
        renderHook(() => useSystemDetail('sys-1'))
        expect(mockUseGraphQL.mock.calls[0][1].refetchOnMount).toBe(false)
    })

    it('surfaces isFetching for the refreshing indicator', () => {
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: false,
            isFetching: true,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useSystemDetail('sys-1'))
        expect(result.current.isFetching).toBe(true)
    })
})
