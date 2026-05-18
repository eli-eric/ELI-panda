import { render, screen } from '@testing-library/react'

import { InputWrapper } from '../InputWrapper.comp'

describe('InputWrapper', () => {
    it('renders children', () => {
        render(
            <InputWrapper>
                <span>child</span>
            </InputWrapper>,
        )
        expect(screen.getByText('child')).toBeInTheDocument()
    })

    it('applies base focus/placeholder utility classes', () => {
        const { container } = render(<InputWrapper>x</InputWrapper>)
        const div = container.firstChild as HTMLElement
        expect(div.className).toContain('block')
        expect(div.className).toContain('w-full')
    })

    it('appends custom className', () => {
        const { container } = render(<InputWrapper className="extra">x</InputWrapper>)
        expect(container.firstChild).toHaveClass('extra')
    })

    it('forwards hidden attribute', () => {
        const { container } = render(<InputWrapper hidden>x</InputWrapper>)
        expect(container.firstChild).toHaveProperty('hidden', true)
    })
})
