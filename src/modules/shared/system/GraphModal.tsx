import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { queryFetcher } from '@/utils/fetcher'

import { NodeDetails } from '../d3/graph/NodeDetails'
import { NodeFilters } from '../d3/graph/NodeFilters'
import type { RenderStatsProps } from '../d3/graph/types'
import type { SystemGraphResponse } from './types'

const GraphViewLazy = dynamic(() => import('../d3/graph/GraphView'))

interface GraphModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  uid: string
}

export const GraphModal: FC<GraphModalProps> = ({ open, setOpen, uid }) => {
  const [data, setData] = useState<SystemGraphResponse | null>(null)

  const { data: response } = useQuery({
    queryKey: ['systemGraph', { uid }],
    queryFn: queryFetcher<SystemGraphResponse>('generalGraph'),
    enabled: open
  })

  const uniqueRelationships = response?.links.reduce((acc, link) => {
    if (!acc.includes(link.relationship)) {
      acc.push(link.relationship)
    }
    return acc
  }, [] as string[])

  const formMethods = useForm()

  useEffect(() => {
    if (response) {
      setData(response)
      formMethods.reset({
        relationships: uniqueRelationships?.reduce(
          (acc, relationship) => {
            acc[relationship] = true
            return acc
          },
          {} as { [key: string]: boolean }
        )
      })
    }
  }, [response])

  const renderStats = ({ open, selectedNode }: RenderStatsProps) => {
    if (!open || !selectedNode) return null
    return <NodeDetails node={selectedNode} />
  }
  const renderFilter = ({ open }: { open: boolean }) => {
    if (!open) return null
    return (
      <Form formMethods={formMethods} className="col-span-4">
        <NodeFilters
          uid={uid}
          setData={setData}
          relationships={uniqueRelationships}
        />
      </Form>
    )
  }

  return (
    <ModalComponent open={open} setOpen={setOpen}>
      {data && (
        <ErrorBoundary fallback={<ErrorPage />}>
          <Suspense>
            <GraphViewLazy
              data={data}
              renderStats={renderStats}
              renderFilter={renderFilter}
            />
          </Suspense>
        </ErrorBoundary>
      )}
      {!data && <ProgressBarComponent />}
    </ModalComponent>
  )
}
