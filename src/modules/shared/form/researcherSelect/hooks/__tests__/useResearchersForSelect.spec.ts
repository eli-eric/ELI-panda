import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'

import { useResearchersForSelect } from '../useResearchersForSelect'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    keepPreviousData: 'keepPreviousData',
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'fn'),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseQueryManager = useQueryManager as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQueryManager.mockReturnValue({ query: { search: 'x' } })
    mockUseQuery.mockReturnValue({ data: undefined })
})

describe('useResearchersForSelect', () => {
    it('threads manager.query into queryKey under "researchers-select"', () => {
        renderHook(() => useResearchersForSelect('table-1'))
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual([
            'researchers-select',
            { query: { search: 'x' } },
        ])
    })

    it('threads tableId to useQueryManager', () => {
        renderHook(() => useResearchersForSelect('table-1'))
        expect(mockUseQueryManager).toHaveBeenCalledWith('table-1')
    })
})
