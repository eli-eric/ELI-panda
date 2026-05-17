import { renderHook } from '@testing-library/react'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useSpareForColumns } from '../SpareFor.columns'

describe('useSpareForColumns', () => {
    it('returns 4 base columns when tableId neither sparePart variant', () => {
        const { result } = renderHook(() => useSpareForColumns('other'), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.map(c => c.id)).toEqual([
            'icon',
            'name',
            'systemCode',
            undefined, // location column has no id
        ])
        expect(result.current.length).toBe(4)
    })

    it('adds EUN column when tableId=spareParts', () => {
        const { result } = renderHook(() => useSpareForColumns('spareParts'), {
            wrapper: AllProvidersWrapper,
        })
        const eun = result.current.find(c => c.id === 'eun') as any
        expect(eun).toBeDefined()
        expect(eun.accessorFn({ physicalItem: { eun: 'E-1' } })).toBe('E-1')
    })

    it('adds Part Number column when tableId=sparePartFor', () => {
        const { result } = renderHook(() => useSpareForColumns('sparePartFor'), {
            wrapper: AllProvidersWrapper,
        })
        const pn = result.current.find(c => c.id === 'partNumber') as any
        expect(pn).toBeDefined()
        expect(
            pn.accessorFn({
                physicalItem: { catalogueItem: { catalogueNumber: 'CN-1' } },
            }),
        ).toBe('CN-1')
    })

    it('location accessor produces "name - code" or ""', () => {
        const { result } = renderHook(() => useSpareForColumns('other'), {
            wrapper: AllProvidersWrapper,
        })
        // location is the 4th (index 3) and has no id
        const loc = result.current[3] as any
        expect(loc.accessorFn({ location: { name: 'L', code: 'L-1' } })).toBe('L - L-1')
        expect(loc.accessorFn({ location: null })).toBe('')
    })
})
