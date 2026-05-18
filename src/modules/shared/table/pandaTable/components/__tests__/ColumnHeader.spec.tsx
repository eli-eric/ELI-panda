import { fireEvent, render, screen } from '@testing-library/react'

import { PandaTableContext } from '../../PandaTableCotrolled'
import { ColumnHeader } from '../ColumnHeader'

jest.mock('react-dnd', () => ({
    useDrop: () => [{}, jest.fn()],
    useDrag: () => [{ isDragging: false }, jest.fn(), jest.fn()],
}))

jest.mock('@tanstack/react-table', () => ({
    flexRender: (header: any) => header,
}))

jest.mock('../Filter', () => ({
    Filter: () => <div data-testid="filter" />,
}))

const wrap = (children: React.ReactNode, settings: any = {}) => (
    <table>
        <thead>
            <PandaTableContext.Provider
                value={{ settings, tableId: 't', loading: false } as any}
            >
                <tr>{children}</tr>
            </PandaTableContext.Provider>
        </thead>
    </table>
)

const makeHeader = (overrides: Record<string, unknown> = {}) => ({
    id: 'h-1',
    colSpan: 1,
    isPlaceholder: false,
    column: {
        id: 'h-1',
        columnDef: { header: 'My Col', meta: {} },
        getCanSort: () => true,
        getToggleSortingHandler: () => jest.fn(),
        getIsSorted: () => false,
        getIsFiltered: () => false,
        getCanFilter: () => false,
        ...((overrides.column as any) ?? {}),
    },
    getSize: () => 100,
    getContext: () => ({}),
    ...overrides,
})

const makeTable = () => ({
    getState: () => ({ columnOrder: ['h-1'] }),
    setColumnOrder: jest.fn(),
    getAllColumns: () => [],
})

describe('pandaTable/ColumnHeader', () => {
    it('renders header content', () => {
        render(
            wrap(
                <ColumnHeader
                    header={makeHeader() as any}
                    table={makeTable() as any}
                    index={0}
                />,
            ),
        )
        expect(screen.getByText('My Col')).toBeInTheDocument()
    })

    it('clicking sortable header calls toggleSortingHandler', () => {
        const toggle = jest.fn()
        const header = makeHeader() as any
        header.column.getToggleSortingHandler = () => toggle
        render(
            wrap(
                <ColumnHeader header={header} table={makeTable() as any} index={0} />,
            ),
        )
        fireEvent.click(screen.getByText('My Col'))
        expect(toggle).toHaveBeenCalled()
    })

    it('shows reorder button when enableColumnReordering', () => {
        render(
            wrap(
                <ColumnHeader
                    header={makeHeader() as any}
                    table={makeTable() as any}
                    index={0}
                />,
                { enableColumnReordering: true },
            ),
        )
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })

    it('hides reorder button when meta.enableReorder is false', () => {
        const header = makeHeader() as any
        header.column.columnDef.meta = { enableReorder: false }
        render(
            wrap(
                <ColumnHeader header={header} table={makeTable() as any} index={0} />,
                { enableColumnReordering: true },
            ),
        )
        expect(screen.queryAllByRole('button').length).toBe(0)
    })

    it('renders Filter when enableFiltering + canFilter', () => {
        const header = makeHeader() as any
        header.column.getCanFilter = () => true
        render(
            wrap(
                <ColumnHeader header={header} table={makeTable() as any} index={0} />,
                { enableFiltering: true },
            ),
        )
        expect(screen.getByTestId('filter')).toBeInTheDocument()
    })

    it('renders null content for isPlaceholder', () => {
        const header = makeHeader({ isPlaceholder: true }) as any
        render(
            wrap(
                <ColumnHeader header={header} table={makeTable() as any} index={0} />,
            ),
        )
        expect(screen.queryByText('My Col')).toBeNull()
    })
})
