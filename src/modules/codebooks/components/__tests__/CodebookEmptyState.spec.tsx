import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CodebookEmptyState } from '../CodebookEmptyState'

describe('CodebookEmptyState', () => {
    it('renders icon + heading + description in centered column', () => {
        const { container } = renderWithProviders(<CodebookEmptyState />)
        expect(container.querySelector('svg')).toBeInTheDocument()
        expect(container.querySelector('h3')).toBeInTheDocument()
        expect(container.querySelector('p')).toBeInTheDocument()
        expect(container.firstChild).toHaveClass('items-center', 'justify-center', 'text-center')
    })
})
