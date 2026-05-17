import { renderHook } from '@testing-library/react'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import { useCreateRelatedItem } from '../useCreateRelatedItem'
import { useDisconnectRelatedItem } from '../useDisconnectRelatedItem'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQLMutation: jest.fn(),
}))

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })
})

describe('useCreateRelatedItem', () => {
    it('exposes mutate as createRelatedItem + loading', () => {
        const mutate = jest.fn()
        mockUseGraphQLMutation.mockReturnValue({ mutate, isPending: true })
        const { result } = renderHook(() => useCreateRelatedItem())
        expect(result.current.createRelatedItem).toBe(mutate)
        expect(result.current.loading).toBe(true)
    })
})

describe('useDisconnectRelatedItem', () => {
    it('exposes mutate as disconnectRelatedItem + loading', () => {
        const mutate = jest.fn()
        mockUseGraphQLMutation.mockReturnValue({ mutate, isPending: false })
        const { result } = renderHook(() => useDisconnectRelatedItem())
        expect(result.current.disconnectRelatedItem).toBe(mutate)
        expect(result.current.loading).toBe(false)
    })
})
