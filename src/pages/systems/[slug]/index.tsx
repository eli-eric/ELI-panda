import { faker } from '@faker-js/faker'
import { PlusIcon } from '@heroicons/react/20/solid'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import useSWR from 'swr/immutable'

import ErrorPage from '@/components/shared/error/ErrorPage'
import Breadcrumbs from '@/components/systems/Breadcrumbs'
import CatalogueItemSection from '@/components/systems/catalogueItemSection/CatalogueItemSection.cont'
import Description from '@/components/systems/Description'
import SystemDetail from '@/components/systems/Detail'
import Edit from '@/components/systems/Edit'
import Preview from '@/components/systems/Preview'
import RelationsSection from '@/components/systems/relationsSection/RelationsSection'
import { Prompt, Results } from '@/components/systems/Search'
import Subsystems from '@/components/systems/Subsystems'
import Title from '@/components/systems/Title'
import ViewControl from '@/components/systems/ViewControl'
import Card, { Heading } from '@/components/shared/card/card.comp'
import LoaderComponent from '@/components/shared/loader.comp'
import ModalComponent from '@/components/shared/modal/modal.comp'
import ProgressBarComponent from '@/components/shared/progress-bar.comp'
import useParam from '@/hooks/useParam'
import { System } from '@/types/system'

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
      5
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
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return getFakeSystem()
}
export const fetchFakeSystems = async () => {
  const res = [...Array(faker.datatype.number({ min: 0, max: 5 }))]
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return res.map(() => getFakeSystem())
}

const empty = {
  name: '',
  description: '',
  systemCode: '',
  systemAlias: '',
  locationCode: '',
  catalogueUID: '',
  importanceCode: '',
  systemTypeUID: '',
  ownerUID: '',
  zoneCode: '',
  subZoneCode: '',
}

const Page: NextPage = () => {
  const router = useRouter()
  const uid = router.query.slug
  const [query, setQuery] = useParam('q')

  const { data } = useSWR(uid, fetchFakeSystem)
  const [view, setView] = useState<{
    system: boolean
    relations: boolean
    catalogueItem: boolean
  }>({
    system: true,
    relations: true,
    catalogueItem: true,
  })

  const [isEditing, setIsEditing] = useState('')

  const onSubmitEdit = (data: System) => {
    console.log(data)
    setIsEditing('')
  }

  const onSubmitNew = (data: System) => {
    console.log(data)
    setIsEditing('')
  }

  if (!data) return <LoaderComponent />
  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="p-4 lg:p-8 flex flex-wrap">
        <nav className="p-1 lg:p-2 w-full">
          <Suspense
            fallback={
              <div className="py-3">
                <ProgressBarComponent />
              </div>
            }
          >
            <Breadcrumbs path={data.path} />
          </Suspense>
        </nav>

        <div className="lg:px-3 flex flex-wrap w-full justify-between gap-4">
          <Title data={data} />
          <div className="-mt-2">
            <ViewControl setView={setView} view={view} />
          </div>
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
            <Heading
              action={{
                label: <PlusIcon className="h-5" />,
                onClick: () => setIsEditing('new'),
              }}
            >
              Subsystems
            </Heading>

            <Suspense fallback={<ProgressBarComponent />}>
              <nav aria-label="Subsystems">
                <Subsystems ids={data.children} />
              </nav>
            </Suspense>
          </Card>
        </aside>

        <main className={`w-full lg:w-3/4`}>
          {view.system && (
            <Card>
              <Heading
                action={{
                  label: <PencilSquareIcon className="h-6" />,
                  onClick: () => setIsEditing('current'),
                }}
              >
                Detail
              </Heading>

              <div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-4">
                <section>
                  <Preview image={data.image} alt={data.name} />
                </section>

                <section>
                  <SystemDetail data={data} />
                  <Description data={data} />
                </section>
              </div>
            </Card>
          )}

          {view.catalogueItem && (
            <Card>
              <Heading>Cataloue Item</Heading>
              <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<LoaderComponent />}>
                  <CatalogueItemSection uid={data.catalogueUID} />
                </Suspense>
              </ErrorBoundary>
            </Card>
          )}

          {view.relations && (
            <Card>
              <Heading>Relations</Heading>
              <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<ProgressBarComponent />}>
                  <RelationsSection uid={data.uid} systemName={data.name} />
                </Suspense>
              </ErrorBoundary>
            </Card>
          )}

          <ModalComponent
            buttons={{ noButtons: true }}
            open={!!isEditing}
            setOpen={() => {
              setIsEditing('')
            }}
          >
            <Edit
              onSubmit={isEditing === 'current' ? onSubmitEdit : onSubmitNew}
              data={isEditing === 'current' ? data : undefined}
              setIsEditing={setIsEditing}
            />
          </ModalComponent>
        </main>
      </div>
    </>
  )
}

export default Page
