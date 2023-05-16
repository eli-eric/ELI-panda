import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Suspense, useMemo, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Button } from '@/components/Buttons'
import Card, { Heading } from '@/components/card/card.comp'
import EmptySectionComponent from '@/components/empty-section/empty-section.comp'
import ErrorPage from '@/components/error/ErrorPage'
import FileManager from '@/components/fileManager/FileManager'
import LoaderComponent from '@/components/loader.comp'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useSearch } from '@/hooks/table/useSearch'
import { FILE_TYPE } from '@/types/constants/files'

import Breadcrumbs from './components/Breadcrumbs'
import Results from './components/search/Results'
import CatalogueItemSection from './components/sections/catalogueItemSection/CatalogueItemSection'
import RelationsSection from './components/sections/relationsSection/RelationsSection'
import SystemDetailSection from './components/sections/systemDetailSection/SystemDetailSection'
import Subsystems from './components/Subsystems'
import ViewControl from './components/ViewControl'
import { useSystemEdit } from './hooks/useSystemEdit'
import type { SystemDetailResponse } from './types/responses'

interface Props {
  systemDetail?: SystemDetailResponse
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
  const [subsystemsExpanded, setSubsystemsExpanded] = useState(true)

  const router = useRouter()

  const uid = router.query.uid as string
  const { renderSearchBar, searchValue } = useSearch({
    renderEnd: () => <ViewControl setView={setView} view={view} />
  })

  const { getEditButton, getAddButton } = useSystemEdit({ systemDetail: systemDetail })

  const parentPath = useMemo(() => {
    if (!systemDetail) return undefined
    const basePath = { uid: systemDetail.uid, name: systemDetail.name }
    if (!systemDetail.parentPath) return [basePath]
    return [...systemDetail.parentPath, basePath]
  }, [systemDetail])

  return (
    <div className="flex-col">
      {renderSearchBar()}
      <Breadcrumbs parentPath={parentPath} />

      <Results searchValue={searchValue} />

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
        <div className="col-span-1">
          <Card>
            <Heading text={uid ? 'Subsystems' : 'Root systems'}>
              <div className="flex">
                {getAddButton()}
                <Button className="flex lg:hidden ml-2" onClick={() => setSubsystemsExpanded(!subsystemsExpanded)}>
                  <ChevronDownIcon className={`h-5 w-5 ${subsystemsExpanded ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </Heading>
            <ErrorBoundary fallback={<ErrorPage />}>
              <Suspense fallback={<ProgressBarComponent />}>
                <div className={`${subsystemsExpanded ? 'block' : 'hidden'} lg:flex`}>
                  <Subsystems uid={uid} />
                </div>
              </Suspense>
            </ErrorBoundary>
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-2 xl:col-span-3">
          {systemDetail ? (
            <>
              {view.system && (
                <Card>
                  <Heading text={'System detail - ' + systemDetail.name}>{getEditButton()}</Heading>
                  <SystemDetailSection data={systemDetail} />
                </Card>
              )}
              {view.catalogueItem && (
                <Card>
                  <Heading text="Cataloue Item" />
                  <ErrorBoundary fallback={<ErrorPage />}>
                    <Suspense fallback={<LoaderComponent />}>
                      <CatalogueItemSection uid={systemDetail.itemUID} />
                    </Suspense>
                  </ErrorBoundary>
                </Card>
              )}
              {view.relations && (
                <Card>
                  <Heading text="Relations" />
                  <ErrorBoundary fallback={<ErrorPage />}>
                    <Suspense fallback={<ProgressBarComponent />}>
                      <RelationsSection uid={systemDetail.uid} systemName={systemDetail.name} />
                    </Suspense>
                  </ErrorBoundary>
                </Card>
              )}
              <Card>
                <Heading text="Files" />
                <ErrorBoundary fallback={<ErrorPage />}>
                  <Suspense fallback={<ProgressBarComponent />}>
                    <FileManager itemType={FILE_TYPE.SYSTEM} uid={uid} />
                  </Suspense>
                </ErrorBoundary>
              </Card>
            </>
          ) : (
            <Card>
              <Heading text="No system selected" />
              <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<LoaderComponent />}>
                  <EmptySectionComponent />
                </Suspense>
              </ErrorBoundary>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default SystemOverviewContainer
