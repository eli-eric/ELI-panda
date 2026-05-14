import { fireEvent, render, screen } from '@testing-library/react'

import { SelectAllCheckbox } from '../select-all.checkbox'

const makeTable = (rows: Array<{ id: string; original: any }>) => {
    let selection: Record<string, boolean> = {}
    return {
        getRowModel: () => ({ rows }),
        getRow: (id: string) => rows.find(r => r.id === id),
        setRowSelection: (updater: any) => {
            selection = typeof updater === 'function' ? updater(selection) : updater
        },
        _getSelection: () => selection,
    } as any
}

describe('SelectAllCheckbox (systemsRelations)', () => {
    it('unchecked by default', () => {
        const table = makeTable([])
        render(<SelectAllCheckbox table={table} setSelectedUids={jest.fn()} />)
        expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('unchecked')
    })

    it('check pushes top-level uids into setSelectedUids', () => {
        const rows = [
            { id: 'a', original: { uid: 'a' } },
            { id: 'b', original: { uid: 'b' } },
            { id: 'a.1', original: { uid: 'a.1' } },
        ]
        const setSelectedUids = jest.fn()
        const table = makeTable(rows)
        render(<SelectAllCheckbox table={table} setSelectedUids={setSelectedUids} />)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(setSelectedUids).toHaveBeenCalledWith(['a', 'b'])
        expect(table._getSelection()).toEqual({ a: true, b: true })
    })

    it('uncheck clears selectedUids + row selection', () => {
        const rows = [{ id: 'a', original: { uid: 'a' } }]
        const setSelectedUids = jest.fn()
        const table = makeTable(rows)
        render(<SelectAllCheckbox table={table} setSelectedUids={setSelectedUids} />)
        fireEvent.click(screen.getByRole('checkbox')) // check
        fireEvent.click(screen.getByRole('checkbox')) // uncheck
        expect(setSelectedUids).toHaveBeenLastCalledWith([])
        expect(table._getSelection()).toEqual({})
    })
})
