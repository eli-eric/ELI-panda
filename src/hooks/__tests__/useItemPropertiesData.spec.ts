import { renderHook } from '@testing-library/react'

import { useFragment } from '@/types/gql'

import type { ServiceItemData } from '../useItemPropertiesData'
import { useItemPropertiesData } from '../useItemPropertiesData'

jest.mock('@/types/gql', () => ({
    useFragment: jest.fn(),
    gql: jest.fn((str: string) => str),
}))

jest.mock('@/utils/graphql/fragments', () => ({
    CatalogueItemFragment: 'CatalogueItemFragment',
}))

const mockUseFragment = useFragment as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

const makeCatalogueItem = (properties: any[]) => ({
    propertiesConnection: {
        edges: properties,
    },
})

const makePropertyEdge = (
    uid: string,
    name: string,
    value: string,
    groupUid?: string,
    groupName?: string,
    typeName?: string,
) => ({
    value,
    node: {
        uid,
        name,
        groups: groupUid ? [{ uid: groupUid, name: groupName }] : [],
        type: typeName ? { name: typeName, uid: `type-${typeName}` } : null,
        unit: { name: 'mm', uid: 'unit-mm' },
    },
})

const makeServiceItem = (properties: any[], created?: string): ServiceItemData => ({
    created: created || '2024-01-01',
    node: {
        uid: 'service-1',
        name: 'Service',
        isDelivered: true,
        detailsConnection: {
            edges: properties,
        },
    },
})

describe('useItemPropertiesData', () => {
    it('returns empty when no data', () => {
        mockUseFragment.mockReturnValue(null)

        const { result } = renderHook(() => useItemPropertiesData({}))
        expect(result.current.groupedProperties).toEqual([])
        expect(result.current.hasProperties).toBe(false)
        expect(result.current.hasOverriddenProperties).toBe(false)
    })

    it('groups catalogue properties by group', () => {
        const catItem = makeCatalogueItem([
            makePropertyEdge('p1', 'Width', '100', 'g1', 'Dimensions'),
            makePropertyEdge('p2', 'Height', '200', 'g1', 'Dimensions'),
            makePropertyEdge('p3', 'Weight', '50', 'g2', 'Physical'),
        ])
        mockUseFragment.mockReturnValue(catItem)

        const { result } = renderHook(() => useItemPropertiesData({ catalogueItem: {} as any }))
        expect(result.current.hasProperties).toBe(true)
        expect(result.current.groupedProperties).toHaveLength(2)

        const dimGroup = result.current.groupedProperties.find(g => g.name === 'Dimensions')
        expect(dimGroup?.properties).toHaveLength(2)
    })

    it('puts ungrouped properties in General group', () => {
        const catItem = makeCatalogueItem([makePropertyEdge('p1', 'Color', 'Red')])
        mockUseFragment.mockReturnValue(catItem)

        const { result } = renderHook(() => useItemPropertiesData({ catalogueItem: {} as any }))
        const generalGroup = result.current.groupedProperties.find(g => g.name === 'General')
        expect(generalGroup).toBeDefined()
        expect(generalGroup?.properties[0].name).toBe('Color')
    })

    it('marks overridden properties from service items', () => {
        const catItem = makeCatalogueItem([
            makePropertyEdge('p1', 'Width', '100', 'g1', 'Dimensions'),
        ])
        mockUseFragment.mockReturnValue(catItem)

        const serviceItems = [
            makeServiceItem([makePropertyEdge('p1', 'Width', '150', 'g1', 'Dimensions')]),
        ]

        const { result } = renderHook(() =>
            useItemPropertiesData({ catalogueItem: {} as any, serviceItems }),
        )

        expect(result.current.hasOverriddenProperties).toBe(true)
        const prop = result.current.groupedProperties[0].properties[0]
        expect(prop.isOverridden).toBe(true)
        expect(prop.serviceValue).toBe('150')
    })

    it('formats Range type values', () => {
        const catItem = makeCatalogueItem([
            makePropertyEdge('p1', 'Tolerance', '{"min":1,"max":10}', 'g1', 'Specs', 'Range'),
        ])
        mockUseFragment.mockReturnValue(catItem)

        const { result } = renderHook(() => useItemPropertiesData({ catalogueItem: {} as any }))
        expect(result.current.groupedProperties[0].properties[0].value).toBe('1 - 10')
    })
})
