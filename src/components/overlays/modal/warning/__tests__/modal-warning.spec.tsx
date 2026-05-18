import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import WarningModal from '../modal-warning.comp'

jest.mock('@/components/error/ErrorPage', () => ({
    __esModule: true,
    default: () => <div data-testid="err-page" />,
}))

const baseProps = {
    title: 'common.buttons.cancel',
    message: 'Are you sure?',
    testid: 't',
}

describe('WarningModal', () => {
    it('renders nothing visible when open=false', () => {
        renderWithProviders(
            <WarningModal
                {...baseProps}
                open={false}
                setOpen={jest.fn()}
                buttons={{ goNext: { text: 'common.buttons.cancel' } } as any}
            />,
        )
        expect(screen.queryByText('Are you sure?')).toBeNull()
    })

    it('shows title + message when open=true', () => {
        renderWithProviders(
            <WarningModal
                {...baseProps}
                open
                setOpen={jest.fn()}
                buttons={{ goNext: { text: 'common.buttons.cancel' } } as any}
            />,
        )
        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })

    it('Continue click invokes goNext.onClick then setOpen(false)', () => {
        const setOpen = jest.fn()
        const onClick = jest.fn()
        renderWithProviders(
            <WarningModal
                {...baseProps}
                open
                setOpen={setOpen}
                buttons={{ goNext: { text: 'common.buttons.cancel', onClick } } as any}
            />,
        )
        // Only goNext (no goBack) — find the footer action button by sr-only-free, but
        // we can simply look for the button that is NOT the Radix dialog close button.
        // The Radix close button has aria-label "Close"; filter it out.
        // Filter out any radix close/dismiss buttons by textContent containing "Close" or having sr-only text "Close"
        const buttons = screen
            .getAllByRole('button')
            .filter(b => !/(^|\s)Close(\s|$)/.test(b.textContent || ''))
            .filter(b => b.getAttribute('aria-label') !== 'Close')
        // Take the last action button as Continue
        fireEvent.click(buttons[buttons.length - 1])
        expect(onClick).toHaveBeenCalled()
        expect(setOpen).toHaveBeenCalledWith(false)
    })

    it('Cancel/goBack click invokes setOpen(false) then onClick', () => {
        const setOpen = jest.fn()
        const onClick = jest.fn()
        renderWithProviders(
            <WarningModal
                {...baseProps}
                open
                setOpen={setOpen}
                buttons={
                    {
                        goBack: { text: 'common.buttons.cancel', onClick },
                        goNext: { text: 'common.buttons.cancel' },
                    } as any
                }
            />,
        )
        const buttons = screen.getAllByRole('button')
        // goBack is rendered first among action buttons (find by index 0 among footer buttons)
        // include the X-close-button-on-radix: select all then click the one with variant=outline.
        // Easier: filter by class containing 'border' (outline button has border)
        const goBack = buttons.find(b => b.className.includes('border'))
        fireEvent.click(goBack!)
        expect(setOpen).toHaveBeenCalledWith(false)
        expect(onClick).toHaveBeenCalled()
    })

    it('shows ErrorPage when error prop set', () => {
        renderWithProviders(
            <WarningModal
                {...baseProps}
                open
                setOpen={jest.fn()}
                buttons={{ goNext: { text: 'common.buttons.cancel' } } as any}
                error="boom"
            />,
        )
        expect(screen.getByTestId('err-page')).toBeInTheDocument()
    })
})
