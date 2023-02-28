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
import Title from '@/modules/systems/Title'
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
    catalogueUID: faker.datatype.uuid(),
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
  const { AddButton, EditButton } = useSystemEdit({ systemDetail: data })
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

      <div className="p-4 lg:p-8 flex flex-wrap">
        <Suspense fallback={<ProgressBarComponent />}>
          <Breadcrumbs path={data.path} />
        </Suspense>

        <div className="lg:px-3 flex flex-wrap w-full justify-between gap-4">
          <Title data={data} />
          <ViewControl setView={setView} view={view} />
          <div className="w-96">
            <Prompt query={query as string} setQuery={setQuery} />
          </div>
        </div>

        {query && (
          <div className="w-full">
            <Results query={query} />
          </div>
        )}

        <aside className="w-full lg:w-1/4">
          <Card>
            <Heading text="Subsystems">
              <AddButton />
            </Heading>
            <ErrorBoundary fallback={<ErrorPage />}>
              <Suspense fallback={<ProgressBarComponent />}>
                <Subsystems uid={uid} />
              </Suspense>
            </ErrorBoundary>
          </Card>
        </aside>

        <main className={`w-full lg:w-3/4`}>
          {view.system && (
            <Card>
              <Heading text="Detail">
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
        </main>
      </div>
    </Fragment>
  )
}

export default SystemDetailPage
