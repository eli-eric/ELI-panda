import { render } from '@testing-library/react'

import ButtonLoaderComponent from '../button-loader.comp'

describe('ButtonLoaderComponent', () => {
    it('renders an SVG with role=status and animate-spin class', () => {
        const { container } = render(<ButtonLoaderComponent />)
        const svg = container.querySelector('svg')!
        expect(svg).toBeInTheDocument()
        expect(svg).toHaveAttribute('role', 'status')
        expect(svg).toHaveClass('animate-spin')
    })

    it('contains two path elements (track + spinner arc)', () => {
        const { container } = render(<ButtonLoaderComponent />)
        const paths = container.querySelectorAll('path')
        expect(paths.length).toBe(2)
    })
})
