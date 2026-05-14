import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import type { SearchPattern } from '../../../utils/searchPattern'
import { SearchPatternBadge } from '../SearchPatternBadge'

describe('SearchPatternBadge', () => {
    it('returns null when pattern is null', () => {
        const { container } = renderWithProviders(<SearchPatternBadge pattern={null} />)
        expect(container).toBeEmptyDOMElement()
    })

    it.each<SearchPattern>(['startsWith', 'contains', 'endsWith'])(
        'renders a status badge with aria-label for %s',
        pattern => {
            renderWithProviders(<SearchPatternBadge pattern={pattern} />)
            const badge = screen.getByRole('status')
            expect(badge).toBeInTheDocument()
            expect(badge.getAttribute('aria-label')).toContain('Search pattern:')
        },
    )

    it('shadow variant applies the shadow class set (lower opacity bg)', () => {
        renderWithProviders(
            <SearchPatternBadge pattern="contains" variant="shadow" />,
        )
        const badge = screen.getByRole('status')
        expect(badge.className).toContain('bg-lime-500/5')
    })

    it('default variant applies regular class set', () => {
        renderWithProviders(<SearchPatternBadge pattern="contains" />)
        const badge = screen.getByRole('status')
        expect(badge.className).toContain('bg-lime-500/10')
    })

    it('extra className is appended', () => {
        renderWithProviders(
            <SearchPatternBadge pattern="endsWith" className="extra-x" />,
        )
        expect(screen.getByRole('status').className).toContain('extra-x')
    })
})
