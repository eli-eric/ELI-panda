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

const makeColumn = (id: string, visible = true, header: string | unknown = id) => ({
    id,
    getIsVisible: () => visible,
    toggleVisibility: jest.fn(),
    columnDef: { header },
})

const makeTable = (columns: any[], allVisible = true, toggleAll = jest.fn()) =>
    ({
        getAllLeafColumns: () => columns,
        getIsAllColumnsVisible: () => allVisible,
        getToggleAllColumnsVisibilityHandler: () => toggleAll,
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

    it('Toggle All forwards event in expected shape', () => {
        const toggleAll = jest.fn()
        const table = makeTable([], false, toggleAll)
        render(<ColumnVisibilityDropdown table={table} />)
        fireEvent.click(screen.getByTestId('dd-Toggle All'))
        expect(toggleAll).toHaveBeenCalledWith({ target: { checked: true } })
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
})
