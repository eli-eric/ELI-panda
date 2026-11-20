import { render, screen } from '@testing-library/react'

import { message } from '@/i18n/src/messages'

import { UserOrganization } from '../UserOrganization.comp'

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

describe('UserOrganization', () => {
    it('renders org unit code and team names', () => {
        render(
            <UserOrganization
                orgUnitCode="1234"
                teams={[
                    { uid: 't1', name: '1234 Lasers' },
                    { uid: 't2', name: '5678 Vacuum' },
                ]}
            />,
        )

        expect(screen.getByTestId('user-org-unit-code')).toHaveTextContent('1234')
        expect(screen.getByTestId('user-teams')).toHaveTextContent('1234 Lasers, 5678 Vacuum')
    })

    it('renders placeholders when code and teams are missing', () => {
        render(<UserOrganization orgUnitCode={null} />)

        expect(screen.getByTestId('user-org-unit-code')).toHaveTextContent('-')
        expect(screen.getByTestId('user-teams')).toHaveTextContent(message.layout.profile.noTeams)
    })
})
