import { render } from '@testing-library/react'

import { RowCell } from '../RowCell'

jest.mock('@tanstack/react-table', () => ({
    flexRender: (content: any) => content,
}))

const wrap = (children: React.ReactNode) => (
    <table>
        <tbody>
            <tr>{children}</tr>
        </tbody>
    </table>
)

const makeCell = (
    id: string,
    cellContent: string,
    overrides: Record<string, unknown> = {},
) => ({
    id,
    column: {
        columnDef: { cell: cellContent, meta: { ...overrides } },
        getSize: () => 100,
    },
    getContext: () => ({}),
})

const makeRow = (cells: any[]) => ({
    getAllCells: () => cells,
})

describe('pandaTable/RowCell', () => {
    it('renders flexRender content as td text', () => {
        const cells = [makeCell('c1', 'Cell A')]
        const { container } = render(
            wrap(<RowCell row={makeRow(cells) as any} cell={cells[0] as any} />),
        )
        expect(container.querySelector('td')?.textContent).toBe('Cell A')
    })

    it('applies sticky class when meta.sticky', () => {
        const cells = [makeCell('c1', 'X', { sticky: true })]
        const { container } = render(
            wrap(<RowCell row={makeRow(cells) as any} cell={cells[0] as any} />),
        )
        expect(container.querySelector('td')?.className).toContain('sticky')
    })

    it('applies opacity-50 class when loading', () => {
        const cells = [makeCell('c1', 'X')]
        const { container } = render(
            wrap(<RowCell row={makeRow(cells) as any} cell={cells[0] as any} loading />),
        )
        expect(container.querySelector('td')?.className).toContain('opacity-50')
    })

    it('passes through meta.className', () => {
        const cells = [makeCell('c1', 'X', { className: 'my-extra' })]
        const { container } = render(
            wrap(<RowCell row={makeRow(cells) as any} cell={cells[0] as any} />),
        )
        expect(container.querySelector('td')?.className).toContain('my-extra')
    })

    it('sets width style from getSize()', () => {
        const cells = [makeCell('c1', 'X')]
        const { container } = render(
            wrap(<RowCell row={makeRow(cells) as any} cell={cells[0] as any} />),
        )
        expect(container.querySelector('td')?.getAttribute('style')).toContain('width')
    })
})
