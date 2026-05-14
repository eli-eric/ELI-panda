import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import { useUserCreate } from '../useUserCreate'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQLMutation: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseRouter = useRouter as jest.Mock
const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock
const mockToast = toast as unknown as { success: jest.Mock; error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({ back: jest.fn() })
    mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })
})

describe('useUserCreate', () => {
    it('returns createUser + loading aliases', () => {
        const mutate = jest.fn()
        mockUseGraphQLMutation.mockReturnValue({ mutate, isPending: true })
        const { result } = renderHook(() => useUserCreate())
        expect(result.current.createUser).toBe(mutate)
        expect(result.current.loading).toBe(true)
    })

    it('onSuccess calls router.back() and fires success toast', () => {
        const back = jest.fn()
        mockUseRouter.mockReturnValue({ back })
        renderHook(() => useUserCreate())
        const opts = mockUseGraphQLMutation.mock.calls[0][1]
        opts.onSuccess()
        expect(back).toHaveBeenCalled()
        expect(mockToast.success).toHaveBeenCalledWith('User was created successfully')
    })

    it('onError fires error toast with message', () => {
        renderHook(() => useUserCreate())
        const opts = mockUseGraphQLMutation.mock.calls[0][1]
        opts.onError({ message: 'duplicate email' })
        expect(mockToast.error).toHaveBeenCalledWith(
            'Error while creating user:duplicate email',
        )
    })
})
