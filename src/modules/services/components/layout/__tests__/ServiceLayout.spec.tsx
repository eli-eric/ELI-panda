import { render, screen } from '@testing-library/react'

import { PageLayout } from '../ServiceLayout'

jest.mock('@/components/layout/Heading', () => ({
    Heading: ({
        children,
        customText,
    }: {
        children?: React.ReactNode
        customText: string
    }) => (
        <div>
            <h2>{customText}</h2>
            {children}
        </div>
    ),
}))

jest.mock('@/components/loader.comp', () => ({
    __esModule: true,
    default: () => <div data-testid="loader" />,
}))

describe('Services PageLayout', () => {
    it('renders title heading + children', () => {
        render(
            <PageLayout title="Services">
                <p>content</p>
            </PageLayout>,
        )
        expect(screen.getByText('Services')).toBeInTheDocument()
        expect(screen.getByText('content')).toBeInTheDocument()
    })

    it('renders actionButton in heading slot', () => {
        render(
            <PageLayout title="X" actionButton={<button data-testid="action">a</button>}>
                <p>c</p>
            </PageLayout>,
        )
        expect(screen.getByTestId('action')).toBeInTheDocument()
    })

    it('shows loader instead of children while isPending', () => {
        render(
            <PageLayout title="X" isPending>
                <p data-testid="kids">kids</p>
            </PageLayout>,
        )
        expect(screen.getByTestId('loader')).toBeInTheDocument()
        expect(screen.queryByTestId('kids')).toBeNull()
    })
})
