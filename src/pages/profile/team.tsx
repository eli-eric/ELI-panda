import { Settings } from 'lucide-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { UserProfileLayout } from '@/components/user-profile/UserProfile.layout'
import { messages } from '@/i18n/src/locale/en'

const ProfileTeamPage: NextPage = (): JSX.Element => (
  <Fragment>
    <Head>
      <title>
        <FormattedMessage id={messages.common.pages.profile} />
      </title>
      <meta name="description" content="...." />
    </Head>
    <UserProfileLayout title="Team" subTitle="Manage your team settings">
      {/* under construction page with heroicon */}
      <Settings
        className="mx-auto h-16 w-16 text-gray-400"
        aria-hidden="true"
      />

      <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-gray-200">
        <FormattedMessage id={messages.common.pages.underConstruction} />
      </h1>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">
        <FormattedMessage id={messages.common.pages.underConstructionMessage} />
      </p>
    </UserProfileLayout>
  </Fragment>
)

export default ProfileTeamPage
