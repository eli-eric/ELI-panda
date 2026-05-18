import { fireEvent, render, screen } from '@testing-library/react'

import DisclosureComponent from '../Disclosure.comp'

describe('DisclosureComponent', () => {
    it('renders title + children', () => {
        render(
            <DisclosureComponent title="My Title">
                <div data-testid="kids">kids</div>
            </DisclosureComponent>,
        )
        expect(screen.getByText('My Title')).toBeInTheDocument()
        // children rendered when defaultOpen
        // (HeadlessUI Disclosure may not render kids initially when closed)
    })

    it('shows children when defaultOpen', () => {
        render(
            <DisclosureComponent title="X" defaultOpen>
                <div data-testid="kids">k</div>
            </DisclosureComponent>,
        )
        expect(screen.getByTestId('kids')).toBeInTheDocument()
    })

    it('clicking title toggles open state', () => {
        render(
            <DisclosureComponent title="Title">
                <div data-testid="kids">k</div>
            </DisclosureComponent>,
        )
        expect(screen.queryByTestId('kids')).toBeNull()
        fireEvent.click(screen.getByRole('button'))
        expect(screen.getByTestId('kids')).toBeInTheDocument()
    })
})
