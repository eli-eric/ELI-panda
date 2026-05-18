import { renderHook } from '@testing-library/react'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useSystemOrderColumns } from '../order.columns'

describe('useSystemOrderColumns', () => {
    it('returns 4 columns', () => {
        const { result } = renderHook(() => useSystemOrderColumns(), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.map(c => c.id)).toEqual([
            'type',
            'name',
            'orderDate',
            'isDelivered',
        ])
    })

    it('isDelivered cell renders Yes/No', () => {
        const { result } = renderHook(() => useSystemOrderColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const isDeliveredCol = result.current[3] as any
        expect(isDeliveredCol.cell({ getValue: () => true })).toBe('Yes')
        expect(isDeliveredCol.cell({ getValue: () => false })).toBe('No')
    })
})
