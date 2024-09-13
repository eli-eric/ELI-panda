import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { queryFetcher } from '@/utils/fetcher'

import type { RenderStatsProps } from '../d3/graph/types'
import type { SystemGraphResponse } from './types'

const GraphViewLazy = dynamic(() => import('../d3/graph/GraphView'))

interface GraphModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  uid: string
}

export const GraphModal: FC<GraphModalProps> = ({ open, setOpen, uid }) => {
  const { data } = useQuery({
    queryKey: ['systemGraph', { uid }],
    queryFn: queryFetcher<SystemGraphResponse>('generalGraph'),
    enabled: open
  })

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
