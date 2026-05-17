import { renderHook } from '@testing-library/react'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useRelationshipsColumns } from '../Relationships.columns'

describe('useRelationshipsColumns', () => {
    it('returns 6 columns without actions when canEdit=false', () => {
        const { result } = renderHook(() => useRelationshipsColumns(false, undefined), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.map(c => c.id)).toEqual([
            'icon',
            'direction',
            'relationship',
            'name',
            'systemCode',
            'systemType',
        ])
    })

    it('adds actions column when canEdit=true + currentSystemUid', () => {
        const { result } = renderHook(
            () => useRelationshipsColumns(true, 'sys-1'),
            { wrapper: AllProvidersWrapper },
        )
        expect(result.current.map(c => c.id)).toContain('actions')
    })

    it('does NOT add actions when currentSystemUid missing', () => {
        const { result } = renderHook(() => useRelationshipsColumns(true, undefined), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.map(c => c.id)).not.toContain('actions')
    })

    it('actions meta.className text-right + sort disabled', () => {
        const { result } = renderHook(
            () => useRelationshipsColumns(true, 'sys-1'),
            { wrapper: AllProvidersWrapper },
        )
        const actions = result.current.find(c => c.id === 'actions') as any
        expect(actions.meta?.className).toBe('text-right')
        expect(actions.enableSorting).toBe(false)
    })

    it('name column accessor returns nodeName', () => {
        const { result } = renderHook(() => useRelationshipsColumns(false, undefined), {
            wrapper: AllProvidersWrapper,
        })
        const name = result.current.find(c => c.id === 'name') as any
        expect(name.accessorFn({ nodeName: 'My Sys' })).toBe('My Sys')
    })
})
