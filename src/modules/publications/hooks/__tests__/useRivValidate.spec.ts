import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useRivValidate } from '../useRivValidate'

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

describe('useRivValidate', () => {
    it('builds queryKey with year + provider', () => {
        renderHook(() => useRivValidate('2026', 'ELI', true))
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual([
            'rivValidate',
            { query: { year: '2026', provider: 'ELI' } },
        ])
    })

    it('enabled requires all three: enabled flag + year + provider', () => {
        renderHook(() => useRivValidate('2026', 'ELI', true))
        expect(mockUseQuery.mock.calls[0][0].enabled).toBe(true)

        renderHook(() => useRivValidate('2026', 'ELI', false))
        expect(mockUseQuery.mock.calls[1][0].enabled).toBe(false)

        renderHook(() => useRivValidate('', 'ELI', true))
        expect(mockUseQuery.mock.calls[2][0].enabled).toBe(false)

        renderHook(() => useRivValidate('2026', '', true))
        expect(mockUseQuery.mock.calls[3][0].enabled).toBe(false)
    })
})
