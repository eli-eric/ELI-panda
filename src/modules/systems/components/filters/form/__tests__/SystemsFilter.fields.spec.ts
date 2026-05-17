import { renderHook } from '@testing-library/react'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useSystemsFilterFields } from '../SystemsFilter.fields'

describe('useSystemsFilterFields', () => {
    it('returns all expected field keys', () => {
        const { result } = renderHook(() => useSystemsFilterFields(), {
            wrapper: AllProvidersWrapper,
        })
        expect(Object.keys(result.current).sort()).toEqual(
            [
                'parentSystem',
                'sparePartsCoverage',
                'criticalSpCoverage',
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
                'price',
                'orderName',
                'orderNumber',
                'orderRequestNumber',
                'orderContractNumber',
                'eun',
                'itemNotes',
                'serialNumber',
                'partNumber',
                'catalogueName',
                'catalogueDescription',
                'category',
                'catalogueSupplier',
            ].sort(),
        )
    })

    it('all fields default to disabled=false', () => {
        const { result } = renderHook(() => useSystemsFilterFields(), {
            wrapper: AllProvidersWrapper,
        })
        Object.values(result.current).forEach(field => {
            expect((field as any).disabled).toBe(false)
        })
    })

    it('partNumber field maps to catalogueNumber name', () => {
        const { result } = renderHook(() => useSystemsFilterFields(), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.partNumber.name).toBe('catalogueNumber')
    })

    it('itemUsage field carries CODEBOOK reference', () => {
        const { result } = renderHook(() => useSystemsFilterFields(), {
            wrapper: AllProvidersWrapper,
        })
        expect((result.current.itemUsage as any).codebook).toBeDefined()
    })
})
