import { renderHook } from '@testing-library/react'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useSparePartsColumns } from '../SpareParts.columns'

describe('useSparePartsColumns', () => {
    it('returns 7 columns', () => {
        const { result } = renderHook(() => useSparePartsColumns(), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.map(c => c.id)).toEqual([
            'icon',
            'name',
            'location',
            'coverage',
            'partNumber',
            'eun',
            'actions',
        ])
    })

    it('location accessor formats "name - code"', () => {
        const { result } = renderHook(() => useSparePartsColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const loc = result.current.find(c => c.id === 'location') as any
        expect(
            loc.accessorFn({ node: { location: { name: 'L', code: 'L-1' } } }),
        ).toBe('L - L-1')
        expect(loc.accessorFn({ node: { location: null } })).toBe('')
    })

    it('coverage accessor formats with toFixed(2)', () => {
        const { result } = renderHook(() => useSparePartsColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const cov = result.current.find(c => c.id === 'coverage') as any
        expect(cov.accessorFn({ coverage: 0.5 })).toBe('0.50')
        expect(cov.meta?.className).toBe('text-right')
    })

    it('partNumber + eun accessors traverse physicalItem path', () => {
        const { result } = renderHook(() => useSparePartsColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const pn = result.current.find(c => c.id === 'partNumber') as any
        const eun = result.current.find(c => c.id === 'eun') as any
        expect(
            pn.accessorFn({
                node: {
                    physicalItem: { catalogueItem: { catalogueNumber: 'CN-1' } },
                },
            }),
        ).toBe('CN-1')
        expect(eun.accessorFn({ node: { physicalItem: { eun: 'E-1' } } })).toBe('E-1')
    })

    it('name accessor returns node.name', () => {
        const { result } = renderHook(() => useSparePartsColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const name = result.current.find(c => c.id === 'name') as any
        expect(name.accessorFn({ node: { name: 'Sys' } })).toBe('Sys')
    })
})
