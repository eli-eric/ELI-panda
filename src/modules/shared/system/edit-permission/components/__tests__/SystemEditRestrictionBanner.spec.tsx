import { fireEvent, render, screen } from '@testing-library/react'
import { IntlProvider } from 'react-intl'

import { SystemEditRestrictionBanner } from '../SystemEditRestrictionBanner.comp'

const messages: Record<string, string> = {
    'systemPermission.deniedTitle': "You don't have permission to edit this system.",
    'systemPermission.deniedResponsiblesTooltip':
        'Show who is responsible for this system',
    'systemPermission.deniedNoResponsibles':
        'Please contact an administrator to request access.',
    'systemPermission.errorTitle': 'Could not verify your edit permissions.',
    'systemPermission.errorDescription':
        'Editing is disabled until we can confirm your access.',
    'systemPermission.retry': 'Retry',
}

const responsible = {
    uid: 'u1',
    firstName: 'Ann',
    lastName: 'Lee',
    username: 'alee',
    email: 'ann.lee@eli.eu',
}

const renderBanner = (props: Parameters<typeof SystemEditRestrictionBanner>[0]) =>
    render(
        <IntlProvider locale="en" messages={messages}>
            <SystemEditRestrictionBanner {...props} />
        </IntlProvider>,
    )

describe('SystemEditRestrictionBanner', () => {
    it('renders nothing while loading', () => {
        const { container } = renderBanner({
            status: 'loading',
            responsibles: [],
            refetch: jest.fn(),
        })
        expect(container).toBeEmptyDOMElement()
    })

    it('renders nothing when allowed', () => {
        const { container } = renderBanner({
            status: 'allowed',
            responsibles: [],
            refetch: jest.fn(),
        })
        expect(container).toBeEmptyDOMElement()
    })

    it('shows a compact denied banner with a responsibles info trigger (not an inline list)', () => {
        renderBanner({ status: 'denied', responsibles: [responsible], refetch: jest.fn() })
        expect(screen.getByTestId('system-edit-denied')).toBeInTheDocument()
        // Responsibles live in the tooltip, not rendered inline — keeps the banner one line.
        expect(
            screen.getByRole('button', { name: 'Show who is responsible for this system' }),
        ).toBeInTheDocument()
        expect(screen.queryByText(/ann\.lee@eli\.eu/)).not.toBeInTheDocument()
    })

    it('shows the admin fallback when denied with no responsibles', () => {
        renderBanner({ status: 'denied', responsibles: [], refetch: jest.fn() })
        expect(
            screen.getByText('Please contact an administrator to request access.'),
        ).toBeInTheDocument()
    })

    it('shows a distinct verify-error state with a working retry', () => {
        const refetch = jest.fn()
        renderBanner({ status: 'error', responsibles: [], refetch })
        expect(screen.getByTestId('system-edit-verify-error')).toBeInTheDocument()
        expect(screen.queryByTestId('system-edit-denied')).not.toBeInTheDocument()
        fireEvent.click(screen.getByText('Retry'))
        expect(refetch).toHaveBeenCalled()
    })
})
