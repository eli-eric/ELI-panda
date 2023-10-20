import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { RoomCardsContainer } from '@/modules/roomCards/RoomCards.cont'

const messages = message.roomCardsPage

const RoomCardsPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <RoomCardsContainer />
    </Fragment>
  )
}

export default RoomCardsPage
