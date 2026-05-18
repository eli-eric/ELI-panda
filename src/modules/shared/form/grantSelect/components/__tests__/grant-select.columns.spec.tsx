import { fireEvent, render, renderHook, screen } from '@testing-library/react'

import { useGrantSelectColumns } from '../grant-select.columns'

describe('useGrantSelectColumns', () => {
    it('returns a select column + others', () => {
        const { result } = renderHook(() =>
            useGrantSelectColumns({ selectedGrants: [], onToggle: jest.fn() }),
        )
        expect(result.current[0].id).toBe('select')
        const ids = result.current.map(c => c.id)
        expect(ids).toContain('name')
        expect(ids).toContain('code')
        expect(ids).toContain('grantGroup')
    })

    it('select cell unchecked by default', () => {
        const { result } = renderHook(() =>
            useGrantSelectColumns({ selectedGrants: [], onToggle: jest.fn() }),
        )
        const cell = (result.current[0] as any).cell({
            row: { original: { uid: 'g-1', name: 'G' } },
        }) as JSX.Element
        render(cell)
        expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('unchecked')
    })

    it('select cell checked when grant uid in selectedGrants', () => {
        const { result } = renderHook(() =>
            useGrantSelectColumns({
                selectedGrants: [{ uid: 'g-1' } as any],
                onToggle: jest.fn(),
            }),
        )
        const cell = (result.current[0] as any).cell({
            row: { original: { uid: 'g-1', name: 'G' } },
        }) as JSX.Element
        render(cell)
        expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('checked')
    })

    it('checkbox click invokes onToggle with the grant', () => {
        const onToggle = jest.fn()
        const { result } = renderHook(() =>
            useGrantSelectColumns({ selectedGrants: [], onToggle }),
        )
        const grant = { uid: 'g-1', name: 'G' }
        const cell = (result.current[0] as any).cell({
            row: { original: grant },
        }) as JSX.Element
        render(cell)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(onToggle).toHaveBeenCalledWith(grant)
    })
})
