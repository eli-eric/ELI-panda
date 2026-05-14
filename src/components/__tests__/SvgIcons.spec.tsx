import { render } from '@testing-library/react'

import { ImageIcon } from '../SvgIcons'

describe('ImageIcon', () => {
    it('renders an aria-hidden svg with size classes', () => {
        const { container } = render(<ImageIcon />)
        const svg = container.querySelector('svg')
        expect(svg).not.toBeNull()
        expect(svg?.getAttribute('aria-hidden')).toBe('true')
        expect(svg?.getAttribute('class')).toContain('h-12')
        expect(svg?.getAttribute('class')).toContain('w-12')
    })

    it('viewBox is 0 0 48 48', () => {
        const { container } = render(<ImageIcon />)
        expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 48 48')
    })
})
