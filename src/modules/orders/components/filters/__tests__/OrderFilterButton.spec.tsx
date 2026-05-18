import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { OrderFilterButton } from '../OrderFilterButton.cont'
import { useOrdersFilterSheet } from '../hooks/useOrdersFilterSheet'

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

jest.mock('../hooks/useOrdersFilterSheet', () => ({
    useOrdersFilterSheet: jest.fn(),
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock
const mockUseOrdersFilterSheet = useOrdersFilterSheet as jest.Mock

let openFilterSheet: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openFilterSheet = jest.fn()
    mockUseOrdersFilterSheet.mockReturnValue(openFilterSheet)
    mockUseFormFilterState.mockReturnValue({ storeFilters: [] })
})

describe('OrderFilterButton', () => {
    it('tooltip says "Open Filters" with no active filters', () => {
        renderWithProviders(<OrderFilterButton />)
        expect(screen.getByTestId('tt').dataset.content).toBe('Open Filters')
    })

    it('tooltip says "Filters Applied" when filters present', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'a' }] })
        renderWithProviders(<OrderFilterButton />)
        expect(screen.getByTestId('tt').dataset.content).toBe('Filters Applied')
    })

    it('Filter icon fill-current applied when filters present', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'a' }] })
        const { container } = renderWithProviders(<OrderFilterButton />)
        const svg = container.querySelector('svg')
        expect(svg?.getAttribute('class')).toContain('fill-current')
    })

    it('click invokes openFilterSheet with default tableId/queryURL/side', () => {
        renderWithProviders(<OrderFilterButton />)
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet).toHaveBeenCalledWith({
            tableId: 'orders',
            enableQueryURL: true,
            side: 'left',
        })
    })

    it('respects custom tableId / enableQueryURL / side props', () => {
        renderWithProviders(
            <OrderFilterButton tableId="t-custom" enableQueryURL={false} side="right" />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet).toHaveBeenCalledWith({
            tableId: 't-custom',
            enableQueryURL: false,
            side: 'right',
        })
    })
})
