import { fireEvent, render, screen } from '@testing-library/react'

import { InitWizardButton } from '../InitWizard.btn'

describe('InitWizardButton', () => {
    it('renders children inside a button', () => {
        render(<InitWizardButton>start</InitWizardButton>)
        expect(screen.getByRole('button')).toHaveTextContent('start')
    })

    it('forwards onClick', () => {
        const onClick = jest.fn()
        render(<InitWizardButton onClick={onClick}>x</InitWizardButton>)
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).toHaveBeenCalled()
    })

    it('button is type="button" (avoids form submission)', () => {
        render(<InitWizardButton>x</InitWizardButton>)
        expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('uses dashed border styling', () => {
        render(<InitWizardButton>x</InitWizardButton>)
        expect(screen.getByRole('button').className).toContain('border-dashed')
    })
})
