import { ExternalLink, Folder } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'

import type { HierarchyView } from '../../types/constants'
import { ViewSwitcher } from '../graph/ViewSwitcher.comp'

interface LeavesPanelHeaderProps {
    parentName: string | null
    parentSystemCode: string | null
    parentSystemType: string | null
    totalCount: number
    isLoading: boolean
    onViewParentDetail: () => void
    activeView: HierarchyView
    onViewChange: (view: HierarchyView) => void
}

export const LeavesPanelHeader: FC<LeavesPanelHeaderProps> = ({
    parentName,
    parentSystemCode,
    parentSystemType,
    totalCount,
    isLoading,
    onViewParentDetail,
    activeView,
    onViewChange,
}) => {
    const { formatMessage: fm } = useIntl()

    if (isLoading) {
        return (
            <div className="border-b border-border px-4 py-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="size-4" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center justify-between mt-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-7 w-20" />
                </div>
            </div>
        )
    }

    return (
        <div id="page-head" className="border-b border-border px-4 py-2">
            <div className="flex items-center gap-2">
                <Folder className="size-4 text-muted-foreground shrink-0" />
                <h2 className="text-sm font-semibold truncate">{parentName}</h2>
                {parentSystemCode && (
                    <code className="text-[10px] text-muted-foreground shrink-0 rounded bg-muted px-1.5 py-0.5">
                        {parentSystemCode}
                    </code>
                )}
            </div>
            <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground truncate">
                    {parentSystemType ?? fm({ id: message.systemHierarchy.leaves.title })}
                </span>
                <div className="flex items-center gap-2">
                    <ViewSwitcher activeView={activeView} onViewChange={onViewChange} />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onViewParentDetail}
                        className="h-7 gap-1.5 px-2 text-xs"
                    >
                        <ExternalLink className="size-3" />
                        {fm({ id: message.systemHierarchy.leaves.viewParent })}
                    </Button>
                    {totalCount > 0 && (
                        <span className="text-xs text-muted-foreground">({totalCount})</span>
                    )}
                </div>
            </div>
        </div>
    )
}
