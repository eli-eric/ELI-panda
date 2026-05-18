import { render, screen } from '@testing-library/react'

import { TableHead } from '../TableHead'

jest.mock('../ColumnHeader', () => ({
    ColumnHeader: ({ header }: { header: any }) => (
        <th data-testid={`col-${header.id}`} />
    ),
}))

const wrap = (children: React.ReactNode) => <table>{children}</table>

const makeHeader = (id: string, noHeader = false) => ({
    id,
    column: { columnDef: { meta: { noHeader } } },
})

describe('pandaTable/TableHead', () => {
    it('renders ColumnHeader for each non-noHeader column', () => {
        const headerGroups = [
            { id: 'g1', headers: [makeHeader('a'), makeHeader('b'), makeHeader('c')] },
        ]
        render(
            wrap(
                <TableHead
                    table={{ getHeaderGroups: () => headerGroups } as any}
                />,
            ),
        )
        expect(screen.getByTestId('col-a')).toBeInTheDocument()
        expect(screen.getByTestId('col-b')).toBeInTheDocument()
        expect(screen.getByTestId('col-c')).toBeInTheDocument()
    })

    it('skips columns whose meta.noHeader is true', () => {
        const headerGroups = [
            { id: 'g1', headers: [makeHeader('a'), makeHeader('hidden', true), makeHeader('c')] },
        ]
        render(
            wrap(
                <TableHead
                    table={{ getHeaderGroups: () => headerGroups } as any}
                />,
            ),
        )
        expect(screen.getByTestId('col-a')).toBeInTheDocument()
        expect(screen.queryByTestId('col-hidden')).toBeNull()
        expect(screen.getByTestId('col-c')).toBeInTheDocument()
    })

    it('renders one tr per headerGroup', () => {
        const headerGroups = [
            { id: 'g1', headers: [makeHeader('a')] },
            { id: 'g2', headers: [makeHeader('b')] },
        ]
        const { container } = render(
            wrap(
                <TableHead
                    table={{ getHeaderGroups: () => headerGroups } as any}
                />,
            ),
        )
        expect(container.querySelectorAll('tr').length).toBe(2)
    })
})
