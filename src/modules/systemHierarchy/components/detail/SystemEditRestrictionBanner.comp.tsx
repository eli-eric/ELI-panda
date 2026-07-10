'use client'

import { Info, Lock } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import type { SystemEditPermission } from '../../hooks/useSystemEditPermission'
import { formatResponsibleName } from '../../hooks/useSystemEditPermission'

type Props = Pick<SystemEditPermission, 'status' | 'responsibles' | 'refetch'>

const buildResponsiblesTooltip = (responsibles: Props['responsibles']): string =>
    responsibles
        .map(r => {
            const name = formatResponsibleName(r)
            return r.email ? `${name} (${r.email})` : name
        })
        .filter(Boolean)
        .join('\n')

/**
 * Explains why editing is blocked and who to contact. Shown on the system detail
 * view above the tabs. Renders nothing while permission is loading or allowed.
 */
export const SystemEditRestrictionBanner: FC<Props> = ({ status, responsibles, refetch }) => {
    const { formatMessage: fm } = useIntl()

    if (status === 'loading' || status === 'allowed') return null

    if (status === 'error') {
        return (
            <Alert variant="destructive" className="mx-4 mt-2" data-testid="system-edit-verify-error">
                <Lock />
                <AlertTitle>{fm({ id: message.systemHierarchy.permission.errorTitle })}</AlertTitle>
                <AlertDescription>
                    <p>{fm({ id: message.systemHierarchy.permission.errorDescription })}</p>
                    <Button variant="outline" size="sm" className="mt-1" onClick={refetch}>
                        {fm({ id: message.systemHierarchy.permission.retry })}
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    // status === 'denied'
    const hasResponsibles = responsibles.length > 0
    return (
        <Alert className="mx-4 mt-2" data-testid="system-edit-denied">
            <Lock />
            <AlertTitle className="flex items-center gap-1.5">
                {fm({ id: message.systemHierarchy.permission.deniedTitle })}
                {hasResponsibles && (
                    <Tooltip content={buildResponsiblesTooltip(responsibles)}>
                        <Info className="size-4 shrink-0 text-muted-foreground" />
                    </Tooltip>
                )}
            </AlertTitle>
            <AlertDescription>
                <p>
                    {hasResponsibles
                        ? fm({ id: message.systemHierarchy.permission.deniedResponsiblesLabel })
                        : fm({ id: message.systemHierarchy.permission.deniedNoResponsibles })}
                </p>
                {hasResponsibles && (
                    <ul className="list-none">
                        {responsibles.map(r => (
                            <li key={r.uid}>
                                {formatResponsibleName(r)}
                                {r.email ? ` (${r.email})` : ''}
                            </li>
                        ))}
                    </ul>
                )}
            </AlertDescription>
        </Alert>
    )
}
