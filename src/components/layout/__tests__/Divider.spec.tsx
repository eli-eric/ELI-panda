import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import Divider from '../Divider'

describe('Divider', () => {
    it('renders FormattedMessage text id as visible label', () => {
        renderWithProviders(<Divider text="common.buttons.edit" />)
        expect(screen.getByText('Edit')).toBeInTheDocument()
    })

    it('renders children alongside text', () => {
        renderWithProviders(
            <Divider text="common.buttons.edit">
                <button>extra</button>
            </Divider>,
        )
        expect(screen.getByRole('button', { name: 'extra' })).toBeInTheDocument()
    })

    it('applies custom className to root', () => {
        const { container } = renderWithProviders(
            <Divider text="common.buttons.edit" className="my-extra" />,
        )
        expect(container.firstChild).toHaveClass('my-extra')
    })

    it('always renders the horizontal line via aria-hidden separator', () => {
        const { container } = renderWithProviders(<Divider text="common.buttons.edit" />)
        expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
    })
})
