import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import EmptyResults from '../EmptyResults'

describe('EmptyResults', () => {
    it('renders the empty-results container with localized text', () => {
        const { container } = renderWithProviders(<EmptyResults />)
        const wrapper = container.querySelector('#empty-results')
        expect(wrapper).toBeInTheDocument()
        // localized string is non-empty for both locales
        expect(wrapper?.querySelector('h3')?.textContent?.length).toBeGreaterThan(0)
    })

    it('shows an icon (svg) and a heading', () => {
        const { container } = renderWithProviders(<EmptyResults />)
        expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument()
        expect(container.querySelector('h3')).toBeInTheDocument()
    })
})
