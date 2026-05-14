import { fireEvent, render, screen } from '@testing-library/react'

import { ChevronDownIcon, ValidationIcon } from '../Icons'

describe('Icons', () => {
    it('ValidationIcon renders alert icon with red color', () => {
        render(<ValidationIcon />)
        expect(screen.getByTestId('validation-icon')).toBeInTheDocument()
        expect(
            screen.getByTestId('validation-icon').querySelector('svg'),
        ).toHaveClass('text-red-500')
    })

    it('ChevronDownIcon click invokes onClick', () => {
        const onClick = jest.fn()
        const { container } = render(<ChevronDownIcon onClick={onClick} />)
        fireEvent.click(container.querySelector('svg')!)
        expect(onClick).toHaveBeenCalled()
    })

    it('ChevronDownIcon renders without onClick gracefully', () => {
        const { container } = render(<ChevronDownIcon />)
        expect(container.querySelector('svg')).toBeInTheDocument()
    })
})
