import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { NotFound } from '../NotFound'

describe('NotFound section', () => {
    it('renders heading + paragraph + tryChecking footer + code in quotes', () => {
        const { container } = renderWithProviders(<NotFound code="SYS-42" />)
        expect(container.querySelector('h3')).toBeInTheDocument()
        expect(container.querySelector('p')?.textContent).toContain('SYS-42')
        expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument()
    })

    it('uses centered layout', () => {
        const { container } = renderWithProviders(<NotFound code="X" />)
        const wrapper = container.firstChild as HTMLElement
        expect(wrapper).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center')
    })
})
