import { fireEvent, render, screen } from '@testing-library/react'

import { HeaderCellDNDComponent } from '../HeaderCell.dnd'

jest.mock('react-dnd', () => ({
    useDrop: () => [{}, jest.fn()],
    useDrag: () => [{ isDragging: false }, jest.fn(), jest.fn()],
}))

jest.mock('@tanstack/react-table', () => ({
    flexRender: (header: any) => header,
}))

const wrap = (children: React.ReactNode) => (
    <table>
        <thead>
            <tr>{children}</tr>
        </thead>
    </table>
)

const makeHeader = (overrides: Record<string, unknown> = {}) => ({
    id: 'h-1',
    colSpan: 1,
    column: {
        id: 'h-1',
        columnDef: { header: 'Col', meta: { sticky: false, noHeader: false }, ...((overrides.columnDef as any) ?? {}) },
        getCanSort: () => true,
        getToggleSortingHandler: () => jest.fn(),
        getIsSorted: () => false as any,
    },
    getSize: () => 100,
    getContext: () => ({}),
    ...overrides,
})

describe('pandaTableV2/HeaderCellDND', () => {
    it('returns null when meta.noHeader', () => {
        const header = makeHeader({
            columnDef: { header: 'X', meta: { noHeader: true } },
        }) as any
        header.column.columnDef.meta = { noHeader: true }
        const { container } = render(
            wrap(
                <HeaderCellDNDComponent
                    header={header as any}
                    headerIndex={0}
                    columns={[]}
                    setColumnOrder={jest.fn()}
                    columnOrder={[]}
                />,
            ),
        )
        expect(container.querySelector('th')).toBeNull()
    })

    it('renders header content', () => {
        const header = makeHeader() as any
        header.column.columnDef.header = 'My Header'
        render(
            wrap(
                <HeaderCellDNDComponent
                    header={header as any}
                    headerIndex={0}
                    columns={[]}
                    setColumnOrder={jest.fn()}
                    columnOrder={[]}
                />,
            ),
        )
        expect(screen.getByText('My Header')).toBeInTheDocument()
    })

    it('clicking sortable header invokes toggleSortingHandler', () => {
        const toggle = jest.fn()
        const header = makeHeader() as any
        header.column.getToggleSortingHandler = () => toggle
        render(
            wrap(
                <HeaderCellDNDComponent
                    header={header as any}
                    headerIndex={0}
                    columns={[]}
                    setColumnOrder={jest.fn()}
                    columnOrder={[]}
                />,
            ),
        )
        fireEvent.click(screen.getByText('Col'))
        expect(toggle).toHaveBeenCalled()
    })

    it('renders no GripVertical when sticky', () => {
        const header = makeHeader() as any
        header.column.columnDef.meta = { sticky: true, noHeader: false }
        const { container } = render(
            wrap(
                <HeaderCellDNDComponent
                    header={header as any}
                    headerIndex={0}
                    columns={[]}
                    setColumnOrder={jest.fn()}
                    columnOrder={[]}
                />,
            ),
        )
        expect(container.querySelector('button')).toBeNull()
    })
})
