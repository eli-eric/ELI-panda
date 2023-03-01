import { faker } from '@faker-js/faker'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import useSWR from 'swr/immutable'

import LoaderComponent from '@/components/loader.comp'
import SystemOverviewContainer from '@/modules/systems/SystemOverview.cont'
import { System } from '@/modules/systems/types'

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
    catalogueUID: undefined
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
  const { data } = useSWR(uid, fetchFakeSystem)

  if (!data) return <LoaderComponent />
  return (
    <Fragment>
      <Head>
        <title>{data.name}</title>
      </Head>
      <SystemOverviewContainer systemDetail={data} />
    </Fragment>
  )
}

export default SystemDetailPage
