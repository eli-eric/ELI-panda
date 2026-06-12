import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { SystemDetailHeader } from './SystemDetailHeader.comp'
import { SystemDetailTabsContainer } from './SystemDetailTabs.cont'

export const SystemDetailViewContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { selectedLeafUid, goBackToLeaves, selectParent, clearSelection } =
        useHierarchyNavigation()
    const { system, isLoading, error, refetch } = useSystemDetail(selectedLeafUid)

    if (isLoading) {
        return (
            <div className="flex flex-col h-full" data-testid="system-detail-skeleton">
                <div className="flex items-center gap-3 border-b border-border px-4 py-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-5 flex-1" />
                </div>
                <div className="p-4 space-y-4">
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        )
    }

    // fetch failed (retry: false) — transient errors are not a missing system
    if (error && !system) {
        return (
            <div
                className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center"
                data-testid="system-detail-error"
            >
                <p className="text-lg font-semibold">
                    {fm({ id: message.systemHierarchy.detail.loadErrorTitle })}
                </p>
                <p className="text-sm text-muted-foreground">
                    {fm({ id: message.systemHierarchy.detail.loadErrorDescription })}
                </p>
                <Button variant="outline" className="mt-2" onClick={() => refetch()}>
                    {fm({ id: message.common.buttons.retry })}
                </Button>
            </div>
        )
    }

    // query settled without a match — deleted system or invalid deep link
    if (!system) {
        return (
            <div
                className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center"
                data-testid="system-detail-not-found"
            >
                <p className="text-lg font-semibold">
                    {fm({ id: message.systemHierarchy.detail.notFoundTitle })}
                </p>
                <p className="text-sm text-muted-foreground">
                    {fm({ id: message.systemHierarchy.detail.notFoundDescription })}
                </p>
                <Button variant="outline" className="mt-2" onClick={clearSelection}>
                    {fm({ id: message.systemHierarchy.detail.notFoundBack })}
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <SystemDetailHeader
                system={system}
                onBack={goBackToLeaves}
                onSelectAncestor={selectParent}
            />
            <div className="flex-1 min-h-0">
                <SystemDetailTabsContainer system={system} />
            </div>
        </div>
    )
}
