import { renderHook } from '@testing-library/react'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useSparePartsTabColumns } from '../SparePartsTab.columns'

describe('useSparePartsTabColumns', () => {
    it('produces 6 columns with expected ids', () => {
        const { result } = renderHook(() => useSparePartsTabColumns(), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.map(c => c.id)).toEqual([
            'icon',
            'name',
            'location',
            'coverage',
            'partNumber',
            'eun',
        ])
    })

    it('icon column has enableHiding=false + width 32', () => {
        const { result } = renderHook(() => useSparePartsTabColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const icon = result.current[0] as any
        expect(icon.enableHiding).toBe(false)
        expect(icon.size).toBe(32)
    })

    it('coverage column meta.className text-right + sorts numerically', () => {
        const { result } = renderHook(() => useSparePartsTabColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const coverage = result.current[3] as any
        expect(coverage.meta?.className).toBe('text-right')
        expect(coverage.sortingFn).toBe('basic')
    })

    it('location accessorFn formats "name - code" or just name', () => {
        const { result } = renderHook(() => useSparePartsTabColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const location = result.current[2] as any
        expect(location.accessorFn({ node: { location: { name: 'Room', code: 'R-1' } } })).toBe(
            'Room - R-1',
        )
        expect(location.accessorFn({ node: { location: { name: 'NoCode' } } })).toBe('NoCode')
        expect(location.accessorFn({ node: { location: null } })).toBe('')
    })

    it('partNumber + eun accessors return empty strings on missing path', () => {
        const { result } = renderHook(() => useSparePartsTabColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const partNumber = result.current[4] as any
        const eun = result.current[5] as any
        expect(partNumber.accessorFn({ node: {} })).toBe('')
        expect(eun.accessorFn({ node: {} })).toBe('')
    })

    it('coverage cell renders fixed-2 number', () => {
        const { result } = renderHook(() => useSparePartsTabColumns(), {
            wrapper: AllProvidersWrapper,
        })
        const coverage = result.current[3] as any
        const cell = coverage.cell({ getValue: () => 0.567 })
        expect(cell).toBe('0.57')
    })
})
