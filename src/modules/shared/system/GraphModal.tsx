import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { queryFetcher } from '@/utils/fetcher'

import { NodeDetails } from '../d3/graph/NodeDetails'
import { NodeFilters } from '../d3/graph/NodeFilters'
import type { RenderStatsProps } from '../d3/graph/types'
import type { SystemGraphResponse } from './types'

const GraphViewLazy = dynamic(() => import('../d3/graph/GraphView'))

interface GraphModalProps {
  uid: string
}

/**
 * Opens a system graph modal in the global modal system
 */
export function openGraphModal(uid: string) {
  if (typeof window === 'undefined') return // Prevent SSR execution
  
  const { openModal } = useModalGlobalStore.getState()

  openModal('dialog1', {
    component: () => <GraphModalContent uid={uid} />,
    props: {
      title: 'System Graph',
      size: 'xl'
    }
  })
}

export const GraphModalContent: FC<GraphModalProps> = ({ uid }) => {
  const [data, setData] = useState<SystemGraphResponse | undefined>(undefined)

  const { data: response } = useQuery({
    queryKey: ['systemGraph', { uid }],
    queryFn: queryFetcher<SystemGraphResponse>('generalGraph'),
    enabled: !!uid
  })

  const uniqueRelationships = response?.links.reduce((acc, link) => {
    if (!acc.includes(link.relationship)) {
      acc.push(link.relationship)
    }
    return acc
  }, [] as string[])

  const formMethods = useForm()

  useEffect(() => {
    if (response && uniqueRelationships) {
      const defaultRelationships = uniqueRelationships?.reduce(
        (acc, relationship) => {
          if (
            relationship === 'WAS_UPDATED_BY' ||
            relationship === 'WAS_MOVED_FROM'
          ) {
            acc[relationship] = false
          } else {
            acc[relationship] = true
          }

          return acc
        },
        {} as { [key: string]: boolean }
      )

      const filteredLinks = response.links.filter(
        link => defaultRelationships[link.relationship]
      )

      const filteredNodes = response.nodes.filter(node =>
        filteredLinks.some(
          link => link.source === node.uid || link.target === node.uid
        )
      )

      const newResponse = {
        nodes: filteredNodes,
        links: filteredLinks
      }

      setData(newResponse)
      formMethods.reset({
        relationships: defaultRelationships
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>
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
    </>
  )
}
