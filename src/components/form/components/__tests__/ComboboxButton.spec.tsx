import { fireEvent, render, screen } from '@testing-library/react'

import { ComboboxButton } from '../ComboboxButton'

jest.mock('@headlessui/react', () => ({
    Combobox: {
        Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
            <button data-testid="combo-btn" onClick={onClick}>
                {children}
            </button>
        ),
    },
}))

jest.mock('../../Icons', () => ({
    ChevronDownIcon: () => <span data-testid="chevron" />,
}))

describe('ComboboxButton', () => {
    it('renders ChevronDownIcon inside Combobox.Button', () => {
        render(<ComboboxButton />)
        expect(screen.getByTestId('chevron')).toBeInTheDocument()
    })

    it('click forwards to onClick prop', () => {
        const onClick = jest.fn()
        render(<ComboboxButton onClick={onClick} />)
        fireEvent.click(screen.getByTestId('combo-btn'))
        expect(onClick).toHaveBeenCalled()
    })

    it('renders without onClick prop gracefully', () => {
        const { container } = render(<ComboboxButton />)
        fireEvent.click(container.querySelector('button')!)
        // should not throw
        expect(container).toBeInTheDocument()
    })
})
