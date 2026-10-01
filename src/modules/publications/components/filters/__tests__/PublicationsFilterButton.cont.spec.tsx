import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { usePublicationsFilterSheet } from '../hooks/usePublicationsFilterSheet'
import { PublicationsFilterButton } from '../PublicationsFilterButton.cont'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ content, children }: { content: string; children: React.ReactNode }) => (
        <div data-testid="tooltip" data-content={content}>
            {children}
        </div>
    ),
}))

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilterState: jest.fn(),
}))

jest.mock('../hooks/usePublicationsFilterSheet', () => ({
    usePublicationsFilterSheet: jest.fn(),
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock
const mockUseSheet = usePublicationsFilterSheet as jest.Mock

let openFilterSheet: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openFilterSheet = jest.fn()
    mockUseSheet.mockReturnValue(openFilterSheet)
    mockUseFormFilterState.mockReturnValue({ storeFilters: [] })
})

describe('PublicationsFilterButton', () => {
    it('opens the sheet for its table', () => {
        renderWithProviders(<PublicationsFilterButton />)

        fireEvent.click(screen.getByTestId('publications-filter-button'))

        expect(openFilterSheet).toHaveBeenCalledWith({
            tableId: 'publications',
            enableQueryURL: true,
            side: 'left',
        })
    })

    it('fills the icon only while filters are applied', () => {
        const { unmount } = renderWithProviders(<PublicationsFilterButton />)
        expect(
            screen.getByTestId('publications-filter-button').querySelector('svg'),
        ).not.toHaveClass('fill-current')
        unmount()

        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'title', value: 'laser' }] })
        renderWithProviders(<PublicationsFilterButton />)

        expect(screen.getByTestId('publications-filter-button').querySelector('svg')).toHaveClass(
            'fill-current',
        )
    })

    it('tells the user whether filters are applied', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'title', value: 'laser' }] })
        renderWithProviders(<PublicationsFilterButton />)

        expect(screen.getByTestId('tooltip')).toHaveAttribute('data-content', 'Filters Applied')
    })
})
