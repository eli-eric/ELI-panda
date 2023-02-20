import { faker } from '@faker-js/faker'
import { PlusIcon } from '@heroicons/react/20/solid'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SystemDetailSectionComponent from 'src/modules/systems/details/system-detail/system-detail-section.comp'
import useSWR from 'swr/immutable'

import ErrorPage from '@/components/error/ErrorPage'
import Breadcrumbs from '@/components/systems/Breadcrumbs'
import Card from '@/components/systems/Card'
import Description from '@/components/systems/Description'
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
  return [...Array(length)].map(() => [faker.datatype.uuid(), getFakeName()])
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
    eun: faker.datatype.string(),
    serialNumber: faker.datatype.uuid(),
    batchNumber: faker.datatype.uuid(),
    itemUsageCategoryCode: faker.datatype.string(),
    estimatedLifeTime: faker.datatype.number(),
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchFakeSystem = async () => {
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return getFakeSystem()
}
export const fetchFakeSystems = async () => {
  const res = [...Array(faker.datatype.number({ min: 0, max: 20 }))]
  await sleep(faker.datatype.number({ min: 1000, max: 10000 }))
  return res.map(() => getFakeSystem())
}

const onSubmit = (data: System) => {
  console.log(data)
}

const Page: NextPage = () => {
  const router = useRouter()
  const uid = router.query.slug
  const [query, setQuery] = useParam('q')

  const [viewControl, setViewControl] = useState({
    system: true,
    relations: true,
  })

  const { data } = useSWR(uid, fetchFakeSystem)

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

            {isEditMode || <Prompt query={query} setQuery={setQuery} />}
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
                <nav className="py-3" aria-label="Subsystems">
                  <Subsystems ids={data.children} />
                </nav>
              </Suspense>
            </Card>
          </aside>

          <main className={`p-1 lg:p-2 w-full lg:w-3/4`}>
            {viewControl.system && (
              <article>
                <Card>
                  <Heading text="System Detail" />
                  <div className="flex flex-wrap gap-2 lg:gap-4">
                    <section className="">
                      <b>Preview</b>
                      <Preview
                        data={data}
                        isEditMode={isEditMode}
                        newImage={newImage}
                        setNewImage={setNewImage}
                      />
                    </section>

                    <section>
                      <b>Details</b>
                      <Card>
                        <SystemDetailSectionComponent systemInfo={data} />
                      </Card>
                    </section>

                    <section className="basis-full">
                      <b>Description</b>
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
            {viewControl.relations && (
              <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<ProgressBarComponent />}>
                  <Relations uid={data.uid} systemName={data.name} />
                </Suspense>
              </ErrorBoundary>
            )}
          </main>
        </div>
      </EditModeContainer>
    </>
  )
}

export default Page
