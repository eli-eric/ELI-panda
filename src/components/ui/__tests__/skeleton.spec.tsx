import { render } from '@testing-library/react'

import { Skeleton } from '../skeleton'

describe('ui/Skeleton', () => {
    it('renders div with data-slot="skeleton" and animation class', () => {
        const { container } = render(<Skeleton />)
        const node = container.querySelector('[data-slot="skeleton"]')
        expect(node).not.toBeNull()
        expect(node?.className).toContain('animate-pulse')
    })

    it('appends className', () => {
        const { container } = render(<Skeleton className="h-10" />)
        expect(container.querySelector('[data-slot="skeleton"]')?.className).toContain('h-10')
    })

    it('forwards arbitrary props (e.g., data-testid)', () => {
        const { getByTestId } = render(<Skeleton data-testid="skel-x" />)
        expect(getByTestId('skel-x')).toBeInTheDocument()
    })
})
