import { fireEvent, render, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { Button, DeleteButton, EditButton } from '../Buttons'

describe('Button', () => {
    it('renders default button with children', () => {
        render(<Button>Click</Button>)
        expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument()
    })

    it('disabled when loading or disabled prop is set', () => {
        const { rerender } = render(<Button loading>x</Button>)
        expect(screen.getByRole('button')).toBeDisabled()
        rerender(<Button disabled>x</Button>)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('applies opacity-50 when loading', () => {
        render(<Button loading>x</Button>)
        expect(screen.getByRole('button')).toHaveClass('opacity-50')
    })

    it('forwards data-testid and onClick', () => {
        const onClick = jest.fn()
        render(
            <Button testid="my-btn" onClick={onClick}>
                Go
            </Button>,
        )
        const btn = screen.getByTestId('my-btn')
        fireEvent.click(btn)
        expect(onClick).toHaveBeenCalled()
    })

    it('renders FormattedMessage text prop via Intl', () => {
        renderWithProviders(<Button text="common.errors.somethingWentWrong" />)
        const btn = screen.getByRole('button')
        // any non-empty localized text
        expect(btn.textContent?.length ?? 0).toBeGreaterThan(0)
    })

    it('asChild mode renders only children (no loader, no text)', () => {
        render(
            <Button asChild loading text="ignored">
                <a href="/x">link</a>
            </Button>,
        )
        const link = screen.getByText('link')
        expect(link.tagName.toLowerCase()).toBe('a')
        // ButtonLoaderComponent should NOT render in asChild mode
        expect(screen.queryByRole('status')).toBeNull()
    })
})

describe('DeleteButton / EditButton', () => {
    it('DeleteButton renders Trash2 icon with red color class', () => {
        const { container } = render(<DeleteButton />)
        const svg = container.querySelector('svg')!
        expect(svg).toHaveClass('text-red-600')
    })

    it('EditButton renders an icon-only button', () => {
        const { container } = render(<EditButton />)
        expect(container.querySelector('svg')).toBeInTheDocument()
    })
})
