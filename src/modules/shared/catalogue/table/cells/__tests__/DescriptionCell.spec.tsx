import { render, screen } from '@testing-library/react'

import { DescriptionCell } from '../DescriptionCell'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ content, children }: { content: string; children: React.ReactNode }) => (
        <div data-testid="tt" data-content={content}>
            {children}
        </div>
    ),
}))

const props = (value: any) => ({
    getValue: () => value,
}) as any

describe('DescriptionCell', () => {
    it('renders nothing when value is empty', () => {
        const { container } = render(<DescriptionCell {...props('')} />)
        expect(container.querySelector('[data-testid="tt"]')).toBeNull()
    })

    it('renders nothing when value is null', () => {
        const { container } = render(<DescriptionCell {...props(null)} />)
        expect(container.querySelector('[data-testid="tt"]')).toBeNull()
    })

    it('renders tooltip with value + info icon when value present', () => {
        const { container } = render(<DescriptionCell {...props('Hello')} />)
        expect(screen.getByTestId('tt').dataset.content).toBe('Hello')
        expect(container.querySelector('svg')).toBeInTheDocument()
    })
})
