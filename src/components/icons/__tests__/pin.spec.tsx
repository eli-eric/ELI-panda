import { render } from '@testing-library/react'

import { PinIcon } from '../pin'

describe('PinIcon', () => {
    it('renders an svg with the given className', () => {
        const { container } = render(<PinIcon className="my-pin" />)
        const svg = container.querySelector('svg')
        expect(svg).not.toBeNull()
        expect(svg?.getAttribute('class')).toBe('my-pin')
    })

    it('uses 32x32 viewBox', () => {
        const { container } = render(<PinIcon className="x" />)
        expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 32 32')
    })

    it('renders a single path element', () => {
        const { container } = render(<PinIcon className="x" />)
        expect(container.querySelectorAll('svg path').length).toBe(1)
    })
})
