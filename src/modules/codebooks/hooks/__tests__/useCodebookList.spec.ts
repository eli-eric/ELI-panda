import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useCodebookList } from '../useCodebookList'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'fn'),
}))

const mockUseQuery = useQuery as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined })
})

describe('useCodebookList', () => {
    it('uses ["codebooks", { query: { editable: "true" } }] queryKey', () => {
        renderHook(() => useCodebookList())
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['codebooks', { query: { editable: 'true' } }])
    })
})
