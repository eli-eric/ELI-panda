import { render, renderHook, screen } from '@testing-library/react'

import { useGrantColumns } from '../grants.columns'

jest.mock('../components/grant-actions.comp', () => ({
    GrantActionsCell: () => null,
}))

jest.mock('@/utils/formatters', () => ({
    formatDate: (v: string) => `FMT:${v}`,
}))

describe('useGrantColumns', () => {
    it('returns name/code/grantGroup/updatedAt columns', () => {
        const { result } = renderHook(() => useGrantColumns())
        expect(result.current.map(c => c.id)).toEqual([
            'name',
            'code',
            'grantGroup',
            'updatedAt',
        ])
    })

    it('grantGroup accessorFn extracts nested name (handles missing group)', () => {
        const { result } = renderHook(() => useGrantColumns())
        const grantGroup = result.current.find(c => c.id === 'grantGroup')!
        const fn = (grantGroup as any).accessorFn as (r: { grantGroup?: { name?: string } }) => unknown
        expect(fn({ grantGroup: { name: 'Group' } })).toBe('Group')
        expect(fn({})).toBeUndefined()
    })

    it('updatedAt cell formats date when present', () => {
        const { result } = renderHook(() => useGrantColumns())
        const updatedAt = result.current.find(c => c.id === 'updatedAt')!
        const cell = (updatedAt as any).cell({ getValue: () => '2024-01-01' }) as JSX.Element
        render(<>{cell}</>)
        expect(screen.getByText('FMT:2024-01-01')).toBeInTheDocument()
    })

    it('updatedAt cell renders empty string when no value', () => {
        const { result } = renderHook(() => useGrantColumns())
        const updatedAt = result.current.find(c => c.id === 'updatedAt')!
        const out = (updatedAt as any).cell({ getValue: () => undefined })
        expect(out).toBe('')
    })

    it('name column is sticky', () => {
        const { result } = renderHook(() => useGrantColumns())
        const name = result.current.find(c => c.id === 'name')!
        expect((name.meta as any).sticky).toBe(true)
    })
})
