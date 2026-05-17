import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { InputAmount } from '../InputAmount.comp'

describe('InputAmount', () => {
    it('renders number input', () => {
        renderWithProviders(<InputAmount name="amount" />, { withForm: true })
        const input = screen.getByRole('spinbutton')
        expect(input).toHaveAttribute('type', 'number')
        expect(input).toHaveAttribute('step', '0.001')
    })

    it('renders label when provided', () => {
        renderWithProviders(<InputAmount name="amount" label="Amount" />, {
            withForm: true,
        })
        expect(screen.getByText('Amount')).toBeInTheDocument()
    })

    it('placeholder + disabled forwarded', () => {
        renderWithProviders(
            <InputAmount name="amount" placeholder="$" disabled />,
            { withForm: true },
        )
        const input = screen.getByRole('spinbutton')
        expect(input).toHaveAttribute('placeholder', '$')
        expect(input).toBeDisabled()
    })

    it('user input updates form state', async () => {
        renderWithProviders(<InputAmount name="amount" />, { withForm: true })
        const input = screen.getByRole('spinbutton') as HTMLInputElement
        fireEvent.change(input, { target: { value: '12.5' } })
        expect(input.value).toBe('12.5')
    })
})
