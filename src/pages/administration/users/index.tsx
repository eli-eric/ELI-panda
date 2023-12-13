import type { NextPage } from 'next'
import Head from 'next/head'

import { UsersContainer } from '@/modules/administration/users/Users.cont'

const AdministrationPage: NextPage = (): React.ReactElement => (
  //const intl = useIntl()

  <>
    <Head>
      <title>{'Administration'}</title>
      <meta name="description" content="...." />
    </Head>
    <UsersContainer />
  </>
)

export default AdministrationPage
