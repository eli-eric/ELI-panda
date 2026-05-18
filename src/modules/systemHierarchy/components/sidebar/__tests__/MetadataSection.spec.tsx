import { render, screen } from '@testing-library/react'

import { MetadataSection } from '../MetadataSection.comp'

describe('MetadataSection', () => {
    it('renders title when provided', () => {
        render(<MetadataSection title="System" items={[]} />)
        expect(screen.getByText('System')).toBeInTheDocument()
    })

    it('omits title heading when not provided', () => {
        const { container } = render(<MetadataSection items={[]} />)
        expect(container.querySelector('h3')).toBeNull()
    })

    it('renders each item as label / value pair', () => {
        render(
            <MetadataSection
                items={[
                    { label: 'Code', value: 'C01' },
                    { label: 'Count', value: 42 },
                ]}
            />,
        )
        expect(screen.getByText('Code')).toBeInTheDocument()
        expect(screen.getByText('C01')).toBeInTheDocument()
        expect(screen.getByText('Count')).toBeInTheDocument()
        expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('falls back to "N/A" for null values', () => {
        render(<MetadataSection items={[{ label: 'Code', value: null }]} />)
        expect(screen.getByText('N/A')).toBeInTheDocument()
    })

    it('renders empty list cleanly', () => {
        const { container } = render(<MetadataSection items={[]} />)
        expect(container.querySelectorAll('span').length).toBe(0)
    })
})
