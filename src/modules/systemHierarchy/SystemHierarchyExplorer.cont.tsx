import type { FC } from 'react'

import { useSystemDetail } from '@/modules/shared/system/system-detail'

import { HierarchyLayoutContainer } from './components/layout/HierarchyLayout.cont'
import { LeavesPanelContainer } from './components/leaves/LeavesPanel.cont'
import { HierarchyDetailSidebar } from './components/sidebar/HierarchyDetailSidebar.comp'
import { SystemTreeContainer } from './components/tree/SystemTree.cont'
import { useHierarchyDeepLinkResolver } from './hooks/useHierarchyDeepLinkResolver'
import { useHierarchyNavigation } from './hooks/useHierarchyNavigation'

const SystemHierarchyExplorerContainer: FC = () => {
    const { selectedLeafUid } = useHierarchyNavigation()
    const { system } = useSystemDetail(selectedLeafUid)
    useHierarchyDeepLinkResolver()

    return (
        <HierarchyLayoutContainer
            tree={<SystemTreeContainer />}
            middle={<LeavesPanelContainer />}
            sidebar={selectedLeafUid ? <HierarchyDetailSidebar system={system} /> : undefined}
        />
    )
}

export default SystemHierarchyExplorerContainer
