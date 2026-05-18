import { render, screen } from '@testing-library/react'

import Breadcrumbs from '../Breadcrumps'

jest.mock('@/components/breadcrumps/Breadcrump.cont', () => ({
    BreadcrumpContainer: ({
        children,
        homeLink,
    }: {
        children: React.ReactNode
        homeLink?: string
    }) => (
        <div data-testid="bc-container" data-home={homeLink ?? ''}>
            {children}
        </div>
    ),
}))

jest.mock('@/components/breadcrumps/Breadcrump.item', () => ({
    BreadcrumpItem: ({ name, link }: { name?: string; link?: string }) => (
        <span data-testid="bc-item" data-link={link ?? ''}>
            {name}
        </span>
    ),
}))

describe('Breadcrumbs (systemItem)', () => {
    it('returns null when parentPath is empty', () => {
        const { container } = render(<Breadcrumbs parentPath={[]} />)
        expect(container).toBeEmptyDOMElement()
    })

    it('returns null when parentPath is undefined', () => {
        const { container } = render(<Breadcrumbs />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders one item per path entry with link by default', () => {
        render(
            <Breadcrumbs
                parentPath={[
                    { uid: 'a', name: 'A' } as any,
                    { uid: 'b', name: 'B' } as any,
                ]}
            />,
        )
        const items = screen.getAllByTestId('bc-item')
        expect(items.map(i => i.textContent)).toEqual(['A', 'B'])
        expect(items[0].dataset.link).toBe('/system/a')
        expect(items[1].dataset.link).toBe('/system/b')
    })

    it('omits links when isLink=false (no homeLink, no item links)', () => {
        render(
            <Breadcrumbs
                isLink={false}
                parentPath={[{ uid: 'a', name: 'A' } as any]}
            />,
        )
        expect(screen.getByTestId('bc-container').dataset.home).toBe('')
        expect(screen.getByTestId('bc-item').dataset.link).toBe('')
    })

    it('isLink=true wires container homeLink to PATH.SYSTEMS', () => {
        render(
            <Breadcrumbs
                parentPath={[{ uid: 'a', name: 'A' } as any]}
            />,
        )
        expect(screen.getByTestId('bc-container').dataset.home).toBe('/systems/overview')
    })
})
