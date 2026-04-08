import { renderHook } from '@testing-library/react'

import { useLeavesFilterFields } from '../LeavesFilter.fields'

jest.mock('@/hooks/form/useMakeFormFields', () => ({
    useMakeFormFields: (fields: Record<string, any>) => {
        const result: Record<string, any> = {}
        for (const [key, value] of Object.entries(fields)) {
            result[key] = { ...value, id: key }
        }
        return result
    },
}))

jest.mock('@/i18n/src/messages', () => ({
    message: {
        systemsPage: {
            systemDetail: {
                form: {
                    name: { label: 'Name', placeholder: 'Name' },
                    responsiblePerson: { label: 'Responsible' },
                    importance: { label: 'Importance' },
                    location: { label: 'Location' },
                    zone: { label: 'Zone' },
                    systemType: { label: 'System Type' },
                    description: { label: 'Description' },
                    systemCode: { label: 'System Code', placeholder: 'Code' },
                    systemLevel: { label: 'System Level' },
                    sparePartsCoverage: { label: 'Spare Parts Coverage' },
                    criticalSpCoverage: { label: 'Critical SP Coverage' },
                    physicalItem: {
                        itemUsage: { label: 'Item Usage' },
                        conditionStatus: { label: 'Condition Status' },
                        price: { label: 'Price' },
                        orderName: { label: 'Order Name' },
                        orderNumber: { label: 'Order Number' },
                        orderRequestNumber: { label: 'Request Number' },
                        orderContractNumber: { label: 'Contract Number' },
                        eun: { label: 'EUN' },
                        serialNumber: { label: 'Serial Number' },
                        notes: { label: 'Notes' },
                    },
                },
            },
        },
        cataloguePage: {
            itemDetail: {
                form: {
                    catalogueNumber: { label: 'Catalogue Number' },
                    name: { label: 'Catalogue Name' },
                    description: { label: 'Catalogue Description' },
                    catalogueCategory: { label: 'Category' },
                    manufacturer: { label: 'Supplier' },
                },
            },
        },
    },
}))

describe('useLeavesFilterFields', () => {
    it('returns all expected filter fields', () => {
        const { result } = renderHook(() => useLeavesFilterFields())
        const fields = result.current

        const expectedKeys = [
            'name',
            'responsible',
            'importance',
            'location',
            'zone',
            'systemType',
            'description',
            'systemCode',
            'systemLevel',
            'itemUsage',
            'itemConditionStatus',
            'sparePartsCoverage',
            'criticalSpCoverage',
            'price',
            'orderName',
            'orderNumber',
            'orderRequestNumber',
            'orderContractNumber',
            'eun',
            'serialNumber',
            'partNumber',
            'catalogueName',
            'catalogueDescription',
            'category',
            'catalogueSupplier',
        ]

        for (const key of expectedKeys) {
            expect(fields).toHaveProperty(key)
        }
    })

    it('does not include parentSystem field', () => {
        const { result } = renderHook(() => useLeavesFilterFields())
        expect(result.current).not.toHaveProperty('parentSystem')
    })

    it('all fields have a name property', () => {
        const { result } = renderHook(() => useLeavesFilterFields())
        for (const field of Object.values(result.current)) {
            expect((field as any).name).toBeDefined()
        }
    })
})
