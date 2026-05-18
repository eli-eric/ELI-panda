import { render, screen } from '@testing-library/react'

import OrdersContainer from '../Orders.cont'
import { useOrders } from '../hooks/useOrders'

jest.mock('../hooks/useOrders', () => ({
    useOrders: jest.fn(),
}))

jest.mock('../components/OrderColumns', () => ({
    useOrderColumns: () => [],
}))

jest.mock('../components/HeaderButtons', () => ({
    HeaderButtons: () => <button data-testid="header-buttons">H</button>,
}))

jest.mock('@/components/error/ErrorPage', () => ({
    __esModule: true,
    default: () => <div data-testid="error-page" />,
}))

jest.mock('@/components/layout/TableLayoutContainer', () => ({
    TableLayoutContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}))

jest.mock('@/modules/shared/form/FilterBadges', () => ({
    FilterBadges: () => <div data-testid="filter-badges" />,
}))

jest.mock('@/modules/shared/table/ColumnVisibilityDropdown.comp', () => ({
    ColumnVisibilityDropdown: () => <div data-testid="col-visibility" />,
}))

jest.mock('@/modules/shared/table/PaginationV2', () => ({
    PaginationV2: () => <div data-testid="pagination" />,
}))

jest.mock('@/modules/shared/table/pandaTable/hooks/usePandaTable', () => ({
    usePandaTable: () => ({
        getAllLeafColumns: () => [],
        setColumnOrder: jest.fn(),
    }),
}))

jest.mock('@/modules/shared/table/pandaTableV2/PandaTableV2', () => ({
    __esModule: true,
    PandaTableV2: () => <div data-testid="panda-table-v2" />,
}))

jest.mock('@/modules/shared/table/SearchBar', () => ({
    SearchBar: ({
        left,
        right,
        secondRow,
    }: {
        left: React.ReactNode
        right: React.ReactNode
        secondRow: React.ReactNode
    }) => (
        <div data-testid="search-bar">
            {left}
            {right}
            {secondRow}
        </div>
    ),
}))

const mockUseOrders = useOrders as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('OrdersContainer', () => {
    it('renders SearchBar with HeaderButtons + ColumnVisibility', () => {
        mockUseOrders.mockReturnValue({
            orderList: { data: [], totalCount: 0 },
            loading: false,
            error: null,
        })
        render(<OrdersContainer />)
        expect(screen.getByTestId('header-buttons')).toBeInTheDocument()
        expect(screen.getByTestId('col-visibility')).toBeInTheDocument()
        expect(screen.getByTestId('filter-badges')).toBeInTheDocument()
    })

    it('renders PandaTableV2 + Pagination when no error', () => {
        mockUseOrders.mockReturnValue({
            orderList: { data: [], totalCount: 0 },
            loading: false,
            error: null,
        })
        render(<OrdersContainer />)
        expect(screen.getByTestId('panda-table-v2')).toBeInTheDocument()
        expect(screen.getByTestId('pagination')).toBeInTheDocument()
        expect(screen.queryByTestId('error-page')).toBeNull()
    })

    it('shows ErrorPage and hides table+pagination on error', () => {
        mockUseOrders.mockReturnValue({
            orderList: undefined,
            loading: false,
            error: new Error('boom'),
        })
        render(<OrdersContainer />)
        expect(screen.getByTestId('error-page')).toBeInTheDocument()
        expect(screen.queryByTestId('panda-table-v2')).toBeNull()
        expect(screen.queryByTestId('pagination')).toBeNull()
    })
})
