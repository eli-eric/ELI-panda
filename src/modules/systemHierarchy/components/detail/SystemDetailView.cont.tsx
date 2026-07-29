import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import {
    SystemEditRestrictionBanner,
    useSystemEditPermission,
} from '@/modules/shared/system/edit-permission'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { SystemDetailHeader } from './SystemDetailHeader.comp'
import { SystemDetailTabsContainer } from './SystemDetailTabs.cont'

export const SystemDetailViewContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { selectedLeafUid, goBackToLeaves, selectParent, clearSelection } =
        useHierarchyNavigation()
    const { system, minimalSpareParstCount, isLoading, isFetching, error, refetch } =
        useSystemDetail(selectedLeafUid)
    const editPermission = useSystemEditPermission(selectedLeafUid)

    // Selecting a node in the tree only changes the URL/leaf; the detail query keeps
    // refetchOnMount:false (so secondary consumers like PhysicalItemTab stay cache reads).
    // Force a fresh fetch here on every actual leaf change so all fields refill — guard
    // the initial mount, which useSystemDetail's own initial fetch already covers.
    //
    // The !isFetching guard scopes this to the bug we're fixing: a seeded cache (tree /
    // breadcrumb nav) renders with data + refetchOnMount:false, so it is NOT fetching and
    // we kick the refetch. Navigation without a seed (e.g. selectLeaf from spares/graph)
    // has no cached data, so React Query is already fetching the new key — refetching here
    // would only cancel that in-flight request (cancelRefetch defaults true) and restart it.
    const prevLeafUid = useRef(selectedLeafUid)
    useEffect(() => {
        if (selectedLeafUid && selectedLeafUid !== prevLeafUid.current && !isFetching) {
            refetch()
        }
        prevLeafUid.current = selectedLeafUid
    }, [selectedLeafUid, isFetching, refetch])

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
                isRefreshing={isFetching && !isLoading}
                minimalSpareParstCount={minimalSpareParstCount}
            />
            <SystemEditRestrictionBanner
                status={editPermission.status}
                responsibles={editPermission.responsibles}
                refetch={editPermission.refetch}
            />
            <div className="flex-1 min-h-0">
                <SystemDetailTabsContainer system={system} />
            </div>
        </div>
    )
}
