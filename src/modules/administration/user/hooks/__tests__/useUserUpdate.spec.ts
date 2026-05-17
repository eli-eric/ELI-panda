import { renderHook } from '@testing-library/react'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import { useUserUpdate } from '../useUserUpdate'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQLMutation: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock
const mockToast = toast as unknown as { success: jest.Mock; error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })
})

describe('useUserUpdate', () => {
    it('returns updateUser + loading aliases', () => {
        const mutate = jest.fn()
        mockUseGraphQLMutation.mockReturnValue({ mutate, isPending: true })
        const onSuccess = jest.fn()
        const { result } = renderHook(() => useUserUpdate(onSuccess))
        expect(result.current.updateUser).toBe(mutate)
        expect(result.current.loading).toBe(true)
    })

    it('onSuccess fires success toast and invokes external callback', () => {
        const onSuccess = jest.fn()
        renderHook(() => useUserUpdate(onSuccess))
        const opts = mockUseGraphQLMutation.mock.calls[0][1]
        opts.onSuccess()
        expect(mockToast.success).toHaveBeenCalledWith('User updated successfully')
        expect(onSuccess).toHaveBeenCalled()
    })

    it('onError fires error toast with message', () => {
        renderHook(() => useUserUpdate(jest.fn()))
        const opts = mockUseGraphQLMutation.mock.calls[0][1]
        opts.onError({ message: 'forbidden' })
        expect(mockToast.error).toHaveBeenCalledWith('Failed to update user: forbidden')
    })
})
