import { fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'

import { InputDate } from '../components/InputDate.comp'

describe('InputDate', () => {
    it('renders trigger button with placeholder when no date', () => {
        render(
            <FormWrapper>
                <InputDate name="dob" label="Date" placeholder="Pick a day" />
            </FormWrapper>,
        )
        expect(screen.getByText('Date')).toBeInTheDocument()
        expect(screen.getByTestId('dob')).toHaveTextContent('Pick a day')
    })

    it('renders pre-filled default value as a formatted date', () => {
        render(
            <FormWrapper>
                <InputDate name="dob" defaultValue="2024-01-15" />
            </FormWrapper>,
        )
        const button = screen.getByTestId('dob')
        // toLocaleDateString format varies by locale - just assert it's not the placeholder
        expect(button.textContent?.length).toBeGreaterThan(2)
        expect(button.textContent).not.toContain('Select date')
    })

    it('returns null when hidden', () => {
        const { container } = render(
            <FormWrapper>
                <InputDate name="dob" label="Date" hidden />
            </FormWrapper>,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('disables the trigger when disabled', () => {
        render(
            <FormWrapper>
                <InputDate name="dob" label="Date" disabled />
            </FormWrapper>,
        )
        expect(screen.getByTestId('dob')).toBeDisabled()
    })

    it('opens the popover when trigger is clicked', () => {
        render(
            <FormWrapper>
                <InputDate name="dob" label="Date" />
            </FormWrapper>,
        )
        const trigger = screen.getByTestId('dob')
        fireEvent.click(trigger)
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })
})
