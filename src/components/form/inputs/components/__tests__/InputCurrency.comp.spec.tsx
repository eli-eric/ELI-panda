import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { InputCurrency } from '../InputCurrency.comp'

describe('InputCurrency', () => {
    it('renders select with 6 currency options', () => {
        renderWithProviders(<InputCurrency name="currency" />, { withForm: true })
        const select = screen.getByRole('combobox') as HTMLSelectElement
        const options = select.querySelectorAll('option')
        expect(options).toHaveLength(6)
        expect(Array.from(options).map(o => o.textContent)).toEqual([
            'EUR',
            'USD',
            'CZK',
            'HUF',
            'RON',
            'GBP',
        ])
    })

    it('defaults to EUR', () => {
        renderWithProviders(<InputCurrency name="currency" />, { withForm: true })
        expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('EUR')
    })

    it('respects form defaultValue', () => {
        renderWithProviders(<InputCurrency name="currency" />, {
            withForm: true,
            formProps: { defaultValues: { currency: 'CZK' } },
        })
        expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('CZK')
    })
})
