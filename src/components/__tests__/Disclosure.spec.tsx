import { fireEvent, render, screen } from '@testing-library/react'

import DisclosureComponent from '../Disclosure.comp'

describe('DisclosureComponent', () => {
    it('renders title + children', () => {
        render(
            <DisclosureComponent title="Section">
                <p>content</p>
            </DisclosureComponent>,
        )
        expect(screen.getByText('Section')).toBeInTheDocument()
    })

    it('shows Plus icon by default (closed)', () => {
        const { container } = render(
            <DisclosureComponent title="t">
                <span />
            </DisclosureComponent>,
        )
        // 1 svg path; closed -> plus icon class group has text-gray-400
        expect(container.querySelector('.text-gray-400')).toBeInTheDocument()
    })

    it('shows Minus icon when defaultOpen=true', () => {
        const { container } = render(
            <DisclosureComponent title="t" defaultOpen>
                <span />
            </DisclosureComponent>,
        )
        expect(container.querySelector('.text-orange-400')).toBeInTheDocument()
    })

    it('title turns orange when open', () => {
        render(
            <DisclosureComponent title="t" defaultOpen>
                <span />
            </DisclosureComponent>,
        )
        expect(screen.getByText('t')).toHaveClass('text-orange-500')
    })

    it('click toggles state', () => {
        const { container } = render(
            <DisclosureComponent title="t">
                <span />
            </DisclosureComponent>,
        )
        const button = container.querySelector('button')!
        fireEvent.click(button)
        expect(container.querySelector('.text-orange-400')).toBeInTheDocument()
    })
})
