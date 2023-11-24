import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { UserProfileCard } from '@/components/layout/nav-bar/profile/UserProfile.card'
import { UserProfileLayout } from '@/components/layout/nav-bar/profile/UserProfile.layout'

const messages = message.profilePage

const ProfileGeneralPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <UserProfileLayout title={messages.general.title} subTitle={messages.general.subTitle}>
        <UserProfileCard />
      </UserProfileLayout>
    </Fragment>
  )
}

export default ProfileGeneralPage
