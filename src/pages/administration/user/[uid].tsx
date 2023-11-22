import type { NextPage } from 'next'
import Head from 'next/head'

import { EditUserContainer } from '@/modules/administration/user/edit/EditUser.cont'

const EditUserPage: NextPage = (): React.ReactElement => (
  //const intl = useIntl()

  <>
    <Head>
      <title>{'Administration'}</title>
      <meta name="description" content="...." />
    </Head>
    <h1 className="text-2xl font-semibold font-mono text-gray-600 mt-2 ml-1 sm:mt-4 sm:ml-4 uppercase">
      Admin Section
    </h1>
    <EditUserContainer />
  </>
)

export default EditUserPage
