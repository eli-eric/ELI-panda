import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useDebouncedSearchInput } from '@/modules/shared/table/hooks/useDebouncedSearchInput'
import { renderWithProviders as render } from '@/testutils/wrappers/renderWithProviders'

import { useLeavesFilterSheet } from '../../filters/hooks/useLeavesFilterSheet'
import { LeavesToolbar } from '../LeavesToolbar.comp'

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilterState: jest.fn(),
}))

jest.mock('@/modules/shared/table/hooks/useDebouncedSearchInput', () => ({
    useDebouncedSearchInput: jest.fn(),
}))

jest.mock('../../filters/hooks/useLeavesFilterSheet', () => ({
    useLeavesFilterSheet: jest.fn(),
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/modules/shared/form/FilterBadges', () => ({
    FilterBadges: () => <div data-testid="filter-badges" />,
}))

jest.mock('@/modules/shared/table/ColumnVisibilityDropdown.comp', () => ({
    ColumnVisibilityDropdown: ({ excludeColumns }: { excludeColumns: string[] }) => (
        <div data-testid="col-vis" data-excludes={excludeColumns.join(',')} />
    ),
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock
const mockUseDebouncedSearchInput = useDebouncedSearchInput as jest.Mock
const mockUseLeavesFilterSheet = useLeavesFilterSheet as unknown as jest.Mock

let openFilterSheet: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openFilterSheet = jest.fn()
    mockUseLeavesFilterSheet.mockReturnValue(openFilterSheet)
    mockUseFormFilterState.mockReturnValue({ storeFilters: [] })
    mockUseDebouncedSearchInput.mockReturnValue({
        inputRef: { current: null },
        defaultValue: '',
        handleChange: jest.fn(),
    })
})

describe('LeavesToolbar', () => {
    it('renders filter btn + search + ColumnVisibility excluding icon', () => {
        render(<LeavesToolbar tableId="t1" table={{} as any} />)
        expect(screen.getByTestId('leaves-toolbar-filter-btn')).toBeInTheDocument()
        expect(screen.getByTestId('leaves-toolbar-search')).toBeInTheDocument()
        expect(screen.getByTestId('col-vis').dataset.excludes).toBe('icon')
    })

    it('filter button click opens sheet', () => {
        render(<LeavesToolbar tableId="t1" table={{} as any} />)
        fireEvent.click(screen.getByTestId('leaves-toolbar-filter-btn'))
        expect(openFilterSheet).toHaveBeenCalled()
    })

    it('hides FilterBadges when no active filters', () => {
        render(<LeavesToolbar tableId="t1" table={{} as any} />)
        expect(screen.queryByTestId('filter-badges')).toBeNull()
    })

    it('shows FilterBadges when storeFilters non-empty', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'x', value: 'y' }] })
        render(<LeavesToolbar tableId="t1" table={{} as any} />)
        expect(screen.getByTestId('filter-badges')).toBeInTheDocument()
    })

    it('filter icon gets fill-current when filters active', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'x', value: 'y' }] })
        const { container } = render(<LeavesToolbar tableId="t1" table={{} as any} />)
        expect(container.querySelector('svg.fill-current')).toBeInTheDocument()
    })

    it('passes enableQueryURL through to useDebouncedSearchInput', () => {
        render(<LeavesToolbar tableId="t1" table={{} as any} enableQueryURL={false} />)
        expect(mockUseDebouncedSearchInput).toHaveBeenCalledWith(
            expect.objectContaining({ enableQueryURL: false }),
        )
    })
})
