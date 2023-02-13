import { useRouter } from 'next/router'
import { lazy, Suspense, useMemo } from 'react'
import ProgressBarComponent from 'src/components/ui/progress-bar.comp'
import TreeViewComponent from 'src/components/ui/tree-view/tree-view.cont'
import { ENDPOINTS } from 'src/types/constants/endpoints'
import { SystemDetailInfo, SystemTreeItem } from 'src/types/responses'
import { FormContextProvider } from 'src/store/form.context'
import useSWR from 'swr'

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
    if (!router.query.slug) return systemsList
    const tree = updateTree(systemsList, router.query.slug[0])
    return tree
  }, [systemsList]) //eslint-disable-line

  return (
    <Suspense fallback={<ProgressBarComponent />}>
      <FormContextProvider>
        <div className="flex flex-row">
          {systemsList && (
            <TreeViewComponent
              data={{
                name: 'fake',
                uid: 'fake',
                systemCode: 'fake',
                path: [['sdsd', 'fd']],
                children: systemsList
              }}
            >
              {router.query.slug ? (
                systemDetail ? (
                  <SystemDetailsContainer systemDetail={systemDetail} />
                ) : (
                  <ProgressBarComponent />
                )
              ) : (
                <EmptySectionComponent />
              )}
            </TreeViewComponent>
          )}
        </div>
      </FormContextProvider>
    </Suspense>
  )
}

export default SystemsOverviewContainer
