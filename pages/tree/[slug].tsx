import { faker } from '@faker-js/faker'
import Breadcrumbs from 'components/systems/Breadcrumbs'
import Card from 'components/systems/Card'
import Description from 'components/systems/Description'
import Preview from 'components/systems/Preview'
import { SearchInput, SearchResults } from 'components/systems/Search'
import Subsystems from 'components/systems/Subsystems'
import Title from 'components/systems/Title'
import useEditMode from 'hooks/systems/useEditMode'
import SystemDetailSectionComponent from 'modules/systems/details/system-detail/system-detail-section.comp'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import useSWR from 'swr/immutable'
import { System, SystemUidName } from 'types/system'

const getFakeName = () => faker.company.catchPhrase()

const getFakePath = (): SystemUidName => {
  const length = faker.datatype.number({ min: 0, max: 10 })
  return [...Array(length)].map(() => [faker.datatype.uuid(), getFakeName()])
}

const getFakeSystem = (): System => {
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

const fetchFakeSystem = async uri => {
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return uri && getFakeSystem()
}
export const fetchFakeSystems = async uri => {
  const res = [...Array(faker.datatype.number({ min: 0, max: 100 }))]
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return uri && res.map(() => getFakeSystem())
}

const onSubmit = (data: System) => {
  console.log(data)
}

const Page: NextPage = () => {
  const router = useRouter()
  const uid = router.query.slug
  const searchQuery = router.query.q

  const { data } = useSWR(uid, fetchFakeSystem)

  const editMode = useEditMode(onSubmit, data)
  const { isEditMode, EditModeContainer, EditModeControls } = editMode

  //I can't seem to get <Suspense> working, using this for now.
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

          <div className="text-3xl w-full flex shrink-0 justify-between">
            <Title data={data} editMode={editMode} />
            {!isEditMode && <SearchInput router={router} />}
            <EditModeControls />
          </div>
          {!isEditMode && searchQuery && (
            <div className="p-1 lg:p-2 w-full">
              <Suspense
                fallback={
                  <div className="h-[30vh] mb-4">
                    <b>Loading</b>
                  </div>
                }
              >
                <SearchResults query={searchQuery} />
              </Suspense>
            </div>
          )}

          <aside className="p-1 lg:p-2 w-full lg:w-1/4">
            <nav>
              <Subsystems data={data} />
            </nav>
          </aside>

          <main className="p-1 lg:p-2 lg:w-3/4">
            <article>
              <div className="flex flex-wrap gap-2 lg:gap-4">
                <section className="grow lg:grow-0 shrink-0">
                  <Preview data={data} editMode={editMode} />
                </section>
                <section className="grow">
                  <b>Details</b>
                  <Card>
                    <SystemDetailSectionComponent systemInfo={data} />
                  </Card>
                </section>
                <section className="basis-full">
                  <Description data={data} editMode={editMode} />
                </section>
              </div>
            </article>
          </main>
        </div>
      </EditModeContainer>
    </>
  )
}

export default Page
