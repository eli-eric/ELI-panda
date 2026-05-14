import { render, screen } from '@testing-library/react'

import { InputWrapper } from '../shared/InputWrapper.comp'
import { Label } from '../shared/Label.comp'

describe('InputWrapper', () => {
    it('renders children inside a styled div', () => {
        render(
            <InputWrapper>
                <span>inner</span>
            </InputWrapper>,
        )
        expect(screen.getByText('inner')).toBeInTheDocument()
    })

    it('forwards hidden attribute', () => {
        const { container } = render(
            <InputWrapper hidden>
                <span>x</span>
            </InputWrapper>,
        )
        const wrapper = container.firstChild as HTMLElement
        expect(wrapper).toHaveAttribute('hidden')
    })

    it('appends extra className', () => {
        const { container } = render(
            <InputWrapper className="extra-cls">
                <span />
            </InputWrapper>,
        )
        expect(container.firstChild).toHaveClass('extra-cls')
    })
})

describe('shared Label', () => {
    it('renders label text when provided', () => {
        render(<Label label="Name" htmlFor="x" />)
        const lbl = screen.getByText('Name')
        expect(lbl).toBeInTheDocument()
        expect(lbl).toHaveAttribute('for', 'x')
    })

    it('renders nothing when label is omitted', () => {
        const { container } = render(<Label />)
        expect(container).toBeEmptyDOMElement()
    })
})
