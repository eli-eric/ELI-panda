import type { FC } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { SystemDetailHeader } from './SystemDetailHeader.comp'
import { SystemDetailTabsContainer } from './SystemDetailTabs.cont'

export const SystemDetailViewContainer: FC = () => {
    const { selectedLeafUid, goBackToLeaves } = useHierarchyNavigation()
    const { system, isLoading } = useSystemDetail(selectedLeafUid)

    if (isLoading || !system) {
        return (
            <div className="flex flex-col h-full">
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

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <SystemDetailHeader system={system} onBack={goBackToLeaves} />
            <div className="flex-1 min-h-0">
                <SystemDetailTabsContainer system={system} />
            </div>
        </div>
    )
}
