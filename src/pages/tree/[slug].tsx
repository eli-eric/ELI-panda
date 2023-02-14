import { faker } from '@faker-js/faker'
import { PlusIcon } from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import SystemDetailSectionComponent from 'src/modules/systems/details/system-detail/system-detail-section.comp'
import useSWR from 'swr/immutable'

import Breadcrumbs from '@/components/systems/Breadcrumbs'
import Card from '@/components/systems/Card'
import Description from '@/components/systems/Description'
import Preview from '@/components/systems/Preview'
import RelationList from '@/components/systems/relations/RelationList'
import Subsystems from '@/components/systems/Subsystems'
import Title from '@/components/systems/Title'
import ViewControl from '@/components/systems/ViewControl'
import DisclosureComponent from '@/components/ui/Disclosure.comp'
import useEditMode from '@/hooks/systems/useEditMode'
import useSearch from '@/hooks/systems/useSearch'
import { System, SystemUidName } from '@/types/system'

const getFakeName = () => faker.company.catchPhrase()

const getFakePath = (): SystemUidName[] => {
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
    description: `${faker.commerce.productDescription()} ${faker.lorem.paragraphs(5)}`,
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
    estimatedLifeTime: faker.datatype.number()
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchFakeSystem = async () => {
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return getFakeSystem()
}
export const fetchFakeSystems = async () => {
  const res = [...Array(faker.datatype.number({ min: 0, max: 100 }))]
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return res.map(() => getFakeSystem())
}

const onSubmit = (data: System) => {
  console.log(data)
}

const Page: NextPage = () => {
  const router = useRouter()
  const uid = router.query.slug

  const formMethods = useForm({ defaultValues: { system: true, relations: true } })

  const { Prompt, Results, hasResults } = useSearch('/tree/')

  const { data } = useSWR(uid, fetchFakeSystem)

  const { isEditMode, setIsEditMode, newImage, setNewImage, FormErrors, EditModeContainer, register, discard } =
    useEditMode(onSubmit, data)

  if (!data) return <>Loading</>

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <EditModeContainer>
        <div className="p-2 lg:p-4 flex flex-wrap">
          <nav className="p-1 lg:p2 w-full">
            <Breadcrumbs data={data} />
          </nav>

          {isEditMode && (
            <div className="w-full">
              <FormErrors />
            </div>
          )}

          <div className="flex w-full justify-between">
            <Title
              data={data}
              discard={discard}
              setIsEditMode={setIsEditMode}
              isEditMode={isEditMode}
              register={register}
            />

            {isEditMode || <Prompt />}
          </div>

          {isEditMode ||
            (hasResults && (
              <details open className="max-h-[40vh] w-full overflow-auto">
                <summary>
                  <b>Results</b>
                </summary>
                <Suspense>
                  <Results />
                </Suspense>
              </details>
            ))}

          <aside className="p-1 lg:p-2 w-full lg:w-1/4">
            <nav>
              <div className="hidden lg:block">
                <b>Subsystems</b>
                <Subsystems data={data} />
                <button onClick={() => router.push('/tree/' + uid + '/new')}>
                  <PlusIcon className="h-6 hover:text-orange-600" />
                </button>
              </div>

              <details className="lg:hidden max-h-[50vh] overflow-auto">
                <summary>
                  <b>Subsystems</b>
                </summary>
                <Subsystems data={data} />
                <button onClick={() => router.push('/tree/' + uid + '/new')}>
                  <PlusIcon className="h-6 hover:text-orange-600" />
                </button>
              </details>
            </nav>
          </aside>

          <main className={`p-1 lg:p-2 w-full lg:w-3/4`}>
            <FormProvider {...formMethods}>
              <ViewControl />
            </FormProvider>
            {formMethods.watch('system') && (
              <DisclosureComponent title="System Detail">
                <article>
                  <div className="flex flex-wrap gap-2 lg:gap-4">
                    <section className="">
                      <b>Preview</b>
                      <Preview data={data} isEditMode={isEditMode} newImage={newImage} setNewImage={setNewImage} />
                    </section>
                    <section>
                      <b>Details</b>
                      <Card>
                        <SystemDetailSectionComponent systemInfo={data} />
                      </Card>
                    </section>
                    <section className="basis-full">
                      <b>Description</b>
                      <Description data={data} isEditMode={isEditMode} register={register} />
                    </section>
                  </div>
                </article>
              </DisclosureComponent>
            )}
            {formMethods.watch('relations') && <RelationList />}
          </main>
        </div>
      </EditModeContainer>
    </>
  )
}

export default Page
