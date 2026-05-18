import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { OrdersFilterFooter } from '../OrdersFilterFooter.comp'

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilterState: jest.fn(),
}))

jest.mock('@/modules/shared/filters/FilterSaveSettings', () => ({
    FilterSaveSettings: () => <div data-testid="filter-save-settings" />,
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock

let setColumnFilters: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setColumnFilters = jest.fn()
    mockUseFormFilterState.mockReturnValue({ setColumnFilters })
})

const noopReset = jest.fn()

describe('OrdersFilterFooter', () => {
    it('wires tableId + enableQueryURL into useFormFilterState', () => {
        renderWithProviders(
            <OrdersFilterFooter
                tableId="orders"
                enableQueryURL={true}
                resetForm={noopReset}
                defaultFormValues={{}}
            />,
        )
        expect(mockUseFormFilterState).toHaveBeenCalledWith({
            tableId: 'orders',
            enableQueryUrl: true,
        })
    })

    it('renders FilterSaveSettings + clear-filters Button', () => {
        renderWithProviders(
            <OrdersFilterFooter
                tableId="orders"
                enableQueryURL={false}
                resetForm={noopReset}
                defaultFormValues={{}}
            />,
        )
        expect(screen.getByTestId('filter-save-settings')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('Clear filters click: resets form to defaults (keepValues: false) + clears column filters', () => {
        const resetForm = jest.fn()
        const defaults = { foo: 'bar' }
        renderWithProviders(
            <OrdersFilterFooter
                tableId="orders"
                enableQueryURL={false}
                resetForm={resetForm}
                defaultFormValues={defaults}
            />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(resetForm).toHaveBeenCalledWith(defaults, { keepValues: false })
        expect(setColumnFilters).toHaveBeenCalledWith([])
    })
})
