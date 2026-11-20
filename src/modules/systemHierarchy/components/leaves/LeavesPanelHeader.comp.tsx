import { ExternalLink, Folder } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'

import type {
    ParentPathItem,
    SelectAncestorHandler,
} from '../shared/SystemBreadcrumbs.comp'
import { SystemBreadcrumbs } from '../shared/SystemBreadcrumbs.comp'

interface LeavesPanelHeaderProps {
    parentName: string | null
    parentSystemCode: string | null
    parentSystemType: string | null
    parentPath: ParentPathItem[] | null
    totalCount: number
    directOnly?: boolean
    isLoading: boolean
    onViewParentDetail: () => void
    onSelectAncestor: SelectAncestorHandler
}

export const LeavesPanelHeader: FC<LeavesPanelHeaderProps> = ({
    parentName,
    parentSystemCode,
    parentSystemType,
    parentPath,
    totalCount,
    directOnly = false,
    isLoading,
    onViewParentDetail,
    onSelectAncestor,
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
            <div className="flex items-center gap-2 min-w-0">
                <Folder className="size-4 text-muted-foreground shrink-0" />
                <SystemBreadcrumbs
                    parentPath={parentPath}
                    currentName={parentName ?? ''}
                    currentCode={parentSystemCode}
                    onSelectAncestor={onSelectAncestor}
                />
            </div>
            <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground truncate">
                    {parentSystemType ?? fm({ id: message.systemHierarchy.leaves.title })}
                </span>
                <div className="flex items-center gap-2">
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
                        // Qualified in direct-only mode: the tree badge for the same node
                        // still shows the total, so two different numbers are on screen
                        // at once and the header is what explains the difference.
                        <span className="text-xs text-muted-foreground">
                            {directOnly
                                ? `(${totalCount} ${fm({ id: message.systemHierarchy.leaves.directCountSuffix })})`
                                : `(${totalCount})`}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
