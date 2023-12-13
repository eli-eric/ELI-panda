import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import LoaderComponent from '@/components/loader.comp'
import { useRoomCard } from '@/modules/roomCard/hooks/useRoomCard'
import { RoomCardDetailContainer } from '@/modules/roomCard/RoomCardDetail.cont'

const messages = message.roomCardsPage

interface Props {
  key?: string
  roomCardUid?: string
}

const RoomCardDetail: NextPage = ({ roomCardUid }: Props) => {
  const intl = useIntl()
  const { roomCard, loading } = useRoomCard(roomCardUid)

  if (loading) {
    return <LoaderComponent />
  }

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>

      {roomCard && <RoomCardDetailContainer roomCardUid={roomCardUid} />}
    </Fragment>
  )
}

RoomCardDetail.getInitialProps = ({ query }) => ({
  key: query.uid,
  roomCardUid: query.uid
})

export default RoomCardDetail
