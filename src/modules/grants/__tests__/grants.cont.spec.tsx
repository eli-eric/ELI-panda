import { render, screen } from '@testing-library/react'

import { GrantsContainer } from '../grants.cont'
import { useGrants } from '../hooks/useGrants'
import { useOpenGrantForm } from '../hooks/useOpenGrantForm'

jest.mock('../grants.columns', () => ({
    useGrantColumns: () => [],
}))

jest.mock('../hooks/useGrants', () => ({
    useGrants: jest.fn(),
}))

jest.mock('../hooks/useOpenGrantForm', () => ({
    useOpenGrantForm: jest.fn(),
}))

jest.mock('@/components/layout/TableLayoutContainer', () => ({
    TableLayoutContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}))

jest.mock('@/modules/shared/table/ColumnVisibilityDropdown.comp', () => ({
    ColumnVisibilityDropdown: () => <div data-testid="col-vis" />,
}))

jest.mock('@/modules/shared/table/PaginationV2', () => ({
    PaginationV2: ({ settings }: { settings: any }) => (
        <div data-testid="pagination" data-total={settings.total ?? 'n/a'} />
    ),
}))

jest.mock('@/modules/shared/table/pandaTable/hooks/usePandaTable', () => ({
    usePandaTable: () => ({ getAllLeafColumns: () => [], setColumnOrder: jest.fn() }),
}))

jest.mock('@/modules/shared/table/pandaTableV2/PandaTableV2', () => ({
    __esModule: true,
    PandaTableV2: ({ data, loading }: { data: any[]; loading: boolean }) => (
        <div data-testid="table" data-count={data?.length ?? 0} data-loading={String(loading)} />
    ),
}))

jest.mock('@/modules/shared/table/SearchBar', () => ({
    SearchBar: ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
        <div data-testid="search-bar">
            {left}
            {right}
        </div>
    ),
    SearchBarButtonsComponent: ({
        handleAdd,
        handleRefresh,
    }: {
        handleAdd: () => void
        handleRefresh: () => void
    }) => (
        <div data-testid="search-buttons">
            <button data-testid="add" onClick={handleAdd}>
                +
            </button>
            <button data-testid="refresh" onClick={handleRefresh}>
                ⟳
            </button>
        </div>
    ),
}))

const mockUseGrants = useGrants as jest.Mock
const mockUseOpenGrantForm = useOpenGrantForm as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('GrantsContainer', () => {
    it('passes data + loading + totalCount through to children', () => {
        mockUseGrants.mockReturnValue({
            data: { data: [{ uid: 'g1' }, { uid: 'g2' }], totalCount: 99 },
            refetch: jest.fn(),
            isLoading: false,
        })
        mockUseOpenGrantForm.mockReturnValue({ openGrantForm: jest.fn() })
        render(<GrantsContainer />)
        expect(screen.getByTestId('table').dataset.count).toBe('2')
        expect(screen.getByTestId('table').dataset.loading).toBe('false')
        expect(screen.getByTestId('pagination').dataset.total).toBe('99')
    })

    it('wires Add to useOpenGrantForm.openGrantForm', () => {
        const openGrantForm = jest.fn()
        mockUseGrants.mockReturnValue({
            data: { data: [], totalCount: 0 },
            refetch: jest.fn(),
            isLoading: false,
        })
        mockUseOpenGrantForm.mockReturnValue({ openGrantForm })
        render(<GrantsContainer />)
        screen.getByTestId('add').click()
        expect(openGrantForm).toHaveBeenCalledTimes(1)
    })

    it('wires Refresh button to useGrants.refetch', () => {
        const refetch = jest.fn()
        mockUseGrants.mockReturnValue({
            data: { data: [], totalCount: 0 },
            refetch,
            isLoading: false,
        })
        mockUseOpenGrantForm.mockReturnValue({ openGrantForm: jest.fn() })
        render(<GrantsContainer />)
        screen.getByTestId('refresh').click()
        expect(refetch).toHaveBeenCalledTimes(1)
    })
})
