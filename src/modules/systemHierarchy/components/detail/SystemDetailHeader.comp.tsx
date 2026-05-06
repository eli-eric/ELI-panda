import { ArrowLeft } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'
import type { SelectAncestorHandler } from '../shared/SystemBreadcrumbs.comp'
import { SystemBreadcrumbs } from '../shared/SystemBreadcrumbs.comp'
import { ActionsDropdown } from './ActionsDropdown.comp'

interface SystemDetailHeaderProps {
    system: SystemLeaf
    onBack: () => void
    onSelectAncestor: SelectAncestorHandler
}

export const SystemDetailHeader: FC<SystemDetailHeaderProps> = ({
    system,
    onBack,
    onSelectAncestor,
}) => {
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
                <SystemBreadcrumbs
                    parentPath={system.parentPath ?? null}
                    currentName={system.name}
                    currentCode={system.systemCode}
                    onSelectAncestor={onSelectAncestor}
                />
            </div>
            <ActionsDropdown system={system} />
        </div>
    )
}
