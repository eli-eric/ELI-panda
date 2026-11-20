import { render, screen } from '@testing-library/react'

import { SystemInformationSection } from '../SystemInformationSection.comp'

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
            {title}:{value ?? ''}
        </div>
    ),
}))

describe('SystemInformationSection', () => {
    it('returns null when systemDetail is null', () => {
        const { container } = render(<SystemInformationSection systemDetail={null} />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders the 5 detail rows', () => {
        render(
            <SystemInformationSection
                systemDetail={{
                    uid: 'u',
                    systemCode: 'SC',
                    name: 'Name',
                    location: { name: 'L' },
                    systemType: { name: 'T' },
                    zone: { name: 'Z' },
                }}
            />,
        )
        expect(screen.getByText('System Code:SC')).toBeInTheDocument()
        expect(screen.getByText('System Name:Name')).toBeInTheDocument()
        expect(screen.getByText('Location:L')).toBeInTheDocument()
        expect(screen.getByText('System Type:T')).toBeInTheDocument()
        expect(screen.getByText('Zone:Z')).toBeInTheDocument()
    })

    it('System Name links to /system/:uid', () => {
        render(
            <SystemInformationSection
                systemDetail={{
                    uid: 'sys-1',
                    systemCode: 'X',
                    name: 'N',
                }}
            />,
        )
        const nameRow = screen.getByText('System Name:N')
        expect(nameRow.getAttribute('data-href')).toBe('/systems/hierarchy?leaf=sys-1')
    })
})
