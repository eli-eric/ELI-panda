import { faker } from '@faker-js/faker'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import useSWR from 'swr/immutable'

import Card, { Heading } from '@/components/card/card.comp'
import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import ProgressBarComponent from '@/components/progress-bar.comp'
import useParam from '@/hooks/useParam'
import Breadcrumbs from '@/modules/systems/Breadcrumbs'
import CatalogueItemSection from '@/modules/systems/catalogueItemSection/CatalogueItemSection.cont'
import { useSystemEdit } from '@/modules/systems/hooks/useSystemEdit'
import RelationsSection from '@/modules/systems/relationsSection/RelationsSection'
import { Prompt, Results } from '@/modules/systems/Search'
import Subsystems from '@/modules/systems/Subsystems'
import SystemDetail from '@/modules/systems/systemDetailSection/Detail'
import { System } from '@/modules/systems/types'
import ViewControl from '@/modules/systems/ViewControl'

const getFakeName = () => faker.company.catchPhrase()

const getFakePath = (): string[] => {
  const length = faker.datatype.number({ min: 0, max: 10 })
  return [...Array(length)].map(() => faker.datatype.uuid())
}

export const getFakeSystem = (): System => {
  const uid = faker.datatype.uuid()
  const name = getFakeName()
  return {
    uid,
    name,
    path: getFakePath(),
    image: 'https://source.unsplash.com/collection/71371194/500x500',
    description: `${faker.commerce.productDescription()} ${faker.lorem.paragraphs(
      2
    )}`,
    children: getFakePath(),
    importanceCode: faker.datatype.string(),
    zoneCode: faker.datatype.string(),
    subZoneCode: faker.datatype.string(),
    systemCode: faker.datatype.string(),
    systemAlias: faker.datatype.string(),
    locationCode: faker.datatype.string(),
    ownerUID: faker.datatype.string(),
    catalogueUID: undefined,
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchFakeSystem = async () => {
  await sleep(faker.datatype.number({ min: 200, max: 500 }))
  return getFakeSystem()
}
export const fetchFakeSystems = async () => {
  const res = [...Array(faker.datatype.number({ min: 0, max: 5 }))]
  await sleep(faker.datatype.number({ min: 200, max: 500 }))
  return res.map(() => getFakeSystem())
}

const SystemDetailPage: NextPage = () => {
  const router = useRouter()
  const uid = router.query.slug as string
  const [query, setQuery] = useParam('q')

  const { data } = useSWR(uid, fetchFakeSystem)
  const { EditButton } = useSystemEdit({ systemDetail: data })
  const [view, setView] = useState<{
    system: boolean
    relations: boolean
    catalogueItem: boolean
  }>({
    system: true,
    relations: true,
    catalogueItem: true,
  })

  if (!data) return <LoaderComponent />
  return (
    <Fragment>
      <Head>
        <title>{data.name}</title>
      </Head>
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
          <Breadcrumbs path={data.path} />
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

          <div className="col-span-3">
            {view.system && (
              <Card>
                <Heading text="System Detail">
                  <EditButton />
                </Heading>
                <SystemDetail data={data} />
              </Card>
            )}
            {view.catalogueItem && (
              <Card>
                <Heading text="Cataloue Item" />
                <ErrorBoundary fallback={<ErrorPage />}>
                  <Suspense fallback={<LoaderComponent />}>
                    <CatalogueItemSection uid={data.catalogueUID} />
                  </Suspense>
                </ErrorBoundary>
              </Card>
            )}
            {view.relations && (
              <Card>
                <Heading text="Relations" />
                <ErrorBoundary fallback={<ErrorPage />}>
                  <Suspense fallback={<ProgressBarComponent />}>
                    <RelationsSection uid={data.uid} systemName={data.name} />
                  </Suspense>
                </ErrorBoundary>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SystemDetailPage
