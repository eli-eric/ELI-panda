import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'

interface HistoryTabProps {
    system: SystemLeaf
}

export const HistoryTabContainer: FC<HistoryTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()

    const history = system.history

    if (!history || history.length === 0) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.history.noHistory })}
            </div>
        )
    }

    return (
        <div className="p-4">
            <div className="space-y-2">
                {history.map(entry => (
                    <div
                        key={entry.uid}
                        className="flex items-start gap-3 rounded-md border border-border p-3 text-sm"
                    >
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{entry.action}</span>
                                <span className="text-muted-foreground text-xs">
                                    {entry.changedAt}
                                </span>
                            </div>
                            <div className="text-muted-foreground text-xs">
                                {fm({ id: message.systemHierarchy.history.changedBy })}:{' '}
                                {entry.changedBy}
                            </div>
                            {entry.detail && (
                                <div className="text-xs text-muted-foreground">
                                    {entry.detail.systemName} ({entry.detail.direction})
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
