import useAxios from 'core/helpers/use-axios'
import { BASE_URL } from 'core/types/constants/common'
import { AXIOS_METHOD, ENDPOINTS } from 'core/types/constants/endpoints'
import { SystemDetailInfo, SystemInfo, SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import SystemDetailsContainer from './details/system-details.cont'
import EmptySectionComponent from './empty-section/empty-section.comp'
import { useSelectedSystem } from './helpers/hooks/useSelectedSystem'
import SystemTreeComponent from './systems-tree/systems-treeview.comp'

const SystemsOverviewContainer = () => {
  const [selectedSystemCode, setSelectedSystemCode] = useState<string>()
  const [axiosMethod, setAxiosMethod] = useState<AXIOS_METHOD>(AXIOS_METHOD.GET)

  const router = useRouter()

  const { data: systemsList, mutate: systemListMutate } = useSWR<Array<SystemTreeItem>>(BASE_URL + '/systems/tree')
  const { copiedTree, selectedSystem } = useSelectedSystem(selectedSystemCode, systemsList)

  const { data: systemDetail, mutate: systemDetailMutate } = useSWR<SystemDetailInfo>(
    selectedSystem ? BASE_URL + ENDPOINTS.systemDetail + '/' + selectedSystem.uid : null
  )
  const [formData, setFormData] = useState<SystemInfo | undefined | {}>() // state to store form data

  const { loading, fetchData } = useAxios({
    url: BASE_URL + ENDPOINTS.systemDetail + '/' + router.query.uid || (selectedSystem?.uid ? selectedSystem.uid : ''),
    method: axiosMethod,
    body: formData
  })

  useEffect(() => {
    setFormData(systemDetail?.systemInfo)
  }, [systemDetail])

  return (
    <div className="flex flex-row">
      {copiedTree && (
        <SystemTreeComponent
          systemsList={copiedTree}
          setSelectedSystemCode={setSelectedSystemCode}
          selectedSystem={selectedSystem}
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
