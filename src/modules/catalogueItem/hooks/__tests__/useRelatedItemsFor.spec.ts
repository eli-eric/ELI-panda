import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useRelatedItemsFor } from '../useRelatedItemsFor'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

const mockUseRouter = useRouter as jest.Mock
const mockUseGraphQL = useGraphQL as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useRelatedItemsFor', () => {
    it('passes router uid as variables.where.uid', () => {
        mockUseRouter.mockReturnValue({ query: { uid: 'cat-1' } })
        mockUseGraphQL.mockReturnValue({
            data: { catalogueItems: [{ relatedCatalogueItemsFor: [] }] },
            isLoading: false,
            refetch: jest.fn(),
        })
        renderHook(() => useRelatedItemsFor())
        expect(mockUseGraphQL).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                variables: { where: { uid: 'cat-1' } },
                enabled: true,
            }),
        )
    })

    it('disabled when uid missing', () => {
        mockUseRouter.mockReturnValue({ query: {} })
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            isLoading: false,
            refetch: jest.fn(),
        })
        renderHook(() => useRelatedItemsFor())
        expect(mockUseGraphQL.mock.calls[0][1].enabled).toBe(false)
    })

    it('returns first catalogueItem.relatedCatalogueItemsFor list', () => {
        const list = [{ uid: 'r1', name: 'X' }]
        mockUseRouter.mockReturnValue({ query: { uid: 'cat-1' } })
        mockUseGraphQL.mockReturnValue({
            data: { catalogueItems: [{ relatedCatalogueItemsFor: list }] },
            isLoading: false,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useRelatedItemsFor())
        expect(result.current.data).toBe(list)
    })

    it('returns refetch from useGraphQL', () => {
        const refetch = jest.fn()
        mockUseRouter.mockReturnValue({ query: { uid: 'cat-1' } })
        mockUseGraphQL.mockReturnValue({
            data: { catalogueItems: [{ relatedCatalogueItemsFor: [] }] },
            isLoading: false,
            refetch,
        })
        const { result } = renderHook(() => useRelatedItemsFor())
        expect(result.current.refetch).toBe(refetch)
    })
})
