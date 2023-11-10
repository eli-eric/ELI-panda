import type { NextPage } from 'next'
import Head from 'next/head'
import { createContext, Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import LoaderComponent from '@/components/loader.comp'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { SystemItemContainer } from '@/modules/systemItem/SystemItem.cont'
import type { System } from '@/types/gql/graphql'

const messages = message.systemItem

interface Props {
  key?: string
  uid?: string
}

type SystemDetailContextType = {
  systemDetail?: System
  loading: boolean
}

export const SystemDetailContext = createContext<SystemDetailContextType>({
  systemDetail: undefined,
  loading: false
})

const SystemDetailPage: NextPage = ({ uid }: Props) => {
  const intl = useIntl()
  const { systemDetail, loading } = useSystemDetail(uid)

  if (loading) {
    return <LoaderComponent />
  }

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <SystemDetailContext.Provider value={{ systemDetail, loading }}>
        <SystemItemContainer uid={uid} />
      </SystemDetailContext.Provider>
    </Fragment>
  )
}

SystemDetailPage.getInitialProps = ({ query }) => ({
  key: query.uid,
  uid: query.uid
})

export default SystemDetailPage
