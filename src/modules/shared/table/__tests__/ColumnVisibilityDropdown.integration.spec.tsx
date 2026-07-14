import { getCoreRowModel, type Table, useReactTable } from '@tanstack/react-table'
import { fireEvent, render, screen } from '@testing-library/react'
import { useEffect, useState } from 'react'

import { ColumnVisibilityDropdown } from '../ColumnVisibilityDropdown.comp'
import { useVisibility } from '../pandaTable/hooks/useVisibility'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuSeparator: () => <hr />,
    DropdownMenuCheckboxItem: ({
        children,
        checked,
        onCheckedChange,
    }: {
        children: React.ReactNode
        checked: boolean
        onCheckedChange: (v: boolean) => void
    }) => (
        <button
            data-testid={`dd-${typeof children === 'string' ? children : 'item'}`}
            data-checked={String(checked)}
            onClick={() => onCheckedChange(!checked)}
        >
            {children}
        </button>
    ),
}))

const TABLE_ID = 'visibility-integration'

type TestRow = { name: string; prop: string }

// Mirrors CatalogueItems.table.tsx: the child owns the table and its
// visibility state (useVisibility -> localStorage) and reports the table up.
const TableOwner = ({ onTableReady }: { onTableReady: (table: Table<TestRow>) => void }) => {
    const [columnVisibility, setColumnVisibility] = useVisibility(TABLE_ID)
    const table = useReactTable<TestRow>({
        data: [],
        columns: [
            { id: 'name', header: 'Name' },
            { id: 'prop', header: 'Prop' },
        ],
        state: { columnVisibility },
        onColumnVisibilityChange: setColumnVisibility,
        filterFns: { fuzzy: () => true },
        getCoreRowModel: getCoreRowModel(),
    })
    useEffect(() => {
        onTableReady(table)
    }, [onTableReady, table])
    return (
        <div data-testid="visible-columns">
            {table
                .getVisibleLeafColumns()
                .map(column => column.id)
                .join(',')}
        </div>
    )
}

// Mirrors Catalogue.cont.tsx / CatalogueItemsPanel.cont.tsx: the parent renders
// the dropdown from an onTableReady-captured table and its own useVisibility
// subscription.
const Container = () => {
    const [table, setTable] = useState<Table<TestRow> | null>(null)
    const [columnVisibility] = useVisibility(TABLE_ID)
    return (
        <>
            {table ? (
                <ColumnVisibilityDropdown table={table} columnVisibility={columnVisibility} />
            ) : null}
            <TableOwner onTableReady={setTable} />
        </>
    )
}

describe('ColumnVisibilityDropdown rendered outside the table-owning component', () => {
    beforeEach(() => {
        window.localStorage.clear()
    })

    it('unchecking hides the column and the checkbox reflects it immediately', () => {
        render(<Container />)
        expect(screen.getByTestId('visible-columns').textContent).toBe('name,prop')
        expect(screen.getByTestId('dd-Prop').getAttribute('data-checked')).toBe('true')

        fireEvent.click(screen.getByTestId('dd-Prop'))
        expect(screen.getByTestId('visible-columns').textContent).toBe('name')
        expect(screen.getByTestId('dd-Prop').getAttribute('data-checked')).toBe('false')

        fireEvent.click(screen.getByTestId('dd-Prop'))
        expect(screen.getByTestId('visible-columns').textContent).toBe('name,prop')
        expect(screen.getByTestId('dd-Prop').getAttribute('data-checked')).toBe('true')
    })

    it('persists the visibility choice under the table id', () => {
        render(<Container />)
        fireEvent.click(screen.getByTestId('dd-Prop'))
        expect(
            JSON.parse(window.localStorage.getItem(`columnVisibility-${TABLE_ID}`) ?? '{}'),
        ).toEqual({ prop: false })
    })
})
