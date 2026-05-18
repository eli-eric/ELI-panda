import { renderHook, waitFor } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'
import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'
import { queryFetcher } from '@/utils/fetcher'

import { useGrantsForSelect } from '../useGrantsForSelect'

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(),
}))

const mockUseQueryManager = useQueryManager as unknown as jest.Mock
const mockQueryFetcher = queryFetcher as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useGrantsForSelect', () => {
    it('passes through fetched data', async () => {
        mockUseQueryManager.mockReturnValue({ query: { search: '' } })
        const data = { data: [{ uid: 'g1', name: 'Grant 1' }], totalCount: 1 }
        mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue(data))
        const { result } = renderHook(() => useGrantsForSelect('grants'), {
            wrapper: QueryClientWrapper,
        })
        await waitFor(() => expect(result.current.data).toEqual(data))
    })

    it('uses "grants" endpoint via queryFetcher', () => {
        mockUseQueryManager.mockReturnValue({ query: {} })
        mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue({ data: [] }))
        renderHook(() => useGrantsForSelect('grants'), { wrapper: QueryClientWrapper })
        expect(mockQueryFetcher).toHaveBeenCalledWith('grants')
    })

    it('passes tableId to useQueryManager', () => {
        mockUseQueryManager.mockReturnValue({ query: {} })
        mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue({ data: [] }))
        renderHook(() => useGrantsForSelect('my-table'), { wrapper: QueryClientWrapper })
        expect(mockUseQueryManager).toHaveBeenCalledWith('my-table')
    })
})
