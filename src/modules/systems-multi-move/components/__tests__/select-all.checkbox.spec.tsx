import { fireEvent, render, screen } from '@testing-library/react'

import { useSystemsMoveStore } from '../../store/useSystemsMoveStore'
import { SelectAllCheckbox } from '../select-all.checkbox'

jest.mock('../../store/useSystemsMoveStore', () => ({
    useSystemsMoveStore: jest.fn(),
}))

const mockUseSystemsMoveStore = useSystemsMoveStore as unknown as jest.Mock

let resetMovingSystems: jest.Mock
let setMovingSystems: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    resetMovingSystems = jest.fn()
    setMovingSystems = jest.fn()
    mockUseSystemsMoveStore.mockReturnValue({ resetMovingSystems, setMovingSystems })
})

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

describe('SelectAllCheckbox', () => {
    it('renders unchecked by default', () => {
        const table = makeTable([])
        render(<SelectAllCheckbox table={table} />)
        expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('unchecked')
    })

    it('checking selects all top-level rows + populates store', () => {
        const rows = [
            { id: 'a', original: { uid: 'a' } },
            { id: 'b', original: { uid: 'b' } },
            { id: 'a.1', original: { uid: 'a.1' } },
        ]
        const table = makeTable(rows)
        render(<SelectAllCheckbox table={table} />)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(setMovingSystems).toHaveBeenCalledWith([
            rows[0].original,
            rows[1].original,
        ])
        expect(table._getSelection()).toEqual({ a: true, b: true })
    })

    it('unchecking resets store + clears row selection', () => {
        const rows = [{ id: 'a', original: { uid: 'a' } }]
        const table = makeTable(rows)
        render(<SelectAllCheckbox table={table} />)
        // Check first
        fireEvent.click(screen.getByRole('checkbox'))
        // Then uncheck
        fireEvent.click(screen.getByRole('checkbox'))
        expect(resetMovingSystems).toHaveBeenCalled()
        expect(table._getSelection()).toEqual({})
    })

    it('deduplicates nested rows by top-level prefix', () => {
        const rows = [
            { id: 'a', original: { uid: 'a' } },
            { id: 'a.1', original: { uid: 'a-child' } },
            { id: 'a.2', original: { uid: 'a-child2' } },
            { id: 'b', original: { uid: 'b' } },
        ]
        const table = makeTable(rows)
        render(<SelectAllCheckbox table={table} />)
        fireEvent.click(screen.getByRole('checkbox'))
        const selection = table._getSelection()
        expect(Object.keys(selection).sort()).toEqual(['a', 'b'])
    })
})
