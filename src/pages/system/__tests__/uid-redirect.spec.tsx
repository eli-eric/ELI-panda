import { render } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import SystemDetailRedirectPage from '../[uid]'

const mockReplace = jest.fn()
let mockQuery: Record<string, string | string[] | undefined> = {}
let mockIsReady = true

jest.mock('next/router', () => ({
    useRouter: () => ({
        isReady: mockIsReady,
        query: mockQuery,
        replace: mockReplace,
    }),
}))

const messages: Record<string, string> = {
    'systemItem.head': 'System',
}

const renderPage = () =>
    render(
        <IntlProvider locale="en" messages={messages}>
            <SystemDetailRedirectPage />
        </IntlProvider>,
    )

describe('/system/[uid] redirect page', () => {
    beforeEach(() => {
        mockReplace.mockClear()
        mockQuery = {}
        mockIsReady = true
    })

    it('replaces to the hierarchy deep link for the uid', () => {
        mockQuery = { uid: 'u-1' }
        renderPage()
        expect(mockReplace).toHaveBeenCalledWith('/systems/hierarchy?leaf=u-1')
    })

    it('normalizes an array uid param to its first value', () => {
        mockQuery = { uid: ['u-1', 'u-2'] }
        renderPage()
        expect(mockReplace).toHaveBeenCalledWith('/systems/hierarchy?leaf=u-1')
    })

    it('does nothing until the router is ready', () => {
        mockIsReady = false
        mockQuery = { uid: 'u-1' }
        renderPage()
        expect(mockReplace).not.toHaveBeenCalled()
    })

    it('does nothing without a uid', () => {
        renderPage()
        expect(mockReplace).not.toHaveBeenCalled()
    })
})
