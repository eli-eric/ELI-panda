import { renderHook } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import { useSystemCodeClear } from '../useSystemCodeClear'

jest.mock('react-hook-form', () => ({
    useFormContext: jest.fn(),
}))

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQLMutation: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseFormContext = useFormContext as jest.Mock
const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock
const mockToast = toast as unknown as { success: jest.Mock; error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseFormContext.mockReturnValue({ setValue: jest.fn() })
    mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })
})

describe('useSystemCodeClear', () => {
    it('returns clearSystemCode + loading aliases', () => {
        const mutate = jest.fn()
        mockUseGraphQLMutation.mockReturnValue({ mutate, isPending: true })
        const { result } = renderHook(() => useSystemCodeClear())
        expect(result.current.clearSystemCode).toBe(mutate)
        expect(result.current.loading).toBe(true)
    })

    it('onSuccess clears form field and shows success toast', () => {
        const setValue = jest.fn()
        mockUseFormContext.mockReturnValue({ setValue })
        renderHook(() => useSystemCodeClear())

        const opts = mockUseGraphQLMutation.mock.calls[0][1]
        opts.onSuccess()
        expect(setValue).toHaveBeenCalledWith('systemCode', '')
        expect(mockToast.success).toHaveBeenCalledWith('System code has been released')
    })

    it('onError shows error toast', () => {
        renderHook(() => useSystemCodeClear())
        const opts = mockUseGraphQLMutation.mock.calls[0][1]
        opts.onError()
        expect(mockToast.error).toHaveBeenCalledWith('Failed to release system code')
    })
})
