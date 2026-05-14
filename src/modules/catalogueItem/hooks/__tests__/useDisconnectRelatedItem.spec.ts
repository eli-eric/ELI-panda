import { renderHook } from '@testing-library/react'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import { useDisconnectRelatedItem } from '../useDisconnectRelatedItem'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQLMutation: jest.fn(),
}))

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useDisconnectRelatedItem', () => {
    it('exposes disconnectRelatedItem + loading from useGraphQLMutation', () => {
        const mutate = jest.fn()
        mockUseGraphQLMutation.mockReturnValue({ mutate, isPending: false })
        const { result } = renderHook(() => useDisconnectRelatedItem())
        expect(result.current.disconnectRelatedItem).toBe(mutate)
        expect(result.current.loading).toBe(false)
    })

    it('passes mutation document through to useGraphQLMutation', () => {
        const mutate = jest.fn()
        mockUseGraphQLMutation.mockReturnValue({ mutate, isPending: false })
        renderHook(() => useDisconnectRelatedItem())
        expect(mockUseGraphQLMutation).toHaveBeenCalledTimes(1)
        expect(mockUseGraphQLMutation.mock.calls[0][0]).toBeDefined()
    })

    it('reflects isPending as loading', () => {
        mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn(), isPending: true })
        const { result } = renderHook(() => useDisconnectRelatedItem())
        expect(result.current.loading).toBe(true)
    })
})
