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
  const [searchSystem, setSearchSystem] = useState<string>()

  const { data: systemsList } = useSWR<Array<SystemTreeItem>>(BASE_URL + '/systems/tree')
  const { openTree, selectedSystem } = useSelectedSystem(searchSystem, systemsList)

  const { data: systemDetail } = useSWR<SystemDetailInfo>(
    selectedSystem ? BASE_URL + ENDPOINTS.systemDetail + '/' + selectedSystem.uid : null
  )

  const setSelectedSystemHandler = (systemName: string) => {
    setSearchSystem(systemName)
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col  min-w-[256px]">
        <div className=" overflow-y-auto h-[100vh] border-r bg-white pt-5">
          <div className="mt-5 flex flex-1 flex-col">
            <nav className="flex-1 space-y-1 px-2 pb-4">
              {systemsList && (
                <SystemTreeComponent
                  systemsList={systemsList}
                  setSelectedSystem={setSelectedSystemHandler}
                  selectedSystem={selectedSystem}
                  openTree={openTree}
                />
              )}
            </nav>
          </div>
        </div>
      </div>
      {selectedSystem ? (
        systemDetail && <SystemDetailsContainer selectedSystem={selectedSystem} systemDetail={systemDetail} />
      ) : (
        <EmptySectionComponent />
      )}
    </div>
  )
}

export default SystemsOverviewContainer
