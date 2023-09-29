import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { RoomCardDetailContainer } from '@/modules/roomCard/RoomCardDetail.cont'

const messages = message.roomCardsPage

const RoomCardDetail: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <RoomCardDetailContainer />
    </Fragment>
  )
}

export default RoomCardDetail
