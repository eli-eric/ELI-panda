import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useSystemLeaves } from '../../hooks/queries/useSystemLeaves'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { SystemDetailViewContainer } from '../detail/SystemDetailView.cont'
import { LeavesPanelHeader } from './LeavesPanelHeader.comp'
import { LeavesTableComponent } from './LeavesTable.comp'

export const LeavesPanelContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { selectedParentUid, selectedLeafUid, selectLeaf } = useHierarchyNavigation()
    const { system: parentSystem, isLoading: isParentLoading } = useSystemDetail(selectedParentUid)
    const { leaves, totalCount, isLoading } = useSystemLeaves(selectedParentUid)

    const handleViewParentDetail = useCallback(() => {
        if (selectedParentUid) {
            selectLeaf(selectedParentUid)
        }
    }, [selectedParentUid, selectLeaf])

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
            <div className="flex flex-col h-full overflow-hidden">
                <LeavesPanelHeader
                    parentName={parentSystem?.name ?? null}
                    parentSystemCode={parentSystem?.systemCode ?? null}
                    parentSystemType={parentSystem?.systemType?.name ?? null}
                    totalCount={0}
                    isLoading={isParentLoading}
                    onViewParentDetail={handleViewParentDetail}
                />
                <div className="flex items-center justify-center flex-1 text-muted-foreground text-sm">
                    {fm({ id: message.systemHierarchy.leaves.noLeaves })}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <LeavesPanelHeader
                parentName={parentSystem?.name ?? null}
                parentSystemCode={parentSystem?.systemCode ?? null}
                parentSystemType={parentSystem?.systemType?.name ?? null}
                totalCount={totalCount}
                isLoading={isParentLoading}
                onViewParentDetail={handleViewParentDetail}
            />
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
