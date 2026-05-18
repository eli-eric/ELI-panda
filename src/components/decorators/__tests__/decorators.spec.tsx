import { fireEvent, render, screen } from '@testing-library/react'

import { LinkDecorator } from '../LinkDecorator.comp'
import { NewTabLink } from '../NewTabLink.comp'

describe('LinkDecorator', () => {
    it('renders children inside a "link" span', () => {
        render(<LinkDecorator>hello</LinkDecorator>)
        const span = screen.getByText('hello')
        expect(span.tagName.toLowerCase()).toBe('span')
        expect(span).toHaveClass('link')
    })

    it('appends extra className + title', () => {
        render(
            <LinkDecorator className="extra" title="tip">
                x
            </LinkDecorator>,
        )
        const span = screen.getByText('x')
        expect(span).toHaveClass('extra')
        expect(span).toHaveAttribute('title', 'tip')
    })
})

describe('NewTabLink', () => {
    it('renders Link with target=_blank, rel, value, className', () => {
        render(<NewTabLink href="/x" value="Click" className="extra" />)
        const link = screen.getByText('Click').closest('a')!
        expect(link).toHaveAttribute('href', '/x')
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        expect(link).toHaveClass('text-primary', 'extra')
    })

    it('stops click propagation', () => {
        const onParentClick = jest.fn()
        render(
            <div onClick={onParentClick}>
                <NewTabLink href="/x" value="Inner" />
            </div>,
        )
        const link = screen.getByText('Inner').closest('a')!
        fireEvent.click(link)
        expect(onParentClick).not.toHaveBeenCalled()
    })
})
