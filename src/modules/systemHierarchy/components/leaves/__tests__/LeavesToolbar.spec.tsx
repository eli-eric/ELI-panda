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
let onDirectOnlyChange: jest.Mock

const renderToolbar = (props: Partial<React.ComponentProps<typeof LeavesToolbar>> = {}) =>
    render(
        <LeavesToolbar
            tableId="t1"
            table={{} as any}
            directOnly={false}
            onDirectOnlyChange={onDirectOnlyChange}
            {...props}
        />,
    )

beforeEach(() => {
    jest.clearAllMocks()
    openFilterSheet = jest.fn()
    onDirectOnlyChange = jest.fn()
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
        renderToolbar()
        expect(screen.getByTestId('leaves-toolbar-filter-btn')).toBeInTheDocument()
        expect(screen.getByTestId('leaves-toolbar-search')).toBeInTheDocument()
        expect(screen.getByTestId('col-vis').dataset.excludes).toBe('icon')
    })

    it('filter button click opens sheet', () => {
        renderToolbar()
        fireEvent.click(screen.getByTestId('leaves-toolbar-filter-btn'))
        expect(openFilterSheet).toHaveBeenCalled()
    })

    it('hides FilterBadges when no active filters', () => {
        renderToolbar()
        expect(screen.queryByTestId('filter-badges')).toBeNull()
    })

    it('shows FilterBadges when storeFilters non-empty', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'x', value: 'y' }] })
        renderToolbar()
        expect(screen.getByTestId('filter-badges')).toBeInTheDocument()
    })

    it('filter icon gets fill-current when filters active', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'x', value: 'y' }] })
        const { container } = renderToolbar()
        expect(container.querySelector('svg.fill-current')).toBeInTheDocument()
    })

    it('passes enableQueryURL through to useDebouncedSearchInput', () => {
        renderToolbar({ enableQueryURL: false })
        expect(mockUseDebouncedSearchInput).toHaveBeenCalledWith(
            expect.objectContaining({ enableQueryURL: false }),
        )
    })

    describe('direct-only checkbox', () => {
        const checkbox = () => screen.getByRole('checkbox')

        it('reflects the directOnly prop', () => {
            renderToolbar({ directOnly: true })
            expect(checkbox()).toBeChecked()
        })

        it('reports the toggle to the parent', () => {
            renderToolbar()
            expect(checkbox()).not.toBeChecked()
            fireEvent.click(checkbox())
            expect(onDirectOnlyChange).toHaveBeenCalledWith(true)
        })

        it('is never disabled — the flag it would key off is cached tree data', () => {
            renderToolbar({ directOnly: true })
            expect(checkbox()).toBeEnabled()
        })

        it('leaves filter and search reachable so the mode can be exited', () => {
            renderToolbar({ directOnly: true })
            expect(screen.getByTestId('leaves-toolbar-filter-btn')).toBeEnabled()
            expect(screen.getByTestId('leaves-toolbar-search')).toBeEnabled()
        })
    })
})
