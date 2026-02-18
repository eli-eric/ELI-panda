import type { FC } from 'react'

import { HierarchyLayoutContainer } from './components/layout/HierarchyLayout.cont'
import { LeavesPanelContainer } from './components/leaves/LeavesPanel.cont'
import { QuickInfoSidebar } from './components/sidebar/QuickInfoSidebar.comp'
import { SystemTreeContainer } from './components/tree/SystemTree.cont'
import { useSystemDetail } from './hooks/queries/useSystemDetail'
import { useHierarchyNavigation } from './hooks/useHierarchyNavigation'

const SystemHierarchyExplorerContainer: FC = () => {
    const { selectedLeafUid } = useHierarchyNavigation()
    const { system } = useSystemDetail(selectedLeafUid)

    return (
        <HierarchyLayoutContainer
            tree={<SystemTreeContainer />}
            middle={<LeavesPanelContainer />}
            sidebar={selectedLeafUid ? <QuickInfoSidebar system={system} /> : undefined}
        />
    )
}

export default SystemHierarchyExplorerContainer
