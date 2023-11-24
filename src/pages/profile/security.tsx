import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { UserProfileLayout } from '@/components/layout/nav-bar/profile/UserProfile.layout'
import { ChangePasswordContainer } from '@/modules/administration/changePassword/ChangePassword.cont'

const messages = message.profilePage

const ProfileSecurityPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <UserProfileLayout title={messages.security.title} subTitle={messages.security.subTitle}>
        <ChangePasswordContainer />
      </UserProfileLayout>
    </Fragment>
  )
}

export default ProfileSecurityPage
