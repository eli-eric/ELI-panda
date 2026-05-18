import { fireEvent, render, renderHook, screen } from '@testing-library/react'

import { useSystemSelectColumns } from '../SystemSelect.columns'

jest.mock('@/modules/systems/hooks/useSubsystems', () => ({
    useSubsystems: () => ({ setUid: jest.fn() }),
}))

jest.mock('@/modules/systems/components/table/cells/IconCell', () => ({
    IconCell: () => <span data-testid="icon-cell" />,
}))

jest.mock('@/modules/systems/components/table/cells/SystemNameCell', () => ({
    SystemNameCell: () => <span data-testid="system-name-cell" />,
}))

describe('useSystemSelectColumns', () => {
    it('first column is selection', () => {
        const { result } = renderHook(() =>
            useSystemSelectColumns({
                tableId: 't',
                onSystemToggle: jest.fn(),
            }),
        )
        expect(result.current[0].id).toBe('selection')
    })

    it('selection cell unchecked by default', () => {
        const { result } = renderHook(() =>
            useSystemSelectColumns({
                tableId: 't',
                onSystemToggle: jest.fn(),
            }),
        )
        const cell = (result.current[0] as any).cell({
            row: { original: { uid: 's-1', name: 'S' } },
        }) as JSX.Element
        render(cell)
        expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('unchecked')
    })

    it('selection cell checked when selectedSystemUid matches', () => {
        const { result } = renderHook(() =>
            useSystemSelectColumns({
                tableId: 't',
                selectedSystemUid: 's-1',
                onSystemToggle: jest.fn(),
            }),
        )
        const cell = (result.current[0] as any).cell({
            row: { original: { uid: 's-1', name: 'S' } },
        }) as JSX.Element
        render(cell)
        expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('checked')
    })

    it('checkbox click invokes onSystemToggle with the system', () => {
        const onSystemToggle = jest.fn()
        const { result } = renderHook(() =>
            useSystemSelectColumns({
                tableId: 't',
                onSystemToggle,
            }),
        )
        const system = { uid: 's-1', name: 'S' }
        const cell = (result.current[0] as any).cell({
            row: { original: system },
        }) as JSX.Element
        render(cell)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(onSystemToggle).toHaveBeenCalledWith(system)
    })
})
