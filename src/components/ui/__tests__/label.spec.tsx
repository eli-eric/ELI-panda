import { render, screen } from '@testing-library/react'

import { Label } from '../label'

describe('ui/Label (radix)', () => {
    it('renders with data-slot="label"', () => {
        render(<Label>name</Label>)
        const el = screen.getByText('name')
        expect(el.getAttribute('data-slot')).toBe('label')
    })

    it('appends custom className', () => {
        const { container } = render(<Label className="extra">x</Label>)
        const el = container.querySelector('[data-slot="label"]')
        expect(el?.className).toContain('extra')
    })

    it('forwards htmlFor (radix Label uses htmlFor)', () => {
        render(<Label htmlFor="my-input">field</Label>)
        const el = screen.getByText('field')
        expect(el.getAttribute('for')).toBe('my-input')
    })
})
