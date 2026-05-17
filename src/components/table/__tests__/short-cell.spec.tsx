import { render, screen } from '@testing-library/react'

import { ShortCell } from '../short-cell'

jest.mock('../../Tooltip', () => ({
    Tooltip: ({ content, children }: { content: string; children: React.ReactNode }) => (
        <div data-testid="tt" data-content={content}>
            {children}
        </div>
    ),
}))

describe('ShortCell', () => {
    it('returns null when value missing', () => {
        const { container } = render(<ShortCell />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders the full value when shorter than default truncation', () => {
        render(<ShortCell value="short" />)
        expect(screen.getByText('short')).toBeInTheDocument()
        expect(screen.getByTestId('tt').dataset.content).toBe('short')
    })

    it('truncates value when longer than numberOfChars', () => {
        const long = 'a'.repeat(80)
        render(<ShortCell value={long} numberOfChars={10} />)
        // truncated string ends with '...'
        const tt = screen.getByTestId('tt')
        expect(tt.dataset.content).toBe(long)
        expect(tt.textContent).toContain('...')
        expect(tt.textContent!.length).toBeLessThan(long.length)
    })
})
