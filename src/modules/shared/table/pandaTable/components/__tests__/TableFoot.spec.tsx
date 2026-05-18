import { render, screen } from '@testing-library/react'

import { TableFoot } from '../TableFoot'

jest.mock('@tanstack/react-table', () => ({
    flexRender: (footer: any) => footer,
}))

const wrap = (children: React.ReactNode) => <table>{children}</table>

const makeHeader = (
    id: string,
    footer: string | null,
    isPlaceholder = false,
    className?: string,
) => ({
    id,
    isPlaceholder,
    column: {
        columnDef: { footer, meta: { className } },
    },
    getContext: () => ({}),
})

describe('pandaTable/TableFoot', () => {
    it('renders one tr per footer group + footer cells', () => {
        const groups = [
            {
                id: 'g1',
                headers: [makeHeader('a', 'Total A'), makeHeader('b', 'Total B')],
            },
        ]
        render(wrap(<TableFoot getFooterGroups={() => groups as any} />))
        expect(screen.getByText('Total A')).toBeInTheDocument()
        expect(screen.getByText('Total B')).toBeInTheDocument()
    })

    it('renders multiple footer groups as separate trs', () => {
        const groups = [
            { id: 'g1', headers: [makeHeader('a', 'A')] },
            { id: 'g2', headers: [makeHeader('b', 'B')] },
        ]
        const { container } = render(
            wrap(<TableFoot getFooterGroups={() => groups as any} />),
        )
        expect(container.querySelectorAll('tfoot tr').length).toBe(2)
    })

    it('renders null content for isPlaceholder cells', () => {
        const groups = [
            {
                id: 'g1',
                headers: [makeHeader('a', 'Visible'), makeHeader('b', 'Hidden', true)],
            },
        ]
        const { container } = render(
            wrap(<TableFoot getFooterGroups={() => groups as any} />),
        )
        expect(screen.getByText('Visible')).toBeInTheDocument()
        expect(container.querySelectorAll('td').length).toBe(2)
        expect(container.querySelectorAll('td')[1].textContent).toBe('')
    })

    it('applies meta.className to td', () => {
        const groups = [
            { id: 'g1', headers: [makeHeader('a', 'A', false, 'extra-cls')] },
        ]
        const { container } = render(
            wrap(<TableFoot getFooterGroups={() => groups as any} />),
        )
        expect(container.querySelector('td')?.className).toContain('extra-cls')
    })
})
