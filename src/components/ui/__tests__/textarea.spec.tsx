import { fireEvent, render, screen } from '@testing-library/react'

import { Textarea } from '../textarea'

describe('ui/Textarea', () => {
    it('renders a textarea with data-slot', () => {
        render(<Textarea data-testid="ta" />)
        const ta = screen.getByTestId('ta')
        expect(ta.tagName).toBe('TEXTAREA')
        expect(ta.getAttribute('data-slot')).toBe('textarea')
    })

    it('appends custom className over base classes', () => {
        const { container } = render(<Textarea className="extra-class" />)
        expect(container.querySelector('textarea')?.className).toContain('extra-class')
    })

    it('forwards arbitrary props', () => {
        render(<Textarea placeholder="Type here" rows={5} />)
        const ta = screen.getByPlaceholderText('Type here')
        expect(ta.getAttribute('rows')).toBe('5')
    })

    it('onChange fires on input', () => {
        const onChange = jest.fn()
        render(<Textarea data-testid="ta" onChange={onChange} />)
        fireEvent.change(screen.getByTestId('ta'), { target: { value: 'x' } })
        expect(onChange).toHaveBeenCalled()
    })
})
