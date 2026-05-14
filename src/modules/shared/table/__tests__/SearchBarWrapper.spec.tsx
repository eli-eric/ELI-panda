import { render, screen } from '@testing-library/react'

import { SearchBarWrapper } from '../SearchBarWrapper'

describe('SearchBarWrapper', () => {
    it('renders children inside data-layout-slot wrapper', () => {
        render(
            <SearchBarWrapper>
                <span data-testid="child" />
            </SearchBarWrapper>,
        )
        expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('root has sticky/top-0/z-10/bg-background classes', () => {
        const { container } = render(<SearchBarWrapper>x</SearchBarWrapper>)
        const root = container.firstChild as HTMLElement
        expect(root.className).toContain('sticky')
        expect(root.className).toContain('top-0')
        expect(root.className).toContain('z-10')
        expect(root.className).toContain('bg-background')
    })

    it('appends custom className', () => {
        const { container } = render(<SearchBarWrapper className="extra">x</SearchBarWrapper>)
        expect((container.firstChild as HTMLElement).className).toContain('extra')
    })

    it('data-layout-slot=search-bar set', () => {
        const { container } = render(<SearchBarWrapper>x</SearchBarWrapper>)
        expect((container.firstChild as HTMLElement).getAttribute('data-layout-slot')).toBe(
            'search-bar',
        )
    })
})
