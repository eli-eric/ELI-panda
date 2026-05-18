import { render, screen } from '@testing-library/react'

import { Badge } from '../badge'

describe('ui/Badge', () => {
    it('renders as a span by default with data-slot="badge"', () => {
        const { container } = render(<Badge>x</Badge>)
        const node = container.querySelector('[data-slot="badge"]')
        expect(node?.tagName).toBe('SPAN')
    })

    it('renders default variant classes', () => {
        const { container } = render(<Badge>x</Badge>)
        expect(container.querySelector('[data-slot="badge"]')?.className).toContain('bg-primary')
    })

    it.each([
        ['secondary', 'bg-secondary'],
        ['destructive', 'bg-destructive'],
        ['outline', 'text-foreground'],
    ] as const)('variant=%s applies %s class', (variant, expected) => {
        const { container } = render(<Badge variant={variant}>x</Badge>)
        expect(container.querySelector('[data-slot="badge"]')?.className).toContain(expected)
    })

    it('appends custom className', () => {
        const { container } = render(<Badge className="extra">x</Badge>)
        expect(container.querySelector('[data-slot="badge"]')?.className).toContain('extra')
    })

    it('asChild renders Slot (no extra span wrapper) - link example', () => {
        render(
            <Badge asChild>
                <a href="/x">link</a>
            </Badge>,
        )
        const link = screen.getByRole('link', { name: 'link' })
        expect(link.getAttribute('data-slot')).toBe('badge')
    })
})
