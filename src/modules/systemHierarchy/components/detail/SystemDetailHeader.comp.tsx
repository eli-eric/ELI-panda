import { ArrowLeft } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'
import { ActionsDropdown } from './ActionsDropdown.comp'

interface SystemDetailHeaderProps {
    system: SystemLeaf
    onBack: () => void
}

export const SystemDetailHeader: FC<SystemDetailHeaderProps> = ({ system, onBack }) => {
    const { formatMessage: fm } = useIntl()

    return (
        <div
            className="flex items-center gap-3 border-b border-border px-4 py-2"
            data-testid="system-hierarchy-detail-header"
        >
            <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="h-8 gap-1.5 px-2 text-xs"
                data-testid="system-hierarchy-back-to-leaves"
            >
                <ArrowLeft className="size-3.5" />
                {fm({ id: message.systemHierarchy.detail.backToLeaves })}
            </Button>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold truncate">{system.name}</h2>
                    {system.systemCode && (
                        <code className="text-[10px] text-muted-foreground shrink-0 rounded bg-muted px-1.5 py-0.5">
                            {system.systemCode}
                        </code>
                    )}
                </div>
            </div>
            <ActionsDropdown system={system} />
        </div>
    )
}
