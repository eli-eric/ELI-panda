import { fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'

import { InlineEditInputWithActions } from '../InlineEditInputWithActions'

describe('InlineEditInputWithActions', () => {
    it('view mode renders label + N/A + actions slot', () => {
        render(
            <FormWrapper>
                <InlineEditInputWithActions
                    name="qty"
                    label="Q"
                    actions={<button data-testid="act">go</button>}
                />
            </FormWrapper>,
        )
        expect(screen.getByText(/Q:/)).toBeInTheDocument()
        expect(screen.getByText('N/A')).toBeInTheDocument()
        expect(screen.getByTestId('act')).toBeInTheDocument()
    })

    it('view mode aria-disabled blocks click when disabled', () => {
        const { container } = render(
            <FormWrapper>
                <InlineEditInputWithActions name="qty" label="Q" disabled />
            </FormWrapper>,
        )
        fireEvent.click(container.querySelector('[aria-disabled="true"]')!)
        expect(container.querySelector('input')).toBeNull()
    })

    it('click opens edit mode with autofocused input', () => {
        const { container } = render(
            <FormWrapper>
                <InlineEditInputWithActions name="qty" label="Q" />
            </FormWrapper>,
        )
        fireEvent.click(screen.getByText(/Q:/))
        expect(container.querySelector('input')).toBeInTheDocument()
    })

    it('Enter saves, Escape cancels', () => {
        const { container } = render(
            <FormWrapper>
                <InlineEditInputWithActions name="qty" label="Q" />
            </FormWrapper>,
        )
        fireEvent.click(screen.getByText(/Q:/))
        let input = container.querySelector('input')!
        fireEvent.change(input, { target: { value: '5' } })
        fireEvent.keyDown(input, { key: 'Enter' })
        expect(container.querySelector('input')).toBeNull()
        expect(screen.getByText(/5/)).toBeInTheDocument()

        fireEvent.click(screen.getByText(/Q:/))
        input = container.querySelector('input')!
        fireEvent.change(input, { target: { value: 'discarded' } })
        fireEvent.keyDown(input, { key: 'Escape' })
        expect(container.querySelector('input')).toBeNull()
        expect(screen.queryByText('discarded')).toBeNull()
    })

    it('renders unit suffix [unit] when set', () => {
        render(
            <FormWrapper>
                <InlineEditInputWithActions name="qty" label="Q" unit="kW" />
            </FormWrapper>,
        )
        const span = screen.getByTitle('Click to edit')
        expect(span.textContent).toContain('[kW]')
    })
})
