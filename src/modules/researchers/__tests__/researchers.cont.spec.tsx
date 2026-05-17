import { render, screen } from '@testing-library/react'

import { useOpenResearcherForm } from '../hooks/useOpenResearcherForm'
import { useResearchers } from '../hooks/useResearchers'
import { ResearchersContainer } from '../researchers.cont'

jest.mock('../researchers.columns', () => ({
    useResearcherColumns: () => [],
}))

jest.mock('../hooks/useResearchers', () => ({
    useResearchers: jest.fn(),
}))

jest.mock('../hooks/useOpenResearcherForm', () => ({
    useOpenResearcherForm: jest.fn(),
}))

jest.mock('@/components/layout/TableLayoutContainer', () => ({
    TableLayoutContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
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
    usePandaTable: () => ({}),
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
        <div>
            <button data-testid="add" onClick={handleAdd}>
                +
            </button>
            <button data-testid="refresh" onClick={handleRefresh}>
                ⟳
            </button>
        </div>
    ),
}))

const mockUseResearchers = useResearchers as jest.Mock
const mockUseOpenResearcherForm = useOpenResearcherForm as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('ResearchersContainer', () => {
    it('passes data + loading + totalCount through to children', () => {
        mockUseResearchers.mockReturnValue({
            data: { data: [{ uid: 'r1' }, { uid: 'r2' }, { uid: 'r3' }], totalCount: 42 },
            refetch: jest.fn(),
            isLoading: true,
        })
        mockUseOpenResearcherForm.mockReturnValue({ openResearcherForm: jest.fn() })
        render(<ResearchersContainer />)
        expect(screen.getByTestId('table').dataset.count).toBe('3')
        expect(screen.getByTestId('table').dataset.loading).toBe('true')
        expect(screen.getByTestId('pagination').dataset.total).toBe('42')
    })

    it('Add wires to openResearcherForm', () => {
        const openResearcherForm = jest.fn()
        mockUseResearchers.mockReturnValue({
            data: { data: [], totalCount: 0 },
            refetch: jest.fn(),
            isLoading: false,
        })
        mockUseOpenResearcherForm.mockReturnValue({ openResearcherForm })
        render(<ResearchersContainer />)
        screen.getByTestId('add').click()
        expect(openResearcherForm).toHaveBeenCalled()
    })

    it('Refresh wires to refetch', () => {
        const refetch = jest.fn()
        mockUseResearchers.mockReturnValue({
            data: { data: [], totalCount: 0 },
            refetch,
            isLoading: false,
        })
        mockUseOpenResearcherForm.mockReturnValue({ openResearcherForm: jest.fn() })
        render(<ResearchersContainer />)
        screen.getByTestId('refresh').click()
        expect(refetch).toHaveBeenCalled()
    })
})
