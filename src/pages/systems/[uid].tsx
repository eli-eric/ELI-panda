import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, useEffect } from 'react'
import useSWR from 'swr'

import LoaderComponent from '@/components/loader.comp'
import { fetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import SystemOverviewContainer from '@/modules/systems/SystemOverview.cont'

const SystemDetailPage: NextPage = () => {
  const { push, query } = useRouter()
  const { data: session } = useSession()
  const { uid } = query
  const { system } = useEndpoint({ uid: uid as string })
  const { data, error } = useSWR(session && system, fetcher, {
    suspense: false
  })
  useEffect(() => {
    if (error) push('/404')
  }, [error, push])

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
