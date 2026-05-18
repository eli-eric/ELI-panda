import { render, screen } from '@testing-library/react'

import { InputWrapper } from '../InputWrapper.comp'

describe('InputWrapper', () => {
    it('renders children', () => {
        render(
            <InputWrapper>
                <span data-testid="kid">kid</span>
            </InputWrapper>,
        )
        expect(screen.getByTestId('kid')).toBeInTheDocument()
    })

    it('applies hidden attribute when hidden=true', () => {
        const { container } = render(
            <InputWrapper hidden>
                <span>kid</span>
            </InputWrapper>,
        )
        expect((container.firstChild as HTMLElement).hidden).toBe(true)
    })

    it('passes className through', () => {
        const { container } = render(
            <InputWrapper className="my-cls">
                <span>kid</span>
            </InputWrapper>,
        )
        expect((container.firstChild as HTMLElement).className).toContain('my-cls')
    })
})
