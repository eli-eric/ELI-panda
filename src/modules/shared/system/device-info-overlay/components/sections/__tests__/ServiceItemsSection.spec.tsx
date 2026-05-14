import { render, screen } from '@testing-library/react'

import { ServiceItemsSection } from '../ServiceItemsSection.comp'

jest.mock('@/components/ui', () => ({
    Disclosure: ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div>
            <h4>{title}</h4>
            {children}
        </div>
    ),
}))

jest.mock('@/components/ui/detail-parameter', () => ({
    DetailParameter: ({ title, value }: { title: string; value?: string }) => (
        <div>
            {title}: {value}
        </div>
    ),
}))

jest.mock('../../SystemLink.comp', () => ({
    SystemLink: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

describe('ServiceItemsSection', () => {
    it('returns null when no service items', () => {
        const { container } = render(<ServiceItemsSection serviceItems={[]} />)
        expect(container).toBeEmptyDOMElement()
    })

    it('appends "(Delivered)" suffix when serviceItem.isDelivered=true', () => {
        render(
            <ServiceItemsSection
                serviceItems={[
                    { node: { uid: '1', name: 'Repair X', isDelivered: true } } as any,
                ]}
            />,
        )
        expect(screen.getByText('Repair X (Delivered)')).toBeInTheDocument()
    })

    it('omits suffix when isDelivered=false', () => {
        render(
            <ServiceItemsSection
                serviceItems={[
                    { node: { uid: '1', name: 'Calibrate', isDelivered: false } } as any,
                ]}
            />,
        )
        expect(screen.getByText('Calibrate')).toBeInTheDocument()
        expect(screen.queryByText('Calibrate (Delivered)')).toBeNull()
    })

    it('renders one disclosure per service item', () => {
        render(
            <ServiceItemsSection
                serviceItems={[
                    { node: { uid: '1', name: 'A', isDelivered: false } } as any,
                    { node: { uid: '2', name: 'B', isDelivered: true } } as any,
                ]}
            />,
        )
        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByText('B (Delivered)')).toBeInTheDocument()
    })
})
