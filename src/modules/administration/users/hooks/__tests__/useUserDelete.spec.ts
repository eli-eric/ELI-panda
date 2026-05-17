import { renderHook } from '@testing-library/react'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import { useUserDelete } from '../useUserDelete'
import { useUsers } from '../useUsers'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQLMutation: jest.fn(),
}))

jest.mock('../useUsers', () => ({
    useUsers: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock
const mockUseUsers = useUsers as jest.Mock
const mockToast = toast as unknown as { success: jest.Mock; error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseUsers.mockReturnValue({ refetch: jest.fn() })
    mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn() })
})

describe('useUserDelete', () => {
    it('returns the mutation function as the first tuple element', () => {
        const mutate = jest.fn()
        mockUseGraphQLMutation.mockReturnValue({ mutate })
        const { result } = renderHook(() => useUserDelete('Jan'))
        expect(result.current[0]).toBe(mutate)
    })

    it('onSuccess refetches users and toasts deletion', () => {
        const refetch = jest.fn()
        mockUseUsers.mockReturnValue({ refetch })
        renderHook(() => useUserDelete('Jan'))

        const options = mockUseGraphQLMutation.mock.calls[0][1]
        options.onSuccess()
        expect(refetch).toHaveBeenCalled()
        expect(mockToast.success).toHaveBeenCalledWith('User Jan was deleted')
    })

    it('onError toasts a delete failure message with the name', () => {
        renderHook(() => useUserDelete('Anna'))
        const options = mockUseGraphQLMutation.mock.calls[0][1]
        options.onError()
        expect(mockToast.error).toHaveBeenCalledWith(
            'Something went wrong with delete Anna user!',
        )
    })
})
