import { render, screen } from '@testing-library/react'

import { TableRow } from '../TableRow'

jest.mock('../RowCell', () => ({
    RowCell: ({ cell }: { cell: any }) => <td data-testid={`cell-${cell.id}`} />,
}))

jest.mock('react-dnd', () => ({
    useDrop: () => [{}, jest.fn()],
}))

const wrap = (children: React.ReactNode) => (
    <table>
        <tbody>{children}</tbody>
    </table>
)

const makeRow = (cells: any[], original: any = { uid: 'r-1' }) => ({
    original,
    getVisibleCells: () => cells,
})

describe('pandaTable/TableRow', () => {
    it('TableRowNoDrop renders RowCell per visible cell', () => {
        const cells = [{ id: 'a' }, { id: 'b' }]
        render(
            wrap(
                <TableRow
                    row={makeRow(cells) as any}
                    index={0}
                    getRowProps={() => ({ className: '' }) as any}
                />,
            ),
        )
        expect(screen.getByTestId('cell-a')).toBeInTheDocument()
        expect(screen.getByTestId('cell-b')).toBeInTheDocument()
    })

    it('applies even-row class on even index', () => {
        const cells = [{ id: 'a' }]
        const { container } = render(
            wrap(
                <TableRow
                    row={makeRow(cells) as any}
                    index={0}
                    getRowProps={() => ({}) as any}
                />,
            ),
        )
        expect(container.querySelector('tr')?.className).toContain('dark:bg-gray-800')
    })

    it('applies odd-row class on odd index', () => {
        const cells = [{ id: 'a' }]
        const { container } = render(
            wrap(
                <TableRow
                    row={makeRow(cells) as any}
                    index={1}
                    getRowProps={() => ({}) as any}
                />,
            ),
        )
        expect(container.querySelector('tr')?.className).toContain('bg-gray-100')
    })

    it('passes through custom className', () => {
        const cells = [{ id: 'a' }]
        const { container } = render(
            wrap(
                <TableRow
                    row={makeRow(cells) as any}
                    index={0}
                    getRowProps={() => ({ className: 'custom-row' }) as any}
                />,
            ),
        )
        expect(container.querySelector('tr')?.className).toContain('custom-row')
    })

    it('TableRowOnDrop branch when dropsettings present', () => {
        const cells = [{ id: 'a' }]
        render(
            wrap(
                <TableRow
                    row={makeRow(cells) as any}
                    index={0}
                    getRowProps={() =>
                        ({
                            dropsettings: { accept: 'x', onDropHandler: jest.fn() },
                        }) as any
                    }
                />,
            ),
        )
        expect(screen.getByTestId('cell-a')).toBeInTheDocument()
    })
})
