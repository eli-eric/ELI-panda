import { render } from '@testing-library/react'

import { Separator } from '../separator'

describe('ui/Separator', () => {
    it('renders with data-slot="separator" and default horizontal orientation', () => {
        const { container } = render(<Separator />)
        const node = container.querySelector('[data-slot="separator"]')
        expect(node).not.toBeNull()
        expect(node?.getAttribute('data-orientation')).toBe('horizontal')
    })

    it('respects vertical orientation', () => {
        const { container } = render(<Separator orientation="vertical" />)
        expect(
            container.querySelector('[data-slot="separator"]')?.getAttribute('data-orientation'),
        ).toBe('vertical')
    })

    it('appends custom className', () => {
        const { container } = render(<Separator className="extra-cls" />)
        expect(container.querySelector('[data-slot="separator"]')?.className).toContain('extra-cls')
    })

    it('decorative=true by default (radix omits role)', () => {
        const { container } = render(<Separator />)
        const node = container.querySelector('[data-slot="separator"]')
        // when decorative, radix sets role="none"
        expect(node?.getAttribute('role')).toBe('none')
    })

    it('decorative=false applies separator role', () => {
        const { container } = render(<Separator decorative={false} />)
        const node = container.querySelector('[data-slot="separator"]')
        expect(node?.getAttribute('role')).toBe('separator')
    })
})
