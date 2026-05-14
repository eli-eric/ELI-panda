import { render, screen } from '@testing-library/react'

import { NotesCell } from '../components/notes-cell.comp'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ content, children }: { content: string; children: React.ReactNode }) => (
        <div data-testid="tt" data-content={content}>
            {children}
        </div>
    ),
}))

const props = (value: any) => ({ getValue: () => value }) as any

describe('NotesCell', () => {
    it('renders plain span (no tooltip) for empty value', () => {
        render(<NotesCell {...props('')} />)
        expect(screen.queryByTestId('tt')).toBeNull()
    })

    it('renders plain span (no tooltip) for em-dash placeholder', () => {
        render(<NotesCell {...props('—')} />)
        expect(screen.queryByTestId('tt')).toBeNull()
    })

    it('renders text-only value inside tooltip with that value', () => {
        render(<NotesCell {...props('plain note')} />)
        const tt = screen.getByTestId('tt')
        expect(tt.dataset.content).toBe('plain note')
        expect(tt.textContent).toContain('plain note')
    })

    it('converts URLs into anchor tags with target=_blank + rel', () => {
        const { container } = render(
            <NotesCell {...props('see https://example.com for more')} />,
        )
        const link = container.querySelector('a')!
        expect(link).toHaveAttribute('href', 'https://example.com')
        expect(link).toHaveAttribute('target', '_blank')
        expect(link.getAttribute('rel')).toContain('noopener')
    })

    it('supports multiple URLs', () => {
        const { container } = render(
            <NotesCell {...props('a https://x.test b https://y.test')} />,
        )
        const anchors = container.querySelectorAll('a')
        expect(anchors.length).toBe(2)
        expect(anchors[0].getAttribute('href')).toBe('https://x.test')
        expect(anchors[1].getAttribute('href')).toBe('https://y.test')
    })
})
