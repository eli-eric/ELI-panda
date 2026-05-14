import { render, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { Heading } from '../Heading'

describe('Heading', () => {
    it('renders customText verbatim', () => {
        render(<Heading customText="My Section" />)
        expect(screen.getByRole('heading', { name: 'My Section' })).toBeInTheDocument()
    })

    it('renders translated message via text id when customText absent', () => {
        renderWithProviders(<Heading text="common.buttons.edit" />)
        expect(screen.getByRole('heading', { name: 'Edit' })).toBeInTheDocument()
    })

    it('renders children in trailing slot', () => {
        render(
            <Heading customText="X">
                <button>extra</button>
            </Heading>,
        )
        expect(screen.getByRole('button', { name: 'extra' })).toBeInTheDocument()
    })

    it('shows border by default; hides when showBorder=false', () => {
        const { container, rerender } = render(<Heading customText="A" />)
        expect(container.firstChild).toHaveClass('border-b')
        rerender(<Heading customText="A" showBorder={false} />)
        expect(container.firstChild).not.toHaveClass('border-b')
    })

    it('renders titleNode beside heading', () => {
        render(<Heading customText="X" titleNode={<span data-testid="badge">B</span>} />)
        expect(screen.getByTestId('badge')).toBeInTheDocument()
    })

    it('applies custom textColor and className', () => {
        const { container } = render(
            <Heading customText="X" textColor="text-red-500" className="my-cls" />,
        )
        expect(container.querySelector('h3')).toHaveClass('text-red-500')
        expect(container.firstChild).toHaveClass('my-cls')
    })
})
