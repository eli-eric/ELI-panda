import type { FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { useSystemDetail } from '@/modules/shared/system/system-detail'

import { SystemEditSkeleton } from './components/system-edit.skeleton'
import { SystemEditSheet } from './components/SystemEditSheet.comp'

interface SystemEditContainerProps {
    uid: string
    onClose?: () => void
}

/**
 * Edit System sheet. Breadcrumb / subsystem / spare clicks re-target the sheet to
 * another system in place instead of stacking sheets.
 */
export const SystemEditContainer: FC<SystemEditContainerProps> = ({ uid, onClose }) => {
    const { formatMessage: fm } = useIntl()
    const [currentUid, setCurrentUid] = useState(uid)
    const { system, isLoading, isNotFound, error, refetch } = useSystemDetail(currentUid)

    if (isLoading) return <SystemEditSkeleton />

    if (isNotFound || (!system && !error)) {
        return (
            <p className="p-4 text-sm text-muted-foreground" data-testid="system-edit-not-found">
                {fm({ id: message.systemHierarchy.sheet.notFound })}
            </p>
        )
    }

    if (!system) {
        return (
            <div className="p-4 space-y-2" data-testid="system-edit-error">
                <p className="text-sm text-muted-foreground">
                    {fm({ id: message.systemHierarchy.sheet.loadError })}
                </p>
                <Button size="sm" variant="outline" onClick={() => refetch()}>
                    {fm({ id: message.common.buttons.retry })}
                </Button>
            </div>
        )
    }

    return <SystemEditSheet system={system} onSelectSystem={setCurrentUid} onClose={onClose} />
}
