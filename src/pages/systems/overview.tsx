import type { DehydratedState } from '@tanstack/react-query'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import type { NextPage } from 'next'
import Head from 'next/head'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { Fragment } from 'react'

import SystemsContainer from '@/modules/systems/Systems.cont'
import type { SystemsResponse } from '@/types/responses/systems'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { serverQueryFetcher } from '@/utils/fetcher'

import { authOptions } from '../api/auth/[...nextauth]'

interface Props {
  dehydratedState: DehydratedState
}

const SystemsPage: NextPage<Props> = ({ dehydratedState }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Systems Overview</title>
      </Head>
      <HydrationBoundary state={dehydratedState}>
        <SystemsContainer />
      </HydrationBoundary>
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  const queryClient = new QueryClient()
  const queryKey: QueryFetcherKey = [
    'systems',
    {
      query: {
        pagination: `{"page":${context.query.page || 1},"pageSize":50}`,
        search: context.query.search || '',
        columnFilter: context.query.filter || '[]',
        sorting: context.query.sortBy || ''
      }
    }
  ]
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions as NextAuthOptions
  )

  const querySystemsData =
    await queryClient.getQueryData<SystemsResponse>(queryKey)

  if (!querySystemsData) {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn: serverQueryFetcher<SystemsResponse>(
        'systemsList',
        session?.user.apiAccessToken
      )
    })
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default SystemsPage
