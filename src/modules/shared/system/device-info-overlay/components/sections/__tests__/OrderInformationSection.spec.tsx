import { render, screen } from '@testing-library/react'

import { OrderInformationSection } from '../OrderInformationSection.comp'

jest.mock('@/components/ui', () => ({
    Disclosure: ({ title, children }: { title: string; children: React.ReactNode }) => (
        <section>
            <h2>{title}</h2>
            {children}
        </section>
    ),
}))

describe('OrderInformationSection', () => {
    it('returns null when no order and no service items', () => {
        const { container } = render(
            <OrderInformationSection physicalItem={{}} serviceItems={[]} />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('renders Order History title with count when main order present', () => {
        render(
            <OrderInformationSection
                physicalItem={{
                    order: { uid: 'o1', name: 'Order A', orderDate: '2024-01-01' },
                    orderConnection: { edges: [{ isDelivered: false }] },
                }}
                serviceItems={[]}
            />,
        )
        expect(screen.getByText('Order History Information (1)')).toBeInTheDocument()
    })

    it('combines main order + service items in the count', () => {
        render(
            <OrderInformationSection
                physicalItem={{
                    order: { uid: 'o1', name: 'A', orderDate: null },
                    orderConnection: null,
                }}
                serviceItems={[
                    { node: { uid: 's1', name: 'Repair', isDelivered: true } },
                    { node: { uid: 's2', name: 'Replace', isDelivered: false } },
                ] as any}
            />,
        )
        expect(screen.getByText('Order History Information (3)')).toBeInTheDocument()
    })

    it('uses "Unnamed Order" fallback when order name missing', () => {
        render(
            <OrderInformationSection
                physicalItem={{
                    order: { uid: 'o', name: null, orderDate: null },
                    orderConnection: null,
                }}
                serviceItems={[]}
            />,
        )
        expect(screen.getByText('Unnamed Order')).toBeInTheDocument()
    })

    it('order links to /orders/:uid in new tab', () => {
        render(
            <OrderInformationSection
                physicalItem={{
                    order: { uid: 'o42', name: 'A', orderDate: null },
                    orderConnection: null,
                }}
                serviceItems={[]}
            />,
        )
        const link = screen.getByText('A').closest('a')
        expect(link).toHaveAttribute('href', '/order/o42')
        expect(link).toHaveAttribute('target', '_blank')
    })
})
