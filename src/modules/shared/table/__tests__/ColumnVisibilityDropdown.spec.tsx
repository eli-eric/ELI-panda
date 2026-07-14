import { fireEvent, render, screen } from '@testing-library/react'

import { ColumnVisibilityDropdown } from '../ColumnVisibilityDropdown.comp'

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

const makeColumn = (
    id: string,
    visible = true,
    header: string | unknown = id,
    canHide = true,
    title?: string,
) => ({
    id,
    getCanHide: () => canHide,
    getIsVisible: () => visible,
    toggleVisibility: jest.fn(),
    columnDef: { header, meta: title ? { title } : undefined },
})

const makeTable = (columns: any[]) =>
    ({
        getAllLeafColumns: () => columns,
        setColumnVisibility: jest.fn(),
    }) as any

describe('ColumnVisibilityDropdown', () => {
    it('renders trigger + one item per column', () => {
        const table = makeTable([makeColumn('a', true, 'Col A'), makeColumn('b', false, 'Col B')])
        render(<ColumnVisibilityDropdown table={table} />)
        expect(screen.getByTestId('column-visibility-trigger')).toBeInTheDocument()
        expect(screen.getByTestId('dd-Col A')).toBeInTheDocument()
        expect(screen.getByTestId('dd-Col B')).toBeInTheDocument()
    })

    it('skips excluded columns', () => {
        const table = makeTable([makeColumn('a', true, 'Col A'), makeColumn('b', true, 'Col B')])
        render(<ColumnVisibilityDropdown table={table} excludeColumns={['b']} />)
        expect(screen.getByTestId('dd-Col A')).toBeInTheDocument()
        expect(screen.queryByTestId('dd-Col B')).toBeNull()
    })

    it('skips columns that cannot be hidden', () => {
        const table = makeTable([
            makeColumn('hideable', true, 'Hideable'),
            makeColumn('fixed', true, 'Fixed', false),
        ])
        render(<ColumnVisibilityDropdown table={table} />)
        expect(screen.getByTestId('dd-Hideable')).toBeInTheDocument()
        expect(screen.queryByTestId('dd-Fixed')).toBeNull()
    })

    it('Toggle All updates only the columns listed in the dropdown', () => {
        const table = makeTable([
            makeColumn('a', true, 'Col A'),
            makeColumn('excluded', true, 'Excluded'),
            makeColumn('fixed', true, 'Fixed', false),
        ])
        render(<ColumnVisibilityDropdown table={table} excludeColumns={['excluded']} />)
        fireEvent.click(screen.getByTestId('dd-Toggle All'))
        expect(table.setColumnVisibility).toHaveBeenCalledTimes(1)
        const updater = table.setColumnVisibility.mock.calls[0][0]
        // excluded + non-hideable columns keep their previous state untouched
        expect(updater({ excluded: false })).toEqual({ excluded: false, a: false })
    })

    it('Toggle All checkmark reflects only the listed columns', () => {
        const table = makeTable([
            makeColumn('a', true, 'Col A'),
            makeColumn('hidden-excluded', false, 'Hidden'),
        ])
        render(<ColumnVisibilityDropdown table={table} excludeColumns={['hidden-excluded']} />)
        expect(screen.getByTestId('dd-Toggle All').getAttribute('data-checked')).toBe('true')
    })

    it('per-column click flips visibility', () => {
        const col = makeColumn('a', false, 'Col A')
        const table = makeTable([col])
        render(<ColumnVisibilityDropdown table={table} />)
        fireEvent.click(screen.getByTestId('dd-Col A'))
        expect(col.toggleVisibility).toHaveBeenCalledWith(true)
    })

    it('falls back to column.id when header is not a string', () => {
        const table = makeTable([makeColumn('only-id', true, () => 'Node')])
        render(<ColumnVisibilityDropdown table={table} />)
        expect(screen.getByTestId('dd-only-id')).toBeInTheDocument()
    })

    it('uses the metadata title when header is not a string', () => {
        const table = makeTable([
            makeColumn('property-uid', true, () => 'Node', true, 'Property name'),
        ])
        render(<ColumnVisibilityDropdown table={table} />)
        expect(screen.getByTestId('dd-Property name')).toBeInTheDocument()
        expect(screen.queryByTestId('dd-property-uid')).toBeNull()
    })

    it('derives checked state from the columnVisibility prop over the table instance', () => {
        // the table instance still reports the column as visible…
        const table = makeTable([makeColumn('a', true, 'Col A')])
        // …but the caller's live visibility state says it is hidden
        render(<ColumnVisibilityDropdown table={table} columnVisibility={{ a: false }} />)
        expect(screen.getByTestId('dd-Col A').getAttribute('data-checked')).toBe('false')
        expect(screen.getByTestId('dd-Toggle All').getAttribute('data-checked')).toBe('false')
    })
})
