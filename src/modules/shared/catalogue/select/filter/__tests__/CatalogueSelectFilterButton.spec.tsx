import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CatalogueSelectFilterButton } from '../CatalogueSelectFilterButton'
import { useCatalogueSelectFilterSheet } from '../hooks/useCatalogueSelectFilterSheet'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ content, children }: { content: string; children: React.ReactNode }) => (
        <div data-testid="tt" data-content={content}>
            {children}
        </div>
    ),
}))

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilterState: jest.fn(),
}))

jest.mock('../hooks/useCatalogueSelectFilterSheet', () => ({
    useCatalogueSelectFilterSheet: jest.fn(),
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock
const mockUseCatalogueSelectFilterSheet = useCatalogueSelectFilterSheet as jest.Mock

let openFilterSheet: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openFilterSheet = jest.fn()
    mockUseCatalogueSelectFilterSheet.mockReturnValue(openFilterSheet)
    mockUseFormFilterState.mockReturnValue({ storeFilters: [] })
})

describe('CatalogueSelectFilterButton', () => {
    it('tooltip Open Filters when no filters', () => {
        renderWithProviders(<CatalogueSelectFilterButton tableId="t" />)
        expect(screen.getByTestId('tt').dataset.content).toBe('Open Filters')
    })

    it('tooltip Filters Applied when storeFilters present', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'a' }] })
        renderWithProviders(<CatalogueSelectFilterButton tableId="t" />)
        expect(screen.getByTestId('tt').dataset.content).toBe('Filters Applied')
    })

    it('click forwards tableId/catalogueCategoryProperties/side to openFilterSheet (default side=right)', () => {
        const props = [{ uid: 'p1' }] as any
        renderWithProviders(
            <CatalogueSelectFilterButton
                tableId="t"
                catalogueCategoryProperties={props}
            />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet).toHaveBeenCalledWith({
            tableId: 't',
            catalogueCategoryProperties: props,
            side: 'right',
        })
    })

    it('respects custom side', () => {
        renderWithProviders(<CatalogueSelectFilterButton tableId="t" side="left" />)
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet.mock.calls[0][0].side).toBe('left')
    })
})
