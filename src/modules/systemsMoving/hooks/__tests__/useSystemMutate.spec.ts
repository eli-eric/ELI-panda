import { renderHook } from '@testing-library/react'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import { useSystemMutation } from '../useSystemMutate'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQLMutation: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })
})

describe('useSystemMutation (systemsMoving)', () => {
    it('returns update + moveSystem + loading aliases', () => {
        const updateMutate = jest.fn()
        const moveMutate = jest.fn()
        mockUseGraphQLMutation
            .mockReturnValueOnce({ mutate: updateMutate, isPending: false })
            .mockReturnValueOnce({ mutate: moveMutate, isPending: false })

        const { result } = renderHook(() => useSystemMutation())
        expect(result.current.update).toBe(updateMutate)
        expect(result.current.moveSystem).toBe(moveMutate)
        expect(result.current.loading).toBe(false)
    })

    it('loading is true if either update or move is pending', () => {
        mockUseGraphQLMutation
            .mockReturnValueOnce({ mutate: jest.fn(), isPending: true })
            .mockReturnValueOnce({ mutate: jest.fn(), isPending: false })
        const { result } = renderHook(() => useSystemMutation())
        expect(result.current.loading).toBe(true)
    })

    it('update onError toast', () => {
        renderHook(() => useSystemMutation())
        const opts = mockUseGraphQLMutation.mock.calls[0][1]
        opts.onError({ message: 'boom' })
        expect(mockToast.error).toHaveBeenCalledWith('Failed to update system: boom')
    })

    it('move onError toast', () => {
        renderHook(() => useSystemMutation())
        const opts = mockUseGraphQLMutation.mock.calls[1][1]
        opts.onError({ message: 'nope' })
        expect(mockToast.error).toHaveBeenCalledWith('Failed to move system: nope')
    })
})
