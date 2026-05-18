import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { InlineFieldValue } from '../InlineFieldValue.comp'

describe('InlineFieldValue', () => {
    it('renders the value when present', () => {
        renderWithProviders(<InlineFieldValue value="Hello" />)
        expect(screen.getByText('Hello')).toBeInTheDocument()
    })

    it('renders placeholder + italic styling when value empty/whitespace', () => {
        renderWithProviders(<InlineFieldValue value="   " placeholder="Empty" />)
        const span = screen.getByText('Empty')
        expect(span).toHaveClass('italic')
    })

    it('falls back to localized noneEntered placeholder if none provided', () => {
        renderWithProviders(<InlineFieldValue value={null} />)
        // localized string is non-empty
        const div = screen.getByText(/.+/, { selector: 'span.truncate' })
        expect(div.textContent?.length).toBeGreaterThan(0)
    })

    it('calls onClick when enabled', () => {
        const onClick = jest.fn()
        renderWithProviders(<InlineFieldValue value="x" onClick={onClick} />)
        fireEvent.click(screen.getByText('x'))
        expect(onClick).toHaveBeenCalled()
    })

    it('does NOT call onClick when disabled', () => {
        const onClick = jest.fn()
        renderWithProviders(<InlineFieldValue value="x" onClick={onClick} disabled />)
        fireEvent.click(screen.getByText('x'))
        expect(onClick).not.toHaveBeenCalled()
    })

    it('does NOT call onClick when isPending', () => {
        const onClick = jest.fn()
        renderWithProviders(<InlineFieldValue value="x" onClick={onClick} isPending />)
        fireEvent.click(screen.getByText('x'))
        expect(onClick).not.toHaveBeenCalled()
    })

    it('shows Loader icon when isPending', () => {
        const { container } = renderWithProviders(<InlineFieldValue value="x" isPending />)
        expect(container.querySelector('.animate-spin')).toBeInTheDocument()
    })

    it('renders rightElement', () => {
        renderWithProviders(
            <InlineFieldValue value="x" rightElement={<span>right</span>} />,
        )
        expect(screen.getByText('right')).toBeInTheDocument()
    })
})
