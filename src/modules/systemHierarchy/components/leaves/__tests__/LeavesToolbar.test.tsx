import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { LEAVES_TABLE_ID } from '../../../types/constants'
import { LeavesToolbar } from '../LeavesToolbar.comp'

const mockOpenFilterSheet = jest.fn()
jest.mock('../../filters/hooks/useLeavesFilterSheet', () => ({
    useLeavesFilterSheet: () => mockOpenFilterSheet,
}))

jest.mock('@/modules/shared/form/FilterBadges', () => ({
    FilterBadges: ({ tableId }: { tableId: string }) => (
        <div data-testid="filter-badges">{tableId}</div>
    ),
}))

jest.mock('@/modules/shared/table/ColumnVisibilityDropdown.comp', () => ({
    ColumnVisibilityDropdown: () => <div data-testid="column-visibility-dropdown" />,
}))

jest.mock('next-usequerystate', () => ({
    useQueryState: () => ['', jest.fn()],
}))

const mockSetSearch = jest.fn()
const mockSetSearchValue = jest.fn()
jest.mock('@/store/useTableStateStore', () => ({
    __esModule: true,
    default: (selector?: (state: any) => unknown) => {
        const state = {
            setSearch: mockSetSearch,
            setSearchValue: mockSetSearchValue,
            instances: { [LEAVES_TABLE_ID]: { search: '', searchBarValue: '' } },
        }
        return selector ? selector(state) : state
    },
}))

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilterState: () => ({
        storeFilters: [],
        setFilter: jest.fn(),
        setColumnFilters: jest.fn(),
    }),
}))

const createMockTable = () => ({
    getAllLeafColumns: jest.fn(() => []),
    getIsAllColumnsVisible: jest.fn(() => true),
    getToggleAllColumnsVisibilityHandler: jest.fn(() => jest.fn()),
})

const msgs: Record<string, string> = {}

const renderWithIntl = (ui: React.JSX.Element) =>
    render(
        <IntlProvider locale="en" messages={msgs}>
            {ui}
        </IntlProvider>,
    )

const renderToolbar = (props: Partial<React.ComponentProps<typeof LeavesToolbar>> = {}) =>
    renderWithIntl(
        <LeavesToolbar
            tableId={LEAVES_TABLE_ID}
            table={createMockTable() as any}
            directOnly={false}
            onDirectOnlyChange={jest.fn()}
            {...props}
        />,
    )

describe('LeavesToolbar', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders search input', () => {
        renderToolbar()
        expect(screen.getByTestId('leaves-toolbar-search')).toBeInTheDocument()
    })

    it('renders filter button', () => {
        renderToolbar()
        expect(screen.getByTestId('leaves-toolbar-filter-btn')).toBeInTheDocument()
    })

    it('opens filter sheet on filter button click', () => {
        renderToolbar()
        fireEvent.click(screen.getByTestId('leaves-toolbar-filter-btn'))
        expect(mockOpenFilterSheet).toHaveBeenCalled()
    })

    it('renders column visibility dropdown', () => {
        renderToolbar()
        expect(screen.getByTestId('column-visibility-dropdown')).toBeInTheDocument()
    })

    it('renders toolbar container', () => {
        renderToolbar()
        expect(screen.getByTestId('leaves-toolbar')).toBeInTheDocument()
    })

    it('updates local value on search input change', () => {
        renderToolbar()
        const searchInput = screen.getByTestId('leaves-toolbar-search')
        fireEvent.change(searchInput, { target: { value: 'test search' } })
        expect(searchInput).toHaveValue('test search')
    })
})
