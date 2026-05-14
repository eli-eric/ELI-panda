import { useMutation } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { queryMutate } from '@/utils/fetcher'

import { useServiceMutation } from '../useServiceMutation'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseMutation = useMutation as jest.Mock
const mockQueryMutate = queryMutate as unknown as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
})

describe('useServiceMutation', () => {
    it('uses POST when no uid', () => {
        renderHook(() => useServiceMutation({}))
        expect(mockQueryMutate).toHaveBeenCalledWith('serviceType', 'post', {
            uid: undefined,
        })
    })

    it('uses PUT when uid set', () => {
        renderHook(() => useServiceMutation({ uid: 's-1' }))
        expect(mockQueryMutate).toHaveBeenCalledWith('serviceType', 'put', { uid: 's-1' })
    })

    it('mutationKey includes uid object', () => {
        renderHook(() => useServiceMutation({ uid: 's-1' }))
        const opts = mockUseMutation.mock.calls[0][0]
        expect(opts.mutationKey).toEqual(['serviceType', { uid: 's-1' }])
    })

    it('onError fires toast.error', () => {
        renderHook(() => useServiceMutation({}))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError()
        expect(mockToast.error).toHaveBeenCalledWith(
            'An error occurred while saving the service, try again later.',
        )
    })
})
