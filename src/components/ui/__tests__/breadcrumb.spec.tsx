import { render, screen } from '@testing-library/react'

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../breadcrumb'

describe('ui/Breadcrumb', () => {
    it('Breadcrumb root renders as <nav> with aria-label and data-slot', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>x</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>,
        )
        const nav = screen.getByRole('navigation')
        expect(nav.getAttribute('aria-label')).toBe('breadcrumb')
        expect(nav.getAttribute('data-slot')).toBe('breadcrumb')
    })

    it('BreadcrumbLink default renders as <a>', () => {
        render(<BreadcrumbLink href="/home">home</BreadcrumbLink>)
        const link = screen.getByText('home')
        expect(link.tagName).toBe('A')
        expect(link.getAttribute('href')).toBe('/home')
    })

    it('BreadcrumbPage marks current page', () => {
        render(<BreadcrumbPage>now</BreadcrumbPage>)
        const page = screen.getByText('now')
        expect(page.getAttribute('aria-current')).toBe('page')
        expect(page.getAttribute('aria-disabled')).toBe('true')
    })

    it('BreadcrumbSeparator defaults to ChevronRight icon', () => {
        const { container } = render(<BreadcrumbSeparator />)
        expect(container.querySelector('svg')).not.toBeNull()
    })

    it('BreadcrumbSeparator uses custom children when given', () => {
        render(<BreadcrumbSeparator>|</BreadcrumbSeparator>)
        expect(screen.getByText('|')).toBeInTheDocument()
    })

    it('BreadcrumbEllipsis renders sr-only "More" label', () => {
        render(<BreadcrumbEllipsis />)
        expect(screen.getByText('More')).toBeInTheDocument()
    })
})
