import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useRelatedItems } from '../useRelatedItems'
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
    mockUseRouter.mockReturnValue({ query: { uid: 'cat-1' } })
    mockUseGraphQL.mockReturnValue({
        data: {
            catalogueItems: [
                {
                    relatedCatalogueItems: [{ uid: 'r1' }],
                    relatedCatalogueItemsFor: [{ uid: 'rf1' }],
                },
            ],
        },
        isLoading: false,
        refetch: jest.fn(),
    })
})

describe.each([
    ['useRelatedItems', useRelatedItems, 'relatedCatalogueItems', 'r1'],
    ['useRelatedItemsFor', useRelatedItemsFor, 'relatedCatalogueItemsFor', 'rf1'],
] as const)('%s', (_name, hook, _field, expectedUid) => {
    it('passes router uid as variable + enabled when present', () => {
        renderHook(() => hook())
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where.uid).toBe('cat-1')
        expect(opts.enabled).toBe(true)
    })

    it('returns the related items list', () => {
        const { result } = renderHook(() => hook())
        expect(result.current.data).toEqual([{ uid: expectedUid }])
    })

    it('disables when router has no uid', () => {
        mockUseRouter.mockReturnValue({ query: {} })
        renderHook(() => hook())
        expect(mockUseGraphQL.mock.calls[0][1].enabled).toBe(false)
    })

    it('aliases loading + refetch', () => {
        const refetch = jest.fn()
        mockUseGraphQL.mockReturnValue({
            data: {
                catalogueItems: [
                    { relatedCatalogueItems: [], relatedCatalogueItemsFor: [] },
                ],
            },
            isLoading: true,
            refetch,
        })
        const { result } = renderHook(() => hook())
        expect(result.current.loading).toBe(true)
        expect(result.current.refetch).toBe(refetch)
    })
})
