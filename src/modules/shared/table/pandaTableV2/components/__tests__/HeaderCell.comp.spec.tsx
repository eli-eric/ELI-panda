import { fireEvent, render, screen } from '@testing-library/react'

import { HeaderCellComponent } from '../HeaderCell.comp'

jest.mock('@tanstack/react-table', () => ({
    flexRender: (content: any) => content,
}))

const makeHeader = (overrides: any = {}) => {
    const toggleSorting = jest.fn()
    return {
        header: {
            column: {
                columnDef: {
                    header: 'Header',
                    meta: overrides.meta ?? {},
                },
                getSize: () => overrides.size ?? 100,
                getCanSort: () => !!overrides.canSort,
                getToggleSortingHandler: () => toggleSorting,
                getIsSorted: () => overrides.isSorted ?? false,
            },
            colSpan: 1,
            getSize: () => overrides.size ?? 100,
            getContext: () => ({}),
        } as any,
        headerIndex: overrides.headerIndex ?? 0,
        columns: overrides.columns ?? [],
        _toggleSorting: toggleSorting,
    }
}

const wrap = (children: React.ReactNode) => (
    <table>
        <thead>
            <tr>{children}</tr>
        </thead>
    </table>
)

describe('HeaderCellComponent', () => {
    it('renders th with header text', () => {
        const { header, headerIndex, columns } = makeHeader()
        render(wrap(<HeaderCellComponent header={header} headerIndex={headerIndex} columns={columns} />))
        expect(screen.getByText('Header')).toBeInTheDocument()
    })

    it('renders null when meta.noHeader', () => {
        const { header, headerIndex, columns } = makeHeader({ meta: { noHeader: true } })
        const { container } = render(
            wrap(<HeaderCellComponent header={header} headerIndex={headerIndex} columns={columns} />),
        )
        expect(container.querySelector('th')).toBeNull()
    })

    it('clicking sortable header inner div invokes toggle handler', () => {
        const built = makeHeader({ canSort: true })
        const { container } = render(
            wrap(
                <HeaderCellComponent
                    header={built.header}
                    headerIndex={built.headerIndex}
                    columns={built.columns}
                />,
            ),
        )
        const innerDiv = container.querySelector('th > div') as HTMLElement
        fireEvent.click(innerDiv)
        expect(built._toggleSorting).toHaveBeenCalled()
    })

    it('does not call sort when not sortable', () => {
        const built = makeHeader({ canSort: false })
        const { container } = render(
            wrap(
                <HeaderCellComponent
                    header={built.header}
                    headerIndex={built.headerIndex}
                    columns={built.columns}
                />,
            ),
        )
        const innerDiv = container.querySelector('th > div') as HTMLElement
        fireEvent.click(innerDiv)
        expect(built._toggleSorting).not.toHaveBeenCalled()
    })

    it('shows ArrowUp when sorted asc', () => {
        const { header, headerIndex, columns } = makeHeader({ isSorted: 'asc' })
        const { container } = render(
            wrap(<HeaderCellComponent header={header} headerIndex={headerIndex} columns={columns} />),
        )
        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('shows ArrowDown when sorted desc', () => {
        const { header, headerIndex, columns } = makeHeader({ isSorted: 'desc' })
        const { container } = render(
            wrap(<HeaderCellComponent header={header} headerIndex={headerIndex} columns={columns} />),
        )
        expect(container.querySelector('svg')).toBeInTheDocument()
    })
})
