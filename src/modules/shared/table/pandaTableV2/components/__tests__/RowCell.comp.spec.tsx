import { render, screen } from '@testing-library/react'

import { RowCellComponent } from '../RowCell.comp'

jest.mock('@tanstack/react-table', () => ({
    flexRender: (content: any) => content,
}))

const makeCell = (meta: any = {}, content: React.ReactNode = 'Cell') => ({
    cell: {
        id: 'c1',
        column: {
            columnDef: { cell: content, meta },
            getSize: () => 100,
        },
        getContext: () => ({}),
    } as any,
})

const wrap = (children: React.ReactNode) => (
    <table>
        <tbody>
            <tr>{children}</tr>
        </tbody>
    </table>
)

const row = { getAllCells: () => [] } as any

describe('RowCellComponent', () => {
    it('renders cell value', () => {
        const { cell } = makeCell()
        render(wrap(<RowCellComponent cell={cell} row={row} index={0} />))
        expect(screen.getByText('Cell')).toBeInTheDocument()
    })

    it('non-sticky cell does not get sticky class', () => {
        const { cell } = makeCell()
        const { container } = render(wrap(<RowCellComponent cell={cell} row={row} index={0} />))
        expect(container.querySelector('td')?.className).not.toContain('sticky')
    })

    it('sticky cell gets sticky/backdrop classes', () => {
        const { cell } = makeCell({ sticky: true })
        const { container } = render(wrap(<RowCellComponent cell={cell} row={row} index={0} />))
        expect(container.querySelector('td')?.className).toContain('sticky')
    })

    it('extra className from meta is appended', () => {
        const { cell } = makeCell({ className: 'extra-cls' })
        const { container } = render(wrap(<RowCellComponent cell={cell} row={row} index={0} />))
        expect(container.querySelector('td')?.className).toContain('extra-cls')
    })
})
