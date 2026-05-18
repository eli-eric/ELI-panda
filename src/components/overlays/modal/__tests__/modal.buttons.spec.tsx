import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import ModalButtonsComponent from '../modal.buttons'

describe('ModalButtonsComponent', () => {
    it('renders nothing when buttons prop missing', () => {
        const { container } = renderWithProviders(<ModalButtonsComponent />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders goNext only when no goBack/alternative provided', () => {
        renderWithProviders(
            <ModalButtonsComponent
                buttons={{
                    goNext: { text: 'Save', onClick: jest.fn(), testid: 'save' },
                }}
            />,
        )
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(1)
        expect(buttons[0]).toHaveTextContent('Save')
    })

    it('renders goBack + alternative + goNext when all provided', () => {
        renderWithProviders(
            <ModalButtonsComponent
                buttons={{
                    goBack: { text: 'Cancel', onClick: jest.fn(), testid: 'cancel' },
                    alternative: { text: 'Alt', onClick: jest.fn(), testid: 'alt' },
                    goNext: { text: 'Save', onClick: jest.fn(), testid: 'save' },
                }}
            />,
        )
        expect(screen.getAllByRole('button')).toHaveLength(3)
    })

    it('hidden buttons are skipped', () => {
        renderWithProviders(
            <ModalButtonsComponent
                buttons={{
                    goBack: {
                        text: 'Cancel',
                        onClick: jest.fn(),
                        testid: 'cancel',
                        hidden: true,
                    },
                    goNext: { text: 'Save', onClick: jest.fn(), testid: 'save' },
                }}
            />,
        )
        expect(screen.queryByText('Cancel')).toBeNull()
        expect(screen.getByText('Save')).toBeInTheDocument()
    })

    it('click on goNext fires its onClick', () => {
        const onClick = jest.fn()
        renderWithProviders(
            <ModalButtonsComponent
                buttons={{ goNext: { text: 'Save', onClick, testid: 'save' } }}
            />,
        )
        fireEvent.click(screen.getByText('Save'))
        expect(onClick).toHaveBeenCalled()
    })
})
