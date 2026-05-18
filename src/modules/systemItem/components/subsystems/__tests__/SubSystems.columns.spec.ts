import { renderHook } from '@testing-library/react'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useSubSystemsColumns } from '../SubSustems.columns'

describe('useSubSystemsColumns', () => {
    it('returns 5 columns', () => {
        const { result } = renderHook(() => useSubSystemsColumns(), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.length).toBe(5)
    })

    it('location accessor formats "name - code"', () => {
        const { result } = renderHook(() => useSubSystemsColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const loc = result.current[2] as any
        expect(loc.accessorFn({ location: { name: 'Room', code: 'R-1' } })).toBe('Room - R-1')
        expect(loc.accessorFn({ location: null })).toBe('')
    })

    it('sp_coverage accessor formats with .toFixed(2)', () => {
        const { result } = renderHook(() => useSubSystemsColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const sp = result.current.find(c => c.id === 'sp_coverage') as any
        expect(sp.accessorFn({ sp_coverage: 0.5 })).toBe('0.50')
        expect(sp.accessorFn({ sp_coverage: null })).toBe('')
        expect(sp.meta?.className).toBe('text-right')
    })
})
