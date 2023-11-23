import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import { NewUserContainer } from '@/modules/administration/user/NewUser.cont'

const AdministrationPage: NextPage = (): React.ReactElement => (
  //const intl = useIntl()

  <Fragment>
    <Head>
      <title>{'Administration'}</title>
      <meta name="description" content="...." />
    </Head>

    <NewUserContainer />
  </Fragment>
)

export default AdministrationPage
