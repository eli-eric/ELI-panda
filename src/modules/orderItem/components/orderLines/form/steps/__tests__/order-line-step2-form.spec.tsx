import { screen } from '@testing-library/react'

import useOrderLineFormFields from '@/modules/orderItem/components/orderLines/form/OrderLineForm.fields'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { OrderLineStep2Form } from '../order-line-step2-form'

jest.mock('@/modules/orderItem/components/orderLines/form/OrderLineForm.fields', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/components/form/inputs', () => ({
    Input: ({ name, disabled }: { name: string; disabled?: boolean }) => (
        <div
            data-testid={`input-${name}`}
            data-disabled={String(!!disabled)}
        />
    ),
}))

jest.mock('@/components/form/inputs/components/InputAmountCurrency.comp', () => ({
    InputAmountCurrency: ({ amountName }: { amountName: string }) => (
        <div data-testid={`amount-${amountName}`} />
    ),
}))

jest.mock('@/components/form/Listbox', () => ({
    __esModule: true,
    default: ({ name }: { name: string }) => <div data-testid={`listbox-${name}`} />,
}))

const mockUseFields = useOrderLineFormFields as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseFields.mockReturnValue({
        name: { name: 'name', label: 'Name' },
        catalogueNumber: { name: 'catalogueNumber', label: 'CN' },
        price: { name: 'price', label: 'Price', required: true },
        currency: { name: 'currency' },
        itemUsage: { name: 'itemUsage' },
        quantity: { name: 'quantity' },
        serialNumbers: { name: 'serialNumbers' },
    })
})

describe('OrderLineStep2Form', () => {
    it('renders all fields with name+catalogueNumber disabled', () => {
        renderWithProviders(<OrderLineStep2Form />, { withForm: true })
        expect(screen.getByTestId('input-name').dataset.disabled).toBe('true')
        expect(screen.getByTestId('input-catalogueNumber').dataset.disabled).toBe('true')
        expect(screen.getByTestId('amount-price')).toBeInTheDocument()
        expect(screen.getByTestId('listbox-itemUsage')).toBeInTheDocument()
    })

    it('passes !isFromCatalogue (true when no _selectedCatalogueItem) to useOrderLineFormFields', () => {
        renderWithProviders(<OrderLineStep2Form />, { withForm: true })
        expect(mockUseFields).toHaveBeenCalledWith(true)
    })

    it('passes !isFromCatalogue=false when item is selected', () => {
        renderWithProviders(<OrderLineStep2Form />, {
            withForm: true,
            formProps: { defaultValues: { _selectedCatalogueItem: { uid: 'x' } } },
        })
        expect(mockUseFields).toHaveBeenCalledWith(false)
    })

    it('disables quantity when serialNumbers is non-empty', () => {
        renderWithProviders(<OrderLineStep2Form />, {
            withForm: true,
            formProps: { defaultValues: { serialNumbers: 'SN-1' } },
        })
        expect(screen.getByTestId('input-quantity').dataset.disabled).toBe('true')
        expect(screen.getByTestId('input-serialNumbers').dataset.disabled).toBe('false')
    })

    it('disables serialNumbers when quantity > 0', () => {
        renderWithProviders(<OrderLineStep2Form />, {
            withForm: true,
            formProps: { defaultValues: { quantity: 5 } },
        })
        expect(screen.getByTestId('input-serialNumbers').dataset.disabled).toBe('true')
        expect(screen.getByTestId('input-quantity').dataset.disabled).toBe('false')
    })
})
