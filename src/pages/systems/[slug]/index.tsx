import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import useSWR from 'swr'

import LoaderComponent from '@/components/loader.comp'
import { fetcher } from '@/features/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import SystemOverviewContainer from '@/modules/systems/SystemOverview.cont'

const SystemDetailPage: NextPage = () => {
  const router = useRouter()
  const uid = router.query.slug as string
  const { systemDetail } = useEndpoint({ uid })
  const { data } = useSWR(systemDetail, fetcher, { suspense: false })

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
