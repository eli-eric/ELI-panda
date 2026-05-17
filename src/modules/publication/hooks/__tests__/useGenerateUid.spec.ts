import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useGenerateUid } from '../useGenerateUid'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => jest.fn()),
}))

const mockUseQuery = useQuery as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined })
})

describe('useGenerateUid', () => {
    it('queries uuidGenerate with staleTime 0', () => {
        renderHook(() => useGenerateUid(true))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['uuidGenerate'])
        expect(opts.staleTime).toBe(0)
        expect(opts.enabled).toBe(true)
    })

    it('respects enabled=false', () => {
        renderHook(() => useGenerateUid(false))
        expect(mockUseQuery.mock.calls[0][0].enabled).toBe(false)
    })

    it('returns query data', () => {
        mockUseQuery.mockReturnValue({ data: 'generated-uuid' })
        const { result } = renderHook(() => useGenerateUid(true))
        expect(result.current).toBe('generated-uuid')
    })
})
