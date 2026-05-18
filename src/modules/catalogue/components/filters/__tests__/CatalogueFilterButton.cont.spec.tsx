import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CatalogueFilterButtonContainer } from '../CatalogueFilterButton.cont'
import { useCatalogueFilterSheet } from '../hooks/useCatalogueFilterSheet'

let queryCategory: string | null = null

jest.mock('next-usequerystate', () => ({
    useQueryState: () => [queryCategory, jest.fn()],
}))

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

jest.mock('../hooks/useCatalogueFilterSheet', () => ({
    useCatalogueFilterSheet: jest.fn(),
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock
const mockUseCatalogueFilterSheet = useCatalogueFilterSheet as jest.Mock

let openFilterSheet: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    queryCategory = null
    openFilterSheet = jest.fn()
    mockUseCatalogueFilterSheet.mockReturnValue(openFilterSheet)
    mockUseFormFilterState.mockReturnValue({ storeFilters: [] })
})

describe('CatalogueFilterButtonContainer', () => {
    it('tooltip Open Filters when no filters or category', () => {
        renderWithProviders(
            <CatalogueFilterButtonContainer filterFormMethods={{} as any} />,
        )
        expect(screen.getByTestId('tt').dataset.content).toBe('Open Filters')
    })

    it('tooltip Filters Applied when storeFilters present', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'a' }] })
        renderWithProviders(
            <CatalogueFilterButtonContainer filterFormMethods={{} as any} />,
        )
        expect(screen.getByTestId('tt').dataset.content).toBe('Filters Applied')
    })

    it('tooltip Filters Applied when only category query is present', () => {
        queryCategory = JSON.stringify({ uid: 'cat', name: 'Cat' })
        renderWithProviders(
            <CatalogueFilterButtonContainer filterFormMethods={{} as any} />,
        )
        expect(screen.getByTestId('tt').dataset.content).toBe('Filters Applied')
    })

    it('click forwards default args + filterFormMethods to openFilterSheet', () => {
        const filterFormMethods = { id: 'fm' } as any
        renderWithProviders(
            <CatalogueFilterButtonContainer filterFormMethods={filterFormMethods} />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet).toHaveBeenCalledWith({
            tableId: 'catalogueItems',
            enableQueryURL: true,
            side: 'left',
            filterFormMethods,
        })
    })

    it('respects custom tableId/enableQueryURL/side', () => {
        renderWithProviders(
            <CatalogueFilterButtonContainer
                filterFormMethods={{} as any}
                tableId="x"
                enableQueryURL={false}
                side="right"
            />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet.mock.calls[0][0]).toEqual(
            expect.objectContaining({
                tableId: 'x',
                enableQueryURL: false,
                side: 'right',
            }),
        )
    })
})
