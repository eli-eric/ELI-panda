import type { NextPage } from 'next'
import Head from 'next/head'

import { NewUserContainer } from '@/modules/administration/user/new/NewUser.cont'

const AdministrationPage: NextPage = (): React.ReactElement => (
  //const intl = useIntl()

  <>
    <Head>
      <title>{'Administration'}</title>
      <meta name="description" content="...." />
    </Head>

    <NewUserContainer />
  </>
)

export default AdministrationPage
