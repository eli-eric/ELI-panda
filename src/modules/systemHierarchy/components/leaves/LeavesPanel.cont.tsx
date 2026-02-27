import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useSystemLeaves } from '../../hooks/queries/useSystemLeaves'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { HIERARCHY_VIEWS } from '../../types/constants'
import { SystemDetailViewContainer } from '../detail/SystemDetailView.cont'
import { RelationshipGraphContainer } from '../graph/RelationshipGraph.cont'
import { LeavesPanelHeader } from './LeavesPanelHeader.comp'
import { LeavesTableComponent } from './LeavesTable.comp'

export const LeavesPanelContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { selectedParentUid, selectedLeafUid, selectLeaf, activeView, setActiveView } =
        useHierarchyNavigation()
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
            <div
                className="flex items-center justify-center h-full text-muted-foreground text-sm"
                data-testid="system-hierarchy-empty-state"
            >
                {fm({ id: message.systemHierarchy.leaves.selectParent })}
            </div>
        )
    }

    const header = (
        <LeavesPanelHeader
            parentName={parentSystem?.name ?? null}
            parentSystemCode={parentSystem?.systemCode ?? null}
            parentSystemType={parentSystem?.systemType?.name ?? null}
            totalCount={totalCount}
            isLoading={isParentLoading}
            onViewParentDetail={handleViewParentDetail}
            activeView={activeView}
            onViewChange={setActiveView}
        />
    )

    if (activeView === HIERARCHY_VIEWS.GRAPH) {
        return (
            <div
                className="flex flex-col h-full overflow-hidden"
                data-testid="system-hierarchy-leaves-panel"
            >
                {header}
                <div className="flex-1 min-h-0 overflow-hidden">
                    <RelationshipGraphContainer />
                </div>
            </div>
        )
    }

    if (!isLoading && leaves.length === 0) {
        return (
            <div
                className="flex flex-col h-full overflow-hidden"
                data-testid="system-hierarchy-leaves-panel"
            >
                {header}
                <div className="flex items-center justify-center flex-1 text-muted-foreground text-sm">
                    {fm({ id: message.systemHierarchy.leaves.noLeaves })}
                </div>
            </div>
        )
    }

    return (
        <div
            className="flex flex-col h-full overflow-hidden"
            data-testid="system-hierarchy-leaves-panel"
        >
            {header}
            <div className="flex-1 min-h-0 overflow-hidden">
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
