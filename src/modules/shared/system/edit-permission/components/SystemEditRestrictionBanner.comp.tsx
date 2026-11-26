'use client'

import { Info, TriangleAlert, UserX } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import type { SystemEditPermission } from '../hooks/useSystemEditPermission'
import { formatResponsibleName } from '../hooks/useSystemEditPermission'

type Props = Pick<SystemEditPermission, 'status' | 'responsibles' | 'refetch'>

const buildResponsiblesTooltip = (responsibles: Props['responsibles']): string =>
    responsibles
        .map(r => {
            const name = formatResponsibleName(r)
            // Skip the "(email)" suffix when the name already is the email
            // (formatResponsibleName falls back to email when nothing else exists).
            return r.email && r.email !== name ? `${name} (${r.email})` : name
        })
        .filter(Boolean)
        .join('\n')

/**
 * Tells a user they are not responsible for the system (and who is). Purely
 * informational — editing stays available behind a one-time confirmation. Renders
 * nothing while responsibility is loading or confirmed.
 */
export const SystemEditRestrictionBanner: FC<Props> = ({ status, responsibles, refetch }) => {
    const { formatMessage: fm } = useIntl()

    if (status === 'loading' || status === 'allowed') return null

    if (status === 'error') {
        return (
            // px wrapper instead of mx on the Alert: the Alert is w-full, so a
            // horizontal margin would push it past the container and under the
            // Quick Info sidebar.
            <div className="px-4 pt-2">
                <Alert data-testid="system-edit-verify-error">
                    <TriangleAlert />
                    <AlertTitle>{fm({ id: message.systemPermission.errorTitle })}</AlertTitle>
                    <AlertDescription>
                        <p>{fm({ id: message.systemPermission.errorDescription })}</p>
                        <Button variant="outline" size="sm" className="mt-1" onClick={refetch}>
                            {fm({ id: message.systemPermission.retry })}
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    // status === 'denied' — responsibles live in the info tooltip so the banner
    // stays compact.
    const hasResponsibles = responsibles.length > 0
    return (
        <div className="px-4 pt-2">
            <Alert data-testid="system-edit-denied">
                <UserX />
                <AlertTitle className="flex items-center gap-1.5">
                    {fm({ id: message.systemPermission.deniedTitle })}
                    {hasResponsibles && (
                        <Tooltip content={buildResponsiblesTooltip(responsibles)}>
                            <button
                                type="button"
                                aria-label={fm({
                                    id: message.systemPermission.deniedResponsiblesTooltip,
                                })}
                                className="inline-flex shrink-0 cursor-help text-muted-foreground"
                            >
                                <Info className="size-4" />
                            </button>
                        </Tooltip>
                    )}
                </AlertTitle>
                <AlertDescription>
                    <p>{fm({ id: message.systemPermission.deniedDescription })}</p>
                    {!hasResponsibles && (
                        <p>{fm({ id: message.systemPermission.deniedNoResponsibles })}</p>
                    )}
                </AlertDescription>
            </Alert>
        </div>
    )
}
