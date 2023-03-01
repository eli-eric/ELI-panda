import { Suspense, useState } from 'react'
import { Prompt, Results } from './components/Search'
import ViewControl from './components/ViewControl'
import Breadcrumbs from './components/Breadcrumbs'
import ProgressBarComponent from '@/components/progress-bar.comp'
import Card, { Heading } from '@/components/card/card.comp'
import { ErrorBoundary } from 'react-error-boundary'
import Subsystems from './components/Subsystems'
import ErrorPage from '@/components/error/ErrorPage'
import SystemDetailSection from './components/systemDetailSection/SystemDetailSection'
import LoaderComponent from '@/components/loader.comp'
import CatalogueItemSection from './components/catalogueItemSection/CatalogueItemSection.cont'
import RelationsSection from './components/relationsSection/RelationsSection'
import { useSystemEdit } from './hooks/useSystemEdit'
import { useRouter } from 'next/router'
import useParam from '@/hooks/useParam'
import useSWR from 'swr'
import { System } from './types'
import EmptySectionComponent from '@/components/empty-section/empty-section.comp'

interface Props {
  systemDetail?: System
}

const SystemOverviewContainer = ({ systemDetail }: Props) => {
  const [view, setView] = useState<{
    system: boolean
    relations: boolean
    catalogueItem: boolean
  }>({
    system: true,
    relations: true,
    catalogueItem: true
  })

  const router = useRouter()

  const uid = router.query.slug as string
  const [query, setQuery] = useParam('q')

  const { EditButton } = useSystemEdit({ systemDetail: systemDetail })

  return (
    <div className="flex-col">
      <div className="flex flex-wrap w-full">
        <div className="w-full sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <Prompt query={query as string} setQuery={setQuery} />
            </div>
            <ViewControl setView={setView} view={view} />
          </div>
        </div>
      </div>
      <Suspense fallback={<ProgressBarComponent />}>
        <Breadcrumbs path={systemDetail?.path} />
      </Suspense>

      {query && (
        <div className="w-full">
          <Results query={query} />
        </div>
      )}

      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <Card>
            <Heading text="Subsystems" />
            <ErrorBoundary fallback={<ErrorPage />}>
              <Suspense fallback={<ProgressBarComponent />}>
                <Subsystems uid={uid} />
              </Suspense>
            </ErrorBoundary>
          </Card>
        </div>

        {systemDetail ? (
          <div className="col-span-3">
            {view.system && (
              <Card>
                <Heading text="System Detail">
                  <EditButton />
                </Heading>
                <SystemDetailSection data={systemDetail} />
              </Card>
            )}
            {view.catalogueItem && (
              <Card>
                <Heading text="Cataloue Item" />
                <ErrorBoundary fallback={<ErrorPage />}>
                  <Suspense fallback={<LoaderComponent />}>
                    <CatalogueItemSection uid={systemDetail.catalogueUID} />
                  </Suspense>
                </ErrorBoundary>
              </Card>
            )}
            {view.relations && (
              <Card>
                <Heading text="Relations" />
                <ErrorBoundary fallback={<ErrorPage />}>
                  <Suspense fallback={<ProgressBarComponent />}>
                    <RelationsSection
                      uid={systemDetail.uid}
                      systemName={systemDetail.name}
                    />
                  </Suspense>
                </ErrorBoundary>
              </Card>
            )}
          </div>
        ) : (
          <div className="col-span-3">
            <Card>
              <Heading text="No system selected" />
              <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<LoaderComponent />}>
                  <EmptySectionComponent />
                </Suspense>
              </ErrorBoundary>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default SystemOverviewContainer
