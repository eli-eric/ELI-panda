import ProgressBarComponent from 'core/components/ui/progress-bar.comp'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { SystemDetailInfo, SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'
import { lazy, Suspense, useMemo } from 'react'
import useSWR from 'swr'

import { FormContextProvider } from '../../../store/form.context'
import SystemDetailsContainer from './details/system-details.cont'
import EmptySectionComponent from './empty-section/empty-section.comp'
import { updateTree } from './helpers/updateTree'

const SystemTreeComponent = lazy(() => import('./systems-tree/systems-treeview.comp'))

const SystemsOverviewContainer = () => {
  const router = useRouter()
  const { data: systemsList } = useSWR<Array<SystemTreeItem>>(ENDPOINTS.systemTree)
  const { data: systemDetail } = useSWR<SystemDetailInfo>(
    router.query.slug ? ENDPOINTS.systemDetail + '/' + router.query.slug : null
  )
  const tree = useMemo(() => {
    if (router.query.slug?.length === 0 || !router.query.slug) return systemsList
    const tree = updateTree(systemsList, router.query.slug[0])
    return tree
  }, [systemsList]) //eslint-disable-line

  return (
    <Suspense fallback={<ProgressBarComponent />}>
      <FormContextProvider>
        <div className="flex flex-row">
          {tree && <SystemTreeComponent tree={tree} />}
          {router.query.slug ? (
            systemDetail ? (
              <SystemDetailsContainer systemDetail={systemDetail} />
            ) : (
              <ProgressBarComponent />
            )
          ) : (
            <EmptySectionComponent />
          )}
        </div>
      </FormContextProvider>
    </Suspense>
  )
}

export default SystemsOverviewContainer
