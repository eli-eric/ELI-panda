import { render, screen } from '@testing-library/react'

import { TableContainer } from '../Table.cont'

jest.mock('@/components/empty-section/EmptyResults', () => ({
    __esModule: true,
    default: () => <div data-testid="empty-results" />,
}))

jest.mock('@/components/table/PaginationV2.comp', () => ({
    PaginationV2: ({ total }: { total: number }) => (
        <div data-testid="pagination" data-total={total} />
    ),
}))

jest.mock('../../../ColumnVisibilityDropdown.comp', () => ({
    ColumnVisibilityDropdown: () => <div data-testid="col-vis" />,
}))

const makeTable = () =>
    ({
        getState: () => ({ pagination: { pageIndex: 0 } }),
        previousPage: jest.fn(),
        nextPage: jest.fn(),
        getPageCount: () => 3,
        getCanPreviousPage: () => false,
        getCanNextPage: () => true,
    }) as any

describe('pandaTableV2/TableContainer', () => {
    it('renders tableHeading when provided', () => {
        render(
            <TableContainer table={makeTable()} tableHeading="My Table">
                <tbody />
            </TableContainer>,
        )
        expect(screen.getByText('My Table')).toBeInTheDocument()
    })

    it('renders ColumnVisibilityDropdown when enableColumnHiding + no toolbar', () => {
        render(
            <TableContainer table={makeTable()} enableColumnHiding>
                <tbody />
            </TableContainer>,
        )
        expect(screen.getByTestId('col-vis')).toBeInTheDocument()
    })

    it('hides ColumnVisibilityDropdown when toolbar is provided', () => {
        render(
            <TableContainer
                table={makeTable()}
                enableColumnHiding
                toolbar={<div data-testid="custom-toolbar" />}
            >
                <tbody />
            </TableContainer>,
        )
        expect(screen.queryByTestId('col-vis')).toBeNull()
        expect(screen.getByTestId('custom-toolbar')).toBeInTheDocument()
    })

    it('shows EmptyResults when isEmpty + !isLoading', () => {
        render(
            <TableContainer table={makeTable()} isEmpty isLoading={false}>
                <tbody />
            </TableContainer>,
        )
        expect(screen.getByTestId('empty-results')).toBeInTheDocument()
    })

    it('hides EmptyResults when loading', () => {
        render(
            <TableContainer table={makeTable()} isEmpty isLoading>
                <tbody />
            </TableContainer>,
        )
        expect(screen.queryByTestId('empty-results')).toBeNull()
    })

    it('renders custom emptyState when supplied', () => {
        render(
            <TableContainer
                table={makeTable()}
                isEmpty
                emptyState={<div data-testid="custom-empty" />}
            >
                <tbody />
            </TableContainer>,
        )
        expect(screen.getByTestId('custom-empty')).toBeInTheDocument()
        expect(screen.queryByTestId('empty-results')).toBeNull()
    })

    it('renders PaginationV2 when enablePagination', () => {
        render(
            <TableContainer table={makeTable()} enablePagination itemsTotalCount={100}>
                <tbody />
            </TableContainer>,
        )
        expect(screen.getByTestId('pagination').dataset.total).toBe('100')
    })
})
