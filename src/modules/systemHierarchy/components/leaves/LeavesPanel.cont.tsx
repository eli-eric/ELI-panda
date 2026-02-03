import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { useSystemLeaves } from '../../hooks/queries/useSystemLeaves'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { SystemDetailViewContainer } from '../detail/SystemDetailView.cont'
import { LeavesTableComponent } from './LeavesTable.comp'

export const LeavesPanelContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { selectedParentUid, selectedLeafUid, selectLeaf } = useHierarchyNavigation()
    const { leaves, totalCount, isLoading } = useSystemLeaves(selectedParentUid)

    if (selectedLeafUid) {
        return <SystemDetailViewContainer />
    }

    if (!selectedParentUid) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                {fm({ id: message.systemHierarchy.leaves.selectParent })}
            </div>
        )
    }

    if (!isLoading && leaves.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                {fm({ id: message.systemHierarchy.leaves.noLeaves })}
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="border-b border-border px-4 py-2">
                <h2 className="text-sm font-semibold">
                    {fm({ id: message.systemHierarchy.leaves.title })}
                    {totalCount > 0 && (
                        <span className="ml-2 text-muted-foreground font-normal">
                            ({totalCount})
                        </span>
                    )}
                </h2>
            </div>
            <div className="flex-1 overflow-hidden">
                <LeavesTableComponent
                    data={leaves}
                    totalCount={totalCount}
                    isLoading={isLoading}
                    onRowClick={selectLeaf}
                />
            </div>
        </div>
    )
}
