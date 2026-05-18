import { fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'

import { InputAmount } from '../components/InputAmount.comp'

describe('InputAmount', () => {
    it('renders label associated with the number input', () => {
        render(
            <FormWrapper>
                <InputAmount name="qty" label="Quantity" placeholder="0" />
            </FormWrapper>,
        )
        const input = screen.getByLabelText('Quantity') as HTMLInputElement
        expect(input).toHaveAttribute('type', 'number')
        expect(input).toHaveAttribute('step', '0.001')
        expect(input).toHaveAttribute('placeholder', '0')
    })

    it('reflects typed value back through controller', () => {
        render(
            <FormWrapper>
                <InputAmount name="qty" label="Quantity" />
            </FormWrapper>,
        )
        const input = screen.getByLabelText('Quantity') as HTMLInputElement
        fireEvent.change(input, { target: { value: '12' } })
        expect(input.value).toBe('12')
    })

    it('applies disabled attribute', () => {
        render(
            <FormWrapper>
                <InputAmount name="qty" label="Quantity" disabled />
            </FormWrapper>,
        )
        expect(screen.getByLabelText('Quantity')).toBeDisabled()
    })

    it('respects hidden by removing from layout', () => {
        const { container } = render(
            <FormWrapper>
                <InputAmount name="qty" label="Quantity" hidden />
            </FormWrapper>,
        )
        // hidden on wrapper + input
        const hiddenElements = container.querySelectorAll('[hidden]')
        expect(hiddenElements.length).toBeGreaterThan(0)
    })
})
