import { useMutation } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { queryMutate } from '@/utils/fetcher'

import { usePublicationMutation } from '../usePublicationMutation'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}))

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseMutation = useMutation as jest.Mock
const mockUseRouter = useRouter as jest.Mock
const mockQueryMutate = queryMutate as unknown as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({ query: {} })
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
})

describe('usePublicationMutation', () => {
    it('uses POST + ["create-publication"] when no uid in router', () => {
        renderHook(() => usePublicationMutation())
        expect(mockQueryMutate).toHaveBeenCalledWith('publication', 'post', {
            uid: undefined,
        })
        const opts = mockUseMutation.mock.calls[0][0]
        expect(opts.mutationKey).toEqual(['create-publication'])
    })

    it('uses PUT + ["publication", uid] when router has uid', () => {
        mockUseRouter.mockReturnValue({ query: { uid: 'p-1' } })
        renderHook(() => usePublicationMutation())
        expect(mockQueryMutate).toHaveBeenCalledWith('publication', 'put', { uid: 'p-1' })
        const opts = mockUseMutation.mock.calls[0][0]
        expect(opts.mutationKey).toEqual(['publication', 'p-1'])
    })

    it('onError toasts the API message', () => {
        renderHook(() => usePublicationMutation())
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ response: { data: { message: 'duplicate code' } } })
        expect(mockToast.error).toHaveBeenCalledWith('Error: duplicate code')
    })
})
