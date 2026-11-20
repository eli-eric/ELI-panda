import type { ComponentProps } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { AdminLinks } from './AdminLinks.comp'
import { EmployeesSyncCard } from './EmployeesSyncCard.comp'

const labels = message.adminPage

type Props = ComponentProps<typeof EmployeesSyncCard>

export const AdministrationDashboard = (syncProps: Props) => {
    const { formatMessage: fm } = useIntl()

    return (
        <main
            className="mx-auto grid w-full max-w-5xl gap-6 p-4 sm:p-6"
            data-testid="admin-dashboard"
        >
            <header className="grid gap-1">
                <h1 className="text-2xl font-semibold">{fm({ id: labels.title })}</h1>
                <p className="text-sm text-muted-foreground">{fm({ id: labels.subtitle })}</p>
            </header>
            <AdminLinks />
            <EmployeesSyncCard {...syncProps} />
        </main>
    )
}
