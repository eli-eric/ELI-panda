import { render } from '@testing-library/react'

import { StyledSearchOverlay } from '../StyledSearchOverlay'

describe('StyledSearchOverlay', () => {
    it('returns null when value empty', () => {
        const { container } = render(<StyledSearchOverlay value="" />)
        expect(container).toBeEmptyDOMElement()
    })

    it('plain text when no asterisks', () => {
        const { container } = render(<StyledSearchOverlay value="C01" />)
        expect(container.textContent).toBe('C01')
        const stars = container.querySelectorAll('.text-lime-600')
        expect(stars.length).toBe(0)
    })

    it('asterisks rendered with lime styling and surrounding text plain', () => {
        const { container } = render(<StyledSearchOverlay value="*C01*" />)
        expect(container.textContent).toBe('*C01*')
        expect(container.querySelectorAll('.text-lime-600').length).toBe(2)
    })

    it('single leading asterisk highlighted', () => {
        const { container } = render(<StyledSearchOverlay value="*C01" />)
        expect(container.querySelectorAll('.text-lime-600').length).toBe(1)
    })

    it('appends custom className', () => {
        const { container } = render(
            <StyledSearchOverlay value="C01" className="my-extra" />,
        )
        expect((container.firstChild as HTMLElement).className).toContain('my-extra')
    })
})
