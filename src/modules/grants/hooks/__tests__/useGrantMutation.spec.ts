import { useMutation, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useGrantMutation } from '../useGrantMutation'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
    mockUseQueryClient.mockReturnValue({
        invalidateQueries: jest.fn().mockResolvedValue(undefined),
    })
})

describe('useGrantMutation', () => {
    it('POST + ["create-grant"] without uid', () => {
        renderHook(() => useGrantMutation())
        expect(mockUseMutation.mock.calls[0][0].mutationKey).toEqual(['create-grant'])
    })

    it('PUT + ["grant", uid] with uid', () => {
        renderHook(() => useGrantMutation({ uid: 'g-1' }))
        expect(mockUseMutation.mock.calls[0][0].mutationKey).toEqual(['grant', 'g-1'])
    })

    it('onSuccess invalidates ["grants"] + per-uid + calls caller onSuccess', async () => {
        const invalidateQueries = jest.fn().mockResolvedValue(undefined)
        mockUseQueryClient.mockReturnValue({ invalidateQueries })
        const onSuccess = jest.fn()

        renderHook(() => useGrantMutation({ uid: 'g-1', onSuccess }))
        const opts = mockUseMutation.mock.calls[0][0]
        await opts.onSuccess({ data: { uid: 'g-1', name: 'G' } })

        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['grants'] })
        expect(invalidateQueries).toHaveBeenCalledWith({
            queryKey: ['grant', { uid: 'g-1' }],
        })
        expect(onSuccess).toHaveBeenCalledWith({ uid: 'g-1', name: 'G' })
    })

    it('onSuccess without uid invalidates only ["grants"]', async () => {
        const invalidateQueries = jest.fn().mockResolvedValue(undefined)
        mockUseQueryClient.mockReturnValue({ invalidateQueries })

        renderHook(() => useGrantMutation())
        const opts = mockUseMutation.mock.calls[0][0]
        await opts.onSuccess({ data: { uid: 'new' } })

        expect(invalidateQueries).toHaveBeenCalledTimes(1)
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['grants'] })
    })
})
