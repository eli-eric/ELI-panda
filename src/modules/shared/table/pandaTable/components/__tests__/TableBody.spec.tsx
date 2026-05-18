import { render, screen } from '@testing-library/react'

import { TableBody } from '../TableBody'

jest.mock('../TableRow', () => ({
    TableRow: ({ row, index }: { row: any; index: number }) => (
        <tr data-testid={`row-${index}`} data-id={row.id} />
    ),
}))

const wrap = (children: React.ReactNode) => <table>{children}</table>

describe('pandaTable/TableBody', () => {
    it('renders one TableRow per row from getRowModel', () => {
        const rows = [
            { id: 'a' } as any,
            { id: 'b' } as any,
            { id: 'c' } as any,
        ]
        render(
            wrap(
                <TableBody
                    getRowModel={() => ({ rows }) as any}
                    getRowProps={() => ({}) as any}
                />,
            ),
        )
        expect(screen.getByTestId('row-0').dataset.id).toBe('a')
        expect(screen.getByTestId('row-1').dataset.id).toBe('b')
        expect(screen.getByTestId('row-2').dataset.id).toBe('c')
    })

    it('renders empty tbody when no rows', () => {
        const { container } = render(
            wrap(
                <TableBody
                    getRowModel={() => ({ rows: [] }) as any}
                    getRowProps={() => ({}) as any}
                />,
            ),
        )
        expect(container.querySelectorAll('tr').length).toBe(0)
    })
})
