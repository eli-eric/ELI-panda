import { faker } from '@faker-js/faker'
import { PlusIcon } from '@heroicons/react/20/solid'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import useSWR from 'swr/immutable'

import ItemDetailComponent from '@/components/catalogueItem/item-detail.comp'
import ErrorPage from '@/components/error/ErrorPage'
import Breadcrumbs from '@/components/systems/Breadcrumbs'
import Card from '@/components/systems/Card'
import Description from '@/components/systems/Description'
import SystemDetail from '@/components/systems/Detail'
import FormButtons from '@/components/systems/FormButtons'
import Preview from '@/components/systems/Preview'
import Relations from '@/components/systems/relations/Relations'
import { Prompt, Results } from '@/components/systems/Search'
import Subsystems from '@/components/systems/Subsystems'
import Title from '@/components/systems/Title'
import ViewControl from '@/components/systems/ViewControl'
import { Heading } from '@/components/ui/card/card.comp'
import LoaderComponent from '@/components/ui/loader.comp'
import ProgressBarComponent from '@/components/ui/progress-bar.comp'
import useEditMode from '@/hooks/systems/useEditMode'
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
      5,
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
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return getFakeSystem()
}
export const fetchFakeSystems = async () => {
  const res = [...Array(faker.datatype.number({ min: 0, max: 20 }))]
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return res.map(() => getFakeSystem())
}

const onSubmit = (data: System) => {
  console.log(data)
}

const Page: NextPage = () => {
  const router = useRouter()
  const uid = router.query.slug
  const [query, setQuery] = useParam('q')

  const { data } = useSWR(uid, fetchFakeSystem)
  const [viewControl, setViewControl] = useState<{
    system: boolean
    relations: boolean
    catalogueItem: boolean | undefined
  }>({
    system: true,
    relations: true,
    catalogueItem: true,
  })

  useEffect(() => {
    if (data)
      setViewControl(prev => ({
        ...prev,
        catalogueItem: data.catalogueUID ? true : undefined,
      }))
  }, [data])

  const {
    isEditMode,
    setIsEditMode,
    newImage,
    setNewImage,
    FormErrors,
    EditModeContainer,
    register,
    discard,
  } = useEditMode(onSubmit, data)

  if (!data) return <LoaderComponent />

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <EditModeContainer>
        <div className="p-2 lg:p-4 flex flex-wrap">
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

          <div className="w-full">
            <FormErrors />
          </div>

          <div className="lg:px-3 flex flex-wrap w-full justify-between gap-4">
            <Title data={data} isEditMode={isEditMode} register={register} />

            {isEditMode || (
              <Prompt query={query as string} setQuery={setQuery} />
            )}
            <FormButtons
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              discard={discard}
            />
          </div>

          {isEditMode ||
            (query && (
              <div className="w-full">
                <Results query={query} />
              </div>
            ))}

          <div className="w-full">
            <ViewControl
              setViewControl={setViewControl}
              viewControl={viewControl}
            />
          </div>

          <aside className="w-full lg:w-1/4">
            <Card>
              <Heading
                text="Subsystems"
                action={{
                  label: <PlusIcon className="h-5" />,
                  href: router.asPath.split('?')[0] + '/new',
                }}
              />
              <Suspense fallback={<ProgressBarComponent />}>
                <nav aria-label="Subsystems">
                  <Subsystems ids={data.children} />
                </nav>
              </Suspense>
            </Card>
          </aside>

          <main className={`p-1 lg:p-2 w-full lg:w-3/4`}>
            {viewControl.system && (
              <article>
                <Card>
                  <Heading text="Detail" />
                  <div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-4">
                    <section>
                      <Preview
                        image={data.image}
                        alt={data.name}
                        isEditMode={isEditMode}
                        newImage={newImage}
                        setNewImage={setNewImage}
                      />
                    </section>

                    <section>
                      <SystemDetail
                        register={register}
                        isEditMode={isEditMode}
                        data={data}
                      />
                      <div className="text-sm font-medium text-gray-400">
                        Description
                      </div>
                      <Description
                        data={data}
                        isEditMode={isEditMode}
                        register={register}
                      />
                    </section>
                  </div>
                </Card>
              </article>
            )}
            {data.catalogueUID && viewControl.catalogueItem && (
              <Card>
                <Heading text="Catalogue Item" />
                <ErrorBoundary fallback={<ErrorPage />}>
                  <Suspense fallback={<LoaderComponent />}>
                    <ItemDetailComponent uid={data.catalogueUID} />
                  </Suspense>
                </ErrorBoundary>
              </Card>
            )}
            {viewControl.relations && (
              <Card>
                <Heading text="Relations" />
                <ErrorBoundary fallback={<ErrorPage />}>
                  <Suspense fallback={<ProgressBarComponent />}>
                    <Relations uid={data.uid} systemName={data.name} />
                  </Suspense>
                </ErrorBoundary>
              </Card>
            )}
          </main>
        </div>
      </EditModeContainer>
    </>
  )
}

export default Page
