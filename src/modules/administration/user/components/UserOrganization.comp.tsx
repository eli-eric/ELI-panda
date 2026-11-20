import { type FC } from 'react'
import { useIntl } from 'react-intl'

import Card from '@/components/layout/Card'
import { message } from '@/i18n/src/messages'

export interface UserOrganizationTeam {
    uid: string
    name: string
}

type Props = {
    orgUnitCode?: string | null
    teams?: UserOrganizationTeam[]
}

export const UserOrganization: FC<Props> = ({ orgUnitCode, teams = [] }) => {
    const { formatMessage: fm } = useIntl()

    return (
        <Card>
            <div className="pb-2 font-bold dark:text-gray-200">
                {fm({ id: message.layout.profile.organization })}
            </div>
            <dl
                data-testid="user-organization"
                className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 dark:text-gray-300"
            >
                <div>
                    <dt className="font-medium">
                        {fm({ id: message.layout.profile.orgUnitCode })}
                    </dt>
                    <dd data-testid="user-org-unit-code">{orgUnitCode || '-'}</dd>
                </div>
                <div>
                    <dt className="font-medium">{fm({ id: message.layout.profile.teams })}</dt>
                    <dd data-testid="user-teams">
                        {teams.length > 0
                            ? teams.map(team => team.name).join(', ')
                            : fm({ id: message.layout.profile.noTeams })}
                    </dd>
                </div>
            </dl>
        </Card>
    )
}
