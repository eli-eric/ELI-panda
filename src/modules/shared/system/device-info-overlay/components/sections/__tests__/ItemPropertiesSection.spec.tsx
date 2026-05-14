import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ItemPropertiesSection } from '../ItemPropertiesSection.comp'

jest.mock('@/components/ui', () => ({
    Disclosure: ({ title, children }: { title: string; children: React.ReactNode }) => (
        <section>
            <h2>{title}</h2>
            {children}
        </section>
    ),
}))

jest.mock('@/components/ui/detail-parameter', () => ({
    DetailParameter: ({ title, value }: { title: string; value?: string }) => (
        <span>
            {title}={value}
        </span>
    ),
}))

const baseGroup = {
    key: 'g1',
    name: 'General',
    properties: [{ name: 'A', value: '1' }],
}

describe('ItemPropertiesSection', () => {
    it('returns null when no properties', () => {
        const { container } = renderWithProviders(
            <ItemPropertiesSection
                groupedProperties={[baseGroup]}
                hasOverriddenProperties={false}
                hasProperties={false}
            />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('renders the section when hasProperties=true', () => {
        renderWithProviders(
            <ItemPropertiesSection
                groupedProperties={[baseGroup]}
                hasOverriddenProperties={false}
                hasProperties
            />,
        )
        expect(screen.getByText('Physical Item - Properties')).toBeInTheDocument()
    })

    it('renders override notice only when hasOverriddenProperties=true', () => {
        const { rerender } = renderWithProviders(
            <ItemPropertiesSection
                groupedProperties={[baseGroup]}
                hasOverriddenProperties={false}
                hasProperties
            />,
        )
        expect(
            screen.queryByText(/Original catalog parameter modified/i),
        ).toBeNull()
        rerender(
            <ItemPropertiesSection
                groupedProperties={[baseGroup]}
                hasOverriddenProperties
                hasProperties
            />,
        )
        expect(
            screen.getByText(/Original catalog parameter modified/i),
        ).toBeInTheDocument()
    })

    it('omits group heading for "General" group; shows it for other groups', () => {
        renderWithProviders(
            <ItemPropertiesSection
                groupedProperties={[
                    { key: 'g', name: 'General', properties: [] },
                    { key: 'p', name: 'Power', properties: [] },
                ]}
                hasOverriddenProperties={false}
                hasProperties
            />,
        )
        expect(screen.queryByRole('heading', { name: 'General' })).toBeNull()
        expect(screen.getByRole('heading', { name: 'Power' })).toBeInTheDocument()
    })
})
