import { render, screen } from '@testing-library/react'

import { DetailParameter } from '../detail-parameter'

describe('DetailParameter', () => {
    it('renders title and value', () => {
        render(<DetailParameter title="Code" value="C01" />)
        expect(screen.getByText(/Code:/)).toBeInTheDocument()
        expect(screen.getByText(/C01/)).toBeInTheDocument()
    })

    it('falls back to N/A for empty value', () => {
        render(<DetailParameter title="Code" value={null} />)
        expect(screen.getByText('N/A')).toBeInTheDocument()
    })

    it('appends [unit] to value', () => {
        render(<DetailParameter title="Power" value="120" unit="W" />)
        const span = screen.getByText(/120/)
        expect(span.textContent).toContain('[W]')
    })

    it('renders Link with target=_blank when href provided', () => {
        render(<DetailParameter title="Web" value="visit" href="https://x.example" />)
        const link = screen.getByText('Web:').closest('a')
        expect(link).toHaveAttribute('href', 'https://x.example')
        expect(link).toHaveAttribute('target', '_blank')
    })

    it('renders div (not link) when href absent', () => {
        const { container } = render(<DetailParameter title="Plain" value="v" />)
        expect(container.querySelector('a')).toBeNull()
        expect(container.querySelector('div')).toBeInTheDocument()
    })

    it('shows additionalInfo with strikethrough when provided', () => {
        render(<DetailParameter title="X" value="new" additionalInfo="old" />)
        const old = screen.getByText('old')
        expect(old).toHaveClass('line-through')
    })

    it('renders ExternalLink icon when href provided', () => {
        const { container } = render(
            <DetailParameter title="X" value="v" href="/abs" />,
        )
        expect(container.querySelector('svg')).toBeInTheDocument()
    })
})
