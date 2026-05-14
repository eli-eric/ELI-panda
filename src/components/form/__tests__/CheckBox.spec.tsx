import { fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'

import CheckBox from '../CheckBox'

describe('CheckBox (RHF wrapper)', () => {
    it('renders label and toggles checked state', () => {
        render(
            <FormWrapper>
                <CheckBox name="agree" label="Agree" />
            </FormWrapper>,
        )
        expect(screen.getByText('Agree')).toBeInTheDocument()
        const input = screen.getByRole('checkbox') as HTMLInputElement
        expect(input).not.toBeChecked()
        fireEvent.click(input)
        expect(input).toBeChecked()
    })

    it('forwards disabled prop', () => {
        render(
            <FormWrapper>
                <CheckBox name="agree" label="Agree" disabled />
            </FormWrapper>,
        )
        expect(screen.getByRole('checkbox')).toBeDisabled()
    })
})
