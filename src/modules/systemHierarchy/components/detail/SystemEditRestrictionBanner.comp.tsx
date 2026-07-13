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
            // px wrapper instead of mx on the Alert: the Alert is w-full, so a
            // horizontal margin would push it past the container and under the
            // Quick Info sidebar.
            <div className="px-4 pt-2">
                <Alert variant="destructive" data-testid="system-edit-verify-error">
                    <Lock />
                    <AlertTitle>
                        {fm({ id: message.systemHierarchy.permission.errorTitle })}
                    </AlertTitle>
                    <AlertDescription>
                        <p>{fm({ id: message.systemHierarchy.permission.errorDescription })}</p>
                        <Button variant="outline" size="sm" className="mt-1" onClick={refetch}>
                            {fm({ id: message.systemHierarchy.permission.retry })}
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    // status === 'denied' — keep it compact: the responsibles live in the info
    // tooltip so the banner stays a single line. Only fall back to inline text
    // when there is no one to list.
    const hasResponsibles = responsibles.length > 0
    return (
        <div className="px-4 pt-2">
            <Alert data-testid="system-edit-denied">
                <Lock />
                <AlertTitle className="flex items-center gap-1.5">
                    {fm({ id: message.systemHierarchy.permission.deniedTitle })}
                    {hasResponsibles && (
                        <Tooltip content={buildResponsiblesTooltip(responsibles)}>
                            <button
                                type="button"
                                aria-label={fm({
                                    id: message.systemHierarchy.permission
                                        .deniedResponsiblesTooltip,
                                })}
                                className="inline-flex shrink-0 cursor-help text-muted-foreground"
                            >
                                <Info className="size-4" />
                            </button>
                        </Tooltip>
                    )}
                </AlertTitle>
                {!hasResponsibles && (
                    <AlertDescription>
                        <p>{fm({ id: message.systemHierarchy.permission.deniedNoResponsibles })}</p>
                    </AlertDescription>
                )}
            </Alert>
        </div>
    )
}
