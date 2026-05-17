import { render, screen } from '@testing-library/react'

import { Paragraph } from '../Paragraph'

describe('layout/Paragraph', () => {
    it('renders children inside <p>', () => {
        render(<Paragraph>hello</Paragraph>)
        const p = screen.getByText('hello')
        expect(p.tagName).toBe('P')
    })

    it('applies prose styling classes', () => {
        const { container } = render(<Paragraph>x</Paragraph>)
        expect(container.querySelector('p')?.className).toContain('text-xs')
    })
})
