import { fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'

import { InlineEditInput } from '../InlineEditInput'

describe('InlineEditInput', () => {
    it('renders label + N/A placeholder when empty', () => {
        render(
            <FormWrapper>
                <InlineEditInput name="qty" label="Quantity" />
            </FormWrapper>,
        )
        expect(screen.getByText(/Quantity:/)).toBeInTheDocument()
        expect(screen.getByText('N/A')).toBeInTheDocument()
    })

    it('appends [unit] when present', () => {
        render(
            <FormWrapper>
                <InlineEditInput name="qty" label="Q" unit="kW" />
            </FormWrapper>,
        )
        const span = screen.getByTitle('Click to edit')
        expect(span.textContent).toContain('[kW]')
    })

    it('disabled blocks click into edit mode', () => {
        const { container } = render(
            <FormWrapper>
                <InlineEditInput name="qty" label="Q" disabled />
            </FormWrapper>,
        )
        // No input present
        expect(container.querySelector('input')).toBeNull()
        const wrapper = container.querySelector('[aria-disabled="true"]')
        expect(wrapper).toBeInTheDocument()
        fireEvent.click(wrapper as Element)
        // still no input after click
        expect(container.querySelector('input')).toBeNull()
    })

    it('click opens edit mode with autofocus input', () => {
        const { container } = render(
            <FormWrapper>
                <InlineEditInput name="qty" label="Q" />
            </FormWrapper>,
        )
        fireEvent.click(screen.getByText(/Q:/))
        expect(container.querySelector('input')).toBeInTheDocument()
    })

    it('Escape key cancels edit and returns to view mode', () => {
        const { container } = render(
            <FormWrapper>
                <InlineEditInput name="qty" label="Q" />
            </FormWrapper>,
        )
        fireEvent.click(screen.getByText(/Q:/))
        const input = container.querySelector('input')!
        fireEvent.change(input, { target: { value: '42' } })
        fireEvent.keyDown(input, { key: 'Escape' })
        expect(container.querySelector('input')).toBeNull()
    })

    it('Enter key saves the value into the form field', () => {
        const { container } = render(
            <FormWrapper>
                <InlineEditInput name="qty" label="Q" />
            </FormWrapper>,
        )
        fireEvent.click(screen.getByText(/Q:/))
        const input = container.querySelector('input')!
        fireEvent.change(input, { target: { value: '42' } })
        fireEvent.keyDown(input, { key: 'Enter' })
        expect(container.querySelector('input')).toBeNull()
        expect(screen.getByText(/42/)).toBeInTheDocument()
    })
})
