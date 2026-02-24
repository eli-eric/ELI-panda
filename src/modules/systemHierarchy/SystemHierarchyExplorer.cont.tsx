import type { FC } from 'react'

import { RelationshipGraphContainer } from './components/graph/RelationshipGraph.cont'
import { ViewSwitcher } from './components/graph/ViewSwitcher.comp'
import { HierarchyLayoutContainer } from './components/layout/HierarchyLayout.cont'
import { LeavesPanelContainer } from './components/leaves/LeavesPanel.cont'
import { QuickInfoSidebar } from './components/sidebar/QuickInfoSidebar.comp'
import { SystemTreeContainer } from './components/tree/SystemTree.cont'
import { useSystemDetail } from './hooks/queries/useSystemDetail'
import { useHierarchyNavigation } from './hooks/useHierarchyNavigation'
import { HIERARCHY_VIEWS } from './types/constants'

const SystemHierarchyExplorerContainer: FC = () => {
    const { selectedLeafUid, activeView, setActiveView } = useHierarchyNavigation()
    const { system } = useSystemDetail(selectedLeafUid)

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0">
                <ViewSwitcher activeView={activeView} onViewChange={setActiveView} />
            </div>
            {activeView === HIERARCHY_VIEWS.GRAPH ? (
                <div className="flex-1 overflow-hidden">
                    <RelationshipGraphContainer />
                </div>
            ) : (
                <div className="flex-1 overflow-hidden">
                    <HierarchyLayoutContainer
                        tree={<SystemTreeContainer />}
                        middle={<LeavesPanelContainer />}
                        sidebar={
                            selectedLeafUid ? <QuickInfoSidebar system={system} /> : undefined
                        }
                    />
                </div>
            )}
        </div>
    )
}

export default SystemHierarchyExplorerContainer
