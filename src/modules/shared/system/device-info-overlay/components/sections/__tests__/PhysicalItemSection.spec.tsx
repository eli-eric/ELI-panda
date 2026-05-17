import { render, screen } from '@testing-library/react'

import { PhysicalItemSection } from '../PhysicalItemSection.comp'

jest.mock('@/components/ui', () => ({
    Disclosure: ({ title, children }: { title: string; children: React.ReactNode }) => (
        <section>
            <h2>{title}</h2>
            {children}
        </section>
    ),
}))

jest.mock('@/components/ui/detail-parameter', () => ({
    DetailParameter: ({
        title,
        value,
        href,
    }: {
        title: string
        value?: string
        href?: string
    }) => (
        <div data-href={href ?? ''}>
            {title}={value ?? ''}
        </div>
    ),
}))

const item = {
    eun: 'E-1',
    serialNumber: 'SN-9',
    itemUsage: { name: 'Stock' },
    conditionStatus: null,
}

const cat = {
    uid: 'cat-1',
    catalogueNumber: 'CAT-5',
    catalogueCategory: { uid: 'cc-1', name: 'Cat' },
    supplier: { name: 'S' },
}

describe('PhysicalItemSection', () => {
    it('returns null when physicalItem missing', () => {
        const { container } = render(
            <PhysicalItemSection physicalItem={null} catalogueItem={cat} />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('shows EUN, Serial, Item Usage when present', () => {
        render(<PhysicalItemSection physicalItem={item} catalogueItem={cat} />)
        expect(screen.getByText('EUN=E-1')).toBeInTheDocument()
        expect(screen.getByText('Serial Number=SN-9')).toBeInTheDocument()
        expect(screen.getByText('Item Usage=Stock')).toBeInTheDocument()
    })

    it('omits EUN/Serial/Item Usage rows when missing', () => {
        render(
            <PhysicalItemSection
                physicalItem={{}}
                catalogueItem={cat}
            />,
        )
        expect(screen.queryByText(/EUN=/)).toBeNull()
        expect(screen.queryByText(/Serial Number=/)).toBeNull()
    })

    it('Part Number row links to catalogue item path', () => {
        render(<PhysicalItemSection physicalItem={item} catalogueItem={cat} />)
        const row = screen.getByText('Part Number=CAT-5')
        expect(row.getAttribute('data-href')).toContain('cat-1')
    })

    it('Category href includes encoded category JSON', () => {
        render(<PhysicalItemSection physicalItem={item} catalogueItem={cat} />)
        const row = screen.getByText('Category=Cat')
        expect(row.getAttribute('data-href')).toContain('cc-1')
    })
})
