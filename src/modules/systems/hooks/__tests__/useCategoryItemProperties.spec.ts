import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useCategoryItemProperties } from '../useCategoryItemProperties'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    keepPreviousData: 'keepPreviousData',
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseQuery = useQuery as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined, isError: false })
})

describe('useCategoryItemProperties', () => {
    it('builds queryKey as [properties, uid]', () => {
        renderHook(() => useCategoryItemProperties('uid-1'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['properties', 'uid-1'])
    })

    it('disables when uid is missing', () => {
        renderHook(() => useCategoryItemProperties())
        expect(mockUseQuery.mock.calls[0][0].enabled).toBe(false)
    })

    it('returns the full query response object', () => {
        const response = { data: [{ propertyGroup: 'main' }], isError: false, isLoading: false }
        mockUseQuery.mockReturnValue(response)
        const { result } = renderHook(() => useCategoryItemProperties('c'))
        expect(result.current).toBe(response)
    })

    it('fires error toast when isError', () => {
        mockUseQuery.mockReturnValue({ data: undefined, isError: true })
        renderHook(() => useCategoryItemProperties('c'))
        expect(mockToast.error).toHaveBeenCalledWith('Failed fetch properties')
    })
})
