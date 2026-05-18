import { render, screen } from '@testing-library/react'

import { TableRowComponent } from '../TableRow.comp'

jest.mock('../RowCell.comp', () => ({
    RowCellComponent: ({ cell }: { cell: any }) => <td data-testid={`cell-${cell.id}`} />,
}))

const baseRow = {
    getVisibleCells: () => [{ id: 'a' }, { id: 'b' }],
} as any

const virtualRow = { index: 0, start: 0 } as any

const wrap = (children: React.ReactNode) => <table><tbody>{children}</tbody></table>

describe('TableRowComponent', () => {
    it('renders one cell per visible cell', () => {
        render(
            wrap(
                <TableRowComponent
                    virtualRow={virtualRow}
                    measureElement={jest.fn()}
                    row={baseRow}
                    getRowProps={() => ({})}
                />,
            ),
        )
        expect(screen.getByTestId('cell-a')).toBeInTheDocument()
        expect(screen.getByTestId('cell-b')).toBeInTheDocument()
    })

    it('calls measureElement on mount with the row element', () => {
        const measureElement = jest.fn()
        render(
            wrap(
                <TableRowComponent
                    virtualRow={virtualRow}
                    measureElement={measureElement}
                    row={baseRow}
                    getRowProps={() => ({})}
                />,
            ),
        )
        expect(measureElement).toHaveBeenCalled()
        expect(measureElement.mock.calls[0][0]).toBeInstanceOf(HTMLElement)
    })

    it('forwards extra row props (className etc.) to the tr', () => {
        const { container } = render(
            wrap(
                <TableRowComponent
                    virtualRow={virtualRow}
                    measureElement={jest.fn()}
                    row={baseRow}
                    getRowProps={() => ({ className: 'custom-row' })}
                />,
            ),
        )
        expect(container.querySelector('tr')?.className).toContain('custom-row')
    })
})
