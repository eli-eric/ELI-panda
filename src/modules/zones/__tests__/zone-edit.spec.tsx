import { render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { messages } from '@/i18n/src/messages'

const mockUseZone = jest.fn()

jest.mock('../hooks/useZone', () => ({
    useZone: (uid?: string) => mockUseZone(uid),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: () => ({ openModal: jest.fn(), closeModal: jest.fn() }),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn(), promise: jest.fn(), success: jest.fn() },
}))

jest.mock('../form/zone-form.cont', () => ({
    ZoneFormContainer: () => <div data-testid="zone-form" />,
}))

jest.mock('@/components/pages/record-not-found.comp', () => ({
    __esModule: true,
    default: () => <div data-testid="record-not-found" />,
}))

jest.mock('@/components/error/ErrorPage', () => ({
    __esModule: true,
    default: () => <div data-testid="error-page" />,
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ZoneEditContainer } = require('../form/zone-edit.cont')

const renderEdit = () =>
    render(
        <IntlProvider locale="en" messages={messages.en}>
            <ZoneEditContainer uid="zone-1" />
        </IntlProvider>,
    )

/** Shape thrown by queryFetcher — status sits on the error itself, not on `response`. */
const notFoundError = () => {
    const error = new Error('HTTP 404') as Error & { status?: number }
    error.status = 404
    return error
}

beforeEach(() => {
    jest.clearAllMocks()
})

describe('ZoneEditContainer', () => {
    it('renders RecordNotFound for a 404', () => {
        // Regression: this branch used to read error.response.status, which queryFetcher
        // never sets, so a deleted zone fell through to the generic error page instead.
        mockUseZone.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            error: notFoundError(),
            refetch: jest.fn(),
        })

        renderEdit()

        expect(screen.getByTestId('record-not-found')).toBeInTheDocument()
        expect(screen.queryByTestId('error-page')).not.toBeInTheDocument()
    })

    it('renders the generic error page for a 500', () => {
        const error = new Error('HTTP 500') as Error & { status?: number }
        error.status = 500
        mockUseZone.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            error,
            refetch: jest.fn(),
        })

        renderEdit()

        expect(screen.getByTestId('error-page')).toBeInTheDocument()
        expect(screen.queryByTestId('record-not-found')).not.toBeInTheDocument()
    })

    it('renders the form once the zone loads', () => {
        mockUseZone.mockReturnValue({
            data: { uid: 'zone-1', name: 'Zone', code: 'Z' },
            isLoading: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        })

        renderEdit()

        expect(screen.getByTestId('zone-form')).toBeInTheDocument()
    })
})
