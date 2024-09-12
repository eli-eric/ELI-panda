import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import ModalComponent from '@/components/overlays/modal/modal.comp'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { GraphNode, SystemGraphResponse } from './types'
import { queryFetcher } from '@/utils/fetcher'
import ErrorPage from '@/components/error/ErrorPage'
import { ErrorBoundary } from 'react-error-boundary'

const GraphViewLazy = dynamic(() => import('../d3/graph/GraphView'))

export type RenderStatsProps = {
  open: boolean
  selectedNode: GraphNode | null
}

export const GraphModal = ({ open, setOpen, uid }) => {
  const { data } = useQuery({
    queryKey: ['systemGraph', { uid }],
    queryFn: queryFetcher<SystemGraphResponse>('generalGraph'),
    enabled: open
  })

  console.log(data)

  const renderStats = ({ open, selectedNode }: RenderStatsProps) => {
    if (!open) return null
    return (
      <div className="h-full w-72 border rounded-md pr-4 pl-4">
        {selectedNode?.name}
      </div>
    )
  }

  return (
    <ModalComponent open={open} setOpen={setOpen}>
      <div>
        {data && (
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense>
              <GraphViewLazy data={data} renderStats={renderStats} />
            </Suspense>
          </ErrorBoundary>
        )}
        {!data && <ProgressBarComponent />}
      </div>
    </ModalComponent>
  )
}
