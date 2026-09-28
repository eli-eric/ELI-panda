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
const mockUsePublicationsFilterSheet = usePublicationsFilterSheet as jest.Mock

let openFilterSheet: jest.Mock

beforeEach(() => {
    openFilterSheet = jest.fn()
    mockUsePublicationsFilterSheet.mockReturnValue(openFilterSheet)
    mockUseFormFilterState.mockReturnValue({ storeFilters: [] })
})

const filterIcon = () =>
    screen.getByTestId('publications-filter-button').querySelector('svg') as SVGElement

describe('PublicationsFilterButton', () => {
    it('shows an empty icon and the open hint without active filters', () => {
        renderWithProviders(<PublicationsFilterButton />)

        expect(screen.getByTestId('tooltip').dataset.content).toBe('Open Filters')
        expect(filterIcon()).not.toHaveClass('fill-current')
    })

    it('fills the icon once a filter is active', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'title', value: 'x' }] })
        renderWithProviders(<PublicationsFilterButton />)

        expect(screen.getByTestId('tooltip').dataset.content).toBe('Filters Applied')
        expect(filterIcon()).toHaveClass('fill-current')
    })

    it('opens the sheet for the publications table on the left', () => {
        renderWithProviders(<PublicationsFilterButton />)
        fireEvent.click(screen.getByTestId('publications-filter-button'))

        expect(mockUseFormFilterState).toHaveBeenCalledWith({
            tableId: 'publications',
            enableQueryUrl: true,
        })
        expect(openFilterSheet).toHaveBeenCalledWith({
            tableId: 'publications',
            enableQueryURL: true,
            side: 'left',
        })
    })
})
