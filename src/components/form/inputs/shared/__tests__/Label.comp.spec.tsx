import { render, screen } from '@testing-library/react'

import { Label } from '../Label.comp'

describe('Label', () => {
    it('renders label text when provided', () => {
        render(<Label label="My Label" />)
        expect(screen.getByText('My Label')).toBeInTheDocument()
    })

    it('returns null when no label', () => {
        const { container } = render(<Label />)
        expect(container.firstChild).toBeNull()
    })

    it('sets htmlFor attribute', () => {
        render(<Label label="X" htmlFor="my-id" />)
        const label = screen.getByText('X')
        expect(label).toHaveAttribute('for', 'my-id')
    })
})
