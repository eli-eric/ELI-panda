import { BASE_URL } from 'core/types/constants/common'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { SystemDetailInfo, SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import SystemDetailsContainer from './details/system-details.cont'
import EmptySectionComponent from './empty-section/empty-section.comp'
import { useTreeUpdate } from './helpers/hooks/useTreeUpdate'
import SystemTreeComponent from './systems-tree/systems-treeview.comp'

const SystemsOverviewContainer = () => {
  const router = useRouter()
  const { data: systemsList, mutate: systemListMutate } = useSWR<Array<SystemTreeItem>>(BASE_URL + '/systems/tree')
  const { data: systemDetail, mutate: systemDetailMutate } = useSWR<SystemDetailInfo>(
    router.query.uid ? BASE_URL + ENDPOINTS.systemDetail + '/' + router.query.uid : null
  )
  const treeCopy = useTreeUpdate(systemsList)

  return (
    <div className="flex flex-row">
      {treeCopy && <SystemTreeComponent systemsList={treeCopy} />}
      {router.query.uid ? (
        systemDetail && <SystemDetailsContainer systemDetail={systemDetail} />
      ) : (
        <EmptySectionComponent />
      )}
    </div>
  )
}

export default SystemsOverviewContainer
