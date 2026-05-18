import { render, screen } from '@testing-library/react'
import { FormattedMessage } from 'react-intl'

import { AppIntlProvider } from '../intl-provider.client'

describe('AppIntlProvider', () => {
    it('renders children inside IntlProvider', () => {
        render(
            <AppIntlProvider>
                <span>child</span>
            </AppIntlProvider>,
        )
        expect(screen.getByText('child')).toBeInTheDocument()
    })

    it('provides messages so FormattedMessage resolves an id from en locale', () => {
        render(
            <AppIntlProvider>
                <FormattedMessage id="common.buttons.edit" defaultMessage="x" />
            </AppIntlProvider>,
        )
        expect(screen.getByText('Edit')).toBeInTheDocument()
    })

    it('supports overriding locale prop without crashing', () => {
        render(
            <AppIntlProvider locale="cs">
                <span>cs-child</span>
            </AppIntlProvider>,
        )
        expect(screen.getByText('cs-child')).toBeInTheDocument()
    })
})
