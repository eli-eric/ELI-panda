import { render } from '@testing-library/react'

import ButtonLoaderComponent from '../button-loader.comp'

describe('ButtonLoaderComponent', () => {
    it('renders an svg with role=status and spin animation class', () => {
        const { container } = render(<ButtonLoaderComponent />)
        const svg = container.querySelector('svg')!
        expect(svg).toBeInTheDocument()
        expect(svg.getAttribute('role')).toBe('status')
        expect(svg.getAttribute('class')).toContain('animate-spin')
    })
})
