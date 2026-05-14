import { render, screen } from '@testing-library/react'

import { TableRowDNDComponent } from '../TableRow.dnd'

jest.mock('react-dnd', () => ({
    useDrop: () => [{}, jest.fn()],
}))

jest.mock('../RowCell.comp', () => ({
    RowCellComponent: ({ cell, index }: { cell: any; index: number }) => (
        <td data-testid={`cell-${cell.id}`} data-index={index} />
    ),
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

describe('pandaTableV2/TableRowDND', () => {
    it('renders RowCellComponent per visible cell', () => {
        const cells = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
        render(
            wrap(
                <TableRowDNDComponent
                    virtualRow={{ index: 0, start: 0 } as any}
                    measureElement={jest.fn()}
                    row={makeRow(cells) as any}
                    getRowProps={() => ({}) as any}
                    tableId="t-1"
                />,
            ),
        )
        expect(screen.getByTestId('cell-a').dataset.index).toBe('0')
        expect(screen.getByTestId('cell-c').dataset.index).toBe('2')
    })

    it('invokes measureElement on mount', () => {
        const measure = jest.fn()
        render(
            wrap(
                <TableRowDNDComponent
                    virtualRow={{ index: 0, start: 0 } as any}
                    measureElement={measure}
                    row={makeRow([{ id: 'a' }]) as any}
                    getRowProps={() => ({}) as any}
                    tableId="t-1"
                />,
            ),
        )
        expect(measure).toHaveBeenCalled()
    })

    it('applies even/odd row classes by virtualRow.index', () => {
        const { container, rerender } = render(
            wrap(
                <TableRowDNDComponent
                    virtualRow={{ index: 0, start: 0 } as any}
                    measureElement={jest.fn()}
                    row={makeRow([{ id: 'a' }]) as any}
                    getRowProps={() => ({}) as any}
                    tableId="t-1"
                />,
            ),
        )
        expect(container.querySelector('tr')?.className).toContain('bg-background')

        rerender(
            wrap(
                <TableRowDNDComponent
                    virtualRow={{ index: 1, start: 49 } as any}
                    measureElement={jest.fn()}
                    row={makeRow([{ id: 'a' }]) as any}
                    getRowProps={() => ({}) as any}
                    tableId="t-1"
                />,
            ),
        )
        expect(container.querySelector('tr')?.className).toContain('bg-muted/50')
    })

    it('renders padding td when virtualPaddingLeft set', () => {
        const { container } = render(
            wrap(
                <TableRowDNDComponent
                    virtualRow={{ index: 0, start: 0 } as any}
                    measureElement={jest.fn()}
                    row={makeRow([{ id: 'a' }]) as any}
                    getRowProps={() => ({}) as any}
                    virtualPaddingLeft="100px"
                    tableId="t-1"
                />,
            ),
        )
        expect(container.querySelectorAll('td').length).toBe(2)
    })

    it('passes through custom className from getRowProps', () => {
        const { container } = render(
            wrap(
                <TableRowDNDComponent
                    virtualRow={{ index: 0, start: 0 } as any}
                    measureElement={jest.fn()}
                    row={makeRow([{ id: 'a' }]) as any}
                    getRowProps={() => ({ className: 'custom-cls' }) as any}
                    tableId="t-1"
                />,
            ),
        )
        expect(container.querySelector('tr')?.className).toContain('custom-cls')
    })
})
