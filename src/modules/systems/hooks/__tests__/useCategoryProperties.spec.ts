import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useCategoryProperties } from '../useCategoryProperties'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => jest.fn()),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseQuery = useQuery as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined, error: undefined })
})

describe('useCategoryProperties', () => {
    it('builds queryKey including uid', () => {
        renderHook(() => useCategoryProperties('cat-1'))
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual([
            'catalogueCategoryProperties',
            { uid: 'cat-1' },
        ])
    })

    it('disables query without uid', () => {
        renderHook(() => useCategoryProperties())
        expect(mockUseQuery.mock.calls[0][0].enabled).toBe(false)
    })

    it('returns catalogueCategoryProperties aliased', () => {
        mockUseQuery.mockReturnValue({
            data: [{ propertyGroup: 'main' }],
            error: undefined,
        })
        const { result } = renderHook(() => useCategoryProperties('c'))
        expect(result.current.catalogueCategoryProperties).toEqual([{ propertyGroup: 'main' }])
    })

    it('fires error toast when query errors', () => {
        mockUseQuery.mockReturnValue({ data: undefined, error: new Error('boom') })
        renderHook(() => useCategoryProperties('c'))
        expect(mockToast.error).toHaveBeenCalledWith('Failed to fetch category properties')
    })
})
