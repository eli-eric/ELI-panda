import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { InputAmountCurrency } from '../InputAmountCurrency.comp'

jest.mock('@/components/ui/select', () => ({
    Select: ({ children, value }: { children: React.ReactNode; value: string }) => (
        <div data-testid="select" data-value={value}>
            {children}
        </div>
    ),
    SelectTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SelectValue: ({ placeholder }: { placeholder: string }) => (
        <span data-testid="placeholder">{placeholder}</span>
    ),
    SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
        <div data-testid={`option-${value}`}>{children}</div>
    ),
}))

describe('InputAmountCurrency', () => {
    it('renders number input + select with 6 currencies', () => {
        renderWithProviders(
            <InputAmountCurrency amountName="amount" currencyName="currency" />,
            { withForm: true },
        )
        const input = screen.getByRole('spinbutton')
        expect(input).toHaveAttribute('type', 'number')
        expect(screen.getByTestId('option-EUR')).toBeInTheDocument()
        expect(screen.getByTestId('option-GBP')).toBeInTheDocument()
    })

    it('renders label when provided', () => {
        renderWithProviders(
            <InputAmountCurrency
                amountName="amount"
                currencyName="currency"
                label="Price"
            />,
            { withForm: true },
        )
        expect(screen.getByText('Price')).toBeInTheDocument()
    })

    it('defaults currency to EUR', () => {
        renderWithProviders(
            <InputAmountCurrency amountName="amount" currencyName="currency" />,
            { withForm: true },
        )
        expect(screen.getByTestId('select').dataset.value).toBe('EUR')
    })

    it('honors defaultCurrency override', () => {
        renderWithProviders(
            <InputAmountCurrency
                amountName="amount"
                currencyName="currency"
                defaultCurrency="USD"
            />,
            { withForm: true },
        )
        expect(screen.getByTestId('select').dataset.value).toBe('USD')
    })

    it('required prop forwarded to input', () => {
        renderWithProviders(
            <InputAmountCurrency amountName="amount" currencyName="currency" required />,
            { withForm: true },
        )
        const input = screen.getByRole('spinbutton')
        expect(input).toBeRequired()
    })
})
