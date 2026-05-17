import { render, screen } from '@testing-library/react'

import Card, { FormCard } from '../Card'

describe('FormCard', () => {
    it('wraps children in centered max-w container', () => {
        const { container } = render(<FormCard>x</FormCard>)
        expect(container.firstChild).toHaveClass('mx-auto', 'max-w-7xl')
    })

    it('appends custom className', () => {
        const { container } = render(<FormCard className="extra">x</FormCard>)
        expect(container.firstChild).toHaveClass('extra')
    })

    it('renders children', () => {
        render(<FormCard>hello</FormCard>)
        expect(screen.getByText('hello')).toBeInTheDocument()
    })
})

describe('Card', () => {
    it('wraps children with padding utilities', () => {
        const { container } = render(<Card>x</Card>)
        const node = container.firstChild as HTMLElement
        expect(node).toHaveClass('mx-auto', 'max-w-7xl', 'px-4', 'py-4')
    })

    it('appends custom className', () => {
        const { container } = render(<Card className="my-cls">x</Card>)
        expect(container.firstChild).toHaveClass('my-cls')
    })
})
