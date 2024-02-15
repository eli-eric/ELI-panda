import { CogIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { UserProfileLayout } from '@/components/layout/navigation-bar/profile/UserProfile.layout'

const messages = message.profilePage

const ProfileTeamPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <UserProfileLayout title={messages.team.title} subTitle={messages.team.subTitle}>
        {/* under construction page with heroicon */}
        <CogIcon
          className="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        />

        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-gray-200">Under construction</h1>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">
          This page is under construction. Please check back later.
        </p>
      </UserProfileLayout>
    </Fragment>
  )
}

export default ProfileTeamPage
