import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import ErrorPage from '../ErrorPage'

describe('ErrorPage', () => {
    it('renders red error scaffold with localized heading and X icon', () => {
        const { container } = renderWithProviders(<ErrorPage />)
        expect(container.firstChild).toHaveClass('bg-red-50', 'rounded-md')
        const h3 = container.querySelector('h3')
        expect(h3).toBeInTheDocument()
        expect(h3?.textContent?.length).toBeGreaterThan(0)
        expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument()
    })
})
