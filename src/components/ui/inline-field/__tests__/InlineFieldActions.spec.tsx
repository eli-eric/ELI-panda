import { fireEvent, render, screen } from '@testing-library/react'

import { InlineFieldActions } from '../InlineFieldActions.comp'

describe('InlineFieldActions', () => {
    it('renders confirm + cancel buttons', () => {
        render(<InlineFieldActions onConfirm={jest.fn()} onCancel={jest.fn()} />)
        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(2)
    })

    it('fires onConfirm + onCancel handlers', () => {
        const onConfirm = jest.fn()
        const onCancel = jest.fn()
        render(<InlineFieldActions onConfirm={onConfirm} onCancel={onCancel} />)
        const [confirmBtn, cancelBtn] = screen.getAllByRole('button')
        fireEvent.click(confirmBtn)
        fireEvent.click(cancelBtn)
        expect(onConfirm).toHaveBeenCalledTimes(1)
        expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('disables buttons + swaps Check icon for Loader during pending', () => {
        const { container } = render(
            <InlineFieldActions onConfirm={jest.fn()} onCancel={jest.fn()} isPending />,
        )
        const buttons = screen.getAllByRole('button')
        buttons.forEach(btn => expect(btn).toBeDisabled())
        expect(container.querySelector('.animate-spin')).toBeInTheDocument()
    })

    it('shows green Check icon when not pending', () => {
        const { container } = render(
            <InlineFieldActions onConfirm={jest.fn()} onCancel={jest.fn()} />,
        )
        expect(container.querySelector('.animate-spin')).toBeNull()
        expect(container.querySelector('.text-green-600')).toBeInTheDocument()
    })
})
