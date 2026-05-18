import { fireEvent, render, screen } from '@testing-library/react'

import { ComboboxInput } from '../ComboboxInput'

jest.mock('@headlessui/react', () => ({
    Combobox: {
        Input: ({
            onChange,
            placeholder,
            className,
        }: {
            onChange: (e: any) => void
            placeholder?: string
            className?: string
        }) => (
            <input
                data-testid="combo-input"
                placeholder={placeholder}
                onChange={onChange}
                className={className}
            />
        ),
    },
}))

describe('ComboboxInput', () => {
    it('renders Combobox.Input with placeholder', () => {
        render(<ComboboxInput placeholder="Type here" />)
        expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
    })

    it('typing fires onChange', () => {
        const onChange = jest.fn()
        render(<ComboboxInput onChange={onChange} />)
        fireEvent.change(screen.getByTestId('combo-input'), { target: { value: 'x' } })
        expect(onChange).toHaveBeenCalled()
    })

    it('error state adds red border class', () => {
        render(<ComboboxInput error={{ message: 'bad' } as any} />)
        expect(screen.getByTestId('combo-input').className).toContain('border-red-500')
    })

    it('disabled state adds bg-gray-100 class', () => {
        render(<ComboboxInput disabled />)
        expect(screen.getByTestId('combo-input').className).toContain('bg-gray-100')
    })

    it('isFilter+value adds lime-500 border', () => {
        render(<ComboboxInput isFilter value={{ uid: 'x', name: 'X' }} />)
        expect(screen.getByTestId('combo-input').className).toContain('border-lime-500')
    })
})
