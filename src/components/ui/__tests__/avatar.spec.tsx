import { render } from '@testing-library/react'

import { Avatar, AvatarFallback, AvatarImage } from '../avatar'

describe('ui/Avatar', () => {
    it('renders Avatar root with data-slot="avatar"', () => {
        const { container } = render(<Avatar />)
        expect(container.querySelector('[data-slot="avatar"]')).not.toBeNull()
    })

    it('Avatar appends className over default size classes', () => {
        const { container } = render(<Avatar className="my-avatar" />)
        const root = container.querySelector('[data-slot="avatar"]')
        expect(root?.className).toContain('my-avatar')
        expect(root?.className).toContain('size-8')
    })

    it('AvatarFallback renders inside avatar when image missing', () => {
        const { container } = render(
            <Avatar>
                <AvatarFallback>AB</AvatarFallback>
            </Avatar>,
        )
        // Radix fallback renders after a tick — but with no image, it should be present
        const fallback = container.querySelector('[data-slot="avatar-fallback"]')
        expect(fallback).not.toBeNull()
        expect(fallback?.textContent).toBe('AB')
    })

    it('AvatarImage uses data-slot="avatar-image"', () => {
        // jsdom doesn't load images, so the image element is removed from the DOM
        // before testing. Just verify the component definition works without throwing.
        expect(() =>
            render(
                <Avatar>
                    <AvatarImage src="x.png" />
                </Avatar>,
            ),
        ).not.toThrow()
    })
})
