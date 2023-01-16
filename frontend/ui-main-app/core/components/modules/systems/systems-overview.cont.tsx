import { BASE_URL } from 'core/types/constants/common'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { SystemDetailInfo, SystemTreeItem } from 'core/types/responses'
import { useState } from 'react'
import useSWR from 'swr'

import SystemDetailsContainer from './details/system-details.cont'
import EmptySectionComponent from './empty-section/empty-section.comp'
import { useSelectedSystem } from './helpers/hooks/useSelectedSystem'
import SystemTreeComponent from './systems-tree/systems-treeview.comp'

const SystemsOverviewContainer = () => {
  const [selectedSystemCode, setSelectedSystemCode] = useState<string>()

  const { data: systemsList } = useSWR<Array<SystemTreeItem>>(BASE_URL + '/systems/tree')
  const { openTree, selectedSystem } = useSelectedSystem(selectedSystemCode, systemsList)

  const { data: systemDetail } = useSWR<SystemDetailInfo>(
    selectedSystem ? BASE_URL + ENDPOINTS.systemDetail + '/' + selectedSystem.uid : null
  )

  return (
    <div className="flex flex-row">
      {systemsList && (
        <SystemTreeComponent
          systemsList={systemsList}
          setSelectedSystemCode={setSelectedSystemCode}
          selectedSystem={selectedSystem}
          openTree={openTree}
        />
      )}

      {selectedSystem ? (
        systemDetail && <SystemDetailsContainer selectedSystem={selectedSystem} systemDetail={systemDetail} />
      ) : (
        <EmptySectionComponent />
      )}
    </div>
  )
}

export default SystemsOverviewContainer
