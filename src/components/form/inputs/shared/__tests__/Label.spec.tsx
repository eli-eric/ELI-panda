import { render, screen } from '@testing-library/react'

import { Label } from '../Label.comp'

describe('inputs/Label', () => {
    it('returns null when no label', () => {
        const { container } = render(<Label />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders label text bound to htmlFor', () => {
        render(<Label label="Name" htmlFor="name-input" />)
        const label = screen.getByText('Name')
        expect(label.tagName).toBe('LABEL')
        expect(label).toHaveAttribute('for', 'name-input')
    })

    it('renders without htmlFor (still shows label)', () => {
        render(<Label label="X" />)
        expect(screen.getByText('X')).toBeInTheDocument()
    })
})
