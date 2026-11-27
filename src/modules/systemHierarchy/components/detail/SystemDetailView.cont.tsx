import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import {
    SystemEditRestrictionBanner,
    useSystemEditPermission,
} from '@/modules/shared/system/edit-permission'
import { useSystemDetail } from '@/modules/shared/system/system-detail'

import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { SystemDetailHeader } from './SystemDetailHeader.comp'
import { SystemDetailTabsContainer } from './SystemDetailTabs.cont'

const DetailBodySkeleton: FC = () => (
    <div className="p-4 space-y-4" data-testid="system-detail-body-skeleton">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-40 w-full" />
    </div>
)

export const SystemDetailViewContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { selectedLeafUid, goBackToLeaves, selectParent, clearSelection } =
        useHierarchyNavigation()
    // A tree/breadcrumb click seeds the cache (primeSystemDetailCache) with a stale
    // placeholder, so the header renders at once and the real detail is fetched on
    // the key change — no manual refetch needed.
    const { system, isLoading, isFetching, isSeeded, isNotFound, error, refetch } =
        useSystemDetail(selectedLeafUid)
    const editPermission = useSystemEditPermission(selectedLeafUid)

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

    // a transient failure is not a missing system
    if (error && !isNotFound && !system) {
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

    // deleted system or invalid deep link (also wins over a navigation seed)
    if (isNotFound || !system) {
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
                isRefreshing={isFetching && !isLoading && !isSeeded}
            />
            <SystemEditRestrictionBanner
                status={editPermission.status}
                responsibles={editPermission.responsibles}
                refetch={editPermission.refetch}
            />
            <div className="flex-1 min-h-0">
                {isSeeded ? <DetailBodySkeleton /> : <SystemDetailTabsContainer system={system} />}
            </div>
        </div>
    )
}
