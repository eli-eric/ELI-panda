import type { ApolloQueryResult, OperationVariables } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { createContext, Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { SystemItemContainer } from '@/modules/systemItem/SystemItem.cont'
import type { Query, System } from '@/types/gql/graphql'

const messages = message.systemItem

interface Props {
  key?: string
  uid?: string
}

type SystemDetailContextType = {
  systemDetail?: System
  loading: boolean
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<Query>>
}

export const SystemDetailContext = createContext<SystemDetailContextType>({
  systemDetail: undefined,
  loading: false,
  refetch: () => Promise.resolve({} as ApolloQueryResult<Query>)
})

const SystemDetailPage: NextPage = ({ uid }: Props) => {
  const intl = useIntl()
  const router = useRouter()
  const { systemDetail, loading, error, refetch } = useSystemDetail(uid, undefined, data => {
    if (!data?.systems?.length) {
      router.push('/404')
    }
  })

  if (loading) {
    return <LoaderComponent />
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <SystemDetailContext.Provider value={{ systemDetail, loading, refetch }}>
        {systemDetail && <SystemItemContainer uid={uid} />}
      </SystemDetailContext.Provider>
    </Fragment>
  )
}

SystemDetailPage.getInitialProps = ({ query }) => ({
  key: query.uid,
  uid: query.uid
})

export default SystemDetailPage
