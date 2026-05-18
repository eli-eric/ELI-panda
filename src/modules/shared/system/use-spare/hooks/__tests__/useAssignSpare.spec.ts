import { useMutation } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { queryMutate } from '@/utils/fetcher'

import { useAssignSpare } from '../useAssignSpare'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => 'mutation-fn'),
}))

const mockUseMutation = useMutation as jest.Mock
const mockQueryMutate = queryMutate as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })
})

describe('useAssignSpare', () => {
    it('configures mutation with sparePartUse POST endpoint', () => {
        renderHook(() => useAssignSpare())
        expect(mockQueryMutate).toHaveBeenCalledWith('sparePartUse', 'post')
        const opts = mockUseMutation.mock.calls[0][0]
        expect(opts.mutationKey).toEqual(['assign-spare'])
        expect(opts.mutationFn).toBe('mutation-fn')
    })

    it('returns the mutation object from useMutation', () => {
        const mutation = { mutate: jest.fn(), isPending: true }
        mockUseMutation.mockReturnValue(mutation)
        const { result } = renderHook(() => useAssignSpare())
        expect(result.current).toBe(mutation)
    })
})
